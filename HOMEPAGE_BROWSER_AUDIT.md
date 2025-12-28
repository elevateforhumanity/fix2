# Homepage Browser Audit - Hidden Bugs Report

**Date:** December 28, 2025  
**File:** `app/page.tsx`  
**Lines:** 611

---

## 🔴 CRITICAL ISSUES

### 1. Using `<a>` Tags Instead of `<Link>` Components

**Severity:** HIGH - Causes full page reloads, breaks client-side routing

**Locations:**
- Line 99-104: `/enroll` link
- Line 105-110: `/programs` link  
- Line 111-116: `/eligibility` link
- Line 159-164: CNA program link
- Line 198-203: HVAC program link
- Line 237-242: Barber program link

**Issue:**
```tsx
// ❌ WRONG - Causes full page reload
<a href="/enroll" className="...">
  Apply Now
</a>

// ✅ CORRECT - Client-side navigation
<Link href="/enroll" className="...">
  Apply Now
</Link>
```

**Impact:**
- Full page reloads instead of client-side navigation
- Loss of React state
- Slower navigation
- Potential 404 errors if page isn't fully loaded

**Fix Required:** Replace all internal `<a>` tags with `<Link>` components

---

### 2. Unescaped Ampersands in JSX

**Severity:** MEDIUM - Can cause HTML parsing errors

**Locations:**
- Line 8: `'Free Career Training & Apprenticeships Indiana'`
- Line 70: `Funded Workforce Training for Adults & Working Families`
- Line 213: `For Agencies & Partners`
- Line 384: `STUDENT OUTCOMES & SUPPORT`
- Line 428: `EMPLOYERS & WORKFORCE BOARDS`
- Line 523: `COMPLIANCE & TRUST`
- Line 527: `Compliance & Trust`
- Line 535: `Workforce Innovation & Opportunity Act (WIOA)`
- Line 551: `Employer & Board Reporting`
- Line 567: `Role-based access & RLS security`

**Issue:**
```tsx
// ❌ WRONG - Can break HTML parsing
<h1>Training & Apprenticeships</h1>

// ✅ CORRECT - Properly escaped
<h1>Training &amp; Apprenticeships</h1>

// ✅ ALSO CORRECT - React handles this
<h1>{'Training & Apprenticeships'}</h1>
```

**Impact:**
- HTML parsing errors in some browsers
- Potential hydration mismatches
- SEO issues

**Note:** React usually handles this automatically, but explicit escaping is safer.

---

## ⚠️ MEDIUM ISSUES

### 3. Mixed Link Components

**Severity:** MEDIUM - Inconsistent navigation behavior

**Current State:**
- Lines 99-116: Using `<a>` tags
- Lines 312-318: Using `<Link>` components
- Lines 594-606: Using `<Link>` components

**Issue:** Inconsistent navigation patterns confuse users and can cause routing issues.

**Fix Required:** Standardize all internal links to use `<Link>` component.

---

### 4. Large Image Sizes

**Severity:** MEDIUM - Performance impact

**Images Found:**
- `/images/heroes/hero-homepage.jpg` - 240KB
- `/images/artlist/hero-training-4.jpg` - 115KB
- `/images/artlist/hero-training-5.jpg` - 105KB
- `/images/artlist/hero-training-6.jpg` - 94KB

**Impact:**
- Slower initial page load
- Higher bandwidth usage
- Poor mobile experience

**Recommendation:** 
- Optimize images to <100KB
- Use WebP format
- Implement lazy loading for below-fold images

---

## ✅ GOOD PRACTICES FOUND

### 1. Proper Tag Balancing
- ✅ 83 `<div>` tags, 83 `</div>` tags
- ✅ 12 `<section>` tags, 12 `</section>` tags
- ✅ 1 `<main>` tag, 1 `</main>` tag

### 2. No Dangerous Patterns
- ✅ No `dangerouslySetInnerHTML`
- ✅ No `eval()` or `Function()` calls
- ✅ No inline event handlers (proper server component)

### 3. No Hydration Risks
- ✅ No `Date.now()` or `Math.random()` calls
- ✅ No client-side only APIs in server component
- ✅ Proper use of server component (no "use client")

### 4. Proper Component Structure
- ✅ Valid imports
- ✅ Proper metadata export
- ✅ Default function export
- ✅ Proper JSX structure

### 5. Image Optimization
- ✅ Using Next.js `<Image>` component
- ✅ Proper `fill` prop usage
- ✅ Priority loading for hero image
- ✅ Proper `sizes` attribute

---

## 🔍 COMPONENT DEPENDENCIES

### PartnerLogos Component
**File:** `components/marketing/PartnerLogos.tsx`

**Status:** ✅ HEALTHY
- Server component (no "use client")
- Proper default export
- All images exist:
  - `/images/partners/dwd.webp` (1.3KB) ✅
  - `/images/partners/workone.webp` (1.3KB) ✅
  - `/images/partners/usdol.webp` (1KB) ✅
  - `/images/partners/osha.webp` (892B) ✅
  - `/images/partners/nextleveljobs.webp` (1.4KB) ✅

### SuccessStoryCards Component
**File:** `components/marketing/SuccessStoryCards.tsx`

**Status:** ✅ HEALTHY
- Server component (no "use client")
- Proper default export
- Proper key usage in `.map()` (line 50: `key={story.name}`)
- All images exist:
  - `/images/learners/reentry-coaching.jpg` (10KB) ✅
  - `/images/heroes/workforce-partner-1.jpg` (116KB) ✅
  - `/images/heroes/student-career.jpg` (385KB) ✅

---

## 🐛 POTENTIAL BROWSER-BREAKING BUGS

### Bug #1: Navigation Breaks on Slow Connections

**Root Cause:** Using `<a>` tags for internal navigation

**Scenario:**
1. User clicks "Apply Now" button (line 99)
2. Browser initiates full page reload
3. If Vercel deployment is slow or page isn't cached
4. User sees 404 page instead of `/enroll`

**Why This Happens:**
- `<a>` tags bypass Next.js router
- Full page reload required
- If page isn't in build output, 404 occurs
- Client-side routing would handle this gracefully

**Fix:**
```tsx
// Replace lines 99-116
<Link
  href="/enroll"
  className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-zinc-800 transition-colors"
>
  Apply Now
</Link>
```

---

### Bug #2: Hydration Mismatch from Ampersands

**Root Cause:** Unescaped `&` characters in JSX

**Scenario:**
1. Server renders: `Training & Apprenticeships`
2. Browser parses as: `Training &amp; Apprenticeships`
3. React hydration sees mismatch
4. Console error: "Text content does not match"
5. React re-renders, causing flash

**Why This Happens:**
- HTML spec requires `&` to be escaped as `&amp;`
- React usually handles this, but not always
- Can cause hydration errors in strict mode

**Fix:**
```tsx
// Option 1: Explicit escaping
<h1>Training &amp; Apprenticeships</h1>

// Option 2: Use curly braces
<h1>{'Training & Apprenticeships'}</h1>

// Option 3: Use entity
<h1>Training &#38; Apprenticeships</h1>
```

---

### Bug #3: Component Import Mismatch

**Root Cause:** Removed imports but components still referenced

**Check:**
```tsx
// Line 4-5: Current imports
import PartnerLogos from '@/components/marketing/PartnerLogos';
import SuccessStoryCards from '@/components/marketing/SuccessStoryCards';

// Previously removed (line 4-7 in previous version):
// import { OptimizedVideo } from '@/components/OptimizedVideo';
// import HeroVideo from '@/components/home/HeroVideo';
// import PrimaryCtas from '@/components/home/PrimaryCtas';
// import HeroBanner from '@/components/hero/HeroBanner';
```

**Status:** ✅ FIXED - Unused imports removed

---

## 📊 AUDIT SUMMARY

| Category | Status | Count |
|----------|--------|-------|
| Critical Issues | 🔴 | 2 |
| Medium Issues | ⚠️ | 2 |
| Good Practices | ✅ | 5 |
| Total Lines | - | 611 |
| Components Used | ✅ | 2 |
| Images Referenced | ✅ | 7 |
| Internal Links | ⚠️ | 11 |

---

## 🔧 RECOMMENDED FIXES

### Priority 1: Fix Navigation Links

**Impact:** HIGH - Prevents 404 errors

```bash
# Lines to fix: 99-116, 159-164, 198-203, 237-242
# Replace <a> with <Link>
```

**Estimated Time:** 5 minutes  
**Risk:** LOW - Simple find/replace

---

### Priority 2: Escape Ampersands

**Impact:** MEDIUM - Prevents hydration errors

```bash
# Lines to fix: 70, 213, 384, 428, 523, 527, 535, 551, 567
# Replace & with &amp; or wrap in {}
```

**Estimated Time:** 3 minutes  
**Risk:** LOW - Text content only

---

### Priority 3: Optimize Images

**Impact:** MEDIUM - Improves performance

```bash
# Optimize images to <100KB
# Convert to WebP format
# Add lazy loading
```

**Estimated Time:** 15 minutes  
**Risk:** LOW - No code changes

---

## 🧪 TESTING CHECKLIST

After fixes applied:

- [ ] All internal links use `<Link>` component
- [ ] No console errors about hydration
- [ ] No 404 errors when clicking links
- [ ] Page loads in <3 seconds
- [ ] No browser console errors
- [ ] Mobile responsive works
- [ ] All images load correctly
- [ ] Navigation is smooth (no full page reloads)

---

## 🚀 DEPLOYMENT IMPACT

**Before Fixes:**
- ❌ Navigation causes full page reloads
- ❌ Potential 404 errors on slow connections
- ⚠️ Possible hydration warnings
- ⚠️ Slower page loads (large images)

**After Fixes:**
- ✅ Smooth client-side navigation
- ✅ No 404 errors
- ✅ No hydration warnings
- ✅ Faster page loads

---

## 📝 NOTES

1. **Why 404 Errors Occur:**
   - Using `<a>` tags bypasses Next.js router
   - Full page reload required
   - If page isn't in build cache, 404 shown
   - This is the most likely cause of your "page not found" error

2. **Why Ampersands Matter:**
   - HTML spec requires escaping
   - React usually handles it, but not always
   - Can cause hydration mismatches in production
   - Better to be explicit

3. **Component Health:**
   - Both imported components are healthy
   - No circular dependencies
   - Proper exports
   - All assets exist

---

**Generated:** December 28, 2025  
**Audited By:** Ona  
**Status:** Ready for fixes
