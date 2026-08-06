"use client";

import { useState, useTransition } from "react";
import { deleteBlogPost, upsertBlogPost } from "@/app/admin/(dashboard)/content-actions";
import { ImageUploadField } from "@/components/admin/image-upload-field";

type BlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string | null;
  author: string | null;
  author_role: string | null;
  published: boolean;
};

export function BlogAdminClient({ posts }: { posts: BlogRow[] }) {
  const [editing, setEditing] = useState<BlogRow | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <div>
      <div className="admin-header-row">
        <div>
          <p className="admin-eyebrow">Content</p>
          <h1 className="admin-page-title">Blog</h1>
          <p className="admin-page-sub">Create, edit, and publish posts.</p>
        </div>
        <button
          type="button"
          className="admin-btn-primary"
          onClick={() =>
            setEditing({
              id: "",
              slug: "",
              title: "",
              excerpt: "",
              content: "",
              cover_image: "",
              category: "",
              author: "",
              author_role: "",
              published: false,
            })
          }
        >
          + New post
        </button>
      </div>
      {message && <p className="mt-3 admin-muted">{message}</p>}

      {editing && (
        <form
          className="admin-tier-card mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            start(async () => {
              const res = await upsertBlogPost({
                id: editing.id || undefined,
                slug: editing.slug,
                title: editing.title,
                excerpt: editing.excerpt ?? "",
                content: editing.content,
                cover_image: editing.cover_image ?? "",
                category: editing.category ?? "",
                author: editing.author ?? "",
                author_role: editing.author_role ?? "",
                published: editing.published,
              });
              setMessage(res.ok ? "Saved" : res.error);
              if (res.ok) setEditing(null);
            });
          }}
        >
          <label className="admin-label">Slug<input className="admin-input" required value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></label>
          <label className="admin-label">Title<input className="admin-input" required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></label>
          <label className="admin-label">Excerpt<textarea className="admin-input" rows={2} value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} /></label>
          <label className="admin-label">Content<textarea className="admin-input" rows={5} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} /></label>
          <ImageUploadField
            label="Cover image"
            value={editing.cover_image ?? ""}
            folder="blog"
            onChange={(cover_image) => setEditing({ ...editing, cover_image })}
          />
          <label className="admin-label">Category<input className="admin-input" value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /></label>
          <label className="admin-label">Author<input className="admin-input" value={editing.author ?? ""} onChange={(e) => setEditing({ ...editing, author: e.target.value })} /></label>
          <label className="admin-label">Author role<input className="admin-input" value={editing.author_role ?? ""} onChange={(e) => setEditing({ ...editing, author_role: e.target.value })} /></label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
            Published
          </label>
          <div className="flex gap-2">
            <button type="submit" disabled={pending} className="admin-btn-primary">Save</button>
            <button type="button" className="admin-btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      )}

      <ul className="mt-6 space-y-3">
        {posts.map((p) => (
          <li key={p.id} className="admin-tier-card flex flex-wrap justify-between gap-3">
            <div>
              <h3 className="font-medium text-[var(--admin-text-primary)]">{p.title}</h3>
              <p className="text-sm text-[var(--admin-text-secondary)]">{p.category} · {p.slug}</p>
              <span className={`admin-badge mt-2${p.published ? " admin-badge-live" : ""}`}>
                {p.published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="flex gap-2">
              <button type="button" className="admin-btn-accent-outline" onClick={() => setEditing(p)}>Edit</button>
              <button
                type="button"
                className="admin-btn-danger-outline"
                onClick={() => {
                  if (!confirm(`Delete ${p.title}?`)) return;
                  start(async () => {
                    const res = await deleteBlogPost(p.id);
                    setMessage(res.ok ? "Deleted" : res.error);
                  });
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {posts.length === 0 && <li className="admin-muted">No posts. Run npm run seed:cms</li>}
      </ul>
    </div>
  );
}
