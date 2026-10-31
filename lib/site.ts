/**
 * Single source of truth for brand, contact, navigation and site URL.
 * Blueprint §1 + §10. One edit here changes the whole site.
 */

export const site = {
  name: "Styled by Nyambura",
  /** TODO(client): confirm trading name before launch (Blueprint §1) */
  brand: {
    name: "Styled by Nyambura",
    short: "Nyambura",
    wordmark: "Styled by Nyambura",
    promise: "Dressing well, made simpler and more intentional.",
  },
  /**
   * Canonical origin. Prefer NEXT_PUBLIC_SITE_URL; on Vercel fall back to the
   * production deployment host so previews and first deploys still emit
   * correct canonicals, OG URLs and sitemap entries.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://nyamburambugua.vercel.app")
  ).replace(/\/$/, ""),
  description:
    "Styled by Nyambura is a Nairobi-based personal stylist and fashion boutique offering wardrobe editing, personal shopping, event styling and express outfit sourcing for women across Kenya.",
  established: "2025-10-25",
  location: {
    city: "Nairobi",
    country: "Kenya",
    areaServed: ["Nairobi", "Kenya"],
    /** TODO(client): confirm whether delivery/serving reaches outside Nairobi */
  },
  contact: {
    email: "jmsnyambz@gmail.com",
    phone: "+254 728 654 867",
    phoneHref: "tel:+254728654867",
    whatsapp: "+254 728 654 867",
    whatsappNumber: "254728654867",
    whatsappUrl: "https://wa.me/254728654867",
  },
  social: {
    /** TODO(client): add the real Instagram handle — hidden until supplied */
    instagram: null as string | null,
    /** TODO(client): add TikTok / Pinterest handles if the client wants them listed */
    tiktok: null as string | null,
    pinterest: null as string | null,
  },
  copy: {
    footerNote:
      "Curated fashion, personal styling and shopping for women in Nairobi and across Kenya.",
  },
} as const;

/** WhatsApp deep link with an optional pre-filled message. */
export function whatsappUrl(message?: string) {
  if (!message) return site.contact.whatsappUrl;
  return `${site.contact.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export const serviceLinks = [
  {
    href: "/services/wardrobe-edit",
    name: "The Wardrobe Edit",
    tagline: "Keep what loves you back.",
  },
  {
    href: "/services/personal-shop",
    name: "The Personal Shop",
    tagline: "Intentional pieces, chosen for you.",
  },
  {
    href: "/services/occasion-styling",
    name: "Occasion Styling",
    tagline: "Know exactly what to wear.",
  },
  {
    href: "/services/express-look",
    name: "The Express Look",
    tagline: "A complete outfit. Zero decision fatigue.",
  },
] as const;

export const mainNav = [
  { href: "/services", label: "Services" },
  { href: "/collection", label: "The Collection" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

export const footerNav = [
  {
    title: "Explore",
    links: [
      { href: "/collection", label: "The Collection" },
      { href: "/lookbook", label: "Lookbook" },
      { href: "/journal", label: "Journal" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Services",
    links: serviceLinks.map((s) => ({ href: s.href, label: s.name })),
  },
  {
    title: "Studio",
    links: [
      { href: "/about", label: "About Nyambura" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
] as const;
