"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { howItWorksContent } from "@/content/how-it-works";
import { homeContent } from "@/content/home";

/** Four steps joined by a thin line that draws on scroll (§7.1). */
export function Steps() {
  const reduced = useReducedMotion();

  return (
    <section className="container-page section-y">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Reveal>
            <p className="label mb-6 text-cocoa">{homeContent.steps.eyebrow}</p>
          </Reveal>
          <h2 className="font-heading text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.94] font-light tracking-[-0.025em] text-ink">
            <SplitHeading
              lines={[
                homeContent.steps.title.lead,
                <em key="emphasis" className="text-cobalt italic">
                  {homeContent.steps.title.emphasis}
                </em>,
              ]}
            />
          </h2>
        </div>
      </div>

      <div className="relative mt-16 md:mt-24">
        <motion.div
          className="absolute top-5 right-0 left-0 hidden h-px bg-border md:block"
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, margin: "-15%" }}
        >
          <motion.div
            className="h-full origin-left bg-ink"
            variants={{
              hidden: { scaleX: 0 },
              visible: {
                scaleX: 1,
                transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          />
        </motion.div>

        <div className="grid gap-10 md:grid-cols-4 md:gap-6">
          {howItWorksContent.steps.map((step) => (
            <Reveal key={step.number} delay={Number(step.number) * 0.06}>
              <div className="relative">
                <span className="label relative z-10 flex size-10 items-center justify-center rounded-full border border-ink bg-paper text-ink">
                  {step.number}
                </span>
                <h3 className="mt-5 font-heading text-3xl leading-none font-light text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-cocoa">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
