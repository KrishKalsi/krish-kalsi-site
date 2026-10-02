import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Shared frame for the generated Open Graph images: the cover panel in the
// dark theme. Satori needs static TTFs (no variable fonts, no woff2).
export const ogSize = { width: 1200, height: 630 };

const t = {
  bg: "#0A0A0A",
  panel: "#111111",
  line: "#383836",
  dim: "#8A8A86",
  text: "#B9B9B5",
  strong: "#E9E9E5",
};

export const ramp = [
  "#F2F2F0",
  "#D6D6D3",
  "#BBBBB8",
  "#A0A09D",
  "#858582",
  "#6B6B68",
  "#52524F",
  "#3B3B39",
  "#262625",
  "#141413",
];

const MARGIN = 40;
export const panelSize = { w: ogSize.width - MARGIN * 2, h: ogSize.height - MARGIN * 2 };

async function fonts() {
  const dir = join(process.cwd(), "src/assets/fonts");
  const [light, regular] = await Promise.all([
    readFile(join(dir, "Geist-Light.ttf")),
    readFile(join(dir, "Geist-Regular.ttf")),
  ]);
  return [
    { name: "Geist", data: light, weight: 300, style: "normal" },
    { name: "Geist", data: regular, weight: 400, style: "normal" },
  ];
}

export function Label({ label, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", fontSize: 15, lineHeight: 1.4 }}>
      <span style={{ color: t.dim, textTransform: "uppercase" }}>{label}</span>
      <span style={{ color: t.strong }}>{value}</span>
    </div>
  );
}

export async function ogImage({ background, top, middle, bottom }) {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: MARGIN,
        background: t.bg,
        fontFamily: "Geist",
        color: t.text,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "28px 36px 32px",
          border: `1px solid ${t.line}`,
          background: t.panel,
        }}
      >
        {background}
        {/* Satori treats a fragment as one row box, so content comes in as slots. */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          {top}
          {middle}
          {bottom}
        </div>
      </div>
    </div>,
    { ...ogSize, fonts: await fonts() },
  );
}

export const ogTokens = t;
