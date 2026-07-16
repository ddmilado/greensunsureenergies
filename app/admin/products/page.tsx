import { formatNGN } from "@/app/lib/format";
import { adminListProducts } from "@/app/lib/dal";

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
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {products.map((p) => {
              const catName = (Array.isArray(p.category) ? p.category[0]?.name : p.category) ?? "—";
              return (
                <tr key={p.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-3 font-medium text-neutral-900">{p.name}</td>
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
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">
                  No products yet. Add some in your Supabase dashboard.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-neutral-500">
        Product create / edit forms can be built on top of the products table when you&rsquo;re ready.
      </p>
    </div>
  );
}
