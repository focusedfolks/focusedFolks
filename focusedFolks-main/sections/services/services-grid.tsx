"use client";

import { services } from "@/constants/services";
import { ServiceFlipCard } from "@/sections/services/service-flip-card";

export function ServicesGrid() {
  return (
    <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
      {services.map((service, idx) => (
        <ServiceFlipCard key={service.id} service={service} idx={idx} />
      ))}
    </div>
  );
}
