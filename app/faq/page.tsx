import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { PageTop } from "@/components/layout/page-top";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { allFaqs, faqGroups } from "@/content/faq";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQ — Personal Styling & Shopping in Nairobi",
  description:
    "Answers about styling services, booking, budgets, shopping, delivery and dressing for Kenyan occasions with a Nairobi personal stylist.",
  path: "/faq",
  keywords: [
    "personal stylist FAQ Nairobi",
    "how much does a personal stylist cost Kenya",
    "personal shopping questions",
    "book a stylist Nairobi",
  ],
});

export default function FaqPage() {
  return (
    <>
      <PageTop
        crumbs={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
      />
      <PageHero
        eyebrow="FAQ"
        title={{ lead: "Everything you might be", emphasis: "wondering." }}
        intro="Services, booking, budgets, delivery and the Kenyan occasions that need a little more thought. If your question is not here, WhatsApp the studio — we answer personally."
      />

      <div className="container-page pb-16 md:pb-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-3">
            <div className="sticky top-28 hidden lg:block">
              <p className="label mb-4 text-cocoa">On this page</p>
              <ul className="space-y-2.5">
                {faqGroups.map((group) => (
                  <li key={group.title}>
                    <a
                      href={`#${group.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      className="text-sm text-cocoa underline-offset-4 transition-colors hover:text-cobalt hover:underline"
                    >
                      {group.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            {faqGroups.map((group) => (
              <section
                key={group.title}
                id={group.title.toLowerCase().replace(/[^a-z]+/g, "-")}
                className="scroll-mt-28 border-t border-border py-10 first:border-t-0 first:pt-0"
              >
                <Reveal>
                  <p className="label mb-5 text-cocoa">{group.title}</p>
                  <h2 className="font-heading text-3xl leading-none font-light text-ink md:text-4xl">
                    {group.title}
                  </h2>
                </Reveal>
                <Accordion type="single" collapsible className="mt-6">
                  {group.items.map((item) => (
                    <AccordionItem key={item.question} value={item.question}>
                      <AccordionTrigger className="py-5 text-left text-lg leading-snug font-light text-ink hover:no-underline md:text-xl">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="max-w-[62ch] text-base leading-relaxed text-cocoa">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>
        </div>
      </div>

      <CtaBand
        eyebrow="Still wondering?"
        title={{ lead: "Ask us", emphasis: "directly." }}
        body="One message is usually faster than a page of answers. Tell us what you need and we will reply personally."
      />

      <JsonLd data={faqSchema(allFaqs)} />
    </>
  );
}
