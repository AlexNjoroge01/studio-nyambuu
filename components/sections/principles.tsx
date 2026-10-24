import { Briefcase, Ruler, Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { homeContent } from "@/content/home";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const icons = [Ruler, Briefcase, Sparkles];

/** Three short principles with Lucide icons in tiny circles (§7.1). */
export function Principles() {
  const content = homeContent.principles;

  return (
    <section className="container-page section-y">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Reveal>
            <p className="label mb-6 text-cocoa">{content.eyebrow}</p>
          </Reveal>
          <h2 className="font-heading text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.96] font-light tracking-[-0.02em] text-ink">
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
      </div>

      <div className="mt-14 grid gap-10 border-t border-border pt-10 md:mt-20 md:grid-cols-3 md:gap-8">
        {content.items.map((item, index) => {
          const Icon = icons[index];
          return (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="flex flex-col gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex size-10 items-center justify-center rounded-full border border-border text-ink">
                      <Icon className="size-4" aria-hidden />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>{item.title}</TooltipContent>
                </Tooltip>
                <h3 className="font-heading text-3xl leading-none font-light text-ink">
                  {item.title}
                </h3>
                <p className="max-w-[34ch] text-sm leading-relaxed text-cocoa">
                  {item.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
