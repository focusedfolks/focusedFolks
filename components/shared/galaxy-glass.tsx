"use client";

import type { ReactNode } from "react";
import { ScrollStackCard } from "@/components/shared/scroll-stack-card";
import { cn } from "@/lib/utils";

/** Glass panel with scroll-driven stack animation — use for major content blocks site-wide. */
export function GalaxyGlass({
  children,
  className,
  stagger = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <ScrollStackCard glass stagger={stagger} className={cn("rounded-3xl", className)}>
      {children}
    </ScrollStackCard>
  );
}
