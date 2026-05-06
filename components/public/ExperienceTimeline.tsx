"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getExperiences } from "@/app/actions/experience";

export default function ExperienceTimeline() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const data = await getExperiences();
        setExperiences(data);
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
      </section>
    );
  }

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 border border-primary"></span>
              <h2 className="text-sm font-bold text-primary tracking-widest uppercase">JOURNEY</h2>
              <span className="w-2 h-2 border border-primary"></span>
            </div>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Experience<span className="text-primary">.</span></h3>
          </div>
          <div className="max-w-md text-text-secondary text-sm md:text-base">
            My professional and organizational journey that shaped my skills and mindset.
          </div>
        </div>

        <div className="relative">
          {/* Timeline central line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const side = exp.side || (index % 2 === 0 ? 'left' : 'right');
              const IconComp = exp.icon === 'GraduationCap' ? GraduationCap : Briefcase;
              
              return (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    side === 'right' ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-surface border border-primary text-primary z-10">
                    <IconComp size={20} />
                  </div>

                  {/* Content */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    side === 'right' ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}>
                    <div className="bg-surface border border-border p-6 rounded-lg hover:border-primary/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h4 className="text-xl font-bold text-text-primary">{exp.institution}</h4>
                        <span className="text-sm text-text-secondary font-mono mt-1 md:mt-0">{exp.period}</span>
                      </div>
                      <div className="mb-4 inline-block">
                        <span 
                          className="px-3 py-1 text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {exp.category_label}
                        </span>
                      </div>
                      <p className={`text-text-secondary text-sm leading-relaxed ${side === 'right' ? 'md:text-right' : 'text-left'}`}>
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
