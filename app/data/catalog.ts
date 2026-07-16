export const categories = [
  { id: "cat-1", slug: "solar-panels", name: "Solar Panels", description: "High-efficiency monocrystalline solar panels." },
  { id: "cat-2", slug: "batteries", name: "Batteries", description: "Deep cycle tubular and lithium solar batteries." },
  { id: "cat-3", slug: "inverters", name: "Inverters", description: "Pure sine wave hybrid and off-grid inverters." },
  { id: "cat-4", slug: "solar-lighting", name: "Solar Lighting", description: "Outdoor solar street lights and lighting systems." },
  { id: "cat-5", slug: "accessories", name: "Accessories", description: "Solar power banks, standing fans, and fence lights." },
  { id: "cat-6", slug: "mounting-systems", name: "Mounting Systems", description: "Mounting rails, PTZ cameras, and installation brackets." },
];

export const products = [
  {
    id: "prod-1",
    slug: "ptz-solar-camera",
    name: "PTZ SOLAR CAMERA",
    brand: "Generic",
    short_desc: "Powered 4G simcard PTZ CCTV wireless camera",
    price_kobo: 12000000, // ₦120,000
    compare_at_kobo: 13500000,
    currency: "NGN",
    stock: 10,
    active: true,
    category_id: "cat-6", // Mounting Systems
    wattage_w: 10,
    capacity_ah: 0,
    voltage_v: 12,
    warranty_yrs: 1,
    images: [{ url: "/assets/prod-camera.jpg", alt: "PTZ SOLAR CAMERA", position: 1 }]
  },
  {
    id: "prod-2",
    slug: "30w-generator-6-bulbs",
    name: "30W Generator with 6 Bulbs",
    brand: "Generic",
    short_desc: "30 watts Solar generator with 6 bulbs",
    price_kobo: 18000000, // ₦180,000
    compare_at_kobo: 19500000,
    currency: "NGN",
    stock: 5,
    active: true,
    category_id: "cat-4", // Solar Lighting
    wattage_w: 30,
    capacity_ah: 0,
    voltage_v: 12,
    warranty_yrs: 1,
    images: [{ url: "/assets/prod-gen.jpg", alt: "30w generator with 6 bulbs", position: 1 }]
  },
  {
    id: "prod-3",
    slug: "solar-lighting-system",
    name: "Solar Lighting System",
    brand: "Generic",
    short_desc: "Powerful solar lighting system with all-day PowerBank, FM radio, 3 bulbs",
    price_kobo: 4000000, // ₦40,000
    compare_at_kobo: 4500000,
    currency: "NGN",
    stock: 15,
    active: true,
    category_id: "cat-4", // Solar Lighting
    wattage_w: 15,
    capacity_ah: 10,
    voltage_v: 6,
    warranty_yrs: 1,
    images: [{ url: "/assets/prod-light.jpg", alt: "Solar lighting system", position: 1 }]
  },
  {
    id: "prod-4",
    slug: "500w-portable-solar-station",
    name: "500W Portable Solar Station",
    brand: "Generic",
    short_desc: "500W portable solar station, 512wh power generator, 220V pure sine waves AC Lifepo4 outdoor Mobile power bank",
    price_kobo: 50000000, // ₦500,000
    compare_at_kobo: 55000000,
    currency: "NGN",
    stock: 4,
    active: true,
    category_id: "cat-5", // Accessories
    wattage_w: 500,
    capacity_ah: 40,
    voltage_v: 12,
    warranty_yrs: 2,
    images: [{ url: "/assets/prod-station.jpg", alt: "500W portable solar station", position: 1 }]
  },
  {
    id: "prod-5",
    slug: "rechargeable-fan-panel",
    name: "Rechargeable Standing Fan with Panel",
    brand: "Generic",
    short_desc: "Rechargeable standing fan, Solar panel",
    price_kobo: 970000, // ₦9,700
    compare_at_kobo: 1200000,
    currency: "NGN",
    stock: 20,
    active: true,
    category_id: "cat-5", // Accessories
    wattage_w: 25,
    capacity_ah: 5,
    voltage_v: 12,
    warranty_yrs: 1,
    images: [{ url: "/assets/prod-fan.jpg", alt: "Rechargeable standing fan with panel", position: 1 }]
  },
  {
    id: "prod-6",
    slug: "680w-solar-street-light",
    name: "680W Solar Street Light",
    brand: "Generic",
    short_desc: "680W solar street light, with remote control, 3 Eyes, Free pole",
    price_kobo: 4500000, // ₦45,000
    compare_at_kobo: 5000000,
    currency: "NGN",
    stock: 25,
    active: true,
    category_id: "cat-4", // Solar Lighting
    wattage_w: 680,
    capacity_ah: 20,
    voltage_v: 3.2,
    warranty_yrs: 2,
    images: [{ url: "/assets/prod-street.jpg", alt: "680W solar street light", position: 1 }]
  },
  {
    id: "prod-7",
    slug: "havit-20000mah-solar-powerbank",
    name: "Havit 20000mah Solar Powerbank",
    brand: "Havit",
    short_desc: "Havit 20000mah Solar powerbank, with flashlight, built-in cables",
    price_kobo: 2800000, // ₦28,000
    compare_at_kobo: 3200000,
    currency: "NGN",
    stock: 50,
    active: true,
    category_id: "cat-2", // Batteries
    wattage_w: 5,
    capacity_ah: 20,
    voltage_v: 5,
    warranty_yrs: 1,
    images: [{ url: "/assets/prod-powerbank.jpg", alt: "Havit 20000mah Solar powerbank", position: 1 }]
  },
  {
    id: "prod-8",
    slug: "growatt-3-6kw-hybrid-inverter",
    name: "Growatt 3.6KW HYBRID INVERTER",
    brand: "Growatt",
    short_desc: "Growatt 3.6KW SPH 3600TL -BL-UP Hybrid Inverter",
    price_kobo: 200000000, // ₦2,000,000
    compare_at_kobo: 220000000,
    currency: "NGN",
    stock: 3,
    active: true,
    category_id: "cat-3", // Inverters
    wattage_w: 3600,
    capacity_ah: 0,
    voltage_v: 48,
    warranty_yrs: 5,
    images: [{ url: "/assets/prod-inverter.jpg", alt: "Growatt 3.6KW HYBRID INVERTER", position: 1 }]
  },
  {
    id: "prod-9",
    slug: "fence-light",
    name: "Fence Light",
    brand: "Generic",
    short_desc: "Solar powered decorative fence light",
    price_kobo: 4000000, // ₦40,000
    compare_at_kobo: 4500000,
    currency: "NGN",
    stock: 40,
    active: true,
    category_id: "cat-5", // Accessories
    wattage_w: 5,
    capacity_ah: 2,
    voltage_v: 3.7,
    warranty_yrs: 1,
    images: [{ url: "/assets/prod-fence.jpg", alt: "Fence Light", position: 1 }]
  },
  {
    id: "prod-10",
    slug: "monocrystalline-panel-350w",
    name: "Monocrystalline Panel - 350W",
    brand: "Generic",
    short_desc: "High efficiency monocrystalline solar panel, lasts over 20 years",
    price_kobo: 9200000, // ₦92,000
    compare_at_kobo: 10500000,
    currency: "NGN",
    stock: 30,
    active: true,
    category_id: "cat-1", // Solar Panels
    wattage_w: 350,
    capacity_ah: 0,
    voltage_v: 36,
    warranty_yrs: 25,
    images: [{ url: "/assets/prod-panel.jpg", alt: "Monocrystalline panel - 350w", position: 1 }]
  }
];

export const packages = [
  {
    id: "pack-lite",
    slug: "lite",
    name: "Lite Solar Package",
    description: "Affordable solar solution for essential power needs.",
    price: 490000,
    features: ["1kVA Inverter System", "1x 300W Monocrystalline Solar Panel", "1x Deep Cycle Battery", "Professional installation included", "Free energy assessment"],
    appliances: ["1 standing or ceiling fan", "1 flat-screen TV", "1 decoder or gaming console", "Essential LED light bulbs"],
    image: "/assets/pack-lite.jpg"
  },
  {
    id: "pack-premium",
    slug: "premium",
    name: "Premium Solar Package",
    description: "A reliable solar package for medium homes and professional offices.",
    price: 2300000,
    features: ["3.5kVA Hybrid Inverter", "60Ah MPPT Charge Controller", "2x Deep Cycle Tubular Batteries", "6x 300W Solar Panels (1800W total)", "Professional installation & cabling", "1-Year full system warranty"],
    appliances: ["Fans", "Televisions & Decoders", "Laptops & Game Consoles", "LED light bulbs", "Chest Freezer or Refrigerator", "Home theater system", "Washing machine"],
    image: "/assets/pack-premium.jpg"
  }
];
