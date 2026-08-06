import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { GalaxyStack } from "@/components/shared/scroll-stack-card";
import { HeroSection } from "@/sections/home/hero-section";
import { ServicesOverview } from "@/sections/home/services-overview";
import { WhyChooseUsSection } from "@/sections/home/why-choose-us";
import { ServicesProcessScroll } from "@/sections/services/services-process-scroll";
import { TeamThoughtsCarouselSection } from "@/sections/home/testimonials-carousel";
import { IndustryExpertiseSection } from "@/sections/home/industry-expertise";
import { StatisticsSection } from "@/sections/home/statistics-section";
import { FaqSection } from "@/components/shared/faq-section";
import { ServicesCtaSection } from "@/sections/services/services-cta-section";
import { getHomepageContent } from "@/lib/cms/homepage";
import { getFaqs } from "@/lib/cms/faqs";
import { getFeaturedServices } from "@/lib/cms/services";

export const revalidate = 300;

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Home",
    description:
      "Transforming businesses through innovative digital solutions. Enterprise-grade software development, cloud, AI integration, and IT consulting.",
    keywords: [
      "IT services",
      "digital transformation",
      "custom software development",
      "cloud solutions",
      "AI integration",
      "enterprise consulting",
    ],
    path: "/",
  });
}

export default async function Home() {
  const [home, homeFaqItems, featuredServices] = await Promise.all([
    getHomepageContent(),
    getFaqs("homepage"),
    getFeaturedServices(),
  ]);

  return (
    <>
      <HeroSection slides={home.slides} />
      <GalaxyStack stagger={0}>
        <ServicesOverview services={featuredServices} />
      </GalaxyStack>
      <GalaxyStack stagger={1}>
        <WhyChooseUsSection items={home.valueProps} />
      </GalaxyStack>
      <ServicesProcessScroll steps={home.processSteps} />
      <GalaxyStack stagger={2}>
        <TeamThoughtsCarouselSection thoughts={home.teamThoughts} />
      </GalaxyStack>
      <GalaxyStack stagger={3}>
        <IndustryExpertiseSection industries={home.industries} />
      </GalaxyStack>
      <GalaxyStack stagger={4}>
        <StatisticsSection stats={home.stats} />
      </GalaxyStack>
      <FaqSection
        id="home-faq"
        stackStagger={5}
        items={homeFaqItems}
        badge="FAQ"
        title="Frequently asked questions about FocusFolks"
        description="Detailed answers about our custom software development services, delivery process, pricing, technology stack, and how to start an engagement with our Ahmedabad and Dubai teams."
      />
      <ServicesCtaSection />
    </>
  );
}
