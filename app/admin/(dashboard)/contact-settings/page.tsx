import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";
import { ContactAdminClient, type ContactValue } from "@/components/admin/contact-admin-client";

export default async function AdminContactPage() {
  if (!isSupabaseConfigured()) {
    return <div className="admin-warn">Configure Supabase in .env.local, then run npm run seed:cms</div>;
  }
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("value").eq("key", "contact").maybeSingle();
  return <ContactAdminClient initial={(data?.value as ContactValue) ?? null} />;
}
