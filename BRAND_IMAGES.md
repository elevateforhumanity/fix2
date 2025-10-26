# Brand Image System

## Overview

Automated system to generate on-brand placeholder images for all programs. Ensures the site always has polished, professional images even in clean builds.

## Quick Start

```bash
# Generate all images
npm run make:images

# Or run directly
python3 tools/make_brand_images.py
```

This creates:
- **6 program images** (hero + card for each of 3 programs)
- **1 social preview** (og.jpg for Facebook/Twitter)

## Generated Images

### Program Images

| Program | Hero (1200×900) | Card (1600×900) |
|---------|-----------------|-----------------|
| Barber Apprenticeship | `efh-barber-hero.jpg` | `efh-barber-card.jpg` |
| Building Technician | `efh-building-tech-hero.jpg` | `efh-building-tech-card.jpg` |
| CNA | `efh-cna-hero.jpg` | `efh-cna-card.jpg` |

### Social Preview

| File | Size | Usage |
|------|------|-------|
| `og.jpg` | 1200×630 | Facebook, Twitter, LinkedIn previews |

## Brand Colors

```python
NAVY = (11, 37, 69)    # Primary text
ORANGE = (255, 102, 0)  # Accent color
```

## Image Design

### Hero Images (1200×900)
- White background with subtle grid pattern
- Orange border (6px)
- Navy title text
- Orange tagline
- Navy footer bar with white/orange text
- Website URL at bottom

### Card Images (1600×900)
- White background with subtle grid pattern
- Orange border (6px)
- Navy title text
- Orange tagline
- Navy footer bar with branding

### Social Preview (1200×630)
- Navy background with orange stripes
- White title text
- Orange tagline
- Optimized for social media sharing

## Replacing with Real Photos

When you have real program photos:

1. **Keep the same filenames** - No code changes needed
2. **Match the dimensions**:
   - Hero: 1200×900 (4:3 aspect ratio)
   - Card: 1600×900 (16:9 aspect ratio)
   - OG: 1200×630 (~1.9:1 aspect ratio)
3. **Place in `public/images/`**
4. **Commit and deploy**

The site will automatically use your real photos instead of placeholders.

## Adding New Programs

Edit `tools/make_brand_images.py`:

```python
programs = [
    ("barber", "Barber Apprenticeship", "Earn While You Learn"),
    ("building-tech", "Building Technician", "Electrical • Construction • HVAC"),
    ("cna", "Certified Nursing Assistant (CNA)", "Care • Dignity • Independence"),
    ("welding", "Welding Apprenticeship", "MIG • TIG • Stick"),  # Add new program
]
```

Then run:
```bash
npm run make:images
```

## CI/CD Integration

### GitHub Actions

Add to `.github/workflows/deploy.yml`:

```yaml
- name: Generate brand images
  run: npm run make:images

- name: Build site
  run: npm run build
```

### Netlify Build

Add to `netlify.toml`:

```toml
[build]
  command = "npm run make:images && npm run build"
  publish = "dist"
```

## Requirements

**Python 3.7+** with Pillow:

```bash
# Install Pillow
pip install Pillow

# Or in Gitpod (already available)
python3 -m pip install --user Pillow
```

## Troubleshooting

### "No module named 'PIL'"

Install Pillow:
```bash
pip install Pillow
```

### Fonts not found

The script falls back to default fonts if DejaVu fonts aren't available. For better results, install:

```bash
# Ubuntu/Debian
sudo apt-get install fonts-dejavu

# macOS (via Homebrew)
brew install --cask font-dejavu
```

### Images not showing on site

1. Check files exist: `ls -la public/images/`
2. Verify paths in `src/data/programs.ts` match filenames
3. Clear browser cache
4. Rebuild: `npm run build`

## File Locations

```
public/
├── og.jpg                          ← Social preview
└── images/
    ├── efh-barber-hero.jpg        ← Barber hero
    ├── efh-barber-card.jpg        ← Barber card
    ├── efh-building-tech-hero.jpg ← Building Tech hero
    ├── efh-building-tech-card.jpg ← Building Tech card
    ├── efh-cna-hero.jpg           ← CNA hero
    └── efh-cna-card.jpg           ← CNA card
```

## Benefits

✅ **Always have images** - No broken placeholders  
✅ **On-brand design** - Consistent navy/orange styling  
✅ **CI/CD friendly** - Works in clean builds  
✅ **Easy to replace** - Swap with real photos anytime  
✅ **No code changes** - Just replace image files  
✅ **Fast generation** - Creates all images in seconds

## Example Output

```bash
$ npm run make:images

> efh-autopilot@2.0.0 make:images
> python3 tools/make_brand_images.py

✅ Created public/images/efh-barber-hero.jpg
✅ Created public/images/efh-barber-card.jpg
✅ Created public/images/efh-building-tech-hero.jpg
✅ Created public/images/efh-building-tech-card.jpg
✅ Created public/images/efh-cna-hero.jpg
✅ Created public/images/efh-cna-card.jpg
✅ Created public/og.jpg

🎉 All images generated successfully!
   Location: public/images
   Total: 6 program images + 1 social preview
```

## Next Steps

1. **Generate images**: `npm run make:images`
2. **Build site**: `npm run build`
3. **Preview**: `npm run preview`
4. **Deploy**: `git push`

When you have real photos, just replace the files in `public/images/` and redeploy!

---

**Questions?** See `IMAGE_SETUP_GUIDE.md` for more details on image requirements.
