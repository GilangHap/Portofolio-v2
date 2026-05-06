import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProjectById } from "@/app/actions/projects";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);
  
  if (!project) {
    notFound();
  }

  const mappedData = {
    ...project,
    selectedSkillIds: project.selectedSkillIds || [],
    features: project.features || [],
    challenges: project.challenges || [],
    solutions: project.solutions || [],
    metrics: project.metrics || [],
    screenshots: project.screenshots || [],
  };

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/projects" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors mb-4">
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Link>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Edit Project</h1>
        <p className="text-text-secondary">Update the details of your existing project.</p>
      </div>

      <ProjectForm initialData={mappedData} projectId={project.id} />
    </div>
  );
}
