"use client";

import { useState, useTransition } from "react";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import type {
  DbHeroContent,
  DbIndustry,
  DbProcessStep,
  DbStat,
  DbTeamMember,
  DbValueProp,
} from "@/lib/cms/homepage";
import {
  deleteHomepageTeamMember,
  deleteIndustry,
  deleteProcessStep,
  deleteStat,
  deleteValueProp,
  reorderRows,
  saveHeroContent,
  upsertHomepageTeamMember,
  upsertIndustry,
  upsertProcessStep,
  upsertStat,
  upsertValueProp,
} from "@/app/admin/(dashboard)/homepage/actions";

type Tab = "hero" | "why" | "process" | "team" | "industries" | "stats";

const TABS: { id: Tab; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "why", label: "Why Us" },
  { id: "process", label: "Process" },
  { id: "team", label: "Team" },
  { id: "industries", label: "Industries" },
  { id: "stats", label: "Stats" },
];

type Props = {
  hero: DbHeroContent | null;
  valueProps: DbValueProp[];
  processSteps: DbProcessStep[];
  teamMembers: DbTeamMember[];
  industries: DbIndustry[];
  stats: DbStat[];
};

export function HomepageAdminClient({
  hero,
  valueProps,
  processSteps,
  teamMembers,
  industries,
  stats,
}: Props) {
  const [tab, setTab] = useState<Tab>("hero");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <div>
      <div className="admin-header-row">
        <div>
          <p className="admin-eyebrow">Live section</p>
          <h1 className="admin-page-title">Homepage</h1>
          <p className="admin-page-sub">
            Hero, Why Us, Process, Team, Industries, and Stats — same list + edit + reorder pattern as
            pricing.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTab(t.id);
              setMessage(null);
            }}
            className={`admin-chip${tab === t.id ? " admin-chip-active" : ""}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {message && (
        <p className="mt-4 rounded-[10px] border border-[var(--admin-border)] bg-[var(--admin-surface-tint)] px-3 py-2 text-sm">
          {message}
        </p>
      )}

      <div className="mt-6">
        {tab === "hero" && (
          <HeroForm
            hero={hero}
            pending={pending}
            onSave={(form) => {
              start(async () => {
                const res = await saveHeroContent(form);
                setMessage(res.ok ? "Hero saved" : res.error);
              });
            }}
          />
        )}
        {tab === "why" && (
          <ValuePropsPanel rows={valueProps} pending={pending} setMessage={setMessage} start={start} />
        )}
        {tab === "process" && (
          <ProcessPanel rows={processSteps} pending={pending} setMessage={setMessage} start={start} />
        )}
        {tab === "team" && (
          <TeamPanel rows={teamMembers} pending={pending} setMessage={setMessage} start={start} />
        )}
        {tab === "industries" && (
          <IndustriesPanel rows={industries} pending={pending} setMessage={setMessage} start={start} />
        )}
        {tab === "stats" && (
          <StatsPanel rows={stats} pending={pending} setMessage={setMessage} start={start} />
        )}
      </div>
    </div>
  );
}

function HeroForm({
  hero,
  pending,
  onSave,
}: {
  hero: DbHeroContent | null;
  pending: boolean;
  onSave: (form: {
    eyebrow: string;
    headline: string;
    headline_highlight: string;
    subheadline: string;
    cta_text: string;
    image_url: string;
    image_alt: string;
  }) => void;
}) {
  const [form, setForm] = useState({
    eyebrow: hero?.eyebrow ?? "",
    headline: hero?.headline ?? "",
    headline_highlight: hero?.headline_highlight ?? "",
    subheadline: hero?.subheadline ?? "",
    cta_text: hero?.cta_text ?? "",
    image_url: hero?.image_url ?? "",
    image_alt: hero?.image_alt ?? "",
  });

  return (
    <form
      className="admin-tier-card space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
    >
      {(
        [
          ["eyebrow", "Eyebrow / tagline"],
          ["headline", "Headline"],
          ["headline_highlight", "Headline highlight"],
          ["cta_text", "CTA text"],
          ["image_alt", "Image alt"],
        ] as const
      ).map(([key, label]) => (
        <label key={key} className="admin-label">
          {label}
          <input
            className="admin-input"
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            required={key === "headline"}
          />
        </label>
      ))}
      <label className="admin-label">
        Subheadline
        <textarea
          className="admin-input"
          rows={3}
          value={form.subheadline}
          onChange={(e) => setForm({ ...form, subheadline: e.target.value })}
        />
      </label>
      <ImageUploadField
        label="Hero image"
        value={form.image_url}
        folder="hero"
        onChange={(image_url) => setForm({ ...form, image_url })}
      />
      <button type="submit" disabled={pending} className="admin-btn-primary">
        Save hero
      </button>
    </form>
  );
}

function ReorderButtons({
  index,
  length,
  pending,
  onMove,
}: {
  index: number;
  length: number;
  pending: boolean;
  onMove: (dir: -1 | 1) => void;
}) {
  return (
    <>
      <button type="button" disabled={pending || index === 0} className="admin-btn-ghost" onClick={() => onMove(-1)}>
        ↑
      </button>
      <button
        type="button"
        disabled={pending || index === length - 1}
        className="admin-btn-ghost"
        onClick={() => onMove(1)}
      >
        ↓
      </button>
    </>
  );
}

function ValuePropsPanel({
  rows,
  pending,
  setMessage,
  start,
}: {
  rows: DbValueProp[];
  pending: boolean;
  setMessage: (m: string | null) => void;
  start: (fn: () => Promise<void>) => void;
}) {
  const [editing, setEditing] = useState<DbValueProp | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", icon: "Award", bullets: "" });

  function openCreate() {
    setCreating(true);
    setEditing(null);
    setForm({ title: "", description: "", icon: "Award", bullets: "" });
  }

  function openEdit(row: DbValueProp) {
    setEditing(row);
    setCreating(false);
    setForm({
      title: row.title,
      description: row.description ?? "",
      icon: row.icon ?? "Award",
      bullets: (row.bullets ?? []).join("\n"),
    });
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button type="button" className="admin-btn-primary" onClick={openCreate}>
          + Add block
        </button>
      </div>
      {(creating || editing) && (
        <form
          className="admin-tier-card mb-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            start(async () => {
              const res = await upsertValueProp({
                id: editing?.id,
                title: form.title,
                description: form.description,
                icon: form.icon,
                bullets: form.bullets.split("\n").map((s) => s.trim()).filter(Boolean),
              });
              setMessage(res.ok ? "Saved" : res.error);
              if (res.ok) {
                setCreating(false);
                setEditing(null);
              }
            });
          }}
        >
          <label className="admin-label">
            Title
            <input className="admin-input" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label className="admin-label">
            Description
            <textarea className="admin-input" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
          <label className="admin-label">
            Icon name (Lucide)
            <input className="admin-input" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
          </label>
          <label className="admin-label">
            Bullets (one per line)
            <textarea className="admin-input" rows={4} value={form.bullets} onChange={(e) => setForm({ ...form, bullets: e.target.value })} />
          </label>
          <div className="flex gap-2">
            <button type="submit" disabled={pending} className="admin-btn-primary">Save</button>
            <button type="button" className="admin-btn-ghost" onClick={() => { setCreating(false); setEditing(null); }}>Cancel</button>
          </div>
        </form>
      )}
      <ul className="space-y-3">
        {rows.map((row, index) => (
          <li key={row.id} className="admin-tier-card flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="admin-heading text-base font-medium">{row.title}</h2>
              <p className="mt-1 text-sm text-[var(--admin-text-secondary)]">{row.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <ReorderButtons
                index={index}
                length={rows.length}
                pending={pending}
                onMove={(dir) => {
                  const ids = rows.map((r) => r.id);
                  const next = [...ids];
                  const j = index + dir;
                  [next[index], next[j]] = [next[j], next[index]];
                  start(async () => {
                    const res = await reorderRows("value_props", next);
                    setMessage(res.ok ? "Order updated" : res.error);
                  });
                }}
              />
              <button type="button" className="admin-btn-accent-outline" onClick={() => openEdit(row)}>Edit</button>
              <button
                type="button"
                className="admin-btn-danger-outline"
                onClick={() => {
                  if (!confirm(`Delete ${row.title}?`)) return;
                  start(async () => {
                    const res = await deleteValueProp(row.id);
                    setMessage(res.ok ? "Deleted" : res.error);
                  });
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {rows.length === 0 && <li className="admin-muted">No Why Us blocks. Run npm run seed:cms</li>}
      </ul>
    </div>
  );
}

function ProcessPanel({
  rows,
  pending,
  setMessage,
  start,
}: {
  rows: DbProcessStep[];
  pending: boolean;
  setMessage: (m: string | null) => void;
  start: (fn: () => Promise<void>) => void;
}) {
  const [editing, setEditing] = useState<DbProcessStep | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ step_number: 1, title: "", description: "", image_url: "" });

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          className="admin-btn-primary"
          onClick={() => {
            setCreating(true);
            setEditing(null);
            setForm({ step_number: rows.length + 1, title: "", description: "", image_url: "" });
          }}
        >
          + Add step
        </button>
      </div>
      {(creating || editing) && (
        <form
          className="admin-tier-card mb-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            start(async () => {
              const res = await upsertProcessStep({ id: editing?.id, ...form });
              setMessage(res.ok ? "Saved" : res.error);
              if (res.ok) {
                setCreating(false);
                setEditing(null);
              }
            });
          }}
        >
          <label className="admin-label">
            Step number
            <input type="number" className="admin-input" min={1} value={form.step_number} onChange={(e) => setForm({ ...form, step_number: Number(e.target.value) })} />
          </label>
          <label className="admin-label">
            Title
            <input className="admin-input" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label className="admin-label">
            Description
            <textarea className="admin-input" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
          <ImageUploadField label="Step image" value={form.image_url} folder="process" onChange={(image_url) => setForm({ ...form, image_url })} />
          <div className="flex gap-2">
            <button type="submit" disabled={pending} className="admin-btn-primary">Save</button>
            <button type="button" className="admin-btn-ghost" onClick={() => { setCreating(false); setEditing(null); }}>Cancel</button>
          </div>
        </form>
      )}
      <ul className="space-y-3">
        {rows.map((row, index) => (
          <li key={row.id} className="admin-tier-card flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="admin-heading text-base font-medium">
                {String(row.step_number).padStart(2, "0")} · {row.title}
              </h2>
              <p className="mt-1 text-sm text-[var(--admin-text-secondary)]">{row.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <ReorderButtons
                index={index}
                length={rows.length}
                pending={pending}
                onMove={(dir) => {
                  const ids = rows.map((r) => r.id);
                  const next = [...ids];
                  const j = index + dir;
                  [next[index], next[j]] = [next[j], next[index]];
                  start(async () => {
                    const res = await reorderRows("process_steps", next);
                    setMessage(res.ok ? "Order updated" : res.error);
                  });
                }}
              />
              <button
                type="button"
                className="admin-btn-accent-outline"
                onClick={() => {
                  setEditing(row);
                  setCreating(false);
                  setForm({
                    step_number: row.step_number,
                    title: row.title,
                    description: row.description ?? "",
                    image_url: row.image_url ?? "",
                  });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="admin-btn-danger-outline"
                onClick={() => {
                  if (!confirm(`Delete ${row.title}?`)) return;
                  start(async () => {
                    const res = await deleteProcessStep(row.id);
                    setMessage(res.ok ? "Deleted" : res.error);
                  });
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {rows.length === 0 && <li className="admin-muted">No process steps. Run npm run seed:cms</li>}
      </ul>
    </div>
  );
}

function TeamPanel({
  rows,
  pending,
  setMessage,
  start,
}: {
  rows: DbTeamMember[];
  pending: boolean;
  setMessage: (m: string | null) => void;
  start: (fn: () => Promise<void>) => void;
}) {
  const [editing, setEditing] = useState<DbTeamMember | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ slug: "", name: "", role: "", trait: "", quote: "", photo_url: "" });

  return (
    <div>
      <p className="mb-4 admin-muted">Members with a quote appear on the homepage carousel. Shared with About.</p>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          className="admin-btn-primary"
          onClick={() => {
            setCreating(true);
            setEditing(null);
            setForm({ slug: "", name: "", role: "", trait: "", quote: "", photo_url: "" });
          }}
        >
          + Add member
        </button>
      </div>
      {(creating || editing) && (
        <form
          className="admin-tier-card mb-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            start(async () => {
              const res = await upsertHomepageTeamMember({ id: editing?.id, ...form });
              setMessage(res.ok ? "Saved" : res.error);
              if (res.ok) {
                setCreating(false);
                setEditing(null);
              }
            });
          }}
        >
          {(
            [
              ["name", "Name"],
              ["role", "Role"],
              ["slug", "Slug"],
              ["trait", "Theme / trait"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="admin-label">
              {label}
              <input
                className="admin-input"
                required={key === "name" || key === "role"}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            </label>
          ))}
          <label className="admin-label">
            Quote (homepage carousel)
            <textarea className="admin-input" rows={4} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
          </label>
          <ImageUploadField label="Photo" value={form.photo_url} folder="team" onChange={(photo_url) => setForm({ ...form, photo_url })} />
          <div className="flex gap-2">
            <button type="submit" disabled={pending} className="admin-btn-primary">Save</button>
            <button type="button" className="admin-btn-ghost" onClick={() => { setCreating(false); setEditing(null); }}>Cancel</button>
          </div>
        </form>
      )}
      <ul className="space-y-3">
        {rows.map((row, index) => (
          <li key={row.id} className="admin-tier-card flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="admin-heading text-base font-medium">{row.name}</h2>
              <p className="mt-1 text-sm text-[var(--admin-text-secondary)]">{row.role}</p>
              {!row.quote && <p className="mt-1 text-xs text-[var(--admin-text-muted)]">No quote — hidden on homepage carousel</p>}
            </div>
            <div className="flex flex-wrap gap-2">
              <ReorderButtons
                index={index}
                length={rows.length}
                pending={pending}
                onMove={(dir) => {
                  const ids = rows.map((r) => r.id);
                  const next = [...ids];
                  const j = index + dir;
                  [next[index], next[j]] = [next[j], next[index]];
                  start(async () => {
                    const res = await reorderRows("team_members", next);
                    setMessage(res.ok ? "Order updated" : res.error);
                  });
                }}
              />
              <button
                type="button"
                className="admin-btn-accent-outline"
                onClick={() => {
                  setEditing(row);
                  setCreating(false);
                  setForm({
                    slug: row.slug ?? "",
                    name: row.name,
                    role: row.role,
                    trait: row.trait ?? "",
                    quote: row.quote ?? "",
                    photo_url: row.photo_url ?? "",
                  });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="admin-btn-danger-outline"
                onClick={() => {
                  if (!confirm(`Delete ${row.name}?`)) return;
                  start(async () => {
                    const res = await deleteHomepageTeamMember(row.id);
                    setMessage(res.ok ? "Deleted" : res.error);
                  });
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {rows.length === 0 && <li className="admin-muted">No team members. Run npm run seed:cms</li>}
      </ul>
    </div>
  );
}

function IndustriesPanel({
  rows,
  pending,
  setMessage,
  start,
}: {
  rows: DbIndustry[];
  pending: boolean;
  setMessage: (m: string | null) => void;
  start: (fn: () => Promise<void>) => void;
}) {
  const [editing, setEditing] = useState<DbIndustry | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", icon: "Building2", image_url: "" });

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          className="admin-btn-primary"
          onClick={() => {
            setCreating(true);
            setEditing(null);
            setForm({ name: "", description: "", icon: "Building2", image_url: "" });
          }}
        >
          + Add industry
        </button>
      </div>
      {(creating || editing) && (
        <form
          className="admin-tier-card mb-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            start(async () => {
              const res = await upsertIndustry({ id: editing?.id, ...form });
              setMessage(res.ok ? "Saved" : res.error);
              if (res.ok) {
                setCreating(false);
                setEditing(null);
              }
            });
          }}
        >
          <label className="admin-label">
            Name
            <input className="admin-input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="admin-label">
            Description
            <textarea className="admin-input" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
          <label className="admin-label">
            Icon
            <input className="admin-input" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
          </label>
          <label className="admin-label">
            Image URL / path
            <input className="admin-input" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
          </label>
          <div className="flex gap-2">
            <button type="submit" disabled={pending} className="admin-btn-primary">Save</button>
            <button type="button" className="admin-btn-ghost" onClick={() => { setCreating(false); setEditing(null); }}>Cancel</button>
          </div>
        </form>
      )}
      <ul className="space-y-3">
        {rows.map((row, index) => (
          <li key={row.id} className="admin-tier-card flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="admin-heading text-base font-medium">{row.name}</h2>
              <p className="mt-1 text-sm text-[var(--admin-text-secondary)]">{row.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <ReorderButtons
                index={index}
                length={rows.length}
                pending={pending}
                onMove={(dir) => {
                  const ids = rows.map((r) => r.id);
                  const next = [...ids];
                  const j = index + dir;
                  [next[index], next[j]] = [next[j], next[index]];
                  start(async () => {
                    const res = await reorderRows("industries", next);
                    setMessage(res.ok ? "Order updated" : res.error);
                  });
                }}
              />
              <button
                type="button"
                className="admin-btn-accent-outline"
                onClick={() => {
                  setEditing(row);
                  setCreating(false);
                  setForm({
                    name: row.name,
                    description: row.description ?? "",
                    icon: row.icon ?? "Building2",
                    image_url: row.image_url ?? "",
                  });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="admin-btn-danger-outline"
                onClick={() => {
                  if (!confirm(`Delete ${row.name}?`)) return;
                  start(async () => {
                    const res = await deleteIndustry(row.id);
                    setMessage(res.ok ? "Deleted" : res.error);
                  });
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {rows.length === 0 && <li className="admin-muted">No industries. Run npm run seed:cms</li>}
      </ul>
    </div>
  );
}

function StatsPanel({
  rows,
  pending,
  setMessage,
  start,
}: {
  rows: DbStat[];
  pending: boolean;
  setMessage: (m: string | null) => void;
  start: (fn: () => Promise<void>) => void;
}) {
  const [editing, setEditing] = useState<DbStat | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ label: "", value: "", suffix: "" });

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          className="admin-btn-primary"
          onClick={() => {
            setCreating(true);
            setEditing(null);
            setForm({ label: "", value: "", suffix: "" });
          }}
        >
          + Add stat
        </button>
      </div>
      {(creating || editing) && (
        <form
          className="admin-tier-card mb-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            start(async () => {
              const res = await upsertStat({ id: editing?.id, ...form });
              setMessage(res.ok ? "Saved" : res.error);
              if (res.ok) {
                setCreating(false);
                setEditing(null);
              }
            });
          }}
        >
          <label className="admin-label">
            Label
            <input className="admin-input" required value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
          </label>
          <label className="admin-label">
            Value (number)
            <input className="admin-input" required value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
          </label>
          <label className="admin-label">
            Suffix
            <input className="admin-input" value={form.suffix} onChange={(e) => setForm({ ...form, suffix: e.target.value })} placeholder="% or +" />
          </label>
          <div className="flex gap-2">
            <button type="submit" disabled={pending} className="admin-btn-primary">Save</button>
            <button type="button" className="admin-btn-ghost" onClick={() => { setCreating(false); setEditing(null); }}>Cancel</button>
          </div>
        </form>
      )}
      <ul className="space-y-3">
        {rows.map((row, index) => (
          <li key={row.id} className="admin-tier-card flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="admin-heading text-base font-medium">
                {row.value}
                {row.suffix} · {row.label}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <ReorderButtons
                index={index}
                length={rows.length}
                pending={pending}
                onMove={(dir) => {
                  const ids = rows.map((r) => r.id);
                  const next = [...ids];
                  const j = index + dir;
                  [next[index], next[j]] = [next[j], next[index]];
                  start(async () => {
                    const res = await reorderRows("stats", next);
                    setMessage(res.ok ? "Order updated" : res.error);
                  });
                }}
              />
              <button
                type="button"
                className="admin-btn-accent-outline"
                onClick={() => {
                  setEditing(row);
                  setCreating(false);
                  setForm({ label: row.label, value: row.value, suffix: row.suffix ?? "" });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="admin-btn-danger-outline"
                onClick={() => {
                  if (!confirm(`Delete ${row.label}?`)) return;
                  start(async () => {
                    const res = await deleteStat(row.id);
                    setMessage(res.ok ? "Deleted" : res.error);
                  });
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {rows.length === 0 && <li className="admin-muted">No stats. Run npm run seed:cms</li>}
      </ul>
    </div>
  );
}
