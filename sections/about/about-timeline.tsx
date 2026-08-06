"use client";

import { motion } from "framer-motion";
import type { AboutTimelineItem } from "@/lib/cms/about";
import { SectionHeader } from "@/components/shared/section-header";
import { defaultTransition, fadeUp, servicesScrollViewport } from "@/lib/animations";

export function AboutTimeline({ timeline }: { timeline: AboutTimelineItem[] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our journey"
          title="Just started—building openly and honestly"
          description="No client portfolio yet. One CRM product live. A four-member team focused on future innovation in SaaS, AI, cloud, and custom software."
          align="left"
          servicesPage
        />

        <div className="relative space-y-4">
          <div className="pointer-events-none absolute bottom-0 left-[1.35rem] top-0 hidden w-px bg-gradient-to-b from-cyan-500/40 via-blue-500/20 to-transparent md:block" aria-hidden />

          {timeline.map((t, idx) => (
            <motion.div
              key={t.year}
              initial="hidden"
              whileInView="visible"
              viewport={servicesScrollViewport}
              variants={fadeUp}
              transition={{ ...defaultTransition, duration: 0.42, delay: idx * 0.05 }}
              className="relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-slate-950/60 to-slate-900/30 p-6 backdrop-blur-sm md:flex-row md:items-start md:gap-6 md:p-7"
            >
              <div className="flex shrink-0 items-center gap-4 md:w-36 md:flex-col md:items-start">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/15 text-sm font-extrabold text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                  {t.year}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-extrabold text-white">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">{t.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
