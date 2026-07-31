import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";
import {
  getContactDeliveryMethod,
  isContactEmailConfigured,
  sendContactEmail,
} from "@/lib/send-contact-email";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data.", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    if (!isContactEmailConfigured()) {
      return NextResponse.json(
        {
          error:
            "Contact email is disabled. Set CONTACT_DELIVERY=formsubmit or add SMTP/Resend credentials in .env.local.",
        },
        { status: 503 }
      );
    }

    await sendContactEmail(parsed.data);

    return NextResponse.json({ ok: true, method: getContactDeliveryMethod() });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send your message. Please try again or email us directly.";
    console.error("[contact]", err);

    const isDev = process.env.NODE_ENV === "development";

    return NextResponse.json(
      {
        error: isDev ? message : "Failed to send your message. Please try again or email us directly.",
      },
      { status: 500 }
    );
  }
}
