"use server";

import { requireAuthedClient, revalidateAdmin, type ActionResult } from "./actions-shared";

export async function upsertProduct(input: {
  id?: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  thumbnail: string;
  status: "live" | "coming-soon";
  category: string;
  href: string;
  features: string[];
}): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const row = {
      slug: input.slug.trim(),
      name: input.name.trim(),
      tagline: input.tagline,
      description: input.description,
      thumbnail: input.thumbnail,
      status: input.status,
      category: input.category,
      href: input.href || null,
      features: input.features.filter(Boolean),
    };
    const { error } = input.id
      ? await supabase.from("products").update(row).eq("id", input.id)
      : await supabase.from("products").insert(row);
    if (error) return { ok: false, error: error.message };
    await revalidateAdmin("/admin/products", "/products");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    await revalidateAdmin("/admin/products", "/products");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function upsertTeamMember(input: {
  id?: string;
  slug: string;
  name: string;
  role: string;
  trait: string;
  quote: string;
  bio: string;
  photo_url: string;
}): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const row = {
      slug: input.slug.trim(),
      name: input.name.trim(),
      role: input.role.trim(),
      trait: input.trait || null,
      quote: input.quote || null,
      bio: input.bio || null,
      photo_url: input.photo_url || null,
    };
    const { error } = input.id
      ? await supabase.from("team_members").update(row).eq("id", input.id)
      : await supabase.from("team_members").insert(row);
    if (error) return { ok: false, error: error.message };
    await revalidateAdmin("/admin/about", "/about", "/");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function deleteTeamMember(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    await revalidateAdmin("/admin/about", "/about", "/");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function saveContactSettings(value: {
  email: string;
  phones: { region: string; display: string; href: string }[];
  offices: {
    city: string;
    country: string;
    address: string;
    phone: string;
    phoneHref: string;
    email: string;
    mapQuery: string;
  }[];
}): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const { error } = await supabase.from("site_settings").upsert({
      key: "contact",
      value,
      updated_at: new Date().toISOString(),
    });
    if (error) return { ok: false, error: error.message };
    await revalidateAdmin("/admin/contact-settings", "/contact");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function saveAboutSettings(value: unknown): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const { error } = await supabase.from("site_settings").upsert({
      key: "about",
      value,
      updated_at: new Date().toISOString(),
    });
    if (error) return { ok: false, error: error.message };
    await revalidateAdmin("/admin/about", "/about");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function upsertFaq(input: {
  id?: string;
  page: "homepage" | "pricing" | "services" | "contact";
  question: string;
  answer: string;
}): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const row = {
      page: input.page,
      question: input.question.trim(),
      answer: input.answer.trim(),
    };
    const { error } = input.id
      ? await supabase.from("faqs").update(row).eq("id", input.id)
      : await supabase.from("faqs").insert(row);
    if (error) return { ok: false, error: error.message };
    await revalidateAdmin("/admin/faqs", "/", "/pricing", "/contact");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function deleteFaq(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    await revalidateAdmin("/admin/faqs", "/", "/pricing", "/contact");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function upsertBlogPost(input: {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  author: string;
  author_role: string;
  published: boolean;
}): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const row = {
      slug: input.slug.trim(),
      title: input.title.trim(),
      excerpt: input.excerpt,
      content: input.content || input.excerpt,
      cover_image: input.cover_image || null,
      category: input.category || null,
      author: input.author || null,
      author_role: input.author_role || null,
      published: input.published,
      published_at: input.published ? new Date().toISOString() : null,
    };
    const { error } = input.id
      ? await supabase.from("blog_posts").update(row).eq("id", input.id)
      : await supabase.from("blog_posts").insert(row);
    if (error) return { ok: false, error: error.message };
    await revalidateAdmin("/admin/blog", "/blog");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function deleteBlogPost(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAuthedClient();
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    await revalidateAdmin("/admin/blog", "/blog");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function saveHeroContent(input: {
  eyebrow: string;
  headline: string;
  headline_highlight: string;
  subheadline: string;
  cta_text: string;
  image_url: string;
}): Promise<ActionResult> {
  // Prefer homepage/actions.saveHeroContent — kept for any leftover imports.
  const { saveHeroContent: save } = await import("./homepage/actions");
  return save({ ...input, image_alt: "" });
}
