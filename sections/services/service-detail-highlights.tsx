"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import type { Service, ServiceDetailContent } from "@/types";
import { DynamicIcon } from "@/components/shared/icon-map";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { defaultTransition, fadeUp, servicesScrollViewport } from "@/lib/animations";

type ServiceDetailHighlightsProps = {
  service: Service;
  detail: ServiceDetailContent;
};

export function ServiceDetailHighlights({ service, detail }: ServiceDetailHighlightsProps) {
  const highlights = detail.excellence.slice(0, 4);
  const deliverables = detail.deliverables.slice(0, 4);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="At a glance"
          title={`Why teams choose our ${service.title.toLowerCase()} practice`}
          description={detail.overview[0]}
          align="left"
          servicesPage
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, idx) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={servicesScrollViewport}
              variants={fadeUp}
              transition={{ ...defaultTransition, duration: 0.42, delay: idx * 0.05 }}
              className="rounded-3xl border border-white/12 bg-slate-950/45 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-gradient-to-br from-blue-500/25 to-cyan-500/15">
                <DynamicIcon name={item.icon} className="h-5 w-5 text-cyan-100" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={servicesScrollViewport}
          variants={fadeUp}
          transition={{ ...defaultTransition, duration: 0.45, delay: 0.1 }}
          className="mt-6 grid gap-6 rounded-3xl border border-white/12 bg-slate-950/40 p-6 backdrop-blur-xl lg:grid-cols-[1fr_auto] lg:items-center lg:p-8"
        >
          <ul className="grid gap-2 sm:grid-cols-2">
            {deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-200">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Button
            size="lg"
            asChild
            className="w-full shrink-0 from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-blue-500/20 lg:w-auto"
          >
            <Link href="/contact">
              Schedule a meeting
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
