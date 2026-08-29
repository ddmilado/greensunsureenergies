import { notFound } from "next/navigation";
import { adminGetProduct, listCategories } from "@/app/lib/dal";
import { updateProductAction } from "@/app/lib/actions/products";
import { ProductForm } from "../ProductForm";

export const dynamic = "force-dynamic";
type Params = { slug: string };

export default async function EditProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [product, categories] = await Promise.all([adminGetProduct(slug), listCategories()]);
  if (!product) notFound();

  const images = (product.images ?? []).map((im: any) => ({ url: im.url, alt: im.alt ?? "" }));

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Edit product</h1>
          <p className="mt-1 text-sm text-neutral-500">Slug: <code>{product.slug}</code></p>
        </div>
        <a
          href={`/store/${product.slug}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-neutral-300 px-3 py-2 text-xs font-medium hover:bg-neutral-100"
        >
          View on site
        </a>
      </div>
      <div className="mt-6">
        <ProductForm
          slug={product.slug}
          action={updateProductAction as unknown as Parameters<typeof ProductForm>[0]["action"]}
          categories={categories as { id: string; slug: string; name: string }[]}
          defaults={{
            name: product.name,
            slug: product.slug,
            brand: product.brand ?? "",
            category_id: product.category?.id ?? "",
            price_kobo: product.price_kobo,
            compare_at_kobo: product.compare_at_kobo ?? 0,
            stock: product.stock,
            active: product.active,
            wattage_w: product.wattage_w ?? 0,
            capacity_ah: product.capacity_ah ?? 0,
            voltage_v: product.voltage_v ?? 0,
            warranty_yrs: product.warranty_yrs ?? 0,
            short_desc: product.short_desc ?? "",
            description: product.description ?? "",
            images,
          }}
        />
      </div>
    </div>
  );
}
