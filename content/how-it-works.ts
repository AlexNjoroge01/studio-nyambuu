import type { ImageKey } from "@/lib/image-manifest";

/** How it works page copy (Blueprint §7.7). */
export const howItWorksContent = {
  eyebrow: "The process",
  title: { lead: "Four steps. One", emphasis: "considered look." },
  intro:
    "Whether you need a full wardrobe edit or one outfit by Friday, the process is calm, clear and built around you. Here is exactly what happens.",
  steps: [
    {
      number: "01",
      title: "Brief",
      description:
        "Tell us your look, the occasion, your measurements and your preferences. The more honest the brief, the better the outfit.",
      effort: "You: about 10 minutes",
      image: "leopard-two-piece-white-crop-trackset" as ImageKey,
      tooltip: "Measurements",
      tooltipText:
        "Bust, waist, hips, height and shoe size are enough to start. We will ask for anything else we need.",
    },
    {
      number: "02",
      title: "Plan",
      description:
        "We edit or plan around your body type, lifestyle and budget. What stays, what goes, what needs sourcing — decided before anything is bought.",
      effort: "Together: one conversation",
      image: "navy-gold-button-blazer-white-trousers" as ImageKey,
      tooltip: "Capsule wardrobe",
      tooltipText:
        "A small set of pieces that combine into many outfits. Not a uniform — a system that makes getting dressed easier.",
    },
    {
      number: "03",
      title: "Source & style",
      description:
        "Nyambura sources the missing pieces — clothing, shoes and accessories — and styles them with what you already own.",
      effort: "We handle the running around",
      image: "outfit-planning-flat-lay-bed" as ImageKey,
      tooltip: "Sourcing",
      tooltipText:
        "Finding the right piece in the right size, colour and budget — from the boutique and trusted suppliers.",
    },
    {
      number: "04",
      title: "Reveal & wear",
      description:
        "You receive complete looks, not one-off pieces. Try them, learn the combinations and walk out knowing exactly what to wear.",
      effort: "You: arrive and enjoy it",
      image: "cornflower-blue-belted-pantsuit" as ImageKey,
      tooltip: "Complete look",
      tooltipText:
        "Clothing, shoes and accessories coordinated together, so nothing is left to the morning of the event.",
    },
  ],
  cta: {
    title: { lead: "Ready to", emphasis: "begin?" },
    body: "Send a brief or ask a question. We will tell you which service fits and what happens next.",
  },
  faq: [
    {
      question: "Do I need to prepare anything before the brief?",
      answer:
        "A rough idea of the occasion, your measurements and a few things you love or hate wearing. Photos of pieces you already own help for a wardrobe edit.",
    },
    {
      question: "What if I do not know my measurements?",
      answer:
        "Tell us and we will guide you through taking them, or arrange a fitting where possible.",
    },
    {
      question: "Can the process work remotely?",
      answer:
        "Parts of it can. Share your location when you enquire and we will confirm what can be done remotely and what needs to happen in person.",
    },
  ],
};
