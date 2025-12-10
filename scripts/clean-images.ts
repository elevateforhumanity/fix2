import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { glob } from "glob";

const IMG_DIRS = ["public"];
const TRASH_PATTERNS = [
  "**/placeholder*",
  "**/stock*",
  "**/*hero-splash*",
  "**/*unsplash*",
  "**/*pexels*",
  "**/*test*",
  "**/*demo*",
  "**/*gradient*",
  "**/*overlay*",
  "**/*-copy.*",
];

function hash(buf: Buffer): string {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

async function run() {
  console.log("🧹 Starting image cleanup...\n");

  // 1) Deduplicate by content hash
  console.log("Step 1: Deduplicating images by content hash...");
  const files = await glob("**/*.{png,jpg,jpeg,webp}", {
    cwd: "public",
    dot: false,
    absolute: false,
  });

  const seen = new Map<string, string>();
  let duplicatesRemoved = 0;

  for (const rel of files) {
    const p = path.join("public", rel);
    if (!fs.existsSync(p)) continue;

    const buf = fs.readFileSync(p);
    const h = hash(buf);

    if (seen.has(h)) {
      console.log(`  🗑️  Duplicate: ${p}`);
      fs.unlinkSync(p);
      duplicatesRemoved++;
    } else {
      seen.set(h, p);
    }
  }

  console.log(`  ✅ Removed ${duplicatesRemoved} duplicate images\n`);

  // 2) Remove obvious junk/gradients
  console.log("Step 2: Removing junk/placeholder images...");
  let junkRemoved = 0;

  for (const pattern of TRASH_PATTERNS) {
    const junk = await glob(pattern, { dot: false, absolute: false });
    for (const j of junk) {
      if (fs.existsSync(j)) {
        console.log(`  🗑️  Junk: ${j}`);
        fs.unlinkSync(j);
        junkRemoved++;
      }
    }
  }

  console.log(`  ✅ Removed ${junkRemoved} junk images\n`);

  console.log("🎉 Image cleanup complete!");
  console.log(`   Total duplicates removed: ${duplicatesRemoved}`);
  console.log(`   Total junk removed: ${junkRemoved}`);
}

run().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
