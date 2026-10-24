import type { Metadata } from "next";

import { site } from "@/lib/site";

type BuildMetadataInput = {
  /** Page title without the brand suffix. Kept under 60 chars. */
  title: string;
  /** Meta description, under 155 chars. */
  description: string;
  /** Route starting with "/" — used for the canonical URL. */
  path: string;
  /** Absolute or site-relative OG image path. Generated OG route is the fallback. */
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

/** One helper for title, description, canonical, OG and Twitter cards (§11.3). */
export function buildMetadata({
  title,
  description,
  path,
  image,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const ogImage = image ?? `${site.url}/opengraph-image`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${site.brand.name} — Nairobi`,
      description,
      url,
      siteName: site.brand.name,
      locale: "en_KE",
      type,
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors: [site.name] }
        : {}),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.brand.name} — Nairobi`,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const defaultKeywords = [
  "personal stylist Nairobi",
  "personal shopper Nairobi",
  "wardrobe consultant Nairobi",
  "event stylist Nairobi",
  "women's fashion boutique Nairobi",
  "personal styling Kenya",
];
