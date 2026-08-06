import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";
import { HomepageAdminClient } from "@/components/admin/homepage-admin-client";
import type {
  DbHeroContent,
  DbIndustry,
  DbProcessStep,
  DbStat,
  DbTeamMember,
  DbValueProp,
} from "@/lib/cms/homepage";

export default async function AdminHomepagePage() {
  if (!isSupabaseConfigured()) {
    return <div className="admin-warn">Configure Supabase in .env.local, then run npm run seed:cms</div>;
  }

  const supabase = await createClient();
  const [
    { data: hero },
    { data: valueProps },
    { data: processSteps },
    { data: teamMembers },
    { data: industries },
    { data: stats },
  ] = await Promise.all([
    supabase.from("hero_content").select("*").eq("id", 1).maybeSingle(),
    supabase.from("value_props").select("*").order("sort_order"),
    supabase.from("process_steps").select("*").order("sort_order"),
    supabase.from("team_members").select("*").order("sort_order"),
    supabase.from("industries").select("*").order("sort_order"),
    supabase.from("stats").select("*").order("sort_order"),
  ]);

  return (
    <HomepageAdminClient
      hero={(hero as DbHeroContent | null) ?? null}
      valueProps={(valueProps ?? []) as DbValueProp[]}
      processSteps={(processSteps ?? []) as DbProcessStep[]}
      teamMembers={(teamMembers ?? []) as DbTeamMember[]}
      industries={(industries ?? []) as DbIndustry[]}
      stats={(stats ?? []) as DbStat[]}
    />
  );
}
