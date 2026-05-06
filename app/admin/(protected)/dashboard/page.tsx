import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  let stats = {
    projects: 0,
    skills: 0,
    experience: 0
  };

  try {
    const [projectsCount, skillsCount, experienceCount] = await Promise.all([
      supabase.from('Project').select('*', { count: 'exact', head: true }),
      supabase.from('Skill').select('*', { count: 'exact', head: true }),
      supabase.from('Experience').select('*', { count: 'exact', head: true })
    ]);
    stats = { 
      projects: projectsCount.count || 0, 
      skills: skillsCount.count || 0, 
      experience: experienceCount.count || 0 
    };
  } catch (error) {
    console.warn("Supabase connection failed, using fallback stats for dashboard.");
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard Overview</h1>
        <p className="text-text-secondary">Welcome back to your admin panel. Here's a summary of your portfolio data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-surface border border-border p-6 rounded-xl">
          <h3 className="text-text-secondary text-sm font-medium mb-2">Total Projects</h3>
          <p className="text-4xl font-black text-primary">{stats.projects}</p>
        </div>
        <div className="bg-surface border border-border p-6 rounded-xl">
          <h3 className="text-text-secondary text-sm font-medium mb-2">Total Skills</h3>
          <p className="text-4xl font-black text-text-primary">{stats.skills}</p>
        </div>
        <div className="bg-surface border border-border p-6 rounded-xl">
          <h3 className="text-text-secondary text-sm font-medium mb-2">Experience Items</h3>
          <p className="text-4xl font-black text-text-primary">{stats.experience}</p>
        </div>
      </div>
    </div>
  );
}
