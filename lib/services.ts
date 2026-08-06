/**
 * Sync helpers over hardcoded constants — used as CMS fallbacks.
 * Public pages should prefer `lib/cms/services` (`getServices`, `getFeaturedServices`,
 * `getServicePageDataFromCms`) for live Supabase data with constant fallback.
 */
import { serviceHeroImages, services } from "@/constants/services";
import { serviceDetails } from "@/constants/service-details";
import type { Service, ServiceDetailContent } from "@/types";

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.id === slug);
}

export function getServiceDetail(slug: string): ServiceDetailContent | undefined {
  const detail = serviceDetails[slug];
  if (!detail) return undefined;
  const heroImage = serviceHeroImages[slug] ?? detail.heroImage;
  return heroImage === detail.heroImage ? detail : { ...detail, heroImage };
}

export function getServicePageData(slug: string) {
  const service = getServiceBySlug(slug);
  const detail = getServiceDetail(slug);
  if (!service || !detail) return null;
  return { service, detail };
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.id);
}
