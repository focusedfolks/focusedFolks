"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const configError = searchParams.get("error") === "supabase_not_configured";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    configError
      ? "Supabase is not configured. Locally: add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local. On Vercel: Project Settings → Environment Variables (Production), then Redeploy."
      : null
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <div className="admin-card shadow-sm">
      <div className="mb-5 flex items-center gap-2.5">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <circle cx="14" cy="14" r="11.5" stroke="var(--admin-accent)" strokeWidth="1.75" />
        </svg>
        <p className="admin-eyebrow" style={{ margin: 0 }}>
          FocusFolks
        </p>
      </div>
      <h1 className="admin-page-title" style={{ fontSize: 24 }}>
        Admin login
      </h1>
      <p className="admin-page-sub">
        Sign in with the Supabase Auth admin user. There is no public sign-up.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="admin-label" htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="admin-input"
          />
        </label>
        <label className="admin-label" htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-input"
          />
        </label>

        {error && <p className="admin-error">{error}</p>}

        <button type="submit" disabled={loading || configError} className="admin-btn-primary w-full justify-center">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
