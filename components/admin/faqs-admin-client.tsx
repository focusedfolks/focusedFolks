"use client";

import { useMemo, useState, useTransition } from "react";
import { deleteFaq, reorderFaqs, upsertFaq } from "@/app/admin/(dashboard)/content-actions";

type FaqRow = {
  id: string;
  page: "homepage" | "pricing" | "services" | "contact";
  question: string;
  answer: string;
};

/** Primary tabs from the CMS brief; contact/services kept for seeded rows. */
const PAGES = ["homepage", "pricing", "contact", "services"] as const;

export function FaqsAdminClient({ faqs }: { faqs: FaqRow[] }) {
  const [tab, setTab] = useState<(typeof PAGES)[number]>("homepage");
  const [editing, setEditing] = useState<FaqRow | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const list = useMemo(() => faqs.filter((f) => f.page === tab), [faqs, tab]);

  return (
    <div>
      <div className="admin-header-row">
        <div>
          <p className="admin-eyebrow">Live section</p>
          <h1 className="admin-page-title">FAQs</h1>
          <p className="admin-page-sub">
            Homepage and Pricing sets are separate — do not merge them. Public pages read each set by{" "}
            <code>page</code>.
          </p>
        </div>
        <button
          type="button"
          className="admin-btn-primary"
          onClick={() => setEditing({ id: "", page: tab, question: "", answer: "" })}
        >
          + Add FAQ
        </button>
      </div>
      {message && (
        <p className="mt-4 rounded-[10px] border border-[var(--admin-border)] bg-[var(--admin-surface-tint)] px-3 py-2 text-sm">
          {message}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {PAGES.map((p) => (
          <button
            key={p}
            type="button"
            className={`admin-chip${tab === p ? " admin-chip-active" : ""}`}
            onClick={() => {
              setTab(p);
              setEditing(null);
              setMessage(null);
            }}
          >
            {p} ({faqs.filter((f) => f.page === p).length})
          </button>
        ))}
      </div>

      {editing && (
        <form
          className="admin-tier-card mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            start(async () => {
              const res = await upsertFaq({
                id: editing.id || undefined,
                page: editing.page,
                question: editing.question,
                answer: editing.answer,
              });
              setMessage(res.ok ? "Saved" : res.error);
              if (res.ok) setEditing(null);
            });
          }}
        >
          <label className="admin-label">
            Question
            <input
              className="admin-input"
              required
              value={editing.question}
              onChange={(e) => setEditing({ ...editing, question: e.target.value })}
            />
          </label>
          <label className="admin-label">
            Answer
            <textarea
              className="admin-input"
              rows={4}
              required
              value={editing.answer}
              onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
            />
          </label>
          <div className="flex gap-2">
            <button type="submit" disabled={pending} className="admin-btn-primary">
              Save
            </button>
            <button type="button" className="admin-btn-ghost" onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <ul className="mt-6 space-y-3">
        {list.map((f, index) => (
          <li key={f.id} className="admin-tier-card flex flex-wrap justify-between gap-3">
            <div className="max-w-3xl">
              <h3 className="font-medium text-[var(--admin-text-primary)]">{f.question}</h3>
              <p className="mt-1 text-sm text-[var(--admin-text-secondary)]">{f.answer}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={pending || index === 0}
                className="admin-btn-ghost"
                onClick={() => {
                  const ids = list.map((row) => row.id);
                  const next = [...ids];
                  [next[index - 1], next[index]] = [next[index], next[index - 1]];
                  start(async () => {
                    const res = await reorderFaqs(tab, next);
                    setMessage(res.ok ? "Order updated" : res.error);
                  });
                }}
              >
                ↑
              </button>
              <button
                type="button"
                disabled={pending || index === list.length - 1}
                className="admin-btn-ghost"
                onClick={() => {
                  const ids = list.map((row) => row.id);
                  const next = [...ids];
                  [next[index + 1], next[index]] = [next[index], next[index + 1]];
                  start(async () => {
                    const res = await reorderFaqs(tab, next);
                    setMessage(res.ok ? "Order updated" : res.error);
                  });
                }}
              >
                ↓
              </button>
              <button type="button" className="admin-btn-accent-outline" onClick={() => setEditing(f)}>
                Edit
              </button>
              <button
                type="button"
                className="admin-btn-danger-outline"
                onClick={() => {
                  if (!confirm("Delete this FAQ?")) return;
                  start(async () => {
                    const res = await deleteFaq(f.id);
                    setMessage(res.ok ? "Deleted" : res.error);
                  });
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {list.length === 0 && <li className="admin-muted">No FAQs for this page. Run npm run seed:cms</li>}
      </ul>
    </div>
  );
}
