"use client";

import Link from "next/link";
import { Mail, Loader2, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from "@/components/BrandIcons";
import { useState, useEffect } from "react";
import { getSocialLinks } from "@/app/actions/contact";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      try {
        const data = await getSocialLinks();
        setLinks(data);
      } catch (error) {
        console.error("Failed to fetch social links:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLinks();
  }, []);

  const getIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return <GithubIcon size={24} />;
    if (p.includes('linkedin')) return <LinkedinIcon size={24} />;
    if (p.includes('instagram')) return <InstagramIcon size={24} />;
    if (p.includes('twitter') || p.includes('x')) return <TwitterIcon size={24} />;
    return <ExternalLink size={24} />;
  };

  return (
    <footer className="border-t border-border bg-background pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <Link href="/" className="text-2xl font-black text-primary uppercase tracking-tighter inline-block mb-2">
              GILANGHAP.
            </Link>
            <p className="text-text-secondary max-w-sm">
              Fullstack Developer building modern, performant, and scalable web applications.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {loading ? (
              <Loader2 className="animate-spin text-primary" size={20} />
            ) : (
              links.map((link) => (
                <a 
                  key={link.id} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  <span className="sr-only">{link.platform}</span>
                  {getIcon(link.platform)}
                </a>
              ))
            )}
            {/* If no email in links, can add a fallback or fetch from About */}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-text-secondary">
          <p>&copy; {currentYear} GILANGHAP. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
