"use client";

import { useEffect, useId, useRef, useState } from "react";
import { fit, X_MAX, Y_MIN, Y_MAX } from "@/lib/conformal";
import { conformalFigure as copy } from "@/content/projects";
import cx from "@/lib/cx";

const PAD = { left: 40, right: 8, top: 12, bottom: 28 };
const X_GRID = [1, 2, 3, 4, 5];
const Y_TICKS = [0, 3, 6, 9];
const X_TICKS = [0, 2, 4];
const f = (v) => v.toFixed(1);

function scales(w, h) {
  const l = PAD.left;
  const r = w - PAD.right;
  const t = PAD.top;
  const b = h - PAD.bottom;
  return {
    l,
    r,
    t,
    b,
    X: (x) => l + (x / X_MAX) * (r - l),
    Y: (y) => b - ((Math.min(Math.max(y, Y_MIN), Y_MAX) - Y_MIN) / (Y_MAX - Y_MIN)) * (b - t),
  };
}

const dot = (x, y, r) =>
  `M${f(x - r)} ${f(y)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

function paths(result, s) {
  const { X, Y } = s;
  const trace = (key) =>
    result.curve.map((p, i) => `${i ? "L" : "M"}${f(X(p.x))} ${f(Y(p[key]))}`).join("");
  const up = trace("hi");
  const dn = result.curve.map((p) => `${f(X(p.x))} ${f(Y(p.lo))}`);
  let pin = "";
  let pout = "";
  for (const p of result.points) {
    if (p.inside) pin += dot(X(p.x), Y(p.y), 1.8);
    else pout += dot(X(p.x), Y(p.y), 3);
  }
  return {
    grid:
      X_GRID.map((x) => `M${f(X(x))} ${s.t}V${s.b}`).join("") +
      Y_TICKS.map((y) => `M${s.l} ${f(Y(y))}H${s.r}`).join(""),
    axis: `M${s.l} ${s.t}V${s.b}H${s.r}`,
    area: `${up}L${dn.slice().reverse().join("L")}Z`,
    up,
    lower: `M${dn.join("L")}`,
    line: trace("mu"),
    pin,
    pout,
  };
}

function Toggle({ label, options, value, onChange, className }) {
  return (
    <div role="group" aria-label={label} className="flex border border-line">
      {options.map((option) => {
        const on = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(option.value)}
            className={cx(
              "min-h-11 cursor-pointer px-3.5 text-xs transition-colors duration-150 motion-reduce:transition-none sm:px-4",
              on ? "bg-strong text-panel" : "text-text hover:text-strong",
              className,
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default function ConformalChart({ summaries }) {
  const [method, setMethod] = useState(copy.defaults.method);
  const [alpha, setAlpha] = useState(copy.defaults.alpha);
  const [size, setSize] = useState(null);
  const plotRef = useRef(null);
  const labelId = useId();
  const descId = useId();

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    observer.observe(plotRef.current);
    return () => observer.disconnect();
  }, []);

  const numbers = summaries[`${method}|${alpha}`];
  const methodLabel = copy.methods.find((m) => m.id === method).label;
  const s = size && scales(size.w, size.h);
  const d = s && paths(fit(method, alpha), s);

  return (
    <figure aria-labelledby={labelId} className="flex flex-col gap-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id={labelId} className="text-xs text-dim uppercase">
          {copy.label}
        </h2>
        <div className="flex flex-wrap gap-3 sm:gap-6">
          <Toggle
            label={copy.methodGroup}
            options={copy.methods.map((m) => ({ value: m.id, label: m.label }))}
            value={method}
            onChange={setMethod}
            className="uppercase"
          />
          <Toggle
            label={copy.alphaGroup}
            options={copy.alphas.map((a) => ({ value: a, label: copy.alphaLabel(a) }))}
            value={alpha}
            onChange={setAlpha}
          />
        </div>
      </div>

      <div ref={plotRef} className="h-[300px] sm:h-[420px]">
        {d && (
          <svg
            width={size.w}
            height={size.h}
            role="img"
            aria-labelledby={labelId}
            aria-describedby={descId}
            className="block text-[11px]"
          >
            <path d={d.grid} className="fill-none stroke-grid" strokeWidth={1} />
            <path d={d.axis} className="fill-none stroke-line" strokeWidth={1} />
            <path d={d.area} className="fill-strong" fillOpacity={0.07} />
            <path d={d.up} className="fill-none stroke-strong" strokeWidth={1.2} />
            <path d={d.lower} className="fill-none stroke-strong" strokeWidth={1.2} />
            <path d={d.line} className="fill-none stroke-dim" strokeWidth={1} strokeDasharray="3 4" />
            <path d={d.pin} className="fill-dim" fillOpacity={0.55} />
            <path d={d.pout} className="fill-none stroke-strong" strokeWidth={1.2} />
            {Y_TICKS.map((y) => (
              <text key={y} x={s.l - 8} y={s.Y(y) + 4} textAnchor="end" className="fill-dim">
                {y}
              </text>
            ))}
            {X_TICKS.map((x) => (
              <text key={x} x={s.X(x)} y={s.b + 20} textAnchor="middle" className="fill-dim">
                {x}
              </text>
            ))}
            <text x={s.r} y={s.b + 20} textAnchor="end" className="fill-dim">
              x = {X_MAX}
            </text>
          </svg>
        )}
      </div>

      <p id={descId} className="sr-only">
        {copy.description({
          method: methodLabel,
          target: numbers.target,
          inside: numbers.inside,
          outside: numbers.outside,
        })}
      </p>
      <p aria-live="polite" className="sr-only">
        {copy.summary({
          method: methodLabel,
          alpha: alpha.toFixed(2),
          coverage: numbers.coverage,
          mean: numbers.mean,
          width: numbers.width,
        })}
      </p>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 border-t border-line pt-5 lg:grid-cols-4">
        <dl className="grid grid-cols-3 gap-x-6 lg:col-span-3">
          {Object.entries(copy.readouts).map(([key, label]) => (
            <div key={key} className="flex flex-col justify-between">
              <dt className="text-[11px] text-dim uppercase sm:text-xs">{label}</dt>
              <dd className="mt-1.5 text-[26px] font-light tracking-[-0.03em] text-strong tabular-nums sm:text-[40px]">
                {numbers[key]}
              </dd>
            </div>
          ))}
        </dl>
        <p className="text-[13px] leading-[1.5] text-text">
          {copy.caption(methodLabel, numbers.target)}
        </p>
      </div>
    </figure>
  );
}
