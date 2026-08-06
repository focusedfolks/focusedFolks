/**
 * One-time seed: insert current PRICING_PACKAGES into Supabase.
 *
 * Usage (dev project only):
 *   1. Copy .env.local.example → .env.local and fill DEV keys
 *   2. Run the SQL in supabase/migrations/20260805000000_cms_schema.sql in the SQL editor
 *   3. npx tsx scripts/seed-pricing.ts
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { PRICING_PACKAGES, type PricingAmount } from "../constants/pricing-packages";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

function priceFields(price: PricingAmount): {
  price_low: number;
  price_high: number;
  price_unit: string;
} {
  if (price === "Contact") {
    return { price_low: 0, price_high: 0, price_unit: "" };
  }
  if (typeof price === "number") {
    return { price_low: price, price_high: price, price_unit: "" };
  }
  const unit = price.unit === "month" ? "/month" : price.unit === "hour" ? "/hr" : "";
  return { price_low: price.min, price_high: price.max, price_unit: unit };
}

async function main() {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const key = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  console.log("Seeding pricing_categories / tiers / addons…");

  // Clear existing (dev only)
  await supabase.from("pricing_addons").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("pricing_tiers").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("pricing_categories").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  for (let i = 0; i < PRICING_PACKAGES.length; i++) {
    const cat = PRICING_PACKAGES[i];
    const { data: inserted, error: catErr } = await supabase
      .from("pricing_categories")
      .insert({
        slug: cat.id,
        name: cat.categoryName,
        description: cat.tagline,
        addons_title: cat.addonsTitle ?? null,
        sort_order: i,
      })
      .select("id")
      .single();

    if (catErr || !inserted) {
      throw new Error(`Category ${cat.id}: ${catErr?.message}`);
    }

    const tierRows = cat.plans.map((plan, j) => {
      const p = priceFields(plan.priceINR);
      return {
        category_id: inserted.id,
        slug: plan.id,
        title: plan.name,
        badge: plan.badge ?? null,
        ...p,
        scope: plan.scope,
        delivery: plan.delivery,
        description: plan.description,
        features: plan.features,
        is_most_popular: Boolean(plan.popular),
        sort_order: j,
      };
    });

    const { error: tierErr } = await supabase.from("pricing_tiers").insert(tierRows);
    if (tierErr) throw new Error(`Tiers ${cat.id}: ${tierErr.message}`);

    if (cat.addons?.length) {
      const addonRows = cat.addons.map((addon, j) => ({
        category_id: inserted.id,
        slug: addon.id,
        name: addon.name,
        price_low: addon.priceINR.min,
        price_high: addon.priceINR.max,
        sort_order: j,
      }));
      const { error: addonErr } = await supabase.from("pricing_addons").insert(addonRows);
      if (addonErr) throw new Error(`Addons ${cat.id}: ${addonErr.message}`);
    }

    console.log(`  ✓ ${cat.categoryName} (${cat.plans.length} tiers)`);
  }

  console.log("Done. Pricing seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
