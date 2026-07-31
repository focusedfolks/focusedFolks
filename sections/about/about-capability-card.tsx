"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { DynamicIcon } from "@/components/shared/icon-map";
import { defaultTransition, fadeUp, servicesScrollViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";

type AboutCapability = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  icon: string;
  href: string;
  highlights: readonly string[];
};

type AboutCapabilityCardProps = {
  area: AboutCapability;
  idx: number;
};

export function AboutCapabilityCard({ area, idx }: AboutCapabilityCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const isFirstCard = idx === 0;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={servicesScrollViewport}
      variants={fadeUp}
      transition={{ ...defaultTransition, duration: 0.45, delay: idx * 0.06 }}
      className="h-full w-full"
    >
      <Link
        href={area.href}
        className={cn(
          "service-flip-card group/service-flip block w-full outline-none",
          !prefersReducedMotion && "service-flip-card--interactive"
        )}
        aria-label={`${area.title} — hover to preview, click to learn more`}
      >
        <div className="service-flip-inner relative w-full">
          <div className="service-flip-face service-flip-front relative flex flex-col items-start overflow-hidden rounded-3xl border border-white/18 bg-white/[0.04] p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_16px_48px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-5">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.08] via-transparent to-cyan-500/[0.06]"
              aria-hidden
            />

            <div className="relative flex w-full items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-500/10 shadow-[0_6px_18px_rgba(34,211,238,0.12)]">
                <DynamicIcon name={area.icon} className="h-5 w-5 text-cyan-100" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-extrabold leading-snug text-white sm:text-lg">{area.title}</h3>
                <p className="mt-0.5 text-xs font-semibold leading-snug text-cyan-200/95">{area.tagline}</p>
              </div>
            </div>

            <p className="relative mt-2 line-clamp-2 text-xs leading-relaxed text-slate-300/95 sm:text-sm">
              {area.description}
            </p>

            <ul className="relative mt-2.5 flex w-full flex-col gap-1.5">
              {area.highlights.map((point) => (
                <li key={point} className="service-flip-point flex w-full items-center gap-2 px-2.5 py-1.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-cyan-400/30 bg-cyan-500/15">
                    <Check className="h-3 w-3 text-cyan-100" strokeWidth={2.5} />
                  </span>
                  <span className="text-xs font-semibold leading-snug text-cyan-50/95">{point}</span>
                </li>
              ))}
            </ul>

            <div className="relative mt-2.5 flex w-full items-center gap-1.5 text-xs font-semibold text-cyan-200">
              Hover to preview
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/service-flip:translate-x-1" />
            </div>
          </div>

          <div className="service-flip-face service-flip-back absolute inset-0 min-h-full overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_24px_56px_rgba(0,0,0,0.2)]">
            <Image
              src={area.image}
              alt=""
              fill
              className={cn(
                "object-center",
                isFirstCard ? "object-contain bg-slate-950 p-2" : "object-cover"
              )}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
