import Panel from "@/components/Panel";
import ThemeRamp from "@/components/ThemeRamp";
import { CoverWalkProvider, CoverWalk, RedrawButton } from "@/components/home/CoverWalk";
import { profile } from "@/content/profile";
import { coverFigure } from "@/content/home";

// Labels are uppercase, but text-transform would turn σ into Σ (a different symbol).
function Caption() {
  return coverFigure.caption.split(/(σ)/).map((part, i) =>
    part === "σ" ? (
      <span key={i} className="normal-case">
        σ
      </span>
    ) : (
      part
    ),
  );
}

// The only h1 on the page. Two lines below 640px, one line at and above —
// matching the mockups' literal markup (mobile hardcodes "Krish<br/>Kalsi"
// rather than relying on the text to wrap on its own).
function Wordmark() {
  return (
    <h1 className="text-[clamp(104px,10vw+66px,212px)] leading-[0.84] font-light tracking-[-0.055em] text-strong sm:mt-11">
      <span aria-hidden="true" className="sm:hidden">
        Krish
        <br />
        Kalsi
      </span>
      <span aria-hidden="true" className="hidden sm:inline">
        {profile.name}
      </span>
      <span className="sr-only">{profile.name}</span>
    </h1>
  );
}

export default function CoverPanel() {
  return (
    <CoverWalkProvider>
      {/* Content blocks are `relative` so they paint above the absolutely placed walks. */}
      <Panel as="div" className="relative min-h-[520px] overflow-hidden lg:min-h-[760px]">
        <CoverWalk />

        <div className="relative">
          <div className="absolute top-0 right-0 hidden items-center gap-3.5 text-xs text-dim uppercase sm:flex">
            <span>
              <Caption />
            </span>
            <RedrawButton />
          </div>
          <Wordmark />
          <p className="mt-8 max-w-[520px] text-lg text-text sm:mt-10 sm:text-[22px]">
            {profile.coverLine}
          </p>
        </div>

        {/* ≥640px: KK© + ramp, Mail, Based, Portfolio corner — 2×2 at tablet, one row at desktop. */}
        <div className="relative hidden gap-6 pl-2 text-xs leading-[1.4] uppercase sm:grid sm:grid-cols-2 sm:items-end lg:grid-cols-4">
          <div>
            <div className="text-[13px] font-semibold tracking-[-0.02em] text-strong normal-case">
              {profile.monogram}
            </div>
            <ThemeRamp className="mt-2" />
          </div>
          <div>
            <div className="text-dim">Mail:</div>
            <a href={`mailto:${profile.email}`} className="text-strong no-underline normal-case">
              {profile.email}
            </a>
          </div>
          <div>
            <div className="text-dim">Based:</div>
            <div className="text-strong normal-case">{profile.based}</div>
          </div>
          <div className="text-right text-[30px] leading-none font-light tracking-[-0.03em] text-strong normal-case">
            {profile.coverCorner}
          </div>
        </div>

        {/* <640px: Mail, then Based with Redraw beside it (v5 mobile mockup). */}
        <div className="relative flex flex-col gap-3.5 text-[11px] leading-[1.4] uppercase sm:hidden">
          <div>
            <div className="text-dim">Mail:</div>
            <a href={`mailto:${profile.email}`} className="text-strong no-underline normal-case">
              {profile.email}
            </a>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-dim">Based:</div>
              <div className="text-strong normal-case">{profile.based}</div>
            </div>
            <RedrawButton />
          </div>
        </div>
      </Panel>
    </CoverWalkProvider>
  );
}
