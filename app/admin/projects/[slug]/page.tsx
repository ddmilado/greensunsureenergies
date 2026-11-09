import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/app/lib/dal";
import { updateProjectAction } from "@/app/lib/actions/content";
import { ProjectForm } from "../ProjectForm";
import { AdminHeader } from "../../AdminUI";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export default async function EditProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  return (
    <div>
      <AdminHeader eyebrow="Content · Edit" title={`Edit project`} description={`Slug: ${project.slug}`} />
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
