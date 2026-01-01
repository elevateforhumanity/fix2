# Mobile Structural Fixes - Action Plan

## Critical Issues Found & Fixes

### ✅ Issue #1: Text Overlap / Garbled Headings
**Status**: NOT FOUND in current codebase
**Searched**: All page.tsx files for absolute positioned headings
**Result**: No problematic absolute positioning on headings found

**Preventive Measures Applied**:
- All headings use natural document flow
- No fixed heights on text containers
- No duplicated heading components
- Responsive text sizing with proper breakpoints

### ⚠️ Issue #2: White/Grey "Hole" Block
**Status**: NEEDS VERIFICATION
**Likely Causes**:
- Media containers with missing src
- Lazy-loaded components failing on mobile
- Desktop-only elements occupying space

**Action Required**:
- Need specific page URL to identify the exact component
- Will audit all media containers for proper mobile handling

### ❌ Issue #3: Dark/Dimmed Overlay (FOUND & FIXING)
**Location**: `components/layout/SiteHeader.tsx`
**Problem**: Mobile menu backdrop has incorrect positioning

**Current Code** (Line ~280):
```tsx
<div
  className="lg:hidden fixed inset-0 bg-black/50 z-40 top-16"
  onClick={() => setMobileMenuOpen(false)}
/>
```

**Issues**:
1. `top-16` (64px) doesn't match header height of 72px
2. Creates positioning mismatch
3. May leave gap or extend too far

**Fix**:
```tsx
<div
  className="lg:hidden fixed inset-0 bg-black/50 z-40"
  style={{ top: 'var(--header-h)' }}
  onClick={() => setMobileMenuOpen(false)}
/>
```

### ✅ Issue #4: Header + Content Flow
**Status**: PROPERLY CONFIGURED
**Current Implementation**:
- Header height: `--header-h: 72px` (defined in ConditionalLayout)
- Header: `fixed top-0 h-[var(--header-h)]`
- Main content: `pt-[var(--header-h)]`
- Single layout spine ✅

**No changes needed** - architecture is correct.

## Fixes to Apply

### Fix #1: Mobile Menu Backdrop Positioning

**File**: `components/layout/SiteHeader.tsx`

**Change**:
```tsx
// BEFORE
<div
  className="lg:hidden fixed inset-0 bg-black/50 z-40 top-16"
  onClick={() => setMobileMenuOpen(false)}
  aria-hidden="true"
/>

// AFTER
<div
  className="lg:hidden fixed inset-0 bg-black/50 z-40"
  style={{ top: 'var(--header-h)' }}
  onClick={() => setMobileMenuOpen(false)}
  aria-hidden="true"
/>
```

**Also update mobile menu panel**:
```tsx
// BEFORE
<div
  id="mobile-menu"
  className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto pb-safe shadow-2xl"
>

// AFTER
<div
  id="mobile-menu"
  className="lg:hidden fixed left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto pb-safe shadow-2xl"
  style={{ top: 'var(--header-h)' }}
>
```

### Fix #2: Ensure Backdrop Unmounts Properly

**Verify** that backdrop only exists when menu is open:
```tsx
{mobileMenuOpen && (
  <>
    <div className="backdrop..." />
    <div className="menu..." />
  </>
)}
```

✅ Already correct - backdrop is conditionally rendered.

### Fix #3: Remove Any Global Opacity/Filter

**Checked**:
- `app/globals.css` - ✅ No global opacity on body/main
- `app/layout.tsx` - ✅ No opacity on root elements
- `components/layout/ConditionalLayout.tsx` - ✅ Clean

**No changes needed**.

## Testing Checklist

After applying fixes:

### Mobile Menu Backdrop
- [ ] Open mobile menu
- [ ] Verify backdrop starts exactly at header bottom
- [ ] Verify no gap between header and backdrop
- [ ] Close menu - verify backdrop disappears completely
- [ ] Verify page is not dimmed when menu is closed

### Page Brightness
- [ ] Navigate to homepage on mobile
- [ ] Verify page is full brightness
- [ ] Verify footer is full brightness
- [ ] Verify no grey/dimmed overlay anywhere

### Header Spacing
- [ ] Verify no content is hidden under header
- [ ] Verify consistent spacing across all pages
- [ ] Verify hero sections start at correct position

## Additional Audits Needed

### Media Containers
Need to audit for:
1. Images with `fill` but no parent height
2. Videos without mobile fallbacks
3. Iframes without responsive wrappers
4. Lazy-loaded components that fail silently

**Command to find**:
```bash
grep -r "next/image.*fill\|<video\|<iframe" app/ --include="*.tsx"
```

### Absolute Positioning
Continue monitoring for:
1. Headings with absolute positioning
2. Text with transforms that stack
3. Overlapping text layers

**Command to find**:
```bash
grep -r "absolute.*h[1-6]\|transform.*translate.*h[1-6]" app/ --include="*.tsx"
```

## Priority Order

1. **IMMEDIATE**: Fix mobile menu backdrop positioning
2. **HIGH**: Identify and fix white/grey block (need page URL)
3. **MEDIUM**: Audit all media containers
4. **LOW**: Monitor for text overlap patterns

## Status

- ✅ Issue #1 (Text Overlap): Not found, preventive measures in place
- ⏳ Issue #2 (White Block): Awaiting specific page identification
- 🔧 Issue #3 (Dimmed Overlay): Fix ready to apply
- ✅ Issue #4 (Header Flow): Already correct

## Next Steps

1. Apply mobile menu backdrop fix
2. Get screenshot/URL of page with white block
3. Test on real mobile device
4. Verify all issues resolved
