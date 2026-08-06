"use client";

import { useState, useTransition } from "react";
import { deleteProduct, upsertProduct } from "@/app/admin/(dashboard)/content-actions";

export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  thumbnail: string | null;
  status: "live" | "coming-soon";
  category: string | null;
  href: string | null;
  features: string[];
};

export function ProductsAdminClient({ products }: { products: ProductRow[] }) {
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <div>
      <div className="admin-header-row">
        <div>
          <p className="admin-eyebrow">Content</p>
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-sub">Manage live and coming-soon product cards.</p>
        </div>
        <button type="button" className="admin-btn-primary" onClick={() => { setCreating(true); setEditing(null); }}>
          + Add product
        </button>
      </div>
      {message && <p className="mt-4 admin-muted">{message}</p>}

      {(creating || editing) && (
        <ProductForm
          initial={
            editing ?? {
              id: "",
              slug: "",
              name: "",
              tagline: "",
              description: "",
              thumbnail: "",
              status: "coming-soon",
              category: "",
              href: "",
              features: [],
            }
          }
          pending={pending}
          onCancel={() => { setCreating(false); setEditing(null); }}
          onSave={(payload) => {
            start(async () => {
              const res = await upsertProduct({
                ...payload,
                id: editing?.id,
                tagline: payload.tagline ?? "",
                description: payload.description ?? "",
                thumbnail: payload.thumbnail ?? "",
                category: payload.category ?? "",
                href: payload.href ?? "",
              });
              setMessage(res.ok ? "Saved" : res.error);
              if (res.ok) { setCreating(false); setEditing(null); }
            });
          }}
        />
      )}

      <ul className="mt-6 space-y-3">
        {products.map((p) => (
          <li key={p.id} className="admin-tier-card flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="admin-heading text-base font-medium">{p.name}</h2>
              <p className="mt-1 text-sm text-[var(--admin-text-secondary)]">{p.tagline}</p>
              <span className={`admin-badge mt-2${p.status === "live" ? " admin-badge-live" : ""}`}>
                {p.status}
              </span>
            </div>
            <div className="flex gap-2">
              <button type="button" className="admin-btn-accent-outline" onClick={() => { setEditing(p); setCreating(false); }}>
                Edit
              </button>
              <button
                type="button"
                className="admin-btn-danger-outline"
                onClick={() => {
                  if (!confirm(`Delete ${p.name}?`)) return;
                  start(async () => {
                    const res = await deleteProduct(p.id);
                    setMessage(res.ok ? "Deleted" : res.error);
                  });
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {products.length === 0 && <li className="admin-muted">No products yet. Run npm run seed:cms</li>}
      </ul>
    </div>
  );
}

function ProductForm({
  initial,
  pending,
  onCancel,
  onSave,
}: {
  initial: ProductRow;
  pending: boolean;
  onCancel: () => void;
  onSave: (p: Omit<ProductRow, "id"> & { features: string[] }) => void;
}) {
  const [slug, setSlug] = useState(initial.slug);
  const [name, setName] = useState(initial.name);
  const [tagline, setTagline] = useState(initial.tagline ?? "");
  const [description, setDescription] = useState(initial.description ?? "");
  const [thumbnail, setThumbnail] = useState(initial.thumbnail ?? "");
  const [status, setStatus] = useState<"live" | "coming-soon">(initial.status);
  const [category, setCategory] = useState(initial.category ?? "");
  const [href, setHref] = useState(initial.href ?? "");
  const [features, setFeatures] = useState((initial.features ?? []).join("\n"));

  return (
    <form
      className="admin-tier-card mt-6 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          slug,
          name,
          tagline,
          description,
          thumbnail,
          status,
          category,
          href,
          features: features.split("\n").map((l) => l.trim()).filter(Boolean),
        });
      }}
    >
      <Field label="Slug" value={slug} onChange={setSlug} required />
      <Field label="Name" value={name} onChange={setName} required />
      <Field label="Tagline" value={tagline} onChange={setTagline} />
      <label className="admin-label">Description<textarea className="admin-input" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} /></label>
      <Field label="Thumbnail URL" value={thumbnail} onChange={setThumbnail} />
      <Field label="Category" value={category} onChange={setCategory} />
      <Field label="Link (href)" value={href} onChange={setHref} />
      <label className="admin-label">
        Status
        <select className="admin-input" value={status} onChange={(e) => setStatus(e.target.value as "live" | "coming-soon")}>
          <option value="live">live</option>
          <option value="coming-soon">coming-soon</option>
        </select>
      </label>
      <label className="admin-label">Features (one per line)<textarea className="admin-input" rows={4} value={features} onChange={(e) => setFeatures(e.target.value)} /></label>
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className="admin-btn-primary">Save</button>
        <button type="button" className="admin-btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, required }: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <label className="admin-label">
      {label}
      <input className="admin-input" required={required} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
