import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb, LayoutGrid, Server, Database, Wrench, ExternalLink } from "lucide-react";
import { getProjectBySlug } from "@/app/actions/projects";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectJsonLd } from "@/components/public/JsonLd";
import { FadeInSection, ScaleInCard, StaggerContainer, StaggerItem } from "@/components/public/ProjectDetailAnimations";

type Props = {
  params: Promise<{ slug: string }>;
};

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
    <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.55-3.88-1.55-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.29-5.23-5.73 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.19.92-.26 1.91-.39 2.9-.39.98 0 1.98.13 2.9.39 2.2-1.5 3.17-1.19 3.17-1.19.63 1.59.23 2.76.11 3.05.74.81 1.19 1.85 1.19 3.11 0 4.45-2.69 5.43-5.25 5.71.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56 4.57-1.53 7.86-5.85 7.86-10.95C23.5 5.74 18.27.5 12 .5z" />
  </svg>
);

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
        className="relative pt-24 pb-12 border-b border-border overflow-hidden"
        style={
          project.thumbnail_url
            ? {
                backgroundImage: `linear-gradient(120deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 35%, rgba(10,10,10,0.05) 65%, rgba(10,10,10,0.9) 100%), url(${project.thumbnail_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center 45%",
              }
            : undefined
        }
      >
        <div className="absolute inset-0 pointer-events-none opacity-80">
          <div className="absolute -bottom-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/40 blur-3xl" />
          <div className="absolute -bottom-10 right-12 h-48 w-48 rounded-full bg-[#39FF14]/40 blur-[180px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="relative grid gap-10 lg:grid-cols-2">
            <div className="space-y-4 lg:-mt-6">
              <Link href="/#projects" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Link>
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-text-secondary">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-background/60 border border-border text-[10px]">
                  <span className="text-primary">
                    {project.number !== undefined && project.number !== null
                      ? String(project.number).padStart(2, "0")
                      : "01"}
                  </span>
                  Featured Project
                </span>
                <span className="flex-1 h-px bg-border" />
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
                {project.title}
                <span className="text-primary">.</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-3xl leading-relaxed">
                {project.short_description}
              </p>
              <div className="flex flex-wrap gap-3">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full bg-linear-to-r from-[#39FF14] to-[#2CC468] text-black shadow-[0_15px_50px_rgba(57,255,20,0.45)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(57,255,20,0.6)]"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full border border-primary text-text-primary transition-all duration-200 hover:-translate-y-1 hover:bg-primary/10 hover:shadow-[0_12px_30px_rgba(57,255,20,0.25)]"
                  >
                    <GithubIcon className="h-4 w-4" />
                    GitHub
                  </a>
                )}
              </div>
            </div>

          </div>
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
