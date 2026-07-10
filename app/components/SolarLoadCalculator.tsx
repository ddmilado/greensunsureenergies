"use client";

import { useState } from "react";
import { Calculator, Plus, Trash, Lightning } from "@phosphor-icons/react";

type ApplianceRow = { id: string; name: string; wattage: number; quantity: number; hoursPerDay: number };

const COMMON_APPLIANCES = [
  { name: "LED bulb", wattage: 10 },
  { name: "Ceiling fan", wattage: 75 },
  { name: "Standing fan", wattage: 55 },
  { name: "Flat-screen TV (32\")", wattage: 60 },
  { name: "Flat-screen TV (55\")", wattage: 120 },
  { name: "Fridge (small)", wattage: 80 },
  { name: "Fridge (large)", wattage: 150 },
  { name: "Freezer (chest)", wattage: 120 },
  { name: "Freezer (upright)", wattage: 180 },
  { name: "Washing machine", wattage: 500 },
  { name: "Microwave", wattage: 1000 },
  { name: "Electric kettle", wattage: 1500 },
  { name: "Laptop", wattage: 60 },
  { name: "Desktop computer", wattage: 200 },
  { name: "Printer", wattage: 50 },
  { name: "Router / modem", wattage: 15 },
  { name: "Deep freezer", wattage: 200 },
  { name: "Water pump (0.5hp)", wattage: 375 },
  { name: "Water pump (1hp)", wattage: 750 },
  { name: "Air conditioner (1hp)", wattage: 900 },
  { name: "Air conditioner (1.5hp)", wattage: 1400 },
  { name: "Iron", wattage: 1200 },
  { name: "Blender", wattage: 400 },
  { name: "Electric cooker (1 hob)", wattage: 1500 },
  { name: "Toaster", wattage: 800 },
  { name: "Phone charger", wattage: 10 },
  { name: "Security lights (flood)", wattage: 50 },
  { name: "CCTV camera", wattage: 10 },
  { name: "Inverter (idle draw)", wattage: 30 },
];

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function SolarLoadCalculator() {
  const [rows, setRows] = useState<ApplianceRow[]>([]);

  function addRow(name?: string, wattage?: number) {
    setRows((prev) => [
      ...prev,
      { id: generateId(), name: name ?? "", wattage: wattage ?? 0, quantity: 1, hoursPerDay: 8 },
    ]);
  }

  function updateRow(id: string, field: keyof ApplianceRow, value: string | number) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: typeof value === "string" ? value : value } : r)));
  }

  function removeRow(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  const totalDailyWh = rows.reduce((sum, r) => sum + r.wattage * r.quantity * r.hoursPerDay, 0);
  const peakLoadW = rows.reduce((sum, r) => sum + r.wattage * r.quantity, 0);
  const suggestedPanelW = Math.round((totalDailyWh / 5) * 1.3);
  const suggestedBatteryAh = Math.round((totalDailyWh / 0.5 / 24) / 10) * 10;
  const suggestedInverterVA = Math.round(peakLoadW * 1.25 / 100) * 100;
  const costMin = Math.round(totalDailyWh * 250 / 100000) * 100000;
  const costMax = Math.round(totalDailyWh * 400 / 100000) * 100000;

  return (
    <div className="rounded-[2.25rem] bg-[var(--shell)] p-1.5 ring-1 ring-[var(--line)]">
      <div className="rounded-[1.85rem] bg-white p-6 md:p-8">
        <div className="flex items-center gap-3">
          <Calculator size={28} className="text-[var(--brand-blue)]" />
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">
            Solar Load Calculator
          </h2>
        </div>
        <p className="mt-2 text-sm leading-6 text-[var(--ink-600)]">
          Add your appliances below to estimate your daily energy needs and get a recommended solar system size.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {COMMON_APPLIANCES.slice(0, 10).map((a) => (
            <button
              key={a.name}
              type="button"
              onClick={() => addRow(a.name, a.wattage)}
              className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-[var(--ink-600)] transition-colors hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]"
            >
              + {a.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => addRow()}
            className="flex items-center gap-1 rounded-full border border-dashed border-[var(--brand-blue)] px-3 py-1.5 text-xs text-[var(--brand-blue)] transition-colors hover:bg-[var(--brand-blue)] hover:text-white"
          >
            <Plus size={12} /> Custom
          </button>
        </div>

        {rows.length > 0 && (
          <>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--line)] text-left text-xs font-medium text-[var(--ink-300)]">
                    <th className="pb-2 pr-2">Appliance</th>
                    <th className="pb-2 pr-2">Watts</th>
                    <th className="pb-2 pr-2">Qty</th>
                    <th className="pb-2 pr-2">Hrs/day</th>
                    <th className="pb-2 pr-2 text-right">Wh/day</th>
                    <th className="w-8 pb-2" />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="border-b border-[var(--line)]">
                      <td className="py-2 pr-2">
                        <input
                          className="w-28 rounded-lg border border-[var(--line)] bg-[var(--shell)] px-2 py-1.5 text-sm outline-none transition-colors focus:border-[var(--brand-blue)]"
                          value={row.name}
                          onChange={(e) => updateRow(row.id, "name", e.target.value)}
                          placeholder="Appliance"
                        />
                      </td>
                      <td className="py-2 pr-2">
                        <input
                          className="w-16 rounded-lg border border-[var(--line)] bg-[var(--shell)] px-2 py-1.5 text-sm outline-none transition-colors focus:border-[var(--brand-blue)]"
                          type="number"
                          min={0}
                          value={row.wattage}
                          onChange={(e) => updateRow(row.id, "wattage", Number(e.target.value))}
                        />
                      </td>
                      <td className="py-2 pr-2">
                        <input
                          className="w-14 rounded-lg border border-[var(--line)] bg-[var(--shell)] px-2 py-1.5 text-sm outline-none transition-colors focus:border-[var(--brand-blue)]"
                          type="number"
                          min={1}
                          value={row.quantity}
                          onChange={(e) => updateRow(row.id, "quantity", Number(e.target.value))}
                        />
                      </td>
                      <td className="py-2 pr-2">
                        <input
                          className="w-14 rounded-lg border border-[var(--line)] bg-[var(--shell)] px-2 py-1.5 text-sm outline-none transition-colors focus:border-[var(--brand-blue)]"
                          type="number"
                          min={0}
                          max={24}
                          value={row.hoursPerDay}
                          onChange={(e) => updateRow(row.id, "hoursPerDay", Number(e.target.value))}
                        />
                      </td>
                      <td className="py-2 pr-2 text-right font-medium text-[var(--ink-700)]">
                        {row.wattage * row.quantity * row.hoursPerDay}
                      </td>
                      <td className="py-2">
                        <button
                          type="button"
                          onClick={() => removeRow(row.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--ink-300)] transition-colors hover:bg-red-50 hover:text-red-500"
                          aria-label={`Remove ${row.name || "appliance"}`}
                        >
                          <Trash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[var(--paper)] px-5 py-4">
              <Lightning size={24} className="text-[var(--energy-cyan)]" />
              <div>
                <p className="text-xs text-[var(--ink-300)]">Total daily consumption</p>
                <p className="text-xl font-bold text-[var(--ink-950)]">
                  {(totalDailyWh / 1000).toFixed(1)} kWh
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-[var(--paper)] p-4">
                <p className="text-xs text-[var(--ink-300)]">Recommended solar panel</p>
                <p className="mt-0.5 text-lg font-bold text-[var(--ink-950)]">{suggestedPanelW.toLocaleString()} W</p>
              </div>
              <div className="rounded-xl bg-[var(--paper)] p-4">
                <p className="text-xs text-[var(--ink-300)]">Recommended battery bank</p>
                <p className="mt-0.5 text-lg font-bold text-[var(--ink-950)]">{suggestedBatteryAh} Ah @ 24V</p>
              </div>
              <div className="rounded-xl bg-[var(--paper)] p-4">
                <p className="text-xs text-[var(--ink-300)]">Recommended inverter</p>
                <p className="mt-0.5 text-lg font-bold text-[var(--ink-950)]">{suggestedInverterVA.toLocaleString()} VA</p>
              </div>
              <div className="rounded-xl bg-[var(--paper)] p-4">
                <p className="text-xs text-[var(--ink-300)]">Estimated cost range</p>
                <p className="mt-0.5 text-lg font-bold text-[var(--ink-950)]">
                  ₦{costMin.toLocaleString()} – ₦{costMax.toLocaleString()}
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs text-[var(--ink-300)]">
              * Estimates based on 5 peak sun hours, 50% depth of discharge, and ₦250–400/watt installed cost.
              Contact Damdavy for a precise site assessment.
            </p>
          </>
        )}

        {rows.length === 0 && (
          <div className="mt-8 flex flex-col items-center py-12 text-center">
            <Lightning size={48} className="text-[var(--ink-300)]" />
            <p className="mt-4 text-sm text-[var(--ink-600)]">
              Tap an appliance button above or add a custom appliance to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
