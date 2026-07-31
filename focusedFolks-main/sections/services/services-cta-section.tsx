"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CtaBackdrop, CtaStarOverlay } from "@/components/shared/cta-backdrop";
import { fadeUp, defaultTransition, servicesScrollViewport } from "@/lib/animations";

export function ServicesCtaSection() {
  return (
    <section className="services-cta-section relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-t border-white/10 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/4.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-slate-950/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-950/55 to-black/88" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={servicesScrollViewport}
          variants={fadeUp}
          transition={defaultTransition}
          className="services-cta-banner relative min-h-[360px] overflow-hidden rounded-3xl sm:min-h-[400px] lg:min-h-[440px]"
        >
          <CtaBackdrop />

          <div className="absolute inset-0 z-[1]">
            <Image
              src="/2.png"
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority={false}
            />
          </div>
          <CtaStarOverlay />
          <div className="absolute inset-0 z-[4] bg-gradient-to-r from-slate-950/92 via-slate-950/78 to-slate-950/50" />
          <div className="absolute inset-0 z-[4] bg-gradient-to-t from-slate-950/65 via-slate-950/15 to-slate-950/25" />

          <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-center px-6 py-12 sm:min-h-[400px] sm:px-10 md:px-14 lg:min-h-[440px] lg:max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/90">Get started</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to transform your business with enterprise IT?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">
              Schedule a free consultation with our Ahmedabad &amp; Dubai delivery team. We&apos;ll map scope,
              timelines, and the right service mix for your roadmap.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                asChild
                className="from-blue-500 to-cyan-500 shadow-blue-500/25 hover:from-blue-600 hover:to-cyan-600 hover:scale-[1.03]"
              >
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
            <p className="mt-5 text-xs text-slate-400">
              Typical response under 24 hours · NDA available · Security-first delivery
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
