# Gradient Overlay Prevention System

**Goal:** Prevent heavy gradient overlays from being added to the site

---

## 🚫 OPTION 1: CSS Rule to Block Heavy Overlays

Create a CSS rule that warns developers when they use heavy overlays.

**Add to `app/globals.css`:**

```css
/* DESIGN SYSTEM RULE: No heavy overlays on photos */
/* Use bottom gradients instead: bg-gradient-to-t from-color-900/90 to-transparent */

/* This will show a visual warning in development */
[class*='bg-black/5'],
[class*='bg-black/6'],
[class*='bg-black/7'],
[class*='bg-black/8'],
[class*='bg-black/9'],
[class*='bg-blue-900/5'],
[class*='bg-blue-900/6'],
[class*='bg-blue-900/7'],
[class*='bg-blue-900/8'],
[class*='bg-blue-900/9'],
[class*='bg-purple-900/5'],
[class*='bg-purple-900/6'],
[class*='bg-purple-900/7'],
[class*='bg-purple-900/8'],
[class*='bg-purple-900/9'],
[class*='bg-green-900/5'],
[class*='bg-green-900/6'],
[class*='bg-green-900/7'],
[class*='bg-green-900/8'],
[class*='bg-green-900/9'] {
  /* Visual warning in development */
  outline: 3px dashed red !important;
  outline-offset: -3px;
}

/* Add warning message */
[class*='bg-black/5']::before,
[class*='bg-black/6']::before,
[class*='bg-black/7']::before,
[class*='bg-blue-900/5']::before,
[class*='bg-blue-900/6']::before,
[class*='bg-blue-900/7']::before {
  content: '⚠️ HEAVY OVERLAY - Use gradient instead';
  position: absolute;
  top: 0;
  left: 0;
  background: red;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  z-index: 9999;
}
```

**Problem:** This only works in development, not foolproof.

---

## 🎨 OPTION 2: Design System Component

Create a reusable component that enforces the pattern.

**Create `components/ui/ImageOverlay.tsx`:**

```tsx
import { ReactNode } from 'react';

type OverlayType = 'none' | 'light' | 'gradient-bottom' | 'hero';
type OverlayColor = 'blue' | 'purple' | 'green' | 'black';

interface ImageOverlayProps {
  type?: OverlayType;
  color?: OverlayColor;
  children?: ReactNode;
}

/**
 * ImageOverlay Component
 *
 * Enforces design system rules for image overlays.
 *
 * RULES:
 * - No heavy full overlays (50%+ opacity)
 * - Use gradient-bottom for photo cards
 * - Use light overlay (40%) for hero sections only
 *
 * @param type - Overlay type (default: 'gradient-bottom')
 * @param color - Overlay color (default: 'black')
 */
export function ImageOverlay({
  type = 'gradient-bottom',
  color = 'black',
  children,
}: ImageOverlayProps) {
  // Map colors to Tailwind classes
  const colorMap = {
    blue: 'blue-900',
    purple: 'purple-900',
    green: 'green-900',
    black: 'black',
  };

  const colorClass = colorMap[color];

  // Map types to Tailwind classes
  const overlayClasses = {
    none: '',
    light: `bg-${colorClass}/40`, // 40% for hero sections
    'gradient-bottom': `bg-gradient-to-t from-${colorClass}/90 via-${colorClass}/30 to-transparent`,
    hero: `bg-${colorClass}/40`, // Alias for light
  };

  const className = overlayClasses[type];

  if (type === 'none') {
    return <>{children}</>;
  }

  return <div className={`absolute inset-0 ${className}`}>{children}</div>;
}
```

**Usage:**

```tsx
{
  /* Photo card - use gradient */
}
<div className="relative h-48">
  <Image src="/images/students.jpg" alt="Students" fill />
  <ImageOverlay type="gradient-bottom" color="blue">
    <div className="absolute bottom-4 left-4">
      <h3 className="text-white">For Students</h3>
    </div>
  </ImageOverlay>
</div>;

{
  /* Hero section - use light overlay */
}
<div className="relative h-96">
  <video src="/hero.mp4" />
  <ImageOverlay type="hero">
    <div className="flex items-center justify-center h-full">
      <h1 className="text-white">Hero Title</h1>
    </div>
  </ImageOverlay>
</div>;
```

---

## 📋 OPTION 3: ESLint Rule (Best for Teams)

Create a custom ESLint rule to catch heavy overlays in code review.

**Create `.eslintrc.json` rule:**

```json
{
  "rules": {
    "no-restricted-syntax": [
      "error",
      {
        "selector": "Literal[value=/bg-(black|.*-900)\\/(5|6|7|8|9)[0-9]/]",
        "message": "❌ Heavy overlays (50%+) are not allowed. Use bg-gradient-to-t from-color-900/90 to-transparent instead."
      }
    ]
  }
}
```

**Problem:** Hard to configure, might have false positives.

---

## 🛡️ OPTION 4: Documentation + Code Comments (Simplest)

Add clear comments in the code where overlays are used.

**Add to `app/page.tsx` and other files:**

```tsx
{
  /* 
  DESIGN SYSTEM RULE: Image Overlays
  
  ✅ ALLOWED:
  - Hero sections: bg-black/40 (light overlay for text readability)
  - Photo cards: bg-gradient-to-t from-color-900/90 via-color-900/30 to-transparent
  
  ❌ NOT ALLOWED:
  - Heavy full overlays: bg-black/50, bg-black/60, bg-black/70
  - Full color overlays: bg-blue-900/70, bg-purple-900/70
  
  WHY: We have real photos of real students. Heavy overlays hide them
  and make the site look generic. Use gradients to show photos while
  keeping text readable.
*/
}

{
  /* Example: Photo card with gradient */
}
<div className="relative h-48">
  <Image src="/images/students.jpg" alt="Students" fill />
  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/30 to-transparent" />
  <div className="absolute bottom-4 left-4">
    <h3 className="text-white">For Students</h3>
  </div>
</div>;
```

---

## 📖 OPTION 5: Design System Documentation

Create a design system doc that developers must follow.

**Create `docs/DESIGN_SYSTEM.md`:**

````markdown
# Design System - Image Overlays

## Rules

### ✅ DO: Use Bottom Gradients for Photo Cards

```tsx
<div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/30 to-transparent" />
```
````

**Why:** Shows real photos at top, provides dark background for text at bottom.

### ✅ DO: Use Light Overlays for Hero Sections

```tsx
<div className="absolute inset-0 bg-black/40" />
```

**Why:** Hero sections have text throughout, need consistent darkness.

### ❌ DON'T: Use Heavy Full Overlays

```tsx
{
  /* ❌ BAD - Hides photo */
}
<div className="absolute inset-0 bg-blue-900/70" />;

{
  /* ❌ BAD - Too dark */
}
<div className="absolute inset-0 bg-black/60" />;
```

**Why:** We have real photos. Heavy overlays make them invisible and generic.

## Examples

### Photo Card Pattern

```tsx
<Link href="/for-students" className="group relative">
  <div className="relative h-48">
    <Image src="/images/students.jpg" alt="Students" fill />
    {/* Gradient: 0% at top, 90% at bottom */}
    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/30 to-transparent" />
    <div className="absolute bottom-4 left-4">
      <h3 className="text-white">For Students</h3>
    </div>
  </div>
</Link>
```

### Hero Section Pattern

```tsx
<section className="relative h-96">
  <video src="/hero.mp4" autoPlay loop muted />
  {/* Light overlay: 40% */}
  <div className="absolute inset-0 bg-black/40" />
  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="text-white">Hero Title</h1>
  </div>
</section>
```

````

---

## 🎯 RECOMMENDED APPROACH

**Use a combination:**

1. ✅ **Add code comments** (Option 4) - Immediate, clear
2. ✅ **Create design system doc** (Option 5) - Reference for team
3. ✅ **Create ImageOverlay component** (Option 2) - Enforce pattern
4. ⚠️ **CSS warning** (Option 1) - Optional, for development only

---

## 🔧 IMPLEMENTATION

### Step 1: Add Code Comments

Add this comment block to `app/page.tsx` at the top:

```tsx
/**
 * DESIGN SYSTEM RULE: Image Overlays
 *
 * ✅ Photo cards: Use bottom gradients
 *    bg-gradient-to-t from-color-900/90 via-color-900/30 to-transparent
 *
 * ✅ Hero sections: Use light overlays (40% max)
 *    bg-black/40
 *
 * ❌ NO heavy full overlays (50%+ opacity)
 *    bg-black/60, bg-blue-900/70, etc.
 *
 * WHY: We have real photos of real students. Show them!
 */
````

### Step 2: Create Design System Doc

Create `docs/DESIGN_SYSTEM_OVERLAYS.md` with the rules above.

### Step 3: Create Reusable Component

Create `components/ui/ImageOverlay.tsx` with the component above.

### Step 4: Update Existing Code

Replace all heavy overlays with the new pattern:

- Photo cards → gradient-bottom
- Hero sections → 40% overlay

---

## 📊 BEFORE/AFTER

### Before (No Protection)

```tsx
{
  /* Developer adds heavy overlay */
}
<div className="absolute inset-0 bg-blue-900/70" />;
```

**Result:** Photo hidden, looks generic

### After (With Protection)

```tsx
{
  /* Developer sees comment, uses correct pattern */
}
<ImageOverlay type="gradient-bottom" color="blue">
  <div className="absolute bottom-4 left-4">
    <h3>For Students</h3>
  </div>
</ImageOverlay>;
```

**Result:** Photo visible, text readable

---

## 🎯 SUMMARY

**Best Solution:**

1. Add clear code comments explaining the rule
2. Create design system documentation
3. Create reusable `ImageOverlay` component
4. Update existing code to use the pattern

**This prevents:**

- ❌ Heavy overlays being added
- ❌ Photos being hidden
- ❌ Generic corporate look

**This ensures:**

- ✅ Real photos are visible
- ✅ Text remains readable
- ✅ Consistent design pattern
- ✅ Team follows best practices
