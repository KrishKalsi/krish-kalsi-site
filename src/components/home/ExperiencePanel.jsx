import Link from "next/link";
import Panel from "@/components/Panel";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";

export default function ExperiencePanel() {
  return (
    <Panel className="lg:min-h-[400px]">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="text-[clamp(44px,5vw,72px)] leading-none font-light tracking-[-0.045em] text-strong">
          Experience
        </h2>
        <Link
          href={profile.cv}
          className="flex min-h-11 items-center border border-strong px-[18px] text-xs text-strong no-underline uppercase"
        >
          Download CV ↓
        </Link>
      </div>
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
