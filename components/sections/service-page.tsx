import Link from "next/link";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";

import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { SiteImage } from "@/components/media/site-image";
import { PageTop } from "@/components/layout/page-top";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqBlock } from "@/components/sections/faq-block";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getService, services, type Service } from "@/content/services";
import { accentStyles } from "@/lib/accents";
import { faqSchema, imageObjectSchema, serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ServicePage({ service }: { service: Service }) {
  const accent = accentStyles[service.accent];
  const related = services.filter((item) => item.slug !== service.slug);
  const faqs = service.faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <>
      <PageTop
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.shortName, href: `/services/${service.slug}` },
        ]}
      />

      <section className="relative isolate mt-6 min-h-[68svh] overflow-hidden">
        <SiteImage
          name={service.heroImage}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/5" aria-hidden />
        <span className={cn("absolute top-1/3 left-0 h-28 w-1.5 md:h-40 md:w-2", accent.bg)} aria-hidden />

        <div className="container-page relative flex min-h-[68svh] flex-col justify-end py-14 md:py-20">
          <div className="max-w-4xl">
            <Reveal>
              <Badge className={cn("label mb-5 border-0 font-normal", accent.bg, service.accent === "sun" ? "text-ink" : "text-paper")}>
                {service.badge}
              </Badge>
            </Reveal>
            <h1 className="font-heading text-[clamp(3.2rem,9vw,8rem)] leading-[0.88] font-light tracking-[-0.04em] text-paper">
              <SplitHeading
                lines={[
                  service.name,
                  <em key="tagline" className="text-[0.42em] leading-tight tracking-[-0.01em] text-paper/80 italic">
                    {service.tagline}
                  </em>,
                ]}
              />
            </h1>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-paper/80 md:text-lg">
                {service.intro}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="sun" size="lg">
                  <Link href="/contact">Enquire about this service</Link>
                </Button>
                <Button asChild variant="outline-thin" size="lg" className="border-paper/40 text-paper hover:border-paper">
                  <a href={whatsappUrl(`Hi Nyambura, I'd like to ask about ${service.name}.`)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle /> WhatsApp
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-page section-y">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Reveal>
              <p className="label mb-5 text-cocoa">What it is</p>
              <h2 className="max-w-[13ch] font-heading text-[clamp(2.4rem,4.6vw,4rem)] leading-[0.98] font-light tracking-[-0.02em] text-ink">
                Not another shopping list.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {service.whatItIs.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.08}>
                <p className="mb-5 max-w-[62ch] text-base leading-relaxed text-cocoa md:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-page section-y">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="label mb-5 text-cocoa">What&apos;s included</p>
                <h2 className="max-w-[12ch] font-heading text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[0.98] font-light tracking-[-0.02em] text-ink">
                  Everything in the room.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <Accordion type="single" collapsible defaultValue={service.included[0].title}>
                {service.included.map((item, index) => (
                  <AccordionItem key={item.title} value={item.title}>
                    <AccordionTrigger className="py-5 text-left hover:no-underline">
                      <span className="flex items-baseline gap-3">
                        <span className={cn("label", accent.text)}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-heading text-xl leading-snug font-light text-ink md:text-2xl">
                          {item.title}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="max-w-[58ch] pl-10 text-base leading-relaxed text-cocoa">
                      {item.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page section-y">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="label mb-5 text-cocoa">Who it&apos;s for</p>
              <h2 className="max-w-[12ch] font-heading text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[0.98] font-light tracking-[-0.02em] text-ink">
                This sounds like you if…
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <div className="flex flex-col gap-3">
              {service.personas.map((persona, index) => (
                <Reveal key={persona} delay={index * 0.06}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        tabIndex={0}
                        className="flex items-start gap-3 rounded-2xl border border-border p-4 text-base leading-relaxed text-ink transition-colors hover:border-ink/40"
                      >
                        <Check className={cn("mt-1 size-4 shrink-0", accent.text)} aria-hidden />
                        {persona}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>Tell us when you enquire — we will build around it.</TooltipContent>
                  </Tooltip>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <p className="mt-4 text-sm text-cocoa">
                Not quite? <Link href="/contact" className="text-cobalt underline decoration-cobalt/40 underline-offset-4">Ask us</Link> and we will point you to the right service.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="container-page section-y">
          <Reveal>
            <p className="label mb-5 text-sun">The process</p>
            <h2 className="max-w-[16ch] font-heading text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96] font-light tracking-[-0.02em]">
              How it works.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
            {service.steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08}>
                <div className="border-t border-paper/20 pt-5">
                  <span className="label text-sun">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-heading text-2xl leading-tight font-light">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper/60">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mt-10 text-sm text-paper/50">
              No prices are published — every brief is different. Enquire for a quote.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page section-y">
        <div className="grid grid-cols-3 items-start gap-3 md:gap-5">
          {service.strip.map((image, index) => (
            <Reveal key={image} delay={index * 0.08}>
              <div className={cn(index === 1 ? "mt-8 md:mt-16" : "", index === 2 ? "mt-4 md:mt-8" : "")}>
                <Parallax className="aspect-[3/4]" strength={6}>
                  <SiteImage
                    name={image}
                    fill
                    sizes="(min-width: 768px) 32vw, 33vw"
                    className="h-full w-full"
                  />
                </Parallax>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page pb-16 md:pb-24">
        <div className="mb-8 flex items-end justify-between gap-4 border-t border-border pt-8">
          <div>
            <p className="label mb-3 text-cocoa">Keep exploring</p>
            <h2 className="font-heading text-[clamp(2rem,4vw,3.2rem)] leading-none font-light text-ink">
              Related services
            </h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/services">All services <ArrowUpRight /></Link>
          </Button>
        </div>

        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-3 md:-ml-4">
            {related.map((item) => (
              <CarouselItem key={item.slug} className="basis-[85%] pl-3 sm:basis-[48%] md:pl-4 lg:basis-[32%]">
                <Link href={`/services/${item.slug}`} className="group block">
                  <div className="relative overflow-hidden">
                    <SiteImage
                      name={item.heroImage}
                      aspect="4/3"
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 85vw"
                      className="transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <Badge className="label absolute top-3 left-3 bg-paper/90 font-normal text-ink">
                      {item.badge}
                    </Badge>
                  </div>
                  <h3 className="mt-3 font-heading text-2xl font-light text-ink">{item.name}</h3>
                  <p className="mt-1 text-sm text-cocoa">{item.tagline}</p>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-end gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </section>

      <FaqBlock
        items={faqs}
        eyebrow="Good to know"
        title="Questions, answered."
        showAllLink
      />

      <CtaBand
        eyebrow={service.name}
        title={{ lead: "Ready when", emphasis: "you are." }}
        body="Send a short brief and we will confirm fit, availability and the next step. No obligation."
      />

      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={imageObjectSchema({
          url: `/images/${service.heroImage}`,
          caption: service.tagline,
          width: 1600,
          height: 1200,
        })}
      />
    </>
  );
}

export function getServiceOrNotFound(slug: string) {
  return getService(slug);
}
