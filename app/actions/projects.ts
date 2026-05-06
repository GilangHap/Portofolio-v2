"use server";

import { supabase } from "@/lib/supabase";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  const { data, error } = await supabase
    .from('Project')
    .select('*, ProjectSkill(Skill(*))')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
  
  // Flatten the skills
  return data.map(project => ({
    ...project,
    techStack: (project.ProjectSkill || []).map((ps: any) => ps.Skill?.name).filter(Boolean)
  }));
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from('Project')
    .select('*, ProjectFeature(*), ProjectChallenge(*), ProjectSolution(*), ProjectMetric(*), ProjectSkill(Skill(*))')
    .eq('slug', slug)
    .maybeSingle();
    
  if (error) {
    console.error("Error fetching project:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    return null;
  }
  
  if (data) {
    return {
      ...data,
      features: data.ProjectFeature || [],
      challenges: (data.ProjectChallenge || []).map((c: any) => c.content),
      solutions: (data.ProjectSolution || []).map((s: any) => s.content),
      metrics: data.ProjectMetric || [],
      skills: (data.ProjectSkill || []).map((ps: any) => ps.Skill).filter(Boolean)
    };
  }
  return null;
}

export async function getProjectById(id: string) {
  const { data, error } = await supabase.from('Project').select('*, ProjectFeature(*), ProjectChallenge(*), ProjectSolution(*), ProjectMetric(*)').eq('id', id).single();
  if (error) console.error("Error fetching project:", error);
  
  if (data) {
    // Map related tables back to arrays for the form
    return {
      ...data,
      features: data.ProjectFeature || [],
      challenges: (data.ProjectChallenge || []).map((c: any) => c.content),
      solutions: (data.ProjectSolution || []).map((s: any) => s.content),
      impact_metrics: data.ProjectMetric || []
    };
  }
  return data;
}

export async function saveProject(id: string | null, formData: any) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  // Separate Project base fields
  const payload = {
    title: formData.title,
    slug: formData.slug || formData.title.toLowerCase().replace(/\\s+/g, '-'),
    number: formData.number ? parseInt(formData.number as string) : null,
    short_description: formData.short_description,
    thumbnail_url: formData.thumbnail_url,
    github_url: formData.github_url,
    live_url: formData.live_url,
    is_featured: formData.is_featured,
    problem: formData.problem,
    goal: formData.goal,
    target_users: formData.target_users,
    role: formData.role,
    duration: formData.duration,
    team_size: formData.team_size,
    project_status: formData.project_status,
    year: formData.year ? parseInt(formData.year as string) : new Date().getFullYear(),
    arch_description: formData.arch_description,
    arch_image_url: formData.arch_image_url,
    updated_at: new Date().toISOString()
  };

  let response;
  if (id) {
    response = await supabase.from('Project').update(payload).eq('id', id).select().single();
  } else {
    // Prisma generated UUIDs, so we must manually supply them for Supabase REST API
    const newId = crypto.randomUUID();
    response = await supabase.from('Project').insert([{ id: newId, ...payload }]).select().single();
  }

  if (response.error) {
    console.error("Supabase Project Error:", JSON.stringify(response.error, null, 2));
    throw new Error(response.error.message);
  }

  const projectId = response.data.id;

  // Handle Relations
  if (id) {
    // Clean up old relations
    await Promise.all([
      supabase.from('ProjectFeature').delete().eq('project_id', projectId),
      supabase.from('ProjectChallenge').delete().eq('project_id', projectId),
      supabase.from('ProjectSolution').delete().eq('project_id', projectId),
      supabase.from('ProjectMetric').delete().eq('project_id', projectId),
    ]);
  }

  // Insert new relations with manual UUIDs
  const features = (formData.features || []).map((f: any, i: number) => ({ id: crypto.randomUUID(), project_id: projectId, title: f.title, description: f.description, order_index: i }));
  const challenges = (formData.challenges || []).map((c: string, i: number) => ({ id: crypto.randomUUID(), project_id: projectId, content: c, order_index: i }));
  const solutions = (formData.solutions || []).map((s: string, i: number) => ({ id: crypto.randomUUID(), project_id: projectId, content: s, order_index: i }));
  const metrics = (formData.metrics || []).map((m: any, i: number) => ({ id: crypto.randomUUID(), project_id: projectId, label: m.label, value: m.value, order_index: i }));

  await Promise.all([
    features.length > 0 ? supabase.from('ProjectFeature').insert(features) : Promise.resolve(),
    challenges.length > 0 ? supabase.from('ProjectChallenge').insert(challenges) : Promise.resolve(),
    solutions.length > 0 ? supabase.from('ProjectSolution').insert(solutions) : Promise.resolve(),
    metrics.length > 0 ? supabase.from('ProjectMetric').insert(metrics) : Promise.resolve()
  ]);

  revalidatePath('/admin/projects');
  revalidatePath('/'); // revalidate home page
  return response.data;
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  // Delete relations first to satisfy foreign key constraints
  await Promise.all([
    supabase.from('ProjectFeature').delete().eq('project_id', id),
    supabase.from('ProjectChallenge').delete().eq('project_id', id),
    supabase.from('ProjectSolution').delete().eq('project_id', id),
    supabase.from('ProjectMetric').delete().eq('project_id', id),
    supabase.from('ProjectSkill').delete().eq('project_id', id),
    supabase.from('ProjectScreenshot').delete().eq('project_id', id)
  ]);

  const { error } = await supabase.from('Project').delete().eq('id', id);
  if (error) throw new Error(error.message);
  
  revalidatePath('/admin/projects');
  revalidatePath('/');
  return true;
}
