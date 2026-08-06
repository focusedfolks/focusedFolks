import { blogPosts as fallbackPosts } from "@/constants/content";
import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/types";

export type DbBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string | null;
  author: string | null;
  author_role: string | null;
  read_time: string | null;
  tags: string[];
  featured: boolean;
  published: boolean;
  published_at: string | null;
};

function formatBlogDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function normalizeSlug(raw: string): string {
  let s = raw;
  try {
    s = decodeURIComponent(s);
  } catch {
    // keep raw
  }
  return s
    .trim()
    .replace(/\/+$/, "")
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapRowToBlogPost(row: DbBlogPost): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    category: row.category ?? "",
    date: formatBlogDate(row.published_at),
    readTime: row.read_time ?? "5 min read",
    author: {
      name: row.author ?? "Focused Folks",
      role: row.author_role ?? "",
    },
    image: row.cover_image ?? "",
    featured: row.featured || undefined,
    tags: row.tags ?? [],
  };
}

function findFallbackBySlug(slug: string): BlogPost | undefined {
  const wanted = normalizeSlug(slug);
  return fallbackPosts.find((p) => normalizeSlug(p.slug) === wanted);
}

/**
 * Published blog posts for the public index.
 * Falls back to hardcoded constants when Supabase is empty or unavailable.
 */
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return fallbackPosts;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error || !data?.length) {
      if (error) console.warn("[cms] blog posts fetch failed — using hardcoded fallback", error);
      return fallbackPosts;
    }

    return (data as DbBlogPost[]).map(mapRowToBlogPost);
  } catch (err) {
    console.warn("[cms] blog posts fetch error — using hardcoded fallback", err);
    return fallbackPosts;
  }
}

/**
 * Single published post by slug for the detail page.
 * Falls back to constants when missing or unpublished in CMS.
 */
export async function getBlogPostBySlug(rawSlug: string): Promise<BlogPost | null> {
  const fallback = findFallbackBySlug(rawSlug) ?? null;
  if (!isSupabaseConfigured()) return fallback;

  const wanted = normalizeSlug(rawSlug);

  try {
    const supabase = await createClient();

    const trySlug = async (slug: string) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) {
        console.warn(`[cms] blog post (${slug}) fetch failed — using fallback`, error);
        return null;
      }
      return data ? mapRowToBlogPost(data as DbBlogPost) : null;
    };

    const exact = await trySlug(rawSlug);
    if (exact) return exact;

    if (wanted && wanted !== rawSlug) {
      const normalized = await trySlug(wanted);
      if (normalized) return normalized;
    }

    return fallback;
  } catch (err) {
    console.warn(`[cms] blog post (${rawSlug}) fetch error — using fallback`, err);
    return fallback;
  }
}

/** Slugs for static generation — published CMS rows when available, else constants. */
export async function getBlogSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) return fallbackPosts.map((p) => p.slug);

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error || !data?.length) return fallbackPosts.map((p) => p.slug);
    return data.map((r) => r.slug as string);
  } catch {
    return fallbackPosts.map((p) => p.slug);
  }
}
