import Panel, { PhotoPanel } from "@/components/Panel";
import CircleMarker from "@/components/CircleMarker";
import { profile, photos } from "@/content/profile";
import { research } from "@/content/research";

// Temporary page exercising the shared layout, Panel, PhotoPanel and
// CircleMarker. Replaced by the real home page in step 3.
export default function Home() {
  return (
    <>
      <Panel className="min-h-[540px] lg:min-h-[760px]">
        <h1 className="text-[clamp(72px,14.7vw,212px)] leading-[0.84] font-light tracking-[-0.055em] text-strong">
          {profile.name}
        </h1>
        <p className="text-lg text-text sm:text-[22px]">{profile.coverLine}</p>
      </Panel>

      <PhotoPanel
        id="research"
        photo={photos.harbour}
        side="right"
        mediaWidth="50%"
        mobileHeight={300}
        objectPosition="60% 50%"
        className="lg:min-h-[600px]"
      >
        <h2 className="text-[clamp(44px,5vw,72px)] leading-none font-light tracking-[-0.045em] text-strong">
          Research
        </h2>
        <ul className="flex flex-col gap-5 sm:gap-8">
          {research.map((item, i) => (
            <li key={item.title} className="group">
              <div className="flex items-center gap-2.5 text-xs text-dim sm:text-[13px]">
                <CircleMarker filled={i === 0} />
                {item.status}
              </div>
              <p className="mt-2 text-[17px] leading-[1.3] text-strong sm:text-[21px]">
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </PhotoPanel>
    </>
  );
}
