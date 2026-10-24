import type { Metadata } from "next";

import { CollectionTeaser } from "@/components/sections/collection-teaser";
import { ColorBreak } from "@/components/sections/color-break";
import { FaqBlock } from "@/components/sections/faq-block";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { InstagramGrid } from "@/components/sections/instagram-grid";
import { IntroStatement } from "@/components/sections/intro-statement";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { OccasionsCarousel } from "@/components/sections/occasions-carousel";
import { Principles } from "@/components/sections/principles";
import { ServiceCards } from "@/components/sections/service-cards";
import { Steps } from "@/components/sections/steps";
import { Testimonials } from "@/components/sections/testimonials";
import { faqPreview } from "@/content/faq";
import { homeContent } from "@/content/home";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Nyambura Mbugua — Personal Stylist in Nairobi",
  description:
    "Personal styling, wardrobe editing, personal shopping and event outfits for women in Nairobi and across Kenya. Dress with intention — book a styling session.",
  path: "/",
  keywords: [
    "personal stylist Nairobi",
    "personal shopper Nairobi",
    "fashion stylist Kenya",
    "wardrobe consultant Nairobi",
    "women's fashion boutique Nairobi",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <IntroStatement />
      <ServiceCards />
      <CollectionTeaser />
      <Steps />
      <OccasionsCarousel />
      <ColorBreak
        image={homeContent.colourBreak.image}
        quote={homeContent.colourBreak.quote}
        attribution={homeContent.colourBreak.attribution}
        cta={homeContent.colourBreak.cta}
        eyebrow="Why we do this"
      />
      <Principles />
      <InstagramGrid />
      <Testimonials />
      <FaqBlock
        items={faqPreview}
        eyebrow="Good to know"
        title="A few questions, answered."
        showAllLink
      />
      <FinalCta />
    </>
  );
}
