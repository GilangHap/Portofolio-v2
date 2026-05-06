"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import ImageUploader from "./ImageUploader";
import { saveProject } from "@/app/actions/projects";

interface ProjectFormProps {
  initialData?: any; // To be typed properly later
  projectId?: string | null;
}

export default function ProjectForm({ initialData, projectId = null }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Core Fields
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    number: initialData?.number || "",
    short_description: initialData?.short_description || "",
    thumbnail_url: initialData?.thumbnail_url || "",
    github_url: initialData?.github_url || "",
    live_url: initialData?.live_url || "",
    is_featured: initialData?.is_featured ?? true,
    
    // Details
    problem: initialData?.problem || "",
    goal: initialData?.goal || "",
    target_users: initialData?.target_users || "",
    role: initialData?.role || "",
    duration: initialData?.duration || "",
    team_size: initialData?.team_size || "",
    project_status: initialData?.project_status || "Completed",
    year: initialData?.year || new Date().getFullYear(),
    arch_description: initialData?.arch_description || "",
    arch_image_url: initialData?.arch_image_url || "",
  });

  // Repeater Fields
  const [techStack, setTechStack] = useState<string[]>(initialData?.techStack || []);
  const [techInput, setTechInput] = useState("");

  const [features, setFeatures] = useState<{title: string, description: string}[]>(initialData?.features || []);
  const [challenges, setChallenges] = useState<string[]>(initialData?.challenges || []);
  const [solutions, setSolutions] = useState<string[]>(initialData?.solutions || []);
  const [metrics, setMetrics] = useState<{label: string, value: string}[]>(initialData?.metrics || []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTech = (techToRemove: string) => {
    setTechStack(techStack.filter(t => t !== techToRemove));
  };

  // Generic Repeater Add/Remove
  const addFeature = () => setFeatures([...features, { title: "", description: "" }]);
  const updateFeature = (index: number, field: string, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFeatures(newFeatures);
  };
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));

  const addChallenge = () => setChallenges([...challenges, ""]);
  const updateChallenge = (index: number, value: string) => {
    const newArr = [...challenges];
    newArr[index] = value;
    setChallenges(newArr);
  };
  const removeChallenge = (index: number) => setChallenges(challenges.filter((_, i) => i !== index));

  const addSolution = () => setSolutions([...solutions, ""]);
  const updateSolution = (index: number, value: string) => {
    const newArr = [...solutions];
    newArr[index] = value;
    setSolutions(newArr);
  };
  const removeSolution = (index: number) => setSolutions(solutions.filter((_, i) => i !== index));

  const addMetric = () => setMetrics([...metrics, { label: "", value: "" }]);
  const updateMetric = (index: number, field: string, value: string) => {
    const newMetrics = [...metrics];
    newMetrics[index] = { ...newMetrics[index], [field]: value };
    setMetrics(newMetrics);
  };
  const removeMetric = (index: number) => setMetrics(metrics.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        techStack,
        features,
        challenges,
        solutions,
        metrics
      };
      await saveProject(projectId || null, payload);
      alert("Project Saved!");
      router.push("/admin/projects");
    } catch (error) {
      console.error(error);
      alert("Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 max-w-5xl pb-16">
      
      {/* 1. Basic Information */}
      <section className="bg-surface border border-border rounded-xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-text-primary border-b border-border pb-4 mb-6">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-2">Project Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Slug</label>
            <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Number (e.g. 01)</label>
            <input type="text" name="number" value={formData.number} onChange={handleChange} className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-2">Short Description</label>
            <textarea name="short_description" value={formData.short_description} onChange={handleChange} rows={2} className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary"></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-2">Thumbnail Image</label>
            <ImageUploader 
              currentImage={formData.thumbnail_url} 
              onUpload={(url) => setFormData(prev => ({...prev, thumbnail_url: url}))} 
              bucket="projects" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">GitHub URL</label>
            <input type="url" name="github_url" value={formData.github_url} onChange={handleChange} className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Live Demo URL</label>
            <input type="url" name="live_url" value={formData.live_url} onChange={handleChange} className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary" />
          </div>
        </div>

        {/* Tech Stack Mini Manager */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-text-secondary mb-2">Tech Stack</label>
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
              placeholder="Add tech (e.g. Next.js)"
              className="flex-1 px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary" 
            />
            <button type="button" onClick={handleAddTech} className="px-4 py-2 bg-surface border border-border rounded hover:border-primary text-text-primary">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack.map(tech => (
              <span key={tech} className="px-3 py-1 bg-background border border-border text-xs rounded flex items-center gap-2">
                {tech}
                <button type="button" onClick={() => removeTech(tech)} className="text-red-400 hover:text-red-300">&times;</button>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Project Details */}
      <section className="bg-surface border border-border rounded-xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-text-primary border-b border-border pb-4 mb-6">Deep Dive Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-2">The Problem</label>
            <textarea name="problem" value={formData.problem} onChange={handleChange} rows={3} className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary"></textarea>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-2">The Goal</label>
            <textarea name="goal" value={formData.goal} onChange={handleChange} rows={3} className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary"></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-2">Target Users</label>
            <input type="text" name="target_users" value={formData.target_users} onChange={handleChange} className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary" />
          </div>

          {/* Meta Grid */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Role</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Duration</label>
            <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Team Size</label>
            <input type="text" name="team_size" value={formData.team_size} onChange={handleChange} className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Project Status</label>
            <select name="project_status" value={formData.project_status} onChange={handleChange} className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary appearance-none">
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-2">Architecture Description</label>
            <textarea name="arch_description" value={formData.arch_description} onChange={handleChange} rows={3} className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary mb-4"></textarea>
            
            <label className="block text-sm font-medium text-text-secondary mb-2">Architecture Diagram</label>
            <ImageUploader 
              currentImage={formData.arch_image_url} 
              onUpload={(url) => setFormData(prev => ({...prev, arch_image_url: url}))} 
              bucket="projects" 
            />
          </div>
        </div>
      </section>

      {/* 3. Features Repeater */}
      <section className="bg-surface border border-border rounded-xl p-8 shadow-sm">
        <div className="flex justify-between items-center border-b border-border pb-4 mb-6">
          <h2 className="text-xl font-bold text-text-primary">Key Features</h2>
          <button type="button" onClick={addFeature} className="flex items-center text-sm font-bold text-primary hover:text-primary-muted"><Plus size={16} className="mr-1"/> Add Feature</button>
        </div>
        
        <div className="space-y-4">
          {features.map((feature, i) => (
            <div key={i} className="flex gap-4 items-start bg-background p-4 border border-border rounded">
              <div className="flex-1 space-y-3">
                <input type="text" placeholder="Feature Title" value={feature.title} onChange={(e) => updateFeature(i, 'title', e.target.value)} className="w-full px-4 py-2 bg-surface border border-border rounded focus:border-primary" />
                <textarea placeholder="Description" value={feature.description} onChange={(e) => updateFeature(i, 'description', e.target.value)} rows={2} className="w-full px-4 py-2 bg-surface border border-border rounded focus:border-primary"></textarea>
              </div>
              <button type="button" onClick={() => removeFeature(i)} className="p-2 text-red-400 hover:bg-red-400/10 rounded"><Trash2 size={18} /></button>
            </div>
          ))}
          {features.length === 0 && <p className="text-text-secondary text-sm">No features added yet.</p>}
        </div>
      </section>

      {/* 4. Challenges & Solutions */}
      <section className="bg-surface border border-border rounded-xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center border-b border-border pb-4 mb-6">
            <h2 className="text-xl font-bold text-red-400">Challenges</h2>
            <button type="button" onClick={addChallenge} className="text-sm font-bold text-red-400 hover:text-red-300"><Plus size={16} /></button>
          </div>
          <div className="space-y-3">
            {challenges.map((c, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={c} onChange={(e) => updateChallenge(i, e.target.value)} className="flex-1 px-4 py-2 bg-background border border-border rounded focus:border-red-400" />
                <button type="button" onClick={() => removeChallenge(i)} className="p-2 text-red-400 hover:bg-red-400/10 rounded"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center border-b border-border pb-4 mb-6">
            <h2 className="text-xl font-bold text-primary">Solutions</h2>
            <button type="button" onClick={addSolution} className="text-sm font-bold text-primary hover:text-primary-muted"><Plus size={16} /></button>
          </div>
          <div className="space-y-3">
            {solutions.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={s} onChange={(e) => updateSolution(i, e.target.value)} className="flex-1 px-4 py-2 bg-background border border-border rounded focus:border-primary" />
                <button type="button" onClick={() => removeSolution(i)} className="p-2 text-red-400 hover:bg-red-400/10 rounded"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Metrics Repeater */}
      <section className="bg-surface border border-border rounded-xl p-8 shadow-sm">
        <div className="flex justify-between items-center border-b border-border pb-4 mb-6">
          <h2 className="text-xl font-bold text-text-primary">Impact Metrics</h2>
          <button type="button" onClick={addMetric} className="flex items-center text-sm font-bold text-primary hover:text-primary-muted"><Plus size={16} className="mr-1"/> Add Metric</button>
        </div>
        
        <div className="space-y-4">
          {metrics.map((metric, i) => (
            <div key={i} className="flex gap-4 items-center bg-background p-4 border border-border rounded">
              <input type="text" placeholder="Value (e.g. 60%, 2x)" value={metric.value} onChange={(e) => updateMetric(i, 'value', e.target.value)} className="w-1/3 px-4 py-2 bg-surface border border-border rounded focus:border-primary" />
              <input type="text" placeholder="Label (e.g. Faster Load Time)" value={metric.label} onChange={(e) => updateMetric(i, 'label', e.target.value)} className="flex-1 px-4 py-2 bg-surface border border-border rounded focus:border-primary" />
              <button type="button" onClick={() => removeMetric(i)} className="p-2 text-red-400 hover:bg-red-400/10 rounded"><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-64 right-0 p-4 bg-surface/80 backdrop-blur border-t border-border flex justify-end gap-4 z-10">
        <Link href="/admin/projects" className="px-6 py-2.5 border border-border text-text-primary rounded font-bold hover:bg-background transition-colors">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center px-6 py-2.5 bg-primary text-black font-bold rounded hover:bg-primary-muted transition-colors disabled:opacity-70"
        >
          {loading ? "Saving..." : <><Save size={18} className="mr-2" /> Save Project</>}
        </button>
      </div>

    </form>
  );
}
