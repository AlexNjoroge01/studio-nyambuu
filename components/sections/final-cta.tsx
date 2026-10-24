import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { Button } from "@/components/ui/button";
import { homeContent } from "@/content/home";
import { whatsappUrl } from "@/lib/site";

/** Enormous closing headline with WhatsApp + booking CTAs (§7.1). */
export function FinalCta() {
  const content = homeContent.finalCta;

  return (
    <section className="container-page pt-8 pb-24 md:pt-16 md:pb-40">
      <div className="border-t border-border pt-12 md:pt-20">
        <Reveal>
          <p className="label mb-7 text-cocoa">{content.eyebrow}</p>
        </Reveal>

        <h2 className="max-w-[14ch] font-heading text-[clamp(3.4rem,9.5vw,9rem)] leading-[0.88] font-light tracking-[-0.04em] text-ink">
          <SplitHeading
            lines={[
              <>
                {content.title.lead}{" "}
                <em className="text-cobalt italic">{content.title.emphasis}</em>
              </>,
              content.title.tail,
            ]}
          />
        </h2>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.15}>
            <p className="max-w-[48ch] text-base leading-relaxed text-cocoa md:text-lg">
              {content.body}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="ink" size="lg">
                <Link href="/contact">Book a styling session</Link>
              </Button>
              <Button asChild variant="outline-thin" size="lg">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
