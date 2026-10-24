# BLUEPRINT — Nyambura Mbugua · Fashion & Styling Marketing Website

> **Baseline44 Community Empowerment Initiative — Client #2**
> A marketing-only website. **Not e-commerce.** No cart, no checkout, no accounts, no database.
> The site exists to make women *want to book a styling session* and to make Nairobi (and Google, and AI assistants) find her.

**Read this whole file before writing code. Follow the build order in §16. Do not skip the acceptance checklist in §17.**

---

## 0. Ground rules for the coding agent

1. **Use the images.** The project already has 15+ clothing photos in `/public` (see §6). Every page, every offering, every section should be image-led. Unsplash links in §6.3 cover accessories/shoes/bags/jewellery. This is an image-heavy site; type sits quietly around the pictures.
2. **Marketing only.** Every call-to-action leads to *enquire / book a consultation* (WhatsApp, email, contact form). Nothing is "added to cart". Items in "The Collection" are shown as a curated lookbook with an "Enquire about this piece" action, **not** prices or stock.
3. **Do not invent facts.** No fake testimonials, fake follower counts, fake prices, fake addresses, fake awards. Where real content is missing, render a clearly marked `TODO(client)` in the content files (not on the live UI) and hide the section until content exists.
4. **Design must feel expensive and alive at the same time.** Generous white space + thin elegant type + sudden bursts of bright colour and motion. See §5.
5. **Verify against the installed Next.js version's docs** whenever an API looks unfamiliar. Next.js 16 changed several defaults (async request APIs, Turbopack, image defaults).
6. Ship accessible, fast, mobile-first. Most visitors will arrive from Instagram/WhatsApp on a phone in Kenya, often on mobile data.

---

## 1. Client brief (source of truth)

| Field | Value |
|---|---|
| Owner | Nyambura Mbugua |
| Email | jmsnyambz@gmail.com |
| Phone / WhatsApp | +254 728 654 867 (WhatsApp link: `https://wa.me/254728654867`) |
| Business type | Fashion & Styling |
| Location | Nairobi, Kenya |
| Established | 25 October 2025 |
| Brand name | **Placeholder: "Nyambura Mbugua"** — client has not given a trading name. Keep in `lib/site.ts` as `brand.name` so one edit changes everywhere. Confirm with client before launch. |
| Audience | Women: busy professionals, brides/bridesmaids/guests, event-goers, women rebuilding their wardrobe, Gen-Z and millennial women who love fashion |

**Her words (use as the brand voice, paraphrase don't copy verbatim into legal-style blocks):**
She sells carefully selected, chic, classy, stylish, timeless pieces: clothing, shoes and accessories that help women express individuality. Over the past year the main service was retail. She is now expanding into personal styling and shopping so women can build functional, versatile wardrobes that reflect who they are, suit their body type, and match how they want to look and feel.

**Offerings (every one needs a full, image-rich presence):**

1. **Wardrobe styling & editing** — identify and remove pieces that no longer suit body type, lifestyle, preferences or desired image.
2. **Personal shopping** (clothing, shoes, accessories) — intentional purchases that complement the existing wardrobe, restyle for different occasions, and stay relevant over time.
3. **Event styling** — outfits for formal events, special celebrations, professional meetings and social gatherings.
4. **Express styling errand service** — for busy clients who need a look at short notice. Client shares desired look, occasion, measurements and preferences; she sources a complete coordinated outfit (clothing, shoes, accessories) ready for the occasion. Eliminates decision fatigue and saves time.
5. **Curated retail** — the original business: clothing, shoes, accessories (shown as "The Collection").

**Brand promise (one line to reuse):** *Dressing well, made simpler and more intentional.*

---

## 2. Tech stack (fixed)

| Layer | Choice |
|---|---|
| Framework | **Next.js 16.4.1**, App Router, React 19, Turbopack (default) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS (current major that `create-next-app` installs) |
| UI components | **shadcn/ui — install ALL components** (`npx shadcn@latest add --all`) |
| Icons | Lucide React |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| Toasts | Sonner |
| Email (optional) | Resend + React Email — only for the contact form fallback (§9) |
| Hosting | Vercel (free hosted link; custom `.co.ke` domain later) |
| Image tooling | `sharp` (dev dependency, build-time scripts) |

**Deliberately NOT used on this project** (the standard stack includes them, but this is a marketing-only site, so adding them would be dead weight): Prisma, PostgreSQL, NextAuth, Zustand, TanStack Query, Cloudinary, Vercel Cron. Content lives in typed TypeScript files and MDX. If the client later wants a CMS or bookings, that is a separate phase.



---

## 3. Information architecture & routes

```
/                          Home
/about                     Her story + philosophy
/services                  Overview of all 4 styling services
/services/wardrobe-edit    Wardrobe styling & editing
/services/personal-shop    Personal shopping
/services/occasion-styling Event styling
/services/express-look     Express styling errand
/collection                "The Collection" — clothing / shoes / accessories lookbook (tabs)
/lookbook                  Full-bleed image gallery (masonry), filterable
/how-it-works              Process: consult → plan → source → reveal
/journal                   Short style guides for SEO (MDX, static)
/journal/[slug]            Article
/faq                       Accordion FAQ (also feeds FAQ schema)
/contact                   Enquiry / book a consultation
/privacy                   Short privacy note
/not-found, /loading       Branded
sitemap.xml, robots.txt, llms.txt, manifest.webmanifest, opengraph-image (generated)
```

- `params` and `searchParams` are **Promises** in this Next version. `await` them in pages, layouts and `generateMetadata`.
- Use `generateStaticParams` for `/services/[slug]` and `/journal/[slug]` so everything is statically generated.
- Every non-home page renders **breadcrumbs** (shadcn `Breadcrumb`) and emits `BreadcrumbList` JSON-LD.

---

## 4. shadcn/ui: install everything, use it deliberately

Install all. Use at least the following in real places (not decorative demos):

| Component | Where |
|---|---|
| `Breadcrumb` | Top of every inner page |
| `Tooltip` | Icon buttons, service chips, gallery hover hints, "what's included" info icons, social links |
| `Badge` | "Most booked", "Same-day", "By appointment", category tags on gallery, service chips |
| `Button` | All CTAs (custom variants: `ink`, `sun`, `cobalt`, `outline-thin`) |
| `NavigationMenu` | Desktop header with Services mega-dropdown (image thumbnails per service) |
| `Sheet` | Mobile menu (full-height, big thin serif links) |
| `Accordion` | FAQ, "what's included", process details |
| `Tabs` | Collection (Clothing / Shoes / Accessories), Services detail (Overview / Included / Good for) |
| `Carousel` | Home: occasions slider; service pages: related looks |
| `Card` | Service cards, journal cards |
| `AspectRatio` | Every image frame for stable layout |
| `HoverCard` | Lookbook item preview with caption + "Enquire" |
| `Dialog` / `Drawer` | Lookbook lightbox (Dialog desktop, Drawer mobile) |
| `Form`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Calendar`, `Popover`, `Label` | Contact / booking enquiry |
| `Toggle` / `ToggleGroup` | Lookbook filter (All / Clothes / Shoes / Accessories / Occasion) |
| `Separator` | Hairline dividers (1px, ink at 12% opacity) |
| `Skeleton` | Image placeholders / loading states |
| `ScrollArea` | Horizontal chip rows on mobile |
| `Progress` | Thin scroll-progress bar under header |
| `Sonner` | Form success/error |
| `Avatar` | About page, testimonials (only when real) |
| `Collapsible`, `Command`, `Sidebar`, `Resizable`, etc. | Installed; use only where they make sense. Don't force them. |

Customise the shadcn theme (`globals.css` CSS variables) to the palette in §5.2 so everything inherits the brand.

---

## 5. Design system — the UI/UX brief

### 5.1 Concept: **"Editorial white, loud colour."**
Think a high-end fashion magazine that got a Gen-Z creative director. The page is a **white gallery wall**: huge margins, thin tall serif headlines, tiny uppercase labels, hairline rules. The photographs are the art, and most are **landscape**, so we lean into wide frames, full-bleed bands and asymmetrical layouts. Then colour *detonates*: a sunshine-yellow marquee, a cobalt block behind a heading, a tangerine sticker that spins, a vermilion hover state. White space is the luxury; colour is the courage.

**Ratio rule:** ~70% white/space, ~20% photography, ~10% colour pops. Never colour-wash a whole section except the deliberate "colour break" bands (one per page max).

### 5.2 Colour tokens
Colours are drawn from the photos (whites, yellows, blues, oranges, reds, browns).

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#FFFFFF` | Page background (default) |
| `--cream` | `#FFF8EE` | Rare soft panel, behind image collages |
| `--ink` | `#17110D` | Text, thin rules, primary button |
| `--cocoa` | `#5B3A29` | Secondary text, brown accents |
| `--sun` | `#FFC800` | Yellow: marquee, highlights, stickers |
| `--cobalt` | `#1F3BFF` | Blue: headings emphasis, links, focus |
| `--tangerine` | `#FF7A1A` | Orange: hover, badges, shapes |
| `--vermilion` | `#F0301E` | Red: CTAs on colour breaks, accents |

**Per-service accent** (used for the underline, badge, big number, hover glow on that service's page and card):
Wardrobe Edit → cobalt · Personal Shop → tangerine · Occasion Styling → vermilion · Express Look → sun · The Collection → cocoa.

Map these to shadcn variables (`--primary: ink`, `--accent: sun`, `--ring: cobalt`, etc.). Text on `--sun` and `--tangerine` is **ink**, never white (contrast). Text on cobalt/vermilion/ink is white. Check WCAG AA on every pairing.

### 5.3 Typography (thin, long, classy)
Load with `next/font/google` (self-hosted, no layout shift):

- **Display:** `Cormorant Garamond` — weights 300/400, **italic** for emphasis. Tall, thin, elegant. Headlines are *large* (clamp up to ~9rem hero), tight leading (0.9–1.0), slightly negative tracking.
- **Body/UI:** `Jost` — weights 200/300/400. Geometric, light, long letterforms.
- **Labels:** Jost 400, **uppercase, letter-spacing 0.22em**, 11–12px. Used for eyebrows, nav, badges, captions.

Pattern: one word per heading in *italic + colour* (e.g. "Dress with *intention*" with "intention" in cobalt italic). Numbers (01, 02, 03) in huge outlined thin serif.
Never use bold weights above 500. Elegance comes from size contrast, not weight.

### 5.4 Layout & space
- 12-col grid, max content width ~1440px, **side padding `clamp(20px, 6vw, 96px)`**.
- Section vertical rhythm: `py-24 md:py-40` (yes, that much air). Let images breathe; never crowd.
- Use **asymmetry**: offset images, overlap a thin heading onto a photo edge, stagger a 3-image row with different heights, rotate a sticker −8°.
- Landscape photos: use `AspectRatio` 3/2, 16/9 or 21/9 for bands; for portrait slots, crop with `object-position` chosen per image so the garment/face is never cut off (see manifest `focal` in §6.2).
- Borders: 1px hairlines at 12% ink. Radius: images **0px or large pill/arch** (arched-top image frames are a signature shape; use sparingly); buttons are pills.
- Signature shapes (inline SVG, reusable): arch frame, circle sticker with rotating text ("BOOK YOUR STYLING SESSION •"), thick wavy underline, 4-point sparkle.

### 5.5 Motion system (Framer Motion) — smooth, never janky
Global easing: `[0.22, 1, 0.36, 1]` (expo-out). Durations: micro 0.25s, reveal 0.8–1.1s, hero 1.4s.

Build a small `components/motion/` kit and reuse it:

| Primitive | Behaviour |
|---|---|
| `<Reveal>` | Fade + 24px rise on enter viewport (`once`, margin −10%) |
| `<SplitHeading>` | Headline reveals line-by-line (mask, translateY 100% → 0), stagger 0.08s |
| `<ImageReveal>` | Image unveils with `clip-path: inset(0 0 100% 0) → inset(0)` plus subtle scale 1.15 → 1 |
| `<Parallax>` | `useScroll` + `useTransform`, images drift ±8% against scroll (landscape bands) |
| `<Marquee>` | Infinite horizontal text/image ticker (CSS transform loop; pause on hover) |
| `<Magnetic>` | CTA button follows cursor within ~12px (desktop only) |
| `<Stagger>` | Parent/child variants for grids and chip rows |
| `<CountUp>` | Only for **real** numbers (don't use if none) |
| Scroll progress | Thin `Progress` bar in header tied to `scrollYProgress` |
| Page transitions | `app/template.tsx` fade/slide 0.4s |
| Custom cursor | Desktop only: small ink dot that grows into a "View" circle over lookbook images |
| Hover | Images scale 1.04 with colour-tinted caption slide-up; nav links get animated thin underline |

Rules: respect `prefers-reduced-motion` (disable parallax, marquee speed → 0, keep fades). Animate only `transform` and `opacity` (plus `clip-path` on reveals). No layout-shifting animation. Hero animation must not delay LCP: the hero image is visible immediately; text animates in.

### 5.6 Components with personality
- **Header:** transparent over hero, becomes white with a hairline on scroll. Left: wordmark in Cormorant italic. Centre: `NavigationMenu`. Right: pill CTA "Book a Session" + WhatsApp icon (Tooltip: "Chat on WhatsApp").
- **Marquee band:** sun-yellow strip, thin uppercase ink text: `WARDROBE EDIT ✦ PERSONAL SHOP ✦ OCCASION STYLING ✦ EXPRESS LOOK ✦ THE COLLECTION ✦`. Appears once on Home between hero and services, once above footer.
- **Footer:** big thin serif "Dress *intentionally.*", nav, contact, social, ©, "Website by Baseline44 community initiative" (small, links to https://www.baseline44.com/), Unsplash photographer credits link (see §6.3).
- **Floating WhatsApp button:** bottom-right pill on mobile; hides on `/contact`.
- **Sticker:** circular rotating "Book now" badge overlapping hero image corner, links to /contact.

---

## 6. Images: the backbone of the site

### 6.1 Sources
- **Clothes (and any shoes/accessories already there):** the scaffolded project's `/public` folder (15+ images, mostly landscape, categorised into folders such as clothes / shoes / accessories). **Use these as the primary imagery everywhere.** First run `view`/`ls` over `/public` recursively and open each image. Do not assume filenames.
- **Accessories, jewellery, bags, shoes (heels), watches, flat-lays:** the Unsplash photos in §6.3.

### 6.2 Optimisation pipeline (required, do this first)
Originals are large. Do **not** serve them as-is.

1. Move untouched originals to `/assets-src/` (outside `/public`, committed or gitignored per size).
2. Create `scripts/optimize-images.mjs` using `sharp`:
   - Resize to max **2400px** on the long edge (never upscale), export **WebP q≈82** (and let `next/image` produce AVIF/WebP variants at request time) into `/public/images/{clothes|shoes|accessories}/`.
   - Strip metadata, keep sRGB.
   - Generate a **20px blur placeholder** (base64) per image.
   - Write `lib/image-manifest.ts` with, per image: `src`, `width`, `height`, `blurDataURL`, `category`, `alt`, `focal` (`"50% 30%"` etc.), `tags` (colour, occasion, mood), `credit` (for Unsplash).
3. Write **descriptive alt text** per image after looking at it (garment, colour, setting, e.g. "Woman in a tangerine wrap dress on a sunlit balcony"). Alt text doubles as image SEO.
4. Add `"optimize:images": "node scripts/optimize-images.mjs"` and run it as part of `prebuild` only if sources changed (otherwise commit outputs).
5. In `next.config.ts`: `images.formats = ["image/avif", "image/webp"]`. If you use `quality` values other than the default, declare them in `images.qualities` (Next 16 requirement — check the installed version's docs).
6. Usage rules: always use `next/image` with explicit `sizes` (e.g. `"(min-width:1024px) 50vw, 100vw"`), `placeholder="blur"` using the manifest blur, `priority` **only** for the Home hero image (and the hero of each inner page), `loading="lazy"` for the rest. Never use CSS background-images for content photos.
7. Budget: Home page total image transfer on mobile first load < ~600KB; hero image < ~150KB at its served size.

### 6.3 Unsplash accessories (download at build-prep time, don't hot-link)
Photo IDs are the last segment of each URL. Download with a script (`scripts/fetch-unsplash.mjs`) using `https://unsplash.com/photos/<ID>/download?force=true`, save the originals to `/assets-src/unsplash/<ID>.jpg`, then run them through the optimiser into `/public/images/accessories/` (or `/shoes/` for heels). If the network call fails, tell the user to download the files manually into `/assets-src/unsplash/` and continue.

| ID | Subject | Best used for |
|---|---|---|
| `uf_IDewI6iQ` | Gold & silver jewellery collection | Collection → Accessories hero, Personal Shop section |
| `aXJdmnxauwY` | Tortoiseshell sunglasses + beaded brown necklace | Accessories grid, Express Look "complete the look" |
| `Wks9DXr1vRs` | Sunglasses & hair accessories on white | Accessories grid, white-space-friendly hero tile |
| `9THwaaH18rI` | Brown leather sling bag | Collection → Bags, Wardrobe Edit "investment pieces" |
| `O1DhTK0_1iQ` | Gold Milanese-band watch | Occasion Styling (professional meetings), accessories |
| `u8bTCVoJCP8` | Black heels + black purse | Collection → Shoes, Occasion Styling (formal events) |
| `Ibrpih7rb4M` | Necklace close-up | Jewellery macro band, journal covers |
| `vrC1YU4auBE` | Earrings on white case | Jewellery tile, contact page |
| `b4r2ygkK8Wc` | Clothing & accessories laid out on a bed | **Wardrobe Edit** hero, **Express Look** ("outfit laid out, ready") |
| `qjDtBPIxRL4` | Woman showing jewellery, checking wristwatch | **Home hero secondary**, About page, Occasion Styling |

**Attribution:** Unsplash licence doesn't require credit but it's good practice. Store photographer names in the manifest `credit` field (look them up on each photo page) and add a small "Photo credits" link in the footer opening a `Dialog` list.

### 6.4 Where images go (marketing placement plan)
Every offering gets: a full-bleed hero image, a 3-image editorial strip, and an "outfit moment" gallery. Pick from the real clothes first; use Unsplash for the accessory layer.

| Page / Section | Image treatment |
|---|---|
| **Home hero** | One huge landscape clothes photo (priority) offset to the right with an arch-cropped smaller portrait-ish crop overlapping bottom-left; rotating sticker; giant thin headline |
| Home → "Four ways we dress you" | 4 service cards, each a tall image with colour-tinted hover, number in outlined serif |
| Home → Marquee + "The Collection" teaser | 3 staggered images (clothes, shoes, accessories) with parallax |
| Home → "Occasions" | `Carousel` of wide cards (Wedding guest, Office, Date night, Church, Graduation, Cocktail) using clothes photos |
| Home → "Colour break" band | Full-bleed landscape image with sun/vermilion overlay block and one CTA |
| Home → Instagram-style grid | 6-tile mosaic from the manifest (links to /lookbook) |
| **Wardrobe Edit** | Hero: `b4r2ygkK8Wc` flat-lay. Before/after style split using two clothes photos (conceptual "keep / let go / restyle" columns with `Badge`s) |
| **Personal Shop** | Hero: clothes landscape. Strips: shoes (`u8bTCVoJCP8`), bag (`9THwaaH18rI`), jewellery (`uf_IDewI6iQ`) labelled "Clothing · Shoes · Accessories" |
| **Occasion Styling** | Hero: `qjDtBPIxRL4`. Occasion tabs each swap the image and copy |
| **Express Look** | Hero: `b4r2ygkK8Wc` or clothes flat-lay. "Brief → Source → Delivered" three-step visual with a mock brief card (occasion, measurements, vibe) over the photo |
| **Collection** | `Tabs` Clothing / Shoes / Accessories; masonry grid; each item `HoverCard` with caption + "Enquire" |
| **About** | Portrait-ish crop from best clothes image + `qjDtBPIxRL4`; leave room for a real photo of Nyambura (placeholder component `OwnerPhoto` that swaps in when `/public/images/owner.jpg` exists) |
| **Lookbook** | Full masonry of **all** images, filter via `ToggleGroup`, lightbox via `Dialog`/`Drawer` |
| **Journal** | Each article cover is an image from the manifest |
| **Contact** | Earrings `vrC1YU4auBE` or a clean white-space clothes photo beside the form |
| **OG image** | Generated per page via `opengraph-image.tsx` using a hero crop |

Rule: **no image used more than twice site-wide** unless there aren't enough (15 clothes + 10 Unsplash = ~25 slots; reuse deliberately with different crops).

---

## 7. Page-by-page spec

### 7.1 Home (`/`)
1. **Hero** — Eyebrow: `PERSONAL STYLING · NAIROBI`. H1 (Cormorant 300, huge): "Dress with *intention.*" Sub (Jost 300): "Curated fashion, personal styling and shopping for women who want to look and feel like themselves, on purpose." CTAs: `Book a styling session` (ink pill) · `Explore the collection` (thin outline). Right: landscape hero image with arch overlap + rotating sticker. Subtle floating sparkles.
2. **Marquee** (sun yellow).
3. **Intro statement** — oversized thin paragraph on white, ~60 words, one phrase highlighted with a hand-drawn cobalt underline. Lots of air.
4. **Four ways we dress you** — 4 service cards (see §7.3 names), each: image, big outlined number, name, one-liner, `Badge`, arrow link.
5. **The Collection teaser** — three staggered parallax images + copy "Pieces chosen, never piled on." CTA to /collection.
6. **How it works** — 4 steps, horizontal on desktop, stacked on mobile, connected by a thin animated line that draws on scroll.
7. **Occasions carousel** — wide image cards with occasion names.
8. **Colour break** — full-bleed image band + giant white serif quote + CTA. (One per page max.)
9. **Why this works** — three short principles (Fit your body · Fit your life · Stay relevant) with Lucide icons in tiny circles.
10. **Testimonials** — render **only if** `content/testimonials.ts` has real entries.
11. **FAQ preview** — 4 accordion items → link to /faq.
12. **Final CTA** — enormous thin headline "Ready to *feel* like you?" + WhatsApp + Book buttons. Marquee, then footer.

### 7.2 Services overview (`/services`)
Hero with breadcrumb, intro line, then a **zig-zag list** of the four services (image left/right alternating, large number, what's included bullets, "For you if…", CTA). A comparison table (shadcn `Table`): Service · Best for · Turnaround · How it works. Close with the "not sure where to start?" CTA that suggests a free 15-minute chat *only if the client confirms she offers one* (otherwise "Book a consultation").

### 7.3 Service names (classy) & detail pages
| Slug | Display name | Tagline | Accent |
|---|---|---|---|
| `wardrobe-edit` | **The Wardrobe Edit** | Keep what loves you back. | cobalt |
| `personal-shop` | **The Personal Shop** | Intentional pieces, chosen for you. | tangerine |
| `occasion-styling` | **Occasion Styling** | Know exactly what to wear. | vermilion |
| `express-look` | **The Express Look** | A complete outfit. Zero decision fatigue. | sun |

Each detail page (shared template `ServicePage` fed by `content/services.ts`):
- Breadcrumb · Hero (full-bleed image, name, tagline, CTA, accent colour block)
- **What it is** (2–3 sentences from the brief, in her voice)
- **What's included** (`Accordion` or icon list) — derive *only* from the brief:
  - *Wardrobe Edit:* assess pieces against body type, lifestyle, preferences and desired image; identify what to remove; what to keep; how to restyle what remains.
  - *Personal Shop:* shopping for clothing, shoes and accessories; pieces that complement the existing wardrobe; versatile, restyle-able, long-lasting choices.
  - *Occasion Styling:* outfits for formal events, special celebrations, professional meetings, social gatherings.
  - *Express Look:* client shares desired look, occasion, measurements, preferences → complete coordinated outfit (clothing, shoes, accessories) sourced and ready.
- **Who it's for** (3 persona chips)
- **How it works** (3–4 steps, service-specific)
- **Image strip** (3 images, parallax)
- **Related services** (`Carousel`)
- **FAQ** (3–4 service-specific questions) + FAQ schema
- **CTA band**
Pricing: **do not show prices** unless client provides; use "Enquire for a quote".

### 7.4 The Collection (`/collection`)
Intro: "The original edit." `Tabs`: **Clothing · Shoes · Accessories** (accessories sub-filter: Jewellery, Bags, Sunglasses, Watches). Masonry/bento grid of images with tooltip-labelled hearts? **No hearts, no cart.** Each tile → `HoverCard` (caption, mood tags as `Badge`) + "Enquire about this piece" which opens `/contact?piece=<id>` (prefill the message) or WhatsApp with the image title. Closing band: "Don't see it? We'll source it." (links to Personal Shop).

### 7.5 Lookbook (`/lookbook`)
Full-bleed masonry, infinite-feeling, parallax columns on desktop. `ToggleGroup` filters. Click → lightbox (`Dialog` desktop / `Drawer` mobile) with prev/next, caption, tags and an "Enquire" button.

### 7.6 About (`/about`)
Her story (use the brief; established 25 Oct 2025; started with curated retail, grew into styling). Philosophy in 3 beats. Big pull-quote on colour band. `OwnerPhoto` slot. Values chips: Chic · Classy · Timeless · Intentional · True to you.

### 7.7 How it works (`/how-it-works`)
Four animated steps: **1 Brief** (tell us your look, occasion, measurements, preferences) → **2 Plan** (edit/plan around body type, lifestyle, budget) → **3 Source & style** → **4 Reveal & wear**. Each with an image, a `Badge` for typical effort ("You: 10 min"), tooltips for terms ("What's a capsule wardrobe?").

### 7.8 FAQ (`/faq`)
`Accordion`, grouped (Services · Booking · Shopping & budget · Delivery · Kenya-specific). Draft real-sounding questions, mark answers needing client confirmation with `TODO(client)` in the content file and keep those entries **out of the rendered list** until confirmed (or word them safely, e.g. "Reach out on WhatsApp and we'll confirm availability").

### 7.9 Contact (`/contact`)
Split layout: left is a calm white form, right is an image + direct contacts (WhatsApp, email, Instagram placeholder, "Serving Nairobi & across Kenya" — confirm).
Form fields (RHF + Zod): Name · Phone/WhatsApp · Email (optional) · Service (`Select`: the 4 services + "Not sure yet") · Occasion/date (`Calendar` in `Popover`) · Budget range (`RadioGroup`, ranges in KES; make optional) · Sizes/measurements (optional `Textarea`) · Message · Consent `Checkbox`.
See §9 for submit behaviour.

### 7.10 Journal (`/journal`) — SEO engine
MDX articles (static). Card grid with cover image, read time, `Badge` category. See §11.5 for launch titles. Each article has an author byline (Nyambura), published date, `Article` schema, internal links to the relevant service, and a closing CTA.

---

## 8. Content & voice
- **Voice:** warm, confident, a little cheeky, never snobby. Short sentences. Kenyan context welcome (weddings, send-offs, kitchen parties, church, office, graduation) without clichés. Light Sheng/Swahili sprinkles in microcopy are fine (e.g. "Karibu"), never in headings that matter for SEO.
- Write all copy in `content/*.ts` (typed), not inline in JSX.
- Placeholder strategy: a `TODO(client)` list generated at the end of the build (see §17) so the Baseline44 team can chase real content: trading name, Instagram handle, real photos of her, testimonials, pricing approach, areas served, turnaround times, hours.
- Currency in KES if anything price-related appears later.

---

## 9. Forms & contact behaviour (no backend required)
Primary path (works with zero infra): on valid submit → show Sonner success toast and **open WhatsApp** with a pre-filled message:
`https://wa.me/254728654867?text=<encoded message built from the form>`
Secondary path (optional, only if `RESEND_API_KEY` is set): a Server Action sends a React Email to `jmsnyambz@gmail.com` as well. If the key is missing, skip silently and rely on WhatsApp.
Also provide plain `mailto:` and `tel:` links. Add a honeypot field and basic Zod validation (Kenyan phone format `+254` / `07xx` / `01xx` accepted). Do not store submissions anywhere.

---

## 10. Project structure
```
app/
  layout.tsx            fonts, metadata base, JSON-LD, header/footer, Toaster
  template.tsx          page transition
  page.tsx
  about/ services/ (page + [slug]) collection/ lookbook/ how-it-works/
  journal/ (page + [slug]) faq/ contact/ privacy/
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx not-found.tsx loading.tsx
  llms.txt/route.ts     serves /llms.txt
components/
  ui/                   shadcn (all)
  motion/               Reveal, SplitHeading, ImageReveal, Parallax, Marquee, Magnetic, Stagger
  layout/               Header, Footer, MobileNav, Breadcrumbs, WhatsAppFab, ScrollProgress
  sections/             Hero, ServiceCards, CollectionTeaser, Steps, Occasions, ColorBreak, FaqBlock, CtaBand
  media/                SiteImage (next/image wrapper), Lightbox, Masonry, OwnerPhoto
  seo/                  JsonLd, buildMetadata()
content/
  services.ts faq.ts occasions.ts testimonials.ts collection.ts
  journal/*.mdx
lib/
  site.ts               brand name, contact, social, URLs (single source of truth)
  image-manifest.ts     generated
  utils.ts
scripts/
  optimize-images.mjs fetch-unsplash.mjs
assets-src/             untouched originals
public/images/...       optimised images
```
`SiteImage` wraps `next/image`: takes a manifest key, applies blur, focal point, `sizes`, alt. Pages never reference raw paths.

---

## 11. SEO strategy (Nairobi + Kenya)

### 11.1 Positioning
Personal styling and personal shopping are an **emerging service in Kenya**. Local press has described personal shoppers as a growing, recognised job, and the competitive field for "personal stylist Nairobi" is thin and mostly social-media-led. That is the opportunity: own the category terms early with a fast, content-rich, well-structured site, and become the entity AI assistants name when someone asks "who is a personal stylist in Nairobi?".

### 11.2 Keyword map
> **Honesty note:** the lists below are researched themes and likely search phrasings for Kenya. Exact monthly volumes were **not** available and must not be assumed. Validate and re-prioritise in Google Keyword Planner, Google Trends (Kenya), and Search Console once live (after ~4 weeks of data).

**Money / service keywords (target service pages)**
| Keyword | Intent | Target page |
|---|---|---|
| personal stylist Nairobi | Commercial | Home, /services |
| personal shopper Nairobi | Commercial | /services/personal-shop |
| wardrobe consultant Nairobi / wardrobe stylist Nairobi | Commercial | /services/wardrobe-edit |
| wardrobe edit / closet declutter / wardrobe audit Nairobi | Commercial | /services/wardrobe-edit |
| event stylist Nairobi / outfit stylist for events Kenya | Commercial | /services/occasion-styling |
| image consultant Kenya / fashion consultant Nairobi | Commercial | /about, /services |
| last-minute outfit Nairobi / same-day outfit styling | Commercial | /services/express-look |
| shopping errand service Nairobi / personal shopping service Kenya | Commercial | /services/express-look |
| women's fashion boutique Nairobi / ladies clothing Nairobi | Commercial | /collection |
| women's accessories Nairobi (jewellery, handbags, sunglasses) | Commercial | /collection |
| style consultation Kenya / book a stylist Kenya | Transactional | /contact |

**Occasion / informational keywords (Journal articles)**
what to wear to a Kenyan wedding · wedding guest outfits Nairobi · kitchen party outfit ideas Kenya · send-off outfit ideas · ruracio / dowry ceremony outfits · bridesmaid dress ideas Kenya · graduation outfit ideas for ladies · church outfits for women Nairobi · office outfits for ladies Nairobi · corporate event outfit ideas for women · date night outfit ideas Nairobi · how to build a capsule wardrobe · how to declutter your wardrobe · how to dress for your body type · outfit ideas for [season/weather in Nairobi] · how to style one dress five ways.

**Secondary / language variants** (low-weight, use naturally): "ushauri wa mavazi" (clothing advice), "mitindo ya mavazi" (clothing styles), "ladies fashion Nairobi", "fashion stylist Kenya", "shopping assistant Nairobi".

**Location rules:** target *Nairobi* and *Kenya* only. Add specific neighbourhood or county-level terms (Westlands, Kilimani, Karen, Kiambu, etc.) **only if the client confirms where she operates/delivers**. Do not create thin per-neighbourhood "doorway" pages.

### 11.3 On-page rules
- One `<h1>` per page containing the primary phrase naturally (e.g. "Personal Styling in Nairobi").
- Title ≤ 60 chars, meta description ≤ 155 chars, unique per page, written to earn the click. Pattern: `Primary keyword | {Brand} — Nairobi`.
- Descriptive, keyworded-but-human alt text; descriptive image filenames (`wedding-guest-dress-nairobi.webp`).
- Internal linking: Journal → Service → Contact; Service ↔ Service; breadcrumbs everywhere.
- Content depth: service pages 500–800 words of real, useful copy (not keyword stuffing); articles 800–1,400 words.
- `lang="en-KE"` on `<html>`; `hreflang` not needed (single locale).
- `buildMetadata()` helper sets title, description, canonical (`metadataBase` from `NEXT_PUBLIC_SITE_URL`), Open Graph, Twitter card, and robots.

### 11.4 Technical SEO (Next.js)
- Static generation for all pages; `sitemap.ts` (all routes + articles, `lastModified`), `robots.ts` (allow all, point to sitemap), `manifest.ts`, generated OG images.
- Core Web Vitals targets (mobile): **LCP < 2.5s, INP < 200ms, CLS < 0.1.** Achieved by §6.2 pipeline, `next/font`, minimal client JS (server components by default; mark only interactive/motion leaves `"use client"`), no heavy third-party scripts.
- Add Vercel Analytics/Speed Insights (optional) and set up **Google Search Console** and **Bing Webmaster Tools** (documented in the README handoff, as the client/Baseline44 must verify ownership).
- JSON-LD (validated with Google Rich Results Test / schema.org validator):
  - Site-wide: `Organization` + `LocalBusiness` (use `["ClothingStore", "ProfessionalService"]`), `name`, `url`, `logo`, `image`, `telephone`, `email`, `foundingDate: 2025-10-25`, `areaServed` (Nairobi, Kenya), `sameAs` (social). **Omit `address` unless she has a public storefront**; if she is service-area only, say so and avoid publishing a home address.
  - `WebSite` with `SearchAction` is **not** needed (no site search).
  - Service pages: `Service` (name, description, provider, areaServed, serviceType).
  - `FAQPage` on /faq and service pages (note: Google rarely shows FAQ rich results for most sites now, but the structured Q&A still helps AI/semantic understanding, so keep it).
  - `BreadcrumbList` on all inner pages; `Article` on journal posts; `ImageObject` for hero images; `Person` for Nyambura on /about.
  - Only mark up content that is visible on the page.

### 11.5 Journal: launch article list (write real, helpful drafts)
1. What to wear to a Kenyan wedding (as a guest): colours, fabrics, shoes, what to avoid
2. Kitchen party & send-off outfit ideas that photograph beautifully
3. How to edit your wardrobe in a weekend (a step-by-step that sells The Wardrobe Edit)
4. Capsule wardrobe for Nairobi women: 20 pieces, 40 outfits
5. Dress for your body type: a kind, practical guide
6. Personal stylist vs personal shopper vs image consultant: what's the difference?
7. Last-minute outfit? How the Express Look works
8. Office outfits for ladies in Nairobi that don't feel boring

Each article: answer-first intro (see §12), a skimmable structure, an image from the manifest, and a CTA.

### 11.6 Local & off-site (document in the README handoff; some are client actions)
- **Google Business Profile** (service-area business if no storefront): categories "Personal stylist"/"Fashion consultant"/"Clothing store" as available, services listed, photos, link to site. This is the single biggest local-pack lever.
- **Bing Places**, **Apple Business Connect**.
- **Instagram, TikTok, Pinterest, WhatsApp Business**: keep name/handle/bio consistent with the site (NAP-style consistency: name, phone, area). Add the site link in bio. Pinterest boards link back to lookbook/journal pages.
- Reviews: after each client, ask for a Google review; later surface real ones on-site.
- Collaborations/backlinks: wedding planners, photographers, MUAs and event venues in Nairobi, local fashion blogs, university fashion groups. Listings in Kenyan business directories (only reputable ones).

---

## 12. AI-search strategy (GEO / "AI Overviews", ChatGPT, Perplexity, Claude, Gemini)
Goal: when someone asks an assistant "Who can style me for a wedding in Nairobi?" or "personal shopper in Kenya?", this brand is findable, quotable and clearly described.

1. **Entity clarity.** Say plainly, on Home and About, in one extractable sentence: *"{Brand} is a Nairobi-based personal stylist and fashion boutique offering wardrobe editing, personal shopping, event styling and express outfit sourcing for women across Kenya."* Repeat the same description in schema, GBP, Instagram bio.
2. **Answer-first writing.** Every page and article opens with a 40–60 word direct answer to its core question, then expands. Use clear H2/H3 questions ("What does a personal stylist do in Nairobi?"). Lists and short tables for comparisons.
3. **Structured data** (§11.4) so machines can read services, area, founding date, contact.
4. **`/llms.txt`**: a concise Markdown file at the site root: who she is, what she offers, links to the key pages with one-line descriptions, contact, service area. Also optionally `/llms-full.txt` with the full service copy. (It's an emerging convention, with no guaranteed effect, but it's cheap.)
5. **`robots.txt`:** explicitly **allow** reputable AI/search crawlers so the brand can be cited: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-User`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`. (Client can change this later if she prefers to opt out of training.)
6. **Cited-source signals:** consistent name/area/phone across web; original photos and first-person expertise (E-E-A-T): her story, her process, before/after (with client permission), dated articles with author byline.
7. **Third-party mentions** matter most to AI answers: pursue features in Kenyan lifestyle outlets, wedding blogs and "best personal stylists in Nairobi" style roundups; reviews on Google; Instagram Reels demonstrating the services (captions with keywords).
8. **Freshness:** publish 1–2 journal posts/month, update `lastModified`, keep FAQ current.
9. **Measure:** after launch, periodically ask ChatGPT, Gemini, Perplexity and Claude the target questions and log whether the brand appears (a simple spreadsheet in the handoff docs).

---

## 13. Accessibility & UX details
- Semantic landmarks, skip-to-content link, visible focus rings (cobalt, 2px offset), keyboard-operable carousel/lightbox/menus.
- Touch targets ≥ 44px. Body text ≥ 16px (Jost 300 can look faint: use `text-ink` full opacity and 17–18px on mobile).
- Colour is never the only signal. `prefers-reduced-motion` honoured. Alt text on every image. Form labels, error messages linked via `aria-describedby`.
- Mobile-first: the hero stacks (text, then image), marquee remains, carousels are swipeable, header collapses to `Sheet`.
- Empty/loading/error states are branded (Skeletons, friendly 404 with a styling pun).
- Dark mode: **not required** (white-space aesthetic is the point). Keep `color-scheme: light`.

---

## 14. Performance checklist
Static rendering · server components by default · client components only for motion/interaction leaves · fonts via `next/font` with `display: swap` and only needed weights · no layout shift (every image has dimensions/aspect ratio) · lazy-load below-the-fold · avoid animating large images' width/height · `will-change` only during animation · bundle check with `next build` output; no unused heavy deps · Lighthouse mobile ≥ 90 Performance, ≥ 95 Accessibility/Best Practices/SEO.

---

## 15. Deployment & handoff
- Deploy to **Vercel** → free hosted link (`*.vercel.app`) for the client to share. Env: `NEXT_PUBLIC_SITE_URL`, optional `RESEND_API_KEY`.
- Custom domain later (e.g. `brandname.co.ke`, purchased by the client; Baseline44 helps with DNS and Vercel setup). Document: add domain in Vercel, set A/CNAME records, update `NEXT_PUBLIC_SITE_URL`, re-submit sitemap, 301 from the vercel.app URL if the client wants.
- Write a short `README.md`: run/build, how to edit copy (`content/`), how to add images (drop into `assets-src/`, run `npm run optimize:images`), how to add a journal post, how to update contact details (`lib/site.ts`), SEO setup steps for the client (GBP, Search Console, Bing), and the `TODO(client)` list.

---

## 16. Build order (do these in sequence; commit at each phase)
1. **Scaffold** Next 16.4.1 + Tailwind + shadcn (all) + deps; set theme tokens and fonts (§5.2, §5.3).
2. **Images:** inspect `/public`, move originals, run optimiser, fetch Unsplash, generate manifest + alt text (§6).
3. **Foundations:** `lib/site.ts`, `buildMetadata`, JSON-LD helper, `SiteImage`, motion kit, layout (Header, Footer, MobileNav, Breadcrumbs, Marquee, WhatsAppFab, ScrollProgress, template transition).
4. **Home** page, polish animation until it feels *alive but calm*.
5. **Services** overview + 4 detail pages from one template.
6. **Collection**, **Lookbook** (lightbox), **About**, **How it works**.
7. **FAQ**, **Contact** (form + WhatsApp flow), **Privacy**.
8. **Journal** (MDX + 8 drafted articles, at least 3 fully written, rest outlined as drafts hidden from sitemap until done).
9. **SEO/AI layer:** sitemap, robots (AI crawlers), llms.txt, OG images, all JSON-LD, internal links, titles/descriptions.
10. **QA:** accessibility, reduced motion, mobile widths 360/390/430, Lighthouse, broken links, image sizes, `next build` clean.
11. **Handoff:** README + `TODO(client)` report.

---

## 17. Acceptance checklist
- [ ] Next.js is exactly **16.4.1**, App Router, TypeScript strict, Tailwind, **all shadcn components installed**.
- [ ] Every image comes through `SiteImage`/`next/image` from the optimised manifest, with blur placeholder, correct `sizes`, alt text; **no raw multi-MB originals in `/public`**.
- [ ] All 15+ project images and all 10 Unsplash images are used somewhere sensible; Unsplash images are downloaded locally, not hot-linked.
- [ ] Every one of the 5 offerings (4 services + The Collection) has its own page/section with hero, image strip, included list and CTA.
- [ ] Breadcrumbs, tooltips, badges, tabs, accordion, carousel, sheet, dialog/drawer, form components all demonstrably used.
- [ ] Design reads: lots of white, thin tall serif + light sans, bold colour pops, arch frames, marquee, sticker, parallax; **no page feels crowded**; one colour break per page max.
- [ ] Animations are smooth (60fps), reduced-motion respected, hero LCP not delayed.
- [ ] **No** cart, checkout, prices, login, database, or fake testimonials/stats.
- [ ] Contact form validates, shows Sonner feedback, opens prefilled WhatsApp; `mailto:`/`tel:` links work.
- [ ] Unique title/description/canonical/OG per page; sitemap, robots (AI crawlers allowed), `llms.txt`, manifest, JSON-LD all present and valid.
- [ ] Lighthouse mobile: Performance ≥ 90; Accessibility, Best Practices, SEO ≥ 95; CLS < 0.1.
- [ ] README written; `TODO(client)` list produced (trading name, Instagram, real photos of Nyambura, testimonials, pricing approach, areas served, hours, turnaround times, county confirmation).
- [ ] Footer credits Baseline44's community initiative and lists Unsplash photographers.





HERE ARE THE UNSPLASH IMAGES TO USE FOR ACCESSORIES

here are the accessories unsplash links

https://unsplash.com/photos/gold-and-silver-jewelry-collection-uf_IDewI6iQ

https://unsplash.com/photos/tortoiseshell-clubmaster-style-sunglasses-near-beaded-brown-necklace-aXJdmnxauwY

https://unsplash.com/photos/sunglasses-and-hair-accessories-on-white-Wks9DXr1vRs

https://unsplash.com/photos/brown-leather-sling-bag-on-white-and-red-textile-9THwaaH18rI

https://unsplash.com/photos/round-white-and-gold-colored-analog-watch-with-gold-colored-milanese-band-O1DhTK0_1iQ

https://unsplash.com/photos/a-pair-of-black-high-heels-a-black-purse-and-a-pair-of-white-u8bTCVoJCP8

https://unsplash.com/photos/a-close-up-of-a-necklace-Ibrpih7rb4M


https://unsplash.com/photos/pair-of-earrings-on-white-case-vrC1YU4auBE


https://unsplash.com/photos/a-variety-of-clothing-and-accessories-laid-out-on-a-bed-b4r2ygkK8Wc


https://unsplash.com/photos/woman-shows-off-jewelry-checking-her-wristwatch-qjDtBPIxRL4
