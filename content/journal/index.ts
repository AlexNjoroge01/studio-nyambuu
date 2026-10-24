import type { ImageKey } from "@/lib/image-manifest";
import type { ServiceSlug } from "@/content/services";

/** Journal index (Blueprint §11.5). Drafts stay out of the index and sitemap. */
export interface JournalPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  cover: ImageKey;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  draft: boolean;
  /** The service this article links back to (§11.3 internal linking). */
  service: ServiceSlug;
}

export const journalPosts: JournalPost[] = [
  {
    slug: "what-to-wear-to-a-kenyan-wedding",
    title: "What to wear to a Kenyan wedding, as a guest",
    description:
      "Colours, fabrics, shoes and the things worth avoiding — a practical guest guide for Kenyan weddings, from ceremony to reception.",
    category: "Occasion",
    cover: "pleated-poppy-midi-skirts-arch",
    publishedAt: "2026-10-12",
    readTime: "8 min read",
    draft: false,
    service: "occasion-styling",
  },
  {
    slug: "edit-your-wardrobe-in-a-weekend",
    title: "How to edit your wardrobe in a weekend",
    description:
      "A calm, step-by-step wardrobe edit you can do in two days — what to keep, what to release and how to restyle what remains.",
    category: "Wardrobe",
    cover: "sky-blue-ruched-shirt",
    publishedAt: "2026-10-05",
    readTime: "9 min read",
    draft: false,
    service: "wardrobe-edit",
  },
  {
    slug: "capsule-wardrobe-for-nairobi-women",
    title: "A capsule wardrobe for Nairobi women: 20 pieces, 40 outfits",
    description:
      "How to build a versatile Nairobi capsule that moves from office to church to wedding guest — with a practical piece list and outfit maths.",
    category: "Wardrobe",
    cover: "navy-gold-button-blazer-white-trousers",
    publishedAt: "2026-09-28",
    readTime: "10 min read",
    draft: false,
    service: "personal-shop",
  },
  {
    slug: "kitchen-party-send-off-outfits",
    title: "Kitchen party & send-off outfit ideas that photograph beautifully",
    description:
      "Comfortable, photogenic outfit ideas for kitchen parties, send-offs and the family photos that follow.",
    category: "Occasion",
    cover: "burgundy-floral-shirt-pants-set-dipstyle",
    publishedAt: "2026-10-20",
    readTime: "7 min read",
    draft: true,
    service: "occasion-styling",
  },
  {
    slug: "dress-for-your-body-type",
    title: "Dress for your body type: a kind, practical guide",
    description:
      "A practical guide to dressing your shape without rules that make you feel wrong — proportion, fit and the details that matter.",
    category: "Style",
    cover: "oatmeal-belted-pantsuit-entrance",
    publishedAt: "2026-10-20",
    readTime: "9 min read",
    draft: true,
    service: "wardrobe-edit",
  },
  {
    slug: "personal-stylist-vs-personal-shopper",
    title: "Personal stylist vs personal shopper vs image consultant",
    description:
      "What each one actually does, how they differ and which one you need for a wardrobe edit, an occasion or a full image reset.",
    category: "Styling",
    cover: "suited-duo-black-cornflower-office",
    publishedAt: "2026-10-20",
    readTime: "6 min read",
    draft: true,
    service: "wardrobe-edit",
  },
  {
    slug: "last-minute-outfit-express-look",
    title: "Last-minute outfit? How The Express Look works",
    description:
      "What to send, how short notice works and how a complete outfit is sourced when the event is already this week.",
    category: "Services",
    cover: "tangerine-ruffle-mini-dress-nairobi",
    publishedAt: "2026-10-20",
    readTime: "5 min read",
    draft: true,
    service: "express-look",
  },
  {
    slug: "office-outfits-for-ladies-in-nairobi",
    title: "Office outfits for ladies in Nairobi that don't feel boring",
    description:
      "Tailoring, colour and the finishing details that make weekday dressing feel considered rather than corporate.",
    category: "Style",
    cover: "cornflower-blue-belted-pantsuit",
    publishedAt: "2026-10-20",
    readTime: "7 min read",
    draft: true,
    service: "personal-shop",
  },
];

export const publishedPosts = journalPosts
  .filter((post) => !post.draft)
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export function getPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
