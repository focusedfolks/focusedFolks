import type { InrPricingAddon, InrPricingComparisonRow, InrPricingPlan } from "@/types/inr-pricing";

/** UI/UX design service packages — all amounts stored in INR (source of truth). */
export const designPricingPlans: InrPricingPlan[] = [
  {
    id: "starter-design",
    name: "Starter UI/UX Package",
    price: { type: "range", minInr: 14999, maxInr: 39999 },
    suitableFor: "Startups, Small Businesses, Landing Pages, MVP Products",
    features: [
      "UI/UX Consultation",
      "User Flow Design",
      "Wireframing",
      "Up to 10 Screens",
      "Mobile Responsive Design",
      "Modern UI Design",
      "Design System Basics",
      "Typography & Color Selection",
      "Clickable Prototype",
      "Figma Source File",
      "Asset Export",
      "1 Revision Round",
      "Delivery: 1–2 Weeks",
    ],
  },
  {
    id: "business-design",
    name: "Business UI/UX Package",
    price: { type: "range", minInr: 49999, maxInr: 124999 },
    suitableFor: "Growing Businesses, SaaS Platforms, Web Applications, Mobile Applications",
    popular: true,
    features: [
      "Everything in Starter Package",
      "Advanced User Research",
      "Information Architecture",
      "UX Strategy",
      "Up to 30 Screens",
      "High-Fidelity UI Design",
      "Interactive Prototyping",
      "Component Library",
      "Design System Creation",
      "Mobile & Desktop Variations",
      "Accessibility Considerations",
      "Developer Handoff",
      "Figma Organization",
      "Asset Management",
      "3 Revision Rounds",
      "Delivery: 2–6 Weeks",
    ],
  },
  {
    id: "enterprise-design",
    name: "Enterprise UI/UX Package",
    price: { type: "from", minInr: 199999 },
    suitableFor:
      "Large Enterprises, SaaS Products, ERP Systems, FinTech Platforms, Enterprise Applications",
    features: [
      "Unlimited Screens",
      "Complete UX Research",
      "User Journey Mapping",
      "Stakeholder Workshops",
      "Enterprise Design System",
      "Design Tokens",
      "Advanced Prototyping",
      "User Testing Recommendations",
      "Product Experience Strategy",
      "Mobile, Tablet & Desktop Designs",
      "Accessibility Compliance Support",
      "Design Documentation",
      "Team Collaboration Setup",
      "Developer Support",
      "Priority Revisions",
      "Unlimited Revisions*",
      "Delivery Based On Scope",
    ],
  },
];

export const designPricingAddons: InrPricingAddon[] = [
  {
    id: "additional-screen",
    name: "Additional Screen Design",
    price: { type: "per_screen", minInr: 1500 },
  },
  {
    id: "ux-research",
    name: "UX Research Package",
    price: { type: "single_plus", minInr: 25000 },
  },
  {
    id: "user-journey",
    name: "User Journey Mapping",
    price: { type: "single_plus", minInr: 15000 },
  },
  {
    id: "interactive-prototype",
    name: "Interactive Prototyping",
    price: { type: "single_plus", minInr: 12000 },
  },
  {
    id: "design-system",
    name: "Design System Creation",
    price: { type: "single_plus", minInr: 20000 },
  },
  {
    id: "mobile-app-ui",
    name: "Mobile App UI Design",
    price: { type: "single_plus", minInr: 25000 },
  },
  {
    id: "dashboard-ui",
    name: "Dashboard UI Design",
    price: { type: "single_plus", minInr: 20000 },
  },
  {
    id: "saas-product",
    name: "SaaS Product Design",
    price: { type: "single_plus", minInr: 50000 },
  },
  {
    id: "design-audit",
    name: "Design Audit",
    price: { type: "single_plus", minInr: 15000 },
  },
  {
    id: "accessibility-review",
    name: "Accessibility Review",
    price: { type: "single_plus", minInr: 20000 },
  },
  {
    id: "branding-integration",
    name: "Branding Integration",
    price: { type: "single_plus", minInr: 15000 },
  },
  {
    id: "developer-handoff",
    name: "Developer Handoff Support",
    price: { type: "single_plus", minInr: 10000 },
  },
  {
    id: "monthly-design-support",
    name: "Monthly Design Support",
    price: { type: "per_month", minInr: 15000 },
  },
];

export const designPricingComparison: InrPricingComparisonRow[] = [
  { name: "Wireframing", starter: true, business: true, enterprise: true },
  { name: "UI Design", starter: true, business: true, enterprise: true },
  { name: "UX Strategy", starter: "Basic", business: "Advanced", enterprise: "Enterprise" },
  { name: "Prototype", starter: true, business: true, enterprise: true },
  { name: "Design System", starter: "Basic", business: "Advanced", enterprise: "Enterprise" },
  { name: "User Research", starter: "✗", business: true, enterprise: true },
  { name: "Developer Handoff", starter: "Basic", business: true, enterprise: true },
  { name: "Accessibility", starter: "✗", business: "Basic", enterprise: "Advanced" },
  { name: "Screens", starter: "10", business: "30", enterprise: "Unlimited" },
  { name: "Support", starter: "15 Days", business: "30 Days", enterprise: "90 Days" },
  {
    name: "Price",
    starter: { type: "from_plus", minInr: 14999 },
    business: { type: "from_plus", minInr: 49999 },
    enterprise: { type: "from_plus", minInr: 199999 },
  },
];
