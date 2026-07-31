"use client";

import { motion } from "framer-motion";
import { scrollRevealViewport } from "@/lib/animations";
import { processSteps } from "@/constants/services";
import { SectionHeader } from "@/components/shared/section-header";

export function ProcessSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Process"
          title="From discovery to scale—without the chaos"
          description="A transparent, iterative delivery approach that protects quality and accelerates outcomes."
          align="left"
        />

        <div className="relative mt-10">
          {/* Center line (desktop) */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 md:block" />

          <div className="space-y-5 md:space-y-0">
            {processSteps.map((s, idx) => {
              const left = idx % 2 === 0;
              return (
                <div key={s.title} className="relative md:grid md:grid-cols-12 md:items-stretch md:gap-6">
                  {/* Dot + connector */}
                  <div className="pointer-events-none absolute left-0 top-6 h-px w-8 bg-white/10 md:left-1/2 md:top-1/2 md:w-10 md:-translate-x-1/2" />
                  <div className="pointer-events-none absolute left-0 top-6 h-3 w-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_0_0_6px_rgba(255,255,255,0.06)] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2" />

                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={scrollRevealViewport}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    whileHover={{ y: -4 }}
                    className={[
                      "glass rounded-3xl p-6 md:p-7",
                      left ? "md:col-span-5 md:col-start-1" : "md:col-span-5 md:col-start-8",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="inline-flex items-center gap-3">
                        <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-extrabold tracking-widest text-slate-200">
                          {s.step}
                        </div>
                        <div className="text-xs font-semibold text-slate-400">Step {idx + 1}</div>
                      </div>
                      <div className="hidden h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/25 to-cyan-500/15 text-white md:flex">
                        <span className="text-sm font-extrabold">{idx + 1}</span>
                      </div>
                    </div>

                    <h3 className="mt-4 text-xl font-extrabold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{s.description}</p>
                  </motion.div>

                  {/* Spacer column to keep alternating layout clean */}
                  <div className={left ? "hidden md:block md:col-span-7" : "hidden md:block md:col-span-7 md:col-start-1"} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

