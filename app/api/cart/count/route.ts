// Returns the current cart's item count for the header badge.
import { NextResponse } from "next/server";
import { getCart } from "@/app/lib/cart";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const items = await getCart();
  const count = items.reduce((a, it) => a + it.quantity, 0);
  return NextResponse.json({ count });
}
