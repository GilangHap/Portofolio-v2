import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { GithubIcon } from "@/components/BrandIcons";

interface ProjectCardProps {
  number: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl?: string;
  githubUrl?: string;
  techStack: string[];
}

export default function ProjectCard({
  number,
  title,
  slug,
  description,
  thumbnailUrl,
  githubUrl,
  techStack,
}: ProjectCardProps) {
  return (
    <div className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300">
      <div className="relative h-64 w-full bg-background overflow-hidden">
        {thumbnailUrl ? (
          <Image 
            src={thumbnailUrl} 
            alt={title} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-surface text-text-secondary/50 font-black text-6xl">
            {number}
          </div>
        )}
        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm border border-border text-primary font-mono text-sm px-3 py-1 rounded-full">
          {number}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-text-secondary text-sm mb-6 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {techStack.map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-1 bg-background border border-border text-xs text-text-secondary rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <Link 
            href={`/projects/${slug}`}
            className="flex items-center text-sm font-medium text-primary hover:text-primary-muted transition-colors group/btn"
          >
            View Details
            <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              <GithubIcon size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
