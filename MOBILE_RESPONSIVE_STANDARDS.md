# Mobile Responsive Design Standards

## Applied to All Website Pages

### Responsive Breakpoints (Tailwind)

- **Mobile**: < 640px (default)
- **Tablet**: sm: 640px+
- **Desktop**: md: 768px+, lg: 1024px+, xl: 1280px+

### Typography Scale

| Element   | Mobile    | Tablet (sm:) | Desktop (md:) | Large (lg:) |
| --------- | --------- | ------------ | ------------- | ----------- |
| H1 (Hero) | text-4xl  | text-5xl     | text-6xl      | text-7xl    |
| H1 (Page) | text-3xl  | text-4xl     | text-5xl      | text-6xl    |
| H2        | text-2xl  | text-3xl     | text-4xl      | text-5xl    |
| H3        | text-xl   | text-2xl     | text-3xl      | text-3xl    |
| H4        | text-lg   | text-xl      | text-2xl      | text-2xl    |
| Body      | text-base | text-base    | text-lg       | text-lg     |
| Small     | text-sm   | text-sm      | text-base     | text-base   |

### Spacing Scale

| Element               | Mobile    | Tablet (sm:) | Desktop (md:) |
| --------------------- | --------- | ------------ | ------------- |
| Section Padding Y     | py-12     | py-16        | py-20         |
| Section Padding X     | px-4      | px-6         | px-6          |
| Container Max Width   | max-w-7xl | max-w-7xl    | max-w-7xl     |
| Card Gap              | gap-6     | gap-8        | gap-10        |
| Element Margin Bottom | mb-6      | mb-8         | mb-10         |

### Hero Sections

```tsx
// Full-bleed hero pattern
<section className="relative w-full -mt-[72px]">
  <div className="relative min-h-[100vh] sm:min-h-[70vh] md:min-h-[75vh] w-full">
    {/* Background */}
  </div>
  <div className="absolute inset-0 z-10 flex items-center pt-[72px]">
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black">
        Hero Title
      </h1>
      <p className="text-base sm:text-lg md:text-xl">Description text</p>
    </div>
  </div>
</section>
```

### Content Sections

```tsx
<section className="py-12 sm:py-16 md:py-20 bg-white">
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
        Section Title
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        Section description
      </p>
    </div>
  </div>
</section>
```

### Grid Layouts

```tsx
// 1 column mobile, 2 tablet, 3 desktop
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
  {/* Cards */}
</div>

// 1 column mobile, 2 desktop
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
  {/* Cards */}
</div>
```

### Buttons

```tsx
// Primary button
<button className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold rounded-xl">
  Button Text
</button>

// Button group
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

### Cards

```tsx
<div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-lg transition">
  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">
    Card Title
  </h3>
  <p className="text-sm sm:text-base text-gray-600">Card description</p>
</div>
```

### Images

```tsx
// Responsive image heights
<div className="relative h-48 sm:h-56 md:h-64 lg:h-80">
  <Image
    src="/path/to/image.jpg"
    alt="Description"
    fill
    className="object-cover"
  />
</div>
```

### Navigation

```tsx
// Mobile menu toggle
<div className="flex md:hidden">
  <button>Menu</button>
</div>

// Desktop menu
<div className="hidden md:flex gap-6">
  <Link href="/page">Link</Link>
</div>
```

## Common Patterns to Fix

### ❌ Bad (Not Responsive)

```tsx
<h1 className="text-6xl">Title</h1>
<div className="px-6 py-20">Content</div>
<div className="grid grid-cols-3 gap-10">Cards</div>
```

### ✅ Good (Mobile-First Responsive)

```tsx
<h1 className="text-4xl sm:text-5xl md:text-6xl">Title</h1>
<div className="px-4 sm:px-6 py-12 sm:py-16 md:py-20">Content</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">Cards</div>
```

## Testing Checklist

### Mobile (< 640px)

- [ ] No horizontal scroll
- [ ] Text is readable (not too small or large)
- [ ] Buttons are tappable (min 44x44px)
- [ ] Images load and scale properly
- [ ] Navigation menu works
- [ ] Forms are usable
- [ ] Cards stack vertically

### Tablet (640px - 1024px)

- [ ] Layout uses available space
- [ ] Text sizes are appropriate
- [ ] Grids show 2 columns where appropriate
- [ ] Images scale properly
- [ ] Navigation is accessible

### Desktop (> 1024px)

- [ ] Full layout is visible
- [ ] Text is large and impactful
- [ ] Grids show 3+ columns
- [ ] Plenty of whitespace
- [ ] Hover states work

## Implementation Priority

1. **Hero sections** - Most visible, highest impact
2. **Navigation** - Critical for usability
3. **Content sections** - Main page content
4. **Cards/Grids** - Layout structure
5. **Forms** - User interaction
6. **Footer** - Completeness

## Files to Update

All page.tsx files should follow these standards:

- app/page.tsx ✅ (Already updated)
- app/programs/page.tsx
- app/courses/page.tsx
- app/events/page.tsx
- app/about/page.tsx
- app/contact/page.tsx
- app/employers/page.tsx
- app/support/page.tsx
- And all other public-facing pages
