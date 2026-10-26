import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { PageTop } from "@/components/layout/page-top";
import { OwnerPhoto } from "@/components/media/owner-photo";
import { SiteImage } from "@/components/media/site-image";
import { CtaBand } from "@/components/sections/cta-band";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { aboutContent } from "@/content/about";
import { personSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Nyambura — Nairobi Personal Stylist",
  description:
    "Meet Nyambura Mbugua, a Nairobi personal stylist and fashion boutique founder helping women build wardrobes that reflect who they are. Established October 2025.",
  path: "/about",
  keywords: [
    "image consultant Kenya",
    "fashion consultant Nairobi",
    "Nyambura Mbugua",
    "personal stylist Nairobi",
  ],
});

export default function AboutPage() {
  return (
    <>
      <PageTop
        crumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      <section className="container-page pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="label mb-6 text-cocoa">{aboutContent.eyebrow}</p>
            </Reveal>
            <h1 className="max-w-[14ch] font-heading text-[clamp(3.2rem,8vw,7rem)] leading-[0.92] font-light tracking-[-0.03em] text-ink">
              {aboutContent.title.lead}{" "}
              <em className="text-cobalt italic">{aboutContent.title.emphasis}</em>
            </h1>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-[56ch] text-base leading-relaxed text-cocoa md:text-lg">
                {aboutContent.intro}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <OwnerPhoto className="aspect-[3/4]" />
            <p className="label mt-3 text-cocoa/80">Nyambura Mbugua · Nairobi</p>
          </Reveal>
        </div>
      </section>

      <section className="container-page pb-16 md:pb-24">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="sticky top-28">
              <Reveal>
                <SiteImage
                  name={aboutContent.heroImage}
                  aspect="4/5"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </Reveal>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Reveal delay={0.1}>
                  <SiteImage
                    name={aboutContent.portraitImage}
                    aspect="1/1"
                    sizes="20vw"
                  />
                </Reveal>
                <Reveal delay={0.15}>
                  <SiteImage
                    name="earrings-collection-black-velvet"
                    aspect="1/1"
                    sizes="20vw"
                  />
                </Reveal>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="label mb-5 text-cocoa">Her story</p>
            </Reveal>
            {aboutContent.story.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 0.05}>
                <p className="mb-5 text-base leading-relaxed text-cocoa md:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-2">
                {aboutContent.values.map((value) => (
                  <Badge
                    key={value}
                    variant="outline"
                    className="label h-8 border-border px-3 font-normal text-cocoa"
                  >
                    {value}
                  </Badge>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 border-t border-border pt-6">
                <p className="label mb-3 text-cocoa">Established</p>
                <p className="font-heading text-3xl font-light text-ink">
                  25 October 2025
                </p>
                <p className="mt-3 text-sm text-cocoa">
                  Based in Nairobi. Serving women across Kenya.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-page section-y">
          <Reveal>
            <p className="label mb-5 text-cocoa">{aboutContent.philosophy.eyebrow}</p>
            <h2 className="max-w-[16ch] font-heading text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96] font-light tracking-[-0.02em] text-ink">
              {aboutContent.philosophy.title.lead}{" "}
              <em className="text-cocoa italic">{aboutContent.philosophy.title.emphasis}</em>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {aboutContent.philosophy.items.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.08}>
                <div className="border-t border-border pt-5">
                  <span className="outline-number text-5xl leading-none">
                    {item.number}
                  </span>
                  <h3 className="mt-4 font-heading text-2xl leading-tight font-light text-ink md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cocoa">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section-y">
        <Reveal>
          <blockquote className="mx-auto max-w-[26ch] text-center font-heading text-[clamp(2.4rem,5.5vw,5rem)] leading-[1.02] font-light tracking-[-0.02em] text-ink">
            “{aboutContent.quote}”
          </blockquote>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-center">
            <Link
              href="/journal"
              className="label text-cocoa underline decoration-border underline-offset-4 transition-colors hover:text-cobalt"
            >
              Read the journal <ArrowUpRight className="inline size-3" />
            </Link>
          </p>
        </Reveal>
      </section>

      <CtaBand
        eyebrow="Work with Nyambura"
        title={aboutContent.cta.title}
        body={aboutContent.cta.body}
      />

      <JsonLd data={personSchema()} />
    </>
  );
}
