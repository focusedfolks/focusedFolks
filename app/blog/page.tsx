import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { getPublishedBlogPosts } from "@/lib/cms/blog";
import { BlogPageClient } from "@/sections/blog/blog-page-client";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Blog",
    description:
      "Read enterprise insights on digital transformation, AI integration, cloud migration, design systems, DevOps culture, and enterprise engineering best practices.",
    keywords: ["enterprise blog", "digital transformation", "AI integration", "cloud migration", "DevOps culture", "design systems"],
    path: "/blog",
  });
}

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  return <BlogPageClient posts={posts} />;
}
