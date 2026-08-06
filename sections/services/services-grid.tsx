"use client";

import { services as fallbackServices } from "@/constants/services";
import type { Service } from "@/types";
import { ServiceFlipCard } from "@/sections/services/service-flip-card";

export function ServicesGrid({ services }: { services?: Service[] }) {
  const list = services?.length ? services : fallbackServices;
  return (
    <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
      {list.map((service, idx) => (
        <ServiceFlipCard key={service.id} service={service} idx={idx} />
      ))}
    </div>
  );
}
