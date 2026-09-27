import { PhotoPanel } from "@/components/Panel";
import { photos } from "@/content/profile";
import { aboutStatement, aboutLabels } from "@/content/home";

export default function AboutPanel() {
  return (
    <PhotoPanel
      id="about"
      photo={photos.street}
      objectPositionClass="object-[50%_30%]"
      priority
      className="lg:min-h-[680px]"
    >
      <div className="flex items-baseline justify-between">
        <h2 className="text-[clamp(44px,5vw,72px)] leading-none font-light tracking-[-0.045em] text-strong">
          About
        </h2>
        <span className="text-xs text-dim">(01)</span>
      </div>

      <div>
        <p className="text-lg leading-[1.42] text-strong sm:text-[25px] sm:leading-[1.38] sm:tracking-[-0.01em]">
          {aboutStatement}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-4 text-[11px] leading-[1.45] uppercase sm:mt-12 sm:gap-x-6 sm:gap-y-7 sm:text-xs">
          {aboutLabels.map(({ label, lines }) => (
            <div key={label}>
              <div className="text-dim">{label}</div>
              <div className="text-strong normal-case">
                {lines.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhotoPanel>
  );
}
