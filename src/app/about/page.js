import AboutHero from "@/components/about/AboutHero";
import EducationPanel from "@/components/about/EducationPanel";
import CourseworkSkillsPanel from "@/components/about/CourseworkSkillsPanel";
import CertificationsPanel from "@/components/about/CertificationsPanel";
import CvPanel from "@/components/about/CvPanel";
import { pageSeo } from "@/content/seo";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata({ ...pageSeo.about, path: "/about", coverImage: true });

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
