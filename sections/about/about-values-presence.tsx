"use client";

import { motion } from "framer-motion";
import { companyValues, officeLocations } from "@/constants/content";
import { DynamicIcon } from "@/components/shared/icon-map";
import { SectionHeader } from "@/components/shared/section-header";
import { defaultTransition, fadeUp, servicesScrollViewport } from "@/lib/animations";

export function AboutValuesPresence() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              badge="Our values"
              title="What guides every release and every client conversation"
              description="Quality, transparency, and engineering discipline—not buzzwords, but how we operate sprint to sprint."
              align="left"
              servicesPage
            />

            <div className="space-y-4">
              {companyValues.map((v, idx) => (
                <motion.div
                  key={v.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={servicesScrollViewport}
                  variants={fadeUp}
                  transition={{ ...defaultTransition, delay: idx * 0.05 }}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
                >
                  <motion.div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-blue-500/30 to-cyan-500/15 shadow-[0_8px_24px_rgba(34,211,238,0.12)]"
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.25 }}
                  >
                    <DynamicIcon name={v.icon} className="h-7 w-7 text-cyan-100" />
                  </motion.div>
                  <div>
                    <h3 className="text-base font-bold text-white">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{v.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionHeader
              badge="Global presence"
              title="Ahmedabad engineering · Dubai client proximity"
              description="Dual-shore delivery with follow-the-sun overlap for US, UK, and GCC time zones."
              align="left"
              servicesPage
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {officeLocations.map((o, idx) => (
                <motion.div
                  key={o.city}
                  initial="hidden"
                  whileInView="visible"
                  viewport={servicesScrollViewport}
                  variants={fadeUp}
                  transition={{ ...defaultTransition, delay: idx * 0.06 }}
                  className="rounded-3xl border border-white/12 bg-slate-950/45 p-6 backdrop-blur-xl"
                >
                  <div className="text-sm font-bold text-cyan-200">{o.city}</div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-300">{o.address}</div>
                  <div className="mt-4 space-y-1.5 text-sm">
                    <div className="font-medium text-white/90">{o.phone}</div>
                    <div className="text-slate-400">{o.email}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={servicesScrollViewport}
              variants={fadeUp}
              transition={defaultTransition}
              className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-500/15 to-cyan-500/10 p-6"
            >
              <div className="text-sm font-bold text-cyan-200">Culture</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                We build relationships through clarity and follow-through. When you partner with FocusFolks, you get a
                team that treats outcomes as shared priorities—not vendor milestones on a Gantt chart.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
