import Link from "next/link";
import { PhotoPanel } from "@/components/Panel";
import PanelTitle from "@/components/PanelTitle";
import { profile, profileLabels, photos } from "@/content/profile";
import { sections } from "@/content/home";

const copy = sections.contact;

const rowLink = "flex min-h-12 items-center text-strong no-underline sm:min-h-[52px]";

export default function ContactPanel() {
  return (
    <PhotoPanel
      id="contact"
      photo={photos.rooftop}
      side="right"
      mediaWidth="40%"
      mobileHeight={360}
      objectPositionClass="object-[50%_35%] sm:object-[50%_40%]"
      sizes="(min-width: 640px) 40vw, 100vw"
      className="lg:min-h-[680px]"
    >
      <PanelTitle>{copy.title}</PanelTitle>
      <div>
        <div className="text-xs text-dim uppercase">{profileLabels.mail}</div>
        <a
          href={`mailto:${profile.email}`}
          className="-mt-1.5 -mb-2.5 block max-w-full py-2.5 text-[clamp(26px,2.8vw+15px,56px)] leading-[1.05] font-light tracking-[-0.03em] break-words text-strong no-underline sm:tracking-[-0.04em]"
        >
          {profile.email}
        </a>
        <div className="mt-5 grid grid-cols-2 border-t border-line text-xs uppercase sm:mt-12 sm:grid-cols-3">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={rowLink}>
            {copy.github}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={rowLink}>
            {copy.linkedin}
          </a>
          <Link href={profile.cv} className={`hidden sm:flex ${rowLink}`}>
            {copy.cv}
          </Link>
        </div>
      </div>
    </PhotoPanel>
  );
}
