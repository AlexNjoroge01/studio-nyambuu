import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = "Nyambura Mbugua — personal styling in Nairobi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFF8EE",
          padding: 64,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 16,
            background: "#FFC800",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#5B3A29" }}>
            PERSONAL STYLING · NAIROBI
          </div>
          <div
            style={{
              display: "flex",
              width: 58,
              height: 58,
              borderRadius: 999,
              background: "#1F3BFF",
              color: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            NM
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 108,
              lineHeight: 1,
              color: "#17110D",
              letterSpacing: -3,
            }}
          >
            Dress with
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 108,
              lineHeight: 1,
              color: "#1F3BFF",
              fontStyle: "italic",
              letterSpacing: -3,
            }}
          >
            intention.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 26, color: "#5B3A29", maxWidth: 760 }}>
            Wardrobe editing · Personal shopping · Occasion styling · Express looks
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#17110D" }}>{site.brand.name}</div>
        </div>
      </div>
    ),
    size
  );
}
