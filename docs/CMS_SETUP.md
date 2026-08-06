# Admin CMS (Supabase) — setup guide

Branch: `feature/admin-cms` — **do not merge to production** until the checklist below is green on a preview deploy.

## Status

| Area | Status |
|---|---|
| Schema migration + RLS | Ready (`supabase/migrations/20260805000000_cms_schema.sql`) |
| Admin auth (`/admin/login`) | Ready (needs Supabase Auth user) |
| Pricing seed + public `/pricing` fetch | Ready (falls back to hardcoded if DB empty) |
| Pricing admin CRUD | Ready |
| Homepage / FAQs / Services / Blog / About / Contact editors | Homepage live (seed → admin CRUD → public `/`); others scaffold or admin-only |
| Footer nav/social | **Staying hardcoded** (lower priority) |
| Supabase Storage (`cms-media`) | Migration `20260806000000_cms_media_bucket.sql` — run in SQL Editor; upload UI on Homepage Team + Process |

## 1. Create a **dev** Supabase project

Do **not** point at production on the first pass.

1. Create a project at https://supabase.com
2. Copy `.env.local.example` → `.env.local` and fill:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server/seed only)
3. In Supabase → SQL Editor, paste and run the full migration file.
4. Authentication → Users → **Add user** (email/password) for the site owner. No public sign-up.

## 2. Seed pricing

```bash
npm run seed:pricing
```

## 3. Local verify

```bash
npm run dev
```

- Public site still works without env (hardcoded fallback).
- With env + seed: `/pricing` reads from Supabase.
- `/admin/login` → edit a tier → confirm `/pricing` updates (after revalidate / hard refresh).

## 4. Storage

Run `supabase/migrations/20260806000000_cms_media_bucket.sql` in the SQL Editor (creates public `cms-media` bucket + policies).

Admin Homepage → Team / Process (and later Blog) can upload via that bucket.

## Merge checklist

- [ ] All 10 pricing tabs correct with ranges
- [ ] Homepage sections match live (after those seeds)
- [ ] Both FAQ sets correct
- [ ] `/admin` blocked when logged out
- [ ] Anon key cannot write
- [ ] Admin price edit updates public page
- [ ] USD/AED switcher still works from INR lows/highs
- [ ] Preview deploy verified before promoting production
