import { Reveal } from "@/components/motion/reveal";
import { homeContent } from "@/content/home";

/** Oversized thin intro paragraph with one hand-drawn cobalt underline (§7.1). */
export function IntroStatement() {
  const intro = homeContent.intro;

  return (
    <section className="container-page section-y">
      <div className="grid gap-8 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <p className="label text-cocoa">{intro.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-9">
          <p className="max-w-[30ch] font-heading text-[clamp(2rem,4.4vw,4.2rem)] leading-[1.06] font-light tracking-[-0.02em] text-ink md:max-w-[34ch]">
            {intro.before}{" "}
            <span className="underline-cobalt text-cobalt italic">
              {intro.highlight}
            </span>
            {intro.after}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
