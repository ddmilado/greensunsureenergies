import Link from "next/link";
import { listProducts, listCategories } from "@/app/lib/dal";
import { formatNGN } from "@/app/lib/format";
import { addToCartAction } from "@/app/lib/actions/store";
import { AddToCartButton } from "./_components/AddToCartButton";

export const metadata = {
  title: "Store | Damdavy Solar",
  description: "Shop solar batteries, inverters, panels and accessories.",
};

type SP = { category?: string; q?: string };

export default async function StorePage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const [categories, products] = await Promise.all([
    listCategories(),
    listProducts({ categorySlug: sp.category, search: sp.q }),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Solar Store</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Genuine solar products, shipped nationwide. Pay with card, transfer or USSD.
          </p>
        </div>
        <form className="flex gap-2" action="/store">
          <input
            name="q"
            defaultValue={sp.q ?? ""}
            placeholder="Search products"
            className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm w-56"
          />
          {sp.category && <input type="hidden" name="category" value={sp.category} />}
          <button className="rounded-md border border-neutral-900 bg-black px-4 py-2 text-sm font-medium text-white">Search</button>
        </form>
      </header>

      <div className="grid gap-10 md:grid-cols-[220px_1fr]">
        <aside className="space-y-1">
          <Link
            href="/store"
            className={`block rounded-md px-3 py-2 text-sm ${!sp.category ? "bg-neutral-900 text-white" : "hover:bg-neutral-100"}`}
          >
            All products
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/store?category=${c.slug}`}
              className={`block rounded-md px-3 py-2 text-sm ${sp.category === c.slug ? "bg-neutral-900 text-white" : "hover:bg-neutral-100"}`}
            >
              {c.name}
            </Link>
          ))}
        </aside>

        <section>
          {products.length === 0 ? (
            <p className="text-sm text-neutral-500">No products match your filters yet.</p>
          ) : (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p: any) => {
                const image = p.images?.[0]?.url;
                return (
                  <li key={p.id} className="group overflow-hidden rounded-xl border border-neutral-200 bg-white">
                    <Link href={`/store/${p.slug}`} className="block aspect-square overflow-hidden bg-neutral-50">
                      {image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={image} alt={p.name} className="h-full w-full object-cover transition group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">No image</div>
                      )}
                    </Link>
                    <div className="p-4">
                      <Link href={`/store/${p.slug}`} className="block">
                        <h3 className="line-clamp-1 font-medium">{p.name}</h3>
                        <p className="text-xs text-neutral-500">{p.brand}</p>
                      </Link>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-semibold">{formatNGN(p.price_kobo)}</span>
                        <form action={addToCartAction}>
                          <input type="hidden" name="product_id" value={p.id} />
                          <input type="hidden" name="quantity" value={1} />
                          <AddToCartButton />
                        </form>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
