import {
  CONTACT_EMAIL,
  contactPhones,
  officeLocations,
  type OfficeLocation,
} from "@/constants/contact";
import { isSupabaseConfigured } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";

export type ContactPhone = {
  region: string;
  display: string;
  href: string;
};

export type ContactInfo = {
  email: string;
  phones: ContactPhone[];
  offices: OfficeLocation[];
};

function fallbackContact(): ContactInfo {
  return {
    email: CONTACT_EMAIL,
    phones: contactPhones.map((p) => ({ ...p })),
    offices: officeLocations.map((o) => ({ ...o })),
  };
}

function isContactValue(value: unknown): value is {
  email?: unknown;
  phones?: unknown;
  offices?: unknown;
} {
  return Boolean(value) && typeof value === "object";
}

function normalizePhones(raw: unknown): ContactPhone[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((p) => {
      if (!p || typeof p !== "object") return null;
      const row = p as Record<string, unknown>;
      const region = typeof row.region === "string" ? row.region : "";
      const display = typeof row.display === "string" ? row.display : "";
      const href = typeof row.href === "string" ? row.href : "";
      if (!region && !display) return null;
      return { region, display, href };
    })
    .filter((p): p is ContactPhone => p !== null);
}

function normalizeOffices(raw: unknown, emailFallback: string): OfficeLocation[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((o) => {
      if (!o || typeof o !== "object") return null;
      const row = o as Record<string, unknown>;
      const city = typeof row.city === "string" ? row.city : "";
      if (!city) return null;
      return {
        city,
        country: typeof row.country === "string" ? row.country : "",
        address: typeof row.address === "string" ? row.address : "",
        phone: typeof row.phone === "string" ? row.phone : "",
        phoneHref: typeof row.phoneHref === "string" ? row.phoneHref : "",
        email: typeof row.email === "string" && row.email ? row.email : emailFallback,
        mapQuery: typeof row.mapQuery === "string" ? row.mapQuery : "",
      };
    })
    .filter((o): o is OfficeLocation => o !== null);
}

/**
 * Load contact email/phones/offices from site_settings.contact;
 * falls back to hardcoded constants so footer + contact page never blank.
 */
export async function getContactInfo(): Promise<ContactInfo> {
  const fallback = fallbackContact();
  if (!isSupabaseConfigured()) return fallback;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "contact")
      .maybeSingle();

    if (error || !data?.value || !isContactValue(data.value)) {
      if (error) console.warn("[cms] contact fetch failed — using fallback", error);
      return fallback;
    }

    const raw = data.value;
    const email =
      typeof raw.email === "string" && raw.email.trim() ? raw.email.trim() : fallback.email;
    const phones = normalizePhones(raw.phones);
    const offices = normalizeOffices(raw.offices, email);

    if (!phones.length && !offices.length && email === fallback.email) {
      return fallback;
    }

    return {
      email,
      phones: phones.length ? phones : fallback.phones,
      offices: offices.length ? offices : fallback.offices,
    };
  } catch (err) {
    console.warn("[cms] contact fetch error — using hardcoded fallback", err);
    return fallback;
  }
}
