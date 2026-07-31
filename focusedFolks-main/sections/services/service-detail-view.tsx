"use client";

import type { Service, ServiceDetailContent } from "@/types";
import { FaqSection } from "@/components/shared/faq-section";
import { GalaxyStack } from "@/components/shared/scroll-stack-card";
import { IndustryExpertiseSection } from "@/sections/home/industry-expertise";
import { ServicesProcessScroll } from "@/sections/services/services-process-scroll";
import { ServicesCtaSection } from "@/sections/services/services-cta-section";
import { ServiceDetailHero } from "@/sections/services/service-detail-hero";
import { ServiceDetailHighlights } from "@/sections/services/service-detail-highlights";

type ServiceDetailViewProps = {
  service: Service;
  detail: ServiceDetailContent;
};

export function ServiceDetailView({ service, detail }: ServiceDetailViewProps) {
  return (
    <>
      <ServiceDetailHero service={service} detail={detail} />

      <GalaxyStack stagger={4}>
        <ServiceDetailHighlights service={service} detail={detail} />
      </GalaxyStack>

      <ServicesProcessScroll />

      <GalaxyStack stagger={8}>
        <IndustryExpertiseSection />
      </GalaxyStack>

      <FaqSection
        id={`${service.id}-faq`}
        stackStagger={12}
        items={detail.faqs}
        badge="FAQ"
        title={`${service.title} — common questions`}
        description="Scope, timelines, pricing, and how to start an engagement for this service."
        servicesPage
      />

      <ServicesCtaSection />
    </>
  );
}
