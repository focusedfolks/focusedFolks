import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";
import { ServicesAdminClient, type ServiceRow } from "@/components/admin/services-admin-client";

export default async function AdminServicesPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="admin-warn">Configure Supabase in .env.local, then run npm run seed:cms</div>
    );
  }
  const supabase = await createClient();
  const { data } = await supabase.from("services").select("*").order("sort_order");
  return <ServicesAdminClient services={(data ?? []) as ServiceRow[]} />;
}
