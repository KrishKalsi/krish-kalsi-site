import Panel from "@/components/Panel";
import { education, aboutLabels } from "@/content/about";
import cx from "@/lib/cx";

export default function EducationPanel() {
  return (
    <Panel>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[300px_minmax(0,1fr)] sm:gap-x-6">
        <div className="text-xs uppercase text-dim">{aboutLabels.education}</div>
        <div className="flex flex-col">
          {education.map((item, i) => (
            <div
              key={item.degree}
              className={cx(
                "flex flex-col gap-1 lg:grid lg:grid-cols-[1fr_1fr_180px] lg:items-baseline lg:gap-6",
                i === 0 ? "border-b border-line pb-5" : "pt-5",
              )}
            >
              <span className="text-lg text-strong sm:text-[22px]">{item.degree}</span>
              <span className="text-sm sm:text-[15px]">{item.institution}</span>
              <span className="text-xs uppercase text-strong lg:text-right lg:text-[13px]">
                {item.period}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
