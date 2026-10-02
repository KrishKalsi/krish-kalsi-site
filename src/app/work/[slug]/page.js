import ProjectHero from "@/components/project/ProjectHero";
import AbstractPanel from "@/components/project/AbstractPanel";
import ConformalFigure from "@/components/project/ConformalFigure";
import MethodPanel from "@/components/project/MethodPanel";
import NextProjectPanel from "@/components/project/NextProjectPanel";
import { projects } from "@/content/projects";
import { work } from "@/content/work";
import { pageMetadata } from "@/lib/pageMetadata";

const figures = { conformal: ConformalFigure };

// Only slugs with a written entry get a page; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

function load(slug) {
  const project = projects[slug];
  const index = work.findIndex((w) => w.no === project.no);
  return { project, tile: work[index], next: work[(index + 1) % work.length] };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { project, tile } = load(slug);
  return pageMetadata({ title: tile.title, description: project.abstract, path: `/work/${slug}` });
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const { project, tile, next } = load(slug);
  const Figure = figures[project.figure];

  return (
    <>
      <ProjectHero project={project} tile={tile} />
      <AbstractPanel project={project} />
      {Figure && <Figure />}
      <MethodPanel project={project} />
      <NextProjectPanel next={next} />
    </>
  );
}
