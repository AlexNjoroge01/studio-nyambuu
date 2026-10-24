import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { SiteImage } from "@/components/media/site-image";
import { Button } from "@/components/ui/button";
import { homeContent } from "@/content/home";
import type { ImageKey } from "@/lib/image-manifest";

const tiles: { image: ImageKey; caption: string }[] = [
  { image: "ruffled-mini-dresses-boutique-row", caption: "Evening colour" },
  { image: "oatmeal-belted-pantsuit-entrance", caption: "Quiet tailoring" },
  { image: "gold-jewellery-collection-collage", caption: "The finishing layer" },
  { image: "berry-peplum-blazer-white-trousers", caption: "A sharp silhouette" },
  { image: "tortoiseshell-accessories-flat-lay", caption: "Warm neutrals" },
  { image: "leopard-two-piece-white-crop-trackset", caption: "Street ease" },
];

/** Six-tile Instagram-style mosaic linking to the lookbook (§7.1). */
export function InstagramGrid() {
  const content = homeContent.instagram;

  return (
    <section className="container-page section-y">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <p className="label mb-5 text-cocoa">{content.eyebrow}</p>
          </Reveal>
          <h2 className="font-heading text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.96] font-light tracking-[-0.02em] text-ink">
            <SplitHeading
              lines={[
                <>
                  {content.title.lead}{" "}
                  <em className="text-cobalt italic">{content.title.emphasis}</em>
                </>,
              ]}
            />
          </h2>
        </div>
        <Reveal delay={0.1}>
          <Button asChild variant="outline-thin" size="lg">
            <Link href="/lookbook">
              {content.cta} <ArrowUpRight />
            </Link>
          </Button>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
        {tiles.map((tile, index) => (
          <Reveal key={tile.image} delay={index * 0.04}>
            <Link
              href="/lookbook"
              data-cursor="view"
              className="group relative block overflow-hidden bg-cream"
            >
              <SiteImage
                name={tile.image}
                aspect="1/1"
                sizes="(min-width: 768px) 33vw, 50vw"
                className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/60 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="label text-paper">{tile.caption}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
