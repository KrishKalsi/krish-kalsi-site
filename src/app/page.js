import CoverPanel from "@/components/home/CoverPanel";
import AboutPanel from "@/components/home/AboutPanel";
import WorkPanel from "@/components/home/WorkPanel";
import ResearchPanel from "@/components/home/ResearchPanel";
import ExperiencePanel from "@/components/home/ExperiencePanel";
import ContactPanel from "@/components/home/ContactPanel";

export default function Home() {
  return (
    <>
      <CoverPanel />
      <AboutPanel />
      <WorkPanel />
      <ResearchPanel />
      <ExperiencePanel />
      <ContactPanel />
    </>
  );
}
