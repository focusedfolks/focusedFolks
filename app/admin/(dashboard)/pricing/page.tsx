import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";
import { PricingAdminClient } from "@/components/admin/pricing-admin-client";
import type { DbPricingAddon, DbPricingCategory, DbPricingTier } from "@/lib/cms/pricing";

export default async function AdminPricingPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="admin-warn">
        <h1 className="admin-page-title" style={{ fontSize: 22 }}>
          Pricing CMS
        </h1>
        <p className="mt-2">
          Supabase is not configured. Add <code>NEXT_PUBLIC_SUPABASE_*</code> keys to{" "}
          <code>.env.local</code>, run the migration SQL, then <code>npm run seed:pricing</code>.
          Until then the public site uses hardcoded packages.
        </p>
      </div>
    );
  }

  const supabase = await createClient();
  const [{ data: categories }, { data: tiers }, { data: addons }] = await Promise.all([
    supabase.from("pricing_categories").select("*").order("sort_order"),
    supabase.from("pricing_tiers").select("*").order("sort_order"),
    supabase.from("pricing_addons").select("*").order("sort_order"),
  ]);

  return (
    <PricingAdminClient
      categories={(categories ?? []) as DbPricingCategory[]}
      tiers={(tiers ?? []) as DbPricingTier[]}
      addons={(addons ?? []) as DbPricingAddon[]}
    />
  );
}
