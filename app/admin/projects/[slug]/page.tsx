import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/app/lib/dal";
import { updateProjectAction } from "@/app/lib/actions/content";
import { ProjectForm } from "../ProjectForm";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export default async function EditProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Edit project</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Slug: <code>{project.slug}</code>
      </p>
      <div className="mt-6">
        <ProjectForm
          slug={project.slug}
          action={updateProjectAction as unknown as Parameters<typeof ProjectForm>[0]["action"]}
          defaults={{
            title: project.title,
            slug: project.slug,
            category: project.category,
            client_type: project.client_type ?? "",
            location: project.location ?? "",
            system_size: project.system_size ?? "",
            panels: project.panels ?? "",
            batteries: project.batteries ?? "",
            inverter: project.inverter ?? "",
            installation: project.installation ?? "",
            outcome: project.outcome ?? "",
            excerpt: project.excerpt ?? "",
            body: project.body ?? "",
            cover_image: project.cover_image ?? "",
            featured: project.featured,
            active: project.active,
            position: project.position,
          }}
        />
      </div>
    </div>
  );
}
