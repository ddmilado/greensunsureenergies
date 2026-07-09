import Link from "next/link";
import { logoutAction } from "@/app/lib/actions/auth";
import { getSessionUser } from "@/app/lib/dal";

export const metadata = { title: "Account | Damdavy" };
export const dynamic = "force-dynamic";

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ welcome?: string }> }) {
  const sp = await searchParams;
  const user = await getSessionUser();
  if (!user) return null;
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">My account</h1>
      {sp.welcome === "1" && (
        <p className="mt-2 rounded-md bg-green-50 p-3 text-sm text-green-800">
          Welcome to Damdavy, {user.fullName}. Your account has been created.
        </p>
      )}
      <dl className="mt-8 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-neutral-500">Name</dt>
          <dd className="font-medium">{user.fullName}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Email</dt>
          <dd className="font-medium">{user.email}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Role</dt>
          <dd className="font-medium">{user.isAdmin ? "Administrator" : "Customer"}</dd>
        </div>
      </dl>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/account/orders" className="rounded-md border border-neutral-900 px-4 py-2.5 text-sm font-medium hover:bg-neutral-900 hover:text-white">
          My orders
        </Link>
        {user.isAdmin && (
          <>
            <Link href="/admin" className="rounded-md border border-neutral-900 px-4 py-2.5 text-sm font-medium hover:bg-neutral-900 hover:text-white">
              Admin · overview
            </Link>
            <Link href="/admin/products" className="rounded-md border border-neutral-900 px-4 py-2.5 text-sm font-medium hover:bg-neutral-900 hover:text-white">
              Products
            </Link>
            <Link href="/admin/projects" className="rounded-md border border-neutral-900 px-4 py-2.5 text-sm font-medium hover:bg-neutral-900 hover:text-white">
              Projects
            </Link>
            <Link href="/admin/posts" className="rounded-md border border-neutral-900 px-4 py-2.5 text-sm font-medium hover:bg-neutral-900 hover:text-white">
              Blog posts
            </Link>
            <Link href="/admin/leads" className="rounded-md border border-neutral-900 px-4 py-2.5 text-sm font-medium hover:bg-neutral-900 hover:text-white">
              Leads
            </Link>
          </>
        )}
        <form action={logoutAction}>
          <button className="rounded-md bg-red-600 px-4 py-2.5 text-sm font-medium text-white">Sign out</button>
        </form>
      </div>
    </main>
  );
}
