import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "@/constants/contact";
import type { ContactFormValues } from "@/lib/contact-schema";

export type ContactDeliveryMethod = "smtp" | "formsubmit" | "resend";

function getSmtpConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() ?? CONTACT_EMAIL;

  if (!user || !pass) {
    return null;
  }

  return {
    user,
    pass,
    to,
    host: process.env.SMTP_HOST?.trim() ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? "587"),
    from: process.env.SMTP_FROM?.trim() ?? user,
  };
}

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() ?? CONTACT_EMAIL;
  const from = process.env.RESEND_FROM?.trim() ?? "FocusFolks <onboarding@resend.dev>";
  if (!apiKey) return null;
  return { apiKey, to, from };
}

export function getContactDeliveryMethod(): ContactDeliveryMethod {
  const forced = process.env.CONTACT_DELIVERY?.trim().toLowerCase();
  if (forced === "smtp" || forced === "formsubmit" || forced === "resend") {
    return forced;
  }
  if (getResendConfig()) return "resend";
  if (getSmtpConfig()) return "smtp";
  return "formsubmit";
}

export function isContactEmailConfigured(): boolean {
  const method = getContactDeliveryMethod();
  if (method === "formsubmit") {
    return process.env.CONTACT_DISABLE_FORMSUBMIT !== "true";
  }
  if (method === "resend") return Boolean(getResendConfig());
  return Boolean(getSmtpConfig());
}

function buildPayload(data: ContactFormValues) {
  const text = [
    "New consultation request — FocusFolks website",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  const html = `
    <h2>New consultation request</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
    <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `;

  const subject = `[FocusFolks] Consultation request from ${data.name} (${data.company})`;

  return { text, html, subject };
}

async function sendViaSmtp(data: ContactFormValues): Promise<void> {
  const smtp = getSmtpConfig();
  if (!smtp) {
    throw new Error("SMTP is not configured.");
  }

  const { text, html, subject } = buildPayload(data);

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: { user: smtp.user, pass: smtp.pass },
  });

  try {
    await transporter.verify();
  } catch (err) {
    const message = err instanceof Error ? err.message : "SMTP verification failed";
    if (message.includes("535") || message.includes("BadCredentials") || message.includes("EAUTH")) {
      throw new Error(
        "Gmail rejected the SMTP password. Use a 16-character App Password (not your normal Gmail password). Create one at https://myaccount.google.com/apppasswords — then set SMTP_PASS in .env.local and restart the dev server."
      );
    }
    throw err;
  }

  await transporter.sendMail({
    from: `"FocusFolks Website" <${smtp.from}>`,
    to: smtp.to,
    replyTo: data.email,
    subject,
    text,
    html,
  });
}

async function sendViaResend(data: ContactFormValues): Promise<void> {
  const resend = getResendConfig();
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const { html, subject } = buildPayload(data);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resend.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resend.from,
      to: [resend.to],
      reply_to: data.email,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Resend failed (${response.status}): ${body.slice(0, 240)}`);
  }
}

async function sendViaFormSubmit(data: ContactFormValues): Promise<void> {
  const to = process.env.CONTACT_TO_EMAIL?.trim() ?? CONTACT_EMAIL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { subject } = buildPayload(data);

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: siteUrl,
      Referer: `${siteUrl}/contact`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message,
      _subject: subject,
      _template: "table",
      _captcha: "false",
    }),
  });

  const raw = await res.text().catch(() => "");
  let json: { success?: string | boolean; message?: string } | null = null;
  try {
    json = raw ? (JSON.parse(raw) as { success?: string | boolean; message?: string }) : null;
  } catch {
    json = null;
  }

  if (!res.ok) {
    throw new Error(`FormSubmit failed (${res.status}): ${raw.slice(0, 240)}`);
  }

  if (!json) return;

  const success = json.success === true || json.success === "true";
  if (success) return;

  const message = json.message ?? raw.slice(0, 240);
  if (message.toLowerCase().includes("activation")) {
    throw new Error(
      `FormSubmit must be activated once for ${to}. Check that inbox for an email from FormSubmit, click "Activate Form", then submit again.`
    );
  }

  if (json.success === false || json.success === "false") {
    throw new Error(message || "FormSubmit could not deliver the message.");
  }
}

export async function sendContactEmail(data: ContactFormValues): Promise<void> {
  const method = getContactDeliveryMethod();
  const fallbacks: ContactDeliveryMethod[] = [];

  if (method === "smtp") {
    fallbacks.push("formsubmit");
  } else if (method === "resend") {
    fallbacks.push("formsubmit");
  }

  const attempts: ContactDeliveryMethod[] = [method, ...fallbacks];

  let lastError: Error | null = null;

  for (const attempt of attempts) {
    try {
      if (attempt === "smtp") {
        await sendViaSmtp(data);
        return;
      }
      if (attempt === "resend") {
        await sendViaResend(data);
        return;
      }
      if (attempt === "formsubmit") {
        if (process.env.CONTACT_DISABLE_FORMSUBMIT === "true") continue;
        await sendViaFormSubmit(data);
        return;
      }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.error(`[contact] ${attempt} failed:`, lastError.message);
    }
  }

  throw lastError ?? new Error("No contact delivery method is available.");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
