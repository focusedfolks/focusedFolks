import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { GalaxyStack } from "@/components/shared/scroll-stack-card";
import { ProductsHero } from "@/sections/products/products-hero";
import { ProductsGrid } from "@/sections/products/products-grid";
import { ServicesCtaSection } from "@/sections/services/services-cta-section";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Products",
    description:
      "Explore FocusFolks SaaS products including Client Credit Tracker for Angadiya accounting firms, plus upcoming tools for analytics, identity, and HR ops—built by Focused Folks Solutions LLP.",
    keywords: [
      "FocusFolks products",
      "SaaS tools",
      "Angadiya accounting software",
      "client credit tracker",
      "hawala bookkeeping",
      "enterprise software India",
    ],
    path: "/products",
  });
}

export default function ProductsPage() {
  return (
    <>
      <GalaxyStack stagger={0}>
        <ProductsHero />
      </GalaxyStack>

      <GalaxyStack stagger={6}>
        <ProductsGrid />
      </GalaxyStack>

      <ServicesCtaSection />
    </>
  );
}
