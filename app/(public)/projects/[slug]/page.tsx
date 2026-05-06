import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb, LayoutGrid, Server, Database, Wrench, Code2, ExternalLink } from "lucide-react";
import { getProjectBySlug } from "@/app/actions/projects";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectJsonLd } from "@/components/public/JsonLd";
import { FadeInSection, ScaleInCard, StaggerContainer, StaggerItem } from "@/components/public/ProjectDetailAnimations";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.short_description || `${project.title} — a project by GH.`,
    openGraph: {
      title: `${project.title} | GH.`,
      description: project.short_description || `${project.title} — a project by GH.`,
      type: "article",
      images: project.thumbnail_url
        ? [{ url: project.thumbnail_url, width: 1200, height: 630, alt: project.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | GH.`,
      description: project.short_description || `${project.title} — a project by GH.`,
      images: project.thumbnail_url ? [project.thumbnail_url] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Group skills by category — keep full objects for logo display
  const techStackGroups = project.skills.reduce((acc: any, skill: any) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  const getCategoryIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('front')) return <LayoutGrid className="text-primary" size={16}/>;
    if (lower.includes('back')) return <Server className="text-primary" size={16}/>;
    if (lower.includes('data')) return <Database className="text-primary" size={16}/>;
    return <Wrench className="text-primary" size={16}/>;
  };

  return (
    <article className="pb-24 bg-background min-h-screen">
      <ProjectJsonLd project={project} />
      {/* Hero Header */}
      <header
        className="relative pt-32 pb-20 border-b border-border overflow-hidden"
        style={
          project.thumbnail_url
            ? {
                backgroundImage: `linear-gradient(120deg, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.2) 60%, rgba(10,10,10,0.6) 100%), url(${project.thumbnail_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/#projects" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Link>
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-primary font-mono text-xl">{project.number || "00"}</span>
            <div className="h-px w-12 bg-primary"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">{project.title}</h1>
          <p className="text-xl text-text-secondary max-w-3xl leading-relaxed mb-8">
            {project.short_description}
          </p>
          {(project.github_url || project.live_url) && (
            <div className="flex flex-wrap gap-3">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface border border-border text-text-primary font-bold rounded hover:border-primary transition-colors text-sm"
                >
                  <Code2 size={16} />
                  View on GitHub
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-black font-bold rounded hover:bg-primary-muted transition-colors text-sm"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-24">
        
        {/* 01 Overview */}
        <FadeInSection>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {project.problem && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center"><AlertTriangle className="mr-3 text-primary" /> The Problem</h2>
                <p className="text-text-secondary leading-relaxed">{project.problem}</p>
              </div>
            )}
            {project.goal && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center"><Lightbulb className="mr-3 text-primary" /> The Goal</h2>
                <p className="text-text-secondary leading-relaxed">{project.goal}</p>
              </div>
            )}
            {project.target_users && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center"><CheckCircle2 className="mr-3 text-primary" /> Target Users</h2>
                <p className="text-text-secondary leading-relaxed">{project.target_users}</p>
              </div>
            )}
          </div>
          
          <div className="bg-surface border border-border p-6 rounded-lg h-fit space-y-4">
            <h3 className="font-bold text-lg mb-4 border-b border-border pb-2">Project Info</h3>
            {[
              { label: "Role", value: project.role },
              { label: "Duration", value: project.duration },
              { label: "Team", value: project.team_size },
              { label: "Status", value: project.project_status },
              { label: "Year", value: project.year },
            ].map((item) => (
              item.value && (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-text-secondary text-sm">{item.label}</span>
                  <span className="font-medium text-sm text-text-primary text-right">{item.value}</span>
                </div>
              )
            ))}
          </div>
        </section>
        </FadeInSection>

        {/* 02 Tech Stack */}
        {Object.keys(techStackGroups).length > 0 && (
          <FadeInSection delay={0.1}>
            <section>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Tech Stack</h2>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(techStackGroups).map(([category, items]: [string, any]) => (
                  <StaggerItem key={category}>
                    <div className="bg-surface border border-border p-6 rounded-lg hover:border-primary/50 transition-colors h-full">
                      <div className="flex items-center gap-2 mb-4">
                        {getCategoryIcon(category)}
                        <h3 className="font-bold text-sm uppercase tracking-wider text-text-secondary">{category}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill: any) => (
                          <span
                            key={skill.name}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border rounded-full text-xs font-medium text-text-primary hover:border-primary/50 transition-colors"
                          >
                            {skill.icon_url ? (
                              <Image
                                src={skill.icon_url}
                                alt={skill.name}
                                width={16}
                                height={16}
                                className="object-contain"
                              />
                            ) : null}
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          </FadeInSection>
        )}

        {/* 03 System Architecture */}
        {project.arch_description && (
          <FadeInSection delay={0.1}>
            <section className="bg-surface border border-border rounded-lg p-8">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">System Architecture</h2>
              <p className="text-text-secondary mb-8 leading-relaxed max-w-3xl">
                {project.arch_description}
              </p>
              {project.arch_image_url && (
                <div className="relative w-full aspect-video bg-background border border-border rounded overflow-hidden">
                  <Image src={project.arch_image_url} alt="Architecture" fill className="object-contain" sizes="(max-width: 768px) 100vw, 800px" />
                </div>
              )}
            </section>
          </FadeInSection>
        )}

        {/* 04 Screenshots */}
        {project.screenshots?.filter((s: any) => s.image_url).length > 0 && (
          <FadeInSection>
            <section>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Screenshots</h2>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.screenshots.filter((s: any) => s.image_url).map((shot: any, i: number) => (
                  <StaggerItem key={i}>
                    <div className="rounded-lg overflow-hidden border border-border bg-surface group">
                      <div className="relative aspect-video">
                        <Image
                          src={shot.image_url}
                          alt={shot.caption || `Screenshot ${i + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                      {shot.caption && (
                        <p className="text-sm text-text-secondary px-4 py-3 border-t border-border">{shot.caption}</p>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          </FadeInSection>
        )}

        {/* 05 Key Features */}
        {project.features?.length > 0 && (
          <FadeInSection>
            <section>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Key Features</h2>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.features.map((feature: any, i: number) => (
                  <StaggerItem key={i}>
                    <div className="border border-border p-6 rounded-lg bg-surface relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          </FadeInSection>
        )}

        {/* 06 Challenges & Solutions */}
        {(project.challenges?.length > 0 || project.solutions?.length > 0) && (
          <FadeInSection>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.challenges?.length > 0 && (
                <div className="bg-surface border border-border p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-6 text-red-400">Challenges</h2>
                  <ul className="space-y-4">
                    {project.challenges.map((c: string, i: number) => (
                      <li key={i} className="flex items-start text-text-secondary">
                        <span className="text-red-400 mr-3 mt-1">✗</span>
                        <span className="text-sm leading-relaxed">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {project.solutions?.length > 0 && (
                <div className="bg-surface border border-border p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-6 text-primary">Solutions</h2>
                  <ul className="space-y-4">
                    {project.solutions.map((s: string, i: number) => (
                      <li key={i} className="flex items-start text-text-secondary">
                        <span className="text-primary mr-3 mt-1">✓</span>
                        <span className="text-sm leading-relaxed">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </FadeInSection>
        )}

        {/* 07 Impact / Result */}
        {project.metrics?.length > 0 && (
          <FadeInSection>
            <section>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 text-center">The Impact</h2>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 flex-wrap">
                {project.metrics.map((metric: any, i: number) => (
                  <div key={i} className="text-center">
                    <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-b from-primary to-primary-muted mb-2">
                      {metric.value}
                    </div>
                    <div className="text-text-secondary uppercase tracking-widest text-sm font-bold">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeInSection>
        )}

        {/* 08 CTA */}
        <FadeInSection>
        <section className="text-center pt-16 border-t border-border">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">Have a project in mind?</h2>
          <p className="text-text-secondary mb-10 text-lg">Let's bring your idea to life with modern technologies.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/#contact" className="px-8 py-4 bg-primary text-black font-bold rounded hover:bg-primary-muted transition-colors w-full sm:w-auto">
              Hire Me
            </Link>
            <Link href="/#projects" className="px-8 py-4 bg-surface border border-border text-text-primary font-bold rounded hover:border-primary transition-colors w-full sm:w-auto">
              View More Projects
            </Link>
          </div>
        </section>
        </FadeInSection>

      </div>
    </article>
  );
}
