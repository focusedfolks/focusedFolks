export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export type ProductStatus = "live" | "coming-soon";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  thumbnail: string;
  status: ProductStatus;
  category: string;
  /** External or internal URL when status is live */
  href?: string;
  features?: string[];
};

export type Service = {
  id: string;
  title: string;
  description: string;
  /** One-line copy for the header mega menu */
  megaSummary?: string;
  icon: string;
  href: string;
  features?: string[];
};

export type ServicePlan = {
  name: string;
  description: string;
  duration: string;
  includes: string[];
  /** USD starting price; null = custom quote */
  priceFromUsd?: number | null;
  /** Display override e.g. "From $8,500" or "Custom" */
  priceLabel?: string;
  popular?: boolean;
};

export type ServiceDetailContent = {
  tagline: string;
  overview: string[];
  heroImage: string;
  excellence: { title: string; description: string; icon: string }[];
  approach: { step: string; title: string; description: string }[];
  plans: ServicePlan[];
  successMetrics: { label: string; value: number; suffix?: string; prefix?: string }[];
  deliverables: string[];
  technologies: string[];
  feedback: {
    quote: string;
    author: string;
    role: string;
    company: string;
    rating: number;
  };
  faqs: FaqItem[];
};

export type PricingRegion = {
  id: string;
  label: string;
  currency: string;
  locale: string;
  /** Local currency units per 1 USD (base plan prices are in USD). */
  rateFromUsd: number;
};

export type PricingTier = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  popular?: boolean;
  features: string[];
  cta: string;
  href: string;
};

export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  /** USD base price; null = custom */
  priceFromUsd: number | null;
  priceType: "project" | "monthly" | "hourly";
  duration: string;
  popular?: boolean;
  features: string[];
  cta: string;
  href: string;
};

export type PricingCategory = {
  id: string;
  label: string;
  description: string;
  serviceHref: string;
  plans: PricingPlan[];
  comparisonFeatures: {
    name: string;
    starter: string | boolean;
    growth: string | boolean;
    enterprise: string | boolean;
  }[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: { name: string; role: string };
  image: string;
  featured?: boolean;
  tags: string[];
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  image: string;
  location?: string;
  projectTag?: string;
};

export type TeamThought = {
  id: string;
  name: string;
  role: string;
  image: string;
  theme: string;
  quote: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  industry: string;
  description: string;
  metrics: { label: string; value: string }[];
  image: string;
};

export type TeamMember = {
  id: string;
  name?: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};
