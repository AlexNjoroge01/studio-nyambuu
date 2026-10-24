import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Shared closing CTA band used at the foot of inner pages. */
export function CtaBand({
  eyebrow = "Next step",
  title,
  body,
  className,
}: {
  eyebrow?: string;
  title: { lead: string; emphasis?: string; tail?: string };
  body: string;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto max-w-[1440px] px-[clamp(20px,6vw,96px)] py-24 md:py-40", className)}>
      <div className="grid gap-10 border-t border-border pt-12 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Reveal>
            <p className="label mb-6 text-cocoa">{eyebrow}</p>
          </Reveal>
          <SplitHeading
            className="font-heading text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95] font-light tracking-[-0.02em] text-ink"
            lines={[
              <>
                {title.lead}{" "}
                {title.emphasis && (
                  <em className="text-cobalt italic">{title.emphasis}</em>
                )}
                {title.tail ? ` ${title.tail}` : ""}
              </>,
            ]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-cocoa md:text-lg">
              {body}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Button asChild variant="ink" size="lg">
              <Link href="/contact">Book a consultation</Link>
            </Button>
            <Button asChild variant="outline-thin" size="lg">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
