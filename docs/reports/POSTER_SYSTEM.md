# Elevate for Humanity — Unified Program Poster System

## 🎨 Overview

Professional branded posters for all 9 programs with consistent visual identity and realistic photo collages.

## 🧩 Brand Structure

Every poster includes:

### Header Section

- **ELEVATE FOR HUMANITY** (DejaVu Serif Bold)
- Career & Technical Institute
- "Career & Technical Training That Elevates Communities"

### Middle Section

- Full-color, realistic photo collage (2×2 grid)
- Program name in bold navy
- Orange tagline directly below the title

### Footer Section

- Learn, Grow, Achieve
- www.elevateforhumanity.org

## 🎨 Color Palette

- **White Background**: #FFFFFF
- **Orange Border**: #FF6600
- **Navy Text**: #0B2545
- **Clean shadows for depth**

## 📝 Font Family

- **Header**: DejaVu Serif Bold
- **Subhead**: DejaVu Sans Bold
- **Tagline/Body**: DejaVu Sans Regular

All fonts are Gitpod-safe with no external dependencies.

## 🎓 Programs (9 Posters)

| #   | Program Title                              | Tagline                                     | Visual Focus                   |
| --- | ------------------------------------------ | ------------------------------------------- | ------------------------------ |
| 1   | Barber Apprenticeship Program              | Start Your Career in the Barbering Industry | Barbers, clients, tools        |
| 2   | Building Services Technician               | Construction • Electrical • HVAC Training   | Workers in safety gear, wiring |
| 3   | Certified Nursing Assistant (CNA)          | Launch a Career in Healthcare               | Students in scrubs, caregiving |
| 4   | CPR, AED & First Aid Certification         | Learn to Save Lives with Confidence         | Hands-on CPR mannequin         |
| 5   | Business Start-Up & Marketing              | Turn Your Vision Into a Business            | Entrepreneurial classroom      |
| 6   | Tax Office Startup                         | Become a Certified Tax Professional         | Students at computers          |
| 7   | Professional Esthetician & Client Services | Train for Beauty & Wellness Careers         | Skincare and salon scenes      |
| 8   | Beauty & Career Educator Program           | Lead & Inspire the Next Generation          | Instructor teaching students   |
| 9   | Public Safety Reentry Specialist           | Empower Returning Citizens for Success      | Mentoring, workforce programs  |

## 📐 Image Sizes Generated

| Type | Dimensions  | Use                                |
| ---- | ----------- | ---------------------------------- |
| Hero | 1200×900 px | Site banners, program detail pages |
| Card | 1600×900 px | Program grid cards, listings       |
| OG   | 1200×630 px | Social media previews (Open Graph) |

## 📁 Output Directory

```
public/images/programs/
├── efh-barber-hero.jpg
├── efh-barber-card.jpg
├── efh-barber-og.jpg
├── efh-building-tech-hero.jpg
├── efh-building-tech-card.jpg
├── efh-building-tech-og.jpg
├── efh-cna-hero.jpg
├── efh-cna-card.jpg
├── efh-cna-og.jpg
├── efh-cpr-aed-first-aid-hero.jpg
├── efh-cpr-aed-first-aid-card.jpg
├── efh-cpr-aed-first-aid-og.jpg
├── efh-business-startup-marketing-hero.jpg
├── efh-business-startup-marketing-card.jpg
├── efh-business-startup-marketing-og.jpg
├── efh-tax-office-startup-hero.jpg
├── efh-tax-office-startup-card.jpg
├── efh-tax-office-startup-og.jpg
├── efh-esthetician-client-services-hero.jpg
├── efh-esthetician-client-services-card.jpg
├── efh-esthetician-client-services-og.jpg
├── efh-beauty-career-educator-hero.jpg
├── efh-beauty-career-educator-card.jpg
├── efh-beauty-career-educator-og.jpg
├── efh-public-safety-reentry-hero.jpg
├── efh-public-safety-reentry-card.jpg
└── efh-public-safety-reentry-og.jpg
```

**Total**: 27 images (9 programs × 3 variants)

## ⚙️ Usage

### Generate Images

```bash
npm run make:images
```

This runs `tools/make_brand_images.py` which generates all 27 images with consistent branding.

### Automatic Regeneration

Images can be regenerated automatically during:

- Local development builds
- CI/CD pipelines
- Netlify deployments

### Manual Regeneration

```bash
python3 tools/make_brand_images.py
```

## 🔧 Customization

To modify the poster design:

1. Edit `tools/make_brand_images.py`
2. Update the `PROGRAMS` array for new programs
3. Adjust colors in the brand constants
4. Modify layout dimensions as needed
5. Run `npm run make:images` to regenerate

## 📊 Technical Details

- **Format**: JPEG
- **Quality**: 95% (optimized)
- **Color Space**: RGB
- **Compression**: Optimized for web
- **Average File Size**:
  - Hero: ~150KB
  - Card: ~165KB
  - OG: ~130KB

## ✅ Quality Checklist

- [x] Consistent branding across all posters
- [x] Orange border (#FF6600) on all images
- [x] Navy text (#0B2545) for readability
- [x] White background for clean look
- [x] Realistic photo collage placeholders
- [x] Proper text wrapping for long titles
- [x] Footer with website and slogan
- [x] Optimized file sizes for web
- [x] All 9 programs covered
- [x] 3 variants per program (hero, card, OG)

## 🚀 Deployment

Images are automatically included in the build and deployed to:

- Netlify: `public/images/programs/`
- Production URL: `https://www.elevateforhumanity.org/images/programs/`

## 📝 Notes

- Images use placeholder collages that can be replaced with actual photos
- The 2×2 grid layout allows for easy photo replacement
- All fonts are system fonts (Gitpod-safe)
- No external dependencies required
- Script is idempotent (safe to run multiple times)

## 🎯 Future Enhancements

- [ ] Add actual program photos to replace placeholders
- [ ] Create animated versions for social media
- [ ] Generate additional sizes for mobile optimization
- [ ] Add program-specific color accents
- [ ] Create printable PDF versions
