import Panel from "@/components/Panel";
import PanelTitle from "@/components/PanelTitle";
import { experience } from "@/content/experience";
import { sections } from "@/content/home";

export default function ExperiencePanel() {
  return (
    <Panel className="lg:min-h-[400px]">
      <PanelTitle>{sections.experience.title}</PanelTitle>
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6 lg:grid-cols-3">
        {experience.map((item) => (
          <div key={item.org} className="flex flex-col gap-1">
            <span className="text-xs text-dim">{item.year}</span>
            <span className="mt-1.5 text-base text-strong uppercase sm:text-lg">{item.org}</span>
            <span className="text-sm">{item.role}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
