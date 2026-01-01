# Image & Asset Optimization Audit Report

**Generated:** 2025-12-28  
**Platform:** Elevate for Humanity - Full Site + LMS

---

## Executive Summary

- **Total Media References:** 86 unique files
- **Missing Files:** 22 (26% broken)
- **Files Found:** 64 (74% working)
- **Large Files (>500KB):** 20 files need optimization
- **Duplicate Usage:** 2 images used 500+ times combined

---

## 🔴 CRITICAL ISSUES

### 1. Missing Media Files (22 files)

#### **Backup Media References** (8 files)

These reference old backup directories that don't exist:

- `/media-backup-20251128-043832/additional-image-12-hd.jpg`
- `/media-backup-20251128-043832/additional-image-14-hd.jpg`
- `/media-backup-20251128-043832/hero-elevate-learners.jpg` (used 3x)
- `/media-backup-20251128-043832/hero-slide-healthcare.jpg`
- `/media-backup-20251128-043832/programs/beauty-hd.jpg` (used 8x)
- `/media-backup-20251128-043832/programs/healthcare-professional-1-hd.jpg`
- `/media-backup-20251128-043832/programs/tax-prep-hd.jpg` (used 2x)
- `/media-backup-20251128-043832/state-funding-hero.jpg`

**Files Affected:**

- `app/enhanced-home/page.tsx`
- `app/compare-programs/page.tsx`
- `app/portal/instructor/skills-tracking-esthetician/page.tsx`
- `app/portal/instructor/skills-tracking-nail/page.tsx`
- `app/vita/page.tsx`
- `app/tax-services/page.tsx`
- `app/wioa-eligibility/page.tsx`

#### **Generated Images** (4 files)

Course cover images that should be auto-generated:

- `/generated-images/course-barber-cover.png`
- `/generated-images/course-healthcare-cover.png`
- `/generated-images/course-hvac-cover.png`

**Files Affected:**

- `components/marketing/HeroCarousel.tsx`
- `components/marketing/PhotoCTA.tsx`

#### **Missing Core Assets** (10 files)

- `/assets/hero-training.jpg` - Used in HeroCarousel, PhotoCTA
- `/hero/efh-hero.jpg` - Used in components/Hero.tsx
- `/images/Elevate_for_Humanity_logo_81bf0fab.png` - Used in CourseraStyleHeader
- `/images/home/home-hero-gradient-efh.jpg` - Used in HomeTopHero
- `/images/home/home-hero-program-grid-efh.jpg` - Used in HomeSecondHero
- `/images/location-9.png` - Used in SideHeroBanner
- `/media/elevate-watermark.png` - Used in Footer
- `/media/employers/employer-partnership-office-hd.jpg` - Used in home/Hero
- `/media/hero-elevate-learners.jpg` - Used in marketing/Hero
- `/media/programs/healthcare-programs-infographic-hd.jpg` - Used in home/Hero
- `/uploads/videos/enhanced-xxxxx.mp4` - Placeholder in admin video manager

---

## ⚠️ PERFORMANCE ISSUES

### Large Files Needing Optimization

**Videos (>1MB):**

- `/videos/barber-hero-final.mp4` - 1.4MB
- `/videos/business-hero-final.mp4` - 1.0MB
- `/videos/training-providers-video-with-narration.mp4` - 1.1MB

**Images (>500KB):**

- `/logo.png` - 1.0MB (should be optimized/converted to WebP)
- `/images/testimonials/testimonial-success-story-4.png` - 761KB
- `/images/hero-banner-new.png` - 759KB
- `/images/testimonials/testimonial-medical-assistant.png` - 716KB
- `/images/testimonials/testimonial-success-story-5.png` - 668KB
- `/images/funding/infographic-wrg-process.png` - 626KB
- `/images/heroes/hero-banner-latest.png` - 616KB
- Multiple split images (piece-\*.png) - 550-620KB each

**Recommendation:** Convert PNG files to WebP format (60-80% size reduction)

---

## 🔄 DUPLICATE USAGE ISSUES

### Excessive Image Reuse

- `/images/gallery/image8.jpg` - **289 uses** across the platform
- `/images/gallery/image3.jpg` - **265 uses** across the platform
- `/images/hero/admin-hero.jpg` - 124 uses
- `/images/hero/portal-hero.jpg` - 106 uses

**Impact:** These generic placeholder images are being reused everywhere, creating a repetitive user experience.

**Recommendation:** Create context-specific images for different sections.

---

## ✅ FIXES APPLIED

1. ✅ Fixed homepage hero image path: `homepage-hero.jpg` → `hero-homepage.jpg`
2. ✅ Replaced duplicate `training-provider-1.jpg` with `hero-employer-partnerships.jpg`
3. ✅ Replaced all homepage placeholders with Artlist images (6 images)
4. ✅ Fixed agencies hero: `agencies-hero.jpg` → `workforce-partner-1.jpg`
5. ✅ Fixed employers hero: `employers-hero.jpg` → `hero-employers.jpg`
6. ✅ Removed video hero from homepage (replaced with static image for performance)

---

## 📋 RECOMMENDED ACTIONS

### Immediate (Critical)

1. **Fix Backup Media References**
   - Replace all `/media-backup-20251128-043832/` references with actual files
   - Alternative: Copy files from backup to proper locations

2. **Generate Missing Course Covers**
   - Run course cover generation script for barber, healthcare, HVAC programs
   - Or create placeholder covers manually

3. **Fix Missing Core Assets**
   - Add missing logo file or update reference
   - Create/add missing hero images
   - Remove placeholder video reference in admin

### Short-term (Performance)

4. **Optimize Large Images**

   ```bash
   # Convert PNG to WebP
   find public/images -name "*.png" -size +500k -exec cwebp -q 85 {} -o {}.webp \;
   ```

5. **Add `sizes` Attribute to Images**
   - All images with `fill` prop should have `sizes` attribute
   - Improves Next.js image optimization

6. **Compress Videos**
   ```bash
   # Re-encode videos at lower bitrate
   ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow output.mp4
   ```

### Long-term (UX)

7. **Replace Generic Placeholders**
   - Create unique images for the 289 uses of `image8.jpg`
   - Create unique images for the 265 uses of `image3.jpg`
   - Improves visual diversity and user experience

8. **Implement Lazy Loading**
   - Add `loading="lazy"` to below-fold images
   - Keep `priority` only for above-fold hero images

9. **Add Image Alt Text Audit**
   - Ensure all images have descriptive alt text
   - Improves accessibility and SEO

---

## 📊 STATISTICS

- **Total Files Scanned:** 2,193 TypeScript/JavaScript files
- **Image Components:** 990 without priority, 552 with priority
- **PNG Files in Public:** 105 files (many could be WebP)
- **Video Files:** 26 files in `/public/videos/`
- **LMS/Portal Media:** 4 unique images (mostly working)

---

## 🔧 QUICK FIX SCRIPT

```bash
# Fix missing backup media by using available alternatives
cd /workspaces/fix2

# Replace backup references with actual files
find app -name "*.tsx" -exec sed -i 's|/media-backup-20251128-043832/programs/beauty-hd.jpg|/media/programs/beauty.jpg|g' {} \;
find app -name "*.tsx" -exec sed -i 's|/media-backup-20251128-043832/programs/tax-prep-hd.jpg|/media/programs/efh-tax-office-startup-hero.jpg|g' {} \;
find app -name "*.tsx" -exec sed -i 's|/media-backup-20251128-043832/hero-elevate-learners.jpg|/images/heroes/hero-elevate-learners.jpg|g' {} \;

# Optimize large PNGs to WebP
# (requires cwebp tool)
# find public/images -name "*.png" -size +500k -exec sh -c 'cwebp -q 85 "$1" -o "${1%.png}.webp"' _ {} \;
```

---

## 🎯 PRIORITY MATRIX

| Priority | Issue                         | Impact | Effort |
| -------- | ----------------------------- | ------ | ------ |
| P0       | Fix 22 missing files          | High   | Medium |
| P1       | Optimize 20 large files       | Medium | Low    |
| P2       | Replace 500+ duplicate images | Medium | High   |
| P3       | Add sizes attributes          | Low    | Medium |
| P4       | Lazy loading implementation   | Low    | Low    |

---

**End of Report**
