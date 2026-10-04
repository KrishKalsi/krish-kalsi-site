// Shared chrome: menu bar, footer and interface labels.

export const menu = {
  home: { label: "/KrishKalsi", href: "/" },
  links: [
    { label: "Work", href: "/#work", section: "/work" },
    { label: "Research", href: "/#research" },
    { label: "About", href: "/about", section: "/about" },
    { label: "CV", href: "/cv" },
    { label: "Contact", href: "/#contact" },
  ],
  label: "Main",
  open: "Menu",
  close: "Close",
};

export const theme = {
  label: "Colour theme",
  rampLabel: "Switch between dark and light mode",
  rampTitle: "Switch theme",
  options: [
    { value: "dark", label: "Dark" },
    { value: "light", label: "Light" },
  ],
};

export const footer = {
  copyright: "© 2026 Krish Kalsi",
  credit: "Designed & built in Mumbai",
  backToTop: "Back to top ↑",
};

export const skipLink = "Skip to content";

// Source: docs/content.md → Loading screen. KK© and Portfolio ’26 come from profile.
// The third line reads "Step n / 140"; n and the total come from Loader.jsx.
export const loader = {
  label: "Loading:",
  line: "One random walk, σ = 0.25",
  step: "Step",
};

// /cv while the PDF is still TODO (docs/content.md → Profile).
export const cvPlaceholder = {
  title: "CV",
  line: "The CV isn’t uploaded yet.",
  contact: "Reach out directly at",
};

export const notFound = {
  code: "404",
  title: "Page not found",
  line: "This page doesn’t exist, or it has moved.",
  back: "← Home",
};
