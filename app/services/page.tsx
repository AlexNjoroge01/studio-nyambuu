import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { PageTop } from "@/components/layout/page-top";
import { PageHero } from "@/components/sections/page-hero";
import { SiteImage } from "@/components/media/site-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Styling Services in Nairobi",
  description:
    "Wardrobe editing, personal shopping, occasion styling and short-notice outfit sourcing for women in Nairobi and across Kenya. Compare the four services.",
  path: "/services",
  keywords: [
    "personal stylist Nairobi",
    "personal shopping service Kenya",
    "wardrobe consultant Nairobi",
    "event stylist Nairobi",
    "styling services Nairobi",
  ],
});

const comparison = [
  {
    service: "The Wardrobe Edit",
    bestFor: "A wardrobe that is full but not working",
    turnaround: "By appointment",
    how: "Assess · edit · restyle · plan",
  },
  {
    service: "The Personal Shop",
    bestFor: "Intentional pieces that complete what you own",
    turnaround: "By appointment",
    how: "Brief · plan · source · choose",
  },
  {
    service: "Occasion Styling",
    bestFor: "Weddings, events, meetings and celebrations",
    turnaround: "Planned around your date",
    how: "Occasion · look · source · fit",
  },
  {
    service: "The Express Look",
    bestFor: "A complete outfit at short notice",
    turnaround: "Short notice — confirm first",
    how: "Brief · source · coordinate · wear",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageTop
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />
      <PageHero
        eyebrow="Services"
        title={{ lead: "Four ways to dress with", emphasis: "intention." }}
        intro="Start with the wardrobe you already own, or start from a blank page. Each service is built around your body, your life and the occasion — and every one ends with a look you can actually wear."
      />

      <div className="container-page">
        {services.map((service, index) => {
          const reverse = index % 2 === 1;
          return (
            <section
              key={service.slug}
              className={cn(
                "grid gap-8 border-t border-border py-12 md:grid-cols-12 md:items-center md:gap-12 md:py-20",
                reverse && "md:[&>*:first-child]:col-start-7"
              )}
            >
              <Reveal className={cn("md:col-span-6", reverse && "md:order-2 md:col-start-7")}>
                <Link href={`/services/${service.slug}`} className="group block">
                  <SiteImage
                    name={service.heroImage}
                    aspect="4/3"
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </Link>
              </Reveal>

              <Reveal
                delay={0.1}
                className={cn("md:col-span-5", reverse ? "md:col-start-1 md:row-start-1" : "md:col-start-8")}
              >
                <div className="flex items-center gap-3">
                  <span className="outline-number text-4xl leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Badge variant="secondary" className="label font-normal text-cocoa">
                    {service.badge}
                  </Badge>
                </div>
                <h2 className="mt-4 font-heading text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[0.98] font-light tracking-[-0.02em] text-ink">
                  {service.name}
                </h2>
                <p className="mt-2 font-heading text-xl leading-snug font-light text-cocoa italic">
                  {service.tagline}
                </p>
                <p className="mt-5 max-w-[46ch] text-sm leading-relaxed text-cocoa">
                  {service.intro}
                </p>

                <ul className="mt-6 space-y-2 border-t border-border pt-5">
                  {service.included.slice(0, 3).map((item) => (
                    <li key={item.title} className="flex gap-2 text-sm text-ink">
                      <span aria-hidden className="text-cocoa">—</span>
                      {item.title}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-sm text-cocoa">
                  <span className="label mr-2 text-cocoa/80">For you if</span>
                  {service.personas[0]}
                </p>

                <Button asChild variant="outline-thin" size="lg" className="mt-7">
                  <Link href={`/services/${service.slug}`}>
                    Explore {service.shortName}
                  </Link>
                </Button>
              </Reveal>
            </section>
          );
        })}
      </div>

      <section className="container-page py-16 md:py-24">
        <Reveal>
          <p className="label mb-5 text-cocoa">At a glance</p>
          <h2 className="max-w-[18ch] font-heading text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.98] font-light tracking-[-0.02em] text-ink">
            Compare the four services.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Best for</TableHead>
                <TableHead>Turnaround</TableHead>
                <TableHead>How it works</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparison.map((row) => (
                <TableRow key={row.service}>
                  <TableCell className="font-heading text-lg font-light text-ink">
                    {row.service}
                  </TableCell>
                  <TableCell className="min-w-[220px] text-cocoa">{row.bestFor}</TableCell>
                  <TableCell className="min-w-[160px] text-cocoa">{row.turnaround}</TableCell>
                  <TableCell className="min-w-[200px] text-cocoa">{row.how}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Reveal>
        <p className="mt-4 text-xs text-cocoa">
          No prices are published — every brief is different. Enquire for a quote.
        </p>
      </section>

      <section className="container-page pb-24 md:pb-40">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-border pt-12 md:flex-row md:items-end">
          <div>
            <p className="label mb-4 text-cocoa">Not sure where to start?</p>
            <h2 className="max-w-[16ch] font-heading text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96] font-light tracking-[-0.02em] text-ink">
              Tell us what is not working.
            </h2>
            <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-cocoa">
              We will point you to the right service and explain what happens next.
              No pressure, no obligation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="ink" size="lg">
              <Link href="/contact">Book a consultation</Link>
            </Button>
            <Button asChild variant="outline-thin" size="lg">
              <Link href="/how-it-works">See how it works</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
