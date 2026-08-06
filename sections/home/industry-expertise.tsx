"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { industries as fallbackIndustries } from "@/constants/services";
import type { IndustryItem } from "@/lib/cms/homepage";
import { SectionHeader } from "@/components/shared/section-header";
import { IndustryFlipCard } from "@/sections/home/industry-flip-card";
import { fadeUp, defaultTransition, homeScrollViewport } from "@/lib/animations";

export function IndustryExpertiseSection({ industries }: { industries?: IndustryItem[] }) {
  const list = industries && industries.length > 0 ? industries : fallbackIndustries;
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Industry expertise"
          title="Built for regulated and high-impact environments"
          description="We help teams ship with confidence—security, compliance, and performance built-in."
          align="left"
          servicesPage
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={homeScrollViewport}
          variants={fadeUp}
          transition={{ ...defaultTransition, duration: 0.42 }}
          className="home-industry-accent relative mt-8"
        >
          <Image src="/2.png" alt="" fill sizes="100vw" className="object-cover object-center" aria-hidden />
          <div className="home-industry-accent-overlay" aria-hidden />
          <div className="relative flex min-h-[140px] flex-col justify-center px-6 py-8 md:px-10">
            <p className="max-w-2xl text-sm font-semibold text-cyan-100 sm:text-base">
              Healthcare · Fintech · Retail · Manufacturing · Government · SaaS
            </p>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm">
              Sector-aware delivery with compliance, uptime, and security expectations baked into every roadmap.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((industry, idx) => (
            <IndustryFlipCard key={industry.name} industry={industry} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
