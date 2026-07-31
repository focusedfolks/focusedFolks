"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { whyChooseUs } from "@/constants/services";
import { DynamicIcon } from "@/components/shared/icon-map";
import { SectionHeader } from "@/components/shared/section-header";
import { defaultTransition, fadeUp, servicesScrollViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";

const TAG_COLORS = [
  "border-sky-400/25 bg-sky-500/10 text-sky-100",
  "border-violet-400/25 bg-violet-500/10 text-violet-100",
  "border-cyan-400/25 bg-cyan-500/10 text-cyan-100",
] as const;

export function ServicesBenefits() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Benefits"
          title="What you can expect from every engagement"
          description="Premium communication, disciplined delivery, and scalable solutions built to last—backed by measurable outcomes."
          align="left"
          servicesPage
        />

        <div className="services-benefits-masonry">
          {whyChooseUs.map((item, idx) => (
            <motion.article
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={servicesScrollViewport}
              variants={fadeUp}
              transition={{ ...defaultTransition, duration: 0.48, delay: idx * 0.05 }}
              className="services-benefit-card group mb-4 break-inside-avoid sm:mb-5"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-slate-950/45 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 sm:p-7">
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition-opacity group-hover:opacity-100"
                  aria-hidden
                />

                <motion.div
                  className="relative flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-blue-500/30 to-cyan-500/15 shadow-[0_8px_32px_rgba(34,211,238,0.15)]"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                >
                  <DynamicIcon name={item.icon} className="h-9 w-9 text-cyan-100" />
                </motion.div>

                <h3 className="relative mt-5 text-xl font-bold text-white">{item.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="relative mt-4 space-y-2">
                    {item.highlights.map((point, i) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-slate-200">
                        <span
                          className={cn(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                            TAG_COLORS[i % TAG_COLORS.length]
                          )}
                        >
                          <Check className="h-3 w-3" strokeWidth={2.5} />
                        </span>
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
