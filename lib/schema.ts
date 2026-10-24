import type { Service } from "@/content/services";
import type { JournalPost } from "@/content/journal";
import { imageManifest } from "@/lib/image-manifest";
import { site } from "@/lib/site";

const ORG_ID = `${site.url}/#organization`;
const LOCAL_ID = `${site.url}/#localbusiness`;

/** Site-wide Organization + LocalBusiness (§11.4). No street address — service area only. */
export function organizationSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORG_ID,
      name: site.brand.name,
      url: site.url,
      logo: `${site.url}/icon.svg`,
      image: `${site.url}/opengraph-image`,
      description: site.description,
      email: site.contact.email,
      telephone: site.contact.phone,
      foundingDate: site.established,
      areaServed: site.location.areaServed.map((name) => ({
        "@type": "Place",
        name,
      })),
      sameAs: [site.social.instagram, site.social.tiktok, site.social.pinterest].filter(
        Boolean
      ),
    },
    {
      "@context": "https://schema.org",
      "@type": ["ClothingStore", "ProfessionalService"],
      "@id": LOCAL_ID,
      name: site.brand.name,
      url: site.url,
      image: `${site.url}/opengraph-image`,
      logo: `${site.url}/icon.svg`,
      description: site.description,
      email: site.contact.email,
      telephone: site.contact.phone,
      foundingDate: site.established,
      priceRange: "KES",
      areaServed: site.location.areaServed.map((name) => ({
        "@type": "Place",
        name,
      })),
      knowsAbout: [
        "Personal styling",
        "Wardrobe editing",
        "Personal shopping",
        "Event styling",
        "Wardrobe planning",
      ],
      sameAs: [site.social.instagram, site.social.tiktok, site.social.pinterest].filter(
        Boolean
      ),
      /** No postal address published — service-area business only (§11.4). */
    },
  ];
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.metaDescription,
    serviceType: service.name,
    provider: {
      "@type": "LocalBusiness",
      "@id": LOCAL_ID,
      name: site.brand.name,
      url: site.url,
      telephone: site.contact.phone,
    },
    areaServed: site.location.areaServed.map((name) => ({
      "@type": "Place",
      name,
    })),
    url: `${site.url}/services/${service.slug}`,
    image: `${site.url}/opengraph-image?title=${encodeURIComponent(service.name)}`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "KES",
      description: "Enquire for a quote",
    },
  };
}

export type BreadcrumbItem = { name: string; href: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.href === "/" ? "" : item.href}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(post: JournalPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: site.name,
      url: `${site.url}/about`,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: site.brand.name,
      url: site.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/journal/${post.slug}`,
    },
    image: `${site.url}${imageManifest[post.cover].src}`,
    articleSection: post.category,
    inLanguage: "en-KE",
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Personal Stylist & Fashion Curator",
    url: `${site.url}/about`,
    email: site.contact.email,
    telephone: site.contact.phone,
    worksFor: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: site.brand.name,
    },
    areaServed: "Nairobi, Kenya",
    knowsAbout: [
      "Personal styling",
      "Wardrobe editing",
      "Personal shopping",
      "Event styling",
      "Capsule wardrobes",
    ],
  };
}

export function imageObjectSchema(params: {
  url: string;
  caption: string;
  width: number;
  height: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: `${site.url}${params.url}`,
    url: `${site.url}${params.url}`,
    name: params.caption,
    caption: params.caption,
    width: params.width,
    height: params.height,
  };
}
