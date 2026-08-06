import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import {
  CMS_SECTIONS,
  getWiredSectionStats,
  type CmsSectionId,
} from "@/lib/cms/section-status";

export type PricingCategoryBar = {
  slug: string;
  name: string;
  tierCount: number;
};

export type SectionRow = {
  id: CmsSectionId;
  title: string;
  href: string;
  desc: string;
  itemCount: number | null;
  status: "live" | "scaffold";
};

export type DashboardMetrics = {
  pricingTierCount: number;
  categoriesWithTiers: number;
  publishedBlogs: number;
  teamMembers: number;
  sectionsLive: number;
  sectionsTotal: number;
  chart: PricingCategoryBar[];
  sections: SectionRow[];
};

async function safeCount(
  query: PromiseLike<{ count: number | null; error: { message: string } | null }>
): Promise<number> {
  try {
    const { count, error } = await query;
    if (error) return 0;
    return count ?? 0;
  } catch {
    return 0;
  }
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const wired = getWiredSectionStats();

  const empty: DashboardMetrics = {
    pricingTierCount: 0,
    categoriesWithTiers: 0,
    publishedBlogs: 0,
    teamMembers: 0,
    sectionsLive: wired.wired,
    sectionsTotal: wired.total,
    chart: [],
    sections: CMS_SECTIONS.map((s) => ({
      id: s.id,
      title: s.title,
      href: s.href,
      desc: s.desc,
      itemCount: null,
      status: s.publicFetchWired ? "live" : "scaffold",
    })),
  };

  if (!isSupabaseConfigured()) {
    return empty;
  }

  try {
    const supabase = await createClient();

    const [
      pricingTiers,
      publishedBlogs,
      teamMembers,
      faqsCount,
      servicesCount,
      blogPostsCount,
      productsCount,
      valueProps,
      processSteps,
      industries,
      stats,
      heroRows,
      contactSetting,
      categoriesRes,
      tiersRes,
    ] = await Promise.all([
      safeCount(supabase.from("pricing_tiers").select("*", { count: "exact", head: true })),
      safeCount(
        supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true)
      ),
      safeCount(supabase.from("team_members").select("*", { count: "exact", head: true })),
      safeCount(supabase.from("faqs").select("*", { count: "exact", head: true })),
      safeCount(supabase.from("services").select("*", { count: "exact", head: true })),
      safeCount(supabase.from("blog_posts").select("*", { count: "exact", head: true })),
      safeCount(supabase.from("products").select("*", { count: "exact", head: true })),
      safeCount(supabase.from("value_props").select("*", { count: "exact", head: true })),
      safeCount(supabase.from("process_steps").select("*", { count: "exact", head: true })),
      safeCount(supabase.from("industries").select("*", { count: "exact", head: true })),
      safeCount(supabase.from("stats").select("*", { count: "exact", head: true })),
      supabase.from("hero_content").select("id"),
      supabase.from("site_settings").select("key").eq("key", "contact").maybeSingle(),
      supabase.from("pricing_categories").select("id, slug, name, sort_order").order("sort_order"),
      supabase.from("pricing_tiers").select("id, category_id"),
    ]);

    const categories = categoriesRes.data ?? [];
    const tiers = tiersRes.data ?? [];
    const tiersByCategory = new Map<string, number>();
    for (const t of tiers) {
      tiersByCategory.set(t.category_id, (tiersByCategory.get(t.category_id) ?? 0) + 1);
    }

    const chart: PricingCategoryBar[] = categories.map((c) => ({
      slug: c.slug,
      name: c.name,
      tierCount: tiersByCategory.get(c.id) ?? 0,
    }));

    const categoriesWithTiers = chart.filter((c) => c.tierCount > 0).length;
    const homepageBlocks =
      (heroRows.data?.length ? 1 : 0) + valueProps + processSteps + teamMembers + industries + stats;
    const contactCount = contactSetting.data ? 1 : 0;

    const countMap: Record<string, number | null> = {
      pricing_tiers: pricingTiers,
      faqs: faqsCount,
      services: servicesCount,
      blog_posts: blogPostsCount,
      products: productsCount,
      team_members: teamMembers,
      homepage_blocks: homepageBlocks,
      site_settings_contact: contactCount,
    };

    const sections: SectionRow[] = CMS_SECTIONS.map((s) => ({
      id: s.id,
      title: s.title,
      href: s.href,
      desc: s.desc,
      itemCount: s.countTable ? (countMap[s.countTable] ?? 0) : null,
      status: s.publicFetchWired ? "live" : "scaffold",
    }));

    return {
      pricingTierCount: pricingTiers,
      categoriesWithTiers,
      publishedBlogs,
      teamMembers,
      sectionsLive: wired.wired,
      sectionsTotal: wired.total,
      chart,
      sections,
    };
  } catch {
    return empty;
  }
}
