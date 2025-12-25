# Site-Wide Gradient Overlay Fix

**Date:** 2025-12-25  
**Issue:** Heavy gradient overlays hiding real photos across entire site

---

## 📊 PAGES WITH HEAVY OVERLAYS

### Public-Facing Pages (Need Fixing)
1. ✅ **Homepage** - Fixed (Who We Serve cards)
2. ❌ **Programs Page** - `bg-black/60` on hero video
3. ❌ **Employer Page** - `bg-black/50` on hero
4. ❌ **Demos Page** - `bg-black/50` on hero
5. ❌ **About Page** - `bg-gradient-to-t from-slate-900/90` on team photos

### Internal Pages (Keep As-Is)
- Program Holder Portal - Gradients are fine (UI elements, not photos)
- LMS Pages - Overlays are functional (modals, tooltips)
- Course Pages - Overlays are functional

---

## 🎯 STRATEGY

### Hero Sections (Video/Image Backgrounds)
**Current:** 50-60% black overlay (too dark)
**Fix:** 40% black overlay (lighter, shows more content)

**Why 40% instead of gradient:**
- Hero sections have text centered/throughout
- Need consistent darkness for text readability
- Video content changes (can't rely on dark areas)

### Photo Cards (Team, Programs, etc.)
**Current:** 70-90% full overlay
**Fix:** Bottom gradient (0% top → 90% bottom)

**Why gradient:**
- Photos are static (can show top clearly)
- Text is at bottom (needs dark background)
- Shows real people/places

---

## 🔧 FIXES TO APPLY

### 1. Programs Page Hero (app/programs/page.tsx Line 50)

**Current:**
```tsx
<div className="absolute inset-0 bg-black/60" />
```

**Fix:**
```tsx
<div className="absolute inset-0 bg-black/40" />
```

**Reason:** Video background, reduce from 60% to 40% to show more video content

---

### 2. Employer Page Hero (app/employer/page.tsx Line 35)

**Current:**
```tsx
<div className="absolute inset-0 bg-black/50 flex items-center">
```

**Fix:**
```tsx
<div className="absolute inset-0 bg-black/40 flex items-center">
```

**Reason:** Hero section, reduce from 50% to 40%

---

### 3. Demos Page Hero (app/demos/page.tsx)

**Current:**
```tsx
<div className="absolute inset-0 bg-black/50" />
```

**Fix:**
```tsx
<div className="absolute inset-0 bg-black/40" />
```

**Reason:** Hero section, reduce from 50% to 40%

---

### 4. About Page Team Photos (app/about/page-new.tsx)

**Current:**
```tsx
<div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
```

**Fix:** Keep as-is (hover effect, not permanent overlay)

**Reason:** This is a hover effect that shows on mouseover, not a permanent overlay

---

## 📋 IMPLEMENTATION

### Quick Fix (Reduce Opacity)
Change all hero overlays from 50-60% to 40%:
- `bg-black/60` → `bg-black/40`
- `bg-black/50` → `bg-black/40`

### Better Fix (Bottom Gradients for Photo Cards)
If there are photo cards with overlays, use:
- `bg-color-900/70` → `bg-gradient-to-t from-color-900/90 via-color-900/30 to-transparent`

---

## 🎯 PRIORITY

**High Priority (Public-Facing):**
1. ✅ Homepage - Done
2. Programs Page - Hero video
3. Employer Page - Hero section

**Medium Priority:**
4. Demos Page - Hero section
5. About Page - Review team photos

**Low Priority (Internal):**
- Program Holder Portal - Keep as-is
- LMS Pages - Keep as-is

---

## 📊 EXPECTED RESULTS

### Before (Current)
- Hero videos: 60% dark (too heavy)
- Photo cards: 70% dark (photos hidden)
- Generic corporate feel

### After (Fixed)
- Hero videos: 40% dark (balanced)
- Photo cards: Gradient (photos visible)
- Authentic, professional feel

---

## 🧪 TESTING

After fixes:
1. Check hero sections - text still readable?
2. Check photo cards - photos visible?
3. Check hover effects - still working?
4. Check mobile - responsive?
