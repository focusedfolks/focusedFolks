import type { NavItem } from "@/types";
import { services } from "@/constants/services";

export const mainNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.title,
      href: s.href,
      description: s.megaSummary,
    })),
  },
  { label: "Products", href: "/products" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export const footerCompanyLinks = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
] as const;

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
] as const;

/** @deprecated Use footerCompanyLinks — kept for any legacy imports */
export const footerLinks = {
  company: [...footerCompanyLinks],
  services: [] as { label: string; href: string }[],
  resources: [...footerLegalLinks],
};

export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { label: "GitHub", href: "https://github.com", icon: "github" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
];
