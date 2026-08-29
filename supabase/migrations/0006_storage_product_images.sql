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
