import HeroSection from "@/components/public/HeroSection";
import AboutSection from "@/components/public/AboutSection";
import SkillsSection from "@/components/public/SkillsSection";
import FeaturedProjectsSection from "@/components/public/FeaturedProjectsSection";
import ExperienceTimeline from "@/components/public/ExperienceTimeline";
import ContactSection from "@/components/public/ContactSection";
import { getAbout } from "@/app/actions/about";
import { getSkills } from "@/app/actions/skills";
import { getProjects } from "@/app/actions/projects";
import { getExperiences } from "@/app/actions/experience";
import { getSocialLinks } from "@/app/actions/contact";

export const revalidate = 300;

export default async function Home() {
  const [about, skills, projects, experiences, socialLinks] = await Promise.all([
    getAbout(),
    getSkills(),
    getProjects(),
    getExperiences(),
    getSocialLinks(),
  ]);

  return (
    <>
      <HeroSection about={about} />
      <AboutSection about={about} />
      <SkillsSection skills={skills} />
      <FeaturedProjectsSection projects={projects} />
      <ExperienceTimeline experiences={experiences} />
      <ContactSection socialLinks={socialLinks} about={about} />
    </>
  );
}
