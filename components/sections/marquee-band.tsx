import Link from "next/link";

import { Marquee } from "@/components/motion/marquee";

const items = [
  "Wardrobe Edit",
  "Personal Shop",
  "Occasion Styling",
  "Express Look",
  "The Collection",
];

/** Sun-yellow marquee strip (§5.6). */
export function MarqueeBand({ href = "/services" }: { href?: string }) {
  return (
    <div className="border-y border-ink/10 bg-sun text-ink">
      <Marquee className="py-3 md:py-4">
        <Link href={href} className="flex items-center">
          {items.map((item) => (
            <span
              key={item}
              className="label flex items-center gap-6 pr-6 tracking-[0.22em] md:gap-10 md:pr-10"
            >
              {item}
              <span aria-hidden className="text-sm">
                ✦
              </span>
            </span>
          ))}
        </Link>
      </Marquee>
    </div>
  );
}
