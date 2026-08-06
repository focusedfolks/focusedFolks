import {
  heroBannerSlides,
  homeHighlightStats,
  homeTeamThoughts,
} from "@/constants/content";
import {
  industries as fallbackIndustries,
  processStepImages,
  processSteps as fallbackProcessSteps,
  whyChooseUs,
} from "@/constants/services";
import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createPublicClient } from "@/lib/supabase/public";
import type { TeamThought } from "@/types";

export type HeroSlide = {
  image: string;
  alt: string;
  tagline: string;
  title: string;
  titleHighlight: string;
  description: string;
  ctaText?: string;
};

export type ValuePropItem = {
  title: string;
  description: string;
  icon: string;
  highlights: string[];
};

export type ProcessStepItem = {
  step: string;
  title: string;
  description: string;
  image: string;
};

export type IndustryItem = {
  name: string;
  icon: string;
  image: string;
  description: string;
};

export type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

export type HomepageContent = {
  slides: HeroSlide[];
  valueProps: ValuePropItem[];
  processSteps: ProcessStepItem[];
  teamThoughts: TeamThought[];
  industries: IndustryItem[];
  stats: StatItem[];
};

export type DbHeroContent = {
  id: number;
  eyebrow: string | null;
  headline: string | null;
  headline_highlight: string | null;
  subheadline: string | null;
  cta_text: string | null;
  image_url: string | null;
  image_alt: string | null;
};

export type DbValueProp = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  bullets: string[];
  sort_order: number;
};

export type DbProcessStep = {
  id: string;
  step_number: number;
  title: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
};

export type DbTeamMember = {
  id: string;
  slug: string | null;
  name: string;
  role: string;
  trait: string | null;
  quote: string | null;
  bio: string | null;
  photo_url: string | null;
  linkedin: string | null;
  sort_order: number;
};

export type DbIndustry = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  sort_order: number;
};

export type DbStat = {
  id: string;
  label: string;
  value: string;
  suffix: string;
  sort_order: number;
};

function fallbackHomepage(): HomepageContent {
  return {
    slides: heroBannerSlides.map((s) => ({
      image: s.image,
      alt: s.alt,
      tagline: s.tagline,
      title: s.title,
      titleHighlight: s.titleHighlight,
      description: s.description,
      ctaText: "Book Consultation",
    })),
    valueProps: whyChooseUs.map((v) => ({
      title: v.title,
      description: v.description,
      icon: v.icon,
      highlights: v.highlights,
    })),
    processSteps: fallbackProcessSteps.map((s, i) => ({
      step: s.step,
      title: s.title,
      description: s.description,
      image: processStepImages[i] ?? processStepImages[0],
    })),
    teamThoughts: homeTeamThoughts,
    industries: fallbackIndustries.map((ind) => ({
      name: ind.name,
      icon: ind.icon,
      image: ind.image,
      description: ind.description,
    })),
    stats: homeHighlightStats.map((s) => ({
      value: s.value,
      suffix: s.suffix,
      label: s.label,
    })),
  };
}

function padStep(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Load homepage blocks from Supabase when configured and populated;
 * otherwise fall back to hardcoded constants so the site never blanks.
 */
export async function getHomepageContent(): Promise<HomepageContent> {
  const fallback = fallbackHomepage();
  if (!isSupabaseConfigured()) return fallback;

  try {
    const supabase = createPublicClient();
    const [
      { data: hero, error: heroErr },
      { data: valueProps, error: vpErr },
      { data: processRows, error: procErr },
      { data: teamRows, error: teamErr },
      { data: industryRows, error: indErr },
      { data: statRows, error: statErr },
    ] = await Promise.all([
      supabase.from("hero_content").select("*").eq("id", 1).maybeSingle(),
      supabase.from("value_props").select("*").order("sort_order"),
      supabase.from("process_steps").select("*").order("sort_order"),
      supabase.from("team_members").select("*").order("sort_order"),
      supabase.from("industries").select("*").order("sort_order"),
      supabase.from("stats").select("*").order("sort_order"),
    ]);

    if (heroErr || vpErr || procErr || teamErr || indErr || statErr) {
      console.warn("[cms] homepage fetch partial failure — using fallbacks where empty", {
        heroErr,
        vpErr,
        procErr,
        teamErr,
        indErr,
        statErr,
      });
    }

    const slides: HeroSlide[] =
      hero && (hero as DbHeroContent).headline
        ? [
            {
              image: (hero as DbHeroContent).image_url || fallback.slides[0].image,
              alt: (hero as DbHeroContent).image_alt || "",
              tagline: (hero as DbHeroContent).eyebrow || "",
              title: (hero as DbHeroContent).headline || "",
              titleHighlight: (hero as DbHeroContent).headline_highlight || "",
              description: (hero as DbHeroContent).subheadline || "",
              ctaText: (hero as DbHeroContent).cta_text || "Book Consultation",
            },
          ]
        : fallback.slides;

    const mappedValueProps: ValuePropItem[] =
      valueProps && valueProps.length > 0
        ? (valueProps as DbValueProp[]).map((v) => ({
            title: v.title,
            description: v.description ?? "",
            icon: v.icon || "Award",
            highlights: v.bullets ?? [],
          }))
        : fallback.valueProps;

    const mappedProcess: ProcessStepItem[] =
      processRows && processRows.length > 0
        ? (processRows as DbProcessStep[]).map((s, i) => ({
            step: padStep(s.step_number || i + 1),
            title: s.title,
            description: s.description ?? "",
            image: s.image_url || processStepImages[i] || processStepImages[0],
          }))
        : fallback.processSteps;

    const withQuotes = ((teamRows ?? []) as DbTeamMember[]).filter(
      (m) => m.quote && m.quote.trim().length > 0
    );
    const mappedTeam: TeamThought[] =
      withQuotes.length > 0
        ? withQuotes.map((m) => ({
            id: m.slug || m.id,
            name: m.name,
            role: m.role,
            image: m.photo_url || "/images/team-1.jpeg",
            theme: m.trait || "Team",
            quote: m.quote || "",
          }))
        : fallback.teamThoughts;

    const mappedIndustries: IndustryItem[] =
      industryRows && industryRows.length > 0
        ? (industryRows as DbIndustry[]).map((ind) => ({
            name: ind.name,
            icon: ind.icon || "Building2",
            image: ind.image_url || "/images/industry/health-ind-1.png",
            description: ind.description ?? "",
          }))
        : fallback.industries;

    const mappedStats: StatItem[] =
      statRows && statRows.length > 0
        ? (statRows as DbStat[]).map((s) => ({
            value: Number.parseFloat(s.value) || 0,
            suffix: s.suffix ?? "",
            label: s.label,
          }))
        : fallback.stats;

    return {
      slides,
      valueProps: mappedValueProps,
      processSteps: mappedProcess,
      teamThoughts: mappedTeam,
      industries: mappedIndustries,
      stats: mappedStats,
    };
  } catch (err) {
    console.warn("[cms] homepage fetch error — using hardcoded fallback", err);
    return fallback;
  }
}
