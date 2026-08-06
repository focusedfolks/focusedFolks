import {
  aboutCapabilityAreas,
  companyTimeline,
  companyValues,
  teamMembers as fallbackTeamMembers,
} from "@/constants/content";
import type { TeamMember } from "@/types";
import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createPublicClient } from "@/lib/supabase/public";
import type { DbTeamMember } from "@/lib/cms/homepage";

export type AboutValue = {
  title: string;
  description: string;
  icon: string;
};

export type AboutTimelineItem = {
  year: string;
  title: string;
  description: string;
};

export type AboutCapability = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  icon: string;
  href: string;
  highlights: string[];
};

export type AboutSettings = {
  values: AboutValue[];
  timeline: AboutTimelineItem[];
  capabilities: AboutCapability[];
};

export type AboutContent = {
  team: TeamMember[];
  values: AboutValue[];
  timeline: AboutTimelineItem[];
  capabilities: AboutCapability[];
};

function mapTeamMember(row: DbTeamMember): TeamMember {
  return {
    id: row.slug || row.id,
    name: row.name,
    role: row.role,
    bio: row.bio ?? "",
    image: row.photo_url || "/images/team-1.jpeg",
    ...(row.linkedin ? { linkedin: row.linkedin } : {}),
  };
}

function isAboutSettings(value: unknown): value is AboutSettings {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return Array.isArray(v.values) || Array.isArray(v.timeline) || Array.isArray(v.capabilities);
}

function normalizeCapabilities(raw: unknown[]): AboutCapability[] {
  return raw
    .map((item, i) => {
      if (!item || typeof item !== "object") return null;
      const c = item as Record<string, unknown>;
      const id = typeof c.id === "string" ? c.id : `capability-${i}`;
      const title = typeof c.title === "string" ? c.title : "";
      if (!title) return null;
      return {
        id,
        title,
        tagline: typeof c.tagline === "string" ? c.tagline : "",
        description: typeof c.description === "string" ? c.description : "",
        image: typeof c.image === "string" ? c.image : "/images/about-us-thumb-1.jpeg",
        icon: typeof c.icon === "string" ? c.icon : "Rocket",
        href: typeof c.href === "string" ? c.href : "/products",
        highlights: Array.isArray(c.highlights)
          ? c.highlights.filter((h): h is string => typeof h === "string")
          : [],
      };
    })
    .filter((c): c is AboutCapability => c !== null);
}

function fallbackAbout(): AboutContent {
  return {
    team: fallbackTeamMembers,
    values: companyValues.map((v) => ({ ...v })),
    timeline: companyTimeline.map((t) => ({ ...t })),
    capabilities: aboutCapabilityAreas.map((c) => ({
      id: c.id,
      title: c.title,
      tagline: c.tagline,
      description: c.description,
      image: c.image,
      icon: c.icon,
      href: c.href,
      highlights: [...c.highlights],
    })),
  };
}

/**
 * Load about page content from team_members + site_settings.about;
 * falls back to hardcoded constants so the site never blanks.
 * Reuses the same team_members table as the homepage (no duplicate table).
 */
export async function getAboutContent(): Promise<AboutContent> {
  const fallback = fallbackAbout();
  if (!isSupabaseConfigured()) return fallback;

  try {
    const supabase = createPublicClient();
    const [{ data: teamRows, error: teamErr }, { data: settingsRow, error: settingsErr }] =
      await Promise.all([
        supabase.from("team_members").select("*").order("sort_order"),
        supabase.from("site_settings").select("value").eq("key", "about").maybeSingle(),
      ]);

    if (teamErr || settingsErr) {
      console.warn("[cms] about fetch partial failure — using fallbacks where empty", {
        teamErr,
        settingsErr,
      });
    }

    const team =
      teamRows && teamRows.length > 0
        ? (teamRows as DbTeamMember[]).map(mapTeamMember)
        : fallback.team;

    let values = fallback.values;
    let timeline = fallback.timeline;
    let capabilities = fallback.capabilities;

    const raw = settingsRow?.value;
    if (isAboutSettings(raw)) {
      if (Array.isArray(raw.values) && raw.values.length > 0) {
        values = raw.values
          .filter((v) => v && typeof v.title === "string")
          .map((v) => ({
            title: v.title,
            description: typeof v.description === "string" ? v.description : "",
            icon: typeof v.icon === "string" ? v.icon : "Star",
          }));
      }
      if (Array.isArray(raw.timeline) && raw.timeline.length > 0) {
        timeline = raw.timeline
          .filter((t) => t && typeof t.year === "string")
          .map((t) => ({
            year: t.year,
            title: typeof t.title === "string" ? t.title : "",
            description: typeof t.description === "string" ? t.description : "",
          }));
      }
      if (Array.isArray(raw.capabilities) && raw.capabilities.length > 0) {
        const mapped = normalizeCapabilities(raw.capabilities as unknown[]);
        if (mapped.length > 0) capabilities = mapped;
      }
    }

    return { team, values, timeline, capabilities };
  } catch (err) {
    console.warn("[cms] about fetch error — using hardcoded fallback", err);
    return fallback;
  }
}
