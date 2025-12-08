# CRITICAL IMAGE FIXES - FAKE/STOCK IMAGES FOUND

## ✅ FIXED
- **Homepage hero banner** - Now using `/media/hero-elevate-learners.jpg` (REAL students)

## ❌ STILL USING FAKE/STOCK IMAGES

### 1. TEAM PAGE - Missing Real Staff Photos
**File:** `app/about/team/page.tsx`

**Team members with missing photos:**
- Elizabeth Greene: `/images/team/elizabeth-greene.jpg` ❌
  - **REAL photo exists:** `/images/team/founder/elizabeth-greene-founder-hero-01.jpg` ✅
- Leslie Wafford: `/images/team/leslie-wafford.jpg` ❌
- Jozanna George: `/images/team/jozanna-george.jpg` ❌
- Clystjah Woodley: `/images/team/clystjah-woodley.jpg` ❌
- Dr. Carlina Wilkes: `/images/team/dr-carlina-wilkes.jpg` ❌
- Alina Smith: `/images/team/alina-smith.jpg` ❌
- Sharon Douglass: `/images/team/sharon-douglass.jpg` ❌

**Action:** Need real staff photos uploaded to `/public/images/team/`

### 2. MARKETPLACE PAGE - Using Homepage Hero for All Products
**File:** `app/marketplace/page.tsx`

All 8 products using: `/media-backup-20251128-043832/homepage-hero.jpg` ❌

**Products needing real images:**
1. Payroll Card Program
2. Tax Filing Services
3. Supersonic Cash
4. Workforce Development
5. Career Training
6. Business Services
7. Community Programs
8. Support Services

**Action:** Need product-specific images

### 3. SUCCESS STORIES PAGE
**File:** `app/success-stories/page.tsx`

Using: `/media/homepage-hero.jpg` ❌

**Action:** Need real graduate/success story photos

### 4. APPROVALS PAGE
**File:** `app/approvals/page.tsx`

Using: `/media-backup-20251128-043832/homepage-hero.jpg` ❌

**Action:** Need approval/certification related image

### 5. LAYOUT.TSX - OpenGraph Image
**File:** `app/layout.tsx`

Using: `/media-backup-20251128-043832/homepage-hero.jpg` ❌

**Action:** Should use real branded image for social sharing

### 6. PROGRAM PAGES - Generic Placeholders
Multiple program pages using generic gradient placeholders instead of real program photos.

**Action:** Need program-specific photos from actual classes

---

## AVAILABLE REAL PHOTOS IN `/public/media/`

### Hero Images (REAL)
- ✅ `hero-elevate-learners.jpg` (169K) - NOW USED ON HOMEPAGE
- ✅ `hero-slide-barber.jpg` (99K)
- ✅ `hero-slide-healthcare.jpg` (190K)
- ✅ `hero-slide-employers.jpg` (273K)
- ✅ `students-hero.jpg` (189K)

### Program Images (REAL)
- ✅ `program-barber.jpg`
- ✅ `program-cna.jpg`
- ✅ `program-cdl.jpg`
- ✅ `program-hvac.jpg`

### Testimonial Images (REAL)
- ✅ `testimonials/student1.jpg` (88K)
- ✅ `testimonials/student2.jpg` (85K)
- ✅ `testimonials/student3.jpg` (90K)
- ✅ `testimonials/student-testimonial-graduate-hd.jpg` (251K)

### Training Images (REAL)
- ✅ `programs/cpr-training-hd.jpg`
- ✅ `programs/cpr-group-training-hd.jpg`
- ✅ `programs/cna-training-video-thumbnail.jpg`
- ✅ `programs/medical-esthetics-training-hd.jpg`

---

## IMMEDIATE ACTION PLAN

### Priority 1 (Next 1 Hour)
1. ✅ Fix homepage hero (DONE)
2. Fix Elizabeth Greene photo path (1 min)
3. Replace marketplace images with real photos (15 min)
4. Replace success stories image (2 min)
5. Replace approvals page image (2 min)
6. Replace layout.tsx OpenGraph image (2 min)

### Priority 2 (Next 4 Hours)
1. Get real staff photos for team page
2. Replace all program page placeholders
3. Add real facility photos
4. Add real classroom photos

### Priority 3 (Next Day)
1. Professional photoshoot for missing team members
2. Product-specific photography for marketplace
3. More student success photos
4. Facility tour photos

---

## QUICK FIXES TO DEPLOY NOW

### Fix 1: Elizabeth Greene Photo
```tsx
// In app/about/team/page.tsx
image: '/images/team/founder/elizabeth-greene-founder-hero-01.jpg',
```

### Fix 2: Marketplace Images
Replace all instances of `homepage-hero.jpg` with relevant images:
- Payroll Card: Use financial/card image
- Tax Filing: Use tax/document image
- Supersonic Cash: Use cash/money image
- Workforce: Use `hero-slide-employers.jpg`
- Career Training: Use `hero-elevate-learners.jpg`
- Business: Use `hero-slide-employers.jpg`
- Community: Use `students-hero.jpg`
- Support: Use support services image

### Fix 3: Success Stories
```tsx
src="/media/testimonials/student-testimonial-graduate-hd.jpg"
```

### Fix 4: Approvals Page
```tsx
src="/media/programs/cpr-group-training-hd.jpg"
```

### Fix 5: Layout OpenGraph
```tsx
url: '/media/hero-elevate-learners.jpg',
```

---

## TOTAL FAKE IMAGES TO REPLACE: 23

- ✅ Homepage hero: FIXED
- ❌ Team photos: 7 missing
- ❌ Marketplace: 8 using wrong image
- ❌ Success stories: 1 wrong image
- ❌ Approvals: 1 wrong image
- ❌ Layout OG: 1 wrong image
- ❌ Various program pages: ~5 placeholders

**Estimated time to fix all:** 6 hours (with existing photos) + photoshoot for missing staff
