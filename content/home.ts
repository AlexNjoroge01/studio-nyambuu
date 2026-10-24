import type { ImageKey } from "@/lib/image-manifest";

/** Home page copy (Blueprint §7.1). All copy lives here, not inline in JSX. */

export const homeContent = {
  hero: {
    eyebrow: "Personal styling · Nairobi",
    title: {
      lead: "Dress with",
      emphasis: "intention.",
    },
    sub: "Curated fashion, personal styling and shopping for women who want to look and feel like themselves, on purpose.",
    primaryCta: "Book a styling session",
    secondaryCta: "Explore the collection",
    image: "suited-duo-mustard-olive-entrance" as ImageKey,
    overlapImage: "berry-peplum-blazer-white-trousers" as ImageKey,
    stickerLabel: "Book your styling session",
  },
  intro: {
    eyebrow: "The studio",
    before:
      "Nyambura Mbugua is a Nairobi-based personal stylist and fashion boutique helping women build wardrobes that work as hard as they do. Fewer pieces, better chosen. Outfits that feel like",
    highlight: "you",
    after:
      ", not a trend. From a full wardrobe edit to a complete look at short notice, the work is the same: dressing well, made simpler and more intentional.",
  },
  services: {
    eyebrow: "What we do",
    title: { lead: "Four ways we", emphasis: "dress you." },
    description:
      "Start with what you own, or start from a blank page. Either way, you leave with a look that fits your body, your life and the room you are walking into.",
  },
  collectionTeaser: {
    eyebrow: "The Collection",
    title: { lead: "Pieces chosen,", emphasis: "never piled on." },
    body: "Clothing, shoes and accessories selected by hand — a curated lookbook, not a sale rail. Enquire about a piece and we will tell you what it can do for your wardrobe.",
    cta: "Explore the collection",
    images: {
      left: "four-suit-colours-boutique-mannequins" as ImageKey,
      center: "black-velvet-heels-clutch-flat-lay" as ImageKey,
      right: "gold-jewellery-collection-collage" as ImageKey,
    },
  },
  steps: {
    eyebrow: "How it works",
    title: { lead: "From brief to", emphasis: "reveal." },
    cta: "See the full process",
  },
  occasions: {
    eyebrow: "Dressed for",
    title: { lead: "Every room has", emphasis: "a dress code." },
    description:
      "Wedding guest, office, date night, church, graduation, cocktail. Tell us where you are going and we will build the look around it.",
    cta: "Book occasion styling",
  },
  colourBreak: {
    image: "tangerine-ruffle-mini-dress-nairobi" as ImageKey,
    quote: "The right outfit does not change you. It lets you arrive.",
    attribution: "Nyambura Mbugua",
    cta: "Start with a conversation",
  },
  principles: {
    eyebrow: "Why this works",
    title: { lead: "Dress for the life you", emphasis: "actually live." },
    items: [
      {
        title: "Fit your body",
        description:
          "Clothes are chosen for your shape and proportions — not the other way around.",
      },
      {
        title: "Fit your life",
        description:
          "Your wardrobe should work for your office, your church, your weekends and your calendar.",
      },
      {
        title: "Stay relevant",
        description:
          "We favour pieces that restyle across occasions and still feel right next year.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Karibu",
    title: { lead: "Ready to", emphasis: "feel", tail: "like you?" },
    body: "Tell us what is coming up, what is not working or what you wish you could wear. We will take it from there.",
  },
  instagram: {
    eyebrow: "From the studio",
    title: { lead: "A closer", emphasis: "look." },
    cta: "See the full lookbook",
  },
};
