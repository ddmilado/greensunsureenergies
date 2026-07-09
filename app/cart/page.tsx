import Link from "next/link";
import { getCart } from "@/app/lib/cart";
import { formatNGN } from "@/app/lib/format";
import { removeFromCartAction, updateCartItemAction } from "@/app/lib/actions/store";

export const metadata = { title: "Cart | Damdavy" };
export const dynamic = "force-dynamic";

export default async function CartPage() {
  const items = await getCart();
  const subtotal = items.reduce(
    (a, it) => a + (it.product?.price_kobo ?? 0) * it.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Your cart is empty</h1>
        <p className="mt-2 text-sm text-neutral-500">Find something in the store.</p>
        <Link href="/store" className="mt-6 inline-block rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white">
          Browse the store
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Your cart</h1>
      <ul className="mt-8 divide-y divide-neutral-200 border-t border-b border-neutral-200">
        {items.map((it) => (
          <li key={it.product_id} className="flex items-center gap-4 py-4">
            <div className="h-20 w-20 overflow-hidden rounded bg-neutral-100">
              {it.product?.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.product.image} alt={it.product.name} className="h-full w-full object-cover" />
              )}
            </div>
            <div className="flex-1">
              <Link href={`/store/${it.product?.slug ?? ""}`} className="font-medium underline-offset-2 hover:underline">
                {it.product?.name ?? "Item"}
              </Link>
              <p className="text-xs text-neutral-500">{formatNGN(it.product?.price_kobo ?? 0)} each</p>
            </div>
            <form action={updateCartItemAction} className="flex items-center gap-2">
              <input type="hidden" name="product_id" value={it.product_id} />
              <input
                name="quantity"
                type="number"
                defaultValue={it.quantity}
                min={0}
                max={99}
                className="w-16 rounded-md border border-neutral-300 px-2 py-1 text-sm"
              />
              <button className="text-xs underline">Update</button>
            </form>
            <span className="w-24 text-right font-semibold">{formatNGN((it.product?.price_kobo ?? 0) * it.quantity)}</span>
            <form action={removeFromCartAction}>
              <input type="hidden" name="product_id" value={it.product_id} />
              <button className="text-xs text-red-600 underline">Remove</button>
            </form>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <Link href="/store" className="text-sm underline">← Continue shopping</Link>
        <div className="text-right">
          <p className="text-sm text-neutral-500">Subtotal</p>
          <p className="text-2xl font-semibold">{formatNGN(subtotal)}</p>
          <Link href="/checkout" className="mt-3 inline-block rounded-md bg-black px-5 py-3 text-sm font-medium text-white">
            Proceed to checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
