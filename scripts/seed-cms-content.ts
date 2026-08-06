/**
 * Seed non-pricing CMS content from existing constants into Supabase (DEV).
 *
 * Usage:
 *   npx tsx scripts/seed-cms-content.ts
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { products } from "../constants/products";
import {
  CONTACT_EMAIL,
  contactPhones,
  officeLocations,
  contactFaqs,
} from "../constants/contact";
import {
  heroBannerSlides,
  homeHighlightStats,
  homeTeamThoughts,
  teamMembers,
  companyTimeline,
  companyValues,
  aboutCapabilityAreas,
  homeFaqs,
  pricingFaqs,
  servicesFaqs,
  blogPosts,
} from "../constants/content";
import {
  services,
  serviceHeroImages,
  whyChooseUs,
  processSteps,
  processStepImages,
  industries,
} from "../constants/services";
import { serviceDetails } from "../constants/service-details";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

async function clear(supabase: ReturnType<typeof createClient>, table: string) {
  const { error } = await supabase.from(table).delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (error && !error.message.includes("null value")) {
    // site_settings uses text PK — handle separately
    console.warn(`  clear ${table}:`, error.message);
  }
}

async function main() {
  const supabase = createClient(requireEnv("NEXT_PUBLIC_SUPABASE_URL"), requireEnv("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  console.log("Seeding CMS content…");

  // ---- Products ----
  await supabase.from("products").delete().neq("slug", "__never__");
  {
    const rows = products.map((p, i) => ({
      slug: p.id,
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      thumbnail: p.thumbnail,
      status: p.status,
      category: p.category,
      href: p.href ?? null,
      features: p.features,
      sort_order: i,
    }));
    const { error } = await supabase.from("products").insert(rows);
    if (error) throw new Error(`products: ${error.message}`);
    console.log(`  ✓ products (${rows.length})`);
  }

  // ---- Team (homepage thoughts + about bios merged by name) ----
  await supabase.from("team_members").delete().neq("slug", "__never__");
  {
    const aboutByName = new Map(teamMembers.map((m) => [m.name, m]));
    const rows = homeTeamThoughts.map((t, i) => {
      const about = aboutByName.get(t.name);
      return {
        slug: t.id,
        name: t.name,
        role: t.role,
        trait: t.theme,
        quote: t.quote,
        bio: about?.bio ?? null,
        photo_url: t.image,
        linkedin: about && "linkedin" in about ? (about as { linkedin?: string }).linkedin ?? null : null,
        sort_order: i,
      };
    });
    // Add about-only members not in home thoughts
    for (const m of teamMembers) {
      if (!rows.some((r) => r.name === m.name)) {
        rows.push({
          slug: m.id,
          name: m.name ?? "Team",
          role: m.role,
          trait: "",
          quote: "",
          bio: m.bio,
          photo_url: m.image,
          linkedin: m.linkedin ?? null,
          sort_order: rows.length,
        });
      }
    }
    const { error } = await supabase.from("team_members").insert(rows);
    if (error) throw new Error(`team_members: ${error.message}`);
    console.log(`  ✓ team_members (${rows.length})`);
  }

  // ---- Homepage blocks ----
  await supabase.from("value_props").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("process_steps").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("industries").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("stats").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  {
    const slide = heroBannerSlides[0];
    const { error } = await supabase.from("hero_content").upsert({
      id: 1,
      eyebrow: slide.tagline,
      headline: slide.title,
      headline_highlight: slide.titleHighlight,
      subheadline: slide.description,
      cta_text: "Get Started",
      image_url: slide.image,
      image_alt: slide.alt,
    });
    if (error) throw new Error(`hero_content: ${error.message}`);
    console.log("  ✓ hero_content");
  }

  {
    const rows = whyChooseUs.map((v, i) => ({
      title: v.title,
      description: v.description,
      icon: v.icon,
      bullets: v.highlights,
      sort_order: i,
    }));
    const { error } = await supabase.from("value_props").insert(rows);
    if (error) throw new Error(`value_props: ${error.message}`);
    console.log(`  ✓ value_props (${rows.length})`);
  }

  {
    const rows = processSteps.map((s, i) => ({
      step_number: i + 1,
      title: s.title,
      description: s.description,
      image_url: processStepImages[i] ?? null,
      sort_order: i,
    }));
    const { error } = await supabase.from("process_steps").insert(rows);
    if (error) throw new Error(`process_steps: ${error.message}`);
    console.log(`  ✓ process_steps (${rows.length})`);
  }

  {
    const rows = industries.map((ind, i) => ({
      name: ind.name,
      description: ind.description,
      icon: ind.icon,
      image_url: ind.image,
      sort_order: i,
    }));
    const { error } = await supabase.from("industries").insert(rows);
    if (error) throw new Error(`industries: ${error.message}`);
    console.log(`  ✓ industries (${rows.length})`);
  }

  {
    const rows = homeHighlightStats.map((s, i) => ({
      label: s.label,
      value: String(s.value),
      suffix: s.suffix,
      sort_order: i,
    }));
    const { error } = await supabase.from("stats").insert(rows);
    if (error) throw new Error(`stats: ${error.message}`);
    console.log(`  ✓ stats (${rows.length})`);
  }

  // ---- Services ----
  await supabase.from("services").delete().neq("slug", "__never__");
  {
    const featuredIds = new Set(["custom-software", "web-development", "design"]);
    const rows = services.map((s, i) => {
      const detail = serviceDetails[s.id];
      const firstPriced = detail?.plans?.find((p) => p.priceFromUsd != null && p.priceFromUsd !== undefined);
      return {
        slug: s.id,
        title: s.title,
        tagline: detail?.tagline ?? null,
        description: s.description,
        hover_preview: s.megaSummary ?? null,
        mega_summary: s.megaSummary ?? null,
        price_from_usd: firstPriced?.priceFromUsd ?? null,
        icon: s.icon,
        href: s.href,
        features: s.features ?? [],
        hero_image: serviceHeroImages[s.id] ?? detail?.heroImage ?? null,
        is_featured: featuredIds.has(s.id),
        sort_order: i,
        detail: detail ?? {},
      };
    });
    const { error } = await supabase.from("services").insert(rows);
    if (error) throw new Error(`services: ${error.message}`);
    console.log(`  ✓ services (${rows.length})`);
  }

  // ---- FAQs ----
  await supabase.from("faqs").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  {
    const rows = [
      ...homeFaqs.map((f, i) => ({
        page: "homepage" as const,
        question: f.question,
        answer: f.answer,
        sort_order: i,
      })),
      ...pricingFaqs.map((f, i) => ({
        page: "pricing" as const,
        question: f.question,
        answer: f.answer,
        sort_order: i,
      })),
      ...servicesFaqs.map((f, i) => ({
        page: "services" as const,
        question: f.question,
        answer: f.answer,
        sort_order: i,
      })),
      ...contactFaqs.map((f, i) => ({
        page: "contact" as const,
        question: f.question,
        answer: f.answer,
        sort_order: i,
      })),
    ];
    const { error } = await supabase.from("faqs").insert(rows);
    if (error) throw new Error(`faqs: ${error.message}`);
    console.log(`  ✓ faqs (${rows.length})`);
  }

  // ---- Blog ----
  await supabase.from("blog_posts").delete().neq("slug", "__never__");
  {
    const rows = blogPosts.map((p) => {
      const publishedAt = p.date ? new Date(p.date) : null;
      return {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.excerpt,
        cover_image: p.image,
        category: p.category,
        author: p.author.name,
        author_role: p.author.role,
        read_time: p.readTime,
        tags: p.tags ?? [],
        featured: Boolean(p.featured),
        published: true,
        published_at: publishedAt && !Number.isNaN(publishedAt.getTime()) ? publishedAt.toISOString() : new Date().toISOString(),
      };
    });
    const { error } = await supabase.from("blog_posts").insert(rows);
    if (error) throw new Error(`blog_posts: ${error.message}`);
    console.log(`  ✓ blog_posts (${rows.length})`);
  }

  // ---- Site settings: contact + about ----
  {
    const contact = {
      email: CONTACT_EMAIL,
      phones: contactPhones.map((p) => ({ ...p })),
      offices: officeLocations.map((o) => ({ ...o })),
    };
    const about = {
      values: companyValues,
      timeline: companyTimeline,
      capabilities: aboutCapabilityAreas,
    };
    const { error } = await supabase.from("site_settings").upsert([
      { key: "contact", value: contact, updated_at: new Date().toISOString() },
      { key: "about", value: about, updated_at: new Date().toISOString() },
    ]);
    if (error) throw new Error(`site_settings: ${error.message}`);
    console.log("  ✓ site_settings (contact, about)");
  }

  console.log("Done. CMS content seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
