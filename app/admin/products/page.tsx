import Link from "next/link";
import { formatNGN } from "@/app/lib/format";
import { adminListProducts } from "@/app/lib/dal";
import { deleteProductAction } from "@/app/lib/actions/products";
import { ConfirmDeleteButton } from "@/app/_components/ConfirmDeleteButton";
import { AdminHeader, AdminNewButton, AdminTable, AdminEmpty, Panel } from "../AdminUI";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · Products | Green Sunsure" };

export default async function AdminProductsPage() {
  const products = await adminListProducts();
  const activeCount = products.filter((p: any) => p.active).length;

  return (
    <div>
      <AdminHeader
        eyebrow="Commerce"
        title="Products"
        description={`${activeCount} live · ${products.length - activeCount} hidden`}
        action={<AdminNewButton href="/admin/products/new" label="+ New product" />}
      />

      <div className="mt-6">
        {products.length === 0 ? (
          <Panel>
            <AdminEmpty
              title="No products yet"
              body="Add panels, batteries, inverters, and accessories to the store."
              action={<AdminNewButton href="/admin/products/new" label="Add first product" />}
            />
          </Panel>
        ) : (
          <Panel>
            <AdminTable head={["Name", "Brand", "Category", "Price", "Stock", "Status", "Actions"]} colSpan={7} count={products.length}>
              {products.map((p: any) => {
                const catName = (Array.isArray(p.category) ? p.category[0]?.name : p.category?.name) ?? "—";
                return (
                  <tr key={p.id} className="transition hover:bg-[var(--panel-muted)]">
                    <td className="px-4 py-3.5 font-semibold md:px-5">
                      <Link href={`/admin/products/${p.slug}`} className="text-[var(--ink-950)] hover:underline">
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3.5 text-[var(--ink-600)] md:px-5">{p.brand ?? "—"}</td>
                    <td className="px-4 py-3.5 text-[var(--ink-600)] md:px-5">{catName}</td>
                    <td className="tnum whitespace-nowrap px-4 py-3.5 text-right font-semibold md:px-5">{formatNGN(p.price_kobo)}</td>
                    <td className="tnum px-4 py-3.5 text-right md:px-5">
                      <span className={p.stock != null && p.stock <= 5 ? "font-semibold text-amber-700" : "text-[var(--ink-600)]"}>
                        {p.stock ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right md:px-5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ring-1 ${
                          p.active
                            ? "bg-emerald-50 text-emerald-800 ring-emerald-300/60"
                            : "bg-neutral-100 text-neutral-600 ring-neutral-300/60"
                        }`}
                      >
                        {p.active ? "Live" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right md:px-5">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/products/${p.slug}`}
                          className="rounded-full px-0.5 text-xs font-semibold text-[var(--brand-blue)] hover:underline"
                        >
                          Edit
                        </Link>
                        <form action={deleteProductAction} className="inline">
                          <input type="hidden" name="id" value={p.id} />
                          <ConfirmDeleteButton message={`Delete "${p.name}"? This cannot be undone.`} className="rounded-full px-0.5 text-xs font-medium text-red-600 hover:underline">
                            Delete
                          </ConfirmDeleteButton>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </AdminTable>
          </Panel>
        )}
      </div>
    </div>
  );
}
