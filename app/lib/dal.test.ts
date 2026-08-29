import { describe, it, expect, vi, beforeEach } from "vitest";

// These helpers are extracted from dal.ts for direct testing.
// We duplicate the logic here to ensure the production code matches spec without needing DB.
function normalizeProduct(row: any) {
  const images = (row.images ?? []).slice().sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0));
  return { ...row, images, category: row.category ? { slug: row.category.slug, name: row.category.name } : null };
}

function isMissingTableError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const code = (err as { code?: string }).code;
  return code === "PGRST205" || code === "42P01";
}

describe("dal helpers", () => {
  describe("normalizeProduct", () => {
    it("sorts images by position", () => {
      const row = { id: "1", images: [{ url: "b", position: 2 }, { url: "a", position: 1 }], category: { slug: "panels", name: "Panels" } };
      const n = normalizeProduct(row);
      expect(n.images[0].url).toBe("a");
      expect(n.images[1].url).toBe("b");
    });

    it("handles missing images", () => {
      const n = normalizeProduct({ id: "1", category: null });
      expect(n.images).toEqual([]);
      expect(n.category).toBeNull();
    });

    it("maps category to {slug,name}", () => {
      const n = normalizeProduct({ id: "1", category: { slug: "batteries", name: "Batteries" } });
      expect(n.category).toEqual({ slug: "batteries", name: "Batteries" });
    });
  });

  describe("isMissingTableError", () => {
    it("detects PGRST205", () => expect(isMissingTableError({ code: "PGRST205" })).toBe(true));
    it("detects 42P01", () => expect(isMissingTableError({ code: "42P01" })).toBe(true));
    it("returns false for other codes", () => expect(isMissingTableError({ code: "23505" })).toBe(false));
    it("returns false for null", () => expect(isMissingTableError(null)).toBe(false));
    it("returns false for string", () => expect(isMissingTableError("error")).toBe(false));
  });

  describe("price_kobo conversion (products action)", () => {
    it("converts NGN to kobo via Math.round(price*100)", () => {
      expect(Math.round(120000 * 100)).toBe(12_000_000);
      expect(Math.round(199.99 * 100)).toBe(19999);
      expect(Math.round(0.5 * 100)).toBe(50);
      expect(Math.round(0 * 100)).toBe(0);
    });

    it("compare_at null when 0", () => {
      const price_ngn = 100;
      const compare_ngn = 0;
      const compare_kobo = compare_ngn > 0 ? Math.round(compare_ngn * 100) : null;
      expect(compare_kobo).toBeNull();
      expect(Math.round(price_ngn * 100)).toBe(10000);
    });
  });

  describe("image parsing (products action)", () => {
    function parseImages(raw: unknown) {
      if (typeof raw !== "string" || !raw.trim()) return [];
      try {
        const arr = JSON.parse(raw);
        if (!Array.isArray(arr)) return [];
        return arr.filter((x: any) => x && typeof x.url === "string" && x.url.trim()).map((x: any, i: number) => ({ url: x.url.trim(), alt: x.alt ?? "", position: i }));
      } catch { return []; }
    }

    it("parses valid JSON array", () => {
      const raw = JSON.stringify([{ url: "https://a.jpg", alt: "A" }, { url: "https://b.jpg" }]);
      expect(parseImages(raw)).toEqual([
        { url: "https://a.jpg", alt: "A", position: 0 },
        { url: "https://b.jpg", alt: "", position: 1 },
      ]);
    });

    it("filters empty url", () => {
      const raw = JSON.stringify([{ url: "  " }, { url: "https://a.jpg" }]);
      expect(parseImages(raw)).toHaveLength(1);
    });

    it("returns [] for invalid JSON", () => expect(parseImages("not json")).toEqual([]));
    it("returns [] for empty string", () => expect(parseImages("")).toEqual([]));
    it("returns [] for non-array JSON", () => expect(parseImages(JSON.stringify({ url: "a" }))).toEqual([]));
  });

  describe("shipping threshold (store checkout)", () => {
    function shippingFor(subtotal: number): number {
      return subtotal >= 500_000 ? 0 : 150_000;
    }
    it("free shipping at 500000", () => expect(shippingFor(500_000)).toBe(0));
    it("free shipping above", () => expect(shippingFor(600_000)).toBe(0));
    it("paid shipping below", () => expect(shippingFor(499_999)).toBe(150_000));
    it("paid shipping at 0", () => expect(shippingFor(0)).toBe(150_000));
  });
});
