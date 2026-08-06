-- Focused Folks CMS schema (dev / non-production first)
-- Run against a fresh Supabase project or `supabase db reset` locally.

-- ---------------------------------------------------------------------------
-- Pricing
-- ---------------------------------------------------------------------------
create table pricing_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  addons_title text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table pricing_tiers (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references pricing_categories(id) on delete cascade,
  slug text not null,
  title text not null,
  badge text,
  price_low numeric not null,
  price_high numeric not null,
  price_unit text not null default '', -- '', '/month', '/hr'
  scope text,
  delivery text,
  description text,
  features text[] not null default '{}',
  is_most_popular boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pricing_tiers_price_range check (price_high >= price_low),
  unique (category_id, slug)
);

create table pricing_addons (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references pricing_categories(id) on delete cascade,
  slug text not null,
  name text not null,
  price_low numeric not null,
  price_high numeric not null,
  sort_order int not null default 0,
  constraint pricing_addons_price_range check (price_high >= price_low),
  unique (category_id, slug)
);

-- ---------------------------------------------------------------------------
-- Services (catalog cards + featured homepage)
-- ---------------------------------------------------------------------------
create table services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  tagline text,
  description text,
  hover_preview text,
  mega_summary text,
  price_from_usd numeric,
  icon text,
  href text,
  features text[] not null default '{}',
  hero_image text,
  is_featured boolean not null default false,
  sort_order int not null default 0,
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Homepage blocks
-- ---------------------------------------------------------------------------
create table hero_content (
  id int primary key default 1,
  eyebrow text,
  headline text,
  headline_highlight text,
  subheadline text,
  cta_text text,
  image_url text,
  image_alt text,
  constraint hero_content_single_row check (id = 1)
);

create table value_props (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  bullets text[] not null default '{}',
  sort_order int not null default 0
);

create table process_steps (
  id uuid primary key default gen_random_uuid(),
  step_number int not null,
  title text not null,
  description text,
  image_url text,
  sort_order int not null default 0
);

create table team_members (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  name text not null,
  role text not null,
  trait text,
  quote text,
  bio text,
  photo_url text,
  linkedin text,
  sort_order int not null default 0
);

create table industries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon text,
  image_url text,
  sort_order int not null default 0
);

create table stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  suffix text not null default '',
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------------
-- FAQs (page-scoped; do not merge homepage + pricing)
-- ---------------------------------------------------------------------------
create table faqs (
  id uuid primary key default gen_random_uuid(),
  page text not null check (page in ('homepage', 'pricing', 'services', 'contact')),
  question text not null,
  answer text not null,
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------------
-- Blog
-- ---------------------------------------------------------------------------
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null default '',
  cover_image text,
  category text,
  author text,
  author_role text,
  read_time text,
  tags text[] not null default '{}',
  featured boolean not null default false,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Products
-- ---------------------------------------------------------------------------
create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  description text,
  thumbnail text,
  status text not null default 'coming-soon' check (status in ('live', 'coming-soon')),
  category text,
  href text,
  features text[] not null default '{}',
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------------
-- Generic site settings (about page blocks, contact, footer later)
-- Keys e.g. contact, about_hero, about_values, products_hero
-- ---------------------------------------------------------------------------
create table site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- RLS: public read, authenticated write
-- ---------------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array[
    'pricing_categories',
    'pricing_tiers',
    'pricing_addons',
    'services',
    'hero_content',
    'value_props',
    'process_steps',
    'team_members',
    'industries',
    'stats',
    'faqs',
    'blog_posts',
    'products',
    'site_settings'
  ]
  loop
    execute format('alter table %I enable row level security', t);
    execute format(
      'create policy "Public read access" on %I for select using (true)',
      t
    );
    execute format(
      'create policy "Authenticated write access" on %I for all using (auth.role() = ''authenticated'') with check (auth.role() = ''authenticated'')',
      t
    );
  end loop;
end $$;

-- Storage bucket for CMS media (create in dashboard if CLI storage not used):
-- name: cms-media, public: true
-- Policies: public read; authenticated insert/update/delete
