# Admin CMS (Supabase) — setup guide

Branch: `feature/admin-cms` — **do not merge to production** until the checklist below is green on a preview deploy.

## Status

| Area | Status |
|---|---|
| Schema migration + RLS | Ready (`supabase/migrations/20260805000000_cms_schema.sql`) |
| Admin auth (`/admin/login`) | Ready (needs Supabase Auth user) |
| Pricing seed + public `/pricing` fetch | **Live** |
| Homepage (hero, Why Us, process, team, industries, stats) | **Live** |
| FAQs (homepage + pricing + services + contact) | **Live** |
| Services catalog + detail pages + featured home cards | **Live** |
| Blog (published only on public) | **Live** |
| Products | **Live** |
| About (team + settings) | **Live** |
| Contact + footer contact info (shared) | **Live** |
| Footer nav/social | **Staying hardcoded** (by design) |
| Supabase Storage (`cms-media`) | Migration `20260806000000_cms_media_bucket.sql` — run in SQL Editor |

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
- [ ] Both FAQ sets correct (homepage + pricing)
- [ ] All 10 service pages + homepage featured cards
- [ ] Blog list/detail show published posts only
- [ ] Products / About / Contact match CMS; footer contact matches Contact
- [ ] Dashboard shows **8/8** sections live with real counts
- [ ] `/admin` blocked when logged out
- [ ] Anon key cannot write
- [ ] Admin edits update public pages after revalidate / hard refresh
- [ ] Image uploads work (team, process, blog covers) after `cms-media` migration
- [ ] USD/AED switcher still works from INR lows/highs
- [ ] Preview deploy verified before promoting production
