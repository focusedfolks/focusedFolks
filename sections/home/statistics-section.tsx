"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { homeHighlightStats } from "@/constants/content";
import type { StatItem } from "@/lib/cms/homepage";
import { SectionHeader } from "@/components/shared/section-header";
import { defaultTransition, fadeUp, homeScrollViewport } from "@/lib/animations";

const STAT_FLAIR = [
  "Founder, PM, design, and creative support in one room.",
  "Client Credit Tracker — our live accounting CRM.",
  "Software, design, cloud, AI, and more on the roadmap.",
  "Quality and honesty over inflated promises.",
] as const;

export function StatisticsSection({ stats }: { stats?: StatItem[] }) {
  const list = stats && stats.length > 0 ? stats : homeHighlightStats;
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-5">
            <SectionHeader
              badge="Where We Stand"
              title="An early team building in public"
              description="No inflated client counts—just the people, product, and priorities shaping FocusFolks today."
              align="left"
              servicesPage
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={homeScrollViewport}
              variants={fadeUp}
              transition={{ ...defaultTransition, duration: 0.42 }}
              className="home-stats-visual relative mt-8 hidden lg:block"
            >
              <Image src="/3.png" alt="" fill sizes="(min-width: 1024px) 420px, 0" className="object-cover" aria-hidden />
              <div className="home-stats-visual-overlay" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-sm font-semibold text-cyan-100">Started with purpose</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Four specialists, one shipped platform, and a SaaS · AI · cloud roadmap we&apos;re building step by step.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="home-stats-metrics lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {list.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={homeScrollViewport}
                  variants={fadeUp}
                  transition={{ ...defaultTransition, duration: 0.42, delay: idx * 0.04 }}
                  className="home-stat-card group rounded-[1.75rem] border border-white/14 bg-slate-950/50 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
                  aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
                >
                  <div className="home-stat-index" aria-hidden>
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="home-stat-value tabular-nums">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2.6} />
                  </div>
                  <div className="home-stat-label mt-3">{stat.label}</div>
                  <p className="home-stat-flair mt-2">{STAT_FLAIR[idx]}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={homeScrollViewport}
              variants={fadeUp}
              transition={{ ...defaultTransition, duration: 0.42, delay: 0.16 }}
              className="home-stat-highlight mt-6 overflow-hidden rounded-[1.75rem_2.25rem_1.75rem_2rem] border border-cyan-400/25 p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="home-stat-highlight-kicker">Partnership status</p>
                  <p className="home-stat-highlight-value tabular-nums">Open</p>
                </div>
                <span className="home-stat-highlight-badge">First collaborations welcome</span>
              </div>
              <p className="home-stat-highlight-copy mt-4">
                We&apos;re looking for early partners who value transparent delivery, thoughtful design, and engineering
                that scales—whether custom software, web platforms, or product design.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
