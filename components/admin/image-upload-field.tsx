"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CMS_MEDIA_BUCKET } from "@/lib/cms/media";

type Props = {
  label: string;
  value: string;
  folder: string;
  onChange: (url: string) => void;
};

export function ImageUploadField({ label, value, folder, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const supabase = createClient();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const path = `${folder}/${Date.now()}-${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from(CMS_MEDIA_BUCKET)
        .upload(path, file, { upsert: true, contentType: file.type });
      if (uploadError) {
        setError(uploadError.message);
        return;
      }
      const { data } = supabase.storage.from(CMS_MEDIA_BUCKET).getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="admin-label">
        {label}
        <input
          className="admin-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/... or uploaded URL"
        />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <label className="admin-btn-ghost cursor-pointer">
          {uploading ? "Uploading…" : "Upload image"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            disabled={uploading}
            onChange={(e) => void onFile(e.target.files?.[0])}
          />
        </label>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-12 w-12 rounded-md object-cover" />
        ) : null}
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <p className="text-xs text-[var(--admin-text-muted)]">
        Uses the <code>cms-media</code> bucket (public read). Paste a path if you prefer not to upload.
      </p>
    </div>
  );
}
