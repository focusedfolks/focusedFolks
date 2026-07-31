import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { blogPosts } from "@/constants/content";
import { getAllServiceSlugs } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceSitemap = getAllServiceSlugs().map((slug) => ({
    url: `${siteConfig.url}/services/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogSitemap = blogPosts.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: new Date(p.date).toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: `${siteConfig.url}/`, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${siteConfig.url}/services`, changeFrequency: "weekly" as const, priority: 0.9 },
    ...serviceSitemap,
    { url: `${siteConfig.url}/pricing`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly" as const, priority: 0.8 },
    ...blogSitemap,
  ];
}

