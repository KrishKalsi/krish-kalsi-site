import Panel from "@/components/Panel";
import { education } from "@/content/about";
import cx from "@/lib/cx";

export default function EducationPanel() {
  return (
    <Panel>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[300px_minmax(0,1fr)] sm:gap-x-6">
        <div className="text-xs uppercase text-dim">Education:</div>
        <div className="flex flex-col">
          {education.map((item, i) => (
            <div
              key={item.degree}
              className={cx(
                "flex flex-col gap-1 sm:grid sm:grid-cols-[1fr_1fr_180px] sm:items-baseline sm:gap-6",
                i === 0 ? "border-b border-line pb-5" : "pt-5",
              )}
            >
              <span className="text-lg text-strong sm:text-[22px]">{item.degree}</span>
              <span className="text-sm sm:text-[15px]">{item.institution}</span>
              <span className="text-xs uppercase text-strong sm:text-right sm:text-[13px]">
                {item.period}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
