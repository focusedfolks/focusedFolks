"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { techStack } from "@/constants/services";
import { cn } from "@/lib/utils";

/** Fast scan — visibility only, no pause per tab */
const CYCLE_MS = 350;

export function ServicesTechStackTabs() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let frame: number;
    let lastTick = performance.now();

    const tick = (now: number) => {
      if (now - lastTick >= CYCLE_MS) {
        setActive((prev) => (prev + 1) % techStack.length);
        lastTick = now;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [prefersReducedMotion]);

  return (
    <div className="services-tech-tabs relative lg:pt-2">
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative flex flex-wrap gap-2 sm:gap-2.5">
        {techStack.map((tech, idx) => {
          const isActive = active === idx;
          return (
            <button
              key={tech}
              type="button"
              onClick={() => setActive(idx)}
              className={cn(
                "services-tech-tab rounded-full border px-3.5 py-2 text-xs font-semibold sm:px-4 sm:py-2.5 sm:text-sm",
                isActive ? "services-tech-tab-active" : "services-tech-tab-idle"
              )}
              aria-pressed={isActive}
            >
              {tech}
            </button>
          );
        })}
      </div>
    </div>
  );
}
