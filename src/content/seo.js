// Source: docs/content.md → SEO. Page descriptions reuse each page's own copy.
import { aboutHero } from "@/content/about";

export const seo = {
  title: "Krish Kalsi — Data science, statistics & quant finance",
  titleTemplate: "%s — Krish Kalsi",
  description:
    "Personal site of Krish Kalsi, a data science student in Mumbai working on uncertainty quantification, statistical modelling and quantitative finance.",
  locale: "en_IN",
};

export const pageSeo = {
  about: { title: aboutHero.title, description: aboutHero.statement },
  cv: { title: "CV", description: "Curriculum vitae of Krish Kalsi." },
};

export const ogAlt = {
  home: "Krish Kalsi — Data science student. Random walks behind the name.",
  project: "Project title and details, by Krish Kalsi",
};
