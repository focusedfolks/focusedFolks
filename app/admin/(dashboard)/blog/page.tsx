import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";
import { BlogAdminClient } from "@/components/admin/blog-admin-client";

export default async function AdminBlogPage() {
  if (!isSupabaseConfigured()) {
    return <div className="admin-warn">Configure Supabase in .env.local, then run npm run seed:cms</div>;
  }
  const supabase = await createClient();
  const { data } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false });
  return <BlogAdminClient posts={(data ?? []) as Parameters<typeof BlogAdminClient>[0]["posts"]} />;
}
