import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { PageTop } from "@/components/layout/page-top";
import { SiteImage } from "@/components/media/site-image";
import { ContactForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { contactContent } from "@/content/contact";
import { buildMetadata } from "@/lib/seo";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Book a Styling Session in Nairobi",
  description:
    "Enquire or book a styling session with Nyambura Mbugua in Nairobi. Tell us the occasion, service and budget — we will reply on WhatsApp.",
  path: "/contact",
  keywords: [
    "book a stylist Kenya",
    "style consultation Kenya",
    "styling session Nairobi",
    "contact personal stylist Nairobi",
  ],
});

export default function ContactPage() {
  return (
    <>
      <PageTop
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <section className="container-page pt-10 pb-24 md:pt-16 md:pb-40">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="label mb-6 text-cocoa">{contactContent.eyebrow}</p>
            <h1 className="max-w-[14ch] font-heading text-[clamp(2.8rem,6vw,5rem)] leading-[0.94] font-light tracking-[-0.03em] text-ink">
              {contactContent.title.lead}{" "}
              <em className="text-cobalt italic">{contactContent.title.emphasis}</em>
            </h1>
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-cocoa md:text-lg">
              {contactContent.intro}
            </p>

            <div className="mt-10 border-t border-border pt-8">
              <Suspense
                fallback={
                  <div className="space-y-5">
                    <Skeleton className="h-11 w-full" />
                    <Skeleton className="h-11 w-full" />
                    <Skeleton className="h-11 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-12 w-40" />
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>

          <aside className="lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-28">
              <SiteImage
                name={contactContent.image}
                aspect="4/5"
                sizes="(min-width: 1024px) 38vw, 100vw"
              />

              <div className="mt-8 border-t border-border pt-8">
                <p className="label mb-4 text-cocoa">{contactContent.directTitle}</p>

                <div className="space-y-3">
                  <Button asChild variant="ink" size="lg" className="w-full">
                    <a
                      href={whatsappUrl("Hi Nyambura, I'd like to book a styling session.")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle /> WhatsApp the studio
                    </a>
                  </Button>

                  <a
                    href={`mailto:${site.contact.email}`}
                    className="flex items-center gap-3 border-b border-border py-3 text-sm text-ink transition-colors hover:text-cobalt"
                  >
                    <Mail className="size-4 text-cocoa" aria-hidden />
                    {site.contact.email}
                  </a>

                  <a
                    href={site.contact.phoneHref}
                    className="flex items-center gap-3 border-b border-border py-3 text-sm text-ink transition-colors hover:text-cobalt"
                  >
                    <Phone className="size-4 text-cocoa" aria-hidden />
                    {site.contact.phone}
                  </a>

                  <p className="flex items-center gap-3 border-b border-border py-3 text-sm text-ink">
                    <MapPin className="size-4 text-cocoa" aria-hidden />
                    {contactContent.locationNote}
                  </p>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-cocoa/80">
                  {contactContent.responseNote}
                </p>

                <p className="mt-6 text-xs text-cocoa/60">
                  Prefer to read first?{" "}
                  <Link href="/how-it-works" className="underline underline-offset-2 hover:text-cobalt">
                    See how it works
                  </Link>{" "}
                  or{" "}
                  <Link href="/faq" className="underline underline-offset-2 hover:text-cobalt">
                    read the FAQ
                  </Link>
                  .
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
