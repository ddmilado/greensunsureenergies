"use client";

import { useState, useRef } from "react";
import { Calculator, Lightning, Plus, Trash, Printer, ChatCircleDots, CheckCircle } from "@phosphor-icons/react";
import { site } from "../data/site";

type Appliance = { name: string; wattage: number; category: string };
type Row = { id: string; name: string; wattage: number; quantity: number; hoursPerDay: number };

const APPLIANCES: Appliance[] = [
  { name: "LED Bulb", wattage: 10, category: "Lighting" },
  { name: "Tube Light", wattage: 40, category: "Lighting" },
  { name: "Security lights (flood)", wattage: 50, category: "Lighting" },
  { name: "Ceiling Fan", wattage: 75, category: "Cooling" },
  { name: "Standing Fan", wattage: 85, category: "Cooling" },
  { name: "Air Conditioner (1.5HP)", wattage: 1500, category: "Cooling" },
  { name: "Refrigerator (Medium)", wattage: 200, category: "Kitchen" },
  { name: "Deep Freezer", wattage: 300, category: "Kitchen" },
  { name: "Electric Kettle", wattage: 1500, category: "Kitchen" },
  { name: "Blender", wattage: 400, category: "Kitchen" },
  { name: "DSTV Decoder", wattage: 20, category: "Entertainment" },
  { name: "Phone Charger", wattage: 10, category: "Entertainment" },
  { name: "Home Theater", wattage: 200, category: "Entertainment" },
  { name: "Gaming Console", wattage: 150, category: "Entertainment" },
  { name: "Desktop Computer", wattage: 250, category: "Office" },
  { name: "Laptop", wattage: 60, category: "Office" },
  { name: "Printer", wattage: 50, category: "Office" },
  { name: "Router / Modem", wattage: 15, category: "Office" },
  { name: "Washing Machine", wattage: 500, category: "Laundry" },
  { name: "Iron", wattage: 1200, category: "Laundry" },
  { name: "Water Pump (1HP)", wattage: 750, category: "Utilities" },
  { name: "CCTV Camera", wattage: 10, category: "Security" },
];

const CATEGORIES = [...new Set(APPLIANCES.map((a) => a.category))];

function uid() {
  return Math.random().toString(36).substring(2, 9);
}

const STEPS = [
  { num: 1, title: "Select appliances", text: "Pick the devices you want to power from our list." },
  { num: 2, title: "Set quantities & hours", text: "Adjust how many of each and daily usage hours." },
  { num: 3, title: "View your estimate", text: "See system size, cost range, and monthly savings instantly." },
  { num: 4, title: "Contact us", text: "Chat with us on WhatsApp or call for a free site assessment." },
];

export function SolarLoadCalculator() {
  const [rows, setRows] = useState<Row[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  function addAppliance(name: string, wattage: number) {
    const existing = rows.find((r) => r.name === name);
    if (existing) {
      setRows((prev) => prev.map((r) => (r.id === existing.id ? { ...r, quantity: r.quantity + 1 } : r)));
    } else {
      setRows((prev) => [...prev, { id: uid(), name, wattage, quantity: 1, hoursPerDay: 8 }]);
    }
  }

  function updateRow(id: string, field: keyof Row, value: number) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  function removeRow(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  const totalWh = rows.reduce((s, r) => s + r.wattage * r.quantity * r.hoursPerDay, 0);
  const peakW = rows.reduce((s, r) => s + r.wattage * r.quantity, 0);
  const panelW = Math.round((totalWh / 5) * 1.3);
  const batteryAh = Math.round(totalWh / 0.5 / 24 / 10) * 10;
  const inverterVA = Math.round(peakW * 1.25 / 100) * 100;
  const costMin = Math.round(totalWh * 250 / 100000) * 100000;
  const costMax = Math.round(totalWh * 400 / 100000) * 100000;
  const estMonthlyBill = Math.round(totalWh * 30 * 250 / 1000);
  const estSolarBill = Math.round(estMonthlyBill * 0.15);
  const estSavings = estMonthlyBill - estSolarBill;

  const hasResults = rows.length > 0 && totalWh > 0;

  function printQuote() {
    window.print();
  }

  const whatsappMsg = encodeURIComponent(
    `Hello Green Sunsure, I used your solar calculator.\n\nDaily usage: ${(totalWh / 1000).toFixed(1)} kWh\nPanel: ${panelW}W | Battery: ${batteryAh}Ah | Inverter: ${inverterVA}VA\nEstimated cost: ₦${costMin.toLocaleString()} – ₦${costMax.toLocaleString()}\n\nI'd like a free site assessment.`
  );

  return (
    <div className="space-y-8">
      {/* 4 Steps */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <div key={s.num} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-[var(--line)] dark:bg-[var(--shell)]">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--solar-lime)] text-xs font-bold text-[var(--ink-950)]">{s.num}</span>
            <div>
              <p className="text-sm font-semibold text-[var(--ink-950)]">{s.title}</p>
              <p className="mt-0.5 text-xs text-[var(--ink-600)] leading-5">{s.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Appliance grid */}
      <div className="rounded-[2rem] bg-white p-6 ring-1 ring-[var(--line)] md:p-8 dark:bg-[var(--shell)]">
        <div className="flex items-center gap-3">
          <Calculator size={26} className="text-[var(--brand-green-dark)]" />
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--ink-950)]">
              Select Your Appliances
            </h2>
            <p className="text-xs text-[var(--ink-600)]">Popular in Nigeria — tap to add, adjust quantity below</p>
          </div>
        </div>

        {CATEGORIES.map((cat) => (
          <div key={cat} className="mt-5">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--ink-300)]">{cat}</p>
            <div className="flex flex-wrap gap-2">
              {APPLIANCES.filter((a) => a.category === cat).map((a) => {
                const active = rows.some((r) => r.name === a.name);
                return (
                  <button
                    key={a.name}
                    type="button"
                    onClick={() => addAppliance(a.name, a.wattage)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                      active
                        ? "bg-[var(--solar-lime)] text-[var(--ink-950)] shadow-[0_2px_12px_rgba(0,230,118,0.25)]"
                        : "border border-[var(--line)] text-[var(--ink-600)] hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
                    }`}
                  >
                    {active && <CheckCircle size={13} className="mr-1 inline-block" />}
                    {a.name} <span className="text-[10px] opacity-60">({a.wattage}W)</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected table */}
      {rows.length > 0 && (
        <div ref={resultRef} className="rounded-[2rem] bg-white p-6 ring-1 ring-[var(--line)] md:p-8 dark:bg-[var(--shell)]">
          <h3 className="text-lg font-semibold text-[var(--ink-950)]">Your Selection</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--line)] text-left text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--ink-300)]">
                  <th className="pb-2 pr-3">Appliance</th>
                  <th className="pb-2 pr-3">Watts</th>
                  <th className="pb-2 pr-3">Qty</th>
                  <th className="pb-2 pr-3">Hrs/day</th>
                  <th className="pb-2 pr-3 text-right">Wh/day</th>
                  <th className="w-8 pb-2" />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-[var(--line)]">
                    <td className="py-2.5 pr-3 text-sm font-medium text-[var(--ink-950)]">{r.name}</td>
                    <td className="py-2.5 pr-3 text-[var(--ink-600)]">{r.wattage}</td>
                    <td className="py-2.5 pr-3">
                      <input
                        type="number"
                        min={1}
                        value={r.quantity}
                        onChange={(e) => updateRow(r.id, "quantity", Math.max(1, Number(e.target.value)))}
                        className="w-14 rounded-lg border border-[var(--line)] bg-[var(--paper)] px-2 py-1 text-center text-sm outline-none focus:border-[var(--brand-green)]"
                      />
                    </td>
                    <td className="py-2.5 pr-3">
                      <input
                        type="number"
                        min={1}
                        max={24}
                        value={r.hoursPerDay}
                        onChange={(e) => updateRow(r.id, "hoursPerDay", Math.max(1, Math.min(24, Number(e.target.value))))}
                        className="w-14 rounded-lg border border-[var(--line)] bg-[var(--paper)] px-2 py-1 text-center text-sm outline-none focus:border-[var(--brand-green)]"
                      />
                    </td>
                    <td className="py-2.5 pr-3 text-right font-semibold text-[var(--ink-950)]">
                      {r.wattage * r.quantity * r.hoursPerDay}
                    </td>
                    <td className="py-2.5">
                      <button
                        type="button"
                        onClick={() => removeRow(r.id)}
                        className="grid size-7 place-items-center rounded-full text-[var(--ink-300)] hover:bg-red-50 hover:text-red-500"
                        aria-label={`Remove ${r.name}`}
                      >
                        <Trash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Results */}
      {hasResults && (
        <>
          {/* System size */}
          <div className="rounded-[2rem] bg-white p-6 ring-1 ring-[var(--line)] md:p-8 dark:bg-[var(--shell)]">
            <div className="flex items-center gap-3 mb-5">
              <Lightning size={24} className="text-[var(--energy-cyan)]" />
              <h3 className="text-lg font-semibold text-[var(--ink-950)]">System Cost Calculation</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-[var(--paper)] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--ink-300)]">Daily Usage</p>
                <p className="mt-1 text-2xl font-bold text-[var(--ink-950)]">{(totalWh / 1000).toFixed(1)} <span className="text-sm font-medium">kWh</span></p>
              </div>
              <div className="rounded-2xl bg-[var(--paper)] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--ink-300)]">Solar Panels</p>
                <p className="mt-1 text-2xl font-bold text-[var(--ink-950)]">{panelW.toLocaleString()} <span className="text-sm font-medium">W</span></p>
              </div>
              <div className="rounded-2xl bg-[var(--paper)] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--ink-300)]">Battery Bank</p>
                <p className="mt-1 text-2xl font-bold text-[var(--ink-950)]">{batteryAh} <span className="text-sm font-medium">Ah</span></p>
              </div>
              <div className="rounded-2xl bg-[var(--paper)] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--ink-300)]">Inverter</p>
                <p className="mt-1 text-2xl font-bold text-[var(--ink-950)]">{inverterVA.toLocaleString()} <span className="text-sm font-medium">VA</span></p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border-2 border-[var(--solar-lime)] bg-[var(--solar-lime)]/5 p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--brand-green-dark)]">Estimated Cost Range</p>
              <p className="mt-1 text-3xl font-bold text-[var(--ink-950)]">
                ₦{costMin.toLocaleString()} – ₦{costMax.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-[var(--ink-600)]">Includes panels, batteries, inverter, installation & 5-year warranty</p>
            </div>
          </div>

          {/* Savings comparison */}
          <div className="rounded-[2rem] bg-[var(--ink-950)] p-6 text-white ring-1 ring-white/10 md:p-8">
            <h3 className="text-lg font-semibold">What You Save with Solar</h3>
            <p className="mt-1 text-sm text-white/60">Based on current electricity tariff estimates</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/8 p-5">
                <p className="text-xs text-white/50">Current monthly bill</p>
                <p className="mt-1 text-2xl font-bold text-white">₦{estMonthlyBill.toLocaleString()}<span className="text-sm font-medium text-white/50">/mo</span></p>
              </div>
              <div className="rounded-2xl bg-[var(--solar-lime)]/15 p-5">
                <p className="text-xs text-[var(--solar-lime)]">With solar</p>
                <p className="mt-1 text-2xl font-bold text-[var(--solar-lime)]">₦{estSolarBill.toLocaleString()}<span className="text-sm font-medium text-[var(--solar-lime)]/60">/mo</span></p>
              </div>
              <div className="rounded-2xl bg-[var(--solar-lime)]/15 p-5">
                <p className="text-xs text-[var(--solar-lime)]">Monthly savings</p>
                <p className="mt-1 text-2xl font-bold text-[var(--solar-lime)]">₦{estSavings.toLocaleString()}<span className="text-sm font-medium text-[var(--solar-lime)]/60">/mo</span></p>
                <p className="mt-0.5 text-xs text-white/40">= ₦{(estSavings * 12).toLocaleString()} annual savings</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/2349038260459?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[var(--solar-lime)] px-6 py-3 text-sm font-semibold text-[var(--ink-950)] shadow-[0_18px_60px_rgba(0,230,118,0.25)] transition hover:bg-white active:scale-[0.98]"
            >
              <ChatCircleDots size={18} weight="fill" />
              Send estimate via WhatsApp
            </a>
            <button
              type="button"
              onClick={printQuote}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-[var(--line)] bg-white px-6 py-3 text-sm font-semibold text-[var(--ink-950)] transition hover:bg-[var(--mist)] active:scale-[0.98] dark:bg-[var(--shell)]"
            >
              <Printer size={18} weight="duotone" />
              Print this quote
            </button>
          </div>

          <p className="text-xs text-[var(--ink-300)]">
            Estimates based on 5 hours daily sunlight. Actual requirements may vary based on your location and usage patterns. Professional site assessment recommended for precise system sizing.
          </p>
        </>
      )}

      {rows.length === 0 && (
        <div className="rounded-[2rem] bg-[var(--paper)] p-12 text-center ring-1 ring-[var(--line)]">
          <Lightning size={40} className="mx-auto text-[var(--ink-300)]" />
          <p className="mt-4 text-sm font-medium text-[var(--ink-600)]">
            Tap any appliance above to get started — your estimate appears instantly.
          </p>
        </div>
      )}
    </div>
  );
}
