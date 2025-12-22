# Visual Asset Audit - 8 Priority Pages

## Summary

- **Total Pages Audited:** 8
- **Gradient Issues Found:** 5 pages
- **Missing/Generic Assets:** 2 pages
- **Ready for Production:** 3 pages

---

## 1. Homepage (`app/page.tsx`)

### Current State

- ✅ Video hero: `/videos/hero-home.mp4` (exists)
- ✅ Fallback poster: `/images/video-poster.jpg`
- ✅ Secondary image: `/images/heroes/about-mission.jpg`
- ❌ **GRADIENT**: Line 127 - `bg-gradient-to-b from-transparent via-black/30 to-black/70`
- ❌ **GRADIENT**: Lines 168, 193, 218 - Card overlays with `bg-gradient-to-t`

### Action Required

- Remove gradient overlay on artistic hero section
- Remove gradient overlays on "Who We Serve" cards
- Replace with solid semi-transparent scrims if needed for text readability

---

## 2. Programs Index (`app/programs/page.tsx`)

### Current State

- ✅ Video hero: `/videos/programs-overview-video-with-narration.mp4`
- ✅ Fallback poster: `/images/artlist/hero-training-1.jpg`
- ❌ **GRADIENT**: Line 48 - `bg-gradient-to-r from-black/80 via-black/60 to-transparent`

### Action Required

- Remove gradient overlay on video hero
- Replace with solid `bg-black/60` if text contrast needed

---

## 3. Apply (`app/apply/page.tsx`)

### Current State

- ✅ Clean design, no hero image
- ✅ No gradients
- ✅ **PRODUCTION READY**

### Action Required

- None - PASS

---

## 4. Careers (`app/careers/page.tsx`)

### Current State

- ❌ **GRADIENT**: Line 60 - `bg-gradient-to-b from-white to-gray-50` (page background)
- ✅ Solid hero background: `bg-brand-orange-600`
- ⚠️ No hero image (solid color only)

### Action Required

- Remove page-level gradient background
- Consider adding hero image for visual interest (optional)

---

## 5. Program Holder Onboarding (`app/program-holder/onboarding/page.tsx`)

### Current State

- ✅ Hero image: `/images/efh/hero/hero-main.jpg`
- ✅ No gradients
- ✅ **PRODUCTION READY**

### Action Required

- None - PASS

---

## 6. Employer (`app/employer/page.tsx`)

### Current State

- ✅ Hero image: `/images/gallery/image8.jpg`
- ⚠️ Line 29 - Empty div with classes (likely gradient removed already)
- ⚠️ Generic placeholder content ("Explore Employer and discover opportunities...")

### Action Required

- Verify empty div can be removed
- Content polish needed (Phase 2)

---

## 7. Workforce Board (`app/workforce-board/page.tsx`)

### Current State

- ✅ Clean solid background: `bg-slate-900`
- ✅ No hero image (intentional - government/portal aesthetic)
- ✅ No gradients
- ✅ **PRODUCTION READY**

### Action Required

- None - PASS

---

## 8. About (`app/about/page.tsx`)

### Current State

- ✅ Hero image: `/images/gallery/image8.jpg`
- ✅ No gradients (uses `brightness-50` filter instead)
- ✅ **PRODUCTION READY**

### Action Required

- None - PASS

---

## Phase 1 Implementation Plan

### High Priority (Gradient Removal)

1. **Homepage** - Remove 4 gradient instances
2. **Programs** - Remove 1 gradient instance
3. **Careers** - Remove 1 gradient instance

### Medium Priority (Visual Enhancement)

4. **Careers** - Consider adding hero image (optional)

### Low Priority (Already Clean)

5. Apply, Program Holder Onboarding, Workforce Board, About - **PASS**

---

## Estimated Time

- Gradient removal: 30 minutes
- Testing/verification: 15 minutes
- **Total: 45 minutes**

---

## Next Steps

1. Remove all gradients from homepage, programs, careers
2. Test visual contrast and text readability
3. Take before/after screenshots
4. Move to Phase 2 (Content Polish)
