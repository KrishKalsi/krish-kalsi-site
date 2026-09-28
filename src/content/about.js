// Source: docs/content.md → About page (`/about`).

export const aboutHero = {
  title: "About",
  statement:
    "I like work whose claims can be checked — against a guarantee, a baseline, or data the model hasn’t seen.",
  subline:
    "Outside class I’m usually modelling something I already enjoy: cricket, poker, markets.",
};

export const education = [
  { degree: "B.Tech, Data Science", institution: "NMIMS MPSTME, Mumbai", period: "2024–28 · CGPA 8.43" },
  { degree: "ICSE Grade 10", institution: "Avalon Heights International School", period: "2022 · 95.4%" },
];

export const coursework = [
  {
    label: "Probability & statistics",
    items: "Probability and Statistics, Stochastic Processes, Statistical Methods, Statistical Inference",
    current: false,
  },
  {
    label: "Mathematics & computing",
    items: "Calculus, Linear Algebra & ODEs, Optimization, Data Structures & Algorithms, DBMS",
    current: false,
  },
  {
    label: "This semester",
    items: "Applied Time Series, Financial Derivatives, Foundations of Machine Learning",
    current: true,
  },
];

export const skills = [
  { label: "Languages", items: "Python, R, C++, Java, SQL, JavaScript" },
  { label: "Methods", items: "Monte Carlo simulation, econometrics, conformal prediction, portfolio optimisation, VaR" },
  { label: "Tools", items: "NumPy, pandas, scikit-learn, TensorFlow, Streamlit, Git, Tableau" },
];

export const certifications = [
  "Machine Learning Specialization — DeepLearning.AI",
  "Quantitative Research Simulation — JPMorgan Chase",
  "Investment Banking Simulation — JPMorgan Chase",
];

export const beyondClass = [
  "R&D Executive, Social Conclave — gig-worker welfare",
  "Volunteer, Dynamic Welfare Group — food & sanitation drives",
];

export const cvPanel = {
  meta: "PDF · 2 pages · Sep 2026",
  title: "Curriculum vitae",
  buttonLabel: "Download ↓",
};
