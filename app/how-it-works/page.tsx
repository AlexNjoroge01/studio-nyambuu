import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { PageTop } from "@/components/layout/page-top";
import { PageHero } from "@/components/sections/page-hero";
import { SiteImage } from "@/components/media/site-image";
import { CtaBand } from "@/components/sections/cta-band";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { howItWorksContent } from "@/content/how-it-works";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "How Personal Styling Works in Nairobi",
  description:
    "From brief to reveal: how a personal styling session works in Nairobi — wardrobe edit, personal shopping, occasion styling or a short-notice Express Look.",
  path: "/how-it-works",
  keywords: [
    "how personal styling works",
    "personal stylist process Nairobi",
    "wardrobe edit process",
    "book a stylist Kenya",
  ],
});

export default function HowItWorksPage() {
  return (
    <>
      <PageTop
        crumbs={[
          { name: "Home", href: "/" },
          { name: "How it works", href: "/how-it-works" },
        ]}
      />
      <PageHero
        eyebrow={howItWorksContent.eyebrow}
        title={howItWorksContent.title}
        intro={howItWorksContent.intro}
      />

      <div className="container-page pb-16 md:pb-24">
        {howItWorksContent.steps.map((step, index) => {
          const reverse = index % 2 === 1;
          return (
            <section
              key={step.number}
              className="grid gap-8 border-t border-border py-12 md:grid-cols-12 md:items-center md:gap-12 md:py-20"
            >
              <Reveal
                className={cn(
                  "md:col-span-6",
                  reverse ? "md:order-2 md:col-start-7" : "md:col-start-1"
                )}
              >
                <div className="relative">
                  <SiteImage
                    name={step.image}
                    aspect="4/3"
                    sizes="(min-width: 1024px) 48vw, 100vw"
                  />
                  <Badge className="label absolute top-3 left-3 bg-paper/90 font-normal text-ink">
                    {step.effort}
                  </Badge>
                </div>
              </Reveal>

              <Reveal
                delay={0.1}
                className={cn(
                  "md:col-span-5",
                  reverse ? "md:col-start-1 md:row-start-1" : "md:col-start-8"
                )}
              >
                <span className="outline-number text-6xl leading-none">
                  {step.number}
                </span>
                <h2 className="mt-4 flex items-center gap-3 font-heading text-[clamp(2.4rem,4.6vw,4rem)] leading-none font-light text-ink">
                  {step.title}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label={`What is ${step.tooltip}?`}
                        className="flex size-8 items-center justify-center rounded-full border border-border text-cocoa transition-colors hover:border-ink hover:text-ink"
                      >
                        <Info className="size-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <span className="font-medium">{step.tooltip}: </span>
                      {step.tooltipText}
                    </TooltipContent>
                  </Tooltip>
                </h2>
                <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-cocoa">
                  {step.description}
                </p>
              </Reveal>
            </section>
          );
        })}
      </div>

      <section className="bg-cream">
        <div className="container-page section-y">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal>
                <p className="label mb-5 text-cocoa">Before you start</p>
                <h2 className="max-w-[16ch] font-heading text-[clamp(2.4rem,4.8vw,4.2rem)] leading-[0.98] font-light tracking-[-0.02em] text-ink">
                  A few useful answers.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-5">
              <Reveal delay={0.1}>
                <p className="text-base leading-relaxed text-cocoa">
                  The process is designed to be calm. If a question is not here,
                  message the studio — we will answer honestly.
                </p>
                <Button asChild variant="outline-thin" size="lg" className="mt-6">
                  <Link href="/faq">
                    Read the full FAQ <ArrowUpRight />
                  </Link>
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Begin"
        title={howItWorksContent.cta.title}
        body={howItWorksContent.cta.body}
      />
    </>
  );
}
