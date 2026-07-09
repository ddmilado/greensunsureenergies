import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, listProducts } from "@/app/lib/dal";
import { formatNGN } from "@/app/lib/format";
import { addToCartAction } from "@/app/lib/actions/store";
import { AddToCartButton } from "../_components/AddToCartButton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  return { title: p ? `${p.name} | Damdavy` : "Product not found" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const others = (await listProducts({ categorySlug: product.category?.slug }))
    .filter((p: any) => p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <nav className="mb-6 text-sm text-neutral-500">
        <Link href="/store" className="underline">Store</Link>
        {product.category && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/store?category=${product.category.slug}`} className="underline">{product.category.name}</Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="grid gap-3">
          {product.images.length === 0 ? (
            <div className="aspect-square w-full rounded-xl bg-neutral-100" />
          ) : (
            product.images.map((img) => (
              <div key={img.id} className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.alt ?? product.name} className="aspect-square w-full object-cover" />
              </div>
            ))
          )}
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
          {product.brand && <p className="mt-1 text-sm text-neutral-500">{product.brand}</p>}
          <p className="mt-4 text-2xl font-semibold">{formatNGN(product.price_kobo)}</p>
          {product.compare_at_kobo && (
            <p className="text-sm text-neutral-500 line-through">{formatNGN(product.compare_at_kobo)}</p>
          )}

          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {product.wattage_w != null && (<><dt className="text-neutral-500">Wattage</dt><dd>{product.wattage_w} W</dd></>)}
            {product.capacity_ah != null && (<><dt className="text-neutral-500">Capacity</dt><dd>{product.capacity_ah} Ah</dd></>)}
            {product.voltage_v != null && (<><dt className="text-neutral-500">Voltage</dt><dd>{product.voltage_v} V</dd></>)}
            {product.warranty_yrs != null && (<><dt className="text-neutral-500">Warranty</dt><dd>{product.warranty_yrs} years</dd></>)}
            <dt className="text-neutral-500">Availability</dt>
            <dd>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</dd>
          </dl>

          {product.short_desc && <p className="mt-6 text-sm text-neutral-700">{product.short_desc}</p>}

          <form action={addToCartAction} className="mt-8 flex items-center gap-3">
            <input type="hidden" name="product_id" value={product.id} />
            <label htmlFor="quantity" className="text-sm">Qty</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              defaultValue={1}
              min={1}
              max={Math.max(1, product.stock)}
              className="w-20 rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
            <AddToCartButton />
          </form>

          {product.description && (
            <section className="mt-10">
              <h2 className="text-lg font-medium">Description</h2>
              <p className="mt-2 whitespace-pre-line text-sm text-neutral-700">{product.description}</p>
            </section>
          )}
        </div>
      </div>

      {others.length > 0 && (
        <section className="mt-20">
          <h2 className="text-lg font-medium">You may also like</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {others.map((p: any) => (
              <li key={p.id} className="rounded-lg border border-neutral-200 bg-white p-3">
                <Link href={`/store/${p.slug}`} className="block">
                  <div className="aspect-square overflow-hidden rounded bg-neutral-50">
                    {p.images?.[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.images[0].url} alt={p.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <p className="mt-2 line-clamp-1 text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-neutral-500">{formatNGN(p.price_kobo)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
