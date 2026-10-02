import { ogImage, ogSize, ogTokens as t, panelSize, ramp, Label } from "@/lib/og";
import { walks } from "@/lib/walks";
import { profile } from "@/content/profile";
import { ogAlt } from "@/content/seo";

export const alt = ogAlt.home;
export const size = ogSize;
export const contentType = "image/png";

// A fixed seed so the shared image is stable (the live cover reseeds per visit).
const SEED = 2026;

export default async function Image() {
  const { w, h } = panelSize;
  const paths = walks(SEED, w, h);

  const background = (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      {paths.groups.flat().map((d, i) => (
        <path key={i} d={d} fill="none" stroke={t.dim} strokeOpacity="0.22" strokeWidth="1" />
      ))}
      <path
        d={paths.highlight}
        fill="none"
        stroke={t.strong}
        strokeOpacity="0.55"
        strokeWidth="1.2"
      />
    </svg>
  );

  return ogImage({
    background,
    top: (
      <div style={{ display: "flex", flexDirection: "column", marginTop: 44 }}>
        <div
          style={{
            fontSize: 188,
            fontWeight: 300,
            lineHeight: 0.84,
            letterSpacing: "-0.055em",
            color: t.strong,
          }}
        >
          {profile.name}
        </div>
        <div style={{ marginTop: 34, fontSize: 26, color: t.text }}>{profile.coverLine}</div>
      </div>
    ),
    bottom: (
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span
              style={{ fontSize: 16, fontWeight: 400, letterSpacing: "-0.02em", color: t.strong }}
            >
              {profile.monogram}
            </span>
            <div style={{ display: "flex" }}>
              {ramp.map((c) => (
                <div key={c} style={{ width: 14, height: 14, background: c }} />
              ))}
            </div>
          </div>
          <Label label="Mail:" value={profile.email} />
          <Label label="Based:" value={profile.based} />
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: t.strong,
          }}
        >
          {profile.coverCorner}
        </div>
      </div>
    ),
  });
}
