import Link from "next/link";
import { redirect } from "next/navigation";
import { getCart } from "@/app/lib/cart";
import { getSessionUser } from "@/app/lib/dal";
import { formatNGN } from "@/app/lib/format";
import { CheckoutForm } from "./CheckoutForm";

export const metadata = { title: "Checkout | Damdavy" };
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const [items, user] = await Promise.all([getCart(), getSessionUser()]);
  if (items.length === 0) redirect("/cart");
  if (!user) redirect(`/login?next=/checkout`);

  const subtotal = items.reduce(
    (a, it) => a + (it.product?.price_kobo ?? 0) * it.quantity,
    0,
  );
  const shipping = subtotal >= 5_000_00 ? 0 : 150_000;
  const total = subtotal + shipping;

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Logged in as {user.email}. <Link href="/cart" className="underline">Back to cart</Link>
      </p>

      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_360px]">
        <CheckoutForm />

        <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-5 text-sm">
          <h2 className="font-medium">Order summary</h2>
          <ul className="mt-4 space-y-2">
            {items.map((it) => (
              <li key={it.product_id} className="flex justify-between">
                <span className="line-clamp-1">{it.product?.name} × {it.quantity}</span>
                <span>{formatNGN((it.product?.price_kobo ?? 0) * it.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 border-t border-neutral-200 pt-3">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatNGN(subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatNGN(shipping)}</span></div>
            <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{formatNGN(total)}</span></div>
          </div>
          <p className="mt-4 text-xs text-neutral-500">
            You'll be redirected to Paystack to complete payment. We accept cards, bank transfer and USSD.
          </p>
        </aside>
      </div>
    </main>
  );
}
