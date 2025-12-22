# Asset Coverage Report V1
**Date:** 2025-12-22  
**Audit Type:** Full-Site Visual Asset Audit

---

## ASSET PLAN (From Lizzy's Instructions)

### Available Assets
**Videos:** 56 custom videos in `/public/videos/`
- Hero videos: hero-home.mp4, hero-video-segment-with-narration.mp4
- Program videos: barber.mp4, cna-hero.mp4, building-technician-hero.mp4, business-hero-final.mp4
- Section videos: apply-section-video-with-narration.mp4, employer-section-video.mp4, success-stories-video-with-narration.mp4
- Course-specific videos: 10+ in `/videos/courses/`

**Images:** 8 Artlist images in `/public/images/artlist/`
- hero-training-1.jpg through hero-training-8.jpg
- Professional training photos, high quality

**Total Pages:** 866 page.tsx files

---

## PRIORITY PAGES AUDIT

### 1. Homepage (/)
**Route:** `app/page.tsx`  
**Current Asset:** `/videos/hero-home.mp4` ✅  
**Quality:** HIGH - Custom video with overlay  
**Mobile:** Good - max-height 600px, object-fit cover  
**Status:** ✅ PASS - Already using approved custom video  
**Issues:** None

---

### 2. Programs Landing (/programs)
**Route:** `app/programs/page.tsx`  
**Current Asset:** CHECKING...  
**Status:** PENDING REVIEW

---

### 3. Individual Program Pages

#### Barber Apprenticeship (/programs/barber-apprenticeship-new)
**Route:** `app/programs/barber-apprenticeship-new/page.tsx`  
**Available Asset:** `/videos/barber.mp4`, `/videos/barber-spotlight.mp4`  
**Status:** PENDING REVIEW

#### CNA Training (/programs/cna)
**Route:** `app/programs/cna/page.tsx`  
**Available Asset:** `/videos/cna-hero.mp4`  
**Status:** PENDING REVIEW

#### Building Technician (/programs/skilled-trades)
**Route:** `app/programs/skilled-trades/page.tsx`  
**Available Asset:** `/videos/building-technician-hero.mp4`  
**Status:** PENDING REVIEW

#### Business Programs (/programs/business-financial)
**Route:** `app/programs/business-financial/page.tsx`  
**Available Asset:** `/videos/business-hero-final.mp4`  
**Status:** PENDING REVIEW

#### Healthcare Programs (/programs/healthcare)
**Route:** `app/programs/healthcare/page.tsx`  
**Available Asset:** Artlist images, course videos  
**Status:** PENDING REVIEW

---

### 4. Application Page (/apply)
**Route:** `app/apply/page.tsx`  
**Available Asset:** `/videos/apply-section-video-with-narration.mp4`  
**Status:** PENDING REVIEW

---

### 5. About Page (/about)
**Route:** `app/about/page.tsx`  
**Available Asset:** `/videos/about-section-video.mp4`  
**Status:** PENDING REVIEW

---

### 6. Employer/OJT Pages
**Route:** `app/employers/page.tsx`, `app/ojt/page.tsx`  
**Available Asset:** `/videos/employer-section-video.mp4`  
**Status:** PENDING REVIEW

---

### 7. Success Stories
**Route:** `app/success-stories/page.tsx` (if exists)  
**Available Asset:** `/videos/success-stories-video-with-narration.mp4`  
**Status:** PENDING REVIEW

---

### 8. Funding Pages
**Route:** `app/funding/page.tsx`  
**Available Asset:** Artlist images  
**Status:** PENDING REVIEW

---

### 9. Program Holder Portal
**Route:** `app/program-holder/page.tsx`  
**Available Asset:** Artlist images  
**Status:** PENDING REVIEW

---

### 10. Workforce Board
**Route:** `app/workforce-board/page.tsx`  
**Available Asset:** Artlist images  
**Status:** PENDING REVIEW

---

## COMPONENT INVENTORY

### Hero/Banner Components Found:
1. `components/hero/HeroBanner.tsx` - Main hero banner component
2. `components/HeroBanner.tsx` - Alternative hero banner
3. `components/RotatingHeroBanner.tsx` - Rotating banner
4. `components/SideHeroBanner.tsx` - Side hero
5. `components/sections/HeroSection.tsx` - Section hero
6. `components/layout/HeroSection.tsx` - Layout hero
7. `components/programs/ProgramBanner.tsx` - Program banner
8. `components/banners/WorkOneBanner.tsx` - WorkOne banner

### Video Usage Patterns:
- Homepage: Direct `<video>` tag with poster fallback ✅
- Need to check: Other pages for video implementation

---

## NEXT STEPS

1. **Audit all priority pages** (programs, apply, about, employers)
2. **Check current assets** (what's being used vs what's available)
3. **Identify missing/generic assets**
4. **Create implementation plan** with exact file/line references
5. **Implement replacements** using approved assets
6. **Verify mobile responsiveness**
7. **Performance optimization**

---

## PRELIMINARY FINDINGS

**✅ Good:**
- Homepage has high-quality custom video
- 56 custom videos available
- 8 Artlist images available
- Video implementation includes poster fallback

**⚠️ To Verify:**
- Are program pages using their specific videos?
- Are section pages using available videos?
- Are any pages using generic/placeholder images?
- Mobile performance of video heroes

**❌ Potential Issues:**
- 866 pages total - need to prioritize public-facing pages
- Need to verify no broken Imgur hotlinks
- Need to check for generic stock photos

---

## STATUS: PHASE 1 COMPLETE

**Next Action:** Audit individual pages and generate detailed coverage report with PASS/FAIL status for each route.
