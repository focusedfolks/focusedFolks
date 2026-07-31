"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    if (email) {
      toast.success("Thanks for subscribing!", {
        description: "You'll receive our latest insights monthly.",
      });
      form.reset();
    }
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        name="email"
        type="email"
        required
        placeholder="you@company.com"
        className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
        aria-label="Email for newsletter"
      />
      <Button type="submit" size="sm">
        Subscribe
      </Button>
    </form>
  );
}
