import type { MetadataRoute } from "next";
import { getProjects } from "@/app/actions/projects";

const siteUrl = process.env.APP_URL || "https://gilang.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const projectUrls: MetadataRoute.Sitemap = projects.map((project: any) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: project.updated_at
      ? new Date(project.updated_at)
      : new Date(project.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectUrls,
  ];
}
