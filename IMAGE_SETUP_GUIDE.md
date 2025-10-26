# Image Setup Guide

## Quick Start: Add Your Images

### Step 1: Prepare Your Images

You need images for each program (2 per program) plus 1 social preview:

**Current Programs:**
1. **Barber Apprenticeship** - Hero + Card
2. **CNA (Certified Nursing Assistant)** - Hero + Card
3. **Building Technician** - Hero + Card
4. **HVAC Technician** - Hero + Card
5. **Digital Marketing** - Hero + Card
6. **Tax Office Startup** - Hero + Card
7. **Social Preview** - For Facebook/Twitter shares (og.jpg)

### Step 2: Resize Images (Recommended Sizes)

| Image | Filename | Size | Aspect Ratio |
|-------|----------|------|--------------|
| Hero | `efh-barber-hero.jpg` | 1200×900 | 4:3 |
| Barber Card | `efh-barber-card.jpg` | 1600×900 | 16:9 |
| Building Card | `efh-building-card.jpg` | 1600×900 | 16:9 |
| Social Preview | `og.jpg` | 1200×630 | ~1.9:1 |

**Tools for resizing:**
- [Squoosh.app](https://squoosh.app) - Free, browser-based
- [TinyPNG](https://tinypng.com) - Compress after resizing
- Photoshop, GIMP, or Preview (Mac)

### Step 3: Place Files

```
public/
├── og.jpg                          ← Social preview (root level)
└── images/
    ├── efh-barber-hero.jpg        ← Hero banner
    ├── efh-barber-card.jpg        ← Barber program card
    └── efh-building-card.jpg      ← Building program card
```

**Commands:**
```bash
# Create directory (if not exists)
mkdir -p public/images

# Copy your images (example)
cp ~/Downloads/barber-flyer.jpg public/images/efh-barber-hero.jpg
cp ~/Downloads/barber-collage.jpg public/images/efh-barber-card.jpg
cp ~/Downloads/building-collage.jpg public/images/efh-building-card.jpg
cp ~/Downloads/social-preview.jpg public/og.jpg
```

### Step 4: Verify Paths

After placing images, check they exist:

```bash
ls -lh public/og.jpg
ls -lh public/images/
```

Expected output:
```
-rw-r--r-- 1 user user 245K Oct 26 10:00 public/og.jpg

public/images/:
-rw-r--r-- 1 user user 312K Oct 26 10:00 efh-barber-card.jpg
-rw-r--r-- 1 user user 298K Oct 26 10:00 efh-barber-hero.jpg
-rw-r--r-- 1 user user 287K Oct 26 10:00 efh-building-card.jpg
```

### Step 5: Build and Test

```bash
# Build the site
npm run build

# Preview locally
npm run preview

# Test these URLs:
# http://localhost:4173/
# http://localhost:4173/programs
# http://localhost:4173/about
```

All images should load on every route.

---

## Using Your Barber Flyer

### Option A: Use Flyer as Hero + OG Image

If your flyer is perfect as-is:

```bash
# Use same image for both hero and social preview
cp your-flyer.jpg public/images/efh-barber-hero.jpg
cp your-flyer.jpg public/og.jpg
```

### Option B: Crop Flyer for Different Uses

**Hero (4:3):** Crop to focus on main content
**OG (1200×630):** Crop to fit social media preview
**Card (16:9):** Crop to fit program card

**Quick crop with ImageMagick:**
```bash
# Hero (4:3)
convert your-flyer.jpg -resize 1200x900^ -gravity center -extent 1200x900 public/images/efh-barber-hero.jpg

# OG (1200×630)
convert your-flyer.jpg -resize 1200x630^ -gravity center -extent 1200x630 public/og.jpg

# Card (16:9)
convert your-flyer.jpg -resize 1600x900^ -gravity center -extent 1600x900 public/images/efh-barber-card.jpg
```

---

## Fallback Behavior

The landing page has **smart fallbacks**:

- If image is missing, shows gray placeholder with helpful text
- No broken image icons
- Site still works, just without photos

**Example fallback message:**
```
"Add efh-barber-hero.jpg to public/images/"
```

---

## Image Optimization

### Compress for Web

Target file sizes:
- Hero: < 300 KB
- Cards: < 200 KB each
- OG: < 250 KB

**Tools:**
- [TinyPNG](https://tinypng.com) - Lossy compression
- [Squoosh](https://squoosh.app) - Advanced options
- ImageMagick: `convert input.jpg -quality 85 output.jpg`

### Convert to WebP (Optional)

WebP is 25-35% smaller than JPG:

```bash
# Install cwebp (Ubuntu/Debian)
sudo apt install webp

# Convert images
cwebp -q 85 public/images/efh-barber-hero.jpg -o public/images/efh-barber-hero.webp
cwebp -q 85 public/images/efh-barber-card.jpg -o public/images/efh-barber-card.webp
cwebp -q 85 public/images/efh-building-card.jpg -o public/images/efh-building-card.webp
```

Then update code to use `.webp` instead of `.jpg`.

---

## Testing Social Previews

After deploying with `og.jpg`:

### Facebook
1. Go to [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Enter: `https://www.elevateforhumanity.org`
3. Click **Scrape Again**
4. Verify image shows correctly

### Twitter
1. Go to [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. Enter: `https://www.elevateforhumanity.org`
3. Click **Preview card**
4. Verify image and text

### LinkedIn
1. Go to [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
2. Enter: `https://www.elevateforhumanity.org`
3. Click **Inspect**
4. Verify preview

---

## Troubleshooting

### Images Don't Show on Deep Links

**Problem:** Images work on `/` but not on `/programs`

**Solution:** Use rooted paths (starting with `/`)

✅ Correct:
```tsx
<img src="/images/efh-barber-hero.jpg" />
```

❌ Wrong:
```tsx
<img src="./images/efh-barber-hero.jpg" />
<img src="../images/efh-barber-hero.jpg" />
```

### Images Don't Show After Deploy

**Check 1:** Verify files are in build output
```bash
# Netlify: Go to Deploys → Click latest → "Browse files"
# Look for: images/efh-barber-hero.jpg
```

**Check 2:** Case sensitivity
```bash
# Linux is case-sensitive
Hero.jpg ≠ hero.jpg
```

**Check 3:** File actually uploaded
```bash
git status
git add public/images/
git commit -m "Add program images"
git push
```

### OG Image Not Updating

**Problem:** Facebook/Twitter still shows old image

**Solution:** Clear cache
1. Facebook: Use Sharing Debugger → "Scrape Again"
2. Twitter: Wait 7 days or change filename
3. Add version query: `/og.jpg?v=2`

---

## Quick Reference

### File Paths in Code
```tsx
// Hero image
<img src="/images/efh-barber-hero.jpg" alt="..." />

// Program cards
<img src="/images/efh-barber-card.jpg" alt="..." />
<img src="/images/efh-building-card.jpg" alt="..." />

// Social preview (in HTML meta)
<meta property="og:image" content="/og.jpg" />
```

### Directory Structure
```
public/
├── og.jpg                     ← 1200×630 social preview
├── images/
│   ├── efh-barber-hero.jpg   ← 1200×900 hero
│   ├── efh-barber-card.jpg   ← 1600×900 card
│   └── efh-building-card.jpg ← 1600×900 card
└── README.md
```

### Deploy Checklist
- [ ] All 4 images added to `public/`
- [ ] Images compressed (< 300 KB each)
- [ ] Tested locally with `npm run preview`
- [ ] Tested on `/`, `/programs`, `/about`
- [ ] Committed and pushed to git
- [ ] Deployed to Netlify
- [ ] Verified on live site
- [ ] Tested social previews (Facebook, Twitter)

---

## Need Help?

**Can't resize images?**
- Upload originals and I'll resize them for you

**Don't have building tech collage?**
- Use a placeholder or stock photo temporarily
- Update later when you have real photos

**Want me to create OG image from flyer?**
- Just say "use the flyer as og.jpg" and I'll crop it to 1200×630
