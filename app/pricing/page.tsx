import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { InrPricingUnifiedSection } from "@/sections/pricing/inr-pricing-unified-section";
import { FaqSection } from "@/components/shared/faq-section";
import { ServicesCtaSection } from "@/sections/services/services-cta-section";
import { GalaxyStack } from "@/components/shared/scroll-stack-card";
import { pricingFaqs } from "@/constants/content";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Pricing",
    description:
      "Transparent IT services pricing for 2026: 10 services with Essential, Professional, and Custom Quote tiers. Web from $875, mobile from $2,500, staff augmentation from $1,000/mo. Regional currency display for US, UAE, India, UK, and more.",
    keywords: [
      "software development pricing 2026",
      "web development cost India",
      "mobile app development price Dubai",
      "UI UX design pricing",
      "cloud migration cost AWS",
      "DevOps services pricing",
      "AI integration cost",
      "IT services rates Ahmedabad",
      "custom software development cost",
    ],
    path: "/pricing",
  });
}

export default function PricingPage() {
  return (
    <>
      <GalaxyStack stagger={0}>
        <InrPricingUnifiedSection />
      </GalaxyStack>
      <FaqSection
        id="pricing-faq"
        stackStagger={4}
        items={pricingFaqs}
        badge="Pricing FAQ"
        title="Questions about our pricing and engagement models"
        description="Indicative rates, payment terms, regional pricing, and how to get a fixed quote."
      />
      <ServicesCtaSection />
    </>
  );
}

