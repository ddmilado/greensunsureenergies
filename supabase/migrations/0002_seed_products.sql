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
  values ('solar-200ah-gel-battery', 'Solar 200Ah Gel Battery', 'Damdavy',
    'Maintenance-free deep-cycle gel battery, 12V, 200Ah.',
    'Reliable 200Ah gel battery suitable for inverters and solar systems. Maintenance-free, low self-discharge, long service life.',
    cat_batteries, 380000, 'NGN', 32, true, 200, 12, 3)
  returning id into p_id;
  insert into public.product_images (product_id, url, alt, position) values
    (p_id, 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=industrial%20deep%20cycle%20gel%20battery%20200Ah%20black%20casing%20solar%20energy%20storage%20clean%20studio%20product%20photo%20white%20background&image_size=square_hd', '200Ah gel battery', 0);

  -- 3. Hybrid inverter
  insert into public.products (slug, name, brand, short_desc, description, category_id,
    price_kobo, compare_at_kobo, currency, stock, active, wattage_w, voltage_v, warranty_yrs)
  values ('hybrid-5kva-inverter', 'Damdavy 5KVA Hybrid Inverter', 'Damdavy',
    '5KVA pure sine wave hybrid solar inverter, 48V.',
    '5KVA/5KW hybrid inverter with MPPT solar charger, supports parallel operation, WiFi monitoring, configurable charge priority.',
    cat_inverters, 950000, 1100000, 'NGN', 14, true, 5000, 48, 3)
  returning id into p_id;
  insert into public.product_images (product_id, url, alt, position) values
    (p_id, 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20hybrid%20solar%20inverter%205KVA%20with%20LCD%20display%20matte%20black%20metal%20casing%20product%20photo%20white%20background&image_size=square_hd', 'Hybrid 5KVA inverter', 0);

  -- 4. Pure sine wave inverter
  insert into public.products (slug, name, brand, short_desc, description, category_id,
    price_kobo, currency, stock, active, wattage_w, voltage_v, warranty_yrs)
  values ('puresine-2kva-inverter', 'PureSine 2KVA Inverter', 'Damdavy',
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
  values ('mppt-60a-controller', 'Damdavy 60A MPPT Charge Controller', 'Damdavy',
    '60A MPPT solar charge controller, 12/24/48V auto.',
    'High-efficiency 60A MPPT charge controller with LCD, multi-stage charging, temperature compensation.',
    cat_controllers, 220000, 'NGN', 25, true, null, 48, 2)
  returning id into p_id;
  insert into public.product_images (product_id, url, alt, position) values
    (p_id, 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=MPPT%20solar%20charge%20controller%2060A%20with%20LCD%20display%20industrial%20design%20product%20photo%20white%20background&image_size=square_hd', '60A MPPT controller', 0);

  -- 8. DC breaker
  insert into public.products (slug, name, brand, short_desc, description, category_id,
    price_kobo, currency, stock, active, voltage_v)
  values ('dc-breaker-63a', 'DC Circuit Breaker 63A', 'Damdavy',
    '63A DC circuit breaker for solar PV string protection.',
    '63A double-pole DC breaker, 500V, lockable handle, DIN-rail mount.',
    cat_accessories, 35000, 'NGN', 100, true, 500)
  returning id into p_id;
  insert into public.product_images (product_id, url, alt, position) values
    (p_id, 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=DC%20circuit%20breaker%2063A%20industrial%20DIN%20rail%20mount%20product%20shot%20clean%20white%20background&image_size=square_hd', 'DC breaker 63A', 0);
end $$;
