"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { processStepImages, processSteps as fallbackProcessSteps } from "@/constants/services";
import type { ProcessStepItem } from "@/lib/cms/homepage";
import { SectionHeader } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";

function fallbackSteps(): ProcessStepItem[] {
  return fallbackProcessSteps.map((s, i) => ({
    step: s.step,
    title: s.title,
    description: s.description,
    image: processStepImages[i] ?? processStepImages[0],
  }));
}

function ProcessStepSlide({
  step,
  idx,
  stepCount,
  scrollYProgress,
}: {
  step: ProcessStepItem;
  idx: number;
  stepCount: number;
  scrollYProgress: MotionValue<number>;
}) {
  const segment = 1 / stepCount;
  const start = idx * segment;
  const end = (idx + 1) * segment;
  const isLast = idx === stepCount - 1;

  const opacity = useTransform(
    scrollYProgress,
    isLast
      ? [start, start + segment * 0.15, 1]
      : [start, start + segment * 0.12, end - segment * 0.12, end],
    isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );

  const contentY = useTransform(scrollYProgress, [start, end], [48, -32]);
  const imageScale = useTransform(scrollYProgress, [start, end], [1.12, 1]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <Image src={step.image} alt="" fill className="object-cover object-center" sizes="100vw" priority={idx === 0} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/88 via-slate-950/72 to-slate-950/55" />
      <div className="absolute inset-0 bg-slate-950/35" />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex h-full items-center px-6 py-10 sm:px-10 md:px-14 lg:px-16"
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-extrabold tracking-widest text-cyan-200 backdrop-blur-sm">
              {step.step}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Step {idx + 1} of {stepCount}
            </span>
          </div>
          <h3 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {step.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">{step.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProcessStaticFallback({ steps }: { steps: ProcessStepItem[] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto space-y-5 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Process"
          title="From discovery to scale—without the chaos"
          description="A transparent, iterative delivery approach that protects quality and accelerates outcomes."
          align="left"
          servicesPage
        />
        {steps.map((step) => (
          <div
            key={step.step + step.title}
            className="relative min-h-[280px] overflow-hidden rounded-3xl border border-white/10 sm:min-h-[320px]"
          >
            <Image src={step.image} alt="" fill className="object-cover object-center" sizes="100vw" />
            <div className="absolute inset-0 bg-slate-950/75" />
            <div className="relative z-10 p-6 md:p-10">
              <span className="text-xs font-extrabold tracking-widest text-cyan-200">{step.step}</span>
              <h3 className="mt-3 text-2xl font-extrabold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicesProcessScroll({ steps }: { steps?: ProcessStepItem[] }) {
  const list = steps && steps.length > 0 ? steps : fallbackSteps();
  const stepCount = list.length;
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const step = Math.min(stepCount - 1, Math.max(0, Math.floor(value * stepCount)));
    setActiveStep(step);
  });

  if (prefersReducedMotion) {
    return <ProcessStaticFallback steps={list} />;
  }

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${Math.max(stepCount, 1) * 100}vh` }}
      aria-label="Delivery process"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="container mx-auto flex h-full flex-col px-4 pb-6 pt-20 sm:px-6 sm:pt-24 lg:px-8">
          <SectionHeader
            badge="Process"
            title="From discovery to scale—without the chaos"
            description="Scroll to walk through each delivery phase—pinned until all six steps complete."
            align="left"
            servicesPage
            className="mb-4 md:mb-6"
          />

          <div className="relative min-h-0 flex-1 overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            {list.map((step, idx) => (
              <ProcessStepSlide
                key={step.step + step.title}
                step={step}
                idx={idx}
                stepCount={stepCount}
                scrollYProgress={scrollYProgress}
              />
            ))}

            <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-6">
              {list.map((step, idx) => (
                <div
                  key={step.step + step.title}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeStep === idx ? "w-8 bg-cyan-400" : "w-2 bg-white/35"
                  )}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
