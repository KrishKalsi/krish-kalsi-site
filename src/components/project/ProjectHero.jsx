import Link from "next/link";
import Panel from "@/components/Panel";
import { projectLabels } from "@/content/projects";
import { profile } from "@/content/profile";

export default function ProjectHero({ project, tile }) {
  return (
    <Panel as="div" className="lg:min-h-[580px]">
      <div className="flex items-center justify-between gap-4 text-[13px] text-dim">
        <Link
          href="/#work"
          className="flex min-h-11 items-center transition-opacity duration-150 hover:opacity-70 motion-reduce:transition-none"
        >
          {projectLabels.back} / {tile.no}
        </Link>
        <span>
          ({tile.no}) {tile.area}
        </span>
      </div>

      <h1 className="text-[clamp(72px,9.2vw+36px,168px)] leading-[0.86] font-light tracking-[-0.055em] text-strong">
        {project.title.map((line, i) => (
          <span key={line} className="block">
            {line}
            {i < project.title.length - 1 && <span className="sr-only"> </span>}
          </span>
        ))}
      </h1>

      <div className="grid grid-cols-1 items-end gap-6 text-[11px] leading-[1.45] uppercase sm:grid-cols-4 sm:text-xs">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:col-span-3 sm:grid-cols-3">
          {project.meta.map(({ label, value }) => (
            <div key={label} className="last:col-span-2 sm:last:col-span-1">
              <dt className="text-dim">{label}</dt>
              <dd className="text-strong">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="sm:text-right">
          <a
            href={project.repo ?? profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center border border-strong px-[18px] text-strong transition-opacity duration-150 hover:opacity-70 motion-reduce:transition-none"
          >
            {project.viewCode}
          </a>
        </div>
      </div>
    </Panel>
  );
}
