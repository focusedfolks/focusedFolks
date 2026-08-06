"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroBannerSlides } from "@/constants/content";
import type { HeroSlide } from "@/lib/cms/homepage";
import { cn } from "@/lib/utils";

/** Time each slide stays visible — tab fill and autoplay share this exact duration. */
const SLIDE_INTERVAL_MS = 20_000;
const SLIDE_INTERVAL_SEC = SLIDE_INTERVAL_MS / 1000;

export function HeroSection({ slides }: { slides?: HeroSlide[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const safeSlides: HeroSlide[] =
    slides && slides.length > 0
      ? slides
      : heroBannerSlides.map((s) => ({ ...s, ctaText: "Book Consultation" }));

  const goToSlide = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  // Restart timer on every slide change so fill animation and advance stay in lockstep.
  useEffect(() => {
    if (prefersReducedMotion || safeSlides.length <= 1) return;
    const id = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % safeSlides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [activeSlide, prefersReducedMotion, safeSlides.length]);

  const slide = safeSlides[Math.min(activeSlide, safeSlides.length - 1)];

  return (
    <section className="relative w-full pt-16 lg:pt-20">
      <div className="relative min-h-[calc(100dvh-4rem)] w-full overflow-hidden lg:min-h-[calc(100dvh-5rem)]">
        {/* Background slideshow — full device width */}
        <div className="absolute inset-0" aria-hidden>
          {safeSlides.map((slideItem, idx) => (
            <motion.div
              key={`${slideItem.image}-${idx}`}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: idx === activeSlide ? 1 : 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Image
                src={slideItem.image}
                alt={slideItem.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          ))}
        </div>

        {/* Overlay — darker for readable text, image still visible */}
        <div className="pointer-events-none absolute inset-0 bg-slate-950/40" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/30"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/15 to-slate-950/35"
          aria-hidden
        />

        {/* Content */}
        <div className="relative z-10 flex min-h-[calc(100dvh-4rem)] flex-col justify-center px-4 py-8 sm:px-6 lg:min-h-[calc(100dvh-5rem)] lg:px-10">
          <div className="container mx-auto w-full max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                className="max-w-2xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Badge
                  variant="accent"
                  className="mb-3 border-white/20 bg-slate-950/50 text-white shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
                >
                  {slide.tagline}
                </Badge>

                <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.75)] sm:text-4xl lg:text-5xl">
                  {slide.title}
                  <span className="text-gradient drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]">
                    {slide.titleHighlight}
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)] sm:text-base">
                  {slide.description}
                </p>

                <div className="mt-6">
                  <Button
                    size="lg"
                    asChild
                    className="from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-blue-500/20 hover:scale-[1.03]"
                  >
                    <Link href="/contact">
                      {slide.ctaText || "Book Consultation"}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide indicators — autoplay only, no arrows */}
        <div
          className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 sm:bottom-6 sm:right-6"
          role="tablist"
          aria-label="Hero banner slides"
        >
          {safeSlides.map((slideItem, idx) => (
            <button
              key={`${slideItem.image}-tab-${idx}`}
              type="button"
              role="tab"
              aria-selected={idx === activeSlide}
              aria-label={`Show slide ${idx + 1}`}
              onClick={() => goToSlide(idx)}
              className={cn(
                "relative h-2 overflow-hidden rounded-full transition-all duration-300",
                idx === activeSlide ? "w-8 bg-white/30" : "w-2 bg-white/50 hover:bg-white/70"
              )}
            >
              {idx === activeSlide && !prefersReducedMotion && (
                <motion.span
                  key={`progress-${activeSlide}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-cyan-300"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{ transformOrigin: "left center", width: "100%" }}
                  transition={{ duration: SLIDE_INTERVAL_SEC, ease: "linear" }}
                />
              )}
              {idx === activeSlide && prefersReducedMotion && (
                <span className="absolute inset-0 rounded-full bg-cyan-300" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
