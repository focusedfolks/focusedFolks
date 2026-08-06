import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";
import { ProductsAdminClient, type ProductRow } from "@/components/admin/products-admin-client";

export default async function AdminProductsPage() {
  if (!isSupabaseConfigured()) {
    return <div className="admin-warn">Configure Supabase in .env.local, then run npm run seed:cms</div>;
  }
  const supabase = await createClient();
  const { data } = await supabase.from("products").select("*").order("sort_order");
  return <ProductsAdminClient products={(data ?? []) as ProductRow[]} />;
}
