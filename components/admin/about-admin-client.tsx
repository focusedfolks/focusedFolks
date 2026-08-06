"use client";

import { useState, useTransition } from "react";
import {
  deleteTeamMember,
  saveAboutSettings,
  upsertTeamMember,
} from "@/app/admin/(dashboard)/content-actions";

type TeamRow = {
  id: string;
  slug: string | null;
  name: string;
  role: string;
  trait: string | null;
  quote: string | null;
  bio: string | null;
  photo_url: string | null;
};

type AboutSettings = {
  values: { title: string; description: string; icon: string }[];
  timeline: { year: string; title: string; description: string }[];
  capabilities: {
    id: string;
    title: string;
    tagline: string;
    description: string;
    image: string;
    icon: string;
    href: string;
    highlights: string[];
  }[];
};

export function AboutAdminClient({
  team,
  about,
}: {
  team: TeamRow[];
  about: AboutSettings | null;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const [editing, setEditing] = useState<TeamRow | null>(null);
  const [valuesJson, setValuesJson] = useState(JSON.stringify(about?.values ?? [], null, 2));
  const [timelineJson, setTimelineJson] = useState(JSON.stringify(about?.timeline ?? [], null, 2));

  return (
    <div>
      <p className="admin-eyebrow">Content</p>
      <h1 className="admin-page-title">About</h1>
      <p className="admin-page-sub">Team members, company values, and timeline.</p>
      {message && <p className="mt-3 admin-muted">{message}</p>}

      <h2 className="admin-heading mt-8 text-lg font-medium">Team members</h2>
      <ul className="mt-3 space-y-3">
        {team.map((m) => (
          <li key={m.id} className="admin-tier-card">
            {editing?.id === m.id ? (
              <TeamForm
                initial={m}
                pending={pending}
                onCancel={() => setEditing(null)}
                onSave={(payload) => {
                  start(async () => {
                    const res = await upsertTeamMember({ ...payload, id: m.id });
                    setMessage(res.ok ? "Team member saved" : res.error);
                    if (res.ok) setEditing(null);
                  });
                }}
              />
            ) : (
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <h3 className="font-medium text-[var(--admin-text-primary)]">{m.name}</h3>
                  <p className="text-sm text-[var(--admin-text-secondary)]">{m.role}</p>
                  {m.quote && <p className="mt-2 text-sm text-[var(--admin-text-muted)]">“{m.quote}”</p>}
                </div>
                <div className="flex gap-2">
                  <button type="button" className="admin-btn-accent-outline" onClick={() => setEditing(m)}>Edit</button>
                  <button
                    type="button"
                    className="admin-btn-danger-outline"
                    onClick={() => {
                      if (!confirm(`Delete ${m.name}?`)) return;
                      start(async () => {
                        const res = await deleteTeamMember(m.id);
                        setMessage(res.ok ? "Deleted" : res.error);
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
        {team.length === 0 && <li className="admin-muted">No team members. Run npm run seed:cms</li>}
      </ul>

      <h2 className="admin-heading mt-10 text-lg font-medium">Values & timeline (JSON)</h2>
      <p className="admin-muted mt-1">Edit carefully — saved to site_settings.about</p>
      <label className="admin-label mt-4">
        Values
        <textarea className="admin-input font-mono text-xs" rows={8} value={valuesJson} onChange={(e) => setValuesJson(e.target.value)} />
      </label>
      <label className="admin-label mt-3">
        Timeline
        <textarea className="admin-input font-mono text-xs" rows={8} value={timelineJson} onChange={(e) => setTimelineJson(e.target.value)} />
      </label>
      <button
        type="button"
        className="admin-btn-primary mt-3"
        disabled={pending}
        onClick={() => {
          start(async () => {
            try {
              const values = JSON.parse(valuesJson);
              const timeline = JSON.parse(timelineJson);
              const res = await saveAboutSettings({
                values,
                timeline,
                capabilities: about?.capabilities ?? [],
              });
              setMessage(res.ok ? "About settings saved" : res.error);
            } catch {
              setMessage("Invalid JSON");
            }
          });
        }}
      >
        Save values & timeline
      </button>
    </div>
  );
}

function TeamForm({
  initial,
  pending,
  onCancel,
  onSave,
}: {
  initial: TeamRow;
  pending: boolean;
  onCancel: () => void;
  onSave: (p: {
    slug: string;
    name: string;
    role: string;
    trait: string;
    quote: string;
    bio: string;
    photo_url: string;
  }) => void;
}) {
  const [slug, setSlug] = useState(initial.slug ?? "");
  const [name, setName] = useState(initial.name);
  const [role, setRole] = useState(initial.role);
  const [trait, setTrait] = useState(initial.trait ?? "");
  const [quote, setQuote] = useState(initial.quote ?? "");
  const [bio, setBio] = useState(initial.bio ?? "");
  const [photo, setPhoto] = useState(initial.photo_url ?? "");

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ slug, name, role, trait, quote, bio, photo_url: photo });
      }}
    >
      <label className="admin-label">Slug<input className="admin-input" value={slug} onChange={(e) => setSlug(e.target.value)} required /></label>
      <label className="admin-label">Name<input className="admin-input" value={name} onChange={(e) => setName(e.target.value)} required /></label>
      <label className="admin-label">Role<input className="admin-input" value={role} onChange={(e) => setRole(e.target.value)} required /></label>
      <label className="admin-label">Trait / theme<input className="admin-input" value={trait} onChange={(e) => setTrait(e.target.value)} /></label>
      <label className="admin-label">Quote<textarea className="admin-input" rows={3} value={quote} onChange={(e) => setQuote(e.target.value)} /></label>
      <label className="admin-label">Bio<textarea className="admin-input" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} /></label>
      <label className="admin-label">Photo URL<input className="admin-input" value={photo} onChange={(e) => setPhoto(e.target.value)} /></label>
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className="admin-btn-primary">Save</button>
        <button type="button" className="admin-btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
