import { ogImage, ogSize, ogTokens as t, ramp, Label } from "@/lib/og";
import { profile } from "@/content/profile";
import { ogAlt } from "@/content/seo";

export const alt = ogAlt.home;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return ogImage({
    top: (
      <div style={{ display: "flex", flexDirection: "column", marginTop: 8 }}>
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
