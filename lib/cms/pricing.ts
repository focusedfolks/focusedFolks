import type { PricingAmount, ServiceCategoryPackage } from "@/constants/pricing-packages";
import { PRICING_PACKAGES } from "@/constants/pricing-packages";
import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";

export type DbPricingCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  addons_title: string | null;
  sort_order: number;
};

export type DbPricingTier = {
  id: string;
  category_id: string;
  slug: string;
  title: string;
  badge: string | null;
  price_low: number;
  price_high: number;
  price_unit: string;
  scope: string | null;
  delivery: string | null;
  description: string | null;
  features: string[];
  is_most_popular: boolean;
  sort_order: number;
};

export type DbPricingAddon = {
  id: string;
  category_id: string;
  slug: string;
  name: string;
  price_low: number;
  price_high: number;
  sort_order: number;
};

function unitFromDb(unit: string): "month" | "hour" | undefined {
  if (unit === "/month" || unit === "month") return "month";
  if (unit === "/hr" || unit === "/hour" || unit === "hour") return "hour";
  return undefined;
}

function toPriceINR(tier: DbPricingTier): PricingAmount {
  const unit = unitFromDb(tier.price_unit);
  if (Number(tier.price_low) === Number(tier.price_high) && !unit) {
    return Number(tier.price_low);
  }
  return {
    min: Number(tier.price_low),
    max: Number(tier.price_high),
    ...(unit ? { unit } : {}),
  };
}

function mapDbToPackages(
  categories: DbPricingCategory[],
  tiers: DbPricingTier[],
  addons: DbPricingAddon[]
): ServiceCategoryPackage[] {
  return categories
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((cat) => {
      const catTiers = tiers
        .filter((t) => t.category_id === cat.id)
        .sort((a, b) => a.sort_order - b.sort_order);
      const catAddons = addons
        .filter((a) => a.category_id === cat.id)
        .sort((a, b) => a.sort_order - b.sort_order);

      return {
        id: cat.slug,
        categoryName: cat.name,
        tagline: cat.description ?? "",
        plans: catTiers.map((t) => ({
          id: t.slug,
          name: t.title,
          badge: t.badge ?? undefined,
          popular: t.is_most_popular,
          priceINR: toPriceINR(t),
          scope: t.scope ?? "",
          delivery: t.delivery ?? "",
          description: t.description ?? "",
          features: t.features ?? [],
        })),
        addonsTitle: cat.addons_title ?? undefined,
        addons: catAddons.length
          ? catAddons.map((a) => ({
              id: a.slug,
              name: a.name,
              priceINR: { min: Number(a.price_low), max: Number(a.price_high) },
            }))
          : undefined,
      };
    });
}

/**
 * Load pricing packages from Supabase when configured and populated;
 * otherwise fall back to hardcoded PRICING_PACKAGES so the site never blanks.
 */
export async function getPricingPackages(): Promise<ServiceCategoryPackage[]> {
  if (!isSupabaseConfigured()) {
    return PRICING_PACKAGES;
  }

  try {
    const supabase = await createClient();
    const [{ data: categories, error: catErr }, { data: tiers, error: tierErr }, { data: addons, error: addonErr }] =
      await Promise.all([
        supabase.from("pricing_categories").select("*").order("sort_order"),
        supabase.from("pricing_tiers").select("*").order("sort_order"),
        supabase.from("pricing_addons").select("*").order("sort_order"),
      ]);

    if (catErr || tierErr || addonErr || !categories?.length) {
      console.warn("[cms] pricing fetch failed or empty — using hardcoded fallback", catErr ?? tierErr ?? addonErr);
      return PRICING_PACKAGES;
    }

    return mapDbToPackages(
      categories as DbPricingCategory[],
      (tiers ?? []) as DbPricingTier[],
      (addons ?? []) as DbPricingAddon[]
    );
  } catch (err) {
    console.warn("[cms] pricing fetch error — using hardcoded fallback", err);
    return PRICING_PACKAGES;
  }
}
