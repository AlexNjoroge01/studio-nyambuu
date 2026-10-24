import { Reveal } from "@/components/motion/reveal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { testimonials } from "@/content/testimonials";

/**
 * Renders ONLY when content/testimonials.ts has real, client-approved entries
 * (§0.3, §7.1). No invented quotes, names or photographs.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="container-page section-y">
      <Reveal>
        <p className="label mb-6 text-cocoa">In their words</p>
        <h2 className="max-w-[16ch] font-heading text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.96] font-light tracking-[-0.02em] text-ink">
          Real clients, real wardrobes.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 0.08}>
            <figure className="flex h-full flex-col justify-between border-t border-border pt-6">
              <blockquote className="font-heading text-2xl leading-snug font-light text-ink">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar className="size-10">
                  {testimonial.image && (
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  )}
                  <AvatarFallback className="label bg-cream text-cocoa">
                    {testimonial.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-ink">{testimonial.name}</p>
                  {testimonial.detail && (
                    <p className="text-xs text-cocoa">{testimonial.detail}</p>
                  )}
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
