import { AdminDashboardClient } from "@/components/admin/admin-dashboard-client";
import { displayNameFromEmail } from "@/lib/admin/user-display";
import { getDashboardMetrics } from "@/lib/cms/dashboard";
import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics();

  let userEmail: string | null = null;
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      userEmail = user?.email ?? null;
    } catch {
      userEmail = null;
    }
  }

  return (
    <AdminDashboardClient metrics={metrics} welcomeName={displayNameFromEmail(userEmail)} />
  );
}
