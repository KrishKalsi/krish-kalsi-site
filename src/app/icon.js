import { ImageResponse } from "next/og";

// Browser-tab icon: the site's circle marker, filled, on the page background.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
      <div style={{ width: 16, height: 16, borderRadius: 9999, background: "#E9E9E5" }} />
    </div>,
    size,
  );
}
