"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import Image from "next/image";

export default function HeroSection({ about }: { about: any }) {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden">
      {/* Background Neon Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

      {/* ==========================================
          MOBILE LAYOUT (< md): Stacked, centered
          ========================================== */}
      <div className="md:hidden flex flex-col items-center justify-center px-4 py-12 gap-0 text-center">

        {/* Photo - mobile, sits between I'M A and FULLSTACK */}
        {about?.hero_photo_url ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-44 h-52 mx-auto z-10"
            style={{ filter: "drop-shadow(0 10px 30px rgba(57,255,20,0.2))" }}
          >
            <Image
              src={about.hero_photo_url}
              alt="Profile"
              fill
              className="object-cover object-top"
              style={{
                maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
              }}
              priority
            />
          </motion.div>
        ) : (
          <div className="text-8xl mb-2">👨‍💻</div>
        )}

        {/* I'M A */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="block text-[13vw] font-black uppercase tracking-tighter leading-none text-white -mt-6 relative z-0"
        >
          I'M A
        </motion.span>

        {/* FULLSTACK - solid green, behind photo on mobile it's below */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="block text-[16vw] font-black uppercase tracking-tighter leading-none text-primary"
        >
          FULLSTACK
        </motion.span>

        {/* DEVELOPER - outline */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="block text-[16vw] font-black uppercase tracking-tighter leading-none"
          style={{
            WebkitTextStroke: "1.5px var(--color-primary, #39ff14)",
            color: "transparent",
          }}
        >
          DEVELOPER
        </motion.span>
      </div>

      {/* ==========================================
          DESKTOP LAYOUT (>= md): Overlapping photo
          ========================================== */}
      <div className="hidden md:block relative w-full">

        {/* ROW 1: I'M A — left aligned */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-0 px-10 lg:px-20"
        >
          <span className="block text-[11vw] lg:text-[10vw] font-black uppercase tracking-tighter leading-none text-white">
            I'M A
          </span>
        </motion.div>

        {/* ROW 2: FULLSTACK — solid green, photo overlaps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-0 text-center"
        >
          <span className="block text-[15vw] lg:text-[14vw] font-black uppercase tracking-tighter leading-none text-primary">
            FULLSTACK
          </span>
        </motion.div>

        {/* ROW 3: DEVELOPER — outline, z-20 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative z-20 text-center"
        >
          <span
            className="block text-[15vw] lg:text-[14vw] font-black uppercase tracking-tighter leading-none"
            style={{
              WebkitTextStroke: "2px var(--color-primary, #39ff14)",
              color: "transparent",
            }}
          >
            DEVELOPER
          </span>
        </motion.div>

        {/* PHOTO — absolute, z-10, sits on FULLSTACK */}
        {about?.hero_photo_url ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="absolute z-10 top-0 left-1/2 -translate-x-1/4 h-full flex items-center"
          >
            <div
              className="relative"
              style={{
                width: "clamp(200px, 28vw, 420px)",
                height: "clamp(280px, 44vw, 600px)",
                filter: "drop-shadow(0 20px 60px rgba(57,255,20,0.15))",
              }}
            >
              <Image
                src={about.hero_photo_url}
                alt="Profile"
                fill
                className="object-cover object-top"
                style={{
                  maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
                }}
                priority
              />
            </div>
          </motion.div>
        ) : (
          <div className="absolute z-10 top-0 left-1/2 -translate-x-1/4 h-full flex items-center pointer-events-none">
            <span className="text-[160px] leading-none" style={{ filter: "drop-shadow(0 20px 60px rgba(57,255,20,0.2))" }}>
              👨‍💻
            </span>
          </div>
        )}
      </div>

      {/* CTA Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="relative z-30 flex flex-wrap justify-center gap-4 mt-8 px-4"
      >
        {about?.cv_url && (
          <a
            href={about.cv_url}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded hover:bg-primary-muted transition-colors text-sm uppercase tracking-wider"
          >
            <Download size={16} />
            Download CV
          </a>
        )}
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-primary border border-primary/40 font-bold rounded hover:bg-primary/10 transition-colors text-sm uppercase tracking-wider"
        >
          <Mail size={16} />
          Contact Me
        </a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="relative z-30 flex flex-col items-center text-text-secondary hover:text-primary transition-colors mt-8 mb-4 self-center"
      >
        <span className="text-xs uppercase tracking-widest mb-2 font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.a>
    </section>
  );
}
