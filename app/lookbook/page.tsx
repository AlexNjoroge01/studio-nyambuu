import type { Metadata } from "next";

import { PageTop } from "@/components/layout/page-top";
import { PageHero } from "@/components/sections/page-hero";
import { LookbookGallery } from "@/components/media/lookbook-gallery";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Lookbook — Nairobi Style Gallery",
  description:
    "A full-bleed lookbook of clothing, shoes and accessories from the Nyambura Mbugua studio in Nairobi. Filter by category or occasion and open any look.",
  path: "/lookbook",
  keywords: [
    "Nairobi fashion lookbook",
    "Kenyan fashion style gallery",
    "women's outfit inspiration Nairobi",
    "personal stylist lookbook",
  ],
});

export default function LookbookPage() {
  return (
    <>
      <PageTop
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Lookbook", href: "/lookbook" },
        ]}
      />
      <PageHero
        eyebrow="The lookbook"
        title={{ lead: "Every angle of the", emphasis: "wardrobe." }}
        intro="A full-bleed archive of pieces from the studio — clothing, shoes, accessories and the occasional flat-lay. Filter by category or occasion, then open any image for the full look."
      />

      <div className="container-page pb-24 md:pb-40">
        <LookbookGallery />
      </div>
    </>
  );
}
