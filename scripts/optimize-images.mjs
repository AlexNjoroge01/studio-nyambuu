/**
 * Optimise all original photos (assets-src/) into web-ready WebP in /public/images
 * and generate lib/image-manifest.ts (src, dimensions, blur placeholder, alt, focal, tags, credit).
 *
 *   node scripts/optimize-images.mjs
 *
 * - max 2400px long edge, never upscales
 * - WebP q≈82, metadata stripped, sRGB kept
 * - 20px-wide blur placeholder per image (base64 data URL)
 * - descriptive filenames (SEO — Blueprint §11.3)
 */
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

const CLOTHES_DIR = join(ROOT, "assets-src", "clothes");
const UNSPLASH_DIR = join(ROOT, "assets-src", "unsplash");

/* ------------------------------------------------------------------ */
/* Metadata — descriptive filenames, alt text, focal, tags per image   */
/* ------------------------------------------------------------------ */

const CLOTHES = [
  {
    file: "tangerine-ruffle-dress.jpeg",
    name: "tangerine-ruffle-mini-dress-nairobi",
    alt: "Woman in a tangerine ruffle-trimmed mini dress with a corsage shoulder detail, standing in a bright panelled corridor holding a woven bag",
    focal: "50% 22%",
    tags: ["orange", "dress", "party", "birthday", "date-night"],
  },
  {
    file: "blue-ruched-shirt.jpeg",
    name: "sky-blue-ruched-shirt",
    alt: "Sky-blue shirt with a ruched drawstring waist and rolled sleeves on a wooden hanger in a boutique",
    focal: "50% 45%",
    tags: ["blue", "top", "office", "versatile"],
  },
  {
    file: "pink-ruched-shirt.jpeg",
    name: "fuchsia-ruched-shirt",
    alt: "Fuchsia pink shirt with a ruched drawstring waist and rolled sleeves on a wooden hanger in a boutique",
    focal: "50% 45%",
    tags: ["pink", "top", "versatile", "date-night"],
  },
  {
    file: "burgundy-suit-door.jpeg",
    name: "burgundy-belted-pantsuit-wooden-door",
    alt: "Woman in a burgundy belt-tailored blazer and wide-leg trousers with a tan handbag, photographed at a wooden front door",
    focal: "50% 30%",
    tags: ["burgundy", "suit", "office", "professional"],
  },
  {
    file: "cornflower-blue-suit-door.jpeg",
    name: "cornflower-blue-belted-pantsuit",
    alt: "Woman in a cornflower-blue belt-tailored blazer and wide-leg trousers with a camel handbag, photographed at a wooden front door",
    focal: "50% 30%",
    tags: ["blue", "suit", "office", "professional"],
  },
  {
    file: "oatmeal-suit-door.jpeg",
    name: "oatmeal-belted-pantsuit-entrance",
    alt: "Woman in an oatmeal double-breasted belted suit with wide-leg trousers and a camel bag, photographed at a timber entrance door",
    focal: "50% 30%",
    tags: ["cream", "suit", "office", "elegant"],
  },
  {
    file: "navy-gold-button-blazer.jpeg",
    name: "navy-gold-button-blazer-white-trousers",
    alt: "Navy double-breasted blazer with gold buttons laid on a sofa beside white wide-leg trousers",
    focal: "50% 55%",
    tags: ["navy", "blazer", "office", "classic"],
  },
  {
    file: "red-peplum-white-trousers.jpeg",
    name: "berry-peplum-blazer-white-trousers",
    alt: "Woman in a berry peplum blazer with a crisp white lapel and contrasting gold button, styled with white wide-leg trousers, taking a mirror selfie",
    focal: "50% 30%",
    tags: ["berry", "white", "suit", "cocktail", "office"],
  },
  {
    file: "suited-duo-black-cornflower.jpeg",
    name: "suited-duo-black-cornflower-office",
    alt: "Two women in matching black and light-blue short-sleeved double-breasted suit sets with printed silk scarves, in a modern office",
    focal: "50% 28%",
    tags: ["black", "blue", "suit", "office", "graduation"],
  },
  {
    file: "suited-duo-yellow-olive.jpeg",
    name: "suited-duo-mustard-olive-entrance",
    alt: "Two women in matching mustard and olive short-sleeved double-breasted suit sets with printed silk scarves, at a stone hotel entrance",
    focal: "50% 28%",
    tags: ["yellow", "green", "suit", "outing", "graduation"],
  },
  {
    file: "suits-boutique-four.jpeg",
    name: "four-suit-colours-boutique-mannequins",
    alt: "Four double-breasted suit sets in red, olive, white and black displayed on mannequins in a boutique",
    focal: "50% 40%",
    tags: ["red", "green", "white", "black", "collection", "office"],
  },
  {
    file: "ruffle-mini-dresses.jpeg",
    name: "ruffled-mini-dresses-boutique-row",
    alt: "Backs of three ruffled slip mini dresses in red, coral and pale blue, photographed in a boutique among colourful rails",
    focal: "50% 45%",
    tags: ["red", "pink", "blue", "dress", "party", "wedding-guest"],
  },
  {
    file: "florals-mannequin-01.jpeg",
    name: "pleated-floral-midi-skirts-arched-nook",
    alt: "Three pleated floral midi skirts in cream, navy and mustard displayed on gold mannequins beside a candle-lit arched niche",
    focal: "50% 45%",
    tags: ["print", "skirt", "elegant", "occasion"],
  },
  {
    file: "florals-mannequin-02.jpeg",
    name: "pleated-poppy-midi-skirts-arch",
    alt: "Three pleated midi skirts with bold poppy florals in burgundy, cream and black displayed on gold mannequins beneath an arched niche",
    focal: "50% 45%",
    tags: ["print", "skirt", "occasion", "romantic"],
  },
  {
    file: "garden-casual-look.jpeg",
    name: "burgundy-floral-shirt-pants-set-dipstyle",
    alt: "Side-by-side view of a burgundy floral shirt and matching maroon wide-leg trousers worn outdoors and displayed on a mannequin",
    focal: "24% 35%",
    tags: ["burgundy", "set", "printed", "casual-chic"],
  },
  {
    file: "leopard-two-piece.jpeg",
    name: "leopard-two-piece-white-crop-trackset",
    alt: "Woman wearing a brown leopard-print two-piece with a white crop top, black mini bag and white sneakers",
    focal: "50% 25%",
    tags: ["leopard", "casual", "street-style", "relaxed"],
  },
];

/* Unsplash accessories / lifestyle layer — credit links to each photo page */
const UNSPLASH = [
  {
    file: "b4r2ygkK8Wc.jpg",
    name: "outfit-planning-flat-lay-bed",
    alt: "Complete outfit laid flat on a bed: denim jeans with chain belts, floral camisole tops, straw sandals, leather bag, jewellery, perfume and tortoiseshell sunglasses",
    focal: "50% 50%",
    tags: ["flat-lay", "planning", "wardrobe", "express-look"],
    credit: { url: "https://unsplash.com/photos/b4r2ygkK8Wc" },
  },
  {
    file: "qjDtBPIxRL4.jpg",
    name: "layered-gold-jewellery-stylist-woman",
    alt: "Close up of a woman in a rust-red wrap top layering gold necklaces and checking her gold wristwatch, with rings and bangles",
    focal: "50% 30%",
    tags: ["jewellery", "gold", "styled", "occasion"],
    credit: { url: "https://unsplash.com/photos/qjDtBPIxRL4" },
  },
  {
    file: "u8bTCVoJCP8.jpg",
    name: "black-velvet-heels-clutch-flat-lay",
    alt: "Black velvet slingback heels and a faceted black clutch with black tassel earrings laid out on white",
    focal: "60% 40%",
    tags: ["shoes", "black", "heels", "evening", "formal"],
    credit: { url: "https://unsplash.com/photos/u8bTCVoJCP8" },
  },
  {
    file: "uf_IDewI6iQ.jpg",
    name: "gold-jewellery-collection-collage",
    alt: "Flat collection of gold chain necklaces, pearls, nameplate hoops, statement earrings, rings and hair pins arranged on a rose-pink wall",
    focal: "45% 40%",
    tags: ["jewellery", "gold", "accessories", "collection"],
    credit: { url: "https://unsplash.com/photos/uf_IDewI6iQ" },
  },
  {
    file: "aXJdmnxauwY.jpg",
    name: "tortoiseshell-accessories-flat-lay",
    alt: "Tortoiseshell sunglasses on a monogram book, leopard-print drop earrings and a tan leather purse arranged around leopard slippers on white",
    focal: "55% 45%",
    tags: ["sunglasses", "accessories", "neutral", "tortoiseshell"],
    credit: { url: "https://unsplash.com/photos/aXJdmnxauwY" },
  },
  {
    file: "9THwaaH18rI.jpg",
    name: "trench-coat-leather-bag-gold-watch",
    alt: "A beige trench coat styled on white bedding with a black leather handbag, chain strap and a gold wristwatch, beside a red-striped knit",
    focal: "50% 55%",
    tags: ["bag", "trench", "neutral", "everyday-chic"],
    credit: { url: "https://unsplash.com/photos/9THwaaH18rI" },
  },
  {
    file: "O1DhTK0_1iQ.jpg",
    name: "rose-gold-milanese-watch-silk-scarves",
    alt: "A rose-gold watch with a Milanese mesh band on pleated silk scarves in apricot and blush, with gold earrings and a chunky ring on a white shirt",
    focal: "42% 55%",
    tags: ["watch", "gold", "professional", "detail"],
    credit: { url: "https://unsplash.com/photos/O1DhTK0_1iQ" },
  },
  {
    file: "Ibrpih7rb4M.jpg",
    name: "earrings-collection-black-velvet",
    alt: "Collection of earrings — gold hoops, crystal-lined hoops, pink and cream tassel drops, pearl studs and studs — on a round black velvet mirror tray",
    focal: "50% 45%",
    tags: ["earrings", "jewellery", "statement", "evening"],
    credit: { url: "https://unsplash.com/photos/Ibrpih7rb4M" },
  },
  {
    file: "vrC1YU4auBE.jpg",
    name: "summer-accessories-straw-hat-slides",
    alt: "Cream straw hat with gingham slide sandals, wooden hoop earrings, white strap watch and blush-pink dried flowers, perfect sunny flat-lay",
    focal: "50% 50%",
    tags: ["hat", "shoes", "summer", "soft", "gifting"],
    credit: { url: "https://unsplash.com/photos/vrC1YU4auBE" },
  },
];

/* ------------------------------------------------------------------ */

const OUT = {
  clothes: join(ROOT, "public", "images", "clothes"),
  shoes: join(ROOT, "public", "images", "shoes"),
  accessories: join(ROOT, "public", "images", "accessories"),
};

/** category routing per unsplash photo (shoes vs accessories) */
const CAT_OVERRIDE = {
  "u8bTCVoJCP8": "shoes",
  "vrC1YU4auBE": "accessories",
};

async function processSource(src, category, meta) {
  const img = sharp(src).rotate(); // respect EXIF orientation

  const outName = `${meta.name}.webp`;
  const outPath = join(OUT[category], outName);

  await img
    .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outPath);

  const final = await sharp(outPath).metadata();

  const blur = await sharp(outPath).resize(20).webp({ quality: 40 }).toBuffer();

  return {
    key: meta.name,
    src: `/images/${category}/${outName}`,
    width: final.width,
    height: final.height,
    orientation: final.width >= final.height ? "landscape" : "portrait",
    category,
    alt: meta.alt,
    focal: meta.focal,
    tags: meta.tags,
    credit: meta.credit ?? null,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    bytes: statSync(outPath).size,
  };
}

function tagsLiteral(tags) {
  return `[${tags.map((t) => JSON.stringify(t)).join(", ")}] as const`;
}

function writeManifest(results) {
  const keys = results.map((r) => r.key);

  const body = results
    .map((r) => {
      return `  ${JSON.stringify(r.key)}: {
    key: ${JSON.stringify(r.key)},
    src: ${JSON.stringify(r.src)},
    width: ${r.width},
    height: ${r.height},
    orientation: ${JSON.stringify(r.orientation)},
    category: ${JSON.stringify(r.category)},
    alt: ${JSON.stringify(r.alt)},
    focal: ${JSON.stringify(r.focal)},
    tags: ${tagsLiteral(r.tags)},
    credit: ${r.credit ? JSON.stringify(r.credit) : "null"},
    blurDataURL: ${JSON.stringify(r.blurDataURL)},
  },`;
    })
    .join("\n");

  const out = `/**
 * GENERATED by scripts/optimize-images.mjs — do not edit by hand; edit the
 * metadata table in the script and re-run \`npm run optimize:images\`.
 *
 * Every content image on the site must be resolved through this manifest via
 * <SiteImage name={key} /> (see components/media/site-image.tsx).
 */

export type ImageCategory = "clothes" | "shoes" | "accessories";

export type ImageKey =
${keys.map((k) => `  | ${JSON.stringify(k)}`).join("\n")};

export interface ManifestEntry {
  key: ImageKey;
  src: string;
  width: number;
  height: number;
  orientation: "landscape" | "portrait";
  category: ImageCategory;
  /** descriptive alt text — doubles as image SEO */
  alt: string;
  /** object-position for crops, e.g. "50% 30%" */
  focal: string;
  /** colour / occasion / mood tags — powers lookbook filters */
  tags: readonly string[];
  /** photographer credit (Unsplash licence) */
  credit: { url: string } | null;
  blurDataURL: string;
}

export const imageManifest: Record<ImageKey, ManifestEntry> = {
${body}
};

/** All manifest entries as an array (lookbook, masonry grids) */
export const allImages: ManifestEntry[] = Object.values(imageManifest);
`;

  writeFileSync(join(ROOT, "lib", "image-manifest.ts"), out);
}

async function main() {
  mkdirSync(OUT.clothes, { recursive: true });
  mkdirSync(OUT.shoes, { recursive: true });
  mkdirSync(OUT.accessories, { recursive: true });

  const entries = [];

  for (const c of CLOTHES) {
    const src = join(CLOTHES_DIR, c.file);
    if (!existsSync(src)) {
      console.warn(`⚠ missing source: ${c.file}`);
      continue;
    }
    entries.push({ category: "clothes", src, meta: c });
  }

  for (const u of UNSPLASH) {
    const src = join(UNSPLASH_DIR, u.file);
    if (!existsSync(src)) {
      console.warn(`⚠ missing source: ${u.file}`);
      continue;
    }
    const id = u.file.replace(".jpg", "");
    const category = CAT_OVERRIDE[id] ?? "accessories";
    entries.push({ category, src, meta: u });
  }

  const results = [];
  for (const e of entries) {
    try {
      const result = await processSource(e.src, e.category, e.meta);
      results.push(result);
      console.log(
        `✔ ${result.src} (${result.width}×${result.height}, ${(result.bytes / 1024).toFixed(0)} KB)`
      );
    } catch (err) {
      console.error(`✖ ${e.meta.file}: ${err.message}`);
      process.exitCode = 1;
    }
  }

  writeManifest(results);

  const totalMB = results.reduce((n, r) => n + r.bytes, 0) / 1024 / 1024;
  console.log(`\n${results.length} images, ${totalMB.toFixed(2)} MB total, manifest written.`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
