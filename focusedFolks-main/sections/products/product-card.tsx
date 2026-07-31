"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Bell, ExternalLink, Sparkles } from "lucide-react";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { defaultTransition, fadeUp, servicesScrollViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  idx: number;
};

export function ProductCard({ product, idx }: ProductCardProps) {
  const isLive = product.status === "live";
  const isExternal = Boolean(product.href?.startsWith("http"));

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={servicesScrollViewport}
      variants={fadeUp}
      transition={{ ...defaultTransition, duration: 0.48, delay: idx * 0.06 }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border backdrop-blur-xl transition-transform duration-300",
        isLive
          ? "border-cyan-400/25 bg-slate-950/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_50px_rgba(0,0,0,0.35)] hover:-translate-y-1"
          : "border-white/10 bg-slate-950/35 opacity-90"
      )}
    >
      <div className="relative aspect-[2/1] overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={`${product.name} product screenshot`}
          fill
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-[1.03]",
            !isLive && "scale-105 grayscale-[0.65] brightness-[0.55]"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent",
            !isLive && "from-slate-950/95 via-slate-950/70"
          )}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge variant={isLive ? "accent" : "default"} className="backdrop-blur-sm">
            {isLive ? (
              <span className="inline-flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Live
              </span>
            ) : (
              "Coming soon"
            )}
          </Badge>
          <Badge variant="default" className="border-white/15 bg-black/40 text-slate-200">
            {product.category}
          </Badge>
        </div>
        {!isLive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-200 backdrop-blur-md">
              Coming soon
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-300/90">{product.tagline}</p>
        <h3 className="mt-1.5 text-lg font-extrabold tracking-tight text-white sm:text-xl">{product.name}</h3>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-300 sm:text-sm">{product.description}</p>

        {product.features && product.features.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-slate-300"
              >
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          {isLive && product.href ? (
            <Button size="sm" asChild className="w-full from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
              {isExternal ? (
                <a href={product.href} target="_blank" rel="noopener noreferrer">
                  Sign in to product
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <Link href={product.href}>
                  Explore product
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              disabled
              className="w-full cursor-not-allowed border-white/10 bg-white/5 text-slate-400"
            >
              <Bell className="h-4 w-4" />
              Notify me at launch
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
