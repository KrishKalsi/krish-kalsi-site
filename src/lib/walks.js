import { rng, normal } from "@/lib/random";

// Fig. 0: log random walks behind the cover name (walks() in
// docs/design/v5-home-desktop.html), scaled to the panel's size.
// Shared by CoverWalk and the Open Graph image.
const GROUPS = 3;
const PER_GROUP = 8;
const STEPS = 90;
const SIGMA = 0.25;

export function walks(seed, w, h) {
  const r = rng(seed);
  // Start height and vertical scale as fractions of the panel, from the
  // desktop (1310×758) and mobile (356×538) mockups.
  const mobile = w < 640;
  const y0 = h * (mobile ? 0.613 : 0.62);
  const k = h * (mobile ? 0.706 : 0.818);
  const top = mobile ? 16 : 24;
  const bottom = h - 18;
  const one = () => {
    let ls = 0;
    let d = `M0 ${y0.toFixed(1)}`;
    for (let i = 1; i <= STEPS; i++) {
      ls += SIGMA * Math.sqrt(1 / STEPS) * normal(r);
      const y = Math.min(Math.max(y0 - ls * k, top), bottom);
      d += `L${((i / STEPS) * w).toFixed(1)} ${y.toFixed(1)}`;
    }
    return d;
  };
  const groups = Array.from({ length: GROUPS }, () => []);
  for (let i = 0; i < PER_GROUP; i++) for (const g of groups) g.push(one());
  return { groups, highlight: one() };
}
