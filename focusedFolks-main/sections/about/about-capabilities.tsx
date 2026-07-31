"use client";

import { aboutCapabilityAreas } from "@/constants/content";
import { SectionHeader } from "@/components/shared/section-header";
import { AboutCapabilityCard } from "@/sections/about/about-capability-card";

export function AboutCapabilities() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="What we deliver"
          title="One live product today, innovation capabilities for tomorrow"
          description="Client Credit Tracker is shipping now. Web, mobile, cloud, AI, and SaaS are on our roadmap—built with the same engineering discipline we apply to every release."
          align="left"
          servicesPage
        />

        <div className="about-capabilities-masonry">
          {aboutCapabilityAreas.map((area, idx) => (
            <div key={area.id} className="about-capability-item mb-5 break-inside-avoid">
              <AboutCapabilityCard area={area} idx={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
