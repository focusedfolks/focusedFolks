import type { InrPricingAddon, InrPricingComparisonRow, InrPricingPlan, InrPriceSpec } from "@/types/inr-pricing";
import { PRICING_PACKAGES, type PricingAmount } from "@/constants/pricing-packages";

export type InrPricingTabConfig = {
  id: string;
  label: string;
  badge: string;
  title: string;
  description: string;
  plans: InrPricingPlan[];
  plansHeading?: string;
  secondaryPlans?: InrPricingPlan[];
  secondaryPlansHeading?: string;
  addons: InrPricingAddon[];
  addonsTitle?: string;
  comparison?: {
    title: string;
    description?: string;
    starterLabel: string;
    businessLabel: string;
    enterpriseLabel: string;
    rows: InrPricingComparisonRow[];
  };
};

function toPriceSpec(priceINR: PricingAmount): InrPriceSpec {
  if (priceINR === "Contact") {
    return { type: "custom_quote" };
  }
  if (typeof priceINR === "number") {
    return { type: "flat", minInr: priceINR };
  }
  if (priceINR.unit === "month") {
    return { type: "range_per_month", minInr: priceINR.min, maxInr: priceINR.max };
  }
  if (priceINR.unit === "hour") {
    return { type: "range", minInr: priceINR.min, maxInr: priceINR.max };
  }
  return { type: "range", minInr: priceINR.min, maxInr: priceINR.max };
}

/** Convert PRICING_PACKAGES to InrPricingTabConfig[] for the unified section. */
export const inrPricingTabs: InrPricingTabConfig[] = PRICING_PACKAGES.map((cat) => ({
  id: cat.id,
  label: cat.categoryName,
  badge: `${cat.categoryName} / Plans`,
  title: cat.categoryName,
  description: cat.tagline,
  plans: cat.plans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    price: toPriceSpec(plan.priceINR),
    scope: plan.scope,
    delivery: plan.delivery,
    suitableFor: plan.description,
    features: plan.features,
    popular: plan.popular,
  })),
  addons: (cat.addons ?? []).map((addon) => ({
    id: addon.id,
    name: addon.name,
    price: {
      type: "range" as const,
      minInr: addon.priceINR.min,
      maxInr: addon.priceINR.max,
    },
  })),
  addonsTitle: cat.addonsTitle,
}));

export const defaultInrPricingTabId = inrPricingTabs[0].id;

export const INR_PRICING_TAB_STORAGE_KEY = "focusfolks-inr-pricing-tab";

export function getInrPricingTabById(id: string): InrPricingTabConfig | undefined {
  return inrPricingTabs.find((tab) => tab.id === id);
}
