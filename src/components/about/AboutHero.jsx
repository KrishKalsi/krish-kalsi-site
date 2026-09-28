import { PhotoPanel } from "@/components/Panel";
import { photos } from "@/content/profile";
import { aboutHero } from "@/content/about";

export default function AboutHero() {
  return (
    <PhotoPanel
      photo={photos.laugh}
      side="right"
      mediaWidth="38%"
      objectPositionClass="object-[50%_35%]"
      sizes="(min-width: 640px) 38vw, 100vw"
      priority
      className="lg:min-h-[600px]"
    >
      <h1 className="text-[clamp(72px,9.2vw+36px,168px)] leading-[0.86] font-light tracking-[-0.055em] text-strong">
        {aboutHero.title}
      </h1>
      <div>
        <p className="max-w-[640px] text-lg leading-[1.42] text-strong sm:text-[25px] sm:leading-[1.38] sm:tracking-[-0.01em]">
          {aboutHero.statement}
        </p>
        <p className="mt-5 max-w-[600px] text-sm leading-[1.5] text-text sm:text-[17px] sm:leading-[1.55]">
          {aboutHero.subline}
        </p>
      </div>
    </PhotoPanel>
  );
}
