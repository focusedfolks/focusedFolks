"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/types";
import { serviceHeroImages } from "@/constants/services";
import { DynamicIcon } from "@/components/shared/icon-map";
import { defaultTransition, fadeUp, servicesScrollViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";

type ServiceFlipCardProps = {
  service: Service;
  idx: number;
  /** Compact layout for home page — content-driven height, no cropping */
  compact?: boolean;
};

export function ServiceFlipCard({ service, idx, compact = false }: ServiceFlipCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const heroImage = serviceHeroImages[service.id];
  const highlights = compact ? (service.features ?? []).slice(0, 2) : (service.features ?? []);
  const isFirstCompactCard = compact && idx === 0;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={servicesScrollViewport}
      variants={fadeUp}
      transition={{ ...defaultTransition, duration: 0.45, delay: idx * 0.04 }}
      className="h-full w-full"
    >
      <Link
        href={service.href}
        className={cn(
          "service-flip-card group/service-flip block w-full outline-none",
          compact && "service-flip-card--compact",
          !prefersReducedMotion && "service-flip-card--interactive"
        )}
        aria-label={`${service.title} — hover to preview image, click to view service`}
      >
        {compact ? (
          <div className="service-flip-inner relative w-full">
            <div className="service-flip-face service-flip-front relative flex flex-col items-start overflow-hidden rounded-3xl border border-white/18 bg-white/[0.04] p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_16px_48px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-5">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.08] via-transparent to-cyan-500/[0.06]"
                aria-hidden
              />

              <div className="relative flex w-full items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-500/10 shadow-[0_6px_18px_rgba(34,211,238,0.12)]">
                  <DynamicIcon name={service.icon} className="h-5 w-5 text-cyan-100" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-extrabold leading-snug text-white sm:text-lg">{service.title}</h3>
                  {service.megaSummary && (
                    <p className="mt-0.5 text-xs font-semibold leading-snug text-cyan-200/95">{service.megaSummary}</p>
                  )}
                </div>
              </div>

              <p className="relative mt-2 line-clamp-2 text-xs leading-relaxed text-slate-300/95 sm:text-sm">
                {service.description}
              </p>

              {highlights.length > 0 && (
                <ul className="relative mt-2.5 flex w-full flex-col gap-1.5">
                  {highlights.map((point) => (
                    <li key={point} className="service-flip-point flex w-full items-center gap-2 px-2.5 py-1.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-cyan-400/30 bg-cyan-500/15">
                        <Check className="h-3 w-3 text-cyan-100" strokeWidth={2.5} />
                      </span>
                      <span className="text-xs font-semibold leading-snug text-cyan-50/95">{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="relative mt-2.5 flex w-full items-center gap-1.5 text-xs font-semibold text-cyan-200">
                Hover to preview
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/service-flip:translate-x-1" />
              </div>
            </div>

            <div className="service-flip-face service-flip-back absolute inset-0 min-h-full overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_24px_56px_rgba(0,0,0,0.2)]">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt=""
                  fill
                  className={cn(
                    "object-center",
                    isFirstCompactCard ? "object-contain bg-slate-950 p-2" : "object-cover"
                  )}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-white" aria-hidden />
              )}
            </div>
          </div>
        ) : (
          <div className="service-flip-inner relative aspect-[3/2] w-full min-h-[300px] sm:min-h-[340px] md:min-h-[360px] lg:min-h-[400px]">
            <div className="service-flip-face service-flip-front absolute inset-0 flex flex-col items-start overflow-hidden rounded-3xl border border-white/18 bg-white/[0.04] p-6 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_16px_48px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-7">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.08] via-transparent to-cyan-500/[0.06]"
                aria-hidden
              />

              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-500/10 shadow-[0_8px_24px_rgba(34,211,238,0.12)]">
                <DynamicIcon name={service.icon} className="h-7 w-7 text-cyan-100" />
              </div>

              {service.megaSummary && (
                <p className="relative mt-5 text-base font-semibold leading-snug tracking-tight text-cyan-200/95 sm:text-lg">
                  {service.megaSummary}
                </p>
              )}

              <div className="relative mt-3 w-full">
                <h3 className="text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl lg:text-[1.65rem]">
                  {service.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-300/95 sm:text-[0.9375rem]">
                  {service.description}
                </p>
              </div>

              {highlights.length > 0 && (
                <ul className="relative mt-5 flex w-full flex-1 flex-col justify-center gap-2.5 sm:gap-3">
                  {highlights.map((point) => (
                    <li key={point} className="service-flip-point flex w-full items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-500/15">
                        <Check className="h-3.5 w-3.5 text-cyan-100" strokeWidth={2.5} />
                      </span>
                      <span className="text-sm font-semibold leading-snug text-cyan-50/95 sm:text-[0.9375rem]">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="relative mt-auto flex w-full items-center gap-2 pt-5 text-sm font-semibold text-cyan-200 sm:text-base">
                Hover to preview
                <ArrowRight className="h-4 w-4 transition-transform group-hover/service-flip:translate-x-1" />
              </div>
            </div>

            <div className="service-flip-face service-flip-back absolute inset-0 overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_24px_56px_rgba(0,0,0,0.2)]">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt=""
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-white" aria-hidden />
              )}
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
