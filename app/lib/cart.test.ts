import { describe, it, expect } from "vitest";
import { cartTotalsKobo } from "./cart";
import type { CartItem } from "./types";

describe("cart", () => {
  describe("cartTotalsKobo", () => {
    it("returns 0 for empty cart", () => {
      expect(cartTotalsKobo([])).toEqual({ subtotal: 0, total: 0 });
    });

    it("sums single item", () => {
      const items: CartItem[] = [
        { product_id: "p1", quantity: 2, product: { id: "p1", slug: "a", name: "A", brand: null, price_kobo: 500000, currency: "NGN", stock: 10 } },
      ];
      expect(cartTotalsKobo(items).subtotal).toBe(1_000_000);
    });

    it("sums multiple items", () => {
      const items: CartItem[] = [
        { product_id: "p1", quantity: 1, product: { id: "p1", slug: "a", name: "A", brand: null, price_kobo: 12000000, currency: "NGN", stock: 5 } },
        { product_id: "p2", quantity: 3, product: { id: "p2", slug: "b", name: "B", brand: null, price_kobo: 4000000, currency: "NGN", stock: 10 } },
      ];
      // 12M + 12M = 24M
      expect(cartTotalsKobo(items).subtotal).toBe(24_000_000);
      expect(cartTotalsKobo(items).total).toBe(24_000_000);
    });

    it("handles missing product (price 0)", () => {
      const items: CartItem[] = [{ product_id: "p1", quantity: 2 }];
      expect(cartTotalsKobo(items).subtotal).toBe(0);
    });

    it("handles product with null price", () => {
      const items: CartItem[] = [
        { product_id: "p1", quantity: 1, product: { id: "p1", slug: "a", name: "A", brand: null, price_kobo: 0, currency: "NGN", stock: 0 } },
      ];
      expect(cartTotalsKobo(items).subtotal).toBe(0);
    });

    it("shipping threshold logic (caller handles) — subtotal alone", () => {
      // startCheckoutAction logic: shipping 0 if subtotal >= 500000 else 150000
      const free = cartTotalsKobo([
        { product_id: "p1", quantity: 1, product: { id: "p1", slug: "a", name: "A", brand: null, price_kobo: 500000, currency: "NGN", stock: 10 } },
      ]);
      expect(free.subtotal).toBe(500000);
      const paid = cartTotalsKobo([
        { product_id: "p1", quantity: 1, product: { id: "p1", slug: "a", name: "A", brand: null, price_kobo: 49900, currency: "NGN", stock: 10 } },
      ]);
      expect(paid.subtotal).toBe(49900);
    });
  });
});
