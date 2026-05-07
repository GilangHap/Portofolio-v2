"use client";

import { motion } from "framer-motion";
import { Code2, FolderGit2, Blocks, Zap } from "lucide-react";

export default function AboutSection({ about }: { about: any }) {
  const stats = [
    { label: "Years Coding", value: about?.stat_years || "0", icon: <Code2 size={24} /> },
    { label: "Projects Built", value: about?.stat_projects || "0", icon: <FolderGit2 size={24} /> },
    { label: "Tech Stack", value: about?.stat_tech_stack || "0", icon: <Blocks size={24} /> },
    { label: "Curiosity", value: about?.stat_curiosity || "∞", icon: <Zap size={24} /> },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">ABOUT_ME</h2>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Get to know me better</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="prose prose-invert prose-lg max-w-none text-text-secondary whitespace-pre-wrap">
              {about?.bio || "No bio available yet."}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-surface border border-border p-6 rounded-lg flex flex-col items-center text-center group hover:border-primary/50 transition-colors"
              >
                <div className="text-primary mb-4 bg-primary/10 p-3 rounded-full group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-3xl font-black text-text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-text-secondary font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
