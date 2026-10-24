import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { SiteImage } from "@/components/media/site-image";
import { Badge } from "@/components/ui/badge";
import { services } from "@/content/services";
import { homeContent } from "@/content/home";
import { accentStyles } from "@/lib/accents";
import { cn } from "@/lib/utils";

/** Four service cards with tall images, outlined numbers and accent hover (§7.1). */
export function ServiceCards() {
  const content = homeContent.services;

  return (
    <section className="container-page section-y">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <Reveal>
            <p className="label mb-6 text-cocoa">{content.eyebrow}</p>
          </Reveal>
          <h2 className="font-heading text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.94] font-light tracking-[-0.025em] text-ink">
            <SplitHeading
              lines={[
                content.title.lead,
                <em key="emphasis" className="text-cobalt italic">
                  {content.title.emphasis}
                </em>,
              ]}
            />
          </h2>
        </div>
        <Reveal delay={0.15} className="flex items-end md:col-span-5">
          <p className="max-w-[42ch] text-base leading-relaxed text-cocoa">
            {content.description}
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-14 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => {
          const accent = accentStyles[service.accent];
          return (
            <StaggerItem key={service.slug}>
              <Link href={`/services/${service.slug}`} className="group block">
                <div className="relative overflow-hidden bg-cream">
                  <SiteImage
                    name={service.heroImage}
                    aspect="3/4"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      accent.groupHover
                    )}
                  />
                  <span className="outline-number absolute top-4 left-4 text-5xl leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Badge className="label absolute top-4 right-4 bg-paper/90 font-normal text-ink backdrop-blur-sm">
                    {service.badge}
                  </Badge>
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-2xl leading-tight font-light text-ink md:text-[1.7rem]">
                      {service.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-snug text-cocoa">
                      {service.tagline}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors",
                      accent.border,
                      accent.text
                    )}
                  >
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </div>
                <span
                  aria-hidden
                  className={cn(
                    "mt-4 block h-px w-10 transition-all duration-500 group-hover:w-20",
                    accent.bg
                  )}
                />
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
