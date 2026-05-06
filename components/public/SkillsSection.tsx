"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getSkills } from "@/app/actions/skills";
import { Loader2 } from "lucide-react";

export default function SkillsSection() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const data = await getSkills();
        setSkills(data);
        
        // Derive categories
        const cats = ["All", ...Array.from(new Set(data.map((s: any) => s.category))) as string[]];
        setCategories(cats);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  const filteredSkills = activeCategory === "All" 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  if (loading) {
    return (
      <section id="skills" className="py-24 bg-surface/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-75">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
      </section>
    );
  }

  if (skills.length === 0) return null;

  return (
    <section id="skills" className="py-24 bg-surface/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">TECH_STACK</h2>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Skills & Technologies</h3>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === cat 
                  ? "bg-primary text-black" 
                  : "bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-text-secondary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-background border border-border p-6 rounded-xl flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-all duration-300"
              >
                <div className="mb-4 w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {skill.icon_url?.startsWith('http') ? (
                    <Image src={skill.icon_url} alt={skill.name} width={48} height={48} className="w-full h-full object-contain" loading="lazy" />
                  ) : (
                    <span className="text-3xl">{skill.icon_url || '⚡'}</span>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-text-primary group-hover:text-primary transition-colors text-sm sm:text-base">
                    {skill.name}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-text-secondary font-mono">
                    {skill.category}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
