import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { cn } from "@/lib/utils";

/** Shared inner-page masthead. Breadcrumbs render above it in the page. */
export function PageHero({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow: string;
  title: { lead: string; emphasis?: string; tail?: string };
  intro: string;
  className?: string;
}) {
  return (
    <section className={cn("container-page pt-10 pb-16 md:pt-16 md:pb-24", className)}>
      <Reveal>
        <p className="label mb-7 text-cocoa">{eyebrow}</p>
      </Reveal>
      <h1 className="max-w-[15ch] font-heading text-[clamp(3.2rem,8vw,7rem)] leading-[0.92] font-light tracking-[-0.03em] text-ink">
        <SplitHeading
          lines={[
            <>
              {title.lead}{" "}
              {title.emphasis && (
                <em className="text-cobalt italic">{title.emphasis}</em>
              )}
            </>,
            ...(title.tail ? [title.tail] : []),
          ]}
        />
      </h1>
      <Reveal delay={0.2}>
        <p className="mt-8 max-w-[58ch] text-base leading-relaxed text-cocoa md:text-lg">
          {intro}
        </p>
      </Reveal>
    </section>
  );
}
