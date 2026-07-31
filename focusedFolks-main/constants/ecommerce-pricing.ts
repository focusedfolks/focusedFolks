import type { InrPricingAddon, InrPricingPlan } from "@/types/inr-pricing";

/** E-Commerce Solutions catalogue — all amounts stored in INR (source of truth). */
export const ecommercePricingPlans: InrPricingPlan[] = [
  {
    id: "shopify-store-setup",
    name: "Shopify Store Setup",
    scope: "Theme + Products",
    delivery: "7-10 Days",
    price: { type: "flat", minInr: 37500 },
  },
  {
    id: "woocommerce-50",
    name: "WooCommerce (Up to 50 Products)",
    scope: "Store setup",
    delivery: "10-15 Days",
    price: { type: "flat", minInr: 42500 },
  },
  {
    id: "woocommerce-100-500",
    name: "WooCommerce (100-500 Products)",
    scope: "Advanced store",
    delivery: "15-20 Days",
    price: { type: "flat", minInr: 69999 },
  },
  {
    id: "shopify-custom-design",
    name: "Shopify Custom Design",
    scope: "Custom UI",
    delivery: "12-15 Days",
    price: { type: "flat", minInr: 77500 },
  },
  {
    id: "multi-vendor-ecommerce",
    name: "Multi Vendor E-Commerce",
    scope: "Complete solution",
    delivery: "30-45 Days",
    price: { type: "flat", minInr: 160000 },
  },
];

export const ecommercePricingAddons: InrPricingAddon[] = [];
