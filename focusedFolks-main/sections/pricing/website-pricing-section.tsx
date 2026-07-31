"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import {
  websitePricingAddons,
  websitePricingPlans,
} from "@/constants/website-pricing";
import { useWebsiteCurrency } from "@/hooks/use-website-currency";
import { formatAddonLabel, formatWebsitePrice } from "@/lib/inr-currency";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { WebsiteCurrency } from "@/types/website-pricing";

const CURRENCY_OPTIONS: { value: WebsiteCurrency; label: string }[] = [
  { value: "INR", label: "INR" },
  { value: "USD", label: "USD" },
  { value: "AED", label: "AED" },
];

export function WebsitePricingSection() {
  const { currency, setCurrency, rates, ratesLoading, ratesSource } = useWebsiteCurrency();

  return (
    <section id="website-pricing" className="border-t border-white/10 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                Website Pricing / Plans
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Website packages for every business
              </h2>
              <p className="mt-4 text-slate-300">
                Fixed-scope website packages with transparent add-ons. All prices are stored in INR—switch
                currency to see converted USD or AED estimates.
              </p>
            </div>

            <div className="glass w-full rounded-2xl border border-cyan-400/20 p-4 sm:w-64">
              <Label
                htmlFor="website-currency"
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                <Globe className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                Currency
              </Label>
              <select
                id="website-currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as WebsiteCurrency)}
                className="mt-2.5 flex h-11 w-full cursor-pointer appearance-none rounded-xl border border-white/15 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white shadow-inner transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              >
                {CURRENCY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                {ratesLoading
                  ? "Loading exchange rates…"
                  : currency === "INR"
                    ? "Showing original INR pricing."
                    : `Converted from INR (${ratesSource === "live" ? "live rates" : "fallback rates"}).`}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {websitePricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "glass relative flex flex-col rounded-3xl p-6",
                  plan.popular ? "border-blue-500/40" : "border-white/15"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-6">
                    <Badge variant="popular">Most Popular</Badge>
                  </div>
                )}

                <h3 className="text-2xl font-extrabold text-white">{plan.name}</h3>
                <div
                  className="mt-4 text-2xl font-extrabold text-white sm:text-3xl"
                  aria-live="polite"
                >
                  {formatWebsitePrice(plan.price, currency, rates)}
                </div>

                <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-300">
                  {(plan.features ?? []).map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {(plan.scope || plan.delivery) && (
                  <div className="mt-4 space-y-1 text-sm text-slate-300">
                    {plan.scope && (
                      <p>
                        <span className="font-semibold text-slate-200">Scope: </span>
                        {plan.scope}
                      </p>
                    )}
                    {plan.delivery && (
                      <p>
                        <span className="font-semibold text-slate-200">Delivery: </span>
                        {plan.delivery}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-6">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-extrabold text-white">Add-ons</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
              {websitePricingAddons.map((addon) => (
                <li
                  key={addon.id}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                >
                  {formatAddonLabel(addon.name, addon.price, currency, rates)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
