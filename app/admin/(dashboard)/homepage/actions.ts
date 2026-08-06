"use server";

import { requireAuthedClient, revalidateAdmin, type ActionResult } from "../actions-shared";

async function revalidateHomepage() {
  await revalidateAdmin("/admin/homepage", "/");
}

export async function saveHeroContent(input: {
  eyebrow: string;
  headline: string;
  headline_highlight: string;
  subheadline: string;
  cta_text: string;
  image_url: string;
  image_alt: string;
}): Promise<ActionResult> {
  try {
    if (!input.headline.trim()) return { ok: false, error: "Headline is required" };
    const supabase = await requireAuthedClient();
    const { error } = await supabase.from("hero_content").upsert({
      id: 1,
      eyebrow: input.eyebrow.trim() || null,
      headline: input.headline.trim(),
      headline_highlight: input.headline_highlight.trim() || null,
      subheadline: input.subheadline.trim() || null,
      cta_text: input.cta_text.trim() || null,
      image_url: input.image_url.trim() || null,
      image_alt: input.image_alt.trim() || null,
    });
    if (error) return { ok: false, error: error.message };
    await revalidateHomepage();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function upsertValueProp(input: {
  id?: string;
  title: string;
  description: string;
  icon: string;
  bullets: string[];
}): Promise<ActionResult> {
  try {
    if (!input.title.trim()) return { ok: false, error: "Title is required" };
    const supabase = await requireAuthedClient();
    const row = {
      title: input.title.trim(),
      description: input.description,
      icon: input.icon || null,
      bullets: input.bullets.filter(Boolean),
    };
    if (input.id) {
      const { error } = await supabase.from("value_props").update(row).eq("id", input.id);
      if (error) return { ok: false, error: error.message };
    } else {
      const { data: existing } = await supabase
        .from("value_props")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1);
      const { error } = await supabase.from("value_props").insert({
        ...row,
        sort_order: (existing?.[0]?.sort_order ?? -1) + 1,
      });
      if (error) return { ok: false, error: error.message };
    }
    await revalidateHomepage();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function deleteValueProp(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const { error } = await supabase.from("value_props").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    await revalidateHomepage();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function upsertProcessStep(input: {
  id?: string;
  step_number: number;
  title: string;
  description: string;
  image_url: string;
}): Promise<ActionResult> {
  try {
    if (!input.title.trim()) return { ok: false, error: "Title is required" };
    const supabase = await requireAuthedClient();
    const row = {
      step_number: input.step_number,
      title: input.title.trim(),
      description: input.description,
      image_url: input.image_url || null,
    };
    if (input.id) {
      const { error } = await supabase.from("process_steps").update(row).eq("id", input.id);
      if (error) return { ok: false, error: error.message };
    } else {
      const { data: existing } = await supabase
        .from("process_steps")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1);
      const next = (existing?.[0]?.sort_order ?? -1) + 1;
      const { error } = await supabase.from("process_steps").insert({
        ...row,
        step_number: input.step_number || next + 1,
        sort_order: next,
      });
      if (error) return { ok: false, error: error.message };
    }
    await revalidateHomepage();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function deleteProcessStep(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const { error } = await supabase.from("process_steps").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    await revalidateHomepage();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function upsertHomepageTeamMember(input: {
  id?: string;
  slug: string;
  name: string;
  role: string;
  trait: string;
  quote: string;
  photo_url: string;
}): Promise<ActionResult> {
  try {
    if (!input.name.trim() || !input.role.trim()) {
      return { ok: false, error: "Name and role are required" };
    }
    const supabase = await requireAuthedClient();
    const row = {
      slug: input.slug.trim() || input.name.trim().toLowerCase().replace(/\s+/g, "-"),
      name: input.name.trim(),
      role: input.role.trim(),
      trait: input.trait || null,
      quote: input.quote || null,
      photo_url: input.photo_url || null,
    };
    if (input.id) {
      const { error } = await supabase.from("team_members").update(row).eq("id", input.id);
      if (error) return { ok: false, error: error.message };
    } else {
      const { data: existing } = await supabase
        .from("team_members")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1);
      const { error } = await supabase.from("team_members").insert({
        ...row,
        sort_order: (existing?.[0]?.sort_order ?? -1) + 1,
      });
      if (error) return { ok: false, error: error.message };
    }
    await revalidateAdmin("/admin/homepage", "/admin/about", "/", "/about");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function deleteHomepageTeamMember(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    await revalidateAdmin("/admin/homepage", "/admin/about", "/", "/about");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function upsertIndustry(input: {
  id?: string;
  name: string;
  description: string;
  icon: string;
  image_url: string;
}): Promise<ActionResult> {
  try {
    if (!input.name.trim()) return { ok: false, error: "Name is required" };
    const supabase = await requireAuthedClient();
    const row = {
      name: input.name.trim(),
      description: input.description,
      icon: input.icon || null,
      image_url: input.image_url || null,
    };
    if (input.id) {
      const { error } = await supabase.from("industries").update(row).eq("id", input.id);
      if (error) return { ok: false, error: error.message };
    } else {
      const { data: existing } = await supabase
        .from("industries")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1);
      const { error } = await supabase.from("industries").insert({
        ...row,
        sort_order: (existing?.[0]?.sort_order ?? -1) + 1,
      });
      if (error) return { ok: false, error: error.message };
    }
    await revalidateHomepage();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function deleteIndustry(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const { error } = await supabase.from("industries").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    await revalidateHomepage();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function upsertStat(input: {
  id?: string;
  label: string;
  value: string;
  suffix: string;
}): Promise<ActionResult> {
  try {
    if (!input.label.trim() || !input.value.trim()) {
      return { ok: false, error: "Label and value are required" };
    }
    const supabase = await requireAuthedClient();
    const row = {
      label: input.label.trim(),
      value: input.value.trim(),
      suffix: input.suffix,
    };
    if (input.id) {
      const { error } = await supabase.from("stats").update(row).eq("id", input.id);
      if (error) return { ok: false, error: error.message };
    } else {
      const { data: existing } = await supabase
        .from("stats")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1);
      const { error } = await supabase.from("stats").insert({
        ...row,
        sort_order: (existing?.[0]?.sort_order ?? -1) + 1,
      });
      if (error) return { ok: false, error: error.message };
    }
    await revalidateHomepage();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function deleteStat(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const { error } = await supabase.from("stats").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    await revalidateHomepage();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function reorderRows(
  table: "value_props" | "process_steps" | "team_members" | "industries" | "stats",
  orderedIds: string[]
): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    for (let i = 0; i < orderedIds.length; i++) {
      const { error } = await supabase.from(table).update({ sort_order: i }).eq("id", orderedIds[i]);
      if (error) return { ok: false, error: error.message };
    }
    if (table === "team_members") {
      await revalidateAdmin("/admin/homepage", "/admin/about", "/", "/about");
    } else {
      await revalidateHomepage();
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Reorder failed" };
  }
}
