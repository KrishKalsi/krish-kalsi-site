"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { walks } from "@/lib/walks";
import { coverFigure } from "@/content/home";
import cx from "@/lib/cx";

const newSeed = () => Math.floor(Math.random() * 1e9);

const WalkContext = createContext(null);

// Holds the seed so the figure and its Redraw buttons (two placements, by
// breakpoint) share it. The seed only exists after mount: the walks are
// random per visit, so rendering them on the server would mismatch.
export function CoverWalkProvider({ children }) {
  const [seed, setSeed] = useState(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => setSeed(newSeed()));
    return () => cancelAnimationFrame(id);
  }, []);
  const value = useMemo(() => ({ seed, redraw: () => setSeed(newSeed()) }), [seed]);
  return <WalkContext.Provider value={value}>{children}</WalkContext.Provider>;
}

export function CoverWalk() {
  const { seed } = useContext(WalkContext);
  const ref = useRef(null);
  const [size, setSize] = useState(null);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const paths = useMemo(
    () => (seed !== null && size ? walks(seed, size.w, size.h) : null),
    [seed, size],
  );

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {paths && (
        // Keyed on the seed so Redraw remounts the paths and replays the draw.
        <svg key={seed} width={size.w} height={size.h} className="block">
          {paths.groups.map((group, g) =>
            group.map((d, i) => (
              <path
                key={`${g}-${i}`}
                d={d}
                pathLength={1}
                className={cx("walk fill-none stroke-dim", g > 0 && `walk-${g + 1}`)}
                strokeOpacity={0.22}
                strokeWidth={1}
              />
            )),
          )}
          <path
            d={paths.highlight}
            pathLength={1}
            className="walk walk-hi fill-none stroke-strong"
            strokeOpacity={0.55}
            strokeWidth={1.2}
          />
        </svg>
      )}
    </div>
  );
}

export function RedrawButton({ className }) {
  const { redraw } = useContext(WalkContext);
  return (
    <button
      type="button"
      onClick={redraw}
      aria-label={coverFigure.redrawLabel}
      className={cx(
        "flex min-h-11 cursor-pointer items-center text-strong uppercase transition-opacity duration-150 hover:opacity-70 motion-reduce:transition-none",
        className,
      )}
    >
      {coverFigure.redraw}
    </button>
  );
}
