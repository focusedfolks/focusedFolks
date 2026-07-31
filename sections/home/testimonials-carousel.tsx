"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { homeTeamThoughts } from "@/constants/content";
import { SectionHeader } from "@/components/shared/section-header";
import { Quote, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const CARD_CURVES = [
  "home-testimonial-card home-testimonial-card-curve-a",
  "home-testimonial-card home-testimonial-card-curve-b",
  "home-testimonial-card home-testimonial-card-curve-c",
  "home-testimonial-card home-testimonial-card-curve-d",
] as const;

export function TeamThoughtsCarouselSection() {
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 7000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", duration: 32 }, [autoplay]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section className="relative py-16 md:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-8 h-64 w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our Mindset"
          title="What drives us before the case studies arrive"
          description="Four people, one live product, and the beliefs we bring to every build—passion, craft, growth, and honest storytelling."
          align="left"
          servicesPage
        />

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {homeTeamThoughts.map((member, idx) => (
              <div
                key={member.id}
                className="min-w-0 flex-[0_0_100%] px-1 sm:px-2"
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${homeTeamThoughts.length}`}
                aria-hidden={idx !== selectedIndex}
              >
                <article
                  className={cn(
                    CARD_CURVES[idx % CARD_CURVES.length],
                    idx === selectedIndex && "home-testimonial-card-active"
                  )}
                >
                  <div className="home-testimonial-card-glow pointer-events-none" aria-hidden />

                  <div className="relative grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-10">
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                      <div className="home-testimonial-avatar-ring relative">
                        <div className="relative h-24 w-24 overflow-hidden rounded-[1.75rem] sm:h-28 sm:w-28">
                          <Image
                            src={member.image}
                            alt={`${member.name}, ${member.role}`}
                            fill
                            sizes="112px"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="text-lg font-bold text-white">{member.name}</div>
                        <div className="mt-1 text-sm font-medium text-cyan-100/90">{member.role}</div>
                      </div>

                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-100">
                        <Sparkles className="h-3 w-3 shrink-0 text-violet-200" aria-hidden />
                        {member.theme}
                      </div>
                    </div>

                    <div className="relative min-w-0">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden />
                        Team perspective
                      </div>

                      <Quote className="mt-5 h-9 w-9 text-cyan-300/50" aria-hidden />

                      <blockquote className="mt-3 text-lg font-medium leading-relaxed text-white md:text-xl md:leading-relaxed">
                        {member.quote}
                      </blockquote>

                      <div className="home-testimonial-divider mt-8" aria-hidden />

                      <p className="mt-4 text-xs leading-relaxed text-slate-400">
                        FocusFolks · Ahmedabad · Building software, design, and cloud with transparency from day one.
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm font-semibold text-slate-400">
            <span className="text-white">{selectedIndex + 1}</span>
            <span className="mx-1.5 text-slate-500">/</span>
            {homeTeamThoughts.length} team voices
          </div>
          <div className="flex gap-2">
            {homeTeamThoughts.map((member, i) => (
              <button
                key={member.id}
                type="button"
                onClick={() => scrollTo(i)}
                className={cn(
                  "relative h-2.5 overflow-hidden rounded-full transition-all duration-300",
                  i === selectedIndex ? "w-10 bg-white/20" : "w-2.5 bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to thought from ${member.name}`}
                aria-current={i === selectedIndex ? "true" : undefined}
              >
                {i === selectedIndex && (
                  <motion.span
                    key={selectedIndex}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    style={{ transformOrigin: "left center", width: "100%" }}
                    transition={{ duration: 7, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
