"use server";

import { requireAuthedClient, revalidateAdmin, type ActionResult } from "../actions-shared";

const REVALIDATE_PATHS = ["/admin/services", "/services", "/"] as const;

async function revalidateServices() {
  await revalidateAdmin(...REVALIDATE_PATHS);
  // Refresh all service detail pages under /services
  const { revalidatePath } = await import("next/cache");
  revalidatePath("/services", "layout");
}

export async function upsertService(input: {
  id?: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  hover_preview: string;
  icon: string;
  price_from_usd: number | null;
  is_featured: boolean;
  features: string[];
  href?: string | null;
}): Promise<ActionResult> {
  try {
    if (!input.slug.trim() || !input.title.trim()) {
      return { ok: false, error: "Slug and title are required" };
    }
    const supabase = await requireAuthedClient();
    const slug = input.slug.trim();
    const row = {
      slug,
      title: input.title.trim(),
      tagline: input.tagline.trim() || null,
      description: input.description.trim() || null,
      hover_preview: input.hover_preview.trim() || null,
      mega_summary: input.hover_preview.trim() || null,
      icon: input.icon.trim() || null,
      price_from_usd: input.price_from_usd,
      is_featured: input.is_featured,
      features: input.features.filter(Boolean),
      href: input.href?.trim() || `/services/${slug}`,
      updated_at: new Date().toISOString(),
    };

    if (input.id) {
      const { error } = await supabase.from("services").update(row).eq("id", input.id);
      if (error) return { ok: false, error: error.message };
    } else {
      const { data: existing } = await supabase
        .from("services")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1);
      const { error } = await supabase.from("services").insert({
        ...row,
        sort_order: (existing?.[0]?.sort_order ?? -1) + 1,
        detail: {},
      });
      if (error) return { ok: false, error: error.message };
    }

    await revalidateServices();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function deleteService(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    await revalidateServices();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function reorderServices(orderedIds: string[]): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    for (let i = 0; i < orderedIds.length; i++) {
      const { error } = await supabase
        .from("services")
        .update({ sort_order: i, updated_at: new Date().toISOString() })
        .eq("id", orderedIds[i]);
      if (error) return { ok: false, error: error.message };
    }
    await revalidateServices();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Reorder failed" };
  }
}

export async function toggleServiceFeatured(id: string, isFeatured: boolean): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const { error } = await supabase
      .from("services")
      .update({ is_featured: isFeatured, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    await revalidateServices();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Update failed" };
  }
}
