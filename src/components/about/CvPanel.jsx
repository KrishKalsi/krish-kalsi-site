import Link from "next/link";
import Panel from "@/components/Panel";
import { cvPanel } from "@/content/about";
import { profile } from "@/content/profile";

export default function CvPanel() {
  return (
    <Panel className="lg:min-h-[240px]">
      <div className="mt-auto flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs uppercase text-dim">{cvPanel.meta}</div>
          <div className="mt-3 text-[clamp(44px,5vw,72px)] leading-none font-light tracking-[-0.045em] text-strong">
            {cvPanel.title}
          </div>
        </div>
        <Link
          href={profile.cv}
          className="flex min-h-12 items-center justify-center bg-strong px-[22px] text-xs text-panel uppercase no-underline"
        >
          {cvPanel.buttonLabel}
        </Link>
      </div>
    </Panel>
  );
}
