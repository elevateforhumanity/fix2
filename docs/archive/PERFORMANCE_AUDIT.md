# Performance Audit Report

## Critical Issues Found

### 1. ⚠️ HERO VIDEO AUTOPLAY (MAJOR SLOWDOWN)

**Location:** `app/page.tsx` line 10-18
**Issue:** 739KB video autoplays immediately on page load
**Impact:** Blocks first paint, delays interactivity

**Current Code:**

```tsx
<video autoPlay muted loop playsInline preload="auto" className="w-full h-auto">
  <source src="/videos/hero-home.mp4" type="video/mp4" />
</video>
```

**Fix:**

```tsx
<video
  muted
  loop
  playsInline
  preload="none"
  poster="/images/hero-poster.jpg"
  className="w-full h-auto"
>
  <source src="/videos/hero-home.mp4" type="video/mp4" />
</video>
```

### 2. ⚠️ UNOPTIMIZED IMAGES (20+ files)

**Issue:** Multiple components use `<img>` instead of `next/image`
**Impact:** No lazy loading, no format optimization, no size optimization

**Files with `<img>` tags:**

- `components/ProgramsGrid.tsx`
- `components/Hero.tsx`
- `components/Testimonials.tsx`
- `components/VideoTestimonials.tsx`
- `components/mobile/MobileCourseCard.tsx`
- `components/dashboard/CourseCardGrid.tsx`
- And 14+ more

**Fix:** Replace all `<img>` with `next/image`:

```tsx
// ❌ WRONG
<img src="/images/photo.jpg" alt="..." />

// ✅ CORRECT
<Image
  src="/images/photo.jpg"
  alt="..."
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 800px"
/>
```

### 3. ⚠️ LARGE PNG FILES (500KB+)

**Issue:** Hero images and testimonials using PNG instead of WebP/JPG
**Impact:** 3-5x larger file sizes

**Large files found:**

- `public/images/heroes/hero-banner-latest.png` - 616KB
- `public/images/testimonials/testimonial-success-story-5.png` - 668KB
- `public/images/testimonials/testimonial-medical-assistant.png` - 500KB+
- 7+ more testimonial PNGs

**Fix:** Convert to WebP or JPG (reduces to ~100-150KB each)

### 4. ✅ FONTS - ALREADY OPTIMIZED

**Status:** Using `next/font` with Inter - NO CHANGES NEEDED
**Location:** `app/layout.tsx`

### 5. ✅ NO THIRD-PARTY SCRIPTS FOUND

**Status:** No Calendly, chat widgets, or heavy analytics on homepage
**Impact:** Good - no external blocking scripts

## Performance Fixes Priority

### HIGH PRIORITY (Do First)

1. **Remove autoplay from hero video** - Add poster image instead
2. **Replace `<img>` with `next/image` in top 5 components:**
   - `components/Hero.tsx`
   - `components/ProgramsGrid.tsx`
   - `components/Testimonials.tsx`
   - `app/page.tsx` (if any remaining)
   - `components/dashboard/CourseCardGrid.tsx`

3. **Convert large PNGs to WebP:**
   - All hero images
   - All testimonial images

### MEDIUM PRIORITY

4. Add `priority` prop to hero image on homepage
5. Add proper `sizes` attribute to all images
6. Lazy load below-fold sections with `dynamic()`

### LOW PRIORITY

7. Add `revalidate` to static pages
8. Enable Vercel Speed Insights
9. Optimize remaining `<img>` tags in less-used components

## Expected Performance Gains

**Before:**

- LCP: ~3-4s (video blocking)
- FCP: ~2s
- Total page weight: ~2-3MB

**After:**

- LCP: ~1-1.5s (optimized images)
- FCP: ~0.8s
- Total page weight: ~500-800KB

## Quick Win Commands

```bash
# Find all img tags
grep -rn "<img" components/ app/ --include="*.tsx" --include="*.jsx"

# Find large images
find public/images -size +500k

# Convert PNG to WebP (requires imagemagick)
for file in public/images/heroes/*.png; do
  cwebp -q 80 "$file" -o "${file%.png}.webp"
done
```

## Next Steps

1. Fix hero video (2 min)
2. Replace top 5 `<img>` components (10 min)
3. Convert large PNGs to WebP (5 min)
4. Test with Lighthouse (2 min)
5. Deploy and verify (3 min)

**Total time: ~20 minutes for 60-70% performance improvement**
