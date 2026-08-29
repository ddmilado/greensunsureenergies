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
