export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gilang",
    url: process.env.APP_URL || "https://gilang.dev",
    jobTitle: "Fullstack Developer",
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
    ],
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ProjectJsonLd({
  project,
}: {
  project: {
    title: string;
    short_description?: string;
    thumbnail_url?: string;
    slug: string;
    year?: number;
  };
}) {
  const siteUrl = process.env.APP_URL || "https://gilang.dev";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.short_description,
    image: project.thumbnail_url,
    url: `${siteUrl}/projects/${project.slug}`,
    dateCreated: project.year ? `${project.year}` : undefined,
    creator: {
      "@type": "Person",
      name: "Gilang",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
