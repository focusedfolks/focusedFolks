import type { InrPricingAddon, InrPricingPlan } from "@/types/inr-pricing";

/** API Integrations catalogue — all amounts stored in INR (source of truth). */
export const apiIntegrationsPricingPlans: InrPricingPlan[] = [
  {
    id: "sms-api",
    name: "SMS API",
    scope: "OTP & Messaging",
    delivery: "1-2 Days",
    price: { type: "flat", minInr: 6500 },
  },
  {
    id: "payment-gateway",
    name: "Payment Gateway",
    scope: "Razorpay/Stripe/etc.",
    delivery: "2-4 Days",
    price: { type: "flat", minInr: 12500 },
  },
  {
    id: "whatsapp-api",
    name: "WhatsApp API",
    scope: "Business API",
    delivery: "3-5 Days",
    price: { type: "flat", minInr: 16000 },
  },
  {
    id: "shipping-api",
    name: "Shipping API",
    scope: "Courier Integration",
    delivery: "3-5 Days",
    price: { type: "flat", minInr: 19500 },
  },
  {
    id: "crm-api",
    name: "CRM API",
    scope: "Third-party CRM",
    delivery: "5-7 Days",
    price: { type: "flat", minInr: 25000 },
  },
  {
    id: "third-party-custom-api",
    name: "Third-party / Custom API",
    scope: "Custom API",
    delivery: "2-10 Days",
    price: { type: "flat", minInr: 32500 },
  },
];

export const apiIntegrationsPricingAddons: InrPricingAddon[] = [];
