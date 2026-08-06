import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { InrPricingUnifiedSection } from "@/sections/pricing/inr-pricing-unified-section";
import { FaqSection } from "@/components/shared/faq-section";
import { ServicesCtaSection } from "@/sections/services/services-cta-section";
import { GalaxyStack } from "@/components/shared/scroll-stack-card";
import { getPricingPackages } from "@/lib/cms/pricing";
import { getFaqs } from "@/lib/cms/faqs";
import { packagesToInrTabs } from "@/constants/inr-pricing-tabs";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Pricing",
    description:
      "FocusedFolks pricing: website development, custom software, e-commerce, UI/UX design, cloud hosting, DevOps, AI integration, staff augmentation, IT consulting, and digital transformation. Transparent INR pricing with USD and AED conversion.",
    keywords: [
      "web development pricing India",
      "custom software development cost",
      "ecommerce development pricing",
      "AI chatbot development cost",
      "staff augmentation rates India",
      "UI UX design pricing",
      "DevOps services pricing",
      "IT consulting rates India",
      "digital transformation cost",
      "FocusedFolks pricing",
    ],
    path: "/pricing",
  });
}

export default async function PricingPage() {
  const [packages, faqItems] = await Promise.all([
    getPricingPackages(),
    getFaqs("pricing"),
  ]);
  const tabs = packagesToInrTabs(packages);

  return (
    <>
      <GalaxyStack stagger={0}>
        <InrPricingUnifiedSection tabs={tabs} />
      </GalaxyStack>
      <FaqSection
        id="pricing-faq"
        stackStagger={4}
        items={faqItems}
        badge="Pricing FAQ"
        title="Questions about our pricing and engagement models"
        description="Indicative rates, payment terms, regional pricing, and how to get a fixed quote."
      />
      <ServicesCtaSection />
    </>
  );
}
