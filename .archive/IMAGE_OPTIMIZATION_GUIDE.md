# Image Optimization Guide

## Current Issues

- **512MB total images** (should be <100MB)
- **10+ images over 2MB** (should be <500KB)
- Hero image: 3.1MB (should be <500KB)
- Many JPG/PNG not converted to WebP

## Quick Fix Options

### Option 1: Automated Script (Recommended)

```bash
# Run the optimization script
bash scripts/optimize-images.sh
```

This will:
- Find all images >500KB
- Create backup
- Convert to WebP
- Resize to max 1920px width
- Preserve originals (you can delete after testing)

### Option 2: Manual Optimization

#### Using Sharp (Node.js)

```bash
# Install sharp-cli globally
npm install -g sharp-cli

# Convert single image
sharp -i public/images/hero/home-hero-top-gradient.jpg \
      -o public/images/hero/home-hero-top-gradient.webp \
      --webp --resize 1920

# Batch convert directory
for img in public/images/hero/*.jpg; do
  sharp -i "$img" -o "${img%.jpg}.webp" --webp --resize 1920
done
```

#### Using ImageMagick

```bash
# Install ImageMagick
sudo apt-get install imagemagick

# Convert and resize
convert public/images/hero/home-hero-top-gradient.jpg \
        -resize 1920x \
        -quality 85 \
        public/images/hero/home-hero-top-gradient.webp
```

### Option 3: Online Tools

1. **Squoosh** - https://squoosh.app
   - Drag and drop images
   - Choose WebP format
   - Adjust quality (80-85% recommended)
   - Download optimized version

2. **TinyPNG** - https://tinypng.com
   - Upload images
   - Automatically optimizes
   - Download compressed versions

## Priority Images to Optimize

### Critical (>2MB):

```bash
# Hero images
public/images/hero/home-hero-top-gradient.jpg (3.1MB)
public/media/homepage-hero.jpg (2.4MB)

# Artlist images
public/images/artlist/hero-training-1.png
public/images/artlist/hero-training-2.png
public/images/artlist/hero-training-4.png
public/images/artlist/hero-training-5.png

# Location images
public/images/location-4.png
public/images/location-5.png

# Program images
public/images/programs/hvac-hero.jpg
public/images/beauty/program-barber-overview.jpg

# Hero banners
public/images/hero-banner-new.png
public/images/heroes/hero-banner-latest.png
```

## Recommended Image Sizes

| Use Case | Max Width | Max Height | Format | Quality | Max Size |
|----------|-----------|------------|--------|---------|----------|
| Hero Images | 1920px | 1080px | WebP | 85% | 300KB |
| Program Cards | 800px | 600px | WebP | 85% | 150KB |
| Thumbnails | 400px | 300px | WebP | 80% | 50KB |
| Icons | 256px | 256px | WebP/SVG | 90% | 20KB |
| Logos | 512px | 512px | SVG/WebP | 90% | 30KB |

## Next.js Image Component

Already configured in `next.config.mjs`:

```javascript
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

This means Next.js will automatically:
- Generate multiple sizes
- Serve WebP/AVIF when supported
- Lazy load images
- Optimize on-the-fly

## Update Image References

After converting to WebP, update imports:

```typescript
// Before
<Image src="/images/hero/home-hero-top-gradient.jpg" />

// After
<Image src="/images/hero/home-hero-top-gradient.webp" />
```

Or use Next.js automatic optimization:

```typescript
// Next.js will handle optimization
<Image 
  src="/images/hero/home-hero-top-gradient.jpg"
  width={1920}
  height={1080}
  quality={85}
  priority // for above-the-fold images
/>
```

## Bulk Optimization Script

Create `scripts/bulk-optimize.mjs`:

```javascript
import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs';

const MAX_WIDTH = 1920;
const QUALITY = 85;

async function optimizeImages() {
  const images = await glob('public/**/*.{jpg,jpeg,png}', {
    ignore: ['**/node_modules/**', '**/backup/**']
  });

  console.log(`Found ${images.length} images to optimize`);

  for (const imagePath of images) {
    const stats = fs.statSync(imagePath);
    const sizeKB = stats.size / 1024;

    if (sizeKB > 500) {
      console.log(`Optimizing: ${imagePath} (${sizeKB.toFixed(0)}KB)`);

      const outputPath = imagePath.replace(/\.(jpg|jpeg|png)$/, '.webp');

      try {
        await sharp(imagePath)
          .resize(MAX_WIDTH, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: QUALITY })
          .toFile(outputPath);

        const newStats = fs.statSync(outputPath);
        const newSizeKB = newStats.size / 1024;
        const savings = ((sizeKB - newSizeKB) / sizeKB * 100).toFixed(1);

        console.log(`  ✅ Saved ${savings}% (${newSizeKB.toFixed(0)}KB)`);
      } catch (error) {
        console.error(`  ❌ Failed: ${error.message}`);
      }
    }
  }
}

optimizeImages();
```

Run with:
```bash
node scripts/bulk-optimize.mjs
```

## Testing Optimized Images

1. **Visual Check:**
   ```bash
   pnpm dev
   # Visit pages with optimized images
   # Check for quality issues
   ```

2. **Size Check:**
   ```bash
   du -sh public/images public/media
   # Should be <100MB total
   ```

3. **Performance Check:**
   - Open Chrome DevTools
   - Network tab
   - Check image sizes
   - Verify WebP format served

## Automated Optimization in CI/CD

Add to `.github/workflows/optimize-images.yml`:

```yaml
name: Optimize Images

on:
  push:
    paths:
      - 'public/images/**'
      - 'public/media/**'

jobs:
  optimize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install -g sharp-cli
      
      - name: Optimize images
        run: bash scripts/optimize-images.sh
      
      - name: Commit optimized images
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add public/
          git commit -m "Optimize images" || echo "No changes"
          git push
```

## Best Practices

1. **Always use Next.js Image component** - Automatic optimization
2. **Specify dimensions** - Prevents layout shift
3. **Use priority for above-fold** - Faster LCP
4. **Lazy load below-fold** - Default behavior
5. **Use blur placeholders** - Better UX
6. **Serve WebP/AVIF** - Smaller file sizes
7. **Responsive images** - Different sizes for devices
8. **CDN delivery** - Faster global access

## Quick Wins

1. **Convert hero image:**
   ```bash
   sharp -i public/images/hero/home-hero-top-gradient.jpg \
         -o public/images/hero/home-hero-top-gradient.webp \
         --webp --resize 1920 --quality 85
   ```
   Savings: ~2.5MB → ~200KB (92% reduction)

2. **Convert PNG to WebP:**
   ```bash
   for img in public/images/artlist/*.png; do
     sharp -i "$img" -o "${img%.png}.webp" --webp --quality 85
   done
   ```
   Savings: ~50-70% per image

3. **Batch resize large images:**
   ```bash
   find public/images -name "*.jpg" -size +1M -exec \
     sharp -i {} -o {}.webp --webp --resize 1920 \;
   ```

## Monitoring

Track image sizes in production:

```typescript
// lib/image-monitor.ts
export function trackImageLoad(src: string, size: number) {
  if (size > 500 * 1024) { // 500KB
    console.warn(`Large image loaded: ${src} (${(size / 1024).toFixed(0)}KB)`);
  }
}
```

---

**Last Updated:** December 6, 2024
