import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SiteImage } from "@/components/media/site-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { homeContent } from "@/content/home";

/** Three staggered parallax images + collection copy (§7.1). */
export function CollectionTeaser() {
  const content = homeContent.collectionTeaser;
  const images = content.images;

  return (
    <section className="bg-cream">
      <div className="container-page section-y">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label mb-6 text-cocoa">{content.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-heading text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[0.96] font-light tracking-[-0.02em] text-ink">
                {content.title.lead}{" "}
                <em className="text-cocoa italic">{content.title.emphasis}</em>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-cocoa">
                {content.body}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Button asChild variant="outline-thin" size="lg" className="mt-8">
                <Link href="/collection">
                  {content.cta} <ArrowUpRight />
                </Link>
              </Button>
            </Reveal>
          </div>

          <div className="grid grid-cols-3 items-start gap-3 lg:col-span-7 lg:gap-4">
            <Reveal delay={0.1} className="mt-10">
              <div className="relative">
                <Parallax className="aspect-[3/4]" strength={6}>
                  <SiteImage
                    name={images.left}
                    fill
                    sizes="(min-width: 1024px) 17vw, 30vw"
                    className="h-full w-full"
                  />
                </Parallax>
                <Badge className="label absolute bottom-3 left-3 bg-paper/90 font-normal text-ink">
                  Clothing
                </Badge>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative">
                <Parallax className="aspect-[3/4]" strength={10}>
                  <SiteImage
                    name={images.center}
                    fill
                    sizes="(min-width: 1024px) 17vw, 30vw"
                    className="h-full w-full"
                  />
                </Parallax>
                <Badge className="label absolute bottom-3 left-3 bg-paper/90 font-normal text-ink">
                  Shoes
                </Badge>
              </div>
            </Reveal>

            <Reveal delay={0.3} className="mt-16">
              <div className="relative">
                <Parallax className="aspect-[3/4]" strength={5}>
                  <SiteImage
                    name={images.right}
                    fill
                    sizes="(min-width: 1024px) 17vw, 30vw"
                    className="h-full w-full"
                  />
                </Parallax>
                <Badge className="label absolute bottom-3 left-3 bg-paper/90 font-normal text-ink">
                  Accessories
                </Badge>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
