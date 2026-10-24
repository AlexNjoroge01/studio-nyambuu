import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SiteImage } from "@/components/media/site-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ImageKey } from "@/lib/image-manifest";

/** Full-bleed image band with a colour block and one CTA (§7.1). */
export function ColorBreak({
  image,
  quote,
  attribution,
  cta,
  eyebrow = "A thought",
}: {
  image: ImageKey;
  quote: string;
  attribution?: string;
  cta: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative isolate min-h-[70svh] overflow-hidden">
      <SiteImage
        name={image}
        fill
        sizes="100vw"
        className="absolute inset-0 h-full w-full"
        imgClassName="object-cover"
      />
      <div className="absolute inset-0 bg-ink/35" aria-hidden />
      <div className="container-page relative flex min-h-[70svh] items-center py-20">
        <Reveal>
          <div className="max-w-xl bg-sun p-7 text-ink md:p-10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="label text-ink/70">{eyebrow}</p>
              <Badge className="label bg-ink font-normal text-paper">The studio</Badge>
            </div>
            <blockquote className="font-heading text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.02] font-light tracking-[-0.02em]">
              “{quote}”
            </blockquote>
            {attribution && (
              <p className="label mt-6 text-ink/70">— {attribution}</p>
            )}
            <Button asChild variant="ink" size="lg" className="mt-8">
              <Link href="/contact">{cta}</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
