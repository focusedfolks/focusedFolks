"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const capabilities = [
  "Custom Software Development",
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Cloud Solutions",
  "DevOps",
  "AI Integration",
  "Digital Transformation",
  "IT Consulting",
  "Staff Augmentation",
];

export function ServicesHero() {
  return (
    <section className="relative pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass overflow-hidden rounded-3xl p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <SectionHeader
                badge="Services"
                title="Build, modernize, and scale with enterprise confidence"
                description="We deliver digital solutions designed for performance, security, and measurable business outcomes."
                align="left"
                servicesPage
              />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-wrap gap-2">
                  {capabilities.slice(0, 6).map((cap) => (
                    <span
                      key={cap}
                      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 backdrop-blur-sm"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </motion.div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  <Link href="/pricing">
                    View Pricing
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass rounded-3xl p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/25 to-cyan-500/15 text-cyan-200">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Technology-first delivery</div>
                    <div className="text-sm text-slate-300">A premium process backed by proven engineering.</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {capabilities.slice(6).map((cap) => (
                    <div
                      key={cap}
                      className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold text-slate-200"
                    >
                      {cap}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/20 to-cyan-500/10 px-4 py-4">
                  <div className="text-xs font-semibold text-slate-200">Enterprise delivery baseline</div>
                  <div className="mt-2 text-sm font-bold text-white">
                    Security, QA gates, transparent reporting
                  </div>
                  <div className="mt-3 text-xs text-slate-300">
                    Built to reduce risk and accelerate time-to-value.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

