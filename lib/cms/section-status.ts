/**
 * Which CMS sections have a live public-page Supabase fetch path.
 * Update `publicFetchWired` when a page starts calling lib/cms/* (or equivalent).
 * Status badges and dashboard progress derive from this — do not hardcode per-card.
 */
export type CmsSectionId =
  | "pricing"
  | "homepage"
  | "faqs"
  | "services"
  | "blog"
  | "products"
  | "about"
  | "contact";

export type CmsSectionConfig = {
  id: CmsSectionId;
  href: string;
  title: string;
  desc: string;
  /** True only when the public site page actually queries Supabase for this content. */
  publicFetchWired: boolean;
  /** Table used for dashboard item counts; null = show em dash. */
  countTable:
    | "pricing_tiers"
    | "faqs"
    | "services"
    | "blog_posts"
    | "products"
    | "team_members"
    | "homepage_blocks"
    | "site_settings_contact"
    | null;
};

export const CMS_SECTIONS: CmsSectionConfig[] = [
  {
    id: "pricing",
    href: "/admin/pricing",
    title: "Pricing",
    desc: "Categories, tiers, price ranges, add-ons",
    publicFetchWired: true,
    countTable: "pricing_tiers",
  },
  {
    id: "homepage",
    href: "/admin/homepage",
    title: "Homepage",
    desc: "Hero, Why Us, Process, Team, Industries, Stats",
    publicFetchWired: true,
    countTable: "homepage_blocks",
  },
  {
    id: "faqs",
    href: "/admin/faqs",
    title: "FAQs",
    desc: "Homepage and pricing FAQ sets",
    publicFetchWired: true,
    countTable: "faqs",
  },
  {
    id: "services",
    href: "/admin/services",
    title: "Services",
    desc: "Service pages + featured homepage cards",
    publicFetchWired: false,
    countTable: "services",
  },
  {
    id: "blog",
    href: "/admin/blog",
    title: "Blog",
    desc: "Posts, publish/unpublish",
    publicFetchWired: false,
    countTable: "blog_posts",
  },
  {
    id: "products",
    href: "/admin/products",
    title: "Products",
    desc: "Product cards and status",
    publicFetchWired: false,
    countTable: "products",
  },
  {
    id: "about",
    href: "/admin/about",
    title: "About",
    desc: "Team bios, values, timeline",
    publicFetchWired: false,
    countTable: "team_members",
  },
  {
    id: "contact",
    href: "/admin/contact-settings",
    title: "Contact",
    desc: "Email, phones, offices (shared with footer)",
    publicFetchWired: false,
    countTable: "site_settings_contact",
  },
];

export function getCmsSectionStatus(section: CmsSectionConfig): "live" | "scaffold" {
  return section.publicFetchWired ? "live" : "scaffold";
}

export function getWiredSectionStats() {
  const total = CMS_SECTIONS.length;
  const wired = CMS_SECTIONS.filter((s) => s.publicFetchWired).length;
  return { wired, total, progress: total === 0 ? 0 : wired / total };
}

export const ADMIN_SIDEBAR_NAV = [
  { href: "/admin", label: "Dashboard", match: "exact" as const },
  { href: "/admin/pricing", label: "Pricing", match: "prefix" as const },
  { href: "/admin/homepage", label: "Homepage", match: "prefix" as const },
  { href: "/admin/services", label: "Services", match: "prefix" as const },
  { href: "/admin/faqs", label: "FAQs", match: "prefix" as const },
  { href: "/admin/blog", label: "Blog", match: "prefix" as const },
  { href: "/admin/products", label: "Products", match: "prefix" as const },
  { href: "/admin/about", label: "About", match: "prefix" as const },
  { href: "/admin/contact-settings", label: "Contact", match: "prefix" as const },
];
