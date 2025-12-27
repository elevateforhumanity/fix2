# MEDIA RESTORATION GUIDE

**Purpose:** This document shows exactly where every video and image goes, so they can be removed and added back optimized.

---

## VIDEOS - EXACT PLACEMENTS

### 1. Home Page (`app/page.tsx`)
**Location:** Hero section, line ~58
**Video:** `/videos/hero-home.mp4`
**Poster:** `/images/heroes/homepage-hero.jpg`
**Code:**
```tsx
<OptimizedVideo
  src="/videos/hero-home.mp4"
  poster="/images/heroes/homepage-hero.jpg"
  className="absolute inset-0 w-full h-full object-cover"
/>
```

### 2. Barber Apprenticeship (`app/programs/barber-apprenticeship/page.tsx`)
**Location:** Hero section, line ~53
**Video:** `/videos/barber-hero-final.mp4`
**Poster:** `/images/barber-hero.jpg`
**Code:**
```tsx
<video autoPlay loop playsInline muted className="w-full h-full object-cover" poster="/images/barber-hero.jpg">
  <source src="/videos/barber-hero-final.mp4" type="video/mp4" />
</video>
```

### 3. Business Startup (`app/programs/business-startup/page.tsx`)
**Location:** Hero section, line ~19
**Video:** `/videos/business-hero-final.mp4`
**Code:**
```tsx
<video autoPlay loop playsInline muted className="absolute inset-0 w-full h-full object-cover">
  <source src="/videos/business-hero-final.mp4" type="video/mp4" />
</video>
```

### 4. CDL Transportation (`app/programs/cdl-transportation/page.tsx`)
**Location:** Hero section, line ~25
**Video:** `/videos/cdl-hero.mp4`
**Code:**
```tsx
<video autoPlay loop playsInline muted className="absolute inset-0 w-full h-full object-cover">
  <source src="/videos/cdl-hero.mp4" type="video/mp4" />
</video>
```

### 5. CNA Program (`app/programs/cna/page.tsx`)
**Location:** Hero section, line ~19
**Video:** `/videos/cna-hero.mp4`
**Code:**
```tsx
<video autoPlay loop playsInline muted className="absolute inset-0 w-full h-full object-cover">
  <source src="/videos/cna-hero.mp4" type="video/mp4" />
</video>
```

### 6. Direct Support Professional (`app/programs/direct-support-professional/page.tsx`)
**Location:** Hero section, line ~19
**Video:** `/videos/cna-hero.mp4` (reuses CNA video)
**Code:**
```tsx
<video autoPlay loop playsInline muted className="absolute inset-0 w-full h-full object-cover">
  <source src="/videos/cna-hero.mp4" type="video/mp4" />
</video>
```

### 7. Drug Collector (`app/programs/drug-collector/page.tsx`)
**Location:** Hero section, line ~19
**Video:** `/videos/cna-hero.mp4` (reuses CNA video)
**Code:**
```tsx
<video autoPlay loop playsInline muted className="absolute inset-0 w-full h-full object-cover">
  <source src="/videos/cna-hero.mp4" type="video/mp4" />
</video>
```

### 8. Healthcare Programs (`app/programs/healthcare/page.tsx`)
**Location:** Hero section, line ~25
**Video:** `/videos/cna-hero.mp4`
**Code:**
```tsx
<video autoPlay loop playsInline muted className="absolute inset-0 w-full h-full object-cover">
  <source src="/videos/cna-hero.mp4" type="video/mp4" />
</video>
```

### 9. Skilled Trades (`app/programs/skilled-trades/page.tsx`)
**Location:** Hero section, line ~25
**Video:** `/videos/building-technician-hero.mp4`
**Code:**
```tsx
<video autoPlay loop playsInline muted className="absolute inset-0 w-full h-full object-cover">
  <source src="/videos/building-technician-hero.mp4" type="video/mp4" />
</video>
```

### 10. Learners Landing (`app/learners/page.tsx`)
**Location:** Hero section, line ~22
**Video:** `/videos/hero-home.mp4`
**Poster:** `/images/gallery/image8.jpg`
**Code:**
```tsx
<video autoPlay loop playsInline muted className="absolute inset-0 w-full h-full object-cover" poster="/images/gallery/image8.jpg">
  <source src="/videos/hero-home.mp4" type="video/mp4" />
</video>
```

### 11. Training Providers (`app/training-providers/page.tsx`)
**Location:** Hero section, line ~20
**Video:** `/videos/training-providers-video-with-narration.mp4`
**Poster:** `/images/gallery/image8.jpg`
**Code:**
```tsx
<video autoPlay loop playsInline muted className="absolute inset-0 w-full h-full object-cover" poster="/images/gallery/image8.jpg">
  <source src="/videos/training-providers-video-with-narration.mp4" type="video/mp4" />
</video>
```

### 12. Employer Page (`app/employer/page.tsx`)
**Location:** Hero section, line ~27
**Video:** `/videos/employer-partner-hero.mp4`
**Poster:** `/images/employers-hero.jpg`
**Code:**
```tsx
<video autoPlay loop playsInline muted className="absolute inset-0 w-full h-full object-cover" poster="/images/employers-hero.jpg">
  <source src="/videos/employer-partner-hero.mp4" type="video/mp4" />
</video>
```

---

## IMAGES - EXACT PLACEMENTS

### 1. Founder Page (`app/founder/page.tsx`)
**Location:** Founder Statement section, line ~42
**Image:** `/images/team/founder/elizabeth-greene-founder-hero-01.jpg`
**Code:**
```tsx
<div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg">
  <Image
    src="/images/team/founder/elizabeth-greene-founder-hero-01.jpg"
    alt="Founder"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>
```

### 2. Team Page (`app/team/page.tsx`)
**Location:** Team Photos Grid section, line ~94
**Images:** `/images/team-new/team-1.jpg` through `team-12.jpg`
**Code:**
```tsx
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
    <div key={num} className="relative aspect-square rounded-lg overflow-hidden shadow-md">
      <Image
        src={`/images/team-new/team-${num}.jpg`}
        alt={`Team member ${num}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
    </div>
  ))}
</div>
```

### 3. About Page CTA (`app/about/page.tsx`)
**Location:** CTA Section, line ~255
**Image:** `/images/heroes/student-career.jpg`
**Code:**
```tsx
<Image
  src="/images/heroes/student-career.jpg"
  alt="Get started"
  fill
  className="object-cover"
  sizes="100vw"
/>
```

---

## HOW TO RESTORE (OPTIMIZED)

### Step 1: Replace Videos with OptimizedVideo Component
```tsx
// OLD (not optimized)
<video autoPlay loop playsInline muted className="...">
  <source src="/videos/hero.mp4" type="video/mp4" />
</video>

// NEW (optimized with lazy loading)
<OptimizedVideo
  src="/videos/hero.mp4"
  poster="/images/poster.jpg"
  className="..."
/>
```

### Step 2: Replace Images with Next.js Image Component
```tsx
// OLD (not optimized)
<img src="/images/photo.jpg" alt="Photo" />

// NEW (optimized, auto WebP conversion)
<Image
  src="/images/photo.jpg"
  alt="Photo"
  width={1920}
  height={1080}
  quality={85}
  sizes="100vw"
/>
```

### Step 3: Run Compression Script (Optional but Recommended)
```bash
node scripts/compress-images.mjs
```

This will:
- Convert PNG to WebP (70% smaller)
- Compress JPG to quality 85
- Resize to max 1920x1080
- Backup originals to `.backup` folder

---

## RESTORATION CHECKLIST

- [ ] All videos use OptimizedVideo component
- [ ] All images use Next.js Image component
- [ ] Width/height specified on all images
- [ ] Poster images added to all videos
- [ ] Compression script run (optional)
- [ ] Test all pages load fast
- [ ] Run Lighthouse audit
- [ ] Commit optimized media

---

## NOTES

- **Videos:** 12 total placements
- **Images:** 3 main placements (founder, team, about CTA)
- **Reused videos:** cna-hero.mp4 used in 4 places
- **Reused images:** gallery/image8.jpg used in 2 places

**All media files exist in repository. This is just a placement guide.**
