import { notFound } from "next/navigation";
import { getPostBySlug } from "@/app/lib/dal";
import { updatePostAction } from "@/app/lib/actions/content";
import { PostForm } from "../PostForm";
import { AdminHeader } from "../../AdminUI";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export default async function EditPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return (
    <div>
      <AdminHeader eyebrow="Content · Edit" title={`Edit post`} description={`Slug: ${post.slug}`} />
      <div className="mt-6">
        <PostForm
          slug={post.slug}
          action={updatePostAction as unknown as Parameters<typeof PostForm>[0]["action"]}
          defaults={{
            title: post.title,
            slug: post.slug,
            category: post.category ?? "",
            author_name: post.author_name ?? "Green Sunsure Team",
            reading_minutes: post.reading_minutes ?? 5,
            excerpt: post.excerpt ?? "",
            body: post.body ?? "",
            cover_image: post.cover_image ?? "",
            active: post.active,
          }}
        />
      </div>
    </div>
  );
}
