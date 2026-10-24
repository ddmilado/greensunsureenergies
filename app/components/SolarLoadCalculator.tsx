"use client";

import { useState, useRef, useMemo } from "react";
import {
  Calculator,
  Lightning,
  Trash,
  Printer,
  ChatCircleDots,
  CheckCircle,
  Plus,
  Minus,
  GasPump,
  ShieldCheck,
  Sparkle,
  TrendUp,
  Cpu,
  BatteryCharging,
  SolarPanel,
} from "@phosphor-icons/react";
import { site } from "../data/site";

type Appliance = {
  id: string;
  name: string;
  wattage: number;
  category: "Cooling" | "Kitchen" | "Lighting" | "Entertainment" | "Office & Tech" | "Heavy / Pumps";
  defaultHours: number;
  iconName?: string;
};

const APPLIANCES: Appliance[] = [
  // Cooling
  { id: "ac-1hp", name: "Inverter AC (1.0 HP)", wattage: 900, category: "Cooling", defaultHours: 8 },
  { id: "ac-15hp", name: "Inverter AC (1.5 HP)", wattage: 1400, category: "Cooling", defaultHours: 8 },
  { id: "ac-2hp", name: "Inverter AC (2.0 HP)", wattage: 1900, category: "Cooling", defaultHours: 6 },
  { id: "fan-ceiling", name: "Ceiling Fan", wattage: 70, category: "Cooling", defaultHours: 12 },
  { id: "fan-standing", name: "Standing / Rechargeable Fan", wattage: 55, category: "Cooling", defaultHours: 10 },

  // Kitchen
  { id: "fridge-med", name: "Inverter Refrigerator", wattage: 160, category: "Kitchen", defaultHours: 24 },
  { id: "freezer-deep", name: "Deep Freezer", wattage: 240, category: "Kitchen", defaultHours: 16 },
  { id: "microwave", name: "Microwave Oven", wattage: 1100, category: "Kitchen", defaultHours: 0.5 },
  { id: "blender", name: "Smoothie / Food Blender", wattage: 450, category: "Kitchen", defaultHours: 0.3 },
  { id: "kettle", name: "Electric Kettle", wattage: 1500, category: "Kitchen", defaultHours: 0.3 },

  // Lighting
  { id: "led-bulb", name: "Energy LED Bulb (9W-12W)", wattage: 10, category: "Lighting", defaultHours: 10 },
  { id: "floodlight", name: "Exterior Security Floodlight", wattage: 50, category: "Lighting", defaultHours: 11 },
  { id: "tube-light", name: "LED Tube Fixture", wattage: 36, category: "Lighting", defaultHours: 8 },

  // Entertainment
  { id: "tv-smart", name: "Smart TV (43\" - 65\")", wattage: 95, category: "Entertainment", defaultHours: 8 },
  { id: "decoder", name: "DSTV / StarTimes Decoder", wattage: 20, category: "Entertainment", defaultHours: 8 },
  { id: "soundbar", name: "Home Theater / Soundbar", wattage: 120, category: "Entertainment", defaultHours: 5 },
  { id: "ps5-xbox", name: "Gaming Console (PS5 / Xbox)", wattage: 180, category: "Entertainment", defaultHours: 4 },

  // Office & Tech
  { id: "laptop", name: "Laptop & Workstation", wattage: 65, category: "Office & Tech", defaultHours: 8 },
  { id: "desktop-pc", name: "Desktop PC + Dual Monitors", wattage: 250, category: "Office & Tech", defaultHours: 8 },
  { id: "wifi-router", name: "Starlink / 5G WiFi Router", wattage: 45, category: "Office & Tech", defaultHours: 24 },
  { id: "cctv-sys", name: "CCTV DVR + 8 Cameras", wattage: 60, category: "Office & Tech", defaultHours: 24 },

  // Heavy / Pumps
  { id: "pump-1hp", name: "Water Pump (1.0 HP Sumo)", wattage: 850, category: "Heavy / Pumps", defaultHours: 1 },
  { id: "pump-05hp", name: "Surface Booster Pump (0.5 HP)", wattage: 450, category: "Heavy / Pumps", defaultHours: 1.5 },
  { id: "iron", name: "Dry / Steam Electric Iron", wattage: 1200, category: "Heavy / Pumps", defaultHours: 0.5 },
  { id: "washing-mach", name: "Automatic Washing Machine", wattage: 500, category: "Heavy / Pumps", defaultHours: 1 },
];

const CATEGORIES: Appliance["category"][] = [
  "Cooling",
  "Kitchen",
  "Lighting",
  "Entertainment",
  "Office & Tech",
  "Heavy / Pumps",
];

type SelectedItem = {
  id: string;
  name: string;
  wattage: number;
  quantity: number;
  hoursPerDay: number;
};

// Preset bundles for rapid 1-click configuration
const PRESETS = [
  {
    name: "3-Bedroom Standard",
    badge: "Residential",
    desc: "LEDs, Fans, TV, Starlink, Fridge",
    items: [
      { id: "led-bulb", qty: 10, hrs: 8 },
      { id: "fan-ceiling", qty: 3, hrs: 10 },
      { id: "tv-smart", qty: 1, hrs: 8 },
      { id: "decoder", qty: 1, hrs: 8 },
      { id: "fridge-med", qty: 1, hrs: 18 },
      { id: "wifi-router", qty: 1, hrs: 24 },
      { id: "laptop", qty: 2, hrs: 6 },
    ],
  },
  {
    name: "Luxury Duplex (With AC)",
    badge: "High Comfort",
    desc: "2 Inverter ACs, Deep Freezer, TVs, Water Pump",
    items: [
      { id: "ac-15hp", qty: 2, hrs: 7 },
      { id: "fan-ceiling", qty: 4, hrs: 10 },
      { id: "fridge-med", qty: 1, hrs: 24 },
      { id: "freezer-deep", qty: 1, hrs: 12 },
      { id: "tv-smart", qty: 2, hrs: 8 },
      { id: "wifi-router", qty: 1, hrs: 24 },
      { id: "cctv-sys", qty: 1, hrs: 24 },
      { id: "pump-1hp", qty: 1, hrs: 1 },
      { id: "led-bulb", qty: 16, hrs: 8 },
    ],
  },
  {
    name: "Commercial Office / Clinic",
    badge: "Commercial",
    desc: "3 ACs, Workstations, Security, Server Router",
    items: [
      { id: "ac-15hp", qty: 3, hrs: 9 },
      { id: "desktop-pc", qty: 5, hrs: 9 },
      { id: "laptop", qty: 4, hrs: 8 },
      { id: "wifi-router", qty: 1, hrs: 24 },
      { id: "cctv-sys", qty: 1, hrs: 24 },
      { id: "led-bulb", qty: 20, hrs: 10 },
      { id: "fridge-med", qty: 1, hrs: 12 },
    ],
  },
];

export function SolarLoadCalculator() {
  const [selectedCategory, setSelectedCategory] = useState<Appliance["category"]>("Cooling");
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([
    { id: "led-bulb", name: "Energy LED Bulb (9W-12W)", wattage: 10, quantity: 8, hoursPerDay: 8 },
    { id: "fan-ceiling", name: "Ceiling Fan", wattage: 70, quantity: 2, hoursPerDay: 10 },
    { id: "tv-smart", name: "Smart TV (43\" - 65\")", wattage: 95, quantity: 1, hoursPerDay: 6 },
    { id: "fridge-med", name: "Inverter Refrigerator", wattage: 160, quantity: 1, hoursPerDay: 18 },
  ]);

  // Generator fuel comparison state
  const [hasGenerator, setHasGenerator] = useState(true);
  const [genFuelType, setGenFuelType] = useState<"petrol" | "diesel">("petrol");
  const [genDailyHours, setGenDailyHours] = useState(7);

  const resultRef = useRef<HTMLDivElement>(null);

  // Add appliance with 1-click
  function handleAdd(appliance: Appliance) {
    setSelectedItems((prev) => {
      const existing = prev.find((item) => item.id === appliance.id);
      if (existing) {
        return prev.map((item) =>
          item.id === appliance.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: appliance.id,
          name: appliance.name,
          wattage: appliance.wattage,
          quantity: 1,
          hoursPerDay: appliance.defaultHours,
        },
      ];
    });
  }

  // Update item quantity
  function handleQuantity(id: string, delta: number) {
    setSelectedItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is SelectedItem => item !== null)
    );
  }

  // Update hours
  function handleHours(id: string, hours: number) {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, hoursPerDay: Math.max(0.5, Math.min(24, hours)) } : item
      )
    );
  }

  // Apply preset
  function applyPreset(presetIndex: number) {
    const preset = PRESETS[presetIndex];
    const newItems: SelectedItem[] = [];
    for (const p of preset.items) {
      const match = APPLIANCES.find((a) => a.id === p.id);
      if (match) {
        newItems.push({
          id: match.id,
          name: match.name,
          wattage: match.wattage,
          quantity: p.qty,
          hoursPerDay: p.hrs,
        });
      }
    }
    setSelectedItems(newItems);
  }

  // Engineering calculations
  const totalWh = useMemo(() => {
    return selectedItems.reduce((acc, item) => acc + item.wattage * item.quantity * item.hoursPerDay, 0);
  }, [selectedItems]);

  const peakW = useMemo(() => {
    return selectedItems.reduce((acc, item) => acc + item.wattage * item.quantity, 0);
  }, [selectedItems]);

  const dailyKwh = totalWh / 1000;

  // Inverter Sizing (with 1.35x surge factor, rounded up to standard kVA sizes)
  const requiredKva = useMemo(() => {
    const raw = (peakW * 1.35) / 1000;
    if (raw <= 1.5) return 1.5;
    if (raw <= 2.5) return 2.5;
    if (raw <= 3.5) return 3.5;
    if (raw <= 5.0) return 5.0;
    if (raw <= 7.5) return 7.5;
    if (raw <= 10.0) return 10.0;
    if (raw <= 15.0) return 15.0;
    return Math.ceil(raw / 5) * 5;
  }, [peakW]);

  // Lithium Battery Bank in kWh (Assuming 85% DoD & 1 day autonomy)
  const batteryKwh = useMemo(() => {
    return Number(((totalWh * 0.75) / 1000 / 0.85).toFixed(1));
  }, [totalWh]);

  // Number of 550W Tier-1 Mono Solar Panels
  const panelCount = useMemo(() => {
    const totalPanelWattage = (totalWh / 5.0) * 1.25; // 5 peak sun hours in Nigeria + 25% system loss
    return Math.max(2, Math.ceil(totalPanelWattage / 550));
  }, [totalWh]);

  // Estimated System Investment Range (in ₦ NGN)
  const costMin = useMemo(() => {
    if (totalWh === 0) return 0;
    const base = requiredKva * 320000 + batteryKwh * 360000 + panelCount * 135000 + 250000;
    return Math.round(base / 50000) * 50000;
  }, [requiredKva, batteryKwh, panelCount, totalWh]);

  const costMax = useMemo(() => {
    return Math.round((costMin * 1.25) / 50000) * 50000;
  }, [costMin]);

  // Generator fuel displacement calculation:
  // Petrol gen consumes ~1.2L - 1.8L / hr. Diesel gen consumes ~2.2L - 3.5L / hr.
  // Current Nigerian fuel rates approx: Petrol ~₦950/L, Diesel ~₦1,250/L
  const genFuelLitersPerMonth = useMemo(() => {
    const ratePerHour = genFuelType === "petrol" ? 1.4 : 2.5;
    return Math.round(genDailyHours * ratePerHour * 30);
  }, [genFuelType, genDailyHours]);

  const genMonthlyCost = useMemo(() => {
    const pricePerLiter = genFuelType === "petrol" ? 950 : 1250;
    // Add 10% monthly maintenance / oil changes
    return Math.round(genFuelLitersPerMonth * pricePerLiter * 1.1);
  }, [genFuelLitersPerMonth, genFuelType]);

  const genAnnualCost = genMonthlyCost * 12;

  // Payback period in months
  const paybackMonths = useMemo(() => {
    if (genMonthlyCost === 0 || costMin === 0) return 0;
    return (costMin / genMonthlyCost).toFixed(1);
  }, [costMin, genMonthlyCost]);

  // WhatsApp Quote Message
  const whatsappMsg = useMemo(() => {
    const itemsSummary = selectedItems.map((i) => `• ${i.name} (x${i.quantity})`).slice(0, 8).join("\n");
    return encodeURIComponent(
      `*GREEN SUNSURE SOLAR ESTIMATE*\n\n` +
      `*Estimated Daily Load:* ${dailyKwh.toFixed(1)} kWh/day\n` +
      `*Peak Draw:* ${peakW} W\n` +
      `*Recommended System:*\n` +
      `• Hybrid Inverter: ${requiredKva} kVA Pure Sine Wave\n` +
      `• Lithium Battery Bank: ${batteryKwh} kWh LiFePO4\n` +
      `• Solar Array: ${panelCount}x 550W Tier-1 Panels (${(panelCount * 0.55).toFixed(1)}kWp)\n` +
      `*Estimated Cost:* ₦${costMin.toLocaleString()} - ₦${costMax.toLocaleString()}\n\n` +
      `*Key Appliances Selected:*\n${itemsSummary}\n\n` +
      `Please provide an official on-site survey and invoice.`
    );
  }, [dailyKwh, peakW, requiredKva, batteryKwh, panelCount, costMin, costMax, selectedItems]);

  return (
    <div className="space-y-10" ref={resultRef}>
      {/* 1-Click Quick Presets */}
      <div className="doppelrand">
        <div className="doppelrand-inner p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[var(--line)] pb-6">
            <div>
              <span className="hud-pill mb-2">⚡ Rapid Presets</span>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--ink-950)]">
                Start with a Pre-Configured Blueprint
              </h2>
              <p className="mt-1 text-xs md:text-sm text-[var(--ink-600)]">
                Select a typical Nigerian property profile or customize your appliances below.
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--brand-green-dark)] font-semibold hidden md:block">
              {selectedItems.length} appliances active
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {PRESETS.map((preset, idx) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(idx)}
                className="group relative flex flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 text-left transition-all duration-300 hover:border-[var(--brand-green)] hover:shadow-lg active:scale-[0.98]"
              >
                <div>
                  <span className="inline-block rounded-full bg-[var(--mist)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--brand-green-dark)]">
                    {preset.badge}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-[var(--ink-950)] group-hover:text-[var(--brand-green-dark)]">
                    {preset.name}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--ink-600)] leading-5">
                    {preset.desc}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[var(--brand-green-dark)]">
                  <span>Load Template</span>
                  <Plus size={14} weight="bold" className="transition-transform group-hover:rotate-90" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Appliance Selector Hub */}
      <div className="doppelrand">
        <div className="doppelrand-inner p-6 md:p-8">
          <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-[var(--mist)] text-[var(--brand-green-dark)]">
                <Calculator size={24} weight="duotone" />
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-[var(--ink-950)]">
                  Custom Appliance Configurator
                </h2>
                <p className="text-xs text-[var(--ink-600)]">
                  Tap to add appliances. Adjust power hours to match your daily schedule.
                </p>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-[var(--surface)] text-white shadow-sm dark:bg-white dark:text-[var(--ink-950)]"
                      : "border border-[var(--line)] bg-[var(--paper)] text-[var(--ink-700)] hover:border-[var(--brand-green)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Appliance Cards */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {APPLIANCES.filter((a) => a.category === selectedCategory).map((app) => {
              const selected = selectedItems.find((i) => i.id === app.id);
              const count = selected?.quantity || 0;

              return (
                <div
                  key={app.id}
                  className={`relative flex items-center justify-between rounded-2xl p-4 transition-all duration-300 ${
                    count > 0
                      ? "border-2 border-[var(--brand-green)] bg-[var(--mist)]/40 shadow-sm"
                      : "border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--line)]/80 hover:bg-white dark:hover:bg-[var(--surface)]"
                  }`}
                >
                  <div className="pr-3">
                    <p className="text-sm font-semibold text-[var(--ink-950)]">{app.name}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs font-mono text-[var(--ink-600)]">
                      <span className="font-bold text-[var(--brand-green-dark)]">{app.wattage}W</span>
                      <span>·</span>
                      <span>~{app.defaultHours}h/day</span>
                    </div>
                  </div>

                  {count > 0 ? (
                    <div className="flex items-center gap-1.5 rounded-full border border-[var(--brand-green)]/30 bg-white p-1 shadow-sm dark:bg-[var(--surface)]">
                      <button
                        type="button"
                        onClick={() => handleQuantity(app.id, -1)}
                        className="grid size-7 place-items-center rounded-full text-[var(--ink-950)] hover:bg-[var(--mist)] active:scale-95"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} weight="bold" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold font-mono text-[var(--ink-950)]">
                        {count}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantity(app.id, 1)}
                        className="grid size-7 place-items-center rounded-full bg-[var(--brand-green)] text-white hover:bg-[var(--brand-green-dark)] active:scale-95"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} weight="bold" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAdd(app)}
                      className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--ink-950)] shadow-sm transition hover:border-[var(--brand-green)] hover:text-[var(--brand-green-dark)] active:scale-95 dark:bg-[var(--surface)] dark:text-white"
                    >
                      <Plus size={13} weight="bold" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Real-time Engineering Telemetry Hub */}
      {selectedItems.length > 0 && (
        <div className="doppelrand bg-[var(--surface)] text-white">
          <div className="doppelrand-inner bg-[var(--surface)] p-6 md:p-8 text-white border border-white/10">
            <div className="flex flex-col gap-2 border-b border-white/12 pb-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="hud-pill border-emerald-400/30 text-emerald-300">
                  ⚡ Engineering Telemetry
                </span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
                  Recommended System Architecture
                </h3>
                <p className="text-xs text-white/60">
                  Engineered with 1.35x surge protection for compressor spikes & inductive pump loads.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <ShieldCheck size={16} weight="fill" />
                  <span>5-Year Warranty Tier</span>
                </span>
              </div>
            </div>

            {/* 4 Core Sizing Specs */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Daily Energy Consumption */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between text-white/60">
                  <span className="text-xs font-mono uppercase tracking-wider">Daily Energy</span>
                  <Lightning size={20} className="text-emerald-400" />
                </div>
                <p className="mt-3 text-3xl font-extrabold tracking-tight text-white font-mono">
                  {dailyKwh.toFixed(1)} <span className="text-sm font-sans font-medium text-white/60">kWh/day</span>
                </p>
                <p className="mt-1 text-xs text-white/40">Peak surge: {peakW.toLocaleString()} W</p>
              </div>

              {/* Inverter Capacity */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between text-white/60">
                  <span className="text-xs font-mono uppercase tracking-wider">Hybrid Inverter</span>
                  <Cpu size={20} className="text-emerald-400" />
                </div>
                <p className="mt-3 text-3xl font-extrabold tracking-tight text-white font-mono">
                  {requiredKva} <span className="text-sm font-sans font-medium text-white/60">kVA Pure Sine</span>
                </p>
                <p className="mt-1 text-xs text-white/40">Automatic bypass switch</p>
              </div>

              {/* Lithium LiFePO4 Storage */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between text-white/60">
                  <span className="text-xs font-mono uppercase tracking-wider">Lithium Bank</span>
                  <BatteryCharging size={20} className="text-emerald-400" />
                </div>
                <p className="mt-3 text-3xl font-extrabold tracking-tight text-white font-mono">
                  {batteryKwh} <span className="text-sm font-sans font-medium text-white/60">kWh LiFePO4</span>
                </p>
                <p className="mt-1 text-xs text-white/40">6,000+ Cycles (15+ yrs life)</p>
              </div>

              {/* Solar Array Panels */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between text-white/60">
                  <span className="text-xs font-mono uppercase tracking-wider">Solar Array</span>
                  <SolarPanel size={20} className="text-emerald-400" />
                </div>
                <p className="mt-3 text-3xl font-extrabold tracking-tight text-white font-mono">
                  {panelCount} <span className="text-sm font-sans font-medium text-white/60">Panels (550W)</span>
                </p>
                <p className="mt-1 text-xs text-white/40">{(panelCount * 0.55).toFixed(1)} kWp Monocrystalline</p>
              </div>
            </div>

            {/* Estimated Investment Banner */}
            <div className="mt-6 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/70 to-emerald-900/30 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                  ESTIMATED TURNKEY INVESTMENT
                </span>
                <p className="mt-1 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                  ₦{costMin.toLocaleString()} – ₦{costMax.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Includes Tier-1 hardware, copper earthing, surge arresters, DC cables, certified installation & NERC warranty.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/2349038260459?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full bg-[var(--solar-lime)] px-6 py-3 text-sm font-bold text-[var(--ink-950)] shadow-[0_12px_36px_rgba(0,230,118,0.35)] transition-all hover:bg-white active:scale-95"
                >
                  <ChatCircleDots size={20} weight="fill" />
                  <span>Send WhatsApp Quote</span>
                </a>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 active:scale-95"
                >
                  <Printer size={18} weight="duotone" />
                  <span>Print Spec Sheet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* The Nigerian Diesel Displacement & ROI Engine */}
      {selectedItems.length > 0 && (
        <div className="doppelrand">
          <div className="doppelrand-inner p-6 md:p-8 bg-gradient-to-br from-white via-[var(--mist)]/20 to-white dark:from-[var(--shell)] dark:to-[var(--surface)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <GasPump size={26} weight="duotone" />
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-[var(--ink-950)]">
                    Generator Diesel/Petrol Displacement Analysis
                  </h3>
                  <p className="text-xs text-[var(--ink-600)]">
                    How much are you currently burning on generator fuel and oil servicing?
                  </p>
                </div>
              </div>

              {/* Fuel Type Switch */}
              <div className="flex items-center gap-2 bg-[var(--paper)] p-1.5 rounded-full border border-[var(--line)]">
                <button
                  type="button"
                  onClick={() => setGenFuelType("petrol")}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                    genFuelType === "petrol"
                      ? "bg-[var(--surface)] text-white dark:bg-white dark:text-[var(--ink-950)]"
                      : "text-[var(--ink-600)] hover:text-[var(--ink-950)]"
                  }`}
                >
                  Petrol (PMS)
                </button>
                <button
                  type="button"
                  onClick={() => setGenFuelType("diesel")}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                    genFuelType === "diesel"
                      ? "bg-[var(--surface)] text-white dark:bg-white dark:text-[var(--ink-950)]"
                      : "text-[var(--ink-600)] hover:text-[var(--ink-950)]"
                  }`}
                >
                  Diesel (AGO)
                </button>
              </div>
            </div>

            {/* Generator Hours Slider */}
            <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="gen-hours-slider" className="text-sm font-semibold text-[var(--ink-950)]">
                  Daily Generator Run Time: <span className="text-[var(--brand-green-dark)] font-mono font-bold text-base">{genDailyHours} Hours / Day</span>
                </label>
                <span className="text-xs text-[var(--ink-600)]">~{genFuelLitersPerMonth.toLocaleString()} Liters / month</span>
              </div>
              <input
                id="gen-hours-slider"
                type="range"
                min="2"
                max="24"
                step="1"
                value={genDailyHours}
                onChange={(e) => setGenDailyHours(Number(e.target.value))}
                className="w-full h-2 bg-[var(--mist)] rounded-lg appearance-none cursor-pointer accent-[var(--brand-green)]"
              />
            </div>

            {/* Financial Comparison Cards */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                  Current Monthly Fuel Cost
                </p>
                <p className="mt-2 text-3xl font-extrabold text-[var(--ink-950)] font-mono">
                  ₦{genMonthlyCost.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-[var(--ink-600)]">
                  ≈ ₦{genAnnualCost.toLocaleString()} / year burned on fuel
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Solar Monthly Operating Cost
                </p>
                <p className="mt-2 text-3xl font-extrabold text-[var(--brand-green-dark)] font-mono">
                  ₦0
                </p>
                <p className="mt-1 text-xs text-[var(--ink-600)]">
                  Zero daily fuel. Minimal routine panel rinse.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--brand-green)] bg-[var(--mist)]/40 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-green-dark)]">
                  System Payback Period
                </p>
                <p className="mt-2 text-3xl font-extrabold text-[var(--ink-950)] font-mono">
                  ~{paybackMonths} Months
                </p>
                <p className="mt-1 text-xs text-[var(--ink-600)]">
                  Pays for itself in under {Math.ceil(Number(paybackMonths) / 12)} years, then 15+ years free energy.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Items Detail Management Table */}
      {selectedItems.length > 0 && (
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--shell)] p-6 md:p-8">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
            <h3 className="text-lg font-bold text-[var(--ink-950)]">
              Configured Appliance Breakdown ({selectedItems.length})
            </h3>
            <button
              type="button"
              onClick={() => setSelectedItems([])}
              className="text-xs text-red-500 hover:underline font-semibold"
            >
              Clear All
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--line)] text-[11px] font-bold uppercase tracking-wider text-[var(--ink-600)]">
                  <th className="py-2 pr-4">Appliance</th>
                  <th className="py-2 pr-4">Rating (W)</th>
                  <th className="py-2 pr-4">Quantity</th>
                  <th className="py-2 pr-4">Hours / Day</th>
                  <th className="py-2 pr-4 text-right">Daily Wh</th>
                  <th className="py-2 pl-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {selectedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-white/40 dark:hover:bg-white/5 transition">
                    <td className="py-3 pr-4 font-semibold text-[var(--ink-950)]">{item.name}</td>
                    <td className="py-3 pr-4 font-mono text-[var(--ink-600)]">{item.wattage} W</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuantity(item.id, -1)}
                          className="grid size-6 place-items-center rounded bg-[var(--paper)] text-xs font-bold text-[var(--ink-950)] border border-[var(--line)]"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-mono font-bold text-[var(--ink-950)]">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleQuantity(item.id, 1)}
                          className="grid size-6 place-items-center rounded bg-[var(--paper)] text-xs font-bold text-[var(--ink-950)] border border-[var(--line)]"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <input
                        type="number"
                        min="0.5"
                        max="24"
                        step="0.5"
                        value={item.hoursPerDay}
                        onChange={(e) => handleHours(item.id, Number(e.target.value))}
                        className="w-16 rounded-lg border border-[var(--line)] bg-[var(--paper)] px-2 py-1 text-center font-mono text-xs font-semibold text-[var(--ink-950)] outline-none focus:border-[var(--brand-green)]"
                      />
                    </td>
                    <td className="py-3 pr-4 text-right font-mono font-bold text-[var(--ink-950)]">
                      {(item.wattage * item.quantity * item.hoursPerDay).toLocaleString()} Wh
                    </td>
                    <td className="py-3 pl-2 text-right">
                      <button
                        type="button"
                        onClick={() => handleQuantity(item.id, -item.quantity)}
                        className="grid size-7 place-items-center rounded-full text-[var(--ink-300)] hover:bg-red-50 hover:text-red-500 transition ml-auto"
                        aria-label="Remove item"
                      >
                        <Trash size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
