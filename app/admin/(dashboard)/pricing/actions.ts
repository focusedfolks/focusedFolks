"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ActionResult = { ok: true } | { ok: false; error: string };

async function requireAuthedClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return supabase;
}

export async function updatePricingTier(
  tierId: string,
  input: {
    title: string;
    badge: string;
    price_low: number;
    price_high: number;
    price_unit: string;
    scope: string;
    delivery: string;
    description: string;
    features: string[];
    is_most_popular: boolean;
  }
): Promise<ActionResult> {
  try {
    if (input.price_high < input.price_low) {
      return { ok: false, error: "High price must be ≥ low price" };
    }
    if (!input.title.trim()) {
      return { ok: false, error: "Title is required" };
    }

    const supabase = await requireAuthedClient();
    const { error } = await supabase
      .from("pricing_tiers")
      .update({
        title: input.title.trim(),
        badge: input.badge.trim() || null,
        price_low: input.price_low,
        price_high: input.price_high,
        price_unit: input.price_unit,
        scope: input.scope,
        delivery: input.delivery,
        description: input.description,
        features: input.features.filter(Boolean),
        is_most_popular: input.is_most_popular,
        updated_at: new Date().toISOString(),
      })
      .eq("id", tierId);

    if (error) return { ok: false, error: error.message };

    revalidatePath("/pricing");
    revalidatePath("/admin/pricing");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Save failed" };
  }
}

export async function reorderPricingTier(
  categoryId: string,
  orderedIds: string[]
): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    for (let i = 0; i < orderedIds.length; i++) {
      const { error } = await supabase
        .from("pricing_tiers")
        .update({ sort_order: i })
        .eq("id", orderedIds[i])
        .eq("category_id", categoryId);
      if (error) return { ok: false, error: error.message };
    }
    revalidatePath("/pricing");
    revalidatePath("/admin/pricing");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Reorder failed" };
  }
}

export async function deletePricingTier(tierId: string): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const { error } = await supabase.from("pricing_tiers").delete().eq("id", tierId);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/pricing");
    revalidatePath("/admin/pricing");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Delete failed" };
  }
}

export async function createPricingTier(
  categoryId: string,
  input: {
    slug: string;
    title: string;
    price_low: number;
    price_high: number;
    price_unit: string;
  }
): Promise<ActionResult> {
  try {
    if (input.price_high < input.price_low) {
      return { ok: false, error: "High price must be ≥ low price" };
    }
    const supabase = await requireAuthedClient();
    const { data: existing } = await supabase
      .from("pricing_tiers")
      .select("sort_order")
      .eq("category_id", categoryId)
      .order("sort_order", { ascending: false })
      .limit(1);

    const nextOrder = (existing?.[0]?.sort_order ?? -1) + 1;
    const { error } = await supabase.from("pricing_tiers").insert({
      category_id: categoryId,
      slug: input.slug.trim(),
      title: input.title.trim(),
      price_low: input.price_low,
      price_high: input.price_high,
      price_unit: input.price_unit,
      features: [],
      sort_order: nextOrder,
    });
    if (error) return { ok: false, error: error.message };
    revalidatePath("/pricing");
    revalidatePath("/admin/pricing");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Create failed" };
  }
}
