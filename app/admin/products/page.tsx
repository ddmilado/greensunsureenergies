import Link from "next/link";
import { formatNGN } from "@/app/lib/format";
import { adminListProducts } from "@/app/lib/dal";
import { deleteProductAction } from "@/app/lib/actions/products";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · Products | Green Sunsure" };

export default async function AdminProductsPage() {
  const products = await adminListProducts();
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
          <p className="mt-1 text-sm text-neutral-500">Catalog items, prices, and stock.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
        >
          + New product
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">Stock</th>
              <th className="px-4 py-3 text-right">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {products.map((p: any) => {
              const catName = (Array.isArray(p.category) ? p.category[0]?.name : p.category?.name) ?? "—";
              return (
                <tr key={p.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-3 font-medium text-neutral-900">
                    <Link href={`/admin/products/${p.slug}`} className="hover:underline">
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{p.brand ?? "—"}</td>
                  <td className="px-4 py-3 text-neutral-600">{catName}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatNGN(p.price_kobo)}</td>
                  <td className="px-4 py-3 text-right">{p.stock ?? "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                        p.active ? "bg-emerald-100 text-emerald-800" : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {p.active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <form action={deleteProductAction} className="inline">
                      <input type="hidden" name="id" value={p.id} />
                      <button
                        type="submit"
                        className="text-xs text-red-600 hover:underline"
                        onClick={(e) => {
                          if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) e.preventDefault();
                        }}
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-neutral-500">
                  No products yet.{" "}
                  <Link href="/admin/products/new" className="font-medium text-neutral-900 underline">
                    Add your first product
                  </Link>
                  .
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
