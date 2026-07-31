"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";
import { CONTACT_EMAIL } from "@/constants/contact";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        throw new Error(
          data.error ??
            (res.status === 503
              ? `Email delivery is disabled. Please write to ${CONTACT_EMAIL} directly.`
              : "Something went wrong. Please try again or email us directly.")
        );
      }

      toast.success("Message sent successfully.", {
        description: "We’ll reply to your email within one business day.",
      });
      form.reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send your message.";
      toast.error("Could not send your message", { description: message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-[1.35rem] p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            className="mt-2"
            placeholder="Jane Doe"
            {...form.register("name")}
            aria-invalid={Boolean(form.formState.errors.name)}
          />
          {form.formState.errors.name && (
            <div className="mt-1 text-xs font-semibold text-red-400">
              {form.formState.errors.name.message}
            </div>
          )}
        </div>

        <div className="sm:col-span-1">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            className="mt-2"
            placeholder="jane@company.com"
            type="email"
            {...form.register("email")}
            aria-invalid={Boolean(form.formState.errors.email)}
          />
          {form.formState.errors.email && (
            <div className="mt-1 text-xs font-semibold text-red-400">
              {form.formState.errors.email.message}
            </div>
          )}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            className="mt-2"
            placeholder="Your company"
            {...form.register("company")}
            aria-invalid={Boolean(form.formState.errors.company)}
          />
          {form.formState.errors.company && (
            <div className="mt-1 text-xs font-semibold text-red-400">
              {form.formState.errors.company.message}
            </div>
          )}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message">What are you looking to build?</Label>
          <Textarea
            id="message"
            className="mt-2"
            placeholder="Tell us about your goals, timeline, and any constraints…"
            {...form.register("message")}
            aria-invalid={Boolean(form.formState.errors.message)}
          />
          {form.formState.errors.message && (
            <div className="mt-1 text-xs font-semibold text-red-400">
              {form.formState.errors.message.message}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs leading-relaxed text-slate-400">
          By submitting, you agree to be contacted about your request. We never sell your data.
        </div>

        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? (
            <motion.span
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2"
            >
              Sending…
              <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
            </motion.span>
          ) : (
            "Send message"
          )}
        </Button>
      </div>
    </form>
  );
}
