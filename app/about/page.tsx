import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { getAboutContent } from "@/lib/cms/about";
import { getContactInfo } from "@/lib/cms/contact";
import { AboutHero } from "@/sections/about/about-hero";
import { AboutCapabilities } from "@/sections/about/about-capabilities";
import { AboutLeadership } from "@/sections/about/about-leadership";
import { AboutTimeline } from "@/sections/about/about-timeline";
import { AboutValuesPresence } from "@/sections/about/about-values-presence";
import { ServicesBenefits } from "@/sections/services/services-benefits";
import { ServicesCtaSection } from "@/sections/services/services-cta-section";
import { GalaxyStack } from "@/components/shared/scroll-stack-card";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "About Us",
    description:
      "FocusFolks is a newly launched software company with a 4-person team and one live Accounting CRM product—Client Credit Tracker. Explore our future capabilities in SaaS, AI, cloud, and custom software.",
    keywords: [
      "about FocusFolks",
      "new software company India",
      "accounting CRM SaaS",
      "Client Credit Tracker",
      "early-stage software startup",
      "custom software development",
      "SaaS product company",
      "AI software roadmap",
      "FocusFolks team",
      "software innovation company",
    ],
    path: "/about",
  });
}

export default async function AboutPage() {
  const [about, contact] = await Promise.all([getAboutContent(), getContactInfo()]);

  return (
    <>
      <GalaxyStack stagger={0}>
        <AboutHero />
      </GalaxyStack>

      <GalaxyStack stagger={4}>
        <AboutCapabilities capabilities={about.capabilities} />
      </GalaxyStack>

      <GalaxyStack stagger={6}>
        <AboutTimeline timeline={about.timeline} />
      </GalaxyStack>

      <GalaxyStack stagger={8}>
        <AboutLeadership members={about.team} />
      </GalaxyStack>

      <GalaxyStack stagger={12}>
        <AboutValuesPresence values={about.values} offices={contact.offices} />
      </GalaxyStack>

      <GalaxyStack stagger={16}>
        <ServicesBenefits />
      </GalaxyStack>

      <ServicesCtaSection />
    </>
  );
}
