"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { GithubIcon } from "@/components/BrandIcons";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { getProjects } from "@/app/actions/projects";

function FeaturedProjectCard({ project, index }: { project: any; index: number }) {
  const isEven = index % 2 === 1;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border bg-surface/30 group hover:border-primary/50 transition-colors",
        isEven ? "lg:flex-row-reverse" : "lg:flex-row"
      )}
    >
      {/* Image Section */}
      <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[auto] bg-[#111]">
        {project.thumbnail_url ? (
          <Image
            src={project.thumbnail_url}
            alt={project.title}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-surface text-text-secondary/50 font-black text-6xl">
            {project.number || index + 1}
          </div>
        )}
        <div className={cn(
          "absolute top-0 bottom-0 w-1 bg-primary",
          isEven ? "right-0" : "left-0"
        )} />
      </div>

      {/* Content Section */}
      <div className="flex flex-col sm:flex-row justify-between w-full lg:w-1/2 p-8 gap-8">
        <div className="flex-1 space-y-4">
          <div className="text-primary font-mono text-xl font-bold">{project.number || `0${index + 1}`}</div>
          <h3 className="text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed max-w-md">
            {project.short_description}
          </p>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack?.map((tech: string) => (
              <span 
                key={tech} 
                className="px-3 py-1 bg-background border border-border text-xs text-text-primary rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 shrink-0 sm:pt-12">
          <Link 
            href={`/projects/${project.slug}`}
            className="flex items-center justify-between w-[140px] px-4 py-2 border border-primary text-primary hover:bg-primary/10 transition-colors rounded text-sm font-medium"
          >
            View Details
            <ArrowUpRight size={16} />
          </Link>
          
          {project.github_url && (
            <a 
              href={project.github_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between w-[140px] px-4 py-2 border border-border text-text-primary hover:border-text-primary transition-colors rounded text-sm font-medium"
            >
              GitHub
              <GithubIcon size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        // Sort by is_featured first
        const sorted = [...data].sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
        setProjects(sorted);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, projects.length));
  };

  if (loading) {
    return (
      <section id="projects" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-primary mb-4" size={40} />
          <p className="text-text-secondary">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 border border-primary"></span>
              <h2 className="text-sm font-bold text-primary tracking-widest uppercase">FEATURED_PROJECTS</h2>
              <span className="w-2 h-2 border border-primary"></span>
            </div>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Projects<span className="text-primary">.</span></h3>
          </div>
          <div className="max-w-md text-text-secondary text-sm md:text-base">
            A collection of selected work that reflects my problem-solving, development, and system design skills.
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          <AnimatePresence>
            {projects.slice(0, visibleCount).map((project, index) => (
              <FeaturedProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* View More Button */}
        {visibleCount < projects.length && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={handleLoadMore}
              className="flex items-center gap-2 px-6 py-3 border border-border hover:border-primary text-primary transition-colors rounded text-sm font-medium group cursor-pointer"
            >
              View More Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
