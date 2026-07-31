import type { WebsitePricingAddon, WebsitePricingPlan } from "@/types/website-pricing";

/** Website package plans — all amounts stored in INR (source of truth). */
export const websitePricingPlans: WebsitePricingPlan[] = [
  {
    id: "basic-website",
    name: "Basic Website Package",
    price: { type: "range", minInr: 7999, maxInr: 12999 },
    features: [
      "Up to 5 Pages",
      "Responsive Mobile-Friendly Design",
      "Contact Form",
      "WhatsApp Integration",
      "Basic SEO Setup",
      "Google Maps Integration",
      "Social Media Links",
      "SSL Configuration",
      "1 Revision Round",
      "Delivery: 5-7 Days",
    ],
  },
  {
    id: "business-website",
    name: "Business Website Package",
    price: { type: "range", minInr: 14999, maxInr: 24999 },
    popular: true,
    features: [
      "Up to 15 Pages",
      "Premium Responsive Design",
      "Advanced Contact Forms",
      "Blog/News Section",
      "On-Page SEO Optimization",
      "Speed Optimization",
      "WhatsApp & Social Integrations",
      "Image Gallery",
      "Lead Generation Forms",
      "Google Analytics Setup",
      "3 Revision Rounds",
      "Delivery: 7-14 Days",
    ],
  },
  {
    id: "custom-premium",
    name: "Custom Premium Package",
    price: { type: "from", minInr: 29999 },
    features: [
      "Unlimited Pages",
      "Fully Custom UI/UX Design",
      "Admin Dashboard",
      "CRM Integration",
      "API Integrations",
      "Dynamic Content Management",
      "Multi-language Support",
      "Advanced SEO Structure",
      "Performance Optimization",
      "Security Hardening",
      "Custom Features & Automations",
      "Priority Support",
      "Unlimited Revisions*",
      "Delivery Based on Scope",
    ],
  },
];

/** Website add-ons — all amounts stored in INR (source of truth). */
export const websitePricingAddons: WebsitePricingAddon[] = [
  {
    id: "domain",
    name: "Domain Registration",
    price: { type: "per_year", minInr: 999 },
  },
  {
    id: "hosting",
    name: "Hosting Setup",
    price: { type: "per_year", minInr: 2000 },
  },
  {
    id: "email",
    name: "Professional Email Setup",
    price: { type: "flat", minInr: 1500 },
  },
  {
    id: "content",
    name: "Content Writing",
    price: { type: "per_page", minInr: 500 },
  },
  {
    id: "logo",
    name: "Logo Design",
    price: { type: "flat", minInr: 2999 },
  },
  {
    id: "ecommerce",
    name: "E-commerce Store",
    price: { type: "single_plus", minInr: 15000 },
  },
  {
    id: "payment-gateway",
    name: "Payment Gateway Integration",
    price: { type: "flat", minInr: 5000 },
  },
  {
    id: "seo-monthly",
    name: "SEO Monthly Package",
    price: { type: "per_month_plus", minInr: 7500 },
  },
];

export const defaultWebsiteCurrency = "INR" as const;

export const WEBSITE_CURRENCY_STORAGE_KEY = "focusfolks-website-currency";
