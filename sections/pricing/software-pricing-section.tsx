"use client";

import {
  softwarePricingAddons,
  softwarePricingComparison,
  softwarePricingPlans,
} from "@/constants/software-pricing";
import { InrPricingSectionLayout } from "@/components/pricing/inr-pricing-section-layout";
import { useWebsiteCurrency } from "@/hooks/use-website-currency";

export function SoftwarePricingSection() {
  const { currency, setCurrency, rates, ratesLoading, ratesSource } = useWebsiteCurrency();

  return (
    <InrPricingSectionLayout
      sectionId="software-pricing"
      badge="Custom Software Development / Plans"
      title="Software packages built for scale"
      description="Fixed-scope custom software packages with transparent add-ons. All prices are stored in INR—switch currency to see converted USD or AED estimates."
      currencySelectId="software-currency"
      currency={currency}
      onCurrencyChange={setCurrency}
      rates={rates}
      ratesLoading={ratesLoading}
      ratesSource={ratesSource}
      plans={softwarePricingPlans}
      addons={softwarePricingAddons}
      comparison={{
        title: "Software development — plan comparison",
        description: "Compare Starter, Business, and Enterprise tiers for custom software development.",
        starterLabel: "Starter",
        businessLabel: "Business",
        enterpriseLabel: "Enterprise",
        rows: softwarePricingComparison,
      }}
    />
  );
}
