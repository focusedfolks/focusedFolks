"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  scrollRevealSoft,
  scrollRevealTransition,
  homeScrollViewport,
} from "@/lib/animations";

export type ScrollStackCardProps = {
  children: ReactNode;
  className?: string;
  glass?: boolean;
  /** Stagger delay multiplier for sequential section reveals */
  stagger?: number;
};

export function ScrollStackCard({
  children,
  className,
  glass = true,
  stagger = 0,
}: ScrollStackCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const panelClass = cn(
    "galaxy-scroll-motion relative w-full",
    glass && "galaxy-glass-panel",
    className
  );

  if (prefersReducedMotion) {
    return (
      <div className="galaxy-scroll-clip w-full max-w-full">
        <div className={panelClass}>{children}</div>
      </div>
    );
  }

  return (
    <div className="galaxy-scroll-clip w-full max-w-full">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={homeScrollViewport}
        variants={scrollRevealSoft}
        transition={scrollRevealTransition(stagger)}
        className={panelClass}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Scroll stack motion without an extra glass layer (for full-width sections). */
export function GalaxyStack({
  children,
  className,
  stagger = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <ScrollStackCard glass={false} stagger={stagger} className={className}>
      {children}
    </ScrollStackCard>
  );
}
