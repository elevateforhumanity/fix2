# Mobile & Tablet View Audit - Line by Line

**Date:** 2025-12-25  
**Site:** https://www.elevateforhumanity.org  
**Breakpoints:** Mobile (< 640px), Tablet (640px - 1024px), Desktop (> 1024px)

---

## 📱 MOBILE VIEW AUDIT (< 640px)

### HEADER (SiteHeader.tsx)

**Line 23: Header Container**

```tsx
<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
```

- ✅ Sticky positioning
- ✅ Z-index 50 (above content)
- ✅ White background
- ✅ Border bottom

**Lines 25-27: Utility Bar**

```tsx
<div className="bg-gray-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-10 text-xs sm:text-sm">
```

- ✅ Dark background
- ✅ Responsive padding: px-4 (mobile) → px-6 (tablet) → px-8 (desktop)
- ✅ Height: h-10 (2.5rem / 40px)
- ✅ Font size: text-xs (mobile) → text-sm (tablet+)

**Lines 29-31: Utility Bar Left Side**

```tsx
<div className="flex items-center gap-2 sm:gap-4 min-w-0">
  <a href={utilityNavigation.phone.href} className="flex items-center gap-1 hover:text-blue-400 transition">
    <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
```

- ✅ Gap: gap-2 (mobile) → gap-4 (tablet+)
- ✅ min-w-0 prevents overflow
- ✅ Icon size: w-3 h-3 (mobile) → w-4 h-4 (tablet+)
- ✅ flex-shrink-0 prevents icon squishing

**Lines 36-37: Hidden Text on Mobile**

```tsx
<span className="hidden sm:inline">{utilityNavigation.phone.label}</span>
```

- ✅ Text hidden on mobile (< 640px)
- ✅ Shows on tablet+ (sm:inline)
- ⚠️ **ISSUE:** mobile-fixes.css has `@media (max-width: 640px) { header .bg-gray-900 span { display: none !important; } }`
- ⚠️ This conflicts with `hidden sm:inline` - both trying to control visibility

**Lines 47-52: Apply Button**

```tsx
<Link
  href={utilityNavigation.apply.href}
  className="bg-blue-600 hover:bg-blue-700 px-2 sm:px-4 py-1 rounded transition text-xs sm:text-sm whitespace-nowrap"
>
  {utilityNavigation.apply.label}
</Link>
```

- ✅ Responsive padding: px-2 (mobile) → px-4 (tablet+)
- ✅ Font size: text-xs (mobile) → text-sm (tablet+)
- ✅ whitespace-nowrap prevents text wrapping

**Lines 66-91: Logo**

```tsx
<div className="flex-shrink-0">
  <Link href="/" className="flex items-center gap-2">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
      <svg className="w-6 h-6 text-white" ...>
```

- ✅ flex-shrink-0 prevents logo squishing
- ✅ Fixed size: h-10 w-10
- ✅ Icon size: w-6 h-6
- ✅ Responsive gap-2

**Lines 93-95: Desktop Navigation**

```tsx
<nav className="hidden lg:flex items-center gap-1">
```

- ✅ Hidden on mobile/tablet
- ✅ Shows on desktop (lg:flex)

---

### HOMEPAGE (page.tsx)

**Lines 36-37: Video Hero**

```tsx
<section className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
```

- ✅ Responsive heights:
  - Mobile: 400px
  - Tablet: 500px
  - Desktop: 600px
- ✅ overflow-hidden prevents video overflow
- ✅ relative for absolute positioning

**Lines 40-51: Video Element**

```tsx
<video
  ref={videoRef}
  autoPlay
  loop
  playsInline
  preload="auto"
  muted={isMuted}
  className="absolute inset-0 w-full h-full object-cover"
  onError={() => setVideoError(true)}
  poster="/images/video-poster.jpg"
>
  <source src="/videos/hero-home.mp4" type="video/mp4" />
</video>
```

- ✅ absolute inset-0 (fills container)
- ✅ w-full h-full (100% width/height)
- ✅ object-cover (maintains aspect ratio)
- ✅ playsInline (iOS compatibility)
- ✅ Error fallback to poster image

**Lines 54-60: Unmute Button**

```tsx
<button
  onClick={toggleMute}
  className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 text-white p-2 sm:p-3 rounded-full transition z-10"
  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
>
  {isMuted ? (
    <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
  ) : (
    <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
  )}
</button>
```

- ✅ Positioned bottom-4 right-4
- ✅ Responsive padding: p-2 (mobile) → p-3 (tablet+)
- ✅ Icon size: w-5 h-5 (mobile) → w-6 h-6 (tablet+)
- ✅ z-10 (above video)
- ✅ Accessible aria-label

**Lines 82-86: Hero Text**

```tsx
<h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
  Free Job Training.
  <br />
  Real Careers. No Debt.
</h1>
```

- ✅ Responsive font sizes:
  - Mobile: text-3xl (1.875rem / 30px)
  - Tablet: text-4xl (2.25rem / 36px)
  - Desktop: text-5xl (3rem / 48px)
  - XL: text-6xl (3.75rem / 60px)
- ✅ Responsive margin: mb-3 (mobile) → mb-4 (tablet+)
- ⚠️ **CONFLICT:** mobile-fixes.css has `h1 { font-size: 1.875rem !important; }` which overrides Tailwind classes

**Lines 88-91: Hero Description**

```tsx
<p className="text-base sm:text-lg lg:text-xl mb-6 leading-relaxed">
  We connect people to careers through training, funding, and employer
  partnerships across Indiana.
</p>
```

- ✅ Responsive font sizes:
  - Mobile: text-base (1rem / 16px)
  - Tablet: text-lg (1.125rem / 18px)
  - Desktop: text-xl (1.25rem / 20px)
- ✅ leading-relaxed (1.625)
- ⚠️ **CONFLICT:** mobile-fixes.css has `p { font-size: 1rem !important; }` which locks size

**Lines 92-102: Hero Buttons**

```tsx
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
  <Button
    href="/apply"
    size="lg"
    className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto"
  >
    Apply Now
  </Button>
  <Button
    href="/programs"
    variant="secondary"
    size="lg"
    className="w-full sm:w-auto"
  >
    Explore Programs
  </Button>
</div>
```

- ✅ Responsive layout: flex-col (mobile) → flex-row (tablet+)
- ✅ Responsive gap: gap-3 (mobile) → gap-4 (tablet+)
- ✅ Button width: w-full (mobile) → w-auto (tablet+)
- ✅ Buttons stack vertically on mobile

**Lines 109-111: Artistic Hero Image**

```tsx
<section className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] overflow-hidden">
  <Image src="/images/heroes/about-mission.jpg" alt="serving communities through education"
    fill className="object-cover" priority quality={95} />
```

- ✅ Responsive heights:
  - Mobile: 300px
  - Tablet: 400px
  - Desktop: 500px
- ✅ Next.js Image with fill
- ✅ object-cover maintains aspect ratio
- ✅ priority for above-fold loading

**Lines 119-125: Image Overlay Text**

```tsx
<h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
  Improving Outcomes Through Education
</h2>
<p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed">
  Every student deserves access to quality training and real career opportunities.
</p>
```

- ✅ Responsive h2 sizes: 2xl → 3xl → 4xl → 5xl
- ✅ Responsive p sizes: base → lg → xl
- ✅ text-white/90 (90% opacity)

**Lines 133-136: Who We Serve Section**

```tsx
<Section variant="slate">
  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-slate-900 mb-3 sm:mb-4">
    Who We Serve
  </h2>
```

- ✅ Responsive heading sizes
- ✅ text-center on all sizes
- ✅ Responsive margin

**Lines 141-143: Who We Serve Grid**

```tsx
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
```

- ✅ Responsive grid:
  - Mobile: 1 column (default)
  - Tablet: 2 columns (sm:grid-cols-2)
  - Desktop: 3 columns (lg:grid-cols-3)
- ✅ Responsive gap: gap-6 (mobile) → gap-8 (tablet+)
- ⚠️ **CONFLICT:** mobile-fixes.css has `main .grid { grid-template-columns: 1fr !important; }` which forces 1 column

**Lines 149-151: Card Image Height**

```tsx
<div className="relative h-48 sm:h-56 lg:h-64">
  <Image src="/images/general/students-hero.jpg" alt="Students learning"
    fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
```

- ✅ Responsive heights:
  - Mobile: h-48 (12rem / 192px)
  - Tablet: h-56 (14rem / 224px)
  - Desktop: h-64 (16rem / 256px)
- ✅ Hover scale effect
- ✅ Smooth transition

**Lines 161-163: Card Content Padding**

```tsx
<div className="p-6 sm:p-8">
  <p className="text-slate-700 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
```

- ✅ Responsive padding: p-6 (mobile) → p-8 (tablet+)
- ✅ Responsive margin: mb-4 (mobile) → mb-6 (tablet+)
- ✅ Responsive font: text-base (mobile) → text-lg (tablet+)

**Lines 249-251: Featured Programs Grid**

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
```

- ✅ Responsive grid:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 4 columns
- ✅ Responsive gap: gap-4 (mobile) → gap-6 (tablet+)
- ✅ Responsive margin: mb-8 (mobile) → mb-12 (tablet+)
- ⚠️ **CONFLICT:** mobile-fixes.css forces 1 column on mobile

**Lines 312-314: Stats Grid**

```tsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
```

- ✅ Responsive grid:
  - Mobile: 2 columns (grid-cols-2)
  - Desktop: 4 columns (lg:grid-cols-4)
- ✅ Responsive gap: gap-6 (mobile) → gap-8 (tablet+)
- ✅ text-center on all sizes

**Lines 316-318: Stat Numbers**

```tsx
<div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">1,500+</div>
<div className="text-blue-100 text-sm sm:text-base lg:text-lg">Graduates Since 2020</div>
```

- ✅ Responsive number sizes: 3xl → 4xl → 5xl
- ✅ Responsive label sizes: sm → base → lg

---

### FOOTER (SiteFooter.tsx)

**Lines 24-25: Footer Grid**

```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
```

- ✅ Responsive padding: px-4 → px-6 → px-8
- ✅ Responsive grid:
  - Mobile: 2 columns (grid-cols-2)
  - Tablet: 3 columns (md:grid-cols-3)
  - Desktop: 6 columns (lg:grid-cols-6)
- ✅ Fixed gap: gap-8
- ✅ **FIXED:** mobile-fixes.css now preserves 2 columns on mobile

**Lines 29-30: Footer Column Headers**

```tsx
<h3 className="font-semibold text-lg mb-4">
  {footerNavigation.programs.title}
</h3>
```

- ✅ font-semibold (600)
- ✅ text-lg (1.125rem / 18px)
- ✅ mb-4 (1rem)
- ✅ No responsive sizing (consistent across devices)

**Lines 36-37: Footer Links**

```tsx
<Link
  href={link.href}
  className="text-gray-400 hover:text-white text-sm transition"
>
  {link.label}
</Link>
```

- ✅ text-sm (0.875rem / 14px)
- ✅ text-gray-400 (readable on dark background)
- ✅ hover:text-white
- ✅ **FIXED:** mobile-fixes.css no longer stretches footer links

**Lines 147-148: Contact & Social Grid**

```tsx
<div className="mt-12 pt-8 border-t border-gray-800">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
```

- ✅ Responsive grid:
  - Mobile: 1 column
  - Tablet+: 2 columns
- ✅ Top border separator

**Lines 254-255: Bottom Bar**

```tsx
<div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
  <p>© {currentYear} Elevate for Humanity. All rights reserved.</p>
```

- ✅ Responsive layout: flex-col (mobile) → flex-row (tablet+)
- ✅ items-center (vertical center)
- ✅ justify-between (space between)
- ✅ gap-4 (1rem)

---

## 📊 TABLET VIEW AUDIT (640px - 1024px)

### Breakpoint Transitions

**640px (sm:) - Small Tablet**

- ✅ Utility bar text shows: `hidden sm:inline`
- ✅ Hero buttons go horizontal: `flex-col sm:flex-row`
- ✅ Who We Serve grid: 1 col → 2 cols
- ✅ Featured Programs grid: 1 col → 2 cols
- ✅ Button widths: `w-full sm:w-auto`

**768px (md:) - Medium Tablet**

- ✅ Footer grid: 2 cols → 3 cols
- ✅ Contact section: 1 col → 2 cols
- ✅ Bottom bar: vertical → horizontal

**1024px (lg:) - Large Tablet / Small Desktop**

- ✅ Desktop nav shows: `hidden lg:flex`
- ✅ Who We Serve grid: 2 cols → 3 cols
- ✅ Featured Programs grid: 2 cols → 4 cols
- ✅ Stats grid: 2 cols → 4 cols
- ✅ Footer grid: 3 cols → 6 cols

---

## ❌ ISSUES FOUND

### Critical Issues

1. **Typography Conflicts**
   - mobile-fixes.css: `h1 { font-size: 1.875rem !important; }`
   - Overrides Tailwind responsive classes
   - Locks h1 at 30px on mobile (should scale)
   - **FIX:** Remove `!important` or remove rule entirely

2. **Grid Override Too Aggressive**
   - mobile-fixes.css: `main .grid { grid-template-columns: 1fr !important; }`
   - Forces ALL grids to 1 column on mobile
   - Breaks stats grid (should be 2 columns)
   - **FIXED:** Now excludes footer, but still affects main content

3. **Utility Bar Text Visibility Conflict**
   - Tailwind: `hidden sm:inline`
   - mobile-fixes.css: `@media (max-width: 640px) { header .bg-gray-900 span { display: none !important; } }`
   - Both trying to control same element
   - **FIX:** Remove CSS rule, let Tailwind handle it

### Medium Issues

4. **Paragraph Font Size Locked**
   - mobile-fixes.css: `p { font-size: 1rem !important; }`
   - Prevents responsive scaling
   - Hero description should be: base → lg → xl
   - **FIX:** Remove `!important` or make more specific

5. **Link Styling Removed**
   - **FIXED:** Footer links no longer stretched
   - But now nav links might need explicit styling

### Minor Issues

6. **Inconsistent Gap Scaling**
   - Some use gap-3 → gap-4
   - Others use gap-6 → gap-8
   - Not a bug, but inconsistent pattern

7. **Missing Tablet-Specific Breakpoints**
   - Most responsive classes jump from sm: (640px) to lg: (1024px)
   - Missing md: (768px) breakpoints in some places
   - Tablet view sometimes looks like mobile, sometimes like desktop

---

## 🔧 RECOMMENDED FIXES

### Priority 1: Remove Typography !important

**In mobile-fixes.css, REMOVE:**

```css
h1 {
  font-size: 1.875rem !important;
  line-height: 1.2;
  margin-bottom: 1rem !important;
}
h2 {
  font-size: 1.5rem !important;
  line-height: 1.3;
  margin-bottom: 0.75rem !important;
}
h3 {
  font-size: 1.25rem !important;
  margin-bottom: 0.5rem !important;
}
p {
  font-size: 1rem !important;
  line-height: 1.5;
  margin-bottom: 1rem !important;
}
```

**REASON:** Let Tailwind responsive classes work

---

### Priority 2: Fix Grid Override

**In mobile-fixes.css, CHANGE:**

```css
/* OLD */
main .grid,
section .grid {
  grid-template-columns: 1fr !important;
}

/* NEW - More specific */
main .grid:not(.grid-cols-2),
section .grid:not(.grid-cols-2) {
  grid-template-columns: 1fr !important;
}
```

**REASON:** Preserve 2-column grids (like stats)

---

### Priority 3: Remove Utility Bar Span Rule

**In mobile-fixes.css, REMOVE:**

```css
@media (max-width: 640px) {
  header .bg-gray-900 span {
    display: none !important;
  }
}
```

**REASON:** Tailwind `hidden sm:inline` already handles this

---

## 📋 TESTING CHECKLIST

### Mobile (< 640px)

- [ ] Header utility bar shows icons only
- [ ] Logo doesn't squish
- [ ] Hero video plays and fills screen
- [ ] Hero text is readable (not too small)
- [ ] Buttons stack vertically
- [ ] Who We Serve cards: 1 column
- [ ] Featured Programs: 1 column
- [ ] Stats: 2 columns
- [ ] Footer: 2 columns
- [ ] Footer links are normal size (not stretched)

### Tablet (640px - 1024px)

- [ ] Utility bar shows text labels
- [ ] Hero buttons go horizontal
- [ ] Who We Serve cards: 2 columns (sm) → 3 columns (lg)
- [ ] Featured Programs: 2 columns (sm) → 4 columns (lg)
- [ ] Stats: 2 columns → 4 columns (lg)
- [ ] Footer: 3 columns (md) → 6 columns (lg)
- [ ] Desktop nav shows at 1024px

### All Sizes

- [ ] No horizontal scroll
- [ ] Images load correctly
- [ ] Text is readable
- [ ] Touch targets are 44px minimum
- [ ] Hover states work
- [ ] Transitions are smooth

---

## 🎯 SUMMARY

**Working Well:**

- ✅ Responsive breakpoints defined
- ✅ Image sizing and aspect ratios
- ✅ Button responsive behavior
- ✅ Footer grid (after fix)
- ✅ Container padding scales

**Needs Fixing:**

- ❌ Typography !important overrides
- ❌ Grid override too aggressive
- ❌ Utility bar span visibility conflict
- ❌ Paragraph font size locked

**Impact:**

- Tailwind responsive classes don't work
- Mobile view looks broken
- Text doesn't scale properly
- Grids forced to wrong layouts
