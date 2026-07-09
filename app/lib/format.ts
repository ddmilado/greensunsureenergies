// Centralized currency / formatting helpers.
export const NGN = "NGN";

export function koboToNaira(kobo: number): number {
  return Math.round(kobo / 100);
}

export function formatNGN(kobo: number): string {
  const naira = koboToNaira(kobo);
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: NGN,
    maximumFractionDigits: 0,
  }).format(naira);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-NG").format(n);
}
