"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { scrollRevealViewport } from "@/lib/animations";
import { caseStudies } from "@/constants/content";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Case Studies"
          title="Proof that enterprise delivery works"
          description="Measurable outcomes across platforms, industries, and timelines."
          align="left"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {caseStudies.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollRevealViewport}
              transition={{ duration: 0.35, delay: idx * 0.03 }}
              whileHover={{ y: -6 }}
              className="glass group overflow-hidden rounded-3xl"
            >
              <div className="relative p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      {c.industry}
                    </div>
                    <h3 className="mt-2 text-xl font-extrabold text-white">{c.title}</h3>
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition-colors group-hover:bg-white/10">
                    Results
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">{c.description}</p>

                <div className="mt-6 grid gap-3">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                      <div className="text-sm text-slate-300">{m.label}</div>
                      <div className="text-sm font-extrabold text-white">{m.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button asChild variant="ghost" className="h-10 px-0 text-white">
                    <Link href="/contact">
                      Discuss this outcome
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="h-2 w-full bg-gradient-to-r from-secondary via-accent to-secondary opacity-0 transition-opacity group-hover:opacity-80" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

