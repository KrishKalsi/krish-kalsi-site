// Source: docs/content.md → Home — About panel (01).
// Content unique to the home page's About panel — the fuller /about page
// (step 4) has its own, longer content.

export const aboutStatement =
  "Third-year data science student at NMIMS, Mumbai. I build models whose claims can be checked — prediction intervals, simulations, forecasts — and I’m most at home where statistics meets markets.";

// `lines` is an array so two-line values render via <br/> without raw HTML.
export const aboutLabels = [
  { label: "Education:", lines: ["B.Tech Data Science, NMIMS MPSTME", "2024–28 · CGPA 8.43"] },
  { label: "Focus:", lines: ["Uncertainty quantification", "Quant finance · Econometrics"] },
  { label: "Now:", lines: ["Conformal prediction lab", "NHANES survey-design audit"] },
  { label: "Open to:", lines: ["Research internships", "Summer 2027"] },
];

// Panel headings and link labels on the home page (wording from the v5 mockups).
export const sections = {
  about: { title: "About", count: "(01)" },
  work: { title: "Work" }, // the count is the number of work items
  research: { title: "Research" },
  experience: { title: "Experience" },
  contact: { title: "Contact", github: "GitHub ↗", linkedin: "LinkedIn ↗" },
};
