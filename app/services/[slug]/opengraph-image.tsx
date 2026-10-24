import { ImageResponse } from "next/og";

import { getService } from "@/content/services";

export const alt = "Styling service — Nyambura Mbugua, Nairobi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT_HEX = {
  cobalt: "#1F3BFF",
  tangerine: "#FF7A1A",
  vermilion: "#F0301E",
  sun: "#FFC800",
  cocoa: "#5B3A29",
} as const;

export default async function ServiceOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  const accent = service ? ACCENT_HEX[service.accent] : "#1F3BFF";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          padding: 64,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 22,
            background: accent,
            display: "flex",
          }}
        />
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: "#5B3A29" }}>
          NYAMBURA MBUGUA · NAIROBI
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, lineHeight: 1.02, color: "#17110D", letterSpacing: -2 }}>
            {service?.name ?? "Styling services"}
          </div>
          <div style={{ display: "flex", fontSize: 38, lineHeight: 1.2, color: accent, marginTop: 18 }}>
            {service?.tagline ?? "Dress with intention."}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 24, color: "#5B3A29", maxWidth: 780 }}>
            {service?.metaDescription ?? "Personal styling, wardrobe editing and personal shopping in Kenya."}
          </div>
        </div>
      </div>
    ),
    size
  );
}
