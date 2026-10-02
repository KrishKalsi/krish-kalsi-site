import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/siteUrl";

export default function sitemap() {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    ...Object.keys(projects).map((slug) => ({ path: `/work/${slug}`, priority: 0.7 })),
  ];
  return pages.map(({ path, priority }) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
