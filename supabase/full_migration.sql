-- ========================================================
-- FULL DATABASE MIGRATION SCRIPT FOR GREEN SUNSURE ENERGY
-- ========================================================

-- >>> START: 0001_init_store.sql <<<

-- ============================================================
-- Green Sunsure store schema
-- profiles (1:1 with auth.users), products, categories,
-- product_images, inventory, cart, orders, order_items,
-- payment_events, admin role
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- profiles ----------
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text,
  full_name    text,
  phone        text,
  is_admin     boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- categories ----------
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  description text,
  created_at  timestamptz not null default now()
);

-- ---------- products ----------
create table if not exists public.products (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  brand         text,
  short_desc    text,
  description   text,
  category_id   uuid references public.categories(id) on delete set null,
  -- price in kobo (NGN * 100) to keep arithmetic integer-precise
  price_kobo    integer not null check (price_kobo >= 0),
  compare_at_kobo integer check (compare_at_kobo >= 0),
  currency      text not null default 'NGN',
  stock         integer not null default 0,
  active        boolean not null default true,
  -- common spec fields for solar products
  wattage_w     integer,
  capacity_ah   integer,
  voltage_v     integer,
  warranty_yrs  integer,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists products_category_idx on public.products(category_id);
create index if not exists products_active_idx   on public.products(active);

-- ---------- product images ----------
create table if not exists public.product_images (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid not null references public.products(id) on delete cascade,
  url         text not null,
  alt         text,
  position    integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists product_images_product_idx on public.product_images(product_id);

-- ---------- cart (per user) ----------
create table if not exists public.cart_items (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  product_id  uuid not null references public.products(id) on delete cascade,
  quantity    integer not null check (quantity > 0),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id, product_id)
);

create index if not exists cart_items_user_idx on public.cart_items(user_id);

-- ---------- orders ----------
create table if not exists public.orders (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references auth.users(id) on delete set null,
  email                 text not null,
  status                text not null default 'pending'
                        check (status in ('pending','paid','failed','shipped','delivered','cancelled')),
  subtotal_kobo         integer not null,
  shipping_kobo         integer not null default 0,
  total_kobo            integer not null,
  currency              text not null default 'NGN',
  -- shipping address snapshot
  ship_full_name        text,
  ship_phone            text,
  ship_address_line1    text,
  ship_address_line2    text,
  ship_city             text,
  ship_state            text,
  ship_postal_code      text,
  ship_country          text default 'Nigeria',
  -- paystack
  paystack_reference    text unique,
  paystack_authorization_url text,
  paid_at               timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists orders_user_idx    on public.orders(user_id);
create index if not exists orders_status_idx  on public.orders(status);
create index if not exists orders_ref_idx     on public.orders(paystack_reference);

create table if not exists public.order_items (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null references public.orders(id) on delete cascade,
  product_id    uuid references public.products(id) on delete set null,
  -- snapshot of product info at purchase time
  name          text not null,
  unit_kobo     integer not null,
  quantity      integer not null check (quantity > 0),
  line_kobo     integer not null,
  created_at    timestamptz not null default now()
);

create index if not exists order_items_order_idx on public.order_items(order_id);

-- ---------- payment events (webhook audit) ----------
create table if not exists public.payment_events (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid references public.orders(id) on delete set null,
  reference     text,
  event         text not null,
  payload       jsonb,
  created_at    timestamptz not null default now()
);

create index if not exists payment_events_ref_idx on public.payment_events(reference);
create index if not exists payment_events_order_idx on public.payment_events(order_id);

-- ---------- updated_at triggers ----------
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated before update on public.profiles
  for each row execute function public.tg_set_updated_at();

drop trigger if exists trg_products_updated on public.products;
create trigger trg_products_updated before update on public.products
  for each row execute function public.tg_set_updated_at();

drop trigger if exists trg_cart_items_updated on public.cart_items;
create trigger trg_cart_items_updated before update on public.cart_items
  for each row execute function public.tg_set_updated_at();

drop trigger if exists trg_orders_updated on public.orders;
create trigger trg_orders_updated before update on public.orders
  for each row execute function public.tg_set_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles       enable row level security;
alter table public.categories     enable row level security;
alter table public.products       enable row level security;
alter table public.product_images enable row level security;
alter table public.cart_items     enable row level security;
alter table public.orders         enable row level security;
alter table public.order_items    enable row level security;
alter table public.payment_events enable row level security;

-- helper: is current user admin
create or replace function public.is_admin(uid uuid)
returns boolean language sql stable as $$
  select coalesce((select is_admin from public.profiles where id = uid), false);
$$;

-- ---------- profiles policies ----------
drop policy if exists "profiles self read"   on public.profiles;
drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self read"   on public.profiles
  for select using (auth.uid() = id);
create policy "profiles self update" on public.profiles
  for update using (auth.uid() = id);

-- ---------- categories / products / product_images: public read ----------
drop policy if exists "categories public read"      on public.categories;
drop policy if exists "products public read"        on public.products;
drop policy if exists "product_images public read"  on public.product_images;
create policy "categories public read"     on public.categories     for select using (true);
create policy "products public read"       on public.products       for select using (true);
create policy "product_images public read" on public.product_images for select using (true);

-- admin write
drop policy if exists "categories admin write"      on public.categories;
drop policy if exists "products admin write"        on public.products;
drop policy if exists "product_images admin write"  on public.product_images;
create policy "categories admin write"     on public.categories
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy "products admin write"       on public.products
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy "product_images admin write" on public.product_images
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ---------- cart_items ----------
drop policy if exists "cart_items self" on public.cart_items;
create policy "cart_items self" on public.cart_items
  for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------- orders / order_items ----------
drop policy if exists "orders self read"      on public.orders;
drop policy if exists "orders self insert"    on public.orders;
drop policy if exists "orders admin all"      on public.orders;
drop policy if exists "order_items self read" on public.order_items;
drop policy if exists "order_items self ins"  on public.order_items;
drop policy if exists "order_items admin"     on public.order_items;

create policy "orders self read" on public.orders
  for select using (auth.uid() = user_id or public.is_admin(auth.uid()));
create policy "orders self insert" on public.orders
  for insert with check (auth.uid() = user_id or user_id is null);
create policy "orders admin all" on public.orders
  for update using (public.is_admin(auth.uid()));

create policy "order_items self read" on public.order_items
  for select using (
    exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin(auth.uid())))
  );
create policy "order_items self ins" on public.order_items
  for insert with check (
    exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or user_id is null))
  );
create policy "order_items admin" on public.order_items
  for update using (public.is_admin(auth.uid()));

-- payment_events: admin only
drop policy if exists "payment_events admin" on public.payment_events;
create policy "payment_events admin" on public.payment_events
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ============================================================
-- seed categories
-- ============================================================
insert into public.categories (slug, name, description) values
  ('batteries',   'Batteries',   'Lithium, gel and deep-cycle solar batteries.'),
  ('inverters',   'Inverters',   'Pure sine wave and hybrid solar inverters.'),
  ('panels',      'Solar Panels','Monocrystalline and polycrystalline PV modules.'),
  ('charge-controllers', 'Charge Controllers', 'PWM and MPPT solar charge controllers.'),
  ('accessories', 'Accessories', 'Cables, mounts, breakers and installation accessories.')
on conflict (slug) do nothing;


-- >>> END: 0001_init_store.sql <<<

-- >>> START: 0002_seed_products.sql <<<

-- ============================================================
-- Seed solar product catalog (run after 0001_init_store.sql)
-- ============================================================

do $$
declare
  cat_batteries uuid;
  cat_inverters uuid;
  cat_panels    uuid;
  cat_controllers uuid;
  cat_accessories uuid;

  p_id uuid;
begin
  select id into cat_batteries   from public.categories where slug = 'batteries';
  select id into cat_inverters   from public.categories where slug = 'inverters';
  select id into cat_panels      from public.categories where slug = 'panels';
  select id into cat_controllers from public.categories where slug = 'charge-controllers';
  select id into cat_accessories from public.categories where slug = 'accessories';

  -- 1. Lithium battery
  insert into public.products (slug, name, brand, short_desc, description, category_id,
    price_kobo, compare_at_kobo, currency, stock, active, wattage_w, capacity_ah, voltage_v, warranty_yrs)
  values ('damex-5kwh-lifepo4', 'Damex 5kWh LiFePO4 Battery', 'Damex',
    '5kWh wall-mount lithium battery, 51.2V, 6000+ cycles.',
    'Damex 5kWh LiFePO4 battery with built-in BMS, overcharge and over-discharge protection. Ideal for home solar backup and small commercial loads.',
    cat_batteries, 1450000, 1700000, 'NGN', 18, true, null, 100, 51, 7)
  returning id into p_id;
  insert into public.product_images (product_id, url, alt, position) values
    (p_id, 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=wall%20mounted%20lithium%20battery%205kWh%20LiFePO4%20sleek%20white%20cabinet%20solar%20backup%20unit%20studio%20product%20shot%20soft%20shadow%20neutral%20background&image_size=square_hd', 'Damex 5kWh LiFePO4 battery', 0);

  -- 2. Gel battery
  insert into public.products (slug, name, brand, short_desc, description, category_id,
    price_kobo, currency, stock, active, capacity_ah, voltage_v, warranty_yrs)
  values ('solar-200ah-gel-battery', 'Solar 200Ah Gel Battery', 'Green Sunsure',
    'Maintenance-free deep-cycle gel battery, 12V, 200Ah.',
    'Reliable 200Ah gel battery suitable for inverters and solar systems. Maintenance-free, low self-discharge, long service life.',
    cat_batteries, 380000, 'NGN', 32, true, 200, 12, 3)
  returning id into p_id;
  insert into public.product_images (product_id, url, alt, position) values
    (p_id, 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=industrial%20deep%20cycle%20gel%20battery%20200Ah%20black%20casing%20solar%20energy%20storage%20clean%20studio%20product%20photo%20white%20background&image_size=square_hd', '200Ah gel battery', 0);

  -- 3. Hybrid inverter
  insert into public.products (slug, name, brand, short_desc, description, category_id,
    price_kobo, compare_at_kobo, currency, stock, active, wattage_w, voltage_v, warranty_yrs)
  values ('hybrid-5kva-inverter', 'Green Sunsure 5KVA Hybrid Inverter', 'Green Sunsure',
    '5KVA pure sine wave hybrid solar inverter, 48V.',
    '5KVA/5KW hybrid inverter with MPPT solar charger, supports parallel operation, WiFi monitoring, configurable charge priority.',
    cat_inverters, 950000, 1100000, 'NGN', 14, true, 5000, 48, 3)
  returning id into p_id;
  insert into public.product_images (product_id, url, alt, position) values
    (p_id, 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20hybrid%20solar%20inverter%205KVA%20with%20LCD%20display%20matte%20black%20metal%20casing%20product%20photo%20white%20background&image_size=square_hd', 'Hybrid 5KVA inverter', 0);

  -- 4. Pure sine wave inverter
  insert into public.products (slug, name, brand, short_desc, description, category_id,
    price_kobo, currency, stock, active, wattage_w, voltage_v, warranty_yrs)
  values ('puresine-2kva-inverter', 'PureSine 2KVA Inverter', 'Green Sunsure',
    '2KVA pure sine wave inverter, 24V, low idle draw.',
    'Compact 2KVA pure sine wave inverter for home and office loads. Built-in charger, smart fan, surge protection.',
    cat_inverters, 320000, 'NGN', 22, true, 2000, 24, 2)
  returning id into p_id;
  insert into public.product_images (product_id, url, alt, position) values
    (p_id, 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=2KVA%20pure%20sine%20wave%20inverter%20unit%20compact%20silver%20metal%20casing%20with%20display%20studio%20product%20shot%20white%20background&image_size=square_hd', 'Pure sine 2KVA inverter', 0);

  -- 5. Solar panel
  insert into public.products (slug, name, brand, short_desc, description, category_id,
    price_kobo, currency, stock, active, wattage_w, voltage_v, warranty_yrs)
  values ('mono-450w-panel', 'MonoX 450W Solar Panel', 'MonoX',
    'Mono-crystalline 450W half-cut solar panel, Tier-1 cells.',
    'High-efficiency 450W monocrystalline solar panel with half-cut cell technology. Excellent low-light performance, 25-year linear power warranty.',
    cat_panels, 145000, 'NGN', 60, true, 450, 48, 25)
  returning id into p_id;
  insert into public.product_images (product_id, url, alt, position) values
    (p_id, 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=solar%20panel%20450W%20monocrystalline%20photovoltaic%20module%20on%20rooftop%20clean%20product%20shot%20with%20blue%20sky%20background&image_size=square_hd', 'Mono 450W panel', 0);

  -- 6. Smaller panel
  insert into public.products (slug, name, brand, short_desc, description, category_id,
    price_kobo, currency, stock, active, wattage_w, voltage_v, warranty_yrs)
  values ('poly-200w-panel', 'PolyLite 200W Solar Panel', 'PolyLite',
    '200W polycrystalline panel for small systems and DC loads.',
    'Budget-friendly 200W polycrystalline solar panel, ideal for lighting, small pumps, and DC fridges.',
    cat_panels, 70000, 'NGN', 40, true, 200, 24, 15)
  returning id into p_id;
  insert into public.product_images (product_id, url, alt, position) values
    (p_id, 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=small%20200W%20polycrystalline%20solar%20panel%20lying%20on%20ground%20product%20photo%20clean%20white%20background&image_size=square_hd', 'Poly 200W panel', 0);

  -- 7. MPPT controller
  insert into public.products (slug, name, brand, short_desc, description, category_id,
    price_kobo, currency, stock, active, wattage_w, voltage_v, warranty_yrs)
  values ('mppt-60a-controller', 'Green Sunsure 60A MPPT Charge Controller', 'Green Sunsure',
    '60A MPPT solar charge controller, 12/24/48V auto.',
    'High-efficiency 60A MPPT charge controller with LCD, multi-stage charging, temperature compensation.',
    cat_controllers, 220000, 'NGN', 25, true, null, 48, 2)
  returning id into p_id;
  insert into public.product_images (product_id, url, alt, position) values
    (p_id, 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=MPPT%20solar%20charge%20controller%2060A%20with%20LCD%20display%20industrial%20design%20product%20photo%20white%20background&image_size=square_hd', '60A MPPT controller', 0);

  -- 8. DC breaker
  insert into public.products (slug, name, brand, short_desc, description, category_id,
    price_kobo, currency, stock, active, voltage_v)
  values ('dc-breaker-63a', 'DC Circuit Breaker 63A', 'Green Sunsure',
    '63A DC circuit breaker for solar PV string protection.',
    '63A double-pole DC breaker, 500V, lockable handle, DIN-rail mount.',
    cat_accessories, 35000, 'NGN', 100, true, 500)
  returning id into p_id;
  insert into public.product_images (product_id, url, alt, position) values
    (p_id, 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=DC%20circuit%20breaker%2063A%20industrial%20DIN%20rail%20mount%20product%20shot%20clean%20white%20background&image_size=square_hd', 'DC breaker 63A', 0);
end $$;


-- >>> END: 0002_seed_products.sql <<<

-- >>> START: 0003_projects_blog_leads.sql <<<

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


-- >>> END: 0003_projects_blog_leads.sql <<<

-- >>> START: 0004_seed_projects_and_posts.sql <<<

-- ============================================================
-- Seed initial projects, blog posts from the rebuild's draft
-- content. Run after 0003_projects_blog_leads.sql.
-- ============================================================

do $$
declare
  p_id uuid;
begin
  -- 1. Residential roof installation
  insert into public.projects (
    slug, title, category, client_type, location, system_size, panels, batteries, inverter,
    installation, outcome, excerpt, body, cover_image, gallery, featured, position, published_at
  ) values (
    'residential-roof-installation',
    'Residential roof installation',
    'Homes',
    'Residential',
    'Sagamu, Ogun State',
    '5kVA hybrid + 10kWh battery',
    '6 × 450W monocrystalline panels',
    '2 × 5kWh LiFePO4',
    '5kVA hybrid inverter with MPPT',
    '2 days',
    'Cut monthly generator spend by ~70% and gained ~12 hours of backup on essential loads.',
    'Roof-mounted solar designed for dependable household backup and reduced generator dependence.',
    '## The challenge
The client was spending heavily on petrol to run a small generator for fans, lighting, and a fridge, with frequent grid outages during the week.

## What we installed
A 5kVA hybrid inverter paired with two 5kWh lithium batteries and six 450W monocrystalline panels mounted on the existing roof. Charge priority is set to solar-first, grid-second, and generator-last.

## The result
The household now runs lights, TV, fans, and fridge on solar for most of the day, with seamless switchover to battery backup during outages. Monthly fuel spend dropped by roughly 70% in the first month.',
    '/hero-1.jpg',
    jsonb_build_array(
      jsonb_build_object('url','/hero-1.jpg','alt','Roof-mounted solar array on a residential home','position',0),
      jsonb_build_object('url','/solar-install-1.jpg','alt','Panels being aligned and clamped to roof rails','position',1)
    ),
    true, 1, now()
  )
  returning id into p_id;

  -- 2. Commercial building solar
  insert into public.projects (
    slug, title, category, client_type, location, system_size, panels, batteries, inverter,
    installation, outcome, excerpt, body, cover_image, gallery, featured, position, published_at
  ) values (
    'commercial-building-solar',
    'Commercial building solar',
    'Business',
    'SME / Office',
    'Ibafo, Ogun State',
    '15kVA three-phase hybrid + 30kWh battery bank',
    '20 × 450W monocrystalline panels',
    '6 × 5kWh LiFePO4 batteries',
    '15kVA three-phase hybrid inverter',
    '4 days',
    'Eliminated daytime diesel use and improved uptime for staff and refrigeration.',
    'Business power systems built to reduce diesel spend and keep operations productive during outages.',
    '## The challenge
A growing SME was running a 30kVA diesel generator for ~10 hours a day to keep the office, refrigeration, and POS systems online. Diesel costs were eating into margins.

## What we installed
A 15kVA three-phase hybrid system with 30kWh of lithium storage and a 9kW PV array. The system is configured to prioritise solar during the day and use the grid as a backup, with the generator now reserved for emergencies only.

## The result
Daytime generator use is essentially zero, and the business has not had a refrigeration outage in the months since commissioning. Staff report a noticeably quieter, cooler working environment.',
    '/solar-install-1.jpg',
    jsonb_build_array(
      jsonb_build_object('url','/solar-install-1.jpg','alt','Commercial rooftop solar installation','position',0),
      jsonb_build_object('url','/solar-inspect.jpg','alt','Technician inspecting combiner box on a commercial array','position',1)
    ),
    true, 2, now()
  )
  returning id into p_id;

  -- 3. Industrial facility backup
  insert into public.projects (
    slug, title, category, client_type, location, system_size, panels, batteries, inverter,
    installation, outcome, excerpt, body, cover_image, gallery, featured, position, published_at
  ) values (
    'industrial-facility-backup',
    'Industrial facility backup',
    'Industrial',
    'Manufacturing / Cold storage',
    'Ado-Odo / Ota, Ogun State',
    '30kVA hybrid + 60kWh battery bank',
    '40 × 450W monocrystalline panels',
    '12 × 5kWh LiFePO4 batteries',
    '30kVA hybrid inverter with parallel capability',
    '5 days',
    'Cold storage stayed online through a multi-day outage with zero product loss.',
    'Higher-capacity solar and inverter planning for facilities that need stable energy and fast support.',
    '## The challenge
A cold-storage facility could not afford a single hour of downtime. The existing backup strategy was a diesel generator with several minutes of transfer time, which is risky for compressors.

## What we installed
A 30kVA hybrid system with a 60kWh LiFePO4 battery bank for instant switchover, paired with a 18kW rooftop PV array. The system is monitored remotely so the Green Sunsure team can flag issues before they become downtime.

## The result
During a recent multi-day outage, the facility ran entirely on the hybrid system with no product loss and no manual intervention. The client now treats solar as their primary daytime source.',
    '/solar-inspect.jpg',
    jsonb_build_array(
      jsonb_build_object('url','/solar-inspect.jpg','alt','Industrial-scale solar array inspection','position',0),
      jsonb_build_object('url','/solar-install-2.jpg','alt','Open-area ground-mounted solar installation','position',1)
    ),
    true, 3, now()
  )
  returning id into p_id;

  -- 4. Open field solar array
  insert into public.projects (
    slug, title, category, client_type, location, system_size, panels, batteries, inverter,
    installation, outcome, excerpt, body, cover_image, gallery, featured, position, published_at
  ) values (
    'open-field-solar-array',
    'Open field solar array',
    'Scale',
    'Estate / Ground-mount',
    'Imowo, Ogun State',
    '20kVA + 40kWh ground-mounted array',
    '30 × 450W monocrystalline panels',
    '8 × 5kWh LiFePO4 batteries',
    '20kVA hybrid inverter',
    '4 days',
    'Reduced daytime grid consumption to nearly zero and provided full evening backup.',
    'Ground and open-area installations for larger loads, farms, facilities, and commercial sites.',
    '## The challenge
A residential estate with a large compound needed a system to cover daytime loads and provide long evening backup without depending on the noisy, expensive generator.

## What we installed
A ground-mounted 13.5kW PV array paired with a 20kVA hybrid inverter and 40kWh of LiFePO4 storage. We sized cable runs for the longer distance and added a weatherproof combiner box.

## The result
The estate now operates almost entirely on solar during daylight, with battery backup carrying the property through the evening. The generator has not been used in months.',
    '/solar-install-2.jpg',
    jsonb_build_array(
      jsonb_build_object('url','/solar-install-2.jpg','alt','Ground-mounted solar array on open land','position',0),
      jsonb_build_object('url','/hero-2.jpg','alt','Wide view of installed solar infrastructure','position',1)
    ),
    false, 4, now()
  )
  returning id into p_id;
end $$;

-- ============================================================
-- Blog posts (carry over the two existing posts + new ones)
-- ============================================================

insert into public.posts (slug, title, category, excerpt, body, cover_image, author_name, reading_minutes, active, published_at) values
(
  '5-non-negotiable-questions-to-ask-before-you-pay',
  '5 non-negotiable questions to ask before you pay',
  'Info',
  'Choosing the right solar installer starts with the questions you ask before paying for your home or business system.',
  '## 1. What exactly is included in the quote?
A good quote breaks down panels, inverter, batteries, mounting, protection, cabling, and installation labour separately. If you cannot see the line items, you cannot compare offers fairly.

## 2. Who handles warranty, and for how long?
Ask who honours the panel warranty, the inverter warranty, and the installation workmanship warranty. The cheapest quote often leaves you chasing three different companies when something goes wrong.

## 3. What happens during grid outage?
Make sure the system is configured for the kind of backup you actually need — full home backup, essential-loads only, or just daytime offset. A hybrid inverter with a battery bank handles all three.

## 4. Is the installer certified and insured?
Ask for proof of relevant electrical certifications and installation insurance. It protects you and your property if anything goes wrong on site.

## 5. What does post-installation support look like?
The system should come with monitoring access, a clear fault-reporting path, and a maintenance schedule. A solar system is a 20-year asset — the support model matters as much as the equipment.',
  '/solar-inspect.jpg',
  'Green Sunsure Team',
  5,
  true,
  '2025-12-10T00:00:00Z'
),
(
  'the-business-case-for-solar',
  'The business case for solar in Nigeria',
  'Business',
  'For Nigerian SMEs, energy costs affect margins daily. Solar can shift fuel spend into a predictable long-term asset.',
  '## The cost of doing nothing
Most SMEs we speak with spend between ₦200,000 and ₦1.5m per month on diesel or petrol to keep operations running. That spend is volatile: pump prices change, fuel scarcity returns, and downtime cuts into revenue.

## What changes with solar
A well-sized commercial solar system with battery storage:
- Replaces the largest share of daytime diesel use
- Provides instant switchover to battery during outages
- Locks in energy costs for the life of the system (20+ years for panels)
- Improves working conditions (quieter, cooler, more reliable)

## The simple math
If you currently spend ₦600,000/month on fuel, and a properly sized system eliminates ~70% of that, the system typically pays for itself in 2–4 years. The remaining 16+ years of useful life are almost pure savings.

## What to ask
A useful quote should model your actual usage, not just square-meterage of roof. We always start with a load assessment before sizing a system.',
  '/solar-install-2.jpg',
  'Green Sunsure Team',
  6,
  true,
  '2025-12-10T00:00:00Z'
),
(
  'how-much-solar-do-i-need',
  'How much solar do I need for a 3-bedroom home?',
  'Tips',
  'A practical sizing guide for Nigerian homes, with worked examples and the questions to ask before you pay.',
  '## The quick answer
Most 3-bedroom homes in Nigeria land between 3kVA and 5kVA of inverter capacity, paired with 5–10kWh of battery storage and 4–8 solar panels. That covers essential loads (lights, fans, fridge, TV, phone charging) for 8–14 hours.

## The longer answer
The honest answer depends on four things:
1. **Which loads you want to run** — a fridge uses more than you think.
2. **How long you need backup** — overnight vs. multi-day.
3. **Your daytime usage** — daytime solar offsets grid use.
4. **Your budget** — lithium is more expensive upfront, but cheaper per cycle.

## A worked example
A typical 3-bedroom home with fridge, 4 fans, 10 LED bulbs, 1 TV, 1 decoder, and phone charging:
- Daily energy: ~6–8 kWh
- Recommended inverter: 5kVA hybrid
- Recommended battery: 10kWh LiFePO4
- Recommended panels: 6 × 450W (2.7kW array)

## Before you pay
Always request a written load assessment, not a guess. The biggest mistake we see is buying a system based on neighbour comparison instead of actual usage.',
  '/hero-1.jpg',
  'Green Sunsure Team',
  4,
  true,
  '2025-12-15T00:00:00Z'
),
(
  'solar-vs-generator-cost',
  'Solar vs generator: a 5-year cost comparison',
  'Tips',
  'A side-by-side cost comparison for a typical Nigerian home, with the assumptions laid out plainly.',
  '## The setup we compared
A 3-bedroom home running essential loads (fridge, fans, lights, TV) for an average of 10 hours of generator use per day.

## Generator (5kVA petrol)
- Fuel: ~₦45,000/month at current pump prices
- Maintenance: oil, spark plugs, servicing: ~₦80,000/year
- 5-year total: ~₦3.1m

## Solar (5kVA hybrid + 10kWh + 6 panels)
- Equipment + installation: ~₦2.6m
- Maintenance: ~₦30,000/year
- Battery replacement: ~₦0 (LiFePO4 warranted for 7+ years)
- 5-year total: ~₦2.75m

## The break-even
Solar pays for itself in roughly 2–3 years for this profile. After that, every month is a saving.

## The non-financial win
Generators are loud, vibrate the house, and produce fumes. Solar is silent, has no moving parts in the daily use cycle, and is monitored from your phone.',
  '/hero-2.jpg',
  'Green Sunsure Team',
  5,
  true,
  '2025-12-20T00:00:00Z'
);


-- >>> END: 0004_seed_projects_and_posts.sql <<<

-- >>> START: 0005_update_blog_posts.sql <<<

-- Update blog posts with real content and cover images from the old website.

update public.posts set
  title = '5 Non-Negotiable Questions to Ask Before You Pay',
  cover_image = '/blog-questions.jpg',
  excerpt = 'Choosing the right solar installer starts with the questions you ask before paying for your home or business system. Here are the five non-negotiable questions you must ask any potential solar installer before signing a contract.',
  body = $$## Choosing the Right Solar Installer: 5 Non-Negotiable Questions to Ask Before You Pay

Investing in a solar power system for your home or business is a significant financial decision. In Nigeria, where reliable power is paramount, your system's performance relies entirely on the quality of its components and, most importantly, the expertise of your installer.

Unfortunately, the market is crowded with providers offering quick fixes and cheap components. Choosing the wrong solar company can lead to poor performance, frequent breakdowns, and a voided warranty.

To protect your investment and guarantee decades of reliable power, you must perform due diligence. Here are the five non-negotiable questions you must ask any potential solar installer before signing a contract.

## 1. Are You Certified, Insured, and Registered?

This is the fundamental question of legitimacy and liability. A professional installer operates with accountability and adherence to industry best practices.

**What to Look For:**

- **Regulatory Registration:** Is the company registered with the Corporate Affairs Commission (CAC) and relevant energy regulatory bodies in Nigeria?
- **Certification:** Do their installation teams hold verifiable technical training and certifications (e.g., in electrical engineering, solar specific training)?
- **Insurance:** Do they carry adequate insurance (General Liability and Workers' Compensation)? This is critical. If an accident occurs on your property during installation, you want the installer's insurance, not your own, to cover the costs.

> **Pro Tip:** Never work with an installer that cannot provide proof of liability insurance. This protects you from unforeseen damage or accidents during the process.

## 2. What is Your Exact System Design Methodology?

A reliable solar system is built on data, not guesswork. A low quote often means the installer is using generic sizing, which leads to a system that fails to meet your needs or damages your batteries prematurely.

The installer must conduct a comprehensive Load Audit (or energy assessment).

**Key Design Questions:**

- **Energy Audit:** Will you measure my appliance wattage and run-time, or are you just guessing based on the number of bedrooms?
- **Component Matching:** How do you ensure the solar panels, inverter, and battery bank are perfectly matched to work together efficiently? (A weak inverter can damage a strong battery, and vice-versa.)
- **Shading and Angle:** How will you analyze potential shading throughout the year, and what angle will you set the panels to maximize energy yield specifically for my location?

A good installer will present a detailed technical proposal, often including a visual layout and a 24-hour load profile.

## 3. Which Specific Brands and Warranties Do You Provide?

The quality of components dictates the lifespan and efficiency of your system. You want durable equipment that can withstand the Nigerian heat and voltage fluctuations.

**The Component Check:**

- **Tier-1 Panels:** Are the solar panels Tier-1 rated? (These are independently verified for quality and long-term performance.) What is the 25-year performance warranty?
- **Inverter Quality:** Are the inverters pure sine wave and designed for constant heavy use? What is the manufacturer's warranty period on the inverter?
- **Battery Guarantee:** What is the depth of discharge (DoD) for the battery, and what is the warranted cycle life (the number of times it can be charged and discharged)?

Always insist on receiving copies of the manufacturer's warranties for all major components. These are your guarantee, and they must be honored by the manufacturer, not just the installer.

## 4. What is Included in Your After-Sales Service and Maintenance Plan?

Solar systems are long-term assets, and while they require minimal maintenance, things can go wrong. Poor installation companies disappear the moment they cash the cheque.

**Service and Support Questions:**

- **Installation Warranty:** How long is your workmanship guarantee, separate from the manufacturer's warranty?
- **Response Time:** If I have a system failure, what is your guaranteed response time for technical support?
- **Remote Monitoring:** Do you offer remote monitoring? (This allows the installer to diagnose most issues without a physical visit, saving you time and money.)
- **Annual Maintenance:** Do you offer a formalized annual maintenance package for cleaning, voltage checks, and performance optimization?

## 5. Can I Speak to Three Recent Commercial or Residential Clients?

Past performance is the best predictor of future reliability. Don't rely solely on testimonials posted on the company's website; request direct references.

**The Reference Check:**

- **Diversity of References:** Request references from clients with similar needs to yours (e.g., if you run a small factory, ask for a factory reference).
- **What to Ask the Client:** Inquire about the installer's punctuality, professionalism, adherence to the quoted price, and most importantly, their responsiveness to any issues after the installation was completed.

## Protect Your Investment, Demand Quality

Choosing the cheapest quote is often the most expensive mistake in the long run. By asking these five non-negotiable questions, you separate the reliable, professional solar companies from the risky, fly-by-night operators.

At Green Sunsure Energy, we pride ourselves on providing transparent answers to all these questions, backing our work with certified engineers, Tier-1 components, and industry-leading warranties. We are committed to powering Nigeria reliably and professionally.

Ready to work with Nigeria's most trusted solar experts? [Request your professional, no-obligation quote today](/contact-us).$$
where slug = '5-non-negotiable-questions-to-ask-before-you-pay';

update public.posts set
  title = 'The ROI of Solar for Nigerian Businesses',
  cover_image = '/blog-roi.jpg',
  excerpt = 'For Nigerian SMEs, energy costs affect margins daily. Solar can shift fuel spend into a predictable long-term asset. Learn how to calculate ROI, achieve cost savings, and boost operational efficiency.',
  body = $$## The Business Case for Solar: Achieving Operational Cost Savings and Guaranteed ROI for Nigerian SMEs

For any business in Nigeria, energy is often the single most unpredictable and expensive overhead. The constant reliance on diesel and petrol generators to bridge the grid deficit eats away at profit margins, creates operational chaos, and diverts capital that could be used for growth.

Solar power is no longer a "nice-to-have", it is a critical business necessity that guarantees energy continuity and provides a measurable, profitable Return on Investment (ROI). This detailed guide explains how Nigerian Small and Medium Enterprises (SMEs) can calculate their ROI, achieve significant cost savings, and boost operational efficiency by switching to commercial solar solutions.

## The Hidden Costs of Generator Dependency

Before diving into the solar solution, it's vital to understand the true financial bleed caused by traditional backup power sources.

### 1. Volatile Fuel Costs

The price of diesel and petrol is constantly rising and subject to global market volatility and local economic shifts. When your operational budget is tied to the price of fuel, your profits are unpredictable.

### 2. Maintenance and Depreciation

- **High Servicing Costs:** Generators require frequent oil changes, filter replacements, and specialized servicing.
- **Rapid Wear and Tear:** Running generators for 8-12 hours daily leads to rapid component degradation, increasing the frequency of expensive repairs.
- **Short Lifespan:** Commercial generators often need replacement or significant overhaul after just a few years of heavy use.

### 3. Operational Inefficiency

Noise pollution, air pollution, and the time spent managing fuel logistics all distract from core business functions. This inefficiency, while hard to quantify on a ledger, certainly impacts staff productivity and morale.

## How to Calculate the Return on Investment (ROI) for Commercial Solar

A commercial solar installation should be viewed as a productive asset, not an expense. The ROI calculation is straightforward, focusing on the Payback Period — the time it takes for your cumulative energy savings to equal the initial investment cost.

### Step 1: Determine Your Current Energy Cost (Baseline)

Calculate the total amount your business spends annually on electricity and generator operations:

Total Annual Energy Cost = (Annual Electricity Bill) + (Annual Diesel/Petrol Cost) + (Annual Generator Maintenance)

### Step 2: Determine the Solar System Investment

This is the total cost for the panels, inverter, mounting, batteries, and professional installation. This figure is fixed and represents your capital outlay.

### Step 3: Calculate Annual Solar Savings

A well-sized solar system will drastically reduce or eliminate both your grid electricity consumption and your generator usage. Your Annual Savings are the amount of money you no longer have to spend on those sources.

### Step 4: Determine the Payback Period

The Payback Period (in years) is calculated as follows:

Payback Period (Years) = (Total Solar Investment) / (Annual Solar Savings)

**Industry Insight:** For many Nigerian SMEs heavily reliant on generators, the payback period is often surprisingly short, typically 3 to 5 years. After this period, the energy generated by your system is essentially free, driving pure profit directly to your bottom line for the next two decades.

## Beyond Savings: Strategic Advantages for Commercial Solar

The benefits of solar extend far beyond cost reduction, giving businesses a distinct competitive edge.

### 1. Guaranteed Business Continuity

For critical operations, whether it's running cold storage, operating servers, maintaining security systems, or powering manufacturing lines, downtime is measured in lost revenue. Solar with high-capacity battery storage provides true redundancy, ensuring zero-downtime, maximum productivity, and predictable operational hours.

### 2. Enhanced Brand and Corporate Image

In an era of increasing environmental awareness, adopting solar power demonstrates a commitment to sustainability and corporate social responsibility (CSR). This enhances your brand reputation, appealing to eco-conscious consumers and potential partners.

### 3. Predictable Cash Flow Management

By fixing a significant portion of your energy costs into a one-time capital expense, you remove the volatile element of fuel and electricity tariffs from your monthly budget. This allows for far more accurate financial forecasting and investment planning.

### 4. Higher Asset Valuation and Security

A commercial property with a robust, paid-for solar installation is significantly more valuable on the market. It is a long-term asset that reduces the operational burden for any future owner or tenant.

## Getting Started: Your Custom Solar Solution

Every business is unique. We begin the process with a Comprehensive Energy Audit to ensure your system is perfectly sized to meet peak demand without over-sizing the components.

- **Load Analysis:** Detailed assessment of your appliances, machinery, and daily consumption patterns.
- **System Design:** Creating a customized plan (hybrid, off-grid, or grid-tied) that optimizes panel placement and battery capacity.
- **Installation & Commissioning:** Professional installation by certified engineers to ensure maximum safety and efficiency.

Stop pouring profits into your generator tank. Now is the time to turn your greatest operational challenge — energy — into a reliable, cost-saving asset.

At Green Sunsure Energy, we provide bankable, industrial-grade solar solutions designed to deliver guaranteed ROI for Nigerian businesses. [Contact us](/contact-us) today to schedule your commercial energy audit and receive a customized ROI projection for your business.$$
where slug = 'the-business-case-for-solar';


-- >>> END: 0005_update_blog_posts.sql <<<

-- >>> START: 0006_storage_product_images.sql <<<

-- ============================================================
-- product image storage
-- Public bucket for product images + read policy. Writes go
-- through the service_role admin client (RLS bypassed), so we
-- only need a public READ policy here.
-- ============================================================

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "product-images public read" on storage.objects;
create policy "product-images public read"
  on storage.objects
  for select
  using (bucket_id = 'product-images');

drop policy if exists "product-images admin write" on storage.objects;
create policy "product-images admin write"
  on storage.objects
  for all
  using (bucket_id = 'product-images' and public.is_admin(auth.uid()))
  with check (bucket_id = 'product-images' and public.is_admin(auth.uid()));


-- >>> END: 0006_storage_product_images.sql <<<

-- >>> START: 0007_fix_damdavy_branding.sql <<<

-- Fix Damdavy branding to Green Sunsure (for DBs already seeded with 0002/0004/0005)
update public.products set brand = 'Green Sunsure' where brand = 'Damdavy';
update public.products set name = replace(name, 'Damdavy', 'Green Sunsure') where name like '%Damdavy%';
update public.products set short_desc = replace(short_desc, 'Damdavy', 'Green Sunsure') where short_desc like '%Damdavy%';
update public.products set description = replace(description, 'Damdavy', 'Green Sunsure') where description like '%Damdavy%';

update public.posts set author_name = 'Green Sunsure Team' where author_name = 'Damdavy Team';
update public.posts set body = replace(body, 'Damdavy', 'Green Sunsure') where body like '%Damdavy%';
update public.posts set body = replace(body, 'damdavy', 'greensunsure') where body like '%damdavy%';

update public.projects set body = replace(body, 'Damdavy', 'Green Sunsure') where body like '%Damdavy%';


-- >>> END: 0007_fix_damdavy_branding.sql <<<

-- >>> START: 0008_fix_product_images.sql <<<

-- Replace ephemeral trae.ai image URLs with stable local /assets images
-- These local assets already exist in public/assets and are served via Next.js public folder

update public.product_images set url = '/assets/prod-station.jpg', alt = 'Green Sunsure 5kWh LiFePO4 battery'
where product_id = (select id from public.products where slug = 'damex-5kwh-lifepo4');

update public.product_images set url = '/assets/prod-light.jpg', alt = '200Ah gel battery'
where product_id = (select id from public.products where slug = 'solar-200ah-gel-battery');

update public.product_images set url = '/assets/prod-inverter.jpg', alt = 'Hybrid 5KVA inverter'
where product_id = (select id from public.products where slug = 'hybrid-5kva-inverter');

update public.product_images set url = '/assets/prod-inverter.jpg', alt = 'Pure sine 2KVA inverter'
where product_id = (select id from public.products where slug = 'puresine-2kva-inverter');

update public.product_images set url = '/assets/prod-panel.jpg', alt = 'Mono 450W solar panel'
where product_id = (select id from public.products where slug = 'mono-450w-panel');

update public.product_images set url = '/assets/prod-panel.jpg', alt = 'Poly 200W solar panel'
where product_id = (select id from public.products where slug = 'poly-200w-panel');

update public.product_images set url = '/assets/prod-fan.jpg', alt = '60A MPPT charge controller'
where product_id = (select id from public.products where slug = 'mppt-60a-controller');

update public.product_images set url = '/assets/prod-fence.jpg', alt = 'DC circuit breaker 63A'
where product_id = (select id from public.products where slug = 'dc-breaker-63a');


-- >>> END: 0008_fix_product_images.sql <<<

