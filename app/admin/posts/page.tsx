import Link from "next/link";
import { listPosts } from "@/app/lib/dal";
import { deletePostAction } from "@/app/lib/actions/content";
import { ConfirmDeleteButton } from "@/app/_components/ConfirmDeleteButton";
import { AdminHeader, AdminNewButton, AdminTable, AdminEmpty, Panel } from "../AdminUI";

export const metadata = { title: "Admin · Posts | Green Sunsure" };
export const dynamic = "force-dynamic";

const fmtDate = (v: string) => {
  try {
    return new Date(v).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return v;
  }
};

export default async function AdminPostsListPage() {
  const posts = await listPosts({ limit: 200 });

  return (
    <div>
      <AdminHeader
        eyebrow="Content"
        title="Blog posts"
        description="Articles published on /our-blog."
        action={<AdminNewButton href="/admin/posts/new" label="+ New post" />}
      />

      <div className="mt-6">
        {posts.length === 0 ? (
          <Panel>
            <AdminEmpty
              title="No blog posts yet"
              body="Write your first article — it publishes to the blog instantly."
              action={<AdminNewButton href="/admin/posts/new" label="Write first post" />}
            />
          </Panel>
        ) : (
          <Panel>
            <AdminTable head={["Title", "Category", "Published", "Status", "Actions"]} colSpan={5} count={posts.length}>
              {posts.map((p) => (
                <tr key={p.id} className="transition hover:bg-[var(--panel-muted)]">
                  <td className="px-4 py-3.5 font-semibold md:px-5">
                    <Link href={`/admin/posts/${p.slug}`} className="text-[var(--ink-950)] hover:underline">
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3.5 text-[var(--ink-600)] md:px-5">{p.category ?? "—"}</td>
                  <td className="tnum whitespace-nowrap px-4 py-3.5 text-[var(--ink-600)] md:px-5">{fmtDate(p.published_at)}</td>
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
                      <Link href={`/admin/posts/${p.slug}`} className="rounded-full px-0.5 text-xs font-semibold text-[var(--brand-blue)] hover:underline">
                        Edit
                      </Link>
                      <form action={deletePostAction} className="inline">
                        <input type="hidden" name="id" value={p.id} />
                        <ConfirmDeleteButton
                          message={`Delete post "${p.title}"? This cannot be undone.`}
                          className="rounded-full px-0.5 text-xs font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </ConfirmDeleteButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </AdminTable>
          </Panel>
        )}
      </div>
    </div>
  );
}
