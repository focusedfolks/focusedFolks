import { products as fallbackProducts } from "@/constants/products";
import type { Product, ProductStatus } from "@/types";
import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";

export type DbProduct = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  thumbnail: string | null;
  status: ProductStatus;
  category: string | null;
  href: string | null;
  features: string[] | null;
  sort_order: number;
};

function mapDbProduct(row: DbProduct): Product {
  return {
    id: row.slug || row.id,
    name: row.name,
    tagline: row.tagline ?? "",
    description: row.description ?? "",
    thumbnail: row.thumbnail ?? "/images/products/product-1.png",
    status: row.status === "live" ? "live" : "coming-soon",
    category: row.category ?? "",
    ...(row.href ? { href: row.href } : {}),
    features: row.features ?? [],
  };
}

/**
 * Load products from Supabase when configured and populated;
 * otherwise fall back to hardcoded constants so the site never blanks.
 */
export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return fallbackProducts;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("sort_order");

    if (error || !data?.length) {
      if (error) console.warn("[cms] products fetch failed — using fallback", error);
      return fallbackProducts;
    }

    return (data as DbProduct[]).map(mapDbProduct);
  } catch (err) {
    console.warn("[cms] products fetch error — using fallback", err);
    return fallbackProducts;
  }
}
