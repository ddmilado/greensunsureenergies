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
