import type { InrPricingAddon, InrPricingPlan } from "@/types/inr-pricing";

/** Website Development catalogue — all amounts stored in INR (source of truth). */
export const websitePricingPlans: InrPricingPlan[] = [
  {
    id: "landing-page",
    name: "Landing Page",
    scope: "1 responsive page",
    delivery: "2-3 Days",
    price: { type: "flat", minInr: 10000 },
  },
  {
    id: "static-website-5",
    name: "Static Website (Up to 5 Pages)",
    scope: "Home, About, Services, Contact",
    delivery: "5-7 Days",
    price: { type: "flat", minInr: 17500 },
  },
  {
    id: "static-website-6-10",
    name: "Static Website (6-10 Pages)",
    scope: "Custom UI",
    delivery: "7-10 Days",
    price: { type: "flat", minInr: 23500 },
  },
  {
    id: "corporate-website",
    name: "Corporate Website (10-20 Pages)",
    scope: "CMS + Admin",
    delivery: "10-15 Days",
    price: { type: "flat", minInr: 40000 },
  },
  {
    id: "portfolio-website",
    name: "Portfolio Website",
    scope: "Modern Design",
    delivery: "5 Days",
    price: { type: "flat", minInr: 15000 },
  },
  {
    id: "restaurant-website",
    name: "Restaurant Website",
    scope: "Menu + Reservation",
    delivery: "7 Days",
    price: { type: "flat", minInr: 26500 },
  },
  {
    id: "hotel-website",
    name: "Hotel Website",
    scope: "Booking Request",
    delivery: "10 Days",
    price: { type: "flat", minInr: 37500 },
  },
  {
    id: "school-website",
    name: "School Website",
    scope: "CMS",
    delivery: "12 Days",
    price: { type: "flat", minInr: 42500 },
  },
  {
    id: "real-estate-website",
    name: "Real Estate Website (plus Admin)",
    scope: "Property Listing",
    delivery: "12 Days",
    price: { type: "custom_quote" },
  },
  {
    id: "hospital-website",
    name: "Hospital Website",
    scope: "Appointment Form",
    delivery: "12 Days",
    price: { type: "custom_quote" },
  },
];

export const websitePricingAddons: InrPricingAddon[] = [];

export const defaultWebsiteCurrency = "INR" as const;

export const WEBSITE_CURRENCY_STORAGE_KEY = "focusfolks-website-currency";
