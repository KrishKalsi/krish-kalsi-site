import Panel from "@/components/Panel";
import CircleMarker from "@/components/CircleMarker";
import { coursework, skills, aboutLabels } from "@/content/about";

function Column({ label, groups }) {
  return (
    <div>
      <div className="text-xs uppercase text-dim">{label}</div>
      <div className="mt-8 flex flex-col gap-6">
        {groups.map((group) => (
          <div key={group.label}>
            <div className="flex items-center gap-2.5 text-[13px] text-dim">
              <CircleMarker filled={group.current} />
              {group.label}
            </div>
            <p className="mt-1.5 text-base leading-[1.5] text-strong sm:text-[17px]">
              {group.items}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CourseworkSkillsPanel() {
  return (
    <Panel>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-12 lg:gap-x-[72px]">
        <Column label={aboutLabels.coursework} groups={coursework} />
        <Column label={aboutLabels.skills} groups={skills} />
      </div>
    </Panel>
  );
}
