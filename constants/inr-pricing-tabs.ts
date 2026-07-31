import {
  aiPricingAddons,
  aiPricingComparison,
  aiPricingPlans,
} from "@/constants/ai-pricing";
import {
  cloudPricingAddons,
  cloudPricingComparison,
  cloudPricingPlans,
} from "@/constants/cloud-pricing";
import {
  devopsPricingAddons,
  devopsPricingComparison,
  devopsPricingPlans,
} from "@/constants/devops-pricing";
import {
  digitalTransformationPricingAddons,
  digitalTransformationPricingComparison,
  digitalTransformationPricingPlans,
} from "@/constants/digital-transformation-pricing";
import {
  consultingPricingAddons,
  consultingPricingComparison,
  consultingPricingPlans,
} from "@/constants/consulting-pricing";
import {
  designPricingAddons,
  designPricingComparison,
  designPricingPlans,
} from "@/constants/design-pricing";
import {
  mobilePricingAddons,
  mobilePricingComparison,
  mobilePricingPlans,
} from "@/constants/mobile-pricing";
import {
  staffingPricingAddons,
  staffingPricingComparison,
  staffingPricingPlans,
} from "@/constants/staffing-pricing";
import {
  softwarePricingAddons,
  softwarePricingComparison,
  softwarePricingPlans,
} from "@/constants/software-pricing";
import {
  websitePricingAddons,
  websitePricingPlans,
} from "@/constants/website-pricing";
import type { InrPricingAddon, InrPricingComparisonRow, InrPricingPlan } from "@/types/inr-pricing";

export type InrPricingTabConfig = {
  id: string;
  label: string;
  badge: string;
  title: string;
  description: string;
  plans: InrPricingPlan[];
  addons: InrPricingAddon[];
  comparison?: {
    title: string;
    description?: string;
    starterLabel: string;
    businessLabel: string;
    enterpriseLabel: string;
    rows: InrPricingComparisonRow[];
  };
};

/** Tabbed INR pricing catalog — add future service tabs here. */
export const inrPricingTabs: InrPricingTabConfig[] = [
  {
    id: "website",
    label: "Website Development",
    badge: "Website Pricing / Plans",
    title: "Website packages for every business",
    description:
      "Launch a high-converting site with fixed scope, clear deliverables, and transparent add-ons.",
    plans: websitePricingPlans,
    addons: websitePricingAddons,
  },
  {
    id: "software",
    label: "Custom Software Development",
    badge: "Custom Software Development / Plans",
    title: "Software packages built for scale",
    description:
      "Custom software from MVP to enterprise — predictable pricing, scalable architecture, and clean handoff.",
    plans: softwarePricingPlans,
    addons: softwarePricingAddons,
    comparison: {
      title: "Software development — plan comparison",
      description: "Compare Starter, Business, and Enterprise tiers for custom software development.",
      starterLabel: "Starter",
      businessLabel: "Business",
      enterpriseLabel: "Enterprise",
      rows: softwarePricingComparison,
    },
  },
  {
    id: "mobile",
    label: "Mobile App Development",
    badge: "Mobile App Development / Plans",
    title: "Mobile app packages for every stage",
    description:
      "Native and cross-platform apps that ship fast, perform reliably, and grow with your users.",
    plans: mobilePricingPlans,
    addons: mobilePricingAddons,
    comparison: {
      title: "Mobile app development — plan comparison",
      description: "Compare Starter, Business, and Enterprise tiers for mobile app development.",
      starterLabel: "Starter",
      businessLabel: "Business",
      enterpriseLabel: "Enterprise",
      rows: mobilePricingComparison,
    },
  },
  {
    id: "design",
    label: "UI/UX Design Services",
    badge: "UI/UX Design Services / Plans",
    title: "Design packages for every product",
    description:
      "Research-driven UI/UX that turns visitors into customers — polished flows and pixel-perfect handoff.",
    plans: designPricingPlans,
    addons: designPricingAddons,
    comparison: {
      title: "UI/UX design — plan comparison",
      description: "Compare Starter, Business, and Enterprise tiers for UI/UX design services.",
      starterLabel: "Starter",
      businessLabel: "Business",
      enterpriseLabel: "Enterprise",
      rows: designPricingComparison,
    },
  },
  {
    id: "cloud",
    label: "Cloud Solutions & Infrastructure",
    badge: "Cloud Solutions / Plans",
    title: "Secure, cost-efficient cloud foundations",
    description:
      "AWS, Azure, and GCP landing zones — migration, modernization, security, and FinOps in one program.",
    plans: cloudPricingPlans,
    addons: cloudPricingAddons,
    comparison: {
      title: "Cloud solutions — plan comparison",
      description: "Compare Starter, Business, and Enterprise tiers for cloud solutions and infrastructure services.",
      starterLabel: "Starter",
      businessLabel: "Business",
      enterpriseLabel: "Enterprise",
      rows: cloudPricingComparison,
    },
  },
  {
    id: "devops",
    label: "DevOps & Deployment",
    badge: "DevOps & Deployment / Plans",
    title: "CI/CD, Kubernetes, and releases you can trust",
    description:
      "Automate deployments, cut downtime, and release with confidence across cloud and on-premise.",
    plans: devopsPricingPlans,
    addons: devopsPricingAddons,
    comparison: {
      title: "DevOps & deployment — plan comparison",
      description: "Compare Starter, Business, and Enterprise tiers for DevOps and deployment services.",
      starterLabel: "Starter",
      businessLabel: "Business",
      enterpriseLabel: "Enterprise",
      rows: devopsPricingComparison,
    },
  },
  {
    id: "ai",
    label: "AI Integration",
    badge: "AI Integration / Plans",
    title: "LLM copilots that ship safely",
    description:
      "Production-ready AI — copilots, RAG, agents, and automation with enterprise-grade guardrails.",
    plans: aiPricingPlans,
    addons: aiPricingAddons,
    comparison: {
      title: "AI integration — plan comparison",
      description: "Compare Starter, Business, and Enterprise tiers for AI integration services.",
      starterLabel: "Starter",
      businessLabel: "Business",
      enterpriseLabel: "Enterprise",
      rows: aiPricingComparison,
    },
  },
  {
    id: "staffing",
    label: "Staff Augmentation",
    badge: "Staff Augmentation / Plans",
    title: "Senior engineers on your team",
    description:
      "Embed senior talent fast — engineers, designers, DevOps, and PMs who deliver from day one.",
    plans: staffingPricingPlans,
    addons: staffingPricingAddons,
    comparison: {
      title: "Staff augmentation — plan comparison",
      description: "Compare Starter, Business, and Enterprise tiers for staff augmentation services.",
      starterLabel: "Starter",
      businessLabel: "Business",
      enterpriseLabel: "Enterprise",
      rows: staffingPricingComparison,
    },
  },
  {
    id: "consulting",
    label: "IT Consulting",
    badge: "IT Consulting / Plans",
    title: "Architecture audits, roadmaps, and vendor decisions",
    description:
      "Make smarter technology investments — clear architecture, governance, and vendor choices that stick.",
    plans: consultingPricingPlans,
    addons: consultingPricingAddons,
    comparison: {
      title: "IT consulting — plan comparison",
      description: "Compare Starter, Business, and Enterprise tiers for IT consulting services.",
      starterLabel: "Starter",
      businessLabel: "Business",
      enterpriseLabel: "Enterprise",
      rows: consultingPricingComparison,
    },
  },
  {
    id: "transformation",
    label: "Digital Transformation",
    badge: "Digital Transformation / Plans",
    title: "Modernize platforms, processes, and teams",
    description:
      "One measurable roadmap — legacy modernization, automation, cloud adoption, and change that lasts.",
    plans: digitalTransformationPricingPlans,
    addons: digitalTransformationPricingAddons,
    comparison: {
      title: "Digital transformation — plan comparison",
      description: "Compare Starter, Business, and Enterprise tiers for digital transformation services.",
      starterLabel: "Starter",
      businessLabel: "Business",
      enterpriseLabel: "Enterprise",
      rows: digitalTransformationPricingComparison,
    },
  },
];

export const defaultInrPricingTabId = inrPricingTabs[0].id;

export const INR_PRICING_TAB_STORAGE_KEY = "focusfolks-inr-pricing-tab";

export function getInrPricingTabById(id: string): InrPricingTabConfig | undefined {
  return inrPricingTabs.find((tab) => tab.id === id);
}
