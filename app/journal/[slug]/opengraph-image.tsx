import { ImageResponse } from "next/og";

import { getPost } from "@/content/journal";

export const alt = "Journal article — Styled by Nyambura";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function JournalOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

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
            bottom: 0,
            left: 0,
            right: 0,
            height: 18,
            background: "#FFC800",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: "#5B3A29" }}>
            THE JOURNAL
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#5B3A29" }}>
            {post?.category ?? "Style"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              lineHeight: 1.04,
              color: "#17110D",
              letterSpacing: -2,
            }}
          >
            {post?.title ?? "Style notes for real wardrobes"}
          </div>
          <div style={{ display: "flex", fontSize: 28, lineHeight: 1.35, color: "#5B3A29", marginTop: 22 }}>
            {post?.description ?? "Practical style guides for Kenyan occasions."}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#17110D" }}>
          Styled by Nyambura · Nairobi
        </div>
      </div>
    ),
    size
  );
}
