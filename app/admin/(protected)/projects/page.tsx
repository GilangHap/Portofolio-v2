"use client";

import Link from "next/link";
import { Plus, Edit, Trash2, GripVertical, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getProjects, deleteProject } from "@/app/actions/projects";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (err) {
        alert("Error deleting project");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Manage Projects</h1>
          <p className="text-text-secondary">Add, edit, or reorder your portfolio projects.</p>
        </div>
        <Link 
          href="/admin/projects/new"
          className="flex items-center px-4 py-2 bg-primary text-black font-bold rounded hover:bg-primary-muted transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add Project
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background border-b border-border text-text-secondary text-sm">
              <th className="p-4 w-12 text-center">#</th>
              <th className="p-4 w-16">No</th>
              <th className="p-4">Project Title</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date Added</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id} className="border-b border-border hover:bg-background/50 transition-colors">
                <td className="p-4 text-center cursor-move text-text-secondary hover:text-text-primary">
                  <GripVertical size={18} className="inline-block" />
                </td>
                <td className="p-4 font-mono text-primary">{project.number}</td>
                <td className="p-4 font-bold text-text-primary">{project.title}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded border ${
                    project.project_status === 'Completed' ? 'border-primary/50 text-primary bg-primary/10' : 'border-border text-text-secondary'
                  }`}>
                    {project.project_status}
                  </span>
                </td>
                <td className="p-4 text-text-secondary text-sm">{new Date(project.created_at).toLocaleDateString()}</td>
                <td className="p-4 text-right space-x-2">
                  <Link 
                    href={`/admin/projects/${project.id}/edit`}
                    className="inline-flex items-center justify-center p-2 text-text-secondary hover:text-primary bg-background border border-border rounded transition-colors"
                  >
                    <Edit size={16} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="inline-flex items-center justify-center p-2 text-text-secondary hover:text-red-400 bg-background border border-border rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-text-secondary">
                  No projects found. Create your first project!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
