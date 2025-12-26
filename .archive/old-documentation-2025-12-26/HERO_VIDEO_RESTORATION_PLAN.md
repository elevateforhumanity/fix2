# Hero Video Restoration Plan

**Date:** December 25, 2024  
**Goal:** Restore all hero video banners to their designated pages

---

## 📹 CURRENT STATUS

### ✅ Already Has Hero Video

1. **Homepage** (`app/page.tsx`)
   - Video: `hero-home.mp4` ✅
   - Status: Working correctly

### ❌ Needs Hero Video Restored

2. **Programs Page** (`app/programs/page.tsx`)
   - Current: Video with 60% overlay ❌
   - Should be: Video with 40% overlay
   - Video file: `programs-overview-video-with-narration.mp4`

3. **Employer Page** (`app/employer/page.tsx`)
   - Current: Static image with 50% overlay ❌
   - Should be: Video `employer-partner-hero.mp4`
   - Video file exists: ✅

4. **Individual Program Pages**
   - Barber: Should use `barber-hero-final.mp4`
   - CDL: Should use `cdl-hero.mp4`
   - CNA: Should use `cna-hero.mp4`
   - HVAC: Should use `hvac-hero-final.mp4`
   - Medical Assistant: Should use `medical-assistant-hero.mp4`
   - Business: Should use `business-hero-final.mp4`

---

## 🎯 RESTORATION ACTIONS

### Action 1: Fix Programs Page Overlay

**File:** `app/programs/page.tsx` Line 50

**Current:**

```tsx
<div className="absolute inset-0 bg-black/60" />
```

**Fix:**

```tsx
<div className="absolute inset-0 bg-black/40" />
```

---

### Action 2: Replace Employer Page Image with Video

**File:** `app/employer/page.tsx` Lines 23-35

**Current:**

```tsx
<Image
  src="/images/employers-hero.jpg"
  alt="Employers hiring trained workers"
  fill
  className="object-cover"
  priority
/>
<div className="absolute inset-0 bg-black/50 flex items-center">
```

**Replace with:**

```tsx
<video
  autoPlay
  loop
  playsInline
  muted
  className="absolute inset-0 w-full h-full object-cover"
  poster="/images/employers-hero.jpg"
>
  <source src="/videos/employer-partner-hero.mp4" type="video/mp4" />
</video>
<div className="absolute inset-0 bg-black/40 flex items-center">
```

---

### Action 3: Add Hero Videos to Program Pages

Create a reusable component for program hero videos.

---

## 📋 VIDEO FILE MAPPING

| Page              | Video File                                   | Size   | Status                        |
| ----------------- | -------------------------------------------- | ------ | ----------------------------- |
| Homepage          | `hero-home.mp4`                              | 756 KB | ✅ Active                     |
| Programs          | `programs-overview-video-with-narration.mp4` | N/A    | ✅ Active (needs overlay fix) |
| Employer          | `employer-partner-hero.mp4`                  | 3 MB   | ❌ Not used (image instead)   |
| Barber            | `barber-hero-final.mp4`                      | 6 MB   | ❌ Not used                   |
| CDL               | `cdl-hero.mp4`                               | 2.9 MB | ❌ Not used                   |
| CNA               | `cna-hero.mp4`                               | 2.4 MB | ❌ Not used                   |
| HVAC              | `hvac-hero-final.mp4`                        | 2 MB   | ❌ Not used                   |
| Medical Assistant | `medical-assistant-hero.mp4`                 | 2.6 MB | ❌ Not used                   |
| Business          | `business-hero-final.mp4`                    | 4 MB   | ❌ Not used                   |

---

## 🔧 IMPLEMENTATION PRIORITY

### High Priority (Public-Facing)

1. ✅ Homepage - Already done
2. 🔧 Programs page - Fix overlay (60% → 40%)
3. 🔧 Employer page - Replace image with video

### Medium Priority (Program Pages)

4. Barber apprenticeship page
5. CDL page
6. CNA page
7. HVAC page

### Low Priority

8. Other program pages
9. Internal pages

---

## ✅ POLICY COMPLIANCE

All hero videos will follow the design policy:

- ✅ Real videos (not placeholders)
- ✅ Light overlay (40% max)
- ✅ No heavy overlays (50%+)
- ✅ Autoplay, muted, looping
- ✅ Mobile-friendly (playsInline)
