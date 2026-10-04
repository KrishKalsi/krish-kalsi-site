import { ViewTransition } from "react";
import Link from "next/link";
import Panel from "@/components/Panel";
import { titleTransitionName } from "@/lib/motion";
import PanelTitle from "@/components/PanelTitle";
import CircleMarker from "@/components/CircleMarker";
import { work } from "@/content/work";
import { sections } from "@/content/home";
import { profile } from "@/content/profile";

const itemClass = "group flex flex-col gap-1 text-strong no-underline";

function WorkItem({ item }) {
  const title = (
    <span className="mt-1.5 text-lg leading-[1.25] uppercase sm:text-xl">{item.title}</span>
  );
  const label = (
    <>
      <span className="flex items-center gap-2.5 text-[13px] text-dim">
        <CircleMarker filled={item.featured} />
        {item.no} — {item.area}
      </span>
      {/* Tiles with a project page morph their title into that page's h1. */}
      {item.external ? (
        title
      ) : (
        <ViewTransition name={titleTransitionName(item.href)} share="morph" default="none">
          {title}
        </ViewTransition>
      )}
      <span
        aria-hidden="true"
        className="block h-px origin-left scale-x-0 bg-strong transition-transform duration-350 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
      />
      <span className="text-sm text-text sm:text-[15px]">{item.detail}</span>
    </>
  );

  if (item.external) {
    return (
      <a
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="work"
        className={itemClass}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={item.href} data-cursor="work" className={itemClass}>
      {label}
    </Link>
  );
}

export default function WorkPanel() {
  return (
    <Panel id="work" className="lg:min-h-[640px]">
      <div className="flex items-baseline justify-between">
        <PanelTitle>{sections.work.title}</PanelTitle>
        <span className="text-[clamp(44px,5vw,72px)] leading-none font-light tracking-[-0.045em] text-dim">
          {String(work.length).padStart(2, "0")}
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
