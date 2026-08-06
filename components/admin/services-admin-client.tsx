"use client";

import { useState, useTransition } from "react";
import {
  deleteService,
  reorderServices,
  toggleServiceFeatured,
  upsertService,
} from "@/app/admin/(dashboard)/services/actions";
import type { DbService } from "@/lib/cms/services";

export type ServiceRow = Pick<
  DbService,
  | "id"
  | "slug"
  | "title"
  | "tagline"
  | "description"
  | "hover_preview"
  | "icon"
  | "price_from_usd"
  | "is_featured"
  | "features"
  | "href"
>;

export function ServicesAdminClient({ services }: { services: ServiceRow[] }) {
  const [editing, setEditing] = useState<ServiceRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <div>
      <div className="admin-header-row">
        <div>
          <p className="admin-eyebrow">Live section</p>
          <h1 className="admin-page-title">Services</h1>
          <p className="admin-page-sub">
            Edit catalog cards, featured homepage picks, and sort order. Detail JSON (plans, FAQs,
            etc.) stays seeded — use this editor for listing fields.
          </p>
        </div>
        <button
          type="button"
          className="admin-btn-primary"
          onClick={() => {
            setCreating(true);
            setEditing(null);
          }}
        >
          + Add service
        </button>
      </div>

      {message && (
        <p className="mt-4 rounded-[10px] border border-[var(--admin-border)] bg-[var(--admin-surface-tint)] px-3 py-2 text-sm text-[var(--admin-text-primary)]">
          {message}
        </p>
      )}

      {(creating || editing) && (
        <ServiceForm
          initial={
            editing ?? {
              id: "",
              slug: "",
              title: "",
              tagline: "",
              description: "",
              hover_preview: "",
              icon: "Code2",
              price_from_usd: null,
              is_featured: false,
              features: [],
              href: "",
            }
          }
          pending={pending}
          onCancel={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSave={(payload) => {
            start(async () => {
              const res = await upsertService({
                id: editing?.id,
                slug: payload.slug,
                title: payload.title,
                tagline: payload.tagline ?? "",
                description: payload.description ?? "",
                hover_preview: payload.hover_preview ?? "",
                icon: payload.icon ?? "",
                price_from_usd: payload.price_from_usd,
                is_featured: payload.is_featured,
                features: payload.features,
                href: payload.href,
              });
              setMessage(res.ok ? "Saved" : res.error);
              if (res.ok) {
                setCreating(false);
                setEditing(null);
              }
            });
          }}
        />
      )}

      <ul className="mt-6 space-y-3">
        {services.map((s, index) => (
          <li key={s.id} className="admin-tier-card flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="admin-heading text-base font-medium">
                {s.title}
                {s.is_featured ? (
                  <span className="ml-2 text-xs font-medium text-[var(--admin-accent-text)]">
                    Featured
                  </span>
                ) : null}
              </h2>
              <p className="mt-1 text-sm text-[var(--admin-text-secondary)]">
                {s.tagline || s.hover_preview}
              </p>
              <p className="mt-1 text-xs text-[var(--admin-text-muted)]">
                {s.slug}
                {s.price_from_usd != null ? ` · from $${Number(s.price_from_usd).toLocaleString()}` : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={pending || index === 0}
                className="admin-btn-ghost"
                onClick={() => {
                  const ids = services.map((row) => row.id);
                  const next = [...ids];
                  [next[index - 1], next[index]] = [next[index], next[index - 1]];
                  start(async () => {
                    const res = await reorderServices(next);
                    setMessage(res.ok ? "Order updated" : res.error);
                  });
                }}
              >
                ↑
              </button>
              <button
                type="button"
                disabled={pending || index === services.length - 1}
                className="admin-btn-ghost"
                onClick={() => {
                  const ids = services.map((row) => row.id);
                  const next = [...ids];
                  [next[index + 1], next[index]] = [next[index], next[index + 1]];
                  start(async () => {
                    const res = await reorderServices(next);
                    setMessage(res.ok ? "Order updated" : res.error);
                  });
                }}
              >
                ↓
              </button>
              <button
                type="button"
                disabled={pending}
                className="admin-btn-ghost"
                onClick={() => {
                  start(async () => {
                    const res = await toggleServiceFeatured(s.id, !s.is_featured);
                    setMessage(res.ok ? (s.is_featured ? "Unfeatured" : "Featured") : res.error);
                  });
                }}
              >
                {s.is_featured ? "Unfeature" : "Feature"}
              </button>
              <button
                type="button"
                className="admin-btn-accent-outline"
                onClick={() => {
                  setEditing(s);
                  setCreating(false);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="admin-btn-danger-outline"
                onClick={() => {
                  if (!confirm(`Delete ${s.title}?`)) return;
                  start(async () => {
                    const res = await deleteService(s.id);
                    setMessage(res.ok ? "Deleted" : res.error);
                  });
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {services.length === 0 && (
          <li className="admin-muted">
            No services yet. Run <code>npm run seed:cms</code>
          </li>
        )}
      </ul>
    </div>
  );
}

function ServiceForm({
  initial,
  pending,
  onCancel,
  onSave,
}: {
  initial: ServiceRow;
  pending: boolean;
  onCancel: () => void;
  onSave: (p: Omit<ServiceRow, "id">) => void;
}) {
  const [slug, setSlug] = useState(initial.slug);
  const [title, setTitle] = useState(initial.title);
  const [tagline, setTagline] = useState(initial.tagline ?? "");
  const [description, setDescription] = useState(initial.description ?? "");
  const [hoverPreview, setHoverPreview] = useState(initial.hover_preview ?? "");
  const [icon, setIcon] = useState(initial.icon ?? "");
  const [priceFrom, setPriceFrom] = useState(
    initial.price_from_usd != null ? String(initial.price_from_usd) : ""
  );
  const [isFeatured, setIsFeatured] = useState(initial.is_featured);
  const [features, setFeatures] = useState((initial.features ?? []).join("\n"));
  const [href, setHref] = useState(initial.href ?? "");

  return (
    <form
      className="admin-tier-card mt-6 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        const parsed = priceFrom.trim() === "" ? null : Number(priceFrom);
        if (parsed != null && Number.isNaN(parsed)) return;
        onSave({
          slug,
          title,
          tagline,
          description,
          hover_preview: hoverPreview,
          icon,
          price_from_usd: parsed,
          is_featured: isFeatured,
          features: features
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean),
          href: href.trim() || null,
        });
      }}
    >
      <Field label="Slug" value={slug} onChange={setSlug} required />
      <Field label="Title" value={title} onChange={setTitle} required />
      <Field label="Tagline" value={tagline} onChange={setTagline} />
      <label className="admin-label">
        Description
        <textarea
          className="admin-input"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <Field label="Hover preview / mega summary" value={hoverPreview} onChange={setHoverPreview} />
      <Field label="Icon (Lucide name)" value={icon} onChange={setIcon} />
      <Field label="Price from (USD)" value={priceFrom} onChange={setPriceFrom} />
      <Field label="Link (href, optional)" value={href} onChange={setHref} />
      <label className="admin-label">
        Features (one per line)
        <textarea
          className="admin-input"
          rows={4}
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />
      </label>
      <label className="flex items-center gap-2 text-sm text-[var(--admin-text-primary)]">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        Featured on homepage
      </label>
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className="admin-btn-primary">
          Save
        </button>
        <button type="button" className="admin-btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="admin-label">
      {label}
      <input
        className="admin-input"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
