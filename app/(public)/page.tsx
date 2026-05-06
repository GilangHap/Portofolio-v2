import HeroSection from "@/components/public/HeroSection";
import AboutSection from "@/components/public/AboutSection";
import SkillsSection from "@/components/public/SkillsSection";
import FeaturedProjectsSection from "@/components/public/FeaturedProjectsSection";
import ExperienceTimeline from "@/components/public/ExperienceTimeline";
import ContactSection from "@/components/public/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjectsSection />
      <ExperienceTimeline />
      <ContactSection />
    </>
  );
}
