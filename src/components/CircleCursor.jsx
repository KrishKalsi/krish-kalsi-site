"use client";

import { useEffect, useRef } from "react";

// Ring cursor (CLAUDE.md → Character B). Only on devices with a precise,
// hovering pointer; everywhere else nothing changes and the native cursor stays.
const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const EASE = 0.22;

function stateFor(target) {
  if (!target?.closest) return "base";
  if (target.closest("input, textarea, select, [contenteditable='true']")) return "text";
  if (target.closest("[data-cursor='work']")) return "work";
  if (target.closest("a, button")) return "link";
  return "base";
}

function start(ring) {
  const html = document.documentElement;
  const reduce = window.matchMedia(REDUCED_MOTION);
  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;
  let raf = 0;
  let visible = false;

  const place = () => {
    ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  };
  // Eases toward the pointer and stops the loop once it has caught up.
  const tick = () => {
    const k = reduce.matches ? 1 : EASE;
    x += (tx - x) * k;
    y += (ty - y) * k;
    if (Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1) {
      x = tx;
      y = ty;
      raf = 0;
    } else {
      raf = requestAnimationFrame(tick);
    }
    place();
  };
  const setVisible = (v) => {
    visible = v;
    ring.dataset.visible = String(v);
  };

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    tx = e.clientX;
    ty = e.clientY;
    if (!visible) {
      x = tx;
      y = ty;
      place();
      setVisible(true);
    }
    ring.dataset.state = stateFor(e.target);
    if (!raf) raf = requestAnimationFrame(tick);
  };
  // Content moves under a still pointer when scrolling; re-check what it is over.
  const onScroll = () => {
    if (visible) ring.dataset.state = stateFor(document.elementFromPoint(tx, ty));
  };
  const onLeave = () => setVisible(false);

  html.classList.add("circle-cursor");
  document.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  html.addEventListener("mouseleave", onLeave);

  return () => {
    html.classList.remove("circle-cursor");
    document.removeEventListener("pointermove", onMove);
    window.removeEventListener("scroll", onScroll);
    html.removeEventListener("mouseleave", onLeave);
    cancelAnimationFrame(raf);
    setVisible(false);
  };
}

export default function CircleCursor() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia(FINE_POINTER);
    let stop = null;
    const sync = () => {
      stop?.();
      stop = fine.matches ? start(ref.current) : null;
    };
    sync();
    fine.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      stop?.();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-visible="false"
      data-state="base"
      className="circle-cursor-ring"
    />
  );
}
