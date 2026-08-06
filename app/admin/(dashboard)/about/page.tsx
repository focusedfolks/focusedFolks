import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";
import { AboutAdminClient } from "@/components/admin/about-admin-client";

export default async function AdminAboutPage() {
  if (!isSupabaseConfigured()) {
    return <div className="admin-warn">Configure Supabase in .env.local, then run npm run seed:cms</div>;
  }
  const supabase = await createClient();
  const [{ data: team }, { data: aboutRow }] = await Promise.all([
    supabase.from("team_members").select("*").order("sort_order"),
    supabase.from("site_settings").select("value").eq("key", "about").maybeSingle(),
  ]);
  return (
    <AboutAdminClient
      team={team ?? []}
      about={(aboutRow?.value as Parameters<typeof AboutAdminClient>[0]["about"]) ?? null}
    />
  );
}
