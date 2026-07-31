"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollStackCard } from "@/components/shared/scroll-stack-card";

type CtaSectionProps = {
  title?: string;
  description?: string;
  image?: string;
  /** Content only — for use inside a glass card (e.g. contact page) */
  embedded?: boolean;
  stackStagger?: number;
};

export function CtaSection({
  title = "Ready to Transform Your Business?",
  description = "Schedule a free consultation with our experts and discover how we can accelerate your digital journey.",
  image = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2400&q=80",
  embedded = false,
  stackStagger = 0,
}: CtaSectionProps) {
  const inner = (
    <div className="relative overflow-hidden text-center">
      {!embedded && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image src={image} alt="" fill className="object-cover opacity-[0.12]" sizes="100vw" />
        </div>
      )}
      <div className="relative">
        <h2
          className={
            embedded
              ? "text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl"
              : "text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
          }
        >
          {title}
        </h2>
        <p
          className={
            embedded
              ? "mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
              : "mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg"
          }
        >
          {description}
        </p>
        <div className={embedded ? "mt-8" : "mt-10"}>
          <Button size="lg" asChild>
            <Link href="/contact">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <p className={`${embedded ? "mt-5" : "mt-6"} text-xs text-slate-400`}>
          Typical response time under 24 hours • NDA available • Security-first delivery
        </p>
      </div>
    </div>
  );

  if (embedded) {
    return <section className="text-center">{inner}</section>;
  }

  return (
    <section className="relative py-20 md:py-28">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollStackCard stagger={stackStagger} className="rounded-3xl p-7 md:p-10">
          {inner}
        </ScrollStackCard>
      </div>
    </section>
  );
}
