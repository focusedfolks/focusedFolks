import type { InrPricingAddon, InrPricingPlan } from "@/types/inr-pricing";

/** Custom Web Apps & Systems catalogue — all amounts stored in INR (source of truth). */
export const customAppsPricingPlans: InrPricingPlan[] = [
  {
    id: "admin-panel",
    name: "Admin Panel",
    scope: "Authentication + Dashboard",
    delivery: "10-15 Days",
    price: { type: "flat", minInr: 32500 },
  },
  {
    id: "crm-system",
    name: "CRM System",
    scope: "Lead & Customer Management",
    delivery: "25-35 Days",
    price: { type: "flat", minInr: 90000 },
  },
  {
    id: "inventory-management",
    name: "Inventory Management",
    scope: "Inventory + Reports",
    delivery: "20-30 Days",
    price: { type: "flat", minInr: 100000 },
  },
  {
    id: "hrms",
    name: "HRMS",
    scope: "Employee Management",
    delivery: "25-35 Days",
    price: { type: "flat", minInr: 130000 },
  },
  {
    id: "lms",
    name: "LMS (Learning Platform)",
    scope: "Learning Platform",
    delivery: "30-40 Days",
    price: { type: "flat", minInr: 175000 },
  },
  {
    id: "school-erp",
    name: "School ERP",
    scope: "Academic ERP",
    delivery: "40-55 Days",
    price: { type: "flat", minInr: 225000 },
  },
  {
    id: "erp-system",
    name: "ERP System",
    scope: "Enterprise modules",
    delivery: "45-60 Days",
    price: { type: "flat", minInr: 225000 },
  },
  {
    id: "hospital-management",
    name: "Hospital Management (HMS)",
    scope: "Full HMS",
    delivery: "45-60 Days",
    price: { type: "flat", minInr: 300000 },
  },
  {
    id: "booking-portal",
    name: "Booking Portal",
    scope: "Bookings & Payments",
    delivery: "25-35 Days",
    price: { type: "custom_quote" },
  },
  {
    id: "job-portal",
    name: "Job Portal",
    scope: "Jobs & Applications",
    delivery: "30-40 Days",
    price: { type: "custom_quote" },
  },
  {
    id: "classified-website",
    name: "Classified Website",
    scope: "Listings Platform",
    delivery: "30-40 Days",
    price: { type: "custom_quote" },
  },
];

export const customAppsPricingAddons: InrPricingAddon[] = [];
