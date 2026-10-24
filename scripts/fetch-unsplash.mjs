/**
 * Fetch the Unsplash accessory photos listed in Blueprint.md §6.3.
 *
 *   node scripts/fetch-unsplash.mjs
 *
 * Downloads each photo at original resolution into /assets-src/unsplash/<ID>.jpg
 * (never hot-linked — everything is processed locally by scripts/optimize-images.mjs).
 * If a download fails it is retried once; IDs that still fail are reported so the
 * files can be fetched manually from https://unsplash.com/photos/<ID>.
 */
import { createWriteStream, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "assets-src", "unsplash");

/** ID → { subject, credit } — credit is filled in after checking each photo page. */
const PHOTOS = [
  { id: "uf_IDewI6iQ", subject: "Gold & silver jewellery collection", credit: null },
  { id: "aXJdmnxauwY", subject: "Tortoiseshell sunglasses + beaded brown necklace", credit: null },
  { id: "Wks9DXr1vRs", subject: "Sunglasses & hair accessories on white", credit: null },
  { id: "9THwaaH18rI", subject: "Brown leather sling bag", credit: null },
  { id: "O1DhTK0_1iQ", subject: "Gold Milanese-band watch", credit: null },
  { id: "u8bTCVoJCP8", subject: "Black heels + black purse", credit: null },
  { id: "Ibrpih7rb4M", subject: "Necklace close-up", credit: null },
  { id: "vrC1YU4auBE", subject: "Earrings on white case", credit: null },
  { id: "b4r2ygkK8Wc", subject: "Clothing & accessories laid out on a bed", credit: null },
  { id: "qjDtBPIxRL4", subject: "Woman showing jewellery, checking wristwatch", credit: null },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function download(id, attempt = 1) {
  const url = `https://unsplash.com/photos/${id}/download?force=true&w=2400`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 10_000) throw new Error(`suspiciously small (${buf.length} bytes)`);
    const out = join(OUT_DIR, `${id}.jpg`);
    await import("node:fs").then((fs) => fs.promises.writeFile(out, buf));
    console.log(`✔ ${id} — ${(buf.length / 1024 / 1024).toFixed(2)} MB`);
    return true;
  } catch (err) {
    console.warn(`✖ attempt ${attempt} for ${id}: ${err.message}`);
    if (attempt < 2) {
      await sleep(2000);
      return download(id, attempt + 1);
    }
    return false;
  }
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const failed = [];
  for (const photo of PHOTOS) {
    if (photo.skip) continue;
    if (existsSync(join(OUT_DIR, `${photo.id}.jpg`))) {
      console.log(`→ ${photo.id} already present, skipping`);
      continue;
    }
    const ok = await download(photo.id);
    if (!ok) failed.push(photo);
    await sleep(500);
  }
  if (failed.length) {
    console.error("\nSome photos failed to download. Fetch them manually:");
    for (const f of failed) console.error(`  - https://unsplash.com/photos/${f.id} → assets-src/unsplash/${f.id}.jpg`);
    process.exitCode = 1;
  } else {
    console.log("\nAll Unsplash photos downloaded and ready for optimisation.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
