"use client";

import { clientLogos } from "@/constants/content";

export function LogoMarquee() {
  const logos = [...clientLogos, ...clientLogos];

  return (
    <div className="relative overflow-hidden py-4">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />
      <div className="flex animate-marquee gap-12">
        {logos.map((logo, i) => (
          <div
            key={`${logo}-${i}`}
            className="flex shrink-0 items-center justify-center px-6"
          >
            <span className="whitespace-nowrap text-lg font-bold tracking-tight text-slate-300 transition-colors hover:text-slate-400">
              {logo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
