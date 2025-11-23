# Homepage Redesign Plan

**Date**: January 23, 2025  
**Status**: Ready to implement

---

## 🎯 CHANGES REQUESTED

1. **Hero Banner**
   - Make wider (increase max-width)
   - Add more spacing/gaps
   - Reposition elements
   - Larger text and buttons

2. **Middle Section ("What we do")**
   - Remove the 3 images (barber, coaching, portal)
   - Keep only the text and 3 cards
   - Center the content
   - Add more breathing room

3. **Overall Layout**
   - More whitespace
   - Better gaps between sections
   - Wider containers
   - Modern, clean look

---

## 📐 SPECIFIC CHANGES

### Hero Section
```
BEFORE:
- max-w-7xl
- py-16 md:py-20
- text-4xl sm:text-5xl md:text-6xl lg:text-7xl
- gap-12 lg:gap-16 xl:gap-24

AFTER:
- max-w-[1600px] (wider)
- py-20 md:py-28 lg:py-32 (more padding)
- text-5xl sm:text-6xl md:text-7xl lg:text-8xl (larger)
- gap-16 lg:gap-20 xl:gap-28 (more space)
```

### Stats Cards
```
BEFORE:
- p-4 (small padding)
- text-3xl (medium size)
- rounded-lg

AFTER:
- p-6 (more padding)
- text-4xl md:text-5xl (larger)
- rounded-xl (more rounded)
```

### CTA Buttons
```
BEFORE:
- px-6 sm:px-8 py-3 sm:py-4
- text-sm sm:text-base
- rounded-lg

AFTER:
- px-8 sm:px-10 py-4 sm:py-5
- text-base sm:text-lg
- rounded-xl
- shadow-xl hover:shadow-2xl
```

### "What We Do" Section
```
BEFORE:
- Two columns: text + 3 images
- max-w-7xl
- py-20

AFTER:
- Single column: centered text only
- max-w-[1400px]
- py-24 md:py-32
- Remove all 3 images
- Center everything
```

### Feature Cards
```
BEFORE:
- p-6
- text-sm
- border border-slate-200

AFTER:
- p-8 (more padding)
- text-base (larger text)
- border-2 border-slate-200
- hover:border-emerald-300 hover:shadow-xl
```

### Partner Logos
```
BEFORE:
- py-10
- gap-6

AFTER:
- py-16 md:py-20
- gap-8 md:gap-10
```

### Video Section
```
BEFORE:
- py-16
- text-2xl sm:text-3xl

AFTER:
- py-20 md:py-28
- text-3xl sm:text-4xl md:text-5xl
```

---

## 🖼️ IMAGES TO REMOVE

From "What we do" section, remove these 3 images:
1. `/images/programs/barber-apprenticeship.jpg`
2. `/images/learners/coaching-session.jpg`
3. `/images/platform/student-portal-mock.jpg`

These images will be removed from the layout but files stay in public folder.

---

## 📊 LAYOUT COMPARISON

### BEFORE
```
Hero (max-w-7xl, py-16)
  ├── Text (left)
  └── Carousel (right)

Partners (py-10)

What We Do (max-w-7xl, py-20)
  ├── Text (left, 60%)
  └── 3 Images (right, 40%)  ← REMOVE THIS
  └── 3 Cards (full width)

Videos (py-16)
```

### AFTER
```
Hero (max-w-[1600px], py-32)
  ├── Text (left) - LARGER
  └── Carousel (right)

Partners (py-20) - MORE SPACE

What We Do (max-w-[1400px], py-32)
  ├── Text (centered) - LARGER
  └── 3 Cards (centered) - BIGGER

Videos (py-28) - MORE SPACE
```

---

## ✅ IMPLEMENTATION CHECKLIST

- [ ] Widen hero container (1600px)
- [ ] Increase hero padding (py-32)
- [ ] Enlarge hero text (8xl)
- [ ] Add more hero gaps (gap-28)
- [ ] Enlarge stat cards (p-6, text-5xl)
- [ ] Bigger CTA buttons (px-10, py-5, text-lg)
- [ ] Remove 3 images from "What we do"
- [ ] Center "What we do" content
- [ ] Widen "What we do" container (1400px)
- [ ] Increase "What we do" padding (py-32)
- [ ] Enlarge feature cards (p-8, text-base)
- [ ] Add hover effects to cards
- [ ] Increase partner section padding (py-20)
- [ ] Increase video section padding (py-28)
- [ ] Enlarge video section title (text-5xl)

---

## 🎨 VISUAL IMPROVEMENTS

### Spacing
- More whitespace everywhere
- Larger gaps between sections
- More padding inside elements
- Better breathing room

### Typography
- Larger headings
- Bigger body text
- Better line heights
- Improved hierarchy

### Components
- Rounder corners (lg → xl)
- Bigger shadows
- Better hover states
- More prominent CTAs

### Layout
- Wider containers
- Centered content
- Cleaner structure
- Less clutter

---

## 📝 NOTES

- All changes maintain mobile responsiveness
- Existing functionality stays the same
- Only visual/layout changes
- No breaking changes
- Backward compatible

---

**Ready to implement**: Yes ✅
