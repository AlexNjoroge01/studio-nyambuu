import Link from "next/link";
import { ArrowDownRight, Sparkle } from "lucide-react";

import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { SiteImage } from "@/components/media/site-image";
import { Sticker } from "@/components/layout/sticker";
import { Button } from "@/components/ui/button";
import { homeContent } from "@/content/home";

/** Home hero (§7.1): huge thin headline, landscape photo, arch overlap, sticker. */
export function Hero() {
  const hero = homeContent.hero;

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute top-[18%] left-[42%] hidden text-sun md:block">
        <Sparkle className="size-8 animate-pulse" aria-hidden />
      </div>
      <div className="pointer-events-none absolute bottom-[16%] left-[6%] hidden text-tangerine lg:block">
        <Sparkle className="size-5" aria-hidden />
      </div>

      <div className="container-page grid min-h-[calc(100svh-72px)] items-center gap-14 py-12 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="relative z-10 lg:col-span-6 xl:col-span-5">
          <Reveal>
            <p className="label mb-7 text-cocoa">{hero.eyebrow}</p>
          </Reveal>

          <h1 className="font-heading text-[clamp(3.9rem,10vw,8.8rem)] leading-[0.9] font-light tracking-[-0.035em] text-ink">
            <SplitHeading
              delay={0.05}
              lines={[
                hero.title.lead,
                <em key="emphasis" className="text-cobalt italic">
                  {hero.title.emphasis}
                </em>,
              ]}
            />
          </h1>

          <Reveal delay={0.25}>
            <p className="mt-8 max-w-[45ch] text-base leading-relaxed text-cocoa md:text-lg">
              {hero.sub}
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="ink" size="lg">
                <Link href="/contact">
                  {hero.primaryCta}
                  <ArrowDownRight className="transition-transform group-hover/button:rotate-45" />
                </Link>
              </Button>
              <Button asChild variant="outline-thin" size="lg">
                <Link href="/collection">{hero.secondaryCta}</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <p className="label mt-12 hidden items-center gap-3 text-cocoa/80 lg:flex">
              <span className="h-px w-10 bg-border" />
              Dress well, made simpler
            </p>
          </Reveal>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7">
          <ImageReveal>
            <SiteImage
              name={hero.image}
              aspect="4/3"
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
            />
          </ImageReveal>

          <div className="absolute -bottom-12 -left-4 hidden w-36 sm:block md:w-44 lg:-left-10 lg:w-52">
            <div className="arch-frame overflow-hidden border-[6px] border-paper shadow-xl">
              <SiteImage
                name={hero.overlapImage}
                aspect="3/4"
                sizes="(min-width: 1024px) 14vw, 25vw"
              />
            </div>
          </div>

          <Sticker
            label={hero.stickerLabel}
            className="absolute -top-6 -right-3 md:-top-8 md:-right-6"
          />

          <Reveal delay={0.5} className="absolute -bottom-6 right-0 hidden lg:block">
            <p className="label max-w-[20ch] text-right leading-relaxed text-cocoa/80">
              Curated pieces · Personal styling · Nairobi
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
