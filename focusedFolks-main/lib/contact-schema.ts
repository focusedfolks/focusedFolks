import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email."),
  company: z.string().min(2, "Please enter your company name."),
  message: z.string().min(10, "Tell us a bit more (at least 10 characters)."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
