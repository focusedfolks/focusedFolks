import type { InrPricingAddon, InrPricingComparisonRow, InrPricingPlan } from "@/types/inr-pricing";
import { PRICING_PACKAGES } from "@/constants/pricing-packages";

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
    price:
      plan.priceINR === "Contact"
        ? { type: "custom_quote" as const }
        : { type: "flat" as const, minInr: plan.priceINR },
    scope: plan.scope,
    delivery: plan.delivery,
    suitableFor: plan.description,
    features: plan.features,
    popular: plan.popular,
  })),
  addons: [],
}));

export const defaultInrPricingTabId = inrPricingTabs[0].id;

export const INR_PRICING_TAB_STORAGE_KEY = "focusfolks-inr-pricing-tab";

export function getInrPricingTabById(id: string): InrPricingTabConfig | undefined {
  return inrPricingTabs.find((tab) => tab.id === id);
}
