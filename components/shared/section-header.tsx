"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  fadeUp,
  defaultTransition,
  scrollRevealViewport,
  servicesScrollViewport,
} from "@/lib/animations";

type SectionHeaderProps = {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  /** Use servicesScrollViewport on /services for earlier reveals */
  servicesPage?: boolean;
  /** Skip scroll-into-view animation (e.g. legal pages with long static content) */
  immediate?: boolean;
};

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  dark = true,
  className,
  servicesPage = false,
  immediate = false,
}: SectionHeaderProps) {
  const viewport = servicesPage ? servicesScrollViewport : scrollRevealViewport;

  return (
    <motion.div
      initial={immediate ? "visible" : "hidden"}
      animate={immediate ? "visible" : undefined}
      whileInView={immediate ? undefined : "visible"}
      viewport={immediate ? undefined : viewport}
      variants={fadeUp}
      transition={defaultTransition}
      className={cn(
        "mb-12 max-w-3xl md:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {badge && (
        <Badge variant={dark ? "accent" : "default"} className="mb-4">
          {badge}
        </Badge>
      )}
      <h2
        className={cn(
          "text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-primary"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            dark ? "text-slate-400" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
