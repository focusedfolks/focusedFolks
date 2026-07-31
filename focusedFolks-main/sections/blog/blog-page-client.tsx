"use client";

import { useEffect, useMemo, useState } from "react";
import { blogPosts, blogCategories } from "@/constants/content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { scrollRevealViewport } from "@/lib/animations";
import { ArrowRight, Search } from "lucide-react";
import { ServicesCtaSection } from "@/sections/services/services-cta-section";
import { GalaxyStack } from "@/components/shared/scroll-stack-card";
import { ScrollStackCard } from "@/components/shared/scroll-stack-card";
import { GalaxyGlass } from "@/components/shared/galaxy-glass";

const pageSize = 6;

export function BlogPageClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const featured = useMemo(() => blogPosts.find((p) => p.featured) ?? blogPosts[0], []);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    blogPosts.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s).slice(0, 10);
  }, []);

  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter((p) => {
      const matchesCategory = category === "All" ? true : p.category === category;
      const matchesQuery =
        !q || [p.title, p.excerpt, p.author.name].some((v) => v.toLowerCase().includes(q));
      const matchesTag = activeTag ? p.tags.includes(activeTag) : true;
      return matchesCategory && matchesQuery && matchesTag;
    });
  }, [category, query, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const pageNumbers = useMemo(() => {
    const maxButtons = 5;
    let start = Math.max(1, safePage - Math.floor(maxButtons / 2));
    const end = Math.min(totalPages, start + maxButtons - 1);
    start = Math.max(1, end - maxButtons + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [safePage, totalPages]);

  const pagePosts = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [query, category, activeTag]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    const t = window.setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => window.clearTimeout(t);
  }, [query, category, activeTag, page]);

  return (
    <>
      <GalaxyStack stagger={0}>
      <section className="pt-24 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                Blog
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Insights on digital transformation, AI, and enterprise delivery
              </h1>
              <p className="mt-4 text-slate-300">
                Practical strategy and engineering guidance—written for leaders and builders.
              </p>
            </div>

            <div className="w-full max-w-xl">
              <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
                <Search className="h-4 w-4 text-slate-300" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search posts…"
                  aria-label="Search blog posts"
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      </GalaxyStack>

      <GalaxyStack stagger={8}>
      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured */}
          <GalaxyGlass stagger={10} className="p-6 md:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3">
                  <Badge variant="accent">{featured.category}</Badge>
                  <span className="text-sm font-semibold text-slate-300">{featured.readTime}</span>
                </div>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-slate-300">{featured.excerpt}</p>
                <div className="mt-6">
                  <Button asChild size="lg">
                    <Link href={`/blog/${encodeURIComponent(featured.slug)}`}>
                      Read featured article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="glass relative overflow-hidden rounded-3xl p-3">
                  <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <Image src={featured.image} alt={featured.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-300">
                    <span>By {featured.author.name}</span>
                    <span>{featured.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </GalaxyGlass>

          {/* Filters */}
          <GalaxyGlass stagger={12} className="mt-10 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold text-white">Filters</div>
                <div className="mt-1 text-sm text-slate-300">Categories and tags.</div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                  setActiveTag(null);
                  toast.success("Filters cleared.");
                }}
              >
                Reset
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {blogCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={[
                    "rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
                    category === c
                      ? "border-blue-500/50 bg-gradient-to-r from-blue-500/20 to-cyan-500/10 text-white"
                      : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10",
                  ].join(" ")}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {allTags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveTag((cur) => (cur === t ? null : t))}
                  className={[
                    "rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
                    activeTag === t
                      ? "border-blue-500/50 bg-gradient-to-r from-blue-500/20 to-cyan-500/10 text-white"
                      : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10",
                  ].join(" ")}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-4 text-sm text-slate-300">
              Showing <span className="font-semibold text-white">{filtered.length}</span> results
            </div>
          </GalaxyGlass>

          {/* Blog grid (full width) */}
          <div className="mt-8">
            {loading ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="space-y-3">
                    <Skeleton className="h-44 w-full rounded-2xl" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {pagePosts.map((p) => (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={scrollRevealViewport}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="glass group overflow-hidden rounded-3xl"
                  >
                    <div className="relative h-44 w-full overflow-hidden border-b border-white/10 bg-white/5">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <Badge variant="accent">{p.category}</Badge>
                        <span className="text-xs font-semibold text-slate-300">{p.readTime}</span>
                      </div>
                      <h3 className="mt-3 text-base font-extrabold text-white leading-snug">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-300">{p.excerpt}</p>

                      <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
                        <span>{p.date}</span>
                        <span>
                          By <span className="font-semibold text-white">{p.author.name}</span>
                        </span>
                      </div>

                      <div className="mt-5">
                        <Button asChild size="sm" variant="ghost" className="h-9">
                          <Link href={`/blog/${encodeURIComponent(p.slug)}`}>
                            Read
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-slate-300">
                Page <span className="font-semibold text-white">{safePage}</span> of{" "}
                <span className="font-semibold text-white">{totalPages}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                >
                  Prev
                </Button>
                {pageNumbers.map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setPage(pageNum)}
                    className={[
                      "h-9 w-9 rounded-xl border text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
                      pageNum === safePage
                        ? "border-blue-500/50 bg-gradient-to-r from-blue-500/20 to-cyan-500/10 text-white"
                        : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10",
                    ].join(" ")}
                  >
                    {pageNum}
                  </button>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>
      </GalaxyStack>
      <ServicesCtaSection />
    </>
  );
}

