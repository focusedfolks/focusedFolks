"use client";

import { useMemo, useState, useTransition } from "react";
import type { DbPricingAddon, DbPricingCategory, DbPricingTier } from "@/lib/cms/pricing";
import {
  createPricingTier,
  deletePricingTier,
  reorderPricingTier,
  updatePricingTier,
} from "@/app/admin/(dashboard)/pricing/actions";

type Props = {
  categories: DbPricingCategory[];
  tiers: DbPricingTier[];
  addons: DbPricingAddon[];
};

const UNIT_OPTIONS = [
  { value: "", label: "One-time (none)" },
  { value: "/month", label: "/month" },
  { value: "/hr", label: "/hr" },
];

export function PricingAdminClient({ categories, tiers, addons }: Props) {
  const [selectedSlug, setSelectedSlug] = useState(categories[0]?.slug ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [openAdd, setOpenAdd] = useState(false);

  const category = categories.find((c) => c.slug === selectedSlug) ?? categories[0];
  const categoryTiers = useMemo(
    () => (category ? tiers.filter((t) => t.category_id === category.id) : []),
    [category, tiers]
  );
  const categoryAddons = useMemo(
    () => (category ? addons.filter((a) => a.category_id === category.id) : []),
    [category, addons]
  );

  const [editingId, setEditingId] = useState<string | null>(null);

  if (!category) {
    return (
      <p className="admin-muted">
        No pricing categories in the database yet. Run <code>npm run seed:pricing</code>.
      </p>
    );
  }

  return (
    <div>
      <div className="admin-header-row">
        <div>
          <p className="admin-eyebrow">Live section</p>
          <h1 className="admin-page-title">Pricing</h1>
          <p className="admin-page-sub">
            Edit INR ranges (low / high). Currency symbols are formatted on the public site — do not
            type ₹ here.
          </p>
        </div>
        <button type="button" className="admin-btn-primary" onClick={() => setOpenAdd(true)}>
          + New pricing tier
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setSelectedSlug(c.slug);
              setEditingId(null);
              setMessage(null);
            }}
            className={`admin-chip${c.slug === category.slug ? " admin-chip-active" : ""}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <p className="mt-4 admin-muted">{category.description}</p>

      {message && (
        <p className="mt-4 rounded-[10px] border border-[var(--admin-border)] bg-[var(--admin-surface-tint)] px-3 py-2 text-sm text-[var(--admin-text-primary)]">
          {message}
        </p>
      )}

      <ul className="mt-6 space-y-3">
        {categoryTiers.map((tier, index) => {
          const isEditing = editingId === tier.id;
          return (
            <li key={tier.id} className="admin-tier-card">
              {!isEditing ? (
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="admin-heading text-base font-medium">
                      {tier.title}
                      {tier.is_most_popular ? (
                        <span className="ml-2 text-xs font-medium text-[var(--admin-accent-text)]">
                          Popular
                        </span>
                      ) : null}
                    </h2>
                    <p className="mt-1 text-sm text-[var(--admin-text-primary)]">
                      ₹{Number(tier.price_low).toLocaleString("en-IN")} – ₹
                      {Number(tier.price_high).toLocaleString("en-IN")}
                      {tier.price_unit}
                    </p>
                    <p className="mt-1 text-xs text-[var(--admin-text-muted)]">
                      {tier.scope} · {tier.delivery}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={pending || index === 0}
                      className="admin-btn-ghost"
                      onClick={() => {
                        const ids = categoryTiers.map((t) => t.id);
                        const next = [...ids];
                        [next[index - 1], next[index]] = [next[index], next[index - 1]];
                        startTransition(async () => {
                          const res = await reorderPricingTier(category.id, next);
                          setMessage(res.ok ? "Order updated" : res.error);
                        });
                      }}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      disabled={pending || index === categoryTiers.length - 1}
                      className="admin-btn-ghost"
                      onClick={() => {
                        const ids = categoryTiers.map((t) => t.id);
                        const next = [...ids];
                        [next[index + 1], next[index]] = [next[index], next[index + 1]];
                        startTransition(async () => {
                          const res = await reorderPricingTier(category.id, next);
                          setMessage(res.ok ? "Order updated" : res.error);
                        });
                      }}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="admin-btn-accent-outline"
                      onClick={() => setEditingId(tier.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-btn-danger-outline"
                      onClick={() => {
                        if (!confirm(`Delete “${tier.title}”?`)) return;
                        startTransition(async () => {
                          const res = await deletePricingTier(tier.id);
                          setMessage(res.ok ? "Deleted" : res.error);
                        });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <TierEditForm
                  tier={tier}
                  pending={pending}
                  onCancel={() => setEditingId(null)}
                  onSave={(payload) => {
                    startTransition(async () => {
                      const res = await updatePricingTier(tier.id, payload);
                      if (res.ok) {
                        setMessage("Saved — /pricing will refresh within cache window");
                        setEditingId(null);
                      } else {
                        setMessage(res.error);
                      }
                    });
                  }}
                />
              )}
            </li>
          );
        })}
      </ul>

      {openAdd ? (
        <AddTierForm
          pending={pending}
          onCancel={() => setOpenAdd(false)}
          onAdd={(payload) => {
            startTransition(async () => {
              const res = await createPricingTier(category.id, payload);
              setMessage(res.ok ? "Tier created" : res.error);
              if (res.ok) setOpenAdd(false);
            });
          }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setOpenAdd(true)}
          className="admin-btn-ghost mt-6 border-dashed px-4 py-3 text-sm"
        >
          + Add new tier
        </button>
      )}

      {categoryAddons.length > 0 && (
        <div className="mt-10">
          <h2 className="admin-heading text-lg font-medium">
            {category.addons_title ?? "Add-ons"}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--admin-text-secondary)]">
            {categoryAddons.map((a) => (
              <li key={a.id} className="admin-tier-card !py-2.5">
                {a.name} — ₹{Number(a.price_low).toLocaleString("en-IN")} – ₹
                {Number(a.price_high).toLocaleString("en-IN")}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-[var(--admin-text-muted)]">
            Addon editing UI can be extended next; values are already in Supabase.
          </p>
        </div>
      )}
    </div>
  );
}

function TierEditForm({
  tier,
  pending,
  onCancel,
  onSave,
}: {
  tier: DbPricingTier;
  pending: boolean;
  onCancel: () => void;
  onSave: (payload: {
    title: string;
    badge: string;
    price_low: number;
    price_high: number;
    price_unit: string;
    scope: string;
    delivery: string;
    description: string;
    features: string[];
    is_most_popular: boolean;
  }) => void;
}) {
  const [title, setTitle] = useState(tier.title);
  const [badge, setBadge] = useState(tier.badge ?? "");
  const [priceLow, setPriceLow] = useState(String(tier.price_low));
  const [priceHigh, setPriceHigh] = useState(String(tier.price_high));
  const [unit, setUnit] = useState(tier.price_unit ?? "");
  const [scope, setScope] = useState(tier.scope ?? "");
  const [delivery, setDelivery] = useState(tier.delivery ?? "");
  const [description, setDescription] = useState(tier.description ?? "");
  const [featuresText, setFeaturesText] = useState((tier.features ?? []).join("\n"));
  const [popular, setPopular] = useState(tier.is_most_popular);

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          title,
          badge,
          price_low: Number(priceLow),
          price_high: Number(priceHigh),
          price_unit: unit,
          scope,
          delivery,
          description,
          features: featuresText
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean),
          is_most_popular: popular,
        });
      }}
    >
      <Field label="Title" value={title} onChange={setTitle} required />
      <Field label="Badge" value={badge} onChange={setBadge} />
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Price low (INR)" value={priceLow} onChange={setPriceLow} type="number" required />
        <Field label="Price high (INR)" value={priceHigh} onChange={setPriceHigh} type="number" required />
        <label className="admin-label">
          Unit
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className="admin-input">
            {UNIT_OPTIONS.map((o) => (
              <option key={o.value || "none"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Field label="Scope" value={scope} onChange={setScope} />
      <Field label="Delivery" value={delivery} onChange={setDelivery} />
      <label className="admin-label">
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="admin-input"
        />
      </label>
      <label className="admin-label">
        Features (one per line)
        <textarea
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          rows={5}
          className="admin-input"
        />
      </label>
      <label className="flex items-center gap-2 text-sm text-[var(--admin-text-secondary)]">
        <input type="checkbox" checked={popular} onChange={(e) => setPopular(e.target.checked)} />
        Most popular
      </label>
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className="admin-btn-primary">
          Save
        </button>
        <button type="button" onClick={onCancel} className="admin-btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}

function AddTierForm({
  pending,
  onAdd,
  onCancel,
}: {
  pending: boolean;
  onCancel: () => void;
  onAdd: (payload: {
    slug: string;
    title: string;
    price_low: number;
    price_high: number;
    price_unit: string;
  }) => void;
}) {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [priceLow, setPriceLow] = useState("0");
  const [priceHigh, setPriceHigh] = useState("0");
  const [unit, setUnit] = useState("");

  return (
    <form
      className="admin-tier-card mt-6 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        onAdd({
          slug,
          title,
          price_low: Number(priceLow),
          price_high: Number(priceHigh),
          price_unit: unit,
        });
      }}
    >
      <h3 className="admin-heading font-medium">New tier</h3>
      <Field label="Slug (unique id)" value={slug} onChange={setSlug} required />
      <Field label="Title" value={title} onChange={setTitle} required />
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Price low" value={priceLow} onChange={setPriceLow} type="number" required />
        <Field label="Price high" value={priceHigh} onChange={setPriceHigh} type="number" required />
        <label className="admin-label">
          Unit
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className="admin-input">
            {UNIT_OPTIONS.map((o) => (
              <option key={o.value || "none"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className="admin-btn-primary">
          Create
        </button>
        <button type="button" onClick={onCancel} className="admin-btn-ghost">
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
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="admin-label">
      {label}
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="admin-input"
      />
    </label>
  );
}
