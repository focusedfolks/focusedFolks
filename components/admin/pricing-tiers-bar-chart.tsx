"use client";

import type { PricingCategoryBar } from "@/lib/cms/dashboard";

type Props = {
  data: PricingCategoryBar[];
};

export function PricingTiersBarChart({ data }: Props) {
  if (!data.length) {
    return (
      <div className="admin-chart-empty">
        <p>No pricing data yet</p>
        <span>Seed categories and tiers to see the chart.</span>
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.tierCount), 0);
  const chartMax = Math.max(max, 1);

  return (
    <div className="admin-bar-chart" role="img" aria-label="Pricing tiers by category">
      <div className="admin-bar-chart-plot">
        {data.map((item) => {
          const heightPct = (item.tierCount / chartMax) * 100;
          return (
            <div key={item.slug} className="admin-bar-col">
              <div className="admin-bar-value">{item.tierCount}</div>
              <div className="admin-bar-track">
                <div
                  className="admin-bar-fill"
                  style={{ height: `${heightPct}%` }}
                  title={`${item.name}: ${item.tierCount}`}
                />
              </div>
              <div className="admin-bar-label" title={item.name}>
                {shortLabel(item.name)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function shortLabel(name: string): string {
  const map: Record<string, string> = {
    "Website Development": "Web",
    "Custom Software Development": "Software",
    "Mobile & E-Commerce": "Ecom",
    "UI/UX Design Services": "UI/UX",
    "Cloud & Infrastructure": "Cloud",
    "DevOps & Deployment": "DevOps",
    "AI Development & Solutions": "AI",
    "Staff Augmentation": "Staff",
    "IT Consulting": "Consult",
    "Digital Transformation": "Digital",
  };
  return map[name] ?? (name.length > 10 ? `${name.slice(0, 9)}…` : name);
}
