// Source: docs/content.md → Project page — Conformal prediction.
// One entry per project that has its own page; `no` links it to its Work tile
// in work.js. Other projects get an entry here once Krish writes them.

export const projects = {
  "conformal-prediction": {
    no: "01",
    title: ["Conformal", "prediction"],
    meta: [
      { label: "Year:", value: "2026" },
      { label: "Status:", value: "In progress" },
      { label: "Stack:", value: "Python · NumPy · scikit-learn" },
    ],
    repo: null, // TODO: project repo URL — falls back to profile.github until provided.
    viewCode: "View code ↗",
    abstract:
      "Conformal prediction wraps any model in intervals that contain the truth with probability at least 1 − α. I implemented split conformal and CQR from scratch, then tested the guarantee over repeated calibration splits.",
    result: { value: "90%", caption: "target coverage met on five benchmark datasets" },
    figure: "conformal",
    formulas: [
      String.raw`C(x) = \big[\, \hat{\mu}(x) - \hat{q},\ \ \hat{\mu}(x) + \hat{q} \,\big]`,
      String.raw`1 - \alpha \le P\big( Y \in C(X) \big) \le 1 - \alpha + \frac{1}{n+1}`,
    ],
    methodNote:
      "q̂ is the ⌈(n+1)(1−α)⌉-th smallest calibration score. CQR conformalises quantile estimates instead, so intervals widen where the noise does.",
    limitations: [
      "Coverage is marginal, not conditional.",
      "Exchangeability fails under time series and covariate shift.",
      "Next: weighted and adaptive conformal methods.",
    ],
  },
};

export const projectLabels = {
  back: "← Work",
  abstract: "Abstract:",
  result: "Result:",
  method: "Method:",
  limitations: "Limitations:",
  next: "Next",
  opensGithub: "(opens GitHub in a new tab)",
};

// Fig. 1 on the conformal prediction page.
export const conformalFigure = {
  label: "Fig. 1 — Intervals on heteroscedastic data",
  methodGroup: "Method",
  alphaGroup: "Miscoverage level alpha",
  methods: [
    { id: "split", label: "Split conformal" },
    { id: "cqr", label: "CQR" },
  ],
  alphas: [0.05, 0.1, 0.2],
  defaults: { method: "cqr", alpha: 0.1 },
  alphaLabel: (a) => `α ${a.toFixed(2)}`,
  readouts: {
    coverage: "Test coverage",
    mean: "Mean over 1,000 splits",
    width: "Mean width",
  },
  caption: (method, target) =>
    `${method} on synthetic data where noise grows with x. Filled dots are covered; open circles fall outside. Target: ${target}.`,
  // Screen-reader description of the plot for the current settings.
  description: ({ method, target, inside, outside }) =>
    `Scatter plot of ${inside + outside} test points, x from 0 to 5, where the spread of y grows with x. A dashed line shows the k-nearest-neighbour fit and a shaded band shows the ${method} prediction interval for target coverage ${target}. ${inside} points fall inside the band and ${outside} fall outside.`,
  summary: ({ method, alpha, coverage, mean, width }) =>
    `${method}, α ${alpha}: test coverage ${coverage}, mean over 1,000 splits ${mean}, mean width ${width}.`,
};
