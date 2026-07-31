"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const RING_RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollHeight > 0 ? Math.min(1, window.scrollY / scrollHeight) : 0;
      setProgress(nextProgress);
      setVisible(window.scrollY > 120);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  if (!visible) return null;

  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.18 }}
      className="fixed bottom-20 right-4 z-50 md:bottom-8"
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={`Scroll to top — ${Math.round(progress * 100)}% through page`}
        className="site-scroll-top group relative inline-flex h-14 w-14 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
      >
        <svg
          className="absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 56 56"
          aria-hidden
        >
          <circle
            cx="28"
            cy="28"
            r={RING_RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="3"
          />
          <circle
            cx="28"
            cy="28"
            r={RING_RADIUS}
            fill="none"
            stroke="url(#scrollTopGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            className="site-scroll-top__progress transition-[stroke-dashoffset] duration-150 ease-out"
          />
          <defs>
            <linearGradient id="scrollTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>

        <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-blue-500 shadow-lg shadow-blue-500/25 transition-all group-hover:-translate-y-0.5 group-hover:bg-blue-600">
          <span
            aria-hidden
            className="h-2.5 w-2.5 rotate-45 rounded-t-[2px] border-l-[3px] border-t-[3px] border-white transition-transform group-hover:-translate-y-0.5"
          />
        </span>
      </button>
    </motion.div>
  );
}
