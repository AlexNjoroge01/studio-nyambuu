import type { Metadata } from "next";

import { PageTop } from "@/components/layout/page-top";
import { privacyContent } from "@/content/privacy";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Note",
  description:
    "How Nyambura Mbugua handles enquiry details: no accounts, no payments, no stored submissions. Your details are used only to reply to you.",
  path: "/privacy",
  noIndex: false,
});

export default function PrivacyPage() {
  return (
    <>
      <PageTop
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Privacy", href: "/privacy" },
        ]}
      />

      <section className="container-page pt-10 pb-24 md:pt-16 md:pb-40">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label mb-6 text-cocoa">{privacyContent.eyebrow}</p>
            <h1 className="max-w-[14ch] font-heading text-[clamp(2.8rem,5.5vw,4.8rem)] leading-[0.94] font-light tracking-[-0.03em] text-ink">
              {privacyContent.title}
            </h1>
            <p className="mt-5 text-sm text-cocoa/70">{privacyContent.updated}</p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <p className="max-w-[62ch] text-base leading-relaxed text-cocoa md:text-lg">
              {privacyContent.intro}
            </p>

            <div className="mt-10 space-y-8">
              {privacyContent.sections.map((section) => (
                <section key={section.title} className="border-t border-border pt-6">
                  <h2 className="font-heading text-2xl leading-tight font-light text-ink md:text-3xl">
                    {section.title}
                  </h2>
                  <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-cocoa">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
