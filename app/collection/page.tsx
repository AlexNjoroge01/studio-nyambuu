import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PageTop } from "@/components/layout/page-top";
import { PageHero } from "@/components/sections/page-hero";
import { CollectionGallery } from "@/components/media/collection-gallery";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "The Collection — Curated Fashion in Nairobi",
  description:
    "A curated lookbook of women's clothing, shoes and accessories in Nairobi. Enquire about a piece — no cart, no checkout, just considered style.",
  path: "/collection",
  keywords: [
    "women's fashion boutique Nairobi",
    "ladies clothing Nairobi",
    "women's accessories Nairobi",
    "curated fashion Kenya",
  ],
});

export default function CollectionPage() {
  return (
    <>
      <PageTop
        crumbs={[
          { name: "Home", href: "/" },
          { name: "The Collection", href: "/collection" },
        ]}
      />
      <PageHero
        eyebrow="The Collection"
        title={{ lead: "The original", emphasis: "edit." }}
        intro="Carefully selected, chic and timeless pieces — clothing, shoes and accessories chosen to help you express your individuality. This is a lookbook, not a shop: browse the edit, then enquire about what speaks to you."
      />

      <div className="container-page pb-16 md:pb-24">
        <CollectionGallery />
      </div>

      <section className="container-page pb-24 md:pb-40">
        <div className="flex flex-col items-start justify-between gap-6 border-t border-border pt-10 md:flex-row md:items-end">
          <div>
            <p className="label mb-3 text-cocoa">Can&apos;t see it?</p>
            <h2 className="max-w-[18ch] font-heading text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[0.98] font-light tracking-[-0.02em] text-ink">
              We&apos;ll source it for you.
            </h2>
            <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-cocoa">
              The Collection is a small edit of what is available now. If you are
              looking for something specific, The Personal Shop exists for exactly that.
            </p>
          </div>
          <Button asChild variant="ink" size="lg">
            <Link href="/services/personal-shop">
              Explore The Personal Shop <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
