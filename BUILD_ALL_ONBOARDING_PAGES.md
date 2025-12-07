# BUILD ALL ONBOARDING PAGES - COMPLETE GUIDE

## Pages to Build (All with proper hero banners, no text overlays, real content)

### 1. Main Onboarding Router ✅ READY
**File**: `COPY_PASTE_ONBOARDING.tsx`
**Copy to**: `app/onboarding/page.tsx`
**Status**: Ready to copy/paste

### 2. Student/Learner Onboarding
**File**: Create `app/onboarding/learner/page.tsx`
**Pattern**: Hero image → Title below → Welcome content → Getting started steps → Resources

### 3. Staff Onboarding  
**File**: Create `app/onboarding/staff/page.tsx`
**Pattern**: Hero image → Title below → Welcome → Responsibilities → Training → Resources

### 4. Employer Onboarding
**File**: Create `app/onboarding/employer/page.tsx`
**Pattern**: Hero image → Title below → Partnership benefits → How it works → Next steps

### 5. Partner Onboarding
**File**: Create `app/onboarding/partner/page.tsx`
**Pattern**: Hero image → Title below → Collaboration opportunities → Resources → Contact

### 6. Program Holder Application ✅ BUILT
**File**: `app/program-holder/apply/page.tsx`
**Status**: Just created - needs to be saved

### 7. Universal MOU Signing ✅ READY
**File**: `COPY_PASTE_MOU_PAGE.tsx`
**Copy to**: `app/mou/[userType]/page.tsx`
**Status**: Ready to copy/paste

### 8. Complete Onboarding Package ✅ READY
**File**: `COPY_PASTE_COMPLETE_ONBOARDING.tsx`
**Copy to**: `app/onboarding/complete/page.tsx`
**Status**: Ready to copy/paste

### 9. Document Viewing Page
**File**: Create `app/onboarding/document/[id]/page.tsx`
**Pattern**: Hero → Document title → Full content → Sign button

### 10. Individual Document Signing
**File**: Create `app/onboarding/sign/[id]/page.tsx`
**Pattern**: Hero → Document preview → Signature form → Submit

---

## HERO BANNER PATTERN (Use for ALL pages)

```tsx
{/* Hero Section - Clean Image Only, NO TEXT OVERLAY */}
<section className="relative h-[400px] sm:h-[500px] w-full overflow-hidden bg-white">
  <Image
    src="/images/efh/hero/hero-main.jpg"
    alt="Page description"
    fill
    className="object-cover"
    priority
    quality={95}
    sizes="100vw"
  />
</section>

{/* Title Section - BELOW Hero */}
<section className="py-12 sm:py-16 bg-white border-b">
  <div className="max-w-7xl mx-auto px-6">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4">
      Page Title
    </h1>
    <p className="text-xl sm:text-2xl text-slate-700">
      Description text
    </p>
  </div>
</section>
```

---

## AVAILABLE HERO IMAGES

Use these real images from your repository:
- `/images/efh/hero/hero-main.jpg` - Main hero (general use)
- `/images/efh/hero/hero-barber.jpg` - Barber/trades
- `/images/efh/hero/hero-beauty.jpg` - Beauty programs
- `/images/efh/hero/hero-health.jpg` - Healthcare programs
- `/images/efh/hero/hero-support.jpg` - Support services
- `/images/gallery/image3.jpg` - Training/classroom
- `/images/gallery/image5.jpg` - Students learning
- `/images/gallery/image6.jpg` - Programs/courses

---

## QUICK BUILD COMMANDS

I'll create all pages now with proper patterns...
