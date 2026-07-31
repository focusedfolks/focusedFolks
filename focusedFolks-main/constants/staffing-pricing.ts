import type { InrPricingAddon, InrPricingPlan } from "@/types/inr-pricing";

/** Resource Hiring — hourly rates and dedicated monthly resources. */
export const staffingPricingPlans: InrPricingPlan[] = [
  {
    id: "junior-developer-hourly",
    name: "Junior Developer",
    scope: "Hourly engagement",
    price: { type: "per_hour", minInr: 999 },
  },
  {
    id: "qa-engineer-hourly",
    name: "QA Engineer",
    scope: "Hourly engagement",
    price: { type: "per_hour", minInr: 1300 },
  },
  {
    id: "mid-level-developer-hourly",
    name: "Mid-Level Developer",
    scope: "Hourly engagement",
    price: { type: "per_hour", minInr: 1999 },
  },
  {
    id: "uiux-designer-hourly",
    name: "UI/UX Designer",
    scope: "Hourly engagement",
    price: { type: "per_hour", minInr: 2000 },
  },
  {
    id: "project-manager-hourly",
    name: "Project Manager",
    scope: "Hourly engagement",
    price: { type: "per_hour", minInr: 2250 },
  },
  {
    id: "senior-developer-hourly",
    name: "Senior Developer",
    scope: "Hourly engagement",
    price: { type: "per_hour", minInr: 2999 },
  },
];

export const staffingMonthlyPlans: InrPricingPlan[] = [
  {
    id: "uiux-designer-monthly",
    name: "UI/UX Designer",
    scope: "Dedicated monthly resource",
    price: { type: "per_month", minInr: 135000 },
  },
  {
    id: "mid-level-developer-monthly",
    name: "Mid-Level Developer",
    scope: "Dedicated monthly resource",
    price: { type: "per_month", minInr: 140000 },
  },
  {
    id: "senior-fullstack-monthly",
    name: "Senior Full Stack Developer",
    scope: "Dedicated monthly resource",
    price: { type: "per_month", minInr: 240000 },
  },
  {
    id: "dedicated-ai-engineer-monthly",
    name: "Dedicated AI Engineer",
    scope: "Dedicated monthly resource",
    price: { type: "per_month", minInr: 297500 },
  },
  {
    id: "junior-developer-monthly",
    name: "Junior Developer",
    scope: "Dedicated monthly resource",
    price: { type: "custom_quote" },
  },
];

export const staffingPricingAddons: InrPricingAddon[] = [];

/** @deprecated Comparison table removed from OUR PRICE catalogue. */
export const staffingPricingComparison = [];
