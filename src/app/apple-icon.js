import { ImageResponse } from "next/og";

// Home-screen icon: the site's circle marker, filled, on the page background.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0A0A",
      }}
    >
      <div style={{ width: 90, height: 90, borderRadius: 9999, background: "#E9E9E5" }} />
    </div>,
    size,
  );
}
