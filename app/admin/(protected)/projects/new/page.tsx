import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/projects" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors mb-4">
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Link>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Create New Project</h1>
        <p className="text-text-secondary">Fill out the details below to add a new project to your portfolio.</p>
      </div>

      <ProjectForm />
    </div>
  );
}
