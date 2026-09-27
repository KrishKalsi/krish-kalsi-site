import Link from "next/link";
import Panel from "@/components/Panel";
import CircleMarker from "@/components/CircleMarker";
import { work } from "@/content/work";
import { profile } from "@/content/profile";

const itemClass = "group flex flex-col gap-1 text-strong no-underline";

function WorkItem({ item }) {
  const label = (
    <>
      <span className="flex items-center gap-2.5 text-[13px] text-dim">
        <CircleMarker filled={item.featured} />
        {item.no} — {item.area}
      </span>
      <span className="mt-1.5 text-lg leading-[1.25] uppercase sm:text-xl">{item.title}</span>
      <span className="text-sm text-text sm:text-[15px]">{item.detail}</span>
    </>
  );

  if (item.external) {
    return (
      <a href={profile.github} target="_blank" rel="noopener noreferrer" className={itemClass}>
        {label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={itemClass}>
      {label}
    </Link>
  );
}

export default function WorkPanel() {
  return (
    <Panel id="work" className="lg:min-h-[640px]">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[clamp(44px,5vw,72px)] leading-none font-light tracking-[-0.045em] text-strong">
          Work
        </h2>
        <span className="text-[clamp(44px,5vw,72px)] leading-none font-light tracking-[-0.045em] text-dim">
          06
        </span>
      </div>
      <div className="grid grid-cols-1 gap-[26px] sm:grid-cols-2 sm:gap-x-6 sm:gap-y-13 lg:grid-cols-3">
        {work.map((item) => (
          <WorkItem key={item.no} item={item} />
        ))}
      </div>
    </Panel>
  );
}
