"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { companyStats } from "@/constants/content";

const HERO_TAGS = [
  "Accounting CRM",
  "SaaS products",
  "Custom software",
  "AI innovation",
  "Cloud-native",
  "Future roadmap",
] as const;

export function AboutHero() {
  return (
    <section className="relative pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass relative overflow-hidden rounded-3xl p-6 md:p-10">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/[0.09] via-transparent to-cyan-500/[0.07]" aria-hidden />

          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <SectionHeader
                badge="About FocusFolks"
                title="A newly launched software company building with purpose"
                description="We are a four-person team with one live Accounting CRM product and a clear roadmap for SaaS, AI, cloud, and custom software. No inflated claims—just honest engineering and room to grow together."
                align="left"
                servicesPage
              />

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-2"
              >
                {HERO_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <p className="mt-6 text-sm leading-relaxed text-slate-300 sm:text-base">
                Client Credit Tracker is our first production product. We have not completed client projects yet—we
                are building our portfolio openly and partnering with teams who want to be part of that journey.
                Our future capabilities span AI products, automation, enterprise applications, and digital
                transformation.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Partner with us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  <Link href="/products">View our CRM product</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass rounded-3xl border border-white/10 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/15">
                    <Sparkles className="h-6 w-6 text-cyan-200" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Early stage · High standards</div>
                    <div className="text-sm text-slate-300">4 members · 1 live product · building forward</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {companyStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-4"
                    >
                      <div className="text-lg font-extrabold text-cyan-200 sm:text-xl">{stat.value}</div>
                      <div className="mt-1 text-xs font-bold text-white">{stat.label}</div>
                      <div className="mt-1 text-[10px] leading-snug text-slate-400">{stat.detail}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/20 to-cyan-500/10 px-4 py-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">Mission</div>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-white">
                    Build reliable software that creates real business value—through scalable architecture, transparent
                    delivery, and craftsmanship that earns trust over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
