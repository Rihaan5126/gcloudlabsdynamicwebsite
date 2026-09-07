import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#090c11",
        backgroundImage:
          "linear-gradient(to right, #1a2230 1px, transparent 1px), linear-gradient(to bottom, #1a2230 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        color: "#e6edf3",
        fontFamily: "monospace",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#22d3ee" }}>{"> whoami"}</div>
      <div style={{ display: "flex", fontSize: 96, fontWeight: 700, marginTop: 24 }}>
        {profile.name}
      </div>
      <div style={{ display: "flex", fontSize: 36, color: "#8b98a5", marginTop: 12 }}>
        {profile.headline}
      </div>
    </div>,
    { ...size },
  );
}
