# Mobile Header Navigation Cutoff Fix

## Issue

Mobile header navigation may appear cut off or content may be hidden behind the sticky header on some devices.

## Root Cause

The sticky header (`sticky top-0`) doesn't automatically add padding to the body content, causing the first elements to be hidden behind it.

## Solution

### Option 1: Add Padding to Main Content (Recommended)

Add padding-top to the main content area to account for header height:

```tsx
// In your layout or page component
<main className="pt-16 md:pt-20">{/* Your content */}</main>
```

### Option 2: Use CSS Variable for Header Height

1. **Update MainNav.tsx** to set a CSS variable:

```tsx
// components/layout/MainNav.tsx
<header
  className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-40"
  style={{ '--header-height': '64px' } as React.CSSProperties}
  role="banner"
>
```

2. **Use the variable in your layout**:

```css
/* globals.css */
body {
  padding-top: var(--header-height, 64px);
}

@media (min-width: 768px) {
  body {
    padding-top: var(--header-height, 72px);
  }
}
```

### Option 3: Scroll Margin (For Anchor Links)

If the issue is with anchor links scrolling behind the header:

```css
/* globals.css */
:target {
  scroll-margin-top: 80px;
}
```

## Quick Fix Applied

The simplest fix is to ensure all page content has proper top padding:

```tsx
// app/layout.tsx or individual pages
<main className="min-h-screen pt-16 md:pt-20">{children}</main>
```

## Testing

Test on:

- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad (Safari)
- [ ] Various screen sizes (320px - 768px)

## Verification

1. Open site on mobile device
2. Scroll to top
3. Verify header is visible and not cutting off content
4. Click navigation links
5. Verify content appears below header, not behind it

## Status

✅ Fix documented
⚠️ Needs implementation in layout
⚠️ Needs testing on physical devices
