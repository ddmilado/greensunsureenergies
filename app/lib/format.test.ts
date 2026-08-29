import { describe, it, expect } from "vitest";
import { koboToNaira, formatNGN, formatNumber, NGN } from "./format";

describe("format", () => {
  it("NGN constant", () => {
    expect(NGN).toBe("NGN");
  });

  describe("koboToNaira", () => {
    it("converts 0", () => expect(koboToNaira(0)).toBe(0));
    it("converts 1 kobo -> 0 (rounds)", () => expect(koboToNaira(1)).toBe(0));
    it("converts 50 kobo -> 1 (rounds up at .5)", () => expect(koboToNaira(50)).toBe(1));
    it("converts 100 kobo -> 1 naira", () => expect(koboToNaira(100)).toBe(1));
    it("converts 150_000 kobo -> 1500 naira (shipping)", () => expect(koboToNaira(150_000)).toBe(1500));
    it("converts 12_000_000 kobo -> 120_000 naira", () => expect(koboToNaira(12_000_000)).toBe(120_000));
    it("handles large Growatt price 200M kobo", () => expect(koboToNaira(200_000_000)).toBe(2_000_000));
    it("rounds 19999 kobo (199.99 naira) -> 200", () => expect(koboToNaira(19999)).toBe(200));
  });

  describe("formatNGN", () => {
    it("formats 0", () => expect(formatNGN(0)).toMatch(/₦\s?0/));
    it("formats 100 kobo as ₦1", () => expect(formatNGN(100)).toMatch(/₦\s?1\b/));
    it("formats 150000 kobo as ₦1,500", () => expect(formatNGN(150_000)).toMatch(/1,500/));
    it("formats 12_000_000 as ₦120,000", () => expect(formatNGN(12_000_000)).toMatch(/120,000/));
    it("uses NGN currency", () => {
      const s = formatNGN(10000);
      expect(s).toContain("₦");
    });
  });

  describe("formatNumber", () => {
    it("formats 0", () => expect(formatNumber(0)).toBe("0"));
    it("formats 1000 with separator", () => expect(formatNumber(1000)).toMatch(/1,000/));
    it("formats large number", () => expect(formatNumber(120000)).toMatch(/120,000/));
  });
});
