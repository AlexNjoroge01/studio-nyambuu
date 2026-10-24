import Link from "next/link";

import { cn } from "@/lib/utils";

/** Rotating circular "book" sticker overlapping hero images (§5.4/§5.6). */
export function Sticker({
  label = "Book your styling session",
  className,
  href = "/contact",
}: {
  label?: string;
  className?: string;
  href?: string;
}) {
  const ring = `${label} • ${label} • `;

  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "group relative flex size-28 items-center justify-center rounded-full bg-sun text-ink shadow-lg transition-transform hover:scale-105 md:size-32",
        className
      )}
    >
      <svg
        viewBox="0 0 100 100"
        className="sticker-spin absolute inset-0 size-full"
        aria-hidden
      >
        <defs>
          <path
            id="sticker-circle"
            d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
          />
        </defs>
        <text className="fill-ink text-[8.2px] tracking-[0.18em] uppercase">
          <textPath href="#sticker-circle">{ring}</textPath>
        </text>
      </svg>
      <span className="font-heading text-2xl leading-none italic">Book</span>
    </Link>
  );
}
