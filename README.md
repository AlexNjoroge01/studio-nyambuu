# Nyambura Mbugua — Fashion & Styling

A marketing website for **Nyambura Mbugua**, a Nairobi-based personal stylist and
fashion boutique. It presents four styling services and The Collection, a
lookbook, a journal and a WhatsApp-first enquiry flow.

There is no cart, checkout, account, price or database. Everything is static,
fast and editable from the repo.

- **Framework:** Next.js 16.4.2 (App Router, TypeScript, Turbopack)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Motion:** Framer Motion
- **Content:** TypeScript data files in `content/` + MDX journal articles
- **Forms:** React Hook Form + Zod, Sonner feedback, prefilled WhatsApp handoff
- **Deploy target:** Vercel

> **Note on versions:** the blueprint specified Next.js 16.4.1; the installed
> scaffold shipped 16.4.2 (a patch release) and the build is verified on it.
> No APIs or conventions from 16.4.1 are affected.

---

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Script                  | What it does                                              |
| ----------------------- | --------------------------------------------------------- |
| `pnpm dev`              | Local development server                                   |
| `pnpm build`            | Production build (static pages + OG routes)                |
| `pnpm start`            | Serve the production build                                 |
| `pnpm lint`             | ESLint                                                     |
| `pnpm typecheck`        | `tsc --noEmit`                                             |
| `pnpm optimize:images`  | Rebuild `public/images/` + `lib/image-manifest.ts`         |
| `pnpm fetch:unsplash`   | Re-download the Unsplash source files into `assets-src/`   |
| `pnpm format`           | Prettier                                                   |

---

## Where everything lives

```
app/                     routes (one folder per page)
  services/[slug]/       one template → four service pages
  journal/[slug]/        MDX article route
  llms.txt/              AI-readable site summary (route handler)
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx
content/                 all editable copy and structured data
  services.ts            the four services (name, promise, inclusions, FAQ, CTA)
  collection.ts          The Collection categories and pieces
  lookbook.ts            lookbook images, tags and captions
  occasions.ts           home-page occasions carousel
  faq.ts                 FAQ questions and answers
  journal/index.ts       journal metadata (title, cover, draft flag, service link)
  journal/*.mdx          article bodies
  home.ts about.ts how-it-works.ts contact.ts privacy.ts
components/
  layout/                header, footer, mobile nav, breadcrumbs, credits
  sections/              reusable page sections (hero, cards, CTA, FAQ…)
  media/                 SiteImage, galleries, lightbox, owner photo
  motion/                Reveal, SplitHeading, Parallax, Marquee, Magnetic…
  forms/                 contact form (RHF + Zod)
  ui/                    shadcn/ui components (all installed)
lib/
  site.ts                ← brand, contact, navigation, URL (start here)
  seo.ts                 metadata + canonical/OG helpers
  schema.ts              JSON-LD builders
  image-manifest.ts      GENERATED — do not edit by hand
assets-src/              original photos (not shipped)
public/images/           optimised WebP output (shipped)
scripts/                 image pipeline
```

### Editing copy

Almost all text lives in `content/*.ts`. Change it there, not in components.
Brand name, tagline, contact details, navigation and the canonical URL live in
`lib/site.ts`.

### Contact details

Edit `site.contact` in `lib/site.ts` (email, phone, WhatsApp number, `tel:`
href). The number appears in the header CTA, contact page, footer and every
WhatsApp link, so one edit updates the whole site.

---

## Images

Every photo is served through `next/image` via `<SiteImage />` from the
generated manifest — never hot-linked, never a raw multi-megabyte original in
`public/`.

**To add or replace a photo:**

1. Drop the original into `assets-src/clothes/` (studio photography) or
   `assets-src/unsplash/` (licensed stock).
2. Add an entry to the metadata table in `scripts/optimize-images.mjs`: `file`,
   `name` (becomes the key), `alt`, `focal` point, `tags`, and a `credit` URL for
   Unsplash.
3. Run `pnpm optimize:images`. This writes WebP files into `public/images/` and
   regenerates `lib/image-manifest.ts` (keys, dimensions, blur placeholders,
   alt text).
4. Reference the new key: `<SiteImage name="your-key" />`.

Images are resized to a maximum of 2400px, converted to WebP at quality 82, and
given a tiny inline blur placeholder automatically.

**Licensing note:** 9 of the 10 Unsplash photos in the brief are used and
credited in the footer. The tenth (`Wks9DXr1vRs` — sunglasses and hair
accessories on white) is an **Unsplash+ premium** image that returns HTTP 401
without a paid subscription, so it is intentionally not downloaded or shipped.
See `TODO-client.md` for the options.

---

## Adding a journal article

1. Create `content/journal/your-slug.mdx` — plain Markdown/MDX body, no
   frontmatter (metadata lives in the index).
2. Add an entry to `content/journal/index.ts` with `slug`, `title`,
   `description`, `category`, `cover` (an image key), `publishedAt`,
   `readTime`, `draft` and the related `service`.
3. If it is ready to publish, set `draft: false` **and** add it to
   `articleImports` in `app/journal/[slug]/page.tsx`.
4. Drafts (`draft: true`) automatically disappear from the journal index, the
   sitemap and the static params.

Five draft outlines are included in `content/journal/` with metadata already
written; they are hidden until the copy is finished and `draft` is set to
`false`.

---

## Environment variables

Create `.env.local` for development and set the same values in Vercel:

| Variable               | Required | Purpose                                                 |
| ---------------------- | -------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Yes      | Canonical origin, used in metadata, sitemap and JSON-LD |
| `RESEND_API_KEY`       | Optional | Emails each enquiry to the studio via Resend            |

Without `RESEND_API_KEY` the form still validates, still opens a prefilled
WhatsApp message, and simply skips the email step. Nothing is stored in a
database.

A template is included as `.env.example`.

---

## Deploying to Vercel

1. Push the repo to GitHub and import it in Vercel.
2. Framework preset: **Next.js**. Build command `pnpm build`, output handled
   automatically.
3. Add `NEXT_PUBLIC_SITE_URL=https://<your-domain>` (and `RESEND_API_KEY` if
   email is wanted) to Production and Preview.
4. Deploy. The `*.vercel.app` URL works immediately.
5. When the client buys a domain: add it in Vercel → Domains, follow the DNS
   instructions (A record for the apex, CNAME for `www`), update
   `NEXT_PUBLIC_SITE_URL`, redeploy, then resubmit the sitemap. If the
   `vercel.app` URL should redirect, add a 301 in Vercel → Domains.

### SEO setup the client must do

These are off-site and cannot be automated from the codebase:

1. **Google Business Profile** — create/claim the listing as a personal stylist
   / clothing service in Nairobi. Add the new website URL, photos, hours and
   service area.
2. **Google Search Console** — add the domain, verify via DNS TXT record, submit
   `https://<domain>/sitemap.xml`.
3. **Bing Webmaster Tools** — import from Search Console (or verify separately)
   and submit the same sitemap.
4. Keep the name, phone and area served **identical** everywhere (site, GBP,
   Instagram, directories) — this is what local search rewards.
5. Ask for genuine Google reviews once the first clients are served. The site
   ships with **no testimonials** on purpose; add real ones only.

---

## Built-in SEO / AI-search layer

- Per-page `title`, `description`, canonical and Open Graph/Twitter metadata.
- `app/sitemap.ts` — published pages only (drafts excluded).
- `app/robots.ts` — allows all crawlers, explicitly allows GPTBot,
  OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot,
  Google-Extended and Applebot-Extended.
- `app/llms.txt/route.ts` — plain-text summary of services, location and key
  pages for AI assistants.
- JSON-LD: `Organization`, `ClothingStore`/`ProfessionalService`, `Person`,
  `Service`, `FAQPage`, `Article`, `BreadcrumbList` and `ImageObject`.
- `app/manifest.ts`, generated OG images, `app/icon.svg`.

---

## Accessibility & performance

- Skip link, semantic landmarks, visible cobalt focus rings, 44px touch targets.
- Carousel, lightbox, menus and the contact form are keyboard operable.
- `prefers-reduced-motion` disables the motion kit.
- Every image has alt text, explicit dimensions and a blur placeholder; the hero
  image is prioritised, everything below the fold is lazy.
- Body copy is 17–18px on mobile in full-opacity ink for legibility.
- Light mode only by design (`color-scheme: light`).

Run `pnpm build` and check the route table before shipping. Lighthouse mobile
targets: Performance ≥ 90, Accessibility / Best Practices / SEO ≥ 95, CLS < 0.1.

---

## Known limitations

- The tenth Unsplash photo is premium and omitted (see above).
- Instagram links are hidden until a real handle is supplied in `lib/site.ts`.
- No street address is published; the business is described by service area
  only, which is the correct pattern for a home-based styling studio.
- Owner photography uses a branded placeholder until real portraits are
  supplied (`public/images/owner.jpg`).

Everything the client needs to confirm or supply is listed in
[`TODO-client.md`](./TODO-client.md).
