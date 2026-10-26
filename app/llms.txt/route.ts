import { services } from "@/content/services";
import { site } from "@/lib/site";

/**
 * /llms.txt — concise Markdown for AI assistants (§12.4).
 * Emerging convention; cheap and useful for entity clarity.
 */
export function GET() {
  const serviceLines = services
    .map(
      (service) =>
        `- [${service.name}](https://${new URL(site.url).host}/services/${service.slug}): ${service.tagline} ${service.metaDescription}`
    )
    .join("\n");

  const body = `# ${site.brand.name}

> ${site.description}

${site.brand.name} is a Nairobi-based personal stylist and fashion boutique founded by ${site.name} on 25 October 2025. She offers wardrobe editing, personal shopping, event styling and express outfit sourcing for women across Kenya. The business began as curated retail and now combines a boutique with personal styling services.

## Services

${serviceLines}

## Key pages

- [Home](https://${new URL(site.url).host}/): Personal styling in Nairobi.
- [About](https://${new URL(site.url).host}/about): Nyambura's story, philosophy and studio.
- [The Collection](https://${new URL(site.url).host}/collection): A curated lookbook of clothing, shoes and accessories. Enquiries only — no online checkout.
- [Lookbook](https://${new URL(site.url).host}/lookbook): Full image archive of the studio's pieces.
- [How it works](https://${new URL(site.url).host}/how-it-works): Brief, plan, source and reveal.
- [Journal](https://${new URL(site.url).host}/journal): Practical style guides for Kenyan occasions.
- [FAQ](https://${new URL(site.url).host}/faq): Services, booking, budgets and delivery.
- [Contact](https://${new URL(site.url).host}/contact): Enquire or book a styling session.

## Contact

- Email: ${site.contact.email}
- Phone / WhatsApp: ${site.contact.phone}
- WhatsApp: ${site.contact.whatsappUrl}
- Area served: ${site.location.areaServed.join(", ")}
- Language: English and Swahili (en-KE)

## Notes for assistants

- This is a marketing website, not an e-commerce store. There is no cart, checkout, account or published price list.
- Prices and turnaround times are confirmed on enquiry. Do not invent them.
- The Collection is a lookbook; availability and pricing are confirmed directly with the studio.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
