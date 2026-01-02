# Image Cleanup Plan - January 2, 2025

## Issues Found

1. ✅ **Unsplash URLs in code** - Found in supersonic-fast-cash page
2. ✅ **309 duplicate images** - Same images with different names
3. ⚠️ **Generic placeholders** - Need to identify
4. ⚠️ **Cartoon/symbol images** - Need to identify
5. ✅ **Video hero banners** - DO NOT REPLACE (keep as-is)

---

## Action Plan

### 1. Remove Unsplash URLs from Code

**Files to fix:**
- `/app/supersonic-fast-cash/page-gradient-modern.tsx`
- `/app/api/ai-studio/stock-media/route.ts` (API only, not displayed)

**Replace with:**
- Artlist images
- Pexels images
- Custom photos

### 2. Remove Duplicate Images (309 found)

**Strategy:**
- Keep one copy of each unique image
- Delete duplicates
- Update references in code

**Estimated space savings:** ~50-80MB

### 3. Identify Generic Placeholders

**Look for:**
- Images named "placeholder"
- Images named "generic"
- Images named "sample"
- Images named "temp"
- Stock photo watermarks

### 4. Identify Cartoon/Symbol Images

**Look for:**
- SVG icons (keep functional ones)
- Cartoon illustrations
- Clipart style images
- Generic symbols

### 5. Protect Video Hero Banners

**DO NOT TOUCH:**
- `/videos/hero-home.mp4`
- `/videos/elevate-overview-web.mp4`
- Any video files
- VideoHeroBanner component
- Video-based hero sections

---

## Execution Steps

### Step 1: Fix Unsplash URLs
Replace external Unsplash URLs with local images from Artlist/Pexels

### Step 2: Find and Remove Duplicates
```bash
# Find duplicates
find public/images -type f \( -name "*.jpg" -o -name "*.png" \) -exec md5sum {} \; | sort | uniq -w32 -D

# Keep first occurrence, delete rest
# Manual review required
```

### Step 3: Identify Placeholders
```bash
# Find placeholder images
find public/images -name "*placeholder*" -o -name "*generic*" -o -name "*sample*" -o -name "*temp*"
```

### Step 4: Identify Cartoons/Symbols
```bash
# Find potential cartoon images (manual review needed)
find public/images -name "*icon*" -o -name "*symbol*" -o -name "*cartoon*"
```

### Step 5: Create Hero Banners from Real Photos
Use Artlist and Pexels images to create professional hero banners

---

## Images to Keep (DO NOT TOUCH)

### ✅ Homepage Images (PROTECTED)
- `/images/homepage/students.jpg`
- `/images/homepage/employers.jpg`
- `/images/homepage/schools-nonprofits.jpg`
- `/images/homepage/government-agencies.jpg`
- `/images/homepage/funders-philanthropy.jpg`
- `/images/homepage/funded-programs-optimized.jpg`
- `/images/homepage/licensable-platform.jpg`
- `/images/homepage/wraparound-support-optimized.jpg`
- **DO NOT REPLACE OR MODIFY**

### ✅ Program Page Photos (PROTECTED)
- All images in `/images/programs/`
- All program card images
- All program hero images
- **DO NOT REPLACE OR MODIFY**

### ✅ Video Files (PROTECTED)
- All .mp4 files in /videos/
- Video hero banner component
- **DO NOT REPLACE OR MODIFY**

### ✅ Real Photos
- Team member photos
- Student photos
- Facility photos

### ✅ Professional Stock
- Artlist images (paid, high quality)
- Pexels images (free, professional)

### ✅ Functional Icons
- Navigation icons
- Social media icons
- Feature icons (if professional)

### ✅ Branded Graphics
- EFH logos
- Custom branded images
- Marketing materials

---

## Images to Remove

### ❌ Unsplash URLs
- External links to images.unsplash.com
- Replace with local images

### ❌ Duplicates
- 309 duplicate images
- Keep one, delete rest

### ❌ Generic Placeholders
- Images named "placeholder"
- Images named "generic"
- Temporary images

### ❌ Cartoon/Clipart
- Cartoon illustrations
- Clipart style images
- Generic symbols (non-functional)

### ❌ Low Quality
- Pixelated images
- Watermarked images
- Poor resolution images

---

## Replacement Strategy

### For Unsplash Images
**Current:** External Unsplash URLs  
**Replace with:** Local Artlist or Pexels images

**Example:**
```tsx
// Before
src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c"

// After
src="/images/artlist/tax-professional-hero.jpg"
```

### For Generic Placeholders
**Current:** Placeholder images  
**Replace with:** Real program photos or professional stock

### For Cartoon Images
**Current:** Cartoon illustrations  
**Replace with:** Real photos or professional graphics

---

## Hero Banner Creation

### Use Real Photos From:
1. **Artlist** - Professional stock (already have subscription)
2. **Pexels** - Free professional stock
3. **Custom photos** - Real team/student photos

### Hero Banner Specs:
- **Size:** 1920x1080 minimum
- **Format:** JPG (optimized)
- **File size:** < 500KB
- **Style:** Professional, real people, action shots
- **Content:** Relevant to page/program

### Pages Needing Hero Banners:
- ✅ Homepage (has video hero - keep)
- Programs catalog page
- Individual program pages
- About page
- Contact page
- Blog page
- Rise Foundation page

---

## Implementation Priority

### High Priority (Do First)
1. ✅ Remove Unsplash URLs from supersonic-fast-cash page
2. ✅ Create hero banners for main pages
3. ✅ Remove obvious duplicates

### Medium Priority
4. Identify and remove generic placeholders
5. Identify and remove cartoon images
6. Optimize remaining images

### Low Priority
7. Create consistent image naming
8. Organize images by category
9. Document image sources

---

## Verification Checklist

After cleanup:
- [ ] No external Unsplash URLs in code
- [ ] No duplicate images (309 removed)
- [ ] No generic placeholders
- [ ] No cartoon/clipart images
- [ ] All hero banners use real photos
- [ ] Video hero banners still working
- [ ] All images have proper alt text
- [ ] Images optimized for web

---

## Estimated Impact

**Before Cleanup:**
- 747 images
- 172MB total size
- 309 duplicates
- External dependencies (Unsplash)

**After Cleanup:**
- ~400-450 images (unique, quality)
- ~90-100MB total size
- 0 duplicates
- All local images
- Professional appearance

**Savings:**
- ~300 images removed
- ~70-80MB saved
- Faster page loads
- No external dependencies

---

## Next Steps

1. Review this plan
2. Approve removal of Unsplash, duplicates, placeholders, cartoons
3. Execute cleanup in stages
4. Test all pages after each stage
5. Verify video hero banners still work
6. Deploy and verify

---

**Status:** Plan ready for execution  
**Estimated time:** 2-3 hours  
**Risk:** Low (video heroes protected)  
**Benefit:** Cleaner, faster, more professional site
