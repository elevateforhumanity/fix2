# Elevate for Humanity - Brand Guidelines

## Brand Colors

### Primary Colors

**Orange (Primary CTA & Highlights)**

- `brand-orange-600` (#ea580c) - Primary buttons, CTAs, highlights
- `brand-orange-500` (#f97316) - Hover states, secondary highlights
- `brand-orange-700` (#c2410c) - Active states, dark mode

**Usage:**

```tsx
// Primary CTA Button
<button className="bg-brand-orange-600 hover:bg-brand-orange-700 text-white">
  Apply Now
</button>

// Highlight Text
<span className="text-brand-orange-600 font-bold">100% Free</span>

// Stats/Numbers
<div className="text-4xl font-bold text-brand-orange-500">$0</div>
```

---

### Secondary Colors

**Blue (Trust & Professional)**

- `brand-blue-600` (#2563eb) - Secondary buttons, links, professional elements
- `brand-blue-500` (#3b82f6) - Hover states
- `brand-blue-700` (#1d4ed8) - Active states

**Usage:**

```tsx
// Secondary Button
<button className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white">
  Learn More
</button>

// Links
<a className="text-brand-blue-600 hover:text-brand-blue-700">Read More</a>

// Info Sections
<div className="bg-brand-blue-50 border-brand-blue-200">Info</div>
```

---

### Success/Positive Colors

**Green (Success & Completion)**

- `brand-green-600` (#16a34a) - Success messages, checkmarks, completion
- `brand-green-500` (#22c55e) - Positive indicators
- `brand-green-100` (#dcfce7) - Success backgrounds

**Usage:**

```tsx
// Success Message
<div className="bg-brand-green-100 border-brand-green-600 text-brand-green-900">
  Application Submitted!
</div>

// Checkmark Icons
<CheckCircle className="text-brand-green-600" />

// Progress Indicators
<div className="bg-brand-green-600">75% Complete</div>
```

---

### Neutral Colors

**Slate (Text & Backgrounds)**

- `slate-900` (#0f172a) - Primary text, headings
- `slate-700` (#334155) - Secondary text
- `slate-600` (#475569) - Tertiary text, captions
- `slate-50` (#f8fafc) - Light backgrounds
- `slate-100` (#f1f5f9) - Card backgrounds
- `white` (#ffffff) - Main backgrounds

**Usage:**

```tsx
// Headings
<h1 className="text-slate-900">Main Heading</h1>

// Body Text
<p className="text-slate-700">Body text content</p>

// Captions
<span className="text-slate-600 text-sm">Caption text</span>

// Backgrounds
<section className="bg-slate-50">Content</section>
```

---

## Color Usage Rules

### DO ✅

1. **Use orange for primary CTAs**
   - Apply buttons
   - Get Started buttons
   - Primary actions

2. **Use blue for secondary actions**
   - Learn More buttons
   - Info links
   - Professional sections

3. **Use green for success states**
   - Completion messages
   - Success indicators
   - Positive feedback

4. **Use slate for text hierarchy**
   - slate-900 for headings
   - slate-700 for body
   - slate-600 for captions

5. **Maintain contrast ratios**
   - Text on white: slate-700 or darker
   - White text on colors: 600+ shades

### DON'T ❌

1. **Don't mix color systems**
   - ❌ `text-orange-500` and `text-brand-orange-600` on same page
   - ✅ Use `brand-orange-*` consistently

2. **Don't use too many colors**
   - ❌ Orange, blue, green, purple, red all on one page
   - ✅ Stick to 2-3 colors per page

3. **Don't use low contrast**
   - ❌ `text-slate-400` on `bg-white`
   - ✅ `text-slate-700` on `bg-white`

4. **Don't use colors for decoration**
   - ❌ Random colored boxes
   - ✅ Colors should have meaning

---

## Component Color Patterns

### Buttons

```tsx
// Primary CTA
<button className="bg-brand-orange-600 hover:bg-brand-orange-700 text-white font-bold px-8 py-4 rounded-lg transition">
  Apply Now
</button>

// Secondary
<button className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold px-6 py-3 rounded-lg transition">
  Learn More
</button>

// Outline
<button className="border-2 border-brand-orange-600 text-brand-orange-600 hover:bg-brand-orange-50 font-bold px-6 py-3 rounded-lg transition">
  View Details
</button>

// Ghost
<button className="text-brand-blue-600 hover:text-brand-blue-700 hover:bg-brand-blue-50 font-semibold px-4 py-2 rounded-lg transition">
  Cancel
</button>
```

### Cards

```tsx
// Standard Card
<div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition">
  <h3 className="text-xl font-bold text-slate-900 mb-2">Card Title</h3>
  <p className="text-slate-600">Card content</p>
</div>

// Highlighted Card
<div className="bg-brand-orange-50 border-2 border-brand-orange-600 rounded-2xl p-6">
  <h3 className="text-xl font-bold text-brand-orange-900 mb-2">Featured</h3>
  <p className="text-brand-orange-700">Special content</p>
</div>
```

### Alerts

```tsx
// Success
<div className="bg-brand-green-100 border-l-4 border-brand-green-600 p-4">
  <p className="text-brand-green-900">Success message</p>
</div>

// Info
<div className="bg-brand-blue-100 border-l-4 border-brand-blue-600 p-4">
  <p className="text-brand-blue-900">Info message</p>
</div>

// Warning
<div className="bg-yellow-100 border-l-4 border-yellow-600 p-4">
  <p className="text-yellow-900">Warning message</p>
</div>
```

### Badges

```tsx
// Status Badge
<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-brand-green-100 text-brand-green-800">
  Active
</span>

// Count Badge
<span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold bg-brand-orange-600 text-white">
  5
</span>
```

---

## Page-Specific Color Schemes

### Homepage

- Hero: Video with text overlay (white text)
- Stats: Orange numbers (`brand-orange-500`)
- Programs: White cards with orange hover
- CTA: Orange buttons on dark background

### Program Pages

- Hero: Image with gradient overlay
- Benefits: Green checkmarks
- Pricing: Orange highlights
- CTA: Orange primary button

### Application Pages

- Form: Blue accents
- Success: Green confirmation
- Tracking: Blue status indicators

### Dashboard Pages

- Navigation: Blue active states
- Stats: Orange numbers
- Progress: Green bars
- Alerts: Contextual colors

---

## Accessibility

### Contrast Ratios (WCAG AA)

**Text on White:**

- ✅ slate-900 (19.1:1)
- ✅ slate-700 (8.6:1)
- ✅ slate-600 (5.9:1)
- ⚠️ slate-500 (4.2:1) - Use for large text only
- ❌ slate-400 (2.9:1) - Don't use

**White Text on Colors:**

- ✅ brand-orange-600 (4.8:1)
- ✅ brand-blue-600 (5.4:1)
- ✅ brand-green-600 (4.6:1)

### Testing

Always test color combinations with:

- Chrome DevTools Lighthouse
- WebAIM Contrast Checker
- Real users with color blindness

---

## Migration Guide

### Replacing Old Colors

**Orange:**

```tsx
// Old
text-orange-500 → text-brand-orange-500
bg-orange-600 → bg-brand-orange-600
hover:bg-orange-700 → hover:bg-brand-orange-700

// New (preferred)
text-brand-orange-600
bg-brand-orange-600
hover:bg-brand-orange-700
```

**Blue:**

```tsx
// Old
text-blue-600 → text-brand-blue-600
bg-blue-700 → bg-brand-blue-700

// New (preferred)
text-brand-blue-600
bg-brand-blue-700
```

**Green:**

```tsx
// Old
text-green-600 → text-brand-green-600
bg-green-100 → bg-brand-green-100

// New (preferred)
text-brand-green-600
bg-brand-green-100
```

---

## Quick Reference

### Primary Actions

- Background: `bg-brand-orange-600`
- Hover: `hover:bg-brand-orange-700`
- Text: `text-white`

### Secondary Actions

- Background: `bg-brand-blue-600`
- Hover: `hover:bg-brand-blue-700`
- Text: `text-white`

### Success States

- Background: `bg-brand-green-100`
- Border: `border-brand-green-600`
- Text: `text-brand-green-900`

### Text Hierarchy

- H1: `text-slate-900 text-4xl md:text-5xl font-bold`
- H2: `text-slate-900 text-3xl md:text-4xl font-bold`
- H3: `text-slate-900 text-xl font-bold`
- Body: `text-slate-700 text-base`
- Caption: `text-slate-600 text-sm`

---

## Examples in Production

### Homepage Hero

```tsx
<section className="relative">
  <video className="w-full h-auto" />
  <div className="absolute inset-0 bg-black/50">
    <h1 className="text-white text-5xl font-bold">We See Your Potential</h1>
    <button className="bg-brand-orange-600 hover:bg-brand-orange-700 text-white">
      Apply Now
    </button>
  </div>
</section>
```

### Stats Section

```tsx
<div className="grid grid-cols-4 gap-6">
  <div>
    <div className="text-4xl font-bold text-brand-orange-500">100%</div>
    <div className="text-sm text-slate-600">Free Training</div>
  </div>
</div>
```

### Program Card

```tsx
<div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition">
  <Image src="..." alt="..." />
  <div className="p-6">
    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-orange-600">
      Program Name
    </h3>
    <p className="text-slate-600">Description</p>
    <button className="bg-brand-orange-600 text-white">Learn More</button>
  </div>
</div>
```

---

## Enforcement

### Automated Checks

- ESLint rule for deprecated color classes
- Pre-commit hook to check color usage
- CI/CD pipeline color validation

### Manual Review

- Design review before merge
- Accessibility audit quarterly
- User testing for color perception

---

## Resources

- [Tailwind Color Palette](https://tailwindcss.com/docs/customizing-colors)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Blind Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)
