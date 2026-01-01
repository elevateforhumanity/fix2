# CSS & Font Documentation

**Last Updated:** December 26, 2025  
**Status:** Complete Reference Guide

---

## Font System

### Primary Font: Inter

**Font Family:**

```css
font-family:
  'Inter',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  'Roboto',
  sans-serif;
```

**Where it's loaded:**

- `app/layout.tsx` - Imported from `next/font/google`
- Applied globally via CSS variable `--font-inter`

**Font Weights Available:**

- 400 (Normal)
- 500 (Medium)
- 600 (Semibold)
- 700 (Bold)
- 800 (Extrabold)

---

## Typography Scale

### Display Sizes (Hero Headlines)

```css
display-lg: 60px (3.75rem)
  - Line height: 1.1
  - Letter spacing: -0.02em
  - Font weight: 700
  - Use: Hero sections only

display-md: 48px (3rem)
  - Line height: 1.1
  - Letter spacing: -0.02em
  - Font weight: 700
  - Use: Large hero headlines

display-sm: 36px (2.25rem)
  - Line height: 1.2
  - Letter spacing: -0.01em
  - Font weight: 700
  - Use: Section heroes
```

### Heading Sizes

```css
h1: 32px (2rem)
  - Line height: 1.25
  - Letter spacing: -0.01em
  - Font weight: 700
  - Tailwind: text-h1

h2: 24px (1.5rem)
  - Line height: 1.3
  - Font weight: 700
  - Tailwind: text-h2

h3: 20px (1.25rem)
  - Line height: 1.4
  - Font weight: 600
  - Tailwind: text-h3

h4: 18px (1.125rem)
  - Line height: 1.4
  - Font weight: 600
  - Tailwind: text-h4
```

### Body Text

```css
body-lg: 18px (1.125rem)
  - Line height: 1.6
  - Tailwind: text-body-lg

body: 16px (1rem)
  - Line height: 1.6
  - Tailwind: text-body

body-sm: 14px (0.875rem)
  - Line height: 1.5
  - Tailwind: text-body-sm
```

### Small Text

```css
meta: 12px (0.75rem)
  - Line height: 1.5
  - Font weight: 500
  - Tailwind: text-meta
```

---

## CSS Files Structure

### Main CSS Files

**1. `app/globals.css`**

- Global styles and base layer
- Imports design tokens
- Sets default font family
- Defines heading styles
- Component utility classes

**2. `styles/design-tokens.css`**

- CSS custom properties
- Brand colors
- Spacing scale
- Typography scale
- Shadows and radius

**3. `styles/design-system.css`**

- Complete design system variables
- Color palette (full scale)
- Typography system
- Spacing system
- Container widths
- Border radius
- Shadows
- Transitions
- Z-index scale

**4. `tailwind.config.js`**

- Tailwind configuration
- Design tokens (locked)
- Custom font sizes
- Custom spacing
- Custom colors
- Border radius
- Shadows

---

## Color System

### Brand Colors

**Orange (Primary CTA)**

```css
--brand-orange-500: #f97316 /* Main orange */ --brand-orange-600: #ea580c
  /* Primary CTA */ Tailwind classes: - bg-brand-orange-500 -
  bg-brand-orange-600 - text-brand-orange-600 - border-brand-orange-600;
```

**Blue (Secondary)**

```css
--brand-blue-500: #3b82f6 /* Main blue */ --brand-blue-600: #2563eb
  /* Primary blue */ Tailwind classes: - bg-brand-blue-600 -
  text-brand-blue-600 - border-brand-blue-600;
```

**Green (Success)**

```css
--brand-green-500: #22c55e /* Success green */ --brand-green-600: #16a34a
  Tailwind classes: - bg-brand-green-600 - text-brand-green-600;
```

**Neutral/Slate (Text & Backgrounds)**

```css
--neutral-50:
  #f8fafc /* Lightest */ --neutral-100: #f1f5f9 --neutral-200: #e2e8f0
    --neutral-300: #cbd5e1 --neutral-400: #94a3b8 --neutral-500: #64748b
    --neutral-600: #475569 --neutral-700: #334155 --neutral-800: #1e293b
    --neutral-900: #0f172a /* Darkest */ Tailwind classes: - bg-slate-50 to
    bg-slate-900 - text-slate-700,
  text-slate-900 - border-slate-200, border-slate-300;
```

---

## Spacing System

### Spacing Scale

```css
space-1: 4px (0.25rem)    - Tailwind: p-1, m-1, gap-1
space-2: 8px (0.5rem)     - Tailwind: p-2, m-2, gap-2
space-3: 12px (0.75rem)   - Tailwind: p-3, m-3, gap-3
space-4: 16px (1rem)      - Tailwind: p-4, m-4, gap-4
space-6: 24px (1.5rem)    - Tailwind: p-6, m-6, gap-6
space-8: 32px (2rem)      - Tailwind: p-8, m-8, gap-8
space-12: 48px (3rem)     - Tailwind: p-12, m-12, gap-12
space-16: 64px (4rem)     - Tailwind: p-16, m-16, gap-16
space-20: 80px (5rem)     - Tailwind: p-20, m-20, gap-20
```

### Section Spacing

```css
section-y: 64px (4rem)       - Desktop section padding
section-y-sm: 40px (2.5rem)  - Mobile section padding

Usage:
- py-section-y (desktop)
- py-section-y-sm (mobile)
```

### Container Padding

```css
container-x: 16px (1rem)      - Mobile
container-x-md: 24px (1.5rem) - Tablet
container-x-lg: 32px (2rem)   - Desktop

Usage:
- px-4 md:px-6 lg:px-8
```

---

## Component Classes

### Buttons

```css
.btn-primary
  - Orange background
  - White text
  - Rounded full
  - Shadow
  - Hover: darker orange
  - Active: scale down

.btn-secondary
  - Blue background
  - White text
  - Similar styling

.btn-outline
  - White background
  - Border
  - Hover: light gray background

.btn-ghost
  - Transparent background
  - Hover: light background
```

### Cards

```css
.card
  - White background
  - Rounded 2xl (1rem)
  - Shadow
  - Border

.card-interactive
  - Same as .card
  - Hover: lift up
  - Hover: larger shadow
  - Transition: smooth
```

### Sections

```css
.section
  - Vertical padding
  - Responsive: py-12 md:py-16 lg:py-20

.container-padded
  - Max width: 7xl (1280px)
  - Horizontal padding
  - Centered
```

---

## Responsive Breakpoints

```css
sm: 640px   - Small tablets
md: 768px   - Tablets
lg: 1024px  - Laptops
xl: 1280px  - Desktops
2xl: 1536px - Large desktops
```

### Usage Examples

```jsx
// Responsive text size
<h1 className="text-2xl md:text-3xl lg:text-4xl">

// Responsive padding
<div className="py-12 md:py-16 lg:py-20">

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Hide on mobile
<div className="hidden lg:block">

// Show only on mobile
<div className="lg:hidden">
```

---

## Common Patterns

### Hero Section

```jsx
<section className="relative h-[400px] md:h-[500px] lg:h-[600px]">
  <Image fill className="object-cover" />
  <div className="absolute inset-0 bg-black/50" />
  <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
      Hero Title
    </h1>
  </div>
</section>
```

### Content Section

```jsx
<section className="py-12 md:py-16 lg:py-20">
  <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
    <h2 className="text-3xl md:text-4xl font-bold mb-6">Section Title</h2>
    <p className="text-lg text-slate-700">Content text</p>
  </div>
</section>
```

### Card Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="card p-6">
    <h3 className="text-xl font-bold mb-4">Card Title</h3>
    <p className="text-slate-700">Card content</p>
  </div>
</div>
```

### Button Group

```jsx
<div className="flex flex-col sm:flex-row gap-4">
  <button className="btn-primary">Primary Action</button>
  <button className="btn-outline">Secondary Action</button>
</div>
```

---

## Design System Components

**Location:** `components/ui/design-system/`

**Available Components:**

- `Button` - Styled buttons with variants
- `Card` - Card containers
- `Container` - Max-width wrapper
- `Section` - Section wrapper with padding
- `Accordion` - Expandable content
- `ShowMore` - Truncate/expand text

**Usage:**

```jsx
import { Button, Card, Container } from '@/components/ui/design-system';

<Container>
  <Card>
    <Button variant="primary">Click Me</Button>
  </Card>
</Container>;
```

---

## Best Practices

### Typography

1. Use design system font sizes (text-h1, text-body, etc.)
2. Maintain hierarchy (h1 → h2 → h3)
3. Body text minimum 16px for readability
4. Tight letter-spacing for large headlines (-0.02em)
5. Line-height 1.6 for body text

### Colors

1. Use brand colors for CTAs (orange)
2. Use slate for text and backgrounds
3. Limit accent colors per section
4. Maintain contrast for accessibility (WCAG AA)

### Spacing

1. Use consistent spacing scale
2. More whitespace = more professional
3. Mobile-first: smaller spacing on mobile
4. Section padding: py-12 md:py-16 lg:py-20

### Responsive

1. Mobile-first approach
2. Test all breakpoints
3. Touch targets minimum 44px
4. Stack columns on mobile
5. Hide/show content appropriately

---

## Quick Reference

### Most Used Classes

**Text:**

- `text-slate-900` - Dark text
- `text-slate-700` - Body text
- `text-white` - White text
- `font-bold` - Bold weight
- `font-semibold` - Semibold weight

**Backgrounds:**

- `bg-white` - White background
- `bg-slate-50` - Light gray
- `bg-brand-orange-600` - Orange CTA
- `bg-brand-blue-600` - Blue

**Spacing:**

- `p-4` - Padding 16px
- `p-6` - Padding 24px
- `py-12` - Vertical padding 48px
- `px-4` - Horizontal padding 16px
- `gap-6` - Grid/flex gap 24px

**Layout:**

- `max-w-7xl` - Max width 1280px
- `mx-auto` - Center horizontally
- `flex` - Flexbox
- `grid` - Grid
- `grid-cols-1 md:grid-cols-2` - Responsive grid

**Borders:**

- `rounded-lg` - Border radius 8px
- `rounded-xl` - Border radius 12px
- `rounded-2xl` - Border radius 16px
- `border` - 1px border
- `border-slate-200` - Light gray border

**Shadows:**

- `shadow-sm` - Small shadow
- `shadow-md` - Medium shadow
- `shadow-lg` - Large shadow
- `shadow-xl` - Extra large shadow

---

## Files to Reference

1. **`tailwind.config.js`** - All design tokens
2. **`app/globals.css`** - Global styles
3. **`styles/design-tokens.css`** - CSS variables
4. **`styles/design-system.css`** - Complete system
5. **`components/ui/design-system/`** - Reusable components

---

**Need Help?**

- Check existing pages for patterns
- Use design system components
- Follow responsive breakpoints
- Maintain brand colors
- Test on mobile devices
