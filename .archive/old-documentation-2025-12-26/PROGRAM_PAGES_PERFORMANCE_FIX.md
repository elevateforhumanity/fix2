# 🚀 Program Pages - Performance & Spacing Fix

**Issues:**

1. Pages loading slow
2. Large gaps between sections
3. Excessive padding

**Solutions:**

1. Reduce section padding from `py-20` to `py-8` or `py-12`
2. Optimize image loading
3. Remove unnecessary spacing
4. Add proper section breaks

---

## Quick Fixes

### 1. Reduce Section Padding

**Change:**

```tsx
// Before
<section className="py-20 bg-white">

// After
<section className="py-8 md:py-12 bg-white">
```

### 2. Optimize Hero Section

**Change:**

```tsx
// Before
<section className="bg-white py-20">

// After
<section className="bg-white py-8 md:py-12">
```

### 3. Remove Excessive Margins

**Change:**

```tsx
// Before
prose-h2:mt-12 prose-h2:mb-6

// After
prose-h2:mt-6 prose-h2:mb-4
```

---

## Files to Update

1. `/app/programs/barber-apprenticeship/page.tsx`
2. `/app/programs/jri/page.tsx`
3. `/app/programs/tax-preparation/page.tsx`
4. All other program pages

---

## Performance Optimizations

### 1. Add Image Priority

```tsx
<Image
  src="/images/program.jpg"
  alt="Program"
  fill
  priority // Add this
  className="object-cover"
/>
```

### 2. Lazy Load Non-Critical Sections

```tsx
import dynamic from 'next/dynamic';

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div>Loading...</div>,
});
```

### 3. Reduce Initial Bundle Size

- Move large components to separate files
- Use dynamic imports for below-the-fold content
- Optimize images (use WebP format)

---

## Spacing Guidelines

**Section Padding:**

- Hero: `py-8 md:py-12`
- Content sections: `py-6 md:py-10`
- Feature sections: `py-8 md:py-12`
- Footer: `py-6 md:py-8`

**Container Spacing:**

- Between sections: `space-y-8` or `space-y-12`
- Between elements: `space-y-4` or `space-y-6`
- Between cards: `gap-4` or `gap-6`

**Typography Spacing:**

- Headings: `mb-4` or `mb-6`
- Paragraphs: `mb-4`
- Lists: `space-y-2` or `space-y-3`

---

## Implementation Priority

**High Priority (Do Now):**

1. ✅ Reduce `py-20` to `py-8 md:py-12` in all program pages
2. ✅ Remove excessive margins in prose classes
3. ✅ Add `priority` to hero images

**Medium Priority (This Week):**

1. Optimize all program images
2. Add lazy loading to FAQ sections
3. Reduce bundle size

**Low Priority (Later):**

1. Implement skeleton loaders
2. Add progressive image loading
3. Optimize fonts

---

## Testing Checklist

After fixes:

- [ ] Page loads in < 2 seconds
- [ ] No large white gaps
- [ ] Smooth scrolling
- [ ] Mobile responsive
- [ ] Images load quickly
- [ ] No layout shift
