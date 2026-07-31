"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/shared/section-header";
import { faqs as defaultFaqs } from "@/constants/content";
import { JsonLd } from "@/components/shared/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { ScrollStackCard } from "@/components/shared/scroll-stack-card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

type FaqEntry = { question: string; answer: string };

type FaqSectionProps = {
  id?: string;
  items?: readonly FaqEntry[];
  badge?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
  /** Scroll-stack timing offset for the glass FAQ card */
  stackStagger?: number;
  /** Match /services hub section header reveal timing */
  servicesPage?: boolean;
};

export function FaqSection({
  id = "faq",
  items = defaultFaqs,
  badge = "FAQ",
  title = "Frequently Asked Questions",
  description = "Everything you need to know about working with FocusFolks.",
  align = "left",
  stackStagger = 0,
  servicesPage = false,
}: FaqSectionProps) {
  const list = [...items];

  return (
    <section id={id} className="scroll-mt-24 pb-16 md:pb-24 pt-16 md:pt-20">
      <JsonLd data={faqJsonLd(list)} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollStackCard stagger={stackStagger} className="rounded-3xl p-6 md:p-10">
          <SectionHeader
            badge={badge}
            title={title}
            description={description}
            align={align}
            servicesPage={servicesPage}
          />
          <div className="mt-8 w-full">
            <Accordion type="single" collapsible className="w-full">
              {list.map((faq, i) => (
                <ScrollReveal key={faq.question} stagger={i} as="div">
                  <AccordionItem value={`item-${i}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-slate-300 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollReveal>
              ))}
            </Accordion>
          </div>
        </ScrollStackCard>
      </div>
    </section>
  );
}
