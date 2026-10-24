import type { ImageKey } from "@/lib/image-manifest";

/** About page copy (Blueprint §7.6). */
export const aboutContent = {
  eyebrow: "The woman behind the wardrobe",
  title: { lead: "Styling that starts with", emphasis: "you." },
  intro:
    "Nyambura Mbugua is a Nairobi-based personal stylist and the founder of a curated fashion boutique. She helps women dress with intention — building wardrobes that reflect who they are, suit their body type and fit the way they actually live.",
  heroImage: "oatmeal-belted-pantsuit-entrance" as ImageKey,
  portraitImage: "layered-gold-jewellery-stylist-woman" as ImageKey,
  story: [
    "Nyambura started with retail: carefully selected, chic, classy and timeless pieces — clothing, shoes and accessories chosen to help women express their individuality. Over the past year, that work grew into something more personal.",
    "Clients kept asking the same questions. What do I wear this with? What suits me now? Why is my wardrobe full and still not working? The answer was rarely another purchase. It was a clearer point of view.",
    "So the studio expanded into personal styling and shopping: helping women build functional, versatile wardrobes that reflect who they are, suit their body type and match how they want to look and feel. The boutique is still the heart of it — now with a stylist in the room.",
    "The business was established on 25 October 2025 and is based in Nairobi, serving women across Kenya.",
  ],
  philosophy: {
    eyebrow: "The philosophy",
    title: { lead: "Three things we", emphasis: "believe." },
    items: [
      {
        number: "01",
        title: "Your wardrobe should fit your life",
        description:
          "Not a fantasy version of it. The office, the school run, the wedding, the Sunday service, the dinner that runs late. Clothes should make those days easier.",
      },
      {
        number: "02",
        title: "Fewer, better, more often",
        description:
          "A piece you wear twenty times is worth more than five you wear once. We choose for versatility, longevity and the way a thing actually feels on.",
      },
      {
        number: "03",
        title: "Style is personal",
        description:
          "There is no universal list. Your body, your preferences and the image you want to project are the brief — not the season's mood board.",
      },
    ],
  },
  quote:
    "Dressing well is not about having more. It is about knowing what belongs on you — and having the courage to wear it.",
  values: ["Chic", "Classy", "Timeless", "Intentional", "True to you"],
  valuesEyebrow: "In five words",
  cta: {
    title: { lead: "Let's build a wardrobe that feels like", emphasis: "you." },
    body: "Start with a conversation about what you own, what you want and what is coming up.",
  },
  ownerPhotoTodo:
    "TODO(client): add a real photograph of Nyambura at /public/images/owner.jpg — the OwnerPhoto slot swaps it in automatically.",
};
