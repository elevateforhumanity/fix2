# 🏠 Home Page - Path to 10/10

## Current Issues

### 1. **Typography** ❌
- Using default Tailwind fonts
- No premium font loaded
- Inconsistent weights

### 2. **Spacing** ⚠️
- py-20 (80px) - needs to be py-40 (160px)
- px-6 (24px) - needs to be px-12 (48px)
- Not enough breathing room

### 3. **Colors** ⚠️
- Using indigo-600 (should be slate-900)
- Too many colors
- Not monochromatic

### 4. **Images** ✅
- All large professional photos (1.3-2.3MB)
- Consistent height (h-80)
- GOOD!

### 5. **Animations** ❌
- Only basic hover:scale-105
- No fade-ins
- No smooth transitions

---

## The Fix Plan

### **Step 1: Add Premium Font (Inter)**
```tsx
// Add to app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-inter'
})
```

### **Step 2: Increase Whitespace**
```tsx
// Change:
py-20 → py-40
px-6 → px-12
gap-8 → gap-12
mb-16 → mb-24
```

### **Step 3: Simplify Colors**
```tsx
// Replace:
text-indigo-600 → text-slate-900
bg-indigo-600 → bg-slate-900

// Keep only:
- Orange for CTAs (bg-orange-500)
- Slate for everything else
```

### **Step 4: Add Animations**
```tsx
// Add to cards:
className="transition-all duration-700 ease-out hover:translate-y-[-8px]"

// Add fade-in on scroll (later)
```

---

## Implementation Order

1. ✅ Add Inter font to layout
2. ✅ Increase all spacing (py, px, gap, mb)
3. ✅ Replace indigo with slate
4. ✅ Add smooth transitions
5. ✅ Test and verify

---

## Expected Result

**Before:** 6/10
**After:** 10/10

- Premium typography
- Massive whitespace
- Monochromatic + orange
- Smooth animations
- Professional polish
