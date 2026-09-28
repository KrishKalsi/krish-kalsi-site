import Panel from "@/components/Panel";
import { projectLabels } from "@/content/projects";

export default function AbstractPanel({ project }) {
  return (
    <Panel className="lg:min-h-[380px]">
      <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-12 lg:gap-x-[72px]">
        <div className="flex flex-col justify-between gap-6">
          <h2 className="text-xs text-dim uppercase">{projectLabels.abstract}</h2>
          <p className="text-lg leading-[1.4] tracking-[-0.01em] text-strong sm:text-[24px]">
            {project.abstract}
          </p>
        </div>
        <div className="flex flex-col justify-between gap-6 sm:items-end sm:text-right">
          <h2 className="text-xs text-dim uppercase">{projectLabels.result}</h2>
          <div>
            <div className="text-[clamp(72px,9.2vw+36px,168px)] leading-[0.85] font-light tracking-[-0.06em] text-strong">
              {project.result.value}
            </div>
            <p className="mt-4 text-sm sm:text-[15px]">{project.result.caption}</p>
          </div>
        </div>
      </div>
    </Panel>
  );
}
