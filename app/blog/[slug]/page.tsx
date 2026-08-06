import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { createMetadata } from "@/lib/seo";
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/cms/blog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GalaxyStack } from "@/components/shared/scroll-stack-card";
import { ScrollStackCard } from "@/components/shared/scroll-stack-card";
import { ServicesCtaSection } from "@/sections/services/services-cta-section";

export const revalidate = 300;

function pickIllustration(category: string) {
  const key = category.toLowerCase();
  if (key.includes("security"))
    return "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=80";
  if (key.includes("compliance"))
    return "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1600&q=80";
  if (key.includes("cloud"))
    return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80";
  if (key.includes("design"))
    return "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1600&q=80";
  if (key.includes("delivery"))
    return "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80";
  if (key.includes("ai"))
    return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80";
  return "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80";
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return createMetadata({ title: "Blog", description: "Blog", path: "/blog" });

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const illustration = pickIllustration(post.category);

  return (
    <>
    <GalaxyStack stagger={0}>
    <article className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Button asChild variant="ghost" className="h-10 px-3">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <ScrollStackCard className="rounded-3xl p-4 md:p-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="relative h-64 w-full sm:h-72 lg:h-80">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </div>

          <div className="px-4 py-6 sm:px-6 sm:py-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="accent">{post.category}</Badge>
              <span className="text-sm font-semibold text-slate-300">{post.readTime}</span>
              <span className="text-sm text-slate-300">{post.date}</span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 max-w-3xl text-slate-300">{post.excerpt}</p>

            <div className="mt-6 text-sm text-slate-300">
              By <span className="font-semibold text-white">{post.author.name}</span> • {post.author.role}
            </div>
          </div>
        </ScrollStackCard>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="glass rounded-3xl p-6 md:p-8">
              <div className="prose prose-invert max-w-none">
                <p className="lead">
                  {post.excerpt} Below is a practical, step-by-step guide you can adapt for your team—focused on clear
                  decisions, measurable outcomes, and implementation details.
                </p>

                <h2>Why this matters in 2026</h2>
                <p>
                  Most enterprise programs fail for boring reasons: unclear ownership, ambiguous “done” definitions,
                  missing guardrails, and a feedback loop that’s too slow to correct course. In 2026, the bar is higher:
                  leaders expect faster delivery <em>and</em> stronger security, cost discipline, and auditability.
                </p>
                <p>
                  The goal isn’t to add process. The goal is to create a system that makes the right thing the easy
                  thing: consistent decisions, predictable delivery, and fewer surprises late in the cycle.
                </p>

                <h2>What “good” looks like</h2>
                <ul>
                  <li>
                    <strong>Clear outcomes</strong> tied to business value (revenue, cycle time, risk reduction, cost).
                  </li>
                  <li>
                    <strong>Stable guardrails</strong> (security, compliance, platform standards) that teams can self-serve.
                  </li>
                  <li>
                    <strong>Fast feedback</strong> through demos, dashboards, and operational signals.
                  </li>
                  <li>
                    <strong>Traceability</strong>: decisions, changes, and evidence are captured as part of delivery.
                  </li>
                </ul>

                <div className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <div className="relative h-64 w-full">
                    <Image src={illustration} alt="Illustration" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
                  </div>
                </div>

                <h2>A practical framework you can copy</h2>
                <p>
                  Use this structure to keep teams aligned without creating paperwork. Each section can be a single page
                  in your wiki or a template in your project tool.
                </p>
                <ol>
                  <li>
                    <strong>Scope</strong>: What’s in, what’s out, and what is explicitly deferred.
                  </li>
                  <li>
                    <strong>Risks</strong>: Top 3 risks and the mitigation plan (owner + due date).
                  </li>
                  <li>
                    <strong>Quality bar</strong>: Non-negotiables (SLOs, security controls, testing requirements).
                  </li>
                  <li>
                    <strong>Measures</strong>: Leading indicators (weekly) and outcome metrics (monthly/quarterly).
                  </li>
                </ol>

                <h2>Implementation checklist</h2>
                <ul>
                  <li>Define one measurable outcome per initiative (avoid “improve X” with no baseline).</li>
                  <li>Establish a “golden path” for new services (templates, CI, observability, security defaults).</li>
                  <li>Instrument what matters: request/queue latency, error rate, adoption, cost-to-serve.</li>
                  <li>Set up a weekly review cadence: demo + metrics + risks + decisions.</li>
                  <li>Write evidence as you go (tickets, runbooks, test results, approvals) so audits are cheap.</li>
                </ul>

                <h2>Common mistakes (and quick fixes)</h2>
                <p>
                  The fastest way to lose trust is to ship “busy” work: lots of activity, little visible progress. If
                  stakeholders can’t tell what changed, they assume nothing changed.
                </p>
                <ul>
                  <li>
                    <strong>Too many priorities</strong> → limit WIP; make trade-offs explicit.
                  </li>
                  <li>
                    <strong>Late security</strong> → bake controls into CI and platform defaults.
                  </li>
                  <li>
                    <strong>Unowned decisions</strong> → assign a DRI and document decision logs.
                  </li>
                  <li>
                    <strong>Invisible progress</strong> → demo real flows; show metrics that moved.
                  </li>
                </ul>

                <h2>A 30–60–90 day plan</h2>
                <p>Here’s a realistic rollout that doesn’t require a “big bang” reorg.</p>
                <ul>
                  <li>
                    <strong>30 days</strong>: baseline metrics, define the quality bar, start weekly demos.
                  </li>
                  <li>
                    <strong>60 days</strong>: introduce a golden path, standardize observability and authZ.
                  </li>
                  <li>
                    <strong>90 days</strong>: expand to more teams, automate evidence collection, formalize scorecards.
                  </li>
                </ul>

                <h2>Key takeaways</h2>
                <ul>
                  <li>Make progress visible weekly.</li>
                  <li>Turn guardrails into defaults.</li>
                  <li>Measure outcomes, not activity.</li>
                  <li>Capture evidence continuously.</li>
                </ul>

                <h2>Want help applying this?</h2>
                <p>
                  If you want, we can turn this into a tailored delivery plan: priorities, metrics, guardrails, and a
                  rollout path that fits your org and constraints.
                </p>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="glass sticky top-24 rounded-3xl p-6">
              <div className="text-sm font-bold text-white">Tags</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                    {t}
                  </span>
                ))}
              </div>
              <div className="glass mt-6 rounded-2xl p-4">
                <div className="text-sm font-bold text-cyan-200">Need help?</div>
                <p className="mt-2 text-sm text-slate-300">We can help you plan, design, and deliver the right solution.</p>
                <a
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 underline-offset-4 hover:underline"
                >
                  Schedule consultation
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
    </GalaxyStack>
    <ServicesCtaSection />
    </>
  );
}

