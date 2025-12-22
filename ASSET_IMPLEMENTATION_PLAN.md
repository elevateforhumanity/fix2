# Asset Implementation Plan
**Priority:** HIGH - Public-Facing Pages Only  
**Approved Assets:** Custom videos + Artlist images from `/public/`

---

## PHASE 1: CRITICAL PAGES (Do First)

### 1. Programs Landing Page (/programs)
**File:** `app/programs/page.tsx` (line 34)  
**Current:** Gradient background only  
**Implement:** Add `/videos/programs-overview-video-with-narration.mp4` OR Artlist hero image  
**Method:** Replace gradient section with video hero component  
**Priority:** P0 - Main landing page

### 2. Apply Page (/apply)
**File:** `app/apply/page.tsx`  
**Current:** Unknown - needs audit  
**Implement:** `/videos/apply-section-video-with-narration.mp4`  
**Priority:** P0 - Conversion page

### 3. About Page (/about)
**File:** `app/about/page.tsx`  
**Current:** Unknown - needs audit  
**Implement:** `/videos/about-section-video.mp4`  
**Priority:** P1 - Trust building

---

## PHASE 2: PROGRAM DETAIL PAGES

### Barber Apprenticeship
**File:** `app/programs/barber-apprenticeship-new/page.tsx`  
**Implement:** `/videos/barber.mp4` or `/videos/barber-spotlight.mp4`  
**Fallback:** `/images/artlist/hero-training-1.jpg`

### CNA Training
**File:** `app/programs/cna/page.tsx`  
**Implement:** `/videos/cna-hero.mp4`  
**Fallback:** `/images/artlist/hero-training-2.jpg`

### Building Technician
**File:** `app/programs/skilled-trades/page.tsx`  
**Implement:** `/videos/building-technician-hero.mp4`  
**Fallback:** `/images/artlist/hero-training-3.jpg`

### Business Programs
**File:** `app/programs/business-financial/page.tsx`  
**Implement:** `/videos/business-hero-final.mp4`  
**Fallback:** `/images/artlist/hero-training-4.jpg`

### Healthcare Programs
**File:** `app/programs/healthcare/page.tsx`  
**Implement:** `/images/artlist/hero-training-5.jpg`

---

## PHASE 3: SECTION PAGES

### Employer/OJT
**Files:** `app/employers/page.tsx`, `app/ojt/page.tsx`  
**Implement:** `/videos/employer-section-video.mp4`  
**Fallback:** `/images/artlist/hero-training-6.jpg`

### Success Stories
**File:** `app/success-stories/page.tsx` (if exists)  
**Implement:** `/videos/success-stories-video-with-narration.mp4`  
**Fallback:** `/images/artlist/hero-training-7.jpg`

### Funding
**File:** `app/funding/page.tsx`  
**Implement:** `/images/artlist/hero-training-8.jpg`

---

## IMPLEMENTATION STANDARDS

### Video Hero Component
```tsx
<section className="relative overflow-hidden">
  <video
    autoPlay
    loop
    playsInline
    muted
    className="w-full h-auto"
    style={{
      maxHeight: '600px',
      objectFit: 'cover',
    }}
    poster="/images/artlist/hero-training-X.jpg"
  >
    <source src="/videos/VIDEO_NAME.mp4" type="video/mp4" />
  </video>
  
  {/* Overlay content */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
    {/* Hero content here */}
  </div>
</section>
```

### Image Hero Component
```tsx
<section className="relative h-[400px] md:h-[500px] lg:h-[600px]">
  <Image
    src="/images/artlist/hero-training-X.jpg"
    alt="Page title"
    fill
    className="object-cover"
    priority
    sizes="100vw"
  />
  
  {/* Overlay content */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
    {/* Hero content here */}
  </div>
</section>
```

### Mobile Optimization
- Max height: 600px on desktop, 400px on mobile
- Object-fit: cover (no stretching)
- Poster images for all videos
- Lazy load videos below fold
- Priority load images above fold

---

## PERFORMANCE CHECKLIST

- [ ] All videos have poster images
- [ ] Videos use muted + playsInline
- [ ] Images use next/image with proper sizes
- [ ] Priority flag only on above-fold images
- [ ] Max height constraints prevent tall mobile pages
- [ ] Object-fit: cover prevents stretching
- [ ] Gradient overlays ensure text readability

---

## VERIFICATION STEPS

For each page after implementation:
1. Desktop view - hero renders correctly
2. Tablet view - no stretching or cropping issues
3. Mobile view - appropriate height, no performance issues
4. Check console - no 404s or errors
5. Lighthouse - LCP < 2.5s, CLS < 0.1

---

## NEXT ACTION

Run detailed audit of each file to determine current state, then implement in priority order.
