import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";

import { MarqueeBand } from "@/components/sections/marquee-band";
import { PhotoCredits } from "@/components/layout/photo-credits";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { footerNav, mainNav, site, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-paper">
      <MarqueeBand />

      <div className="mx-auto max-w-[1440px] px-[clamp(20px,6vw,96px)] py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="label mb-5 text-cocoa">Karibu</p>
            <p className="max-w-[18ch] font-heading text-[clamp(2.8rem,8vw,6rem)] leading-[0.94] font-light tracking-[-0.02em] text-ink">
              Dress{" "}
              <em className="text-cobalt italic">intentionally.</em>
            </p>
            <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-cocoa">
              {site.copy.footerNote}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:justify-items-end">
            {footerNav.map((group) => (
              <div key={group.title}>
                <p className="label mb-4 text-cocoa">{group.title}</p>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink underline-offset-4 transition-colors hover:text-cobalt hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-border pt-8 md:grid-cols-3">
          <div>
            <p className="label mb-3 text-cocoa">Talk to us</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink transition-colors hover:text-cobalt"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2 text-ink transition-colors hover:text-cobalt"
                >
                  <Mail className="size-4" aria-hidden />
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="inline-flex items-center gap-2 text-ink transition-colors hover:text-cobalt"
                >
                  <Phone className="size-4" aria-hidden />
                  {site.contact.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="label mb-3 text-cocoa">Studio</p>
            <p className="text-sm leading-relaxed text-ink">
              {site.location.city}, {site.location.country}
              <br />
              <span className="text-cocoa">{site.location.areaServed.join(" · ")}</span>
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="flex size-9 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-cobalt hover:text-cobalt"
                  >
                    <MessageCircle className="size-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>WhatsApp the studio</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`mailto:${site.contact.email}`}
                    aria-label="Email"
                    className="flex size-9 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-cobalt hover:text-cobalt"
                  >
                    <Mail className="size-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Email the studio</TooltipContent>
              </Tooltip>
              {site.social.instagram && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={site.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="flex size-9 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-cobalt hover:text-cobalt"
                    >
                      <ArrowUpRight className="size-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Instagram</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          <div className="md:text-right">
            <p className="label mb-3 text-cocoa">Elsewhere</p>
            <nav aria-label="Footer quick links" className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
              {mainNav.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-ink underline-offset-4 transition-colors hover:text-cobalt hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-cocoa md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.brand.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <PhotoCredits />
            <a
              href="https://www.baseline44.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border underline-offset-4 transition-colors hover:text-cobalt"
            >
              Website by Baseline44 community initiative
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
