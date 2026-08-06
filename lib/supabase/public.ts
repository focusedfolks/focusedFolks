import { createClient } from "@supabase/supabase-js";

/**
 * Cookie-less anon client for public CMS reads (homepage, pricing, etc.).
 * Do NOT use the SSR cookie client here — during static/ISR generation
 * `cookies()` can fail and silently fall back to hardcoded constants, so
 * admin edits never appear on the live site.
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
