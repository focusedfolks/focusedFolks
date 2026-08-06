import { services as fallbackServices, serviceHeroImages } from "@/constants/services";
import {
  getAllServiceSlugs,
  getServicePageData,
} from "@/lib/services";
import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";
import type { Service, ServiceDetailContent } from "@/types";

export type DbService = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string | null;
  hover_preview: string | null;
  mega_summary: string | null;
  price_from_usd: number | null;
  icon: string | null;
  href: string | null;
  features: string[];
  hero_image: string | null;
  is_featured: boolean;
  sort_order: number;
  detail: ServiceDetailContent | Record<string, unknown>;
};

const HOME_FEATURED_IDS = ["custom-software", "web-development", "design"] as const;

function mapRowToService(row: DbService): Service {
  return {
    id: row.slug,
    title: row.title,
    description: row.description ?? "",
    megaSummary: row.mega_summary ?? row.hover_preview ?? undefined,
    icon: row.icon ?? "Code2",
    href: row.href?.trim() || `/services/${row.slug}`,
    features: row.features ?? [],
  };
}

function mapRowToDetail(row: DbService): ServiceDetailContent | null {
  const raw = row.detail;
  if (!raw || typeof raw !== "object" || !("tagline" in raw)) {
    return getServicePageData(row.slug)?.detail ?? null;
  }
  const detail = raw as ServiceDetailContent;
  return {
    ...detail,
    tagline: row.tagline ?? detail.tagline,
    heroImage: row.hero_image ?? detail.heroImage ?? serviceHeroImages[row.slug] ?? "",
  };
}

function featuredFromFallback(): Service[] {
  return HOME_FEATURED_IDS.flatMap((id) => {
    const service = fallbackServices.find((s) => s.id === id);
    return service ? [service] : [];
  });
}

/**
 * Load all services from Supabase when configured and populated;
 * otherwise fall back to hardcoded constants.
 */
export async function getServices(): Promise<Service[]> {
  if (!isSupabaseConfigured()) return fallbackServices;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("services").select("*").order("sort_order");

    if (error || !data?.length) {
      console.warn("[cms] services fetch failed or empty — using hardcoded fallback", error);
      return fallbackServices;
    }

    return (data as DbService[]).map(mapRowToService);
  } catch (err) {
    console.warn("[cms] services fetch error — using hardcoded fallback", err);
    return fallbackServices;
  }
}

/**
 * Featured services for the homepage overview (is_featured), ordered by sort_order.
 */
export async function getFeaturedServices(): Promise<Service[]> {
  if (!isSupabaseConfigured()) return featuredFromFallback();

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_featured", true)
      .order("sort_order");

    if (error || !data?.length) {
      if (error) console.warn("[cms] featured services fetch failed — using fallback", error);
      return featuredFromFallback();
    }

    return (data as DbService[]).map(mapRowToService);
  } catch (err) {
    console.warn("[cms] featured services fetch error — using fallback", err);
    return featuredFromFallback();
  }
}

/**
 * Service detail page data from CMS, with constant fallback when missing/invalid.
 */
export async function getServicePageDataFromCms(
  slug: string
): Promise<{ service: Service; detail: ServiceDetailContent } | null> {
  if (!isSupabaseConfigured()) return getServicePageData(slug);

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("services").select("*").eq("slug", slug).maybeSingle();

    if (error || !data) {
      if (error) console.warn(`[cms] service (${slug}) fetch failed — using fallback`, error);
      return getServicePageData(slug);
    }

    const row = data as DbService;
    const service = mapRowToService(row);
    const detail = mapRowToDetail(row);
    if (!detail) return getServicePageData(slug);
    return { service, detail };
  } catch (err) {
    console.warn(`[cms] service (${slug}) fetch error — using fallback`, err);
    return getServicePageData(slug);
  }
}

/** Slugs for static generation — CMS when available, else constants. */
export async function getServiceSlugsFromCms(): Promise<string[]> {
  if (!isSupabaseConfigured()) return getAllServiceSlugs();

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("services").select("slug").order("sort_order");
    if (error || !data?.length) return getAllServiceSlugs();
    return data.map((r) => r.slug as string);
  } catch {
    return getAllServiceSlugs();
  }
}
