import Link from "next/link";
import { PhotoPanel } from "@/components/Panel";
import { profile, photos } from "@/content/profile";

const rowLink =
  "flex min-h-12 items-center text-strong no-underline sm:min-h-[52px]";

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
      <h2 className="text-[clamp(44px,5vw,72px)] leading-none font-light tracking-[-0.045em] text-strong">
        Contact
      </h2>
      <div>
        <div className="text-xs text-dim uppercase">Mail:</div>
        <a
          href={`mailto:${profile.email}`}
          className="mt-1 block max-w-full text-[clamp(26px,2.8vw+15px,56px)] leading-[1.05] font-light tracking-[-0.03em] break-words text-strong no-underline sm:tracking-[-0.04em]"
        >
          {profile.email}
        </a>
        <div className="mt-5 grid grid-cols-2 border-t border-line text-xs uppercase sm:mt-12 sm:grid-cols-3">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={rowLink}>
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={rowLink}>
            LinkedIn ↗
          </a>
          <Link href={profile.cv} className={`hidden sm:flex ${rowLink}`}>
            CV ↓
          </Link>
        </div>
      </div>
    </PhotoPanel>
  );
}
