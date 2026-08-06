import { homeFaqs, pricingFaqs, servicesFaqs } from "@/constants/content";
import { contactFaqs } from "@/constants/contact";
import type { FaqItem } from "@/types";
import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";

export type FaqPage = "homepage" | "pricing" | "services" | "contact";

export type DbFaq = {
  id: string;
  page: FaqPage;
  question: string;
  answer: string;
  sort_order: number;
};

const FALLBACKS: Record<FaqPage, FaqItem[]> = {
  homepage: homeFaqs,
  pricing: pricingFaqs,
  services: servicesFaqs,
  contact: contactFaqs.map((f) => ({ question: f.question, answer: f.answer })),
};

/**
 * Load FAQs for a page from Supabase when configured and populated;
 * otherwise fall back to hardcoded constants.
 */
export async function getFaqs(page: FaqPage): Promise<FaqItem[]> {
  const fallback = FALLBACKS[page];
  if (!isSupabaseConfigured()) return fallback;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("question, answer, sort_order")
      .eq("page", page)
      .order("sort_order");

    if (error || !data?.length) {
      if (error) console.warn(`[cms] faqs (${page}) fetch failed — using fallback`, error);
      return fallback;
    }

    return data.map((row) => ({
      question: row.question as string,
      answer: row.answer as string,
    }));
  } catch (err) {
    console.warn(`[cms] faqs (${page}) fetch error — using fallback`, err);
    return fallback;
  }
}
