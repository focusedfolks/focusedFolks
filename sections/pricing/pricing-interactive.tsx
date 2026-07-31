"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import {
  defaultPricingCategoryId,
  getPricingCategoryById,
  pricingCategories,
} from "@/constants/pricing";
import {
  defaultPricingRegionId,
  getPricingRegionById,
  pricingRegions,
} from "@/constants/currencies";
import { convertFromUsd, formatRegionalPrice } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const REGION_STORAGE_KEY = "focusfolks-pricing-region";
const CATEGORY_STORAGE_KEY = "focusfolks-pricing-category";

function readStoredRegionId(): string {
  if (typeof window === "undefined") return defaultPricingRegionId;
  try {
    const stored = localStorage.getItem(REGION_STORAGE_KEY);
    if (stored && pricingRegions.some((r) => r.id === stored)) return stored;
  } catch {
    /* ignore */
  }
  return defaultPricingRegionId;
}

function readStoredCategoryId(): string {
  if (typeof window === "undefined") return defaultPricingCategoryId;
  try {
    const stored = localStorage.getItem(CATEGORY_STORAGE_KEY);
    if (stored && pricingCategories.some((c) => c.id === stored)) return stored;
  } catch {
    /* ignore */
  }
  return defaultPricingCategoryId;
}

function formatPlanPrice(
  priceFromUsd: number | null,
  priceType: "project" | "monthly" | "hourly",
  region: ReturnType<typeof getPricingRegionById>
) {
  if (priceFromUsd == null) return null;
  const local = convertFromUsd(priceFromUsd, region);
  const formatted = formatRegionalPrice(local, region);
  if (priceType === "monthly") return `From ${formatted}/mo`;
  if (priceType === "hourly") return `From ${formatted}/hr`;
  return `From ${formatted}`;
}

export function PricingInteractive() {
  const [categoryId, setCategoryId] = useState(defaultPricingCategoryId);
  const [regionId, setRegionId] = useState(defaultPricingRegionId);

  useEffect(() => {
    setRegionId(readStoredRegionId());
    setCategoryId(readStoredCategoryId());
  }, []);

  const region = useMemo(() => getPricingRegionById(regionId), [regionId]);
  const category = useMemo(
    () => getPricingCategoryById(categoryId) ?? pricingCategories[0],
    [categoryId]
  );

  function handleRegionChange(nextId: string) {
    setRegionId(nextId);
    try {
      localStorage.setItem(REGION_STORAGE_KEY, nextId);
    } catch {
      /* ignore */
    }
  }

  function handleCategoryChange(nextId: string) {
    setCategoryId(nextId);
    try {
      localStorage.setItem(CATEGORY_STORAGE_KEY, nextId);
    } catch {
      /* ignore */
    }
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="glass rounded-3xl p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                Transparent Pricing · 10 Services · 3 Plans Each
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Competitive rates for every service
              </h1>
              <p className="mt-4 text-slate-300">
                Essential, Professional, and Custom Quote tiers for all 10 practice areas—priced for today&apos;s
                market with India &amp; UAE delivery advantage. Pick your service, select your country, and see
                indicative pricing in your local currency.
              </p>
            </div>

            <div className="glass w-full rounded-2xl border border-cyan-400/20 p-4 sm:w-80">
              <Label htmlFor="pricing-region" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
                <Globe className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                Country / region
              </Label>
              <select
                id="pricing-region"
                value={regionId}
                onChange={(e) => handleRegionChange(e.target.value)}
                className="mt-2.5 flex h-11 w-full cursor-pointer appearance-none rounded-xl border border-white/15 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white shadow-inner transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              >
                {pricingRegions.map((r) => (
                  <option key={r.id} value={r.id} className="bg-slate-900 text-white">
                    {r.label} · {r.currency}
                  </option>
                ))}
              </select>
              <div className="mt-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Display currency</p>
                <p className="mt-0.5 text-sm font-bold text-white">{region.currency}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  Base rates in USD, converted at indicative {region.label} rates. Final quotes depend on scope.
                </p>
              </div>
            </div>
          </div>

          {/* Category tabs */}
          <div className="mt-8 -mx-1 overflow-x-auto pb-1">
            <div className="flex min-w-max gap-2 px-1">
            {pricingCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={cn(
                  "shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60",
                  categoryId === cat.id
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                    : "border border-white/15 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                )}
              >
                {cat.label}
              </button>
            ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-6"
            >
              <p className="text-sm leading-relaxed text-slate-300">{category.description}</p>
              <Link
                href={category.serviceHref}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-200 hover:text-cyan-100"
              >
                View full {category.label.toLowerCase()} service details
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Plan cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-10 grid gap-5 lg:grid-cols-3"
          >
            {category.plans.map((plan, idx) => {
              const isCustom = plan.priceFromUsd == null;
              const formattedPrice = isCustom
                ? null
                : formatPlanPrice(plan.priceFromUsd, plan.priceType, region);
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  whileHover={{ y: -6 }}
                  className={cn(
                    "glass relative flex flex-col rounded-3xl p-6 transition-transform",
                    plan.popular ? "border-blue-500/40" : "border-white/15"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-6">
                      <Badge variant="popular">Most Popular</Badge>
                    </div>
                  )}

                  <div className="text-xs font-semibold text-cyan-300">{plan.duration}</div>
                  <h2 className="mt-2 text-2xl font-extrabold text-white">{plan.name}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">{plan.description}</p>

                  <div className="mt-6">
                    {isCustom ? (
                      <>
                        <div className="text-3xl font-extrabold text-white">Get a Quote</div>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">
                          Tailored scope · volume discounts · SLA options
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="text-3xl font-extrabold text-white">{formattedPrice}</div>
                        <div className="mt-1 text-xs text-slate-400">
                          {plan.priceType === "monthly"
                            ? "Monthly retainer · billed monthly"
                            : plan.priceType === "hourly"
                              ? "Hourly engagement · min. block applies"
                              : "Fixed-scope project · milestone billing available"}
                        </div>
                      </>
                    )}
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-slate-300">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <Button asChild size="lg" className="w-full">
                      <Link href={plan.href}>{plan.cta}</Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Comparison table */}
        <div className="mt-12">
          <h2 className="text-2xl font-extrabold text-white">
            {category.label} — plan comparison
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Compare Essential, Professional, and Custom Quote tiers for {category.label.toLowerCase()}.
          </p>

          <div className="glass mt-6 overflow-hidden rounded-3xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-white">Feature</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white">
                      {category.plans[0]?.name ?? "Starter"}
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-white">
                      {category.plans[1]?.name ?? "Growth"}
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-white">
                      {category.plans[2]?.name ?? "Enterprise"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category.comparisonFeatures.map((row) => (
                    <tr key={row.name} className="border-t border-white/10">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-200">{row.name}</td>
                      {(["starter", "growth", "enterprise"] as const).map((col) => (
                        <td key={col} className="px-6 py-4 text-sm text-slate-300">
                          {typeof row[col] === "boolean"
                            ? row[col]
                              ? "Included"
                              : "—"
                            : row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
