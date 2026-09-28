import Panel from "@/components/Panel";
import CircleMarker from "@/components/CircleMarker";
import Formula from "@/components/project/Formula";
import { projectLabels } from "@/content/projects";

export default function MethodPanel({ project }) {
  return (
    <Panel className="lg:min-h-[440px]">
      {/* Stays one column until desktop: the second formula needs the full width at tablet. */}
      <div className="grid flex-1 grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-[72px]">
        <div className="flex min-w-0 flex-col justify-between gap-6">
          <h2 className="text-xs text-dim uppercase">{projectLabels.method}</h2>
          <div className="flex flex-col gap-4 overflow-x-auto text-[15px] whitespace-nowrap text-strong sm:gap-5 sm:text-lg lg:text-[22px]">
            {project.formulas.map((tex) => (
              <Formula key={tex} tex={tex} />
            ))}
          </div>
          <p className="text-sm leading-[1.55] sm:text-[15px]">{project.methodNote}</p>
        </div>
        <div className="flex flex-col justify-between gap-6">
          <h2 className="text-xs text-dim uppercase">{projectLabels.limitations}</h2>
          <ul className="flex flex-col gap-5 text-base leading-[1.4] text-strong sm:gap-[22px] sm:text-lg">
            {project.limitations.map((item) => (
              <li key={item} className="flex gap-3">
                <CircleMarker className="mt-1" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}
