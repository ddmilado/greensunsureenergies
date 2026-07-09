-- ============================================================
-- Projects, blog posts, leads, contact messages.
-- Run after 0001_init_store.sql.
-- ============================================================

-- ---------- projects ----------
create table if not exists public.projects (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  category        text not null,         -- e.g. Homes, Business, Industrial, Scale
  client_type     text,                  -- Residential, Commercial, Industrial, etc.
  location        text,                  -- City, State
  system_size     text,                  -- "8kVA + 10kWh", freeform
  panels          text,                  -- e.g. "12 × 450W"
  batteries       text,                  -- e.g. "2 × 5kWh LiFePO4"
  inverter        text,                  -- freeform
  installation    text,                  -- e.g. "2 days"
  outcome         text,                  -- one-line result/savings
  excerpt         text,                  -- short summary for cards
  body            text,                  -- long-form markdown-style body
  cover_image     text,                  -- primary image URL
  gallery         jsonb not null default '[]'::jsonb,  -- [{url, alt, position}]
  active          boolean not null default true,
  featured        boolean not null default false,
  position        integer not null default 0,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists projects_active_idx    on public.projects(active);
create index if not exists projects_featured_idx  on public.projects(featured) where featured = true;
create index if not exists projects_published_idx on public.projects(published_at desc nulls last);

-- ---------- blog posts ----------
create table if not exists public.posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  category        text,                  -- Info, Business, Tips, etc.
  excerpt         text,                  -- short summary for cards
  body            text,                  -- long-form content (markdown-style)
  cover_image     text,                  -- primary image URL
  author_name     text,
  reading_minutes integer,
  active          boolean not null default true,
  published_at    timestamptz not null default now(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists posts_active_idx      on public.posts(active);
create index if not exists posts_published_idx   on public.posts(published_at desc);

-- ---------- leads (quote + contact form submissions) ----------
create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  kind            text not null check (kind in ('quote','contact','support')),
  name            text,
  email           text,
  phone           text,
  message         text,
  source          text,                  -- where the lead came from: contact page, service page, etc.
  page_path       text,                  -- the URL the user was on
  meta            jsonb not null default '{}'::jsonb,
  status          text not null default 'new' check (status in ('new','contacted','qualified','won','lost')),
  user_id         uuid references auth.users(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists leads_status_idx   on public.leads(status);
create index if not exists leads_kind_idx     on public.leads(kind);
create index if not exists leads_created_idx  on public.leads(created_at desc);

-- ---------- updated_at triggers ----------
drop trigger if exists trg_projects_updated on public.projects;
create trigger trg_projects_updated before update on public.projects
  for each row execute function public.tg_set_updated_at();

drop trigger if exists trg_posts_updated on public.posts;
create trigger trg_posts_updated before update on public.posts
  for each row execute function public.tg_set_updated_at();

drop trigger if exists trg_leads_updated on public.leads;
create trigger trg_leads_updated before update on public.leads
  for each row execute function public.tg_set_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.projects enable row level security;
alter table public.posts    enable row level security;
alter table public.leads    enable row level security;

-- public read for active projects + posts
drop policy if exists "projects public read" on public.projects;
create policy "projects public read" on public.projects
  for select using (active = true);

drop policy if exists "posts public read" on public.posts;
create policy "posts public read" on public.posts
  for select using (active = true);

-- admin write for projects + posts
drop policy if exists "projects admin write" on public.projects;
create policy "projects admin write" on public.projects
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

drop policy if exists "posts admin write" on public.posts;
create policy "posts admin write" on public.posts
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- leads: anyone can insert (forms), only admin can read/update
drop policy if exists "leads anyone insert" on public.leads;
create policy "leads anyone insert" on public.leads
  for insert with check (true);

drop policy if exists "leads admin read" on public.leads;
create policy "leads admin read" on public.leads
  for select using (public.is_admin(auth.uid()));

drop policy if exists "leads admin update" on public.leads;
create policy "leads admin update" on public.leads
  for update using (public.is_admin(auth.uid()));
