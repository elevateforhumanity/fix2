# Comprehensive Cleanup Plan - Dependencies, Cache, Videos, Images

## Current State Analysis

### Build Cache & Storage
```
.next/           229MB  (build output - can delete, regenerates)
.pnpm-store/     1.9GB  (package cache - can delete, regenerates)
node_modules/    4.7GB  (dependencies - needed)
.git/            683MB  (version history - keep)
public/          734MB  (static assets - needs cleanup)
```

**Total Deletable Cache**: 2.1GB (.next + .pnpm-store)

---

## 1. BUILD CACHE CLEANUP (2.1GB)

### Safe to Delete Immediately

#### .next/ (229MB)
```bash
rm -rf .next
```
**Impact**: Regenerates on next build
**Risk**: None
**Savings**: 229MB

#### .pnpm-store/ (1.9GB)
```bash
rm -rf .pnpm-store
pnpm store prune
```
**Impact**: Removes unused cached packages
**Risk**: None (will re-download if needed)
**Savings**: ~1.9GB

**Total Cache Cleanup**: 2.1GB

---

## 2. VIDEO FILES CLEANUP (31MB)

### Videos Directory Analysis
Total: 31MB in public/videos/

#### Unused Videos (NOT referenced in code)
```bash
# Large unused videos (14.6MB)
public/videos/hero-video-with-audio.mp4          5.4MB  ❌ Not used
public/videos/faq-section-video-with-narration.mp4  2.7MB  ❌ Not used
public/videos/hero-video.mp4                      2.6MB  ❌ Not used
public/videos/logo-animation.mp4                  1.9MB  ❌ Not used
public/videos/directory-hero-video-with-narration.mp4  1.7MB  ❌ Not used
public/videos/testimonials-video-with-narration.mp4  1.6MB  ❌ Not used
public/videos/elevate-overview-web.mp4            1.6MB  ❌ Not used
public/videos/directory-hero-video.mp4            1.6MB  ❌ Not used
public/videos/testimonials-video.mp4              1.5MB  ❌ Not used
public/videos/employer-section-video-with-narration.mp4  1.3MB  ❌ Not used
public/videos/training-providers-video-with-narration.mp4  1.2MB  ❌ Not used
public/videos/training-providers-video.mp4        1.1MB  ❌ Not used
public/videos/voiceover.mp3                       784KB  ❌ Not used
```

#### Tiny Videos (Likely Broken/Incomplete)
```bash
# Videos under 100KB (likely corrupted or test files)
public/videos/elevate-overview-with-narration.mp4     108KB  ❌ Too small
public/videos/barber-spotlight-with-narration.mp4     76KB   ❌ Too small
public/videos/programs-overview-video-with-narration.mp4  68KB   ❌ Too small
public/videos/employer-pipeline-with-narration.mp4    68KB   ❌ Too small
public/videos/success-stories-video-with-narration.mp4  64KB   ❌ Too small
public/videos/hero-video-segment-with-narration.mp4  64KB   ❌ Too small
public/videos/apply-section-video-with-narration.mp4  64KB   ❌ Too small
public/videos/about-section-video-with-narration.mp4  64KB   ❌ Too small
public/videos/elevate-overview.mp4                    36KB   ❌ Too small
public/videos/faq-section-video.mp4                   32KB   ❌ Too small
public/videos/barber-spotlight.mp4                    32KB   ❌ Too small
public/videos/employer-pipeline.mp4                   28KB   ❌ Too small
public/videos/success-stories-video.mp4               24KB   ❌ Too small
public/videos/programs-overview-video.mp4             24KB   ❌ Too small
public/videos/hero-video-segment.mp4                  24KB   ❌ Too small
public/videos/employer-section-video.mp4              20KB   ❌ Too small
public/videos/apply-section-video.mp4                 20KB   ❌ Too small
public/videos/about-section-video.mp4                 20KB   ❌ Too small
```

#### Keep
```bash
public/videos/courses/  5.5MB  ✅ Keep (course content)
```

**Video Cleanup Savings**: ~25MB (80% of videos can be deleted)

---

## 3. IMAGE FILES CLEANUP (367MB potential)

### Huge Images (Need Optimization)
```bash
# PNG files over 10MB (should be JPG or WebP)
./location-9.png                          24MB  ⚠️ Convert to JPG
./location-5.png                          24MB  ⚠️ Convert to JPG
./location-4.png                          24MB  ⚠️ Convert to JPG
./artlist/hero-training-5.png             14MB  ⚠️ Convert to JPG
./artlist/hero-training-4.png             14MB  ⚠️ Convert to JPG
./artlist/hero-training-3.png             14MB  ⚠️ Convert to JPG
./artlist/hero-training-2.png             14MB  ⚠️ Convert to JPG
./artlist/hero-training-1.png             14MB  ⚠️ Convert to JPG
```
**Total**: 144MB in 8 files

**After conversion to JPG (80% quality)**:
- 24MB PNG → ~2-3MB JPG (90% savings)
- 14MB PNG → ~1-2MB JPG (90% savings)
- **Potential savings**: ~130MB

### Placeholder/Test Images
```bash
./hero-banner-old.png                     1.6MB  ❌ Delete (old)
./delores-reynolds.jpg                    874KB  ❌ Delete (unused)
./heroes/test-image.jpg                   248KB  ❌ Delete (test file)
```
**Savings**: 2.7MB

### Duplicate Images
```bash
# Same image in multiple locations
./heroes/hero-banner-latest.png           5.6MB
./general/hero-banner-latest.png          5.6MB  ❌ Duplicate
```
**Savings**: 5.6MB

**Total Image Cleanup Potential**: 138MB

---

## 4. DEPENDENCIES CLEANUP

### Unused Production Dependencies (from depcheck)

#### Definitely Unused (32 packages)
```json
{
  "@hookform/resolvers": "Not imported anywhere",
  "@next-auth/prisma-adapter": "Not using Prisma",
  "@next/bundle-analyzer": "Dev tool in prod deps",
  "@radix-ui/react-checkbox": "Not used",
  "@radix-ui/react-progress": "Not used",
  "@radix-ui/react-select": "Not used",
  "@radix-ui/react-tabs": "Not used",
  "@sentry/react": "Not configured",
  "@sentry/tracing": "Not configured",
  "@supabase/auth-helpers-nextjs": "Deprecated",
  "@supabase/auth-js": "Duplicate",
  "@types/react-beautiful-dnd": "Not using react-beautiful-dnd",
  "@types/react-signature-canvas": "Not using signature canvas",
  "@videojs/themes": "Not using video.js",
  "express-useragent": "Not using Express",
  "googleapis": "Not using Google APIs",
  "next-auth": "Not configured",
  "parse-multipart-data": "Not used",
  "passport": "Not using Passport",
  "pg": "Not using PostgreSQL directly",
  "react-hook-form": "Not used",
  "react-signature-canvas": "Not used",
  "slugify": "Not used",
  "swagger-ui-react": "Not used",
  "undici": "Not needed (Node 18+ has fetch)",
  "uuid": "Not used",
  "videojs-contrib-quality-levels": "Not using video.js",
  "videojs-hls-quality-selector": "Not using video.js",
  "y-websocket": "Not using Yjs",
  "yjs": "Not using Yjs",
  "zustand": "Not using Zustand",
  "web-push": "Already have push service"
}
```

**Estimated Size**: 50-100MB

### Unused Dev Dependencies (40+ packages)

#### Testing Libraries (Not Running Tests)
```json
{
  "@testing-library/react": "No tests",
  "@testing-library/jest-dom": "No tests",
  "@testing-library/user-event": "No tests",
  "@types/jest": "No tests",
  "@vitest/coverage-v8": "No tests",
  "jest": "No tests",
  "vitest": "No tests",
  "supertest": "No tests"
}
```

#### Netlify Plugins (Using Vercel)
```json
{
  "@netlify/functions": "Not using Netlify",
  "@netlify/plugin-nextjs": "Not using Netlify",
  "netlify-plugin-cache": "Not using Netlify",
  "netlify-plugin-submit-sitemap": "Not using Netlify"
}
```

#### Unused Build Tools
```json
{
  "wrangler": "Not using Cloudflare Workers",
  "rimraf": "Not needed (use rm -rf)",
  "autoprefixer": "PostCSS handles this",
  "stylelint-config-standard": "Not using Stylelint",
  "stylelint-config-tailwindcss": "Not using Stylelint"
}
```

**Estimated Size**: 200-300MB

---

## 5. EXECUTION PLAN

### Phase 1: Safe Cache Cleanup (2.1GB) - IMMEDIATE
```bash
#!/bin/bash
echo "Phase 1: Cleaning build cache..."

# Delete build output
rm -rf .next
echo "✅ Deleted .next/ (229MB)"

# Clean pnpm store
pnpm store prune
echo "✅ Pruned .pnpm-store/ (~1.9GB)"

echo "Phase 1 complete: Saved ~2.1GB"
```

### Phase 2: Video Cleanup (25MB) - IMMEDIATE
```bash
#!/bin/bash
echo "Phase 2: Cleaning unused videos..."

cd public/videos

# Delete large unused videos
rm -f hero-video-with-audio.mp4
rm -f faq-section-video-with-narration.mp4
rm -f hero-video.mp4
rm -f logo-animation.mp4
rm -f directory-hero-video-with-narration.mp4
rm -f testimonials-video-with-narration.mp4
rm -f elevate-overview-web.mp4
rm -f directory-hero-video.mp4
rm -f testimonials-video.mp4
rm -f employer-section-video-with-narration.mp4
rm -f training-providers-video-with-narration.mp4
rm -f training-providers-video.mp4
rm -f voiceover.mp3

# Delete tiny/broken videos
rm -f *-with-narration.mp4
rm -f elevate-overview.mp4
rm -f faq-section-video.mp4
rm -f barber-spotlight.mp4
rm -f employer-pipeline.mp4
rm -f success-stories-video.mp4
rm -f programs-overview-video.mp4
rm -f hero-video-segment.mp4
rm -f employer-section-video.mp4
rm -f apply-section-video.mp4
rm -f about-section-video.mp4

echo "✅ Deleted unused videos (~25MB)"
echo "Phase 2 complete"
```

### Phase 3: Image Cleanup (138MB) - REQUIRES TESTING
```bash
#!/bin/bash
echo "Phase 3: Cleaning and optimizing images..."

cd public/images

# Delete placeholder/test images
rm -f hero-banner-old.png
rm -f delores-reynolds.jpg
rm -f heroes/test-image.jpg

# Delete duplicate
rm -f general/hero-banner-latest.png

echo "✅ Deleted placeholder images (2.7MB)"

# Convert huge PNGs to JPG (requires imagemagick)
if command -v convert &> /dev/null; then
  for file in location-*.png artlist/hero-training-*.png; do
    if [ -f "$file" ]; then
      base="${file%.png}"
      convert "$file" -quality 85 "${base}.jpg"
      rm "$file"
      echo "✅ Converted $file to JPG"
    fi
  done
  echo "✅ Converted 8 huge PNGs to JPG (~130MB saved)"
else
  echo "⚠️  ImageMagick not installed, skipping PNG conversion"
  echo "   Install with: apt-get install imagemagick"
fi

echo "Phase 3 complete: Saved ~138MB"
```

### Phase 4: Remove Unused Dependencies (300-400MB) - REQUIRES TESTING
```bash
#!/bin/bash
echo "Phase 4: Removing unused dependencies..."

# Remove unused production dependencies
pnpm remove \
  @hookform/resolvers \
  @next-auth/prisma-adapter \
  @radix-ui/react-checkbox \
  @radix-ui/react-progress \
  @radix-ui/react-select \
  @radix-ui/react-tabs \
  @sentry/react \
  @sentry/tracing \
  @supabase/auth-helpers-nextjs \
  @types/react-beautiful-dnd \
  @types/react-signature-canvas \
  @videojs/themes \
  express-useragent \
  googleapis \
  next-auth \
  parse-multipart-data \
  passport \
  pg \
  react-hook-form \
  react-signature-canvas \
  slugify \
  swagger-ui-react \
  undici \
  uuid \
  videojs-contrib-quality-levels \
  videojs-hls-quality-selector \
  y-websocket \
  yjs \
  zustand

echo "✅ Removed 32 unused production dependencies"

# Remove unused dev dependencies
pnpm remove -D \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  @types/jest \
  @vitest/coverage-v8 \
  jest \
  vitest \
  supertest \
  @netlify/functions \
  @netlify/plugin-nextjs \
  netlify-plugin-cache \
  netlify-plugin-submit-sitemap \
  wrangler \
  rimraf \
  stylelint-config-standard \
  stylelint-config-tailwindcss

echo "✅ Removed 18 unused dev dependencies"

echo "Phase 4 complete: Saved ~300-400MB"
echo ""
echo "⚠️  IMPORTANT: Run 'pnpm build' to verify nothing broke!"
```

---

## 6. TOTAL SAVINGS SUMMARY

| Phase | What | Savings | Risk |
|-------|------|---------|------|
| **Phase 1** | Build cache (.next + .pnpm-store) | **2.1GB** | None ✅ |
| **Phase 2** | Unused videos | **25MB** | None ✅ |
| **Phase 3** | Images (delete + optimize) | **138MB** | Low ⚠️ |
| **Phase 4** | Unused dependencies | **300-400MB** | Medium ⚠️ |
| **TOTAL** | | **2.5-2.6GB** | |

### After Cleanup
- **Before**: 9.2GB
- **After**: ~6.6GB
- **Savings**: 28% reduction

---

## 7. VERIFICATION STEPS

After each phase:

```bash
# 1. Check size reduction
du -sh .

# 2. Verify build still works
pnpm build

# 3. Test application
pnpm dev

# 4. Check for missing images/videos
# Visit key pages and check browser console for 404s

# 5. Git status
git status
```

---

## 8. ROLLBACK PLAN

If something breaks:

```bash
# Restore from git
git checkout HEAD -- <file>

# Reinstall dependencies
pnpm install

# Rebuild
pnpm build
```

---

## 9. RECOMMENDED EXECUTION ORDER

### Today (Safe - 2.1GB)
1. ✅ Phase 1: Clean build cache
2. ✅ Phase 2: Delete unused videos

### This Week (Test First - 538MB)
3. ⚠️ Phase 3: Clean images (test on staging first)
4. ⚠️ Phase 4: Remove dependencies (test build thoroughly)

### Ongoing
- Set up image optimization pipeline
- Add pre-commit hooks to prevent large files
- Regular dependency audits (monthly)

---

## 10. PREVENTION STRATEGIES

### .gitignore additions
```
# Build cache
.next/
.pnpm-store/

# Large files
*.mp4
*.mov
*.avi
public/videos/*
!public/videos/courses/
!public/videos/README.md

# Prevent huge images
public/images/**/*.png
!public/images/**/icon*.png
!public/images/**/logo*.png
```

### Pre-commit hook
```bash
#!/bin/bash
# .husky/pre-commit

# Check for large files
large_files=$(find . -type f -size +5M -not -path "./node_modules/*" -not -path "./.git/*")

if [ -n "$large_files" ]; then
  echo "❌ Large files detected (>5MB):"
  echo "$large_files"
  echo ""
  echo "Please optimize or add to .gitignore"
  exit 1
fi
```

### package.json script
```json
{
  "scripts": {
    "clean": "rm -rf .next .pnpm-store",
    "clean:full": "rm -rf .next .pnpm-store node_modules && pnpm install",
    "audit:deps": "npx depcheck",
    "audit:size": "du -sh . .next node_modules public"
  }
}
```

---

## EXECUTE NOW?

**Recommended**: Start with Phase 1 & 2 (2.1GB savings, zero risk)

```bash
# Run this now
cd /workspaces/fix2
rm -rf .next
pnpm store prune
cd public/videos && rm -f hero-video-with-audio.mp4 faq-section-video-with-narration.mp4 hero-video.mp4 logo-animation.mp4 directory-hero-video-with-narration.mp4 testimonials-video-with-narration.mp4 elevate-overview-web.mp4 directory-hero-video.mp4 testimonials-video.mp4 employer-section-video-with-narration.mp4 training-providers-video-with-narration.mp4 training-providers-video.mp4 voiceover.mp3 *-with-narration.mp4 elevate-overview.mp4 faq-section-video.mp4 barber-spotlight.mp4 employer-pipeline.mp4 success-stories-video.mp4 programs-overview-video.mp4 hero-video-segment.mp4 employer-section-video.mp4 apply-section-video.mp4 about-section-video.mp4

echo "✅ Cleaned 2.1GB - safe and immediate!"
```
