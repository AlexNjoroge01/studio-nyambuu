import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/content/faq";

/** Reusable FAQ accordion. Schema is emitted by the page that owns the content. */
export function FaqBlock({
  items,
  title,
  eyebrow,
  showAllLink = false,
}: {
  items: FaqItem[];
  title: string;
  eyebrow?: string;
  showAllLink?: boolean;
}) {
  return (
    <section className="container-page section-y">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            {eyebrow && <p className="label mb-5 text-cocoa">{eyebrow}</p>}
            <h2 className="max-w-[12ch] font-heading text-[clamp(2.4rem,4.6vw,4rem)] leading-[0.98] font-light tracking-[-0.02em] text-ink">
              {title}
            </h2>
            {showAllLink && (
              <Link
                href="/faq"
                className="mt-6 inline-block text-sm text-cobalt underline decoration-cobalt/40 underline-offset-4 transition-colors hover:text-ink"
              >
                Read every question
              </Link>
            )}
          </Reveal>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="py-6 text-left font-heading text-xl leading-snug font-light text-ink hover:no-underline md:text-2xl">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-[62ch] text-base leading-relaxed text-cocoa">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
