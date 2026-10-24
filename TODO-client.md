# TODO(client) — confirmations and assets needed before launch

Everything below is either a business fact we deliberately did not invent or an
asset only the client can provide. Nothing here blocks the site from running;
each item improves accuracy, trust or local search.

## 1. Trading name

- [ ] Confirm the exact trading name to publish.
  - Currently: **Nyambura Mbugua** (personal name used as the brand).
  - If the business trades as something else (e.g. a boutique name), update
    `site.brand` and `site.name` in `lib/site.ts`, the logo/wordmark, the
    footer copyright, the JSON-LD `Organization`/`LocalBusiness` names and the
    Open Graph images.
  - If a limited company or registered business name exists, send it so it can
    be added to the schema and footer.

## 2. Instagram and social handles

- [ ] Instagram URL (currently hidden — set `site.social.instagram`).
- [ ] TikTok URL, if wanted (currently hidden).
- [ ] Pinterest URL, if wanted (currently hidden).

Until supplied, the icons are omitted rather than linking nowhere. The
`InstagramGrid` section also needs a real handle to point at.

## 3. Real photography of Nyambura

- [ ] 3–5 portraits: one clean headshot for About, one working/styling shot for
      the home page, one full-length for the hero or press strip.
  - Vertical or square, natural light, minimum 2000px on the long edge.
  - Save as `public/images/owner.jpg` to replace the branded placeholder used by
    `<OwnerPhoto />`.
- [ ] Confirm we may use the studio clothing photos already supplied on the
      public site (they are currently credited to the studio in the footer).

## 4. Testimonials

- [ ] Supply 3–6 real client quotes **with permission to publish**, including
      first name (or initials), service used and, ideally, a photo.
  - Add them to `content/testimonials.ts`. The testimonials section is hidden
    while the file is empty — no invented quotes or star ratings are used.
  - Written or WhatsApp screenshots are fine; we will transcribe them.

## 5. Pricing approach

- [ ] Decide how prices appear, if at all. The site currently shows **no prices**
      and invites enquiries, which keeps the offer flexible.
  - Options: (a) keep enquiry-only, (b) publish "from KES …" starting rates,
    (c) publish full packages. If (b) or (c), send the exact figures and what
    each includes; they will be added to `content/services.ts` and the service
    pages.

## 6. Areas served

- [ ] Confirm the service area beyond Nairobi.
  - Currently: **Nairobi, Kenya** (`site.location.areaServed`).
  - Should it list specific neighbourhoods (Kilimani, Karen, Westlands, Lavington,
    Runda…), nearby towns (Kiambu, Ngong, Machakos) or nationwide delivery?
  - This feeds the footer, contact page, JSON-LD `areaServed` and the local SEO
    copy, so accuracy matters.

## 7. Opening hours

- [ ] Confirm consultation hours and days (e.g. Mon–Fri 9:00–18:00, Sat by
      appointment).
  - If hours are published, they will be added to the contact page, footer and
    `LocalBusiness` schema (`openingHoursSpecification`). If the studio works
    strictly by appointment, say so and we will publish that instead.

## 8. Turnaround times

- [ ] Confirm realistic lead times per service:
  - Wardrobe Edit — how many days from booking to session?
  - Personal Shop — how long does sourcing take?
  - Occasion Styling — minimum notice before an event?
  - The Express Look — what is the true minimum notice (24h? 48h?) and is there
    a rush surcharge (even if we do not publish the amount)?
  - Journal drafts and service pages currently use careful, non-specific
    language ("typically", "as early as possible"). Replace with exact windows
    once confirmed.

## 9. County / location confirmation

- [ ] Confirm the business is based in **Nairobi County** and whether clients are
      seen at a studio, at their home, or both.
  - No street address is published. If a studio address should be public, send
    it and we will add it to the contact page, footer and schema (and to Google
    Business Profile).
  - If the business is registered in a different county, correct
    `site.location` before launch.

## 10. The tenth Unsplash image

- [ ] The brief's photo `Wks9DXr1vRs` (sunglasses and hair accessories on white)
      is an **Unsplash+ premium** image. It cannot be downloaded with a free
      licence (HTTP 401) and is therefore not on the site.
  - Options: (a) supply an Unsplash+ subscription so it can be licensed,
    (b) approve a free Unsplash alternative with a similar look, or (c) leave it
    out — the accessories section already has eight licensed photos.
  - Say which you prefer and it can be added in minutes via
    `pnpm optimize:images`.

## 11. Nice-to-have confirmations

- [ ] Is the studio email `jmsnyambz@gmail.com` the address that should receive
      enquiries, or should it be a branded address (e.g. `hello@…`)?
- [ ] Is the WhatsApp number `+254 728 654 867` correct for business enquiries?
- [ ] Should the site show a **founding year**? The schema currently uses 2025.
- [ ] Any awards, press features, stockists or collaborations we may cite?
      (Nothing is claimed on the site today.)
- [ ] Preferred enquiry response promise (e.g. "replies within one working day")
      — only publish it if it can be kept.

---

## Launch checklist for the client

- [ ] Confirm items 1–9 above.
- [ ] Provide real portraits (item 3) and testimonials (item 4).
- [ ] Create/claim the Google Business Profile with the final name, phone and
      area served.
- [ ] Verify the domain in Google Search Console and submit `/sitemap.xml`.
- [ ] Verify in Bing Webmaster Tools and submit the same sitemap.
- [ ] Send the final domain so `NEXT_PUBLIC_SITE_URL` can be set and the site
      redeployed.
