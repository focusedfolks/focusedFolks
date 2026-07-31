"use client";

import { Globe, Layers } from "lucide-react";
import { InrPricingPlanCard } from "@/components/pricing/inr-pricing-plan-card";
import { InrPricingAddonCard } from "@/components/pricing/inr-pricing-addon-card";
import { InrPricingComparisonTable } from "@/components/pricing/inr-pricing-comparison-table";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type {
  InrCurrency,
  InrExchangeRates,
  InrPricingAddon,
  InrPricingComparisonRow,
  InrPricingPlan,
} from "@/types/inr-pricing";

const CURRENCY_OPTIONS: { value: InrCurrency; label: string }[] = [
  { value: "INR", label: "INR" },
  { value: "USD", label: "USD" },
  { value: "AED", label: "AED" },
];

type InrPricingTabPanelProps = {
  currency: InrCurrency;
  rates: InrExchangeRates;
  plans: InrPricingPlan[];
  addons: InrPricingAddon[];
  tabId?: string;
  comparison?: {
    title: string;
    description?: string;
    starterLabel: string;
    businessLabel: string;
    enterpriseLabel: string;
    rows: InrPricingComparisonRow[];
  };
};

export function InrPricingTabPanel({
  currency,
  rates,
  plans,
  addons,
  tabId,
  comparison,
}: InrPricingTabPanelProps) {
  return (
    <>
      <div
        className={cn(
          "inr-pricing-plans-grid mt-10 grid gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-5",
          tabId === "transformation" && "inr-pricing-plans-transformation"
        )}
      >
        {plans.map((plan, index) => (
          <InrPricingPlanCard
            key={plan.id}
            plan={plan}
            index={index}
            total={plans.length}
            currency={currency}
            rates={rates}
          />
        ))}
      </div>

      <div
        className={cn(
          "inr-pricing-addons-section mt-12",
          tabId === "transformation" && "inr-pricing-addons-transformation"
        )}
      >
        <div className="inr-pricing-addons-header mb-6">
          <div className="inr-pricing-addons-icon" aria-hidden>
            <Layers className="h-5 w-5" />
          </div>
          <h3 className="inr-pricing-addons-title">Add-ons</h3>
        </div>
        <ul className="inr-pricing-addons-grid mt-6" aria-live="polite">
          {addons.map((addon) => (
            <InrPricingAddonCard
              key={addon.id}
              addon={addon}
              currency={currency}
              rates={rates}
            />
          ))}
        </ul>
      </div>

      {comparison && (
        <InrPricingComparisonTable
          title={comparison.title}
          description={comparison.description}
          starterLabel={comparison.starterLabel}
          businessLabel={comparison.businessLabel}
          enterpriseLabel={comparison.enterpriseLabel}
          rows={comparison.rows}
          currency={currency}
          rates={rates}
          tabId={tabId}
        />
      )}
    </>
  );
}

type InrPricingSectionLayoutProps = {
  sectionId: string;
  badge: string;
  title: string;
  description: string;
  currencySelectId: string;
  currency: InrCurrency;
  onCurrencyChange: (currency: InrCurrency) => void;
  rates: InrExchangeRates;
  ratesLoading: boolean;
  ratesSource: "live" | "fallback";
  plans: InrPricingPlan[];
  addons: InrPricingAddon[];
  comparison?: {
    title: string;
    description?: string;
    starterLabel: string;
    businessLabel: string;
    enterpriseLabel: string;
    rows: InrPricingComparisonRow[];
  };
  className?: string;
};

export function InrPricingSectionLayout({
  sectionId,
  badge,
  title,
  description,
  currencySelectId,
  currency,
  onCurrencyChange,
  rates,
  ratesLoading,
  ratesSource,
  plans,
  addons,
  comparison,
  className,
}: InrPricingSectionLayoutProps) {
  return (
    <section id={sectionId} className={cn("border-t border-white/10 py-20 md:py-28", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                {badge}
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
              <p className="mt-4 text-slate-300">{description}</p>
            </div>

            <div className="glass w-full rounded-2xl border border-cyan-400/20 p-4 sm:w-64">
              <Label
                htmlFor={currencySelectId}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                <Globe className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                Currency
              </Label>
              <select
                id={currencySelectId}
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as InrCurrency)}
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

          <InrPricingTabPanel
            currency={currency}
            rates={rates}
            plans={plans}
            addons={addons}
            comparison={comparison}
          />
        </div>
      </div>
    </section>
  );
}
