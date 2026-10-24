import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page is not in the wardrobe.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70svh] flex-col justify-center py-20">
      <p className="label mb-6 text-cocoa">404 · Off the rail</p>
      <h1 className="max-w-[14ch] font-heading text-[clamp(3rem,9vw,7rem)] leading-[0.9] font-light tracking-[-0.03em] text-ink">
        This look isn&apos;t in the <em className="text-cobalt italic">wardrobe.</em>
      </h1>
      <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-cocoa md:text-lg">
        The page you were looking for has been moved, restyled or never existed.
        Let&apos;s get you back to something worth wearing.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="ink" size="lg">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline-thin" size="lg">
          <Link href="/lookbook">Browse the lookbook</Link>
        </Button>
        <Button asChild variant="ghost" size="lg">
          <Link href="/contact">Ask us</Link>
        </Button>
      </div>
    </section>
  );
}
