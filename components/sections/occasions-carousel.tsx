import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { SiteImage } from "@/components/media/site-image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { homeContent } from "@/content/home";
import { occasions } from "@/content/occasions";

/** Wide occasion cards, swipeable on mobile (§7.1). */
export function OccasionsCarousel() {
  const content = homeContent.occasions;

  return (
    <section className="section-y overflow-hidden bg-ink text-paper">
      <div className="container-page">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal>
              <p className="label mb-6 text-sun">{content.eyebrow}</p>
            </Reveal>
            <h2 className="font-heading text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.94] font-light tracking-[-0.025em]">
              <SplitHeading
                lines={[
                  content.title.lead,
                  <em key="emphasis" className="text-sun italic">
                    {content.title.emphasis}
                  </em>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.15} className="md:col-span-4">
            <p className="max-w-[40ch] text-base leading-relaxed text-paper/70">
              {content.description}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-12">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
            aria-label="Occasions"
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {occasions.map((occasion) => (
                <CarouselItem
                  key={occasion.name}
                  className="basis-[85%] pl-3 sm:basis-[55%] md:basis-[38%] md:pl-4 lg:basis-[31%]"
                >
                  <Link
                    href={`/contact?occasion=${encodeURIComponent(occasion.name)}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden">
                      <SiteImage
                        name={occasion.image}
                        aspect="4/3"
                        sizes="(min-width: 1024px) 31vw, (min-width: 768px) 38vw, 85vw"
                        className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                        <div>
                          <p className="label mb-1 text-sun">Occasion</p>
                          <h3 className="font-heading text-2xl leading-none font-light text-paper md:text-3xl">
                            {occasion.name}
                          </h3>
                        </div>
                        <span className="flex size-9 items-center justify-center rounded-full bg-paper/10 text-paper backdrop-blur-sm transition-colors group-hover:bg-sun group-hover:text-ink">
                          <ArrowUpRight className="size-4" aria-hidden />
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-paper/60">
                      {occasion.description}
                    </p>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex items-center justify-between">
              <Button asChild variant="outline-thin" size="lg" className="border-paper/30 text-paper hover:border-sun hover:text-sun">
                <Link href="/contact">{content.cta}</Link>
              </Button>
              <div className="flex items-center gap-2">
                <CarouselPrevious className="static translate-y-0 border-paper/30 bg-transparent text-paper hover:bg-paper/10" />
                <CarouselNext className="static translate-y-0 border-paper/30 bg-transparent text-paper hover:bg-paper/10" />
              </div>
            </div>
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
