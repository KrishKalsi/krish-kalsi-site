"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { loader } from "@/content/site";

// Loading screen (CLAUDE.md → Character A, docs/design/v5-loader.html).
// Rendered in the initial HTML but hidden unless the <head> script
// (lib/loaderScript.js) turned it on for this load, so it never delays or
// hides content from crawlers, and never flashes on later loads. Purely
// visual: aria-hidden, no focusable content, focus left alone.

// Timeline (ms from when the <head> script ran), from the mockup's script.
const COUNT_END = 1500; // counter and ring 0 → 100
const FILL_END = 1750; // centre dot grows to fill the ring
const REVEAL_START = 1850; // page opens through a circle from the centre
const REVEAL_END = 2800;

const RING = 22; // 44px ring
const DOT = 3;

const inOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (v) => Math.min(Math.max(v, 0), 1);

// cubic-bezier(.7, 0, .3, 1), the site's reveal curve, solved for y at x.
function revealEase(x) {
  const [x1, y1, x2, y2] = [0.7, 0, 0.3, 1];
  const bez = (t, a, b) => 3 * a * t * (1 - t) ** 2 + 3 * b * t * t * (1 - t) + t ** 3;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (bez(mid, x1, x2) < x) lo = mid;
    else hi = mid;
  }
  return bez((lo + hi) / 2, y1, y2);
}

export default function Loader() {
  const [done, setDone] = useState(false);
  const overlay = useRef(null);
  const counter = useRef(null);
  const arc = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    const state = window.__kkLoader;
    const html = document.documentElement;
    let raf = requestAnimationFrame(function frame() {
      if (!state || html.dataset.loader !== "on") {
        setDone(true);
        return;
      }

      const now = performance.now();
      // A skip jumps straight to the reveal.
      if (state.skip !== null && now - state.start < REVEAL_START) {
        state.start = now - REVEAL_START;
      }
      const t = now - state.start;

      const p = inOutCubic(clamp01(t / COUNT_END));
      const fill = clamp01((t - COUNT_END) / (FILL_END - COUNT_END));
      const reveal = revealEase(clamp01((t - REVEAL_START) / (REVEAL_END - REVEAL_START)));

      counter.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      arc.current.style.strokeDashoffset = String(1 - p);
      dot.current.setAttribute("r", String(DOT + fill * (RING - DOT)));

      const el = overlay.current;
      if (reveal > 0) {
        const r = reveal * (Math.hypot(innerWidth / 2, innerHeight / 2) + 4);
        const mask = `radial-gradient(circle at 50% 50%, transparent ${r}px, #000 ${r + 0.5}px)`;
        el.style.maskImage = mask;
        el.style.webkitMaskImage = mask;
        el.style.pointerEvents = "none";
      }

      if (t >= REVEAL_END) {
        state.end();
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(frame);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlay}
      aria-hidden="true"
      className="loader fixed inset-0 z-[100] bg-bg text-[13px] select-none"
    >
      <div className="absolute top-4 left-4 font-semibold tracking-[-0.02em] text-strong sm:top-9 sm:left-8 lg:left-16">
        {profile.monogram}
      </div>
      <div className="absolute top-4 right-4 text-dim sm:top-9 sm:right-8 lg:right-16">
        {profile.coverCorner}
      </div>

      <svg
        width={RING * 2}
        height={RING * 2}
        viewBox={`0 0 ${RING * 2} ${RING * 2}`}
        overflow="visible"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <circle cx={RING} cy={RING} r={RING} className="fill-none stroke-line" strokeWidth={1} />
        {/* Clockwise from 12 o'clock; pathLength 1 makes the offset the progress. */}
        <circle
          ref={arc}
          cx={RING}
          cy={RING}
          r={RING}
          pathLength={1}
          transform={`rotate(-90 ${RING} ${RING})`}
          className="fill-none stroke-strong"
          strokeWidth={1.5}
          strokeDasharray={1}
          strokeDashoffset={1}
        />
        <circle ref={dot} cx={RING} cy={RING} r={DOT} className="fill-strong" />
      </svg>

      {/* Phones: the label sits above the counter; ≥640px they share the bottom row. */}
      <div className="absolute inset-x-4 bottom-4 flex flex-col-reverse items-start gap-5 sm:inset-x-8 sm:bottom-9 sm:flex-row sm:items-end sm:justify-between lg:inset-x-16">
        <div
          ref={counter}
          className="-ml-1 text-[clamp(96px,15vw,212px)] leading-[0.84] font-light tracking-[-0.055em] text-strong tabular-nums sm:-ml-2"
        >
          000
        </div>
        <div className="text-xs leading-[1.5] uppercase sm:mb-2 sm:text-right">
          <div className="text-dim">{loader.label}</div>
          <div className="text-strong">{loader.line}</div>
        </div>
      </div>
    </div>
  );
}
