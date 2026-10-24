"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { mainNav, serviceLinks, site, whatsappUrl } from "@/lib/site";

/** Full-height mobile menu with big thin serif links (§5.6). */
export function MobileNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex min-h-svh flex-col px-[clamp(20px,6vw,96px)] py-8">
      <p className="label mb-10 text-cocoa">{site.brand.name}</p>

      <nav className="flex flex-1 flex-col gap-1" aria-label="Mobile">
        {mainNav
          .filter((item) => item.href !== "/services")
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="border-b border-border py-4 font-heading text-4xl leading-none font-light text-ink transition-colors hover:text-cobalt"
            >
              {item.label}
            </Link>
          ))}

        <p className="label mt-8 mb-2 text-cocoa">Services</p>
        {serviceLinks.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            onClick={onNavigate}
            className="group flex items-center justify-between border-b border-border py-4"
          >
            <span className="font-heading text-2xl leading-none font-light text-ink">
              {service.name}
            </span>
            <ArrowUpRight className="size-4 text-cocoa transition-colors group-hover:text-cobalt" />
          </Link>
        ))}
      </nav>

      <div className="mt-10 space-y-3">
        <Button asChild variant="ink" size="lg" className="w-full">
          <Link href="/contact" onClick={onNavigate}>
            Book a Session
          </Link>
        </Button>
        <Button asChild variant="outline-thin" size="lg" className="w-full">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <MessageCircle /> Chat on WhatsApp
          </a>
        </Button>
        <p className="label pt-4 text-center text-cocoa">
          {site.location.city}, {site.location.country}
        </p>
      </div>
    </div>
  );
}
