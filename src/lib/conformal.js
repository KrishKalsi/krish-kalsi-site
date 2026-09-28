// Port of the Fig. 1 algorithm in docs/design/v3-project.html. The RNG call
// order must stay identical to the mockup so the readouts match it exactly.

import { rng, normal } from "@/lib/random";

const K = 60;
const N_CAL = 500;
const REPS = 1000;
export const X_MAX = 5;
export const Y_MIN = -3;
export const Y_MAX = 9;

let data;
function getData() {
  if (data) return data;
  const r = rng(1107);
  const fx = (x) => 2 * Math.sin(1.3 * x) + 0.6 * x;
  const sd = (x) => 0.2 + 0.35 * x;
  const gen = (m) => {
    const out = [];
    for (let i = 0; i < m; i++) {
      const x = X_MAX * r();
      out.push({ x, y: fx(x) + sd(x) * normal(r) });
    }
    return out;
  };
  const train = gen(800).sort((a, b) => a.x - b.x);
  const pool = gen(1000);
  data = { train, xs: train.map((p) => p.x), pool };
  return data;
}

// k-NN mean plus the α/2 and 1−α/2 empirical quantiles of the neighbours.
function knn(x, alpha) {
  const { train, xs } = getData();
  let lo = 0;
  let hi = xs.length;
  while (lo < hi) {
    const m = (lo + hi) >> 1;
    if (xs[m] < x) lo = m + 1;
    else hi = m;
  }
  let i = lo - 1;
  let j = lo;
  const ys = [];
  while (ys.length < K) {
    if (i < 0) ys.push(train[j++].y);
    else if (j >= xs.length) ys.push(train[i--].y);
    else if (x - xs[i] <= xs[j] - x) ys.push(train[i--].y);
    else ys.push(train[j++].y);
  }
  ys.sort((p, q) => p - q);
  let s = 0;
  for (let t = 0; t < K; t++) s += ys[t];
  const quantile = (p) => {
    const h = (K - 1) * p;
    const b = Math.floor(h);
    const next = b + 1 < K ? ys[b + 1] : ys[b];
    return ys[b] + (h - b) * (next - ys[b]);
  };
  return [s / K, quantile(alpha / 2), quantile(1 - alpha / 2)];
}

function conformalQuantile(scores, idx, alpha) {
  const s = idx.map((i) => scores[i]).sort((u, v) => u - v);
  const k = Math.min(Math.ceil((idx.length + 1) * (1 - alpha)), idx.length);
  return s[k - 1];
}

const fits = new Map();

// Everything the chart needs for one (method, α): the band sampled along x,
// the test points with their covered flag, and the test-set readouts.
export function fit(method, alpha) {
  const key = `${method}|${alpha}`;
  if (fits.has(key)) return fits.get(key);

  const { pool } = getData();
  const pred = pool.map((p) => knn(p.x, alpha));
  const scores = pool.map((p, i) =>
    method === "split"
      ? Math.abs(p.y - pred[i][0])
      : Math.max(pred[i][1] - p.y, p.y - pred[i][2]),
  );
  const all = pool.map((_, i) => i);
  const test = all.slice(N_CAL);
  const q = conformalQuantile(scores, all.slice(0, N_CAL), alpha);
  const band = (pp) => (method === "split" ? [pp[0] - q, pp[0] + q] : [pp[1] - q, pp[2] + q]);

  let covered = 0;
  let width = 0;
  const points = test.map((i) => {
    const inside = scores[i] <= q;
    if (inside) covered++;
    const b = band(pred[i]);
    width += b[1] - b[0];
    return { x: pool[i].x, y: pool[i].y, inside };
  });

  const curve = [];
  for (let i = 0; i <= 100; i++) {
    const x = i * 0.05;
    const pp = knn(x, alpha);
    const [lo, hi] = band(pp);
    curve.push({ x, mu: pp[0], lo, hi });
  }

  const result = {
    scores,
    q,
    points,
    curve,
    coverage: covered / test.length,
    width: width / test.length,
  };
  fits.set(key, result);
  return result;
}

// Mean test coverage over 1,000 random calibration/test splits (seeded).
export function meanOverSplits(method, alpha) {
  const { scores } = fit(method, alpha);
  const n = scores.length;
  const all = scores.map((_, i) => i);
  const r = rng(4242);
  let mean = 0;
  for (let rep = 0; rep < REPS; rep++) {
    const idx = all.slice();
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      const t = idx[i];
      idx[i] = idx[j];
      idx[j] = t;
    }
    const q = conformalQuantile(scores, idx.slice(0, N_CAL), alpha);
    let c = 0;
    for (let t = N_CAL; t < n; t++) if (scores[idx[t]] <= q) c++;
    mean += c / (n - N_CAL);
  }
  return mean / REPS;
}

// Formatted readouts for every method × α, as the mockup prints them.
export function summarise(methods, alphas) {
  const out = {};
  for (const m of methods) {
    for (const a of alphas) {
      const f = fit(m, a);
      const inside = f.points.filter((p) => p.inside).length;
      out[`${m}|${a}`] = {
        inside,
        outside: f.points.length - inside,
        coverage: f.coverage.toFixed(3),
        mean: meanOverSplits(m, a).toFixed(3),
        width: f.width.toFixed(2),
        target: (1 - a).toFixed(2),
      };
    }
  }
  return out;
}
