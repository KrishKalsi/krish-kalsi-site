// Source: docs/content.md → Work (06).
// Item 01 has its own project page and is the one featured (filled) marker.
// Items 02–06 don't have a page yet, so per CLAUDE.md their tiles link to
// GitHub: `repo` where the project has one, otherwise profile.github (imported
// where this is used). `live` adds a second link to the running app.

export const work = [
  {
    no: "01",
    area: "Uncertainty",
    title: "Conformal prediction lab",
    detail: "90% coverage met on 5 datasets",
    href: "/work/conformal-prediction",
    external: false,
    featured: true,
  },
  {
    no: "02",
    area: "Stochastic processes",
    title: "Markov model of T20 cricket",
    detail: "MAE ≈ 21 runs over 217 matches",
    external: true,
  },
  {
    no: "03",
    area: "Markets · Live",
    title: "ETF overlap detector",
    detail: "Look-through across 3,000+ securities",
    repo: "https://github.com/KrishKalsi/etf-overlap-detector",
    external: true,
  },
  {
    no: "04",
    area: "Risk",
    title: "Portfolio analytics",
    detail: "Efficient frontier · Monte Carlo VaR",
    external: true,
  },
  {
    no: "05",
    area: "Simulation",
    title: "Poker equity engine",
    detail: "169 hands ranked from 500K+ showdowns",
    repo: "https://github.com/KrishKalsi/Poker_Analytics_Engine",
    external: true,
  },
  {
    no: "06",
    area: "Econometrics",
    title: "Electricity demand",
    detail: "≈ 5% CV error on 2,900 days",
    repo: "https://github.com/KrishKalsi/Electricity_demand",
    live: "https://electricitydemand-gdbe2mg2tiywqmbknit5uj.streamlit.app/",
    external: true,
  },
];
