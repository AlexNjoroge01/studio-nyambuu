import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { PageTop } from "@/components/layout/page-top";
import { PageHero } from "@/components/sections/page-hero";
import { SiteImage } from "@/components/media/site-image";
import { Badge } from "@/components/ui/badge";
import { publishedPosts } from "@/content/journal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Journal — Style Guides for Nairobi Women",
  description:
    "Practical style guides for Kenyan occasions: wedding guest dressing, wardrobe edits, capsule wardrobes and dressing for your body type.",
  path: "/journal",
  keywords: [
    "what to wear to a Kenyan wedding",
    "capsule wardrobe Nairobi",
    "how to edit your wardrobe",
    "Kenyan fashion blog",
  ],
});

export default function JournalPage() {
  const [feature, ...rest] = publishedPosts;

  return (
    <>
      <PageTop
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Journal", href: "/journal" },
        ]}
      />
      <PageHero
        eyebrow="The journal"
        title={{ lead: "Style notes for real", emphasis: "wardrobes." }}
        intro="Practical guides for the occasions Kenyan women actually dress for — written to be useful before the event, not after it. No trends for the sake of it."
      />

      <div className="container-page pb-24 md:pb-40">
        {feature && (
          <Reveal>
            <Link href={`/journal/${feature.slug}`} className="group grid gap-8 border-t border-border pt-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <SiteImage
                  name={feature.cover}
                  aspect="3/2"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  priority
                  className="transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="label font-normal text-cocoa">
                    {feature.category}
                  </Badge>
                  <span className="label text-cocoa/80">{feature.readTime}</span>
                </div>
                <h2 className="mt-4 max-w-[16ch] font-heading text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[0.98] font-light tracking-[-0.02em] text-ink group-hover:text-cobalt">
                  {feature.title}
                </h2>
                <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-cocoa">
                  {feature.description}
                </p>
                <span className="label mt-6 inline-flex items-center gap-2 text-ink">
                  Read the guide <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        <div className="mt-16 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.06}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <SiteImage
                  name={post.cover}
                  aspect="4/3"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="label font-normal text-cocoa">
                    {post.category}
                  </Badge>
                  <span className="label text-cocoa/80">{post.readTime}</span>
                </div>
                <h2 className="mt-3 font-heading text-2xl leading-tight font-light text-ink group-hover:text-cobalt md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-cocoa">
                  {post.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
            <p className="max-w-[50ch] text-sm leading-relaxed text-cocoa">
              More guides are being written — on kitchen parties, body type and
              building a work capsule. In the meantime, the studio is one message away.
            </p>
            <Link
              href="/contact"
              className="label shrink-0 border-b border-ink pb-1 text-ink transition-colors hover:text-cobalt"
            >
              Ask a styling question
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
