import type { ImageKey } from "@/lib/image-manifest";

/**
 * The four styling services (Blueprint §7.3). All copy is derived from the
 * client brief in §1 — no prices, no invented turnaround times or claims.
 * Render through the shared ServicePage template.
 */

export type Accent = "cobalt" | "tangerine" | "vermilion" | "sun" | "cocoa";

export type ServiceSlug =
  | "wardrobe-edit"
  | "personal-shop"
  | "occasion-styling"
  | "express-look";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  slug: ServiceSlug;
  name: string;
  /** Short name used in chips and nav */
  shortName: string;
  tagline: string;
  accent: Accent;
  badge: string;
  heroImage: ImageKey;
  strip: [ImageKey, ImageKey, ImageKey];
  /** Answer-first 40–60 word summary for AI search and the hero sub */
  intro: string;
  /** Two or three sentences in her voice */
  whatItIs: string[];
  included: { title: string; description: string }[];
  personas: string[];
  steps: { title: string; description: string }[];
  faqs: ServiceFaq[];
  related: ServiceSlug[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const services: Service[] = [
  {
    slug: "wardrobe-edit",
    name: "The Wardrobe Edit",
    shortName: "Wardrobe Edit",
    tagline: "Keep what loves you back.",
    accent: "cobalt",
    badge: "Signature service",
    heroImage: "outfit-planning-flat-lay-bed",
    strip: [
      "sky-blue-ruched-shirt",
      "navy-gold-button-blazer-white-trousers",
      "oatmeal-belted-pantsuit-entrance",
    ],
    intro:
      "The Wardrobe Edit is a personal styling service in Nairobi that reviews what you already own against your body type, lifestyle, preferences and the image you want to project — then shows you what to keep, what to let go of and how to restyle the pieces that remain.",
    whatItIs: [
      "Most wardrobes are not short of clothes. They are short of clarity. The Wardrobe Edit is a calm, honest look at what you own and why you reach for it — or avoid it.",
      "We assess each piece against your body type, your real life and the way you want to look and feel. Then we make room: what stays, what goes and, most importantly, how the pieces you keep can work harder for you.",
    ],
    included: [
      {
        title: "A wardrobe assessment",
        description:
          "Every piece is considered against your body type, lifestyle, preferences and the image you want to project — not against trends that have nothing to do with your life.",
      },
      {
        title: "The keep / let go list",
        description:
          "You leave with a clear, kind decision on what no longer serves you: pieces that fight your shape, your season or the way you actually spend your days.",
      },
      {
        title: "Restyling what remains",
        description:
          "The clothes you keep are recombined into looks you may not have seen — new pairings, better proportions and a fresh way into pieces you had written off.",
      },
      {
        title: "A wardrobe plan",
        description:
          "A practical direction for what to add next, so future purchases fill real gaps instead of repeating the same mistake in a different colour.",
      },
    ],
    personas: [
      "Your wardrobe is full, but you still have nothing to wear.",
      "Your body, role or season of life has changed and your clothes have not caught up.",
      "You want a signature look without starting over or buying everything new.",
    ],
    steps: [
      {
        title: "Tell us what is not working",
        description:
          "Share your wardrobe, your daily life, the occasions you dress for and how you want to feel. Measurements and preferences help; honesty helps more.",
      },
      {
        title: "We assess the pieces",
        description:
          "Together we go through what you own and test each piece against fit, lifestyle, preference and the image you are building.",
      },
      {
        title: "We edit and restyle",
        description:
          "The keepers are reworked into complete looks. The rest are released — without guilt and without waste.",
      },
      {
        title: "You leave with a plan",
        description:
          "Clear gaps, clear priorities and a short shopping direction for the pieces that will genuinely extend your wardrobe.",
      },
    ],
    faqs: [
      {
        question: "Do I need to buy anything to do a wardrobe edit?",
        answer:
          "No. The edit is designed to work with what you already own first. If gaps appear, we plan them together and you decide whether to shop — through The Personal Shop or in your own time.",
      },
      {
        question: "Will you make me throw away clothes I love?",
        answer:
          "Never. The edit is a conversation, not a clear-out. A piece you love can stay even if it is not perfect; the goal is a wardrobe that feels like yours, not a minimalist showroom.",
      },
      {
        question: "How many pieces should I have ready?",
        answer:
          "Bring your everyday wardrobe and the pieces you are unsure about. There is no minimum. If your wardrobe is spread across several homes or counties, tell us when you enquire and we will plan the format around you.",
      },
      {
        question: "Is this only for women in Nairobi?",
        answer:
          "Nyambura is based in Nairobi and works with women across Kenya. Share your location when you enquire and we will confirm what is possible in person or remotely.",
      },
    ],
    related: ["personal-shop", "occasion-styling", "express-look"],
    metaTitle: "Wardrobe Editing & Styling in Nairobi",
    metaDescription:
      "A personal wardrobe edit in Nairobi: assess what you own against your body type, lifestyle and style goals, then keep, release and restyle with intention.",
    keywords: [
      "wardrobe consultant Nairobi",
      "wardrobe stylist Nairobi",
      "wardrobe edit Nairobi",
      "closet declutter Nairobi",
      "wardrobe audit Nairobi",
      "personal stylist Nairobi",
    ],
  },
  {
    slug: "personal-shop",
    name: "The Personal Shop",
    shortName: "Personal Shop",
    tagline: "Intentional pieces, chosen for you.",
    accent: "tangerine",
    badge: "By appointment",
    heroImage: "four-suit-colours-boutique-mannequins",
    strip: [
      "black-velvet-heels-clutch-flat-lay",
      "trench-coat-leather-bag-gold-watch",
      "gold-jewellery-collection-collage",
    ],
    intro:
      "The Personal Shop is an intentional personal shopping service for women in Nairobi. Clothing, shoes and accessories are chosen to complement the wardrobe you already have — versatile pieces that restyle easily and stay relevant, rather than one-off purchases that sit unworn.",
    whatItIs: [
      "Shopping is easy. Choosing well is the hard part. The Personal Shop takes the guesswork out of it by sourcing pieces that fit your body, your life and the wardrobe already hanging at home.",
      "Nothing is bought for the sake of a new season. Every piece has to earn its place: it should work with what you own, move across more than one occasion and still feel like you in a year.",
    ],
    included: [
      {
        title: "A pre-shop plan",
        description:
          "We start with your existing wardrobe, the gaps that matter and the looks you want to be able to put together without thinking.",
      },
      {
        title: "Clothing, shoes and accessories",
        description:
          "Sourcing across all three layers, so the outfit is finished — not just the dress. Shoes and accessories are chosen to extend the clothes you already wear.",
      },
      {
        title: "Pieces that complement",
        description:
          "Every purchase is tested against your current wardrobe. If it does not pair with at least a few things you own, it is not the right piece.",
      },
      {
        title: "Versatile, lasting choices",
        description:
          "We favour pieces that can be restyled for different occasions and stay relevant over time, so your budget works harder than a single-event outfit.",
      },
    ],
    personas: [
      "You know the gaps in your wardrobe but not where to find the right pieces.",
      "You keep buying things you love on the hanger and never wear at home.",
      "You want a finished, coordinated look without spending a whole weekend shopping.",
    ],
    steps: [
      {
        title: "Share the brief",
        description:
          "Tell us what you need, what you already own, your sizes and the occasions the pieces must cover.",
      },
      {
        title: "We plan the edit",
        description:
          "We map the gaps, set priorities and agree on the shapes, colours and price direction that make sense for you.",
      },
      {
        title: "We source",
        description:
          "Nyambura sources clothing, shoes and accessories, checking each piece against your wardrobe and your brief.",
      },
      {
        title: "You choose and style",
        description:
          "Review the selection, try the pieces and leave with complete looks — plus a clear idea of how to wear them.",
      },
    ],
    faqs: [
      {
        question: "Do you only shop for clothes?",
        answer:
          "No. The Personal Shop covers clothing, shoes and accessories, because an outfit is rarely finished by the dress alone. We can focus on one layer or build a complete look.",
      },
      {
        question: "What is your budget?",
        answer:
          "You set the budget; we work within it. There are no published prices for the service because every brief is different — enquire and we will confirm the approach before anything is sourced.",
      },
      {
        question: "Can you shop for a specific event?",
        answer:
          "Yes — and if the need is at short notice, The Express Look is the better fit. For planned events, we can source a complete coordinated outfit through The Personal Shop.",
      },
      {
        question: "Do I have to come to Nairobi?",
        answer:
          "Nyambura is based in Nairobi and serves women across Kenya. Share your location when you enquire so we can confirm whether the shop happens in person, remotely or a mix of both.",
      },
    ],
    related: ["wardrobe-edit", "occasion-styling", "express-look"],
    metaTitle: "Personal Shopper in Nairobi",
    metaDescription:
      "Personal shopping in Nairobi for clothing, shoes and accessories chosen to complement your wardrobe — versatile, intentional pieces that last beyond one season.",
    keywords: [
      "personal shopper Nairobi",
      "personal shopping service Kenya",
      "shopping errand service Nairobi",
      "personal stylist Nairobi",
      "women's clothing Nairobi",
    ],
  },
  {
    slug: "occasion-styling",
    name: "Occasion Styling",
    shortName: "Occasion Styling",
    tagline: "Know exactly what to wear.",
    accent: "vermilion",
    badge: "Event-ready",
    heroImage: "layered-gold-jewellery-stylist-woman",
    strip: [
      "cornflower-blue-belted-pantsuit",
      "berry-peplum-blazer-white-trousers",
      "pleated-floral-midi-skirts-arched-nook",
    ],
    intro:
      "Occasion Styling is event outfit planning for women in Nairobi: formal events, special celebrations, professional meetings and social gatherings. You arrive knowing exactly what to wear, what it says about you and how to carry it from the ceremony to the after-party.",
    whatItIs: [
      "Some invitations come with a dress code. Most come with a feeling you are trying to get right. Occasion Styling turns that feeling into a complete look that fits the room, the photographs and you.",
      "We plan the outfit around the occasion — the formality, the venue, the time of day and the role you are playing — then finish it with the shoes, bag and jewellery so nothing is left to the morning of.",
    ],
    included: [
      {
        title: "Formal events",
        description:
          "Weddings, galas, award dinners and ceremonies: a look that holds up in person, in photographs and through a long day.",
      },
      {
        title: "Special celebrations",
        description:
          "Birthdays, send-offs, kitchen parties, graduations and family milestones — dressed for the occasion without disappearing into it.",
      },
      {
        title: "Professional meetings",
        description:
          "Boardrooms, conferences, presentations and interviews: polished, credible and still unmistakably you.",
      },
      {
        title: "Social gatherings",
        description:
          "Cocktails, dinners, reunions and date nights: the right level of dressed, with the confidence to stop thinking about it.",
      },
    ],
    personas: [
      "You have an occasion coming and no clear picture of the outfit.",
      "You own beautiful pieces but cannot decide what belongs together.",
      "You want to be remembered for the look, not worried about it all night.",
    ],
    steps: [
      {
        title: "Tell us the occasion",
        description:
          "The event, date, venue, dress code and the version of yourself you want to show up as.",
      },
      {
        title: "We build the look",
        description:
          "Clothing, shoes, bag and jewellery are planned as one outfit, with the formality and setting in mind.",
      },
      {
        title: "We source and fit",
        description:
          "Pieces are sourced or selected from your wardrobe, then fitted and adjusted so the proportions are right on you.",
      },
      {
        title: "You arrive ready",
        description:
          "A complete look, a backup plan for the day and no last-minute decisions.",
      },
    ],
    faqs: [
      {
        question: "Can you style a wedding guest outfit?",
        answer:
          "Yes. Wedding guest dressing is one of the most common occasion briefs — including the colours, fabrics and silhouettes that work for a Kenyan wedding and photograph well.",
      },
      {
        question: "Do you style men too?",
        answer:
          "The studio focuses on women, per the brief. For a couple or family occasion, mention it when you enquire and we will confirm what can be arranged.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "As early as you can, especially for weddings and large celebrations. If the date is close, tell us immediately — The Express Look exists for short-notice needs.",
      },
      {
        question: "Will the outfit be bought or pulled from my wardrobe?",
        answer:
          "Either, or both. Some occasions are best served by restyling what you own; others need a new anchor piece. We decide together once we see the brief.",
      },
    ],
    related: ["express-look", "personal-shop", "wardrobe-edit"],
    metaTitle: "Event Styling in Nairobi",
    metaDescription:
      "Occasion styling in Nairobi for weddings, celebrations, professional meetings and social events — a complete, considered outfit from head to toe.",
    keywords: [
      "event stylist Nairobi",
      "outfit stylist for events Kenya",
      "wedding guest stylist Nairobi",
      "what to wear to a Kenyan wedding",
      "occasion styling Nairobi",
    ],
  },
  {
    slug: "express-look",
    name: "The Express Look",
    shortName: "Express Look",
    tagline: "A complete outfit. Zero decision fatigue.",
    accent: "sun",
    badge: "Short notice",
    heroImage: "outfit-planning-flat-lay-bed",
    strip: [
      "tangerine-ruffle-mini-dress-nairobi",
      "black-velvet-heels-clutch-flat-lay",
      "tortoiseshell-accessories-flat-lay",
    ],
    intro:
      "The Express Look is a styling errand service for busy women in Nairobi who need a complete outfit at short notice. You share the look, occasion, measurements and preferences; Nyambura sources the clothing, shoes and accessories and delivers a coordinated outfit ready to wear.",
    whatItIs: [
      "Some weeks do not allow for a styling journey. The Express Look is the shortcut: one clear brief, one coordinated outfit, no decision fatigue.",
      "You tell us what the occasion needs and what you feel good in. We source the full look — clothing, shoes and accessories — so you can get dressed and go.",
    ],
    included: [
      {
        title: "Your brief, taken seriously",
        description:
          "The desired look, the occasion, your measurements and your preferences — including the colours, cuts and coverage you actually enjoy wearing.",
      },
      {
        title: "A complete coordinated outfit",
        description:
          "Clothing, shoes and accessories sourced together, so the look is finished rather than almost-there.",
      },
      {
        title: "Short-notice sourcing",
        description:
          "Built for busy clients who need a look quickly. Tell us the date when you enquire and we will confirm what is achievable.",
      },
      {
        title: "Ready for the occasion",
        description:
          "The outfit arrives coordinated and ready to wear, with the styling decisions already made for you.",
      },
    ],
    personas: [
      "Your calendar is full and the event is close.",
      "You know the vibe you want but not the exact outfit.",
      "You would rather delegate the sourcing than spend a day shopping.",
    ],
    steps: [
      {
        title: "Send the brief",
        description:
          "Occasion, date, desired look, measurements and preferences — a few clear details are enough to start.",
      },
      {
        title: "We source",
        description:
          "Nyambura sources clothing, shoes and accessories that answer the brief and work together.",
      },
      {
        title: "We coordinate",
        description:
          "The full look is checked for fit, colour and occasion before it is confirmed.",
      },
      {
        title: "You wear it",
        description:
          "A complete outfit, ready for the occasion, with the guesswork removed.",
      },
    ],
    faqs: [
      {
        question: "How short is short notice?",
        answer:
          "It depends on the occasion, the pieces and your location. Send the date and the brief as early as you can and we will confirm honestly whether The Express Look is achievable.",
      },
      {
        question: "What measurements do you need?",
        answer:
          "The usual: bust, waist, hips and height, plus your shoe size. If a piece needs specific measurements, we will ask before sourcing.",
      },
      {
        question: "Can I request a specific colour or style?",
        answer:
          "Yes. The brief is yours. Share the colours, silhouettes and coverage you love — and anything you would rather avoid.",
      },
      {
        question: "Is this the same as personal shopping?",
        answer:
          "It is the fast lane. The Personal Shop is a fuller, planned process; The Express Look is for a complete outfit on a tight timeline.",
      },
    ],
    related: ["occasion-styling", "personal-shop", "wardrobe-edit"],
    metaTitle: "Last-Minute Outfit Styling in Nairobi",
    metaDescription:
      "Need an outfit at short notice in Nairobi? The Express Look sources a complete coordinated look — clothing, shoes and accessories — around your brief and measurements.",
    keywords: [
      "last-minute outfit Nairobi",
      "same-day outfit styling Nairobi",
      "shopping errand service Nairobi",
      "personal shopping service Kenya",
      "express styling Nairobi",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceSlugs = services.map((service) => service.slug);
