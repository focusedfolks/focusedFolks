"use client";

import type { Product } from "@/types";
import { SectionHeader } from "@/components/shared/section-header";
import { ProductCard } from "@/sections/products/product-card";

export function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <section id="products-grid" className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            badge="Catalog"
            title="Our product suite"
            description="One live platform and three upcoming tools—each designed for how Focused Folks delivers software."
            align="left"
            servicesPage
          />

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {products.map((product, idx) => (
              <ProductCard key={product.id} product={product} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
