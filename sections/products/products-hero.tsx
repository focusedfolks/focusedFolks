"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Boxes } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";

export function ProductsHero() {
  return (
    <section className="relative pt-24 pb-4 md:pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass relative overflow-hidden rounded-3xl p-6 md:p-10">
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/[0.09] via-transparent to-cyan-500/[0.07]"
            aria-hidden
          />

          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <SectionHeader
                badge="Products"
                title="SaaS tools built by Focused Folks"
                description="Purpose-built software for Angadiya accounting, delivery teams, and operations—starting with Client Credit Tracker, with more products on the way."
                align="left"
                servicesPage
                className="mb-0 md:mb-0"
              />

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base"
              >
                We ship products the same way we ship client work: secure, scalable, and designed for real
                enterprise workflows. Explore what&apos;s live today or get notified when the next releases land.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.18 }}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <Button size="lg" asChild>
                  <a href="#products-grid">
                    View products
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  <Link href="/contact">Partner with us</Link>
                </Button>
              </motion.div>
            </div>

            <div className="lg:col-span-4">
              <div className="glass rounded-3xl border border-white/10 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/15">
                  <Boxes className="h-6 w-6 text-cyan-200" />
                </div>
                <p className="mt-4 text-sm font-semibold text-white">Product roadmap</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  1 live SaaS product today · 3 more in active development
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    Client Credit Tracker — available now
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                    InsightDesk — Q3 2026
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                    SecureVault IAM — Q4 2026
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                    TeamPulse — Q1 2027
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
