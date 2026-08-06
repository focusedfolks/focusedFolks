import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { ServicesHero } from "@/sections/services/services-hero";
import { ServicesGrid } from "@/sections/services/services-grid";
import { ServicesProcessScroll } from "@/sections/services/services-process-scroll";
import { ServicesBenefits } from "@/sections/services/services-benefits";
import { ServicesCtaSection } from "@/sections/services/services-cta-section";
import { SectionHeader } from "@/components/shared/section-header";
import { ServicesTechStackTabs } from "@/sections/services/services-tech-stack-tabs";
import { CaseStudiesSection } from "@/sections/home/case-studies-section";
import { FaqSection } from "@/components/shared/faq-section";
import { GalaxyStack } from "@/components/shared/scroll-stack-card";
import { getServices } from "@/lib/cms/services";
import { getFaqs } from "@/lib/cms/faqs";

export const revalidate = 300;

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Services",
    description:
      "Enterprise IT services from Ahmedabad & Dubai: custom software, Next.js web development, mobile apps, UI/UX design, AWS/Azure/GCP cloud migration, DevOps, AI integration, and staff augmentation. 127+ projects delivered.",
    keywords: [
      "custom software development India",
      "web development company Ahmedabad",
      "mobile app development Dubai",
      "UI UX design services",
      "cloud migration AWS Azure GCP",
      "DevOps CI/CD services",
      "AI integration LLM RAG",
      "IT consulting UAE",
      "staff augmentation India",
      "software development company Gujarat",
    ],
    path: "/services",
  });
}

export default async function ServicesPage() {
  const [services, faqItems] = await Promise.all([getServices(), getFaqs("services")]);

  return (
    <>
      <GalaxyStack stagger={0}>
        <ServicesHero />
      </GalaxyStack>

      <GalaxyStack stagger={4}>
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Service catalog"
              title="Ten practice areas. One delivery standard."
              description="From discovery sprint to production launch—every service follows the same agile process, security gates, and transparent reporting."
              align="left"
              servicesPage
            />
            <ServicesGrid services={services} />
          </div>
        </section>
      </GalaxyStack>

      <GalaxyStack stagger={8}>
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <SectionHeader
                  badge="Technology stack"
                  title="Modern engineering stack—enterprise proven"
                  description="We combine proven tools with secure practices to deliver fast and reliably."
                  align="left"
                  servicesPage
                />
              </div>
              <div className="lg:col-span-7">
                <ServicesTechStackTabs />
              </div>
            </div>
          </div>
        </section>
      </GalaxyStack>

      <ServicesProcessScroll />

      <GalaxyStack stagger={12}>
        <ServicesBenefits />
      </GalaxyStack>

      <GalaxyStack stagger={16}>
        <CaseStudiesSection />
      </GalaxyStack>

      <FaqSection
        id="services-faq"
        stackStagger={20}
        items={faqItems}
        badge="Services FAQ"
        title="Common questions about our IT services"
        description="Scope, timelines, pricing, technology stack, and how to get started with FocusFolks."
      />

      <ServicesCtaSection />
    </>
  );
}
