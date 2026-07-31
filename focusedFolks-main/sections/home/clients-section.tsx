"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { scrollRevealViewport } from "@/lib/animations";
import { clientLogos } from "@/constants/content";
import { LogoMarquee } from "@/components/shared/logo-marquee";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function ClientsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Trusted by teams"
          title="Enterprise clients powering innovation"
          description="From fast-growing startups to global enterprises—our delivery approach scales with your ambition."
          align="left"
        />

        <div className="glass mt-10 rounded-3xl p-6">
          <LogoMarquee />
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {clientLogos.slice(0, 10).map((logo) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollRevealViewport}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -3 }}
              className="glass flex min-h-[56px] items-center justify-center rounded-2xl px-4 py-3 text-center"
            >
              <span className="text-sm font-semibold text-white/90">{logo}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="max-w-xl text-sm leading-relaxed text-slate-300">
            Want to see how we work with your industry? Browse our services or book a consultation.
          </p>
          <Button variant="outline" asChild>
            <Link href="/services">
              View Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

