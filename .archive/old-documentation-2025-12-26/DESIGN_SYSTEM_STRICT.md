# Design System - Strict Constraints

## The Problem

- Spacing jumps between sections
- Density varies wildly
- Some pages feel finished, others feel "in progress"
- Too many features, not enough restraint

## The Solution

**Polish = Restraint, Not More Features**

---

## Spacing Rules (NEVER DEVIATE)

### Vertical Spacing

```css
/* Section Spacing - ONLY THESE VALUES */
py-12  /* Small sections (mobile-first) */
py-16  /* Standard sections (default) */
py-20  /* Large sections (hero, major features) */

/* Element Spacing - ONLY THESE VALUES */
mb-4   /* Tight (within cards) */
mb-6   /* Standard (between elements) */
mb-8   /* Loose (between groups) */
mb-12  /* Section headers */

/* NEVER USE: py-8, py-10, py-14, py-18, py-24, etc. */
```

### Horizontal Spacing

```css
/* Container - ALWAYS USE THIS */
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

/* Gap - ONLY THESE VALUES */
gap-4  /* Tight */
gap-6  /* Standard */
gap-8  /* Loose */

/* NEVER USE: gap-3, gap-5, gap-7, gap-10, etc. */
```

---

## Typography Rules (NEVER DEVIATE)

### Headings

```css
/* H1 - Hero only */
text-4xl md:text-5xl font-bold text-slate-900 mb-6

/* H2 - Section titles */
text-3xl font-bold text-slate-900 mb-8

/* H3 - Subsections */
text-xl font-bold text-slate-900 mb-4

/* Body */
text-base text-slate-700 leading-relaxed

/* Small */
text-sm text-slate-600
```

### NEVER USE

- text-2xl (too close to text-xl)
- text-6xl (too large except hero)
- Multiple font weights (only bold or normal)
- Custom line heights (use leading-relaxed or default)

---

## Color Rules (NEVER DEVIATE)

### Primary Colors

```css
/* Backgrounds */
bg-white           /* Default */
bg-slate-50        /* Alternate sections */
bg-slate-900       /* Dark sections */

/* Text */
text-slate-900     /* Headings */
text-slate-700     /* Body */
text-slate-600     /* Secondary */
text-slate-500     /* Tertiary */

/* Accents */
bg-blue-600        /* Primary CTA */
bg-brand-orange-600 /* Secondary CTA */
text-green-600     /* Success/checkmarks */
```

### NEVER USE

- Multiple shades of same color on one page
- Red (except errors)
- Purple, pink, yellow (except specific icons)
- Gradients (except hero backgrounds)

---

## Component Rules (NEVER DEVIATE)

### Buttons

```tsx
/* Primary */
<button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">

/* Secondary */
<button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition border border-slate-200">

/* NEVER USE: Different padding, different radius, different hover states */
```

### Cards

```tsx
/* Standard Card */
<div className="bg-white border border-slate-200 rounded-lg p-6">

/* NEVER USE: p-4, p-8, rounded-xl, shadow-lg (except hover) */
```

### Sections

```tsx
/* Standard Section */
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-slate-900 mb-8">Title</h2>
    {/* Content */}
  </div>
</section>

/* Alternate Section */
<section className="py-16 bg-slate-50">
  {/* Same structure */}
</section>

/* NEVER USE: Different py values, different container widths */
```

---

## Grid Rules (NEVER DEVIATE)

### Standard Grids

```tsx
/* 2 Column */
<div className="grid md:grid-cols-2 gap-6">

/* 3 Column */
<div className="grid md:grid-cols-3 gap-6">

/* 4 Column */
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

/* NEVER USE: grid-cols-5, gap-8, different breakpoints */
```

---

## Page Structure (ALWAYS FOLLOW)

### Every Page Must Have

1. Hero (py-20)
2. 2-4 Content Sections (py-16 each)
3. CTA Section (py-16)
4. Consistent spacing between ALL sections

### Example Structure

```tsx
<main>
  {/* Hero - py-20 */}
  <section className="py-20 bg-slate-900 text-white">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Title</h1>
      <p className="text-xl mb-8">Subtitle</p>
      {/* CTAs */}
    </div>
  </section>

  {/* Content Section 1 - py-16 */}
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Section Title</h2>
      {/* Content */}
    </div>
  </section>

  {/* Content Section 2 - py-16 */}
  <section className="py-16 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Section Title</h2>
      {/* Content */}
    </div>
  </section>

  {/* CTA - py-16 */}
  <section className="py-16 bg-blue-600 text-white">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">CTA Title</h2>
      <p className="text-xl mb-8">CTA Description</p>
      {/* Button */}
    </div>
  </section>
</main>
```

---

## What to Remove

### Delete These Immediately

- [ ] py-8, py-10, py-12, py-14, py-18, py-24
- [ ] gap-3, gap-5, gap-7, gap-10
- [ ] text-2xl, text-6xl
- [ ] Multiple button styles
- [ ] Inconsistent card padding
- [ ] Random shadows
- [ ] Unnecessary gradients
- [ ] Extra font weights
- [ ] Custom spacing values

### Consolidate These

- [ ] All hero sections → py-20
- [ ] All content sections → py-16
- [ ] All cards → p-6
- [ ] All buttons → px-8 py-4
- [ ] All grids → gap-6

---

## Audit Checklist

For EVERY page, verify:

- [ ] All sections use py-16 or py-20 only
- [ ] All containers use max-w-7xl mx-auto px-4
- [ ] All headings follow size rules
- [ ] All buttons use standard styles
- [ ] All cards use p-6
- [ ] All grids use gap-6
- [ ] No random spacing values
- [ ] Consistent bg colors (white/slate-50 alternating)

---

## Implementation

### Step 1: Create Base Components

```tsx
// components/ui/Section.tsx
export function Section({ children, variant = 'white' }) {
  return (
    <section
      className={`py-16 ${variant === 'white' ? 'bg-white' : 'bg-slate-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4">{children}</div>
    </section>
  );
}

// components/ui/SectionTitle.tsx
export function SectionTitle({ children }) {
  return <h2 className="text-3xl font-bold text-slate-900 mb-8">{children}</h2>;
}

// components/ui/Button.tsx
export function Button({ children, variant = 'primary', ...props }) {
  const classes =
    variant === 'primary'
      ? 'px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition'
      : 'px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition border border-slate-200';

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

// components/ui/Card.tsx
export function Card({ children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      {children}
    </div>
  );
}
```

### Step 2: Replace All Instances

- Find all `py-` values → Replace with py-16 or py-20
- Find all `gap-` values → Replace with gap-6
- Find all button styles → Use Button component
- Find all card styles → Use Card component

### Step 3: Verify Consistency

- Run visual regression tests
- Check every page manually
- Ensure no spacing jumps
- Confirm density is consistent

---

## The Result

### Before

- 20+ different py values
- 15+ different gap values
- 10+ button styles
- Inconsistent density
- Feels "in progress"

### After

- 2 py values (py-16, py-20)
- 1 gap value (gap-6)
- 2 button styles (primary, secondary)
- Consistent density
- Feels curated and polished

---

## Rules Summary

1. **Spacing**: Only py-16, py-20, gap-6
2. **Typography**: Only 3 heading sizes
3. **Colors**: Only white, slate-50, slate-900 backgrounds
4. **Components**: Only 2 button styles, 1 card style
5. **Structure**: Every page follows same pattern
6. **Restraint**: Remove features, don't add them

**Polish = Saying No**
