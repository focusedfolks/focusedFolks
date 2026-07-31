"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { defaultTransition, fadeUp, homeScrollViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";

type IndustryFlipCardProps = {
  industry: {
    name: string;
    image: string;
    description: string;
  };
  idx: number;
};

export function IndustryFlipCard({ industry, idx }: IndustryFlipCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={homeScrollViewport}
      variants={fadeUp}
      transition={{ ...defaultTransition, duration: 0.45, delay: idx * 0.05 }}
      className="h-full w-full"
    >
      <div
        className={cn(
          "service-flip-card group/industry-flip block w-full outline-none",
          !prefersReducedMotion && "service-flip-card--interactive"
        )}
        tabIndex={0}
        role="article"
        aria-label={`${industry.name} industry expertise`}
      >
        <div className="service-flip-inner relative aspect-[7/4] w-full min-h-[200px] sm:min-h-[220px] lg:min-h-[240px]">
          {/* Front — business card content */}
          <div className="service-flip-face service-flip-front absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-white/18 bg-slate-950/50 p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.1] via-transparent to-cyan-500/[0.08]"
              aria-hidden
            />
            <div className="relative flex items-start justify-between gap-3">
              <span className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-200">
                Enterprise-ready
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Industry</span>
            </div>
            <h3 className="relative mt-4 text-xl font-extrabold tracking-tight text-white sm:text-2xl">{industry.name}</h3>
            <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-200">{industry.description}</p>
            <p className="relative mt-4 text-xs font-semibold text-cyan-200/90">Hover for sector focus</p>
          </div>

          {/* Back — industry icon on white */}
          <div className="service-flip-face service-flip-back absolute inset-0 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <Image
              src={industry.image}
              alt={`${industry.name} icon`}
              fill
              className="object-contain object-center p-8 sm:p-10"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
