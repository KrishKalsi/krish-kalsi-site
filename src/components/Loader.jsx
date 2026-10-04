"use client";

import { useEffect, useRef, useState } from "react";
import { rng, normal } from "@/lib/random";
import { profile } from "@/content/profile";
import { loader } from "@/content/site";

// Loading screen (CLAUDE.md → Character A, docs/design/v5-loader.html): one
// random walk drawn left to right in step with the counter, then the page
// opens through a circle centred on the tip of the path.
// Rendered in the initial HTML but hidden unless the <head> script
// (lib/loaderScript.js) turned it on for this load, so it never delays or
// hides content from crawlers, and never flashes on later loads. Purely
// visual: aria-hidden, no focusable content, focus left alone.

// Timeline (ms from when the <head> script ran), from the mockup's script.
const COUNT_END = 1900; // counter 0 → 100, path drawn left to right
const REVEAL_START = 2150; // after a short hold, the page opens from the tip
const REVEAL_END = 3100;

// The walk: pts() in the mockup. Start height and vertical scale are the
// mockup's 430px and 560px as fractions of its 900px frame.
const STEPS = 140;
const SIGMA = 0.25;
const START = 430 / 900;
const SCALE = 560 / 900;

const inOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

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

// A log random walk from the left page margin to the right one, kept clear of
// the top labels (`top`) and the counter (`bottom`).
function walk(seed, { w, h, margin, top, bottom }) {
  const r = rng(seed);
  const y0 = clamp(h * START, top, bottom);
  const points = [{ x: margin, y: y0 }];
  let ls = 0;
  for (let i = 1; i <= STEPS; i++) {
    ls += SIGMA * Math.sqrt(1 / STEPS) * normal(r);
    points.push({
      x: margin + (i / STEPS) * (w - margin * 2),
      y: clamp(y0 - ls * h * SCALE, top, bottom),
    });
  }
  return points;
}

// Labels are uppercase, but text-transform would turn σ into Σ (a different symbol).
function Line() {
  return loader.line.split(/(σ)/).map((part, i) =>
    part === "σ" ? (
      <span key={i} className="normal-case">
        σ
      </span>
    ) : (
      part
    ),
  );
}

export default function Loader() {
  const [done, setDone] = useState(false);
  const overlay = useRef(null);
  const counter = useRef(null);
  const step = useRef(null);
  const bottomRow = useRef(null);
  const baseline = useRef(null);
  const path = useRef(null);
  const tip = useRef(null);

  useEffect(() => {
    const state = window.__kkLoader;
    const html = document.documentElement;
    let points = null;
    let frozen = null; // progress held from the moment of a skip

    let raf = requestAnimationFrame(function frame() {
      if (!state || html.dataset.loader !== "on") {
        setDone(true);
        return;
      }

      if (!points) {
        // Page margins match the layout: 16 / 32 / 64px.
        const w = innerWidth;
        const h = innerHeight;
        const margin = w >= 1024 ? 64 : w >= 640 ? 32 : 16;
        points = walk(Math.floor(Math.random() * 1e9), {
          w,
          h,
          margin,
          top: h * (150 / 900),
          bottom: bottomRow.current.getBoundingClientRect().top - 40,
        });
        baseline.current.setAttribute("d", `M${margin} ${points[0].y.toFixed(1)}H${w - margin}`);
      }

      // A skip jumps straight to the reveal, from wherever the tip was then.
      if (state.skip !== null && frozen === null) {
        const at = state.skip - state.start;
        if (at < REVEAL_START) {
          frozen = inOutCubic(clamp(at / COUNT_END, 0, 1));
          state.start = state.skip - REVEAL_START;
        }
      }
      const t = performance.now() - state.start;

      const p = frozen ?? inOutCubic(clamp(t / COUNT_END, 0, 1));
      const reveal = revealEase(clamp((t - REVEAL_START) / (REVEAL_END - REVEAL_START), 0, 1));

      counter.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      step.current.textContent = String(Math.round(p * STEPS));

      // The path up to the tip, which sits part-way along the current segment.
      const fp = p * STEPS;
      const k = Math.min(Math.floor(fp), STEPS - 1);
      const a = points[k];
      const b = points[k + 1];
      const tx = a.x + (b.x - a.x) * (fp - k);
      const ty = a.y + (b.y - a.y) * (fp - k);
      let d = "";
      for (let i = 0; i <= k; i++) {
        d += `${i ? "L" : "M"}${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)}`;
      }
      path.current.setAttribute("d", `${d}L${tx.toFixed(1)} ${ty.toFixed(1)}`);
      tip.current.setAttribute("cx", tx.toFixed(1));
      tip.current.setAttribute("cy", ty.toFixed(1));
      tip.current.setAttribute("r", "4");

      const el = overlay.current;
      if (reveal > 0) {
        const full = Math.hypot(Math.max(tx, innerWidth - tx), Math.max(ty, innerHeight - ty)) + 4;
        const r = reveal * full;
        const mask = `radial-gradient(circle at ${tx.toFixed(1)}px ${ty.toFixed(1)}px, transparent ${r}px, #000 ${r + 0.5}px)`;
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

      {/* Drawn in viewport pixels once the walk is generated, after mount. */}
      <svg className="absolute inset-0 h-full w-full">
        <path
          ref={baseline}
          className="fill-none stroke-line"
          strokeWidth={1}
          strokeDasharray="2 7"
        />
        <path
          ref={path}
          className="fill-none stroke-strong"
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
        <circle ref={tip} r={0} className="fill-strong" />
      </svg>

      {/* Phones: the label sits above the counter; ≥640px they share the bottom row. */}
      <div
        ref={bottomRow}
        className="absolute inset-x-4 bottom-4 flex flex-col-reverse items-start gap-5 sm:inset-x-8 sm:bottom-9 sm:flex-row sm:items-end sm:justify-between lg:inset-x-16"
      >
        <div
          ref={counter}
          className="-ml-1 text-[clamp(96px,15vw,212px)] leading-[0.84] font-light tracking-[-0.055em] text-strong tabular-nums sm:-ml-2"
        >
          000
        </div>
        <div className="text-xs leading-[1.5] uppercase sm:mb-2 sm:text-right">
          <div className="text-dim">{loader.label}</div>
          <div className="text-strong">
            <Line />
          </div>
          <div className="text-dim tabular-nums">
            {loader.step} <span ref={step}>0</span> / {STEPS}
          </div>
        </div>
      </div>
    </div>
  );
}
