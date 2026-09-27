import { PhotoPanel } from "@/components/Panel";
import CircleMarker from "@/components/CircleMarker";
import { photos } from "@/content/profile";
import { research, researchPhotoCaption } from "@/content/research";

export default function ResearchPanel() {
  return (
    <PhotoPanel
      id="research"
      photo={photos.harbour}
      side="right"
      mediaWidth="50%"
      mobileHeight={300}
      objectPositionClass="object-[60%_50%]"
      sizes="(min-width: 640px) 50vw, 100vw"
      className="lg:min-h-[600px]"
      overlay={
        // Fixed colour: this sits on the photo itself, not a themed panel
        // background, same reasoning as the theme-switch ramp.
        <span className="absolute bottom-5 left-6 text-[11px] tracking-[0.02em] text-[#CFCFCB] uppercase">
          {researchPhotoCaption}
        </span>
      }
    >
      <div className="flex items-baseline justify-between">
        <h2 className="text-[clamp(44px,5vw,72px)] leading-none font-light tracking-[-0.045em] text-strong">
          Research
        </h2>
        <span className="text-xs text-dim">(03)</span>
      </div>
      <ul className="flex flex-col gap-5 sm:gap-8">
        {research.map((item) => (
          <li key={item.title}>
            <div className="flex items-center gap-2.5 text-xs text-dim sm:text-[13px]">
              <CircleMarker />
              {item.status}
            </div>
            <p className="mt-1.5 text-[17px] leading-[1.3] text-strong sm:text-[21px]">
              {item.title}
            </p>
          </li>
        ))}
      </ul>
    </PhotoPanel>
  );
}
