"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/constants/services";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { ServiceFlipCard } from "@/sections/services/service-flip-card";
import { fadeUp, defaultTransition, homeScrollViewport } from "@/lib/animations";

const HOME_FEATURED_SERVICE_IDS = ["custom-software", "web-development", "design"] as const;

export function ServicesOverview() {
  const featuredServices = HOME_FEATURED_SERVICE_IDS.flatMap((id) => {
    const service = services.find((item) => item.id === id);
    return service ? [service] : [];
  });

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Services"
          title="Everything your business needs to modernize and grow"
          description="Enterprise-ready engineering with a premium delivery experience—strategy to launch and beyond."
          align="left"
          servicesPage
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={homeScrollViewport}
          variants={fadeUp}
          transition={{ ...defaultTransition, duration: 0.42 }}
          className="relative mb-8 overflow-hidden rounded-[2rem_2.5rem_2rem_2rem] border border-white/10"
        >
          <div className="relative min-h-[120px] sm:min-h-[140px]">
            <Image src="/1.png" alt="" fill sizes="100vw" className="object-cover object-center" aria-hidden />
            <div
              className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/40"
              aria-hidden
            />
            <div className="relative flex min-h-[120px] flex-col justify-center px-6 py-6 sm:min-h-[140px] sm:px-8">
              <p className="text-sm font-semibold text-white sm:text-base">
                Strategy · Engineering · Cloud · AI — one partner from discovery to scale
              </p>
              <p className="mt-1.5 max-w-2xl text-xs text-slate-300 sm:text-sm">
                Ahmedabad & Dubai delivery centers with transparent pricing and enterprise-grade governance.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, idx) => (
            <ServiceFlipCard key={service.id} service={service} idx={idx} compact />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            asChild
            className="from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-blue-500/20 hover:scale-[1.03]"
          >
            <Link href="/services">
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
