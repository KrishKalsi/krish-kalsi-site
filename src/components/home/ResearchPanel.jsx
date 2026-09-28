"use client";

import { useId, useState, useSyncExternalStore } from "react";
import Panel from "@/components/Panel";
import { research, researchLabels as copy } from "@/content/research";
import { hoverFade } from "@/lib/motion";
import cx from "@/lib/cx";

const DESKTOP = "(min-width: 1024px)";

function subscribe(onChange) {
  const mq = window.matchMedia(DESKTOP);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

// False on the server and during hydration, so every abstract starts closed;
// P1 then opens on desktop. The panel is below the fold, so nothing visible shifts.
function useIsDesktop() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP).matches, () => false);
}

function Paper({ paper, open, onToggle }) {
  const abstractId = useId();

  return (
    <li
      className={cx(
        "grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 border-t border-line py-[18px]",
        "[grid-template-areas:'id_year'_'body_body'_'btn_btn']",
        "sm:grid-cols-[56px_minmax(0,1fr)_96px] sm:grid-rows-[auto_1fr] sm:py-[26px]",
        "sm:[grid-template-areas:'id_body_year'_'id_body_btn']",
        "lg:grid-cols-[88px_minmax(0,1fr)_160px]",
      )}
    >
      <span className="text-xs text-dim [grid-area:id] sm:pt-[5px] sm:text-[13px]">[{paper.id}]</span>
      <span className="text-xs text-strong [grid-area:year] sm:justify-self-end sm:pt-1 sm:text-[15px]">
        {paper.year}
      </span>

      <div className="[grid-area:body]">
        <p className="mt-2 text-[17px] leading-[1.4] sm:mt-0 sm:text-[19px] lg:text-[21px]">
          <span className="font-medium text-strong">{copy.author}</span> {copy.etAl} “
          <cite className="text-strong not-italic">{paper.title}</cite>”
        </p>
        <p className="mt-2 text-[11px] leading-[1.5] text-dim uppercase sm:mt-2.5 sm:text-xs">
          {paper.meta.map((part, i) => (
            <span key={part} className={i >= 2 ? "hidden sm:inline" : undefined}>
              {i > 0 && " · "}
              {part}
            </span>
          ))}
        </p>
        <div
          id={abstractId}
          className={cx(
            "grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-out motion-reduce:transition-none",
            open ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <p className="max-w-[820px] pt-3 text-[15px] leading-[1.6] sm:pt-4 sm:text-base">
              {paper.abstract}
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={abstractId}
        onClick={onToggle}
        className={cx(
          "mt-1 flex min-h-11 cursor-pointer items-center gap-1.5 justify-self-start text-[11px] text-strong uppercase [grid-area:btn]",
          "sm:mt-0 sm:self-end sm:justify-self-end sm:text-xs",
          hoverFade,
        )}
      >
        {copy.abstract}
        <span aria-hidden="true">{open ? "↑" : "↓"}</span>
      </button>
    </li>
  );
}

export default function ResearchPanel() {
  const isDesktop = useIsDesktop();
  // Only explicit clicks are stored; untouched papers fall back to the desktop default.
  const [toggled, setToggled] = useState({});
  const isOpen = (paper) => toggled[paper.id] ?? (isDesktop && Boolean(paper.openOnDesktop));

  return (
    <Panel id="research">
      {/* One child, so Panel's top/bottom gap doesn't split the header from the list. */}
      <div>
        <div className="flex items-baseline justify-between pb-[18px] sm:pb-7">
          <h2 className="text-[clamp(44px,5vw,72px)] leading-none font-light tracking-[-0.045em] text-strong">
            Research
          </h2>
          <span className="text-xs text-dim sm:text-[13px]">
            {copy.count}
            <span className="hidden sm:inline"> · {copy.kind}</span>
          </span>
        </div>
        <ol>
          {research.map((paper) => (
            <Paper
              key={paper.id}
              paper={paper}
              open={isOpen(paper)}
              onToggle={() => setToggled((t) => ({ ...t, [paper.id]: !isOpen(paper) }))}
            />
          ))}
        </ol>
      </div>
    </Panel>
  );
}
