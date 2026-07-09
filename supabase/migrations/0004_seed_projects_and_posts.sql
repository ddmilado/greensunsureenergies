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
A 30kVA hybrid system with a 60kWh LiFePO4 battery bank for instant switchover, paired with a 18kW rooftop PV array. The system is monitored remotely so the Damdavy team can flag issues before they become downtime.

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
  'Damdavy Team',
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
  'Damdavy Team',
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
  'Damdavy Team',
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
  'Damdavy Team',
  5,
  true,
  '2025-12-20T00:00:00Z'
);
