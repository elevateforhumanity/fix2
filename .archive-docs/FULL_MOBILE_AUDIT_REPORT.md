# Full Website Mobile Audit Report

## Executive Summary

**Total Files Scanned**: 1,082 TSX files  
**Critical Issues Found**: 4 categories  
**Pages Requiring Fixes**: 26 pages

---

## Issue #1: Absolute Positioned Headings ⚠️

### Found: 6 instances (BACKUP FILES ONLY)

**Files**:

- `app/supersonic-fast-cash/page-backup-modern.tsx` (3 instances)
- `app/supersonic-fast-cash/page-gradient-modern.tsx` (3 instances)

**Pattern**:

```tsx
<h3 className="absolute bottom-4 left-4 right-4 text-3xl font-black uppercase text-white z-10">
```

**Risk**: HIGH on mobile - text will overlap
**Status**: ✅ NOT IN PRODUCTION (backup files only)
**Action**: Delete backup files or fix if needed

---

## Issue #2: Multiple H1 Tags (SEO + Potential Overlap) ❌

### Found: 20 pages with multiple H1 tags

**Critical Pages**:

1. `app/student/portfolio/page.tsx` - **3 H1 tags**
2. `app/onboarding/start/page.tsx` - 2 H1 tags
3. `app/next-steps/page.tsx` - 2 H1 tags
4. `app/student/courses/page.tsx` - 2 H1 tags
5. `app/student/programs/[slug]/modules/[moduleId]/page.tsx` - 2 H1 tags
6. `app/student/welcome-packet/[packetId]/page.tsx` - 2 H1 tags
7. `app/student/ai-tutor/page.tsx` - 2 H1 tags
8. `app/student/certificates/page.tsx` - 2 H1 tags
9. `app/student/hours-tracking/page.tsx` - 2 H1 tags
10. `app/apply/program-holder/page.tsx` - 2 H1 tags
11. `app/tax-filing/apply/page.tsx` - 2 H1 tags
12. `app/tax-filing/page.tsx` - 2 H1 tags
13. `app/tax-filing/enhanced/page.tsx` - 2 H1 tags
14. `app/tax-filing/join-team/page.tsx` - 2 H1 tags
15. `app/tax-filing/locations/page.tsx` - 2 H1 tags
16. `app/tax-filing/locations/[state]/page.tsx` - 2 H1 tags
17. `app/tax-self-prep/page.tsx` - 2 H1 tags
18. `app/courses/[courseId]/leaderboard/page.tsx` - 2 H1 tags
19. `app/courses/[courseId]/lessons/[lessonId]/quiz/review/[attemptId]/page.tsx` - 2 H1 tags
20. `app/courses/[courseId]/lessons/[lessonId]/quiz/take/page.tsx` - 2 H1 tags

**Risk**: MEDIUM-HIGH

- SEO penalty (only one H1 per page)
- Potential text overlap on mobile
- Confusing heading hierarchy

**Fix**: Change secondary H1 tags to H2

---

## Issue #3: Video Elements (Potential Blank Blocks) ⚠️

### Found: 26 video elements

**All Videos**:

1. `app/career-services/page.tsx`
2. `app/enroll/page.tsx`
3. `app/learners/page.tsx`
4. `app/apply/page.tsx`
5. `app/program-holder/page.tsx`
6. `app/courses/[courseId]/learn/VideoSection.tsx`
7. `app/programs/page.tsx`
8. `app/lms/(app)/courses/[courseId]/lessons/[lessonId]/page.tsx`
9. `app/supersonic-fast-cash/page.tsx`
10. `app/components/HeroSlideshow.tsx`
11. `app/industries/healthcare/page.tsx`
12. `app/employer/page.tsx`
13. `app/training-providers/page.tsx`
14. `app/partner-with-us/page.tsx`
15. `app/employers/page.tsx`
16. `app/apprenticeships/page.tsx`
17. `app/getstarted/page.tsx`
18. `app/services/page.tsx`
19. `app/admin/video-manager/page.tsx`
20. Plus 6 backup/old pages

**Common Pattern**:

```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/videos/hero-home.mp4" type="video/mp4" />
</video>
```

**Risk**: MEDIUM

- Videos without `poster` attribute show blank on slow connections
- Videos without fallback show blank if file missing
- Mobile data usage concerns

**Required Fixes**:

1. Add `poster` image to all videos
2. Verify all video files exist
3. Consider static image fallback on mobile

---

## Issue #4: Iframe Elements (Potential Blank Blocks) ⚠️

### Found: 6 iframe elements

**All Iframes**:

1. `app/schedule/page.tsx` - Calendly embed
2. `app/student/courses/scorm/[courseId]/SCORMPlayer.tsx` - SCORM player
3. `app/courses/hsi/[courseType]/learn/HSICoursePlayer.tsx` - HSI player
4. `app/supersonic-fast-cash/locations/page.tsx` - Google Maps
5. `app/test-stripe-iframe/page.tsx` - Stripe test
6. `app/admin/dev-studio/PreviewPanel.tsx` - Preview panel

**Risk**: LOW-MEDIUM

- Iframes can fail to load
- Need responsive wrappers
- Loading states needed

**Required Fixes**:

1. Add loading states
2. Add error boundaries
3. Ensure responsive aspect ratios

---

## Issue #5: Headings in Absolute Containers 🔍

### Found: 20 pages with headings inside absolute positioned divs

**Pages to Review**:

1. `app/calculator/revenue-share/page.tsx`
2. `app/partner/page.tsx`
3. `app/transparency/page.tsx`
4. `app/career-services/page.tsx`
5. `app/enroll/PayNowSection.tsx`
6. `app/rise-foundation/page-new.tsx`
7. `app/learners/page.tsx`
8. `app/wioa-eligibility/page.tsx`
9. `app/jri/page.tsx`
10. `app/community/page.tsx`
11. `app/student/portfolio/page.tsx`
12. `app/enhanced-home/page.tsx`
13. `app/vita/page.tsx`
14. `app/agencies/page.tsx`
15. `app/apply/page.tsx`
16. `app/success-stories/page.tsx`
17. `app/program-holder/page.tsx`
18. `app/program-holder/reports/new/page.tsx`
19. `app/tax-filing/enhanced/page.tsx`
20. Plus backup pages

**Risk**: MEDIUM

- Not all are problematic (many are hero overlays)
- Need manual review to identify actual issues

**Action**: Manual review of each page

---

## Issue #6: Mobile Menu Backdrop ❌ CRITICAL

### Found: Incorrect positioning in SiteHeader

**File**: `components/layout/SiteHeader.tsx`

**Current Code**:

```tsx
<div
  className="lg:hidden fixed inset-0 bg-black/50 z-40 top-16"
  onClick={() => setMobileMenuOpen(false)}
/>
```

**Problem**:

- `top-16` = 64px
- Header height = 72px
- Mismatch causes positioning issues

**Fix**:

```tsx
<div
  className="lg:hidden fixed inset-0 bg-black/50 z-40"
  style={{ top: 'var(--header-h)' }}
  onClick={() => setMobileMenuOpen(false)}
/>
```

---

## Priority Fix List

### IMMEDIATE (Launch Blockers)

1. **Fix mobile menu backdrop** - `components/layout/SiteHeader.tsx`
   - Change `top-16` to use `var(--header-h)`
   - Apply to both backdrop and menu panel

2. **Fix multiple H1 tags** - 20 pages
   - Change secondary H1 to H2
   - Maintain visual styling with classes

### HIGH (User Experience)

3. **Add poster images to videos** - 26 videos
   - Create poster images for all hero videos
   - Add `poster="/images/posters/hero-home.jpg"` attribute

4. **Verify video files exist** - 26 videos
   - Check all `/videos/*.mp4` files exist
   - Add fallback images if missing

### MEDIUM (Polish)

5. **Add iframe loading states** - 6 iframes
   - Add loading spinners
   - Add error boundaries
   - Ensure responsive wrappers

6. **Review absolute positioned headings** - 20 pages
   - Manual review each page
   - Fix any that cause mobile overlap

### LOW (Maintenance)

7. **Delete backup files** - Multiple files
   - Remove `page-backup-*.tsx` files
   - Remove `page-old*.tsx` files
   - Clean up unused components

---

## Fixes to Apply Now

### Fix #1: Mobile Menu Backdrop

**File**: `components/layout/SiteHeader.tsx`

**Line ~280-290**:

```tsx
// BEFORE
{mobileMenuOpen && (
  <>
    <div
      className="lg:hidden fixed inset-0 bg-black/50 z-40 top-16"
      onClick={() => setMobileMenuOpen(false)}
      aria-hidden="true"
    />
    <div
      id="mobile-menu"
      className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto pb-safe shadow-2xl"
    >

// AFTER
{mobileMenuOpen && (
  <>
    <div
      className="lg:hidden fixed inset-0 bg-black/50 z-40"
      style={{ top: 'var(--header-h)' }}
      onClick={() => setMobileMenuOpen(false)}
      aria-hidden="true"
    />
    <div
      id="mobile-menu"
      className="lg:hidden fixed left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto pb-safe shadow-2xl"
      style={{ top: 'var(--header-h)' }}
    >
```

### Fix #2: Multiple H1 Tags Example

**File**: `app/student/portfolio/page.tsx`

**Lines 112, 137, 256**:

```tsx
// BEFORE
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
  Student Portfolio
</h1>

<h1 className="text-2xl font-bold mb-4">No Active Apprenticeship</h1>

<h1 className="text-2xl font-bold mb-2">My Portfolio</h1>

// AFTER
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
  Student Portfolio
</h1>

<h2 className="text-2xl font-bold mb-4">No Active Apprenticeship</h2>

<h2 className="text-2xl font-bold mb-2">My Portfolio</h2>
```

---

## Testing Checklist

After fixes:

### Mobile Menu

- [ ] Open mobile menu
- [ ] Verify backdrop starts at header bottom (no gap)
- [ ] Close menu - verify backdrop disappears
- [ ] Verify page is not dimmed when closed

### Heading Hierarchy

- [ ] Run accessibility audit
- [ ] Verify only one H1 per page
- [ ] Verify proper H1 → H2 → H3 hierarchy

### Videos

- [ ] All videos have poster images
- [ ] Videos load on mobile
- [ ] No blank blocks where videos should be

### Iframes

- [ ] All iframes load properly
- [ ] Loading states show
- [ ] Responsive on all screen sizes

---

## Summary

**Total Issues**: 6 categories  
**Critical**: 1 (mobile menu backdrop)  
**High**: 2 (multiple H1s, video posters)  
**Medium**: 2 (iframes, absolute headings review)  
**Low**: 1 (cleanup backup files)

**Estimated Fix Time**:

- Critical: 5 minutes
- High: 2 hours
- Medium: 4 hours
- Low: 30 minutes

**Total**: ~7 hours to fix all issues

---

## Next Steps

1. Apply mobile menu backdrop fix immediately
2. Fix multiple H1 tags (automated script possible)
3. Add video poster images
4. Review and test on real mobile device
5. Deploy fixes to production
