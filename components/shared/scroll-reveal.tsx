"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  scrollReveal,
  scrollRevealItem,
  scrollRevealTransition,
  scrollRevealViewport,
} from "@/lib/animations";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay multiplier — use index in lists for stagger */
  stagger?: number;
  /** Use softer item variant (less movement) for dense grids */
  variant?: "section" | "item";
  as?: "div" | "section" | "article" | "li";
};

/** Scroll-triggered reveal for individual blocks inside a section */
export function ScrollReveal({
  children,
  className,
  stagger = 0,
  variant = "item",
  as = "div",
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={scrollRevealViewport}
      variants={variant === "section" ? scrollReveal : scrollRevealItem}
      transition={scrollRevealTransition(stagger, variant === "section" ? 0.58 : 0.48)}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}

/** Container that staggers scroll reveals for each direct child */
export function ScrollRevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={scrollRevealViewport}
      transition={{ staggerChildren: 0.08, delayChildren: 0.04 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Child of ScrollRevealGroup — pairs with scrollRevealItem variant */
export function ScrollRevealChild({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={scrollRevealItem} transition={scrollRevealTransition(0, 0.48)} className={className}>
      {children}
    </motion.div>
  );
}
