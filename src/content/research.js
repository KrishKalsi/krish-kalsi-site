// Source: docs/content.md → Research (03).
// `meta` is split into parts; mobile shows only the first two.

export const researchLabels = {
  count: "(03)",
  kind: "Working papers",
  author: "Kalsi, K.",
  etAl: "et al.",
  abstract: "Abstract",
};

export const research = [
  {
    id: "P1",
    title: "Autonomous Stock Trading: A Comparative Review.",
    year: "2026",
    meta: [
      "Systematic review",
      "In final revision for submission",
      "Supervisor: Dr Prashasti Kanikar, NMIMS MPSTME",
    ],
    abstract:
      "A review of 19 papers from four databases, screened against criteria fixed in advance. It compares supervised price-prediction models with deep reinforcement-learning trading agents, and finds that reward functions rarely account for risk and that almost no study tests whether simulated results carry over to live trading.",
    openOnDesktop: true,
  },
  {
    id: "P2",
    title: "Survey Design in Medical Machine Learning: An Audit of NHANES-Based Studies.",
    year: "2026–27",
    meta: ["Supervised research", "In progress", "Supervisor: Dr Prashasti Kanikar, NMIMS MPSTME"],
    abstract:
      "NHANES is a complex survey with strata, clusters and sampling weights, yet much published machine-learning work treats it as a simple random sample. We measure how common this is and what it does to the reported results.",
  },
  {
    id: "P3",
    title:
      "Critical Path Method for Quick-Commerce Logistics: Bottleneck Identification in Last-Mile Gig Delivery.",
    year: "2025",
    meta: ["Working paper"],
    abstract:
      "Models a last-mile delivery run as an Activity-on-Node network (CPM/PERT) and proposes an average negative float measure that locates where delays build up.",
  },
];
