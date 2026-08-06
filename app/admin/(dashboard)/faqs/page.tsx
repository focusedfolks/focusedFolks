import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";
import { FaqsAdminClient } from "@/components/admin/faqs-admin-client";

export default async function AdminFaqsPage() {
  if (!isSupabaseConfigured()) {
    return <div className="admin-warn">Configure Supabase in .env.local, then run npm run seed:cms</div>;
  }
  const supabase = await createClient();
  const { data } = await supabase.from("faqs").select("*").order("sort_order");
  return <FaqsAdminClient faqs={(data ?? []) as Parameters<typeof FaqsAdminClient>[0]["faqs"]} />;
}
