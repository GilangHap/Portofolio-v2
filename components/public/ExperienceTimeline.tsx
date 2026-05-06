"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Code, Star, Building2, Trophy, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getExperiences } from "@/app/actions/experience";

const ICON_MAP: Record<string, React.ElementType> = {
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Star,
  Building2,
  Trophy,
};

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
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              Experience<span className="text-primary">.</span>
            </h3>
          </div>
          <div className="max-w-md text-text-secondary text-sm md:text-base">
            My professional and organizational journey that shaped my skills and mindset.
          </div>
        </div>

        <div className="relative">
          {/* Timeline central line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const side = exp.side || (index % 2 === 0 ? "left" : "right");
              const IconComp = ICON_MAP[exp.icon] ?? Briefcase;
              const color = exp.category_color || "#39FF14";

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.15, 0.6) }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    side === "right" ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node */}
                  <div
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-surface border-2 z-10"
                    style={{ borderColor: color, color }}
                  >
                    <IconComp size={18} />
                  </div>

                  {/* Content */}
                  <div
                    className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                      side === "right" ? "md:pr-14" : "md:pl-14"
                    }`}
                  >
                    <div
                      className="bg-surface border border-border p-6 rounded-lg transition-colors hover:border-opacity-50"
                      style={{ ["--hover-color" as any]: color }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = `${color}80`)}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = "")}
                    >
                      {/* Title row */}
                      <div className={`flex flex-col gap-1 mb-3 ${side === "right" ? "md:items-end" : ""}`}>
                        <h4 className="text-xl font-bold text-text-primary leading-tight">{exp.institution}</h4>
                        <span className="text-sm text-text-secondary font-mono">{exp.period}</span>
                      </div>

                      {/* Category badge */}
                      {exp.category_label && (
                        <div className={`mb-4 ${side === "right" ? "md:flex md:justify-end" : ""}`}>
                          <span
                            className="inline-block px-3 py-1 text-xs font-bold rounded-full border"
                            style={{
                              color,
                              borderColor: `${color}40`,
                              backgroundColor: `${color}15`,
                            }}
                          >
                            {exp.category_label}
                          </span>
                        </div>
                      )}

                      {/* Description */}
                      {exp.description && (
                        <p className={`text-text-secondary text-sm leading-relaxed ${side === "right" ? "md:text-right" : ""}`}>
                          {exp.description}
                        </p>
                      )}
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
