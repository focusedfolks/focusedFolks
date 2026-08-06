"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeIndianRupee,
  BookOpen,
  Layers,
  Users,
} from "lucide-react";
import { useAdminUi } from "@/components/admin/admin-ui-context";
import { PricingTiersBarChart } from "@/components/admin/pricing-tiers-bar-chart";
import type { DashboardMetrics } from "@/lib/cms/dashboard";

type Props = {
  metrics: DashboardMetrics;
  welcomeName: string;
};

export function AdminDashboardClient({ metrics, welcomeName }: Props) {
  const { search } = useAdminUi();
  const q = search.trim().toLowerCase();
  const filtered = metrics.sections.filter((s) => {
    if (!q) return true;
    return (
      s.title.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.status.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="admin-header-row">
        <div>
          <h1 className="admin-page-title">Welcome back, {welcomeName}</h1>
          <p className="admin-page-sub">Here&apos;s what&apos;s live across focusedfolks.in</p>
        </div>
        <Link href="/admin/pricing" className="admin-btn-primary">
          + New pricing tier
        </Link>
      </div>

      <div className="admin-stat-grid">
        <StatCard
          icon={<BadgeIndianRupee className="h-4 w-4" />}
          tone="blue"
          value={metrics.pricingTierCount}
          label="Pricing tiers"
          caption={`${metrics.categoriesWithTiers} categories with tiers`}
        />
        <StatCard
          icon={<BookOpen className="h-4 w-4" />}
          tone="violet"
          value={metrics.publishedBlogs}
          label="Published blogs"
          caption="blog_posts where published"
        />
        <StatCard
          icon={<Users className="h-4 w-4" />}
          tone="teal"
          value={metrics.teamMembers}
          label="Team members"
          caption="Rows in team_members"
        />
        <StatCard
          icon={<Layers className="h-4 w-4" />}
          tone="amber"
          value={`${metrics.sectionsLive}/${metrics.sectionsTotal}`}
          label="Sections live"
          caption="Public pages fetching Supabase"
          accentValue
        />
      </div>

      <div className="admin-dash-split">
        <section className="admin-panel">
          <div className="admin-panel-head">
            <h2 className="admin-panel-title">Pricing tiers by category</h2>
          </div>
          <PricingTiersBarChart data={metrics.chart} />
        </section>

        <section className="admin-panel">
          <div className="admin-panel-head">
            <h2 className="admin-panel-title">Quick actions</h2>
          </div>
          <ul className="admin-quick-list">
            <QuickAction href="/admin/pricing" label="Add pricing tier" />
            <QuickAction href="/admin/homepage" label="Edit homepage hero" />
            <QuickAction href="/admin/blog" label="Write blog post" />
            <QuickAction href="/admin#all-sections" label="View all sections" />
          </ul>
        </section>
      </div>

      <section className="admin-panel mt-4" id="all-sections">
        <div className="admin-panel-head">
          <h2 className="admin-panel-title">All sections</h2>
          <span className="admin-muted text-xs">
            {filtered.length} of {metrics.sections.length}
          </span>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Section</th>
                <th>Covers</th>
                <th>Items</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td>
                    <Link href={row.href} className="admin-table-link">
                      {row.title}
                    </Link>
                  </td>
                  <td>{row.desc}</td>
                  <td>{row.itemCount === null ? "—" : row.itemCount}</td>
                  <td>
                    <span className={`admin-badge${row.status === "live" ? " admin-badge-live" : ""}`}>
                      {row.status === "live" ? "Live" : "Scaffold"}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="admin-table-empty">
                    No sections match “{search}”.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  tone,
  value,
  label,
  caption,
  accentValue,
}: {
  icon: React.ReactNode;
  tone: "blue" | "violet" | "teal" | "amber";
  value: number | string;
  label: string;
  caption: string;
  accentValue?: boolean;
}) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-card-top">
        <span className={`admin-stat-icon tone-${tone}`} aria-hidden>
          {icon}
        </span>
      </div>
      <p className={`admin-stat-value${accentValue ? " admin-stat-value-accent" : ""}`}>{value}</p>
      <p className="admin-stat-label">{label}</p>
      <p className="admin-stat-caption">{caption}</p>
    </div>
  );
}

function QuickAction({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="admin-quick-link">
        <span>{label}</span>
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </li>
  );
}
