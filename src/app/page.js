import CoverPanel from "@/components/home/CoverPanel";
import AboutPanel from "@/components/home/AboutPanel";
import WorkPanel from "@/components/home/WorkPanel";
import ResearchPanel from "@/components/home/ResearchPanel";
import ExperiencePanel from "@/components/home/ExperiencePanel";
import ContactPanel from "@/components/home/ContactPanel";
import { profile, photos } from "@/content/profile";
import { seo } from "@/content/seo";
import { siteUrl } from "@/lib/siteUrl";

// Person structured data (schema.org). Facts only from docs/content.md.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  image: `${siteUrl}${photos.street.src}`,
  description: seo.description,
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "NMIMS MPSTME",
  },
  knowsAbout: [
    "Data science",
    "Statistics",
    "Uncertainty quantification",
    "Conformal prediction",
    "Quantitative finance",
    "Econometrics",
  ],
  sameAs: [profile.github, profile.linkedin],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <CoverPanel />
      <AboutPanel />
      <WorkPanel />
      <ResearchPanel />
      <ExperiencePanel />
      <ContactPanel />
    </>
  );
}
