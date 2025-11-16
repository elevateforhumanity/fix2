#!/usr/bin/env bash
set -euo pipefail

echo "=== Elevate AI Workers setup ==="

# 0) Ensure folders
mkdir -p scripts
mkdir -p content/image-prompts
mkdir -p content/video-scripts
mkdir -p public/generated-images

# 1) Ensure OpenAI SDK installed
if ! npm list openai >/dev/null 2>&1; then
  echo "-> Installing openai Node SDK..."
  npm install openai
else
  echo "-> openai package already installed."
fi

#######################################################
# 2) Image worker: scripts/generate-images.mjs
#######################################################
cat > scripts/generate-images.mjs << 'FILEEOF'
#!/usr/bin/env node
import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.OPENAI_API_KEY) {
  console.error("ERROR: OPENAI_API_KEY is not set.");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const promptsDir = path.join(__dirname, "..", "content", "image-prompts");
const outputDir = path.join(__dirname, "..", "public", "generated-images");

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

  let files;
  try {
    files = (await fs.readdir(promptsDir)).filter((f) => f.endsWith(".md"));
  } catch (err) {
    console.error("No image prompt files found. Expected folder:", promptsDir);
    console.error("Error:", err.message);
    process.exit(1);
  }

  const manifest = {};

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(promptsDir, file);
    const prompt = await fs.readFile(fullPath, "utf8");

    console.log(`\n=== Generating image for: ${file} ===`);

    try {
      const result = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        size: "1024x1024",
        n: 1,
        response_format: "b64_json",
      });

      const imageBase64 = result.data[0].b64_json;
      const buffer = Buffer.from(imageBase64, "base64");
      const outPath = path.join(outputDir, `${slug}.png`);
      await fs.writeFile(outPath, buffer);

      manifest[slug] = `/generated-images/${slug}.png`;
      console.log(`Saved: ${outPath}`);
    } catch (err) {
      console.error(`Failed to generate image for ${file}:`, err.message);
    }
  }

  const manifestPath = path.join(outputDir, "manifest.json");
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log("\nImage manifest written to:", manifestPath);
  console.log("Done generating images.");
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
FILEEOF
chmod +x scripts/generate-images.mjs

#######################################################
# 3) Video job worker: scripts/prepare-video-jobs.mjs
#######################################################
cat > scripts/prepare-video-jobs.mjs << 'FILEEOF'
#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptsDir = path.join(__dirname, "..", "content", "video-scripts");
const jobsOutPath = path.join(__dirname, "..", "content", "video-jobs.json");

// Simple mapping from filename keywords to target length
const defaultDurations = [
  { key: "homepage-hero", seconds: 40 },
  { key: "how-it-works", seconds: 55 },
  { key: "employers", seconds: 45 },
  { key: "program-holder", seconds: 40 },
  { key: "delegate", seconds: 40 },
  { key: "program-hvac", seconds: 40 },
  { key: "program-barber", seconds: 40 },
  { key: "program-healthcare", seconds: 40 },
  { key: "program-building", seconds: 40 },
  { key: "program-cdl", seconds: 40 },
  { key: "apply-now", seconds: 30 },
  { key: "contact-support", seconds: 25 },
];

function guessDuration(slug) {
  const match = defaultDurations.find((d) => slug.includes(d.key));
  return match ? match.seconds : 40;
}

async function main() {
  let files;
  try {
    files = (await fs.readdir(scriptsDir)).filter((f) => f.endsWith(".md"));
  } catch (err) {
    console.error("No video script files found. Expected folder:", scriptsDir);
    console.error("Error:", err.message);
    process.exit(1);
  }

  const jobs = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const scriptPath = path.join(scriptsDir, file);
    const text = await fs.readFile(scriptPath, "utf8");

    const firstLine = text.split("\n")[0]?.replace(/^#\s*/, "") ?? slug;
    const durationSeconds = guessDuration(slug);

    jobs.push({
      id: slug,
      title: firstLine,
      sourceFile: `content/video-scripts/${file}`,
      prompt: text,
      // Placeholder model/provider values – wire these to Sora / HeyGen / Synthesia in your ONA flows
      targetProvider: "video_generation_service",
      targetModel: "sora-or-provider-model",
      durationSeconds,
      aspectRatio: "16:9",
      voice: "default",
      status: "pending",
    });
  }

  await fs.writeFile(jobsOutPath, JSON.stringify(jobs, null, 2));
  console.log("Video jobs file written to:", jobsOutPath);
  console.log(`Jobs prepared: ${jobs.length}`);
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
FILEEOF
chmod +x scripts/prepare-video-jobs.mjs

#######################################################
# 4) README for your AI workers
#######################################################
cat > scripts/README-AI-WORKERS.md << 'FILEEOF'
# Elevate AI Workers

These scripts automate image and video-job generation for https://elevateconnectsdirectory.org.

## 1. Environment

Set your OpenAI API key (in Gitpod or locally):

```bash
export OPENAI_API_KEY="sk-..."
```

## 2. Generate website images from prompts

Prompts live in: `content/image-prompts/*.md`

Run:

```bash
node scripts/generate-images.mjs
```

What it does:
- reads every `.md` in `content/image-prompts`
- sends the text as a prompt to OpenAI's DALL-E 3 image model
- saves PNGs into `public/generated-images/{slug}.png`
- writes `public/generated-images/manifest.json` mapping slug → URL

You can then reference these in your Next.js app, for example:

```tsx
import manifest from "@/../public/generated-images/manifest.json";
const heroSrc = manifest["homepage-hero"]; // "/generated-images/homepage-hero.png"
```

## 3. Prepare video jobs from scripts

Video scripts live in: `content/video-scripts/*.md`

Run:

```bash
node scripts/prepare-video-jobs.mjs
```

What it does:
- reads each `.md` video script
- guesses a reasonable duration
- writes `content/video-jobs.json` with an array of job objects

Example job:

```json
{
  "id": "homepage-hero",
  "title": "Homepage Hero Video (30–45 seconds)",
  "sourceFile": "content/video-scripts/homepage-hero.md",
  "prompt": "...full script text...",
  "targetProvider": "video_generation_service",
  "targetModel": "sora-or-provider-model",
  "durationSeconds": 40,
  "aspectRatio": "16:9",
  "voice": "default",
  "status": "pending"
}
```

You can plug `video-jobs.json` into:
- ONA / autopilot flows
- a Cloudflare Worker
- a backend API route

to actually call Sora (if you have access) or other tools like HeyGen, Synthesia, Pictory, D-ID, etc.

This keeps your content (scripts + prompts) in the repo and your automation layer free to swap providers.
FILEEOF

echo "=== AI Workers setup complete. ==="
echo "Next steps:"
echo "  1) export OPENAI_API_KEY=your_key"
echo "  2) node scripts/generate-images.mjs"
echo "  3) node scripts/prepare-video-jobs.mjs"
