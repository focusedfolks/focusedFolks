"use client";

import { useEffect, useMemo, useState } from "react";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  defaultInrPricingTabId,
  getInrPricingTabById,
  inrPricingTabs,
  INR_PRICING_TAB_STORAGE_KEY,
  type InrPricingTabConfig,
} from "@/constants/inr-pricing-tabs";
import { InrPricingTabPanel } from "@/components/pricing/inr-pricing-section-layout";
import { useWebsiteCurrency } from "@/hooks/use-website-currency";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { InrCurrency } from "@/types/inr-pricing";

const CURRENCY_OPTIONS: { value: InrCurrency; label: string }[] = [
  { value: "INR", label: "INR" },
  { value: "USD", label: "USD" },
  { value: "AED", label: "AED" },
];

type InrPricingUnifiedSectionProps = {
  tabs?: InrPricingTabConfig[];
};

function readStoredTabId(tabs: InrPricingTabConfig[]): string {
  const fallback = tabs[0]?.id ?? defaultInrPricingTabId;
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(INR_PRICING_TAB_STORAGE_KEY);
    if (stored && tabs.some((tab) => tab.id === stored)) return stored;
  } catch {
    /* ignore */
  }
  return fallback;
}

export function InrPricingUnifiedSection({ tabs = inrPricingTabs }: InrPricingUnifiedSectionProps) {
  const { currency, setCurrency, rates, ratesLoading, ratesSource } = useWebsiteCurrency();
  const [tabId, setTabId] = useState(tabs[0]?.id ?? defaultInrPricingTabId);

  useEffect(() => {
    setTabId(readStoredTabId(tabs));
  }, [tabs]);

  const activeTab = useMemo(
    () => getInrPricingTabById(tabId, tabs) ?? tabs[0],
    [tabId, tabs]
  );

  function handleTabChange(nextId: string) {
    setTabId(nextId);
    try {
      localStorage.setItem(INR_PRICING_TAB_STORAGE_KEY, nextId);
    } catch {
      /* ignore */
    }
  }

  if (!activeTab) return null;

  return (
    <section id="service-plans-pricing" className="border-t border-white/10 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                Pricing / Plans
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Our Pricing
              </h2>
              <p className="mt-4 text-slate-300">
                Select a service category to view fixed-scope pricing. All prices are stored in
                INR—switch currency to see converted USD or AED estimates.
              </p>
            </div>

            <div className="glass w-full rounded-2xl border border-cyan-400/20 p-4 sm:w-64">
              <Label
                htmlFor="inr-pricing-currency"
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                <Globe className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                Currency
              </Label>
              <select
                id="inr-pricing-currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as InrCurrency)}
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

          <div className="inr-pricing-tabs-wrap mt-8">
            <div
              className="inr-pricing-tabs-list flex flex-wrap items-center gap-2 sm:gap-2.5"
              role="tablist"
              aria-label="Service pricing"
            >
              {tabs.map((tab) => {
                const isActive = tabId === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleTabChange(tab.id)}
                    className={cn(
                      "inr-pricing-service-tab relative inline-flex w-auto max-w-full shrink-0 items-center justify-center overflow-hidden rounded-full border px-3.5 py-2 text-xs font-semibold leading-tight sm:px-5 sm:py-2.5 sm:text-sm",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60",
                      isActive ? "inr-pricing-service-tab-active" : "inr-pricing-service-tab-idle"
                    )}
                  >
                    <span className="relative z-[1] whitespace-nowrap">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              role="tabpanel"
            >
              <div className="mt-6">
                <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {activeTab.title}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  {activeTab.description}
                </p>
              </div>

              <InrPricingTabPanel
                currency={currency}
                rates={rates}
                plans={activeTab.plans}
                plansHeading={activeTab.plansHeading}
                secondaryPlans={activeTab.secondaryPlans}
                secondaryPlansHeading={activeTab.secondaryPlansHeading}
                addons={activeTab.addons}
                addonsTitle={activeTab.addonsTitle}
                tabId={activeTab.id}
                comparison={activeTab.comparison}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
