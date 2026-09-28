import AboutHero from "@/components/about/AboutHero";
import EducationPanel from "@/components/about/EducationPanel";
import CourseworkSkillsPanel from "@/components/about/CourseworkSkillsPanel";
import CertificationsPanel from "@/components/about/CertificationsPanel";
import CvPanel from "@/components/about/CvPanel";

export const metadata = {
  title: "About — Krish Kalsi",
  description:
    "I like work whose claims can be checked — against a guarantee, a baseline, or data the model hasn’t seen.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <EducationPanel />
      <CourseworkSkillsPanel />
      <CertificationsPanel />
      <CvPanel />
    </>
  );
}
