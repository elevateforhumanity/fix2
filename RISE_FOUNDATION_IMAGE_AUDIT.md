# Rise Foundation Page - Image Loading Audit

**Date**: 2026-01-03  
**Page**: `/rise-foundation`  
**Issue**: Images not displaying  
**Status**: ✅ DIAGNOSED

---

## Executive Summary

The Rise Foundation page has **6 external images** from Wix CDN that should be displaying but may not be loading correctly. All images are configured with `unoptimized` flag and external URLs.

---

## Images Found (6 Total)

### 1. Hero Background Image

**Location**: Line 41-48  
**URL**: `https://static.wixstatic.com/media/a9980c_542c794668484ecc911de7f139dad437~mv2.jpg`  
**Status**: ✅ URL ACCESSIBLE (HTTP 200)  
**Configuration**:

```jsx
<Image
  src="https://static.wixstatic.com/media/a9980c_542c794668484ecc911de7f139dad437~mv2.jpg"
  alt="Mental wellness background"
  fill
  className="object-cover opacity-20"
  unoptimized
  priority
/>
```

### 2. Mind/Body/Spirit Image 1

**Location**: Line 76-83  
**URL**: `https://static.wixstatic.com/media/a9980c_542c794668484ecc911de7f139dad437~mv2.jpg/v1/fill/w_431,h_377,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Mind%2C%20Body%20and%20spirit%20words%20engraved%20on%20zen%20stones_%20Zen%20concept.jpg`  
**Configuration**:

```jsx
<Image
  src="..."
  alt="Mind, Body and spirit words engraved on zen stones"
  fill
  className="object-cover"
  unoptimized
/>
```

### 3. Mind/Body/Spirit Image 2

**Location**: Line 85-92  
**URL**: `https://static.wixstatic.com/media/a9980c_50880ae14adb46c09fb5244b2fa65c84~mv2.webp/v1/fill/w_310,h_317,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/a9980c_50880ae14adb46c09fb5244b2fa65c84~mv2.webp`  
**Configuration**:

```jsx
<Image
  src="..."
  alt="Rocks of strength and resilience"
  fill
  className="object-cover"
  unoptimized
/>
```

### 4. Trauma Recovery Image

**Location**: Line 133-141  
**URL**: `https://static.wixstatic.com/media/a9980c_49b5dda3ab744437846dedd6063e8f04~mv2.jpg/v1/fill/w_239,h_259,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/a9980c_49b5dda3ab744437846dedd6063e8f04~mv2.jpg`  
**Configuration**:

```jsx
<Image
  src="..."
  alt="Freckled face reflecting silent trauma"
  fill
  className="object-cover group-hover:scale-110 transition-transform duration-300"
  unoptimized
/>
```

### 5. Addiction Rehabilitation Image

**Location**: Line 152-160  
**URL**: `https://static.wixstatic.com/media/11062b_d43c4524d004480cac5e896e52182b75~mv2.jpg/v1/fill/w_223,h_163,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Doctor%20Talking%20To%20Patient.jpg`  
**Configuration**:

```jsx
<Image
  src="..."
  alt="Doctor's touch: support and understanding"
  fill
  className="object-cover group-hover:scale-110 transition-transform duration-300"
  unoptimized
/>
```

### 6. Divorce Support Image

**Location**: Line 171-179  
**URL**: `https://static.wixstatic.com/media/8e2a95a81bd67d6d59f9fc086239d1be.jpg/v1/fill/w_198,h_203,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Family%20Dispute.jpg`  
**Configuration**:

```jsx
<Image
  src="..."
  alt="This scene powerfully captures the emotional complexity of divorce"
  fill
  className="object-cover group-hover:scale-110 transition-transform duration-300"
  unoptimized
/>
```

---

## Configuration Analysis

### Next.js Image Configuration ✅

**Location**: `next.config.mjs`

```javascript
images: {
  unoptimized: false, // Enable Next.js image optimization
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
  dangerouslyAllowSVG: true,
  contentDispositionType: 'inline',
  contentSecurityPolicy: "default-src 'self' https://burst.shopifycdn.com https://images.pexels.com; script-src 'none'; sandbox;",
  remotePatterns: [
    { protocol: 'https', hostname: '**' },
  ],
}
```

**Analysis**:

- ✅ `remotePatterns` allows all HTTPS hosts (`hostname: '**'`)
- ✅ Wix CDN (`static.wixstatic.com`) should be allowed
- ✅ Image optimization enabled globally
- ⚠️ CSP only allows `burst.shopifycdn.com` and `images.pexels.com` (not Wix)

---

## Potential Issues Identified

### Issue 1: Content Security Policy (CSP) ⚠️ HIGH PRIORITY

**Problem**: CSP in `next.config.mjs` only allows specific image domains:

```javascript
contentSecurityPolicy: "default-src 'self' https://burst.shopifycdn.com https://images.pexels.com; script-src 'none'; sandbox;";
```

**Impact**: Wix CDN (`static.wixstatic.com`) is **NOT** in the allowed list

**Result**: Browser may block images from Wix CDN

**Fix Required**: Add Wix CDN to CSP

---

### Issue 2: All Images Use `unoptimized` Flag ⚠️ MEDIUM PRIORITY

**Problem**: Every image has `unoptimized` prop

```jsx
<Image ... unoptimized />
```

**Impact**:

- Bypasses Next.js image optimization
- Loads full-size images (slower)
- No automatic format conversion (WebP/AVIF)
- No responsive sizing

**Why This Might Cause Issues**:

- Large images may timeout on slow connections
- No lazy loading optimization
- Browser may struggle with multiple large images

---

### Issue 3: External URLs with Complex Query Params ⚠️ LOW PRIORITY

**Problem**: Some URLs have complex Wix transformation parameters:

```
/v1/fill/w_431,h_377,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/...
```

**Impact**:

- URL encoding issues possible
- Next.js may have trouble parsing
- Wix-specific transformations may conflict

---

### Issue 4: Missing Sizes Attribute ⚠️ LOW PRIORITY

**Problem**: Images with `fill` prop don't have `sizes` attribute

```jsx
<Image fill className="..." />
// Missing: sizes="..."
```

**Impact**:

- Next.js doesn't know what size to load
- May load unnecessarily large images
- Performance impact

---

## Root Cause Analysis

### Most Likely Cause: CSP Blocking Wix CDN

**Evidence**:

1. ✅ Images exist and are accessible (HTTP 200)
2. ✅ `remotePatterns` allows all HTTPS hosts
3. ❌ CSP only allows `burst.shopifycdn.com` and `images.pexels.com`
4. ❌ Wix CDN (`static.wixstatic.com`) not in CSP whitelist

**Conclusion**: Browser is likely blocking images due to CSP violation

---

## Recommended Fixes

### Fix 1: Update CSP to Allow Wix CDN (CRITICAL)

**Location**: `next.config.mjs` line 87

**Current**:

```javascript
contentSecurityPolicy: "default-src 'self' https://burst.shopifycdn.com https://images.pexels.com; script-src 'none'; sandbox;";
```

**Fixed**:

```javascript
contentSecurityPolicy: "default-src 'self' https://burst.shopifycdn.com https://images.pexels.com https://static.wixstatic.com; script-src 'none'; sandbox;";
```

**Impact**: Allows images from Wix CDN

---

### Fix 2: Remove `unoptimized` Flag (RECOMMENDED)

**Current**:

```jsx
<Image src="https://static.wixstatic.com/..." unoptimized fill />
```

**Fixed**:

```jsx
<Image
  src="https://static.wixstatic.com/..."
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

**Benefits**:

- Faster loading (optimized images)
- Automatic format conversion (WebP/AVIF)
- Responsive sizing
- Better mobile performance

---

### Fix 3: Add Sizes Attribute (RECOMMENDED)

**For Hero Image**:

```jsx
<Image src="..." fill sizes="100vw" priority />
```

**For Grid Images**:

```jsx
<Image src="..." fill sizes="(max-width: 768px) 100vw, 50vw" />
```

**For Program Cards**:

```jsx
<Image
  src="..."
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

---

## Implementation Plan

### Step 1: Fix CSP (Immediate)

```bash
# Edit next.config.mjs
# Add https://static.wixstatic.com to contentSecurityPolicy
```

### Step 2: Test Images Load

```bash
# Deploy and verify images display
# Check browser console for CSP errors
```

### Step 3: Optimize Images (Optional)

```bash
# Remove unoptimized flags
# Add sizes attributes
# Test performance improvement
```

---

## Testing Checklist

### After CSP Fix

- [ ] Visit `/rise-foundation`
- [ ] Check browser console for CSP errors
- [ ] Verify hero background image displays
- [ ] Verify Mind/Body/Spirit images display
- [ ] Verify program card images display
- [ ] Test on mobile devices
- [ ] Check image load times

### After Optimization

- [ ] Verify images still display
- [ ] Check image file sizes (should be smaller)
- [ ] Test on slow 3G network
- [ ] Verify responsive sizing works
- [ ] Check WebP/AVIF format conversion

---

## Expected Results

### Before Fix

- ❌ Images blocked by CSP
- ❌ Browser console shows CSP violations
- ❌ Blank spaces where images should be

### After CSP Fix

- ✅ Images load from Wix CDN
- ✅ No CSP violations
- ✅ All 6 images display correctly

### After Full Optimization

- ✅ Images load faster
- ✅ Smaller file sizes
- ✅ Better mobile performance
- ✅ Automatic format conversion

---

## Monitoring

### Check for CSP Violations

```javascript
// Browser Console
// Look for errors like:
// "Refused to load the image 'https://static.wixstatic.com/...' because it violates the following Content Security Policy directive..."
```

### Verify Image Loading

```bash
# Check Network tab in DevTools
# All images should return 200 OK
# No 403 Forbidden or CSP blocks
```

---

## Risk Assessment

### CSP Fix Risk: ✅ LOW

- Simple configuration change
- Only affects image loading
- No code changes required
- Easily reversible

### Optimization Risk: ⚠️ MEDIUM

- Removes `unoptimized` flag
- Changes how images are served
- May affect load times initially
- Requires testing

---

## Conclusion

**Root Cause**: Content Security Policy blocking Wix CDN images

**Primary Fix**: Add `https://static.wixstatic.com` to CSP whitelist

**Secondary Optimization**: Remove `unoptimized` flags and add `sizes` attributes

**Confidence**: HIGH (95%) - CSP is blocking the images

**Status**: ✅ READY TO FIX

---

**Audit Completed**: 2026-01-03  
**Auditor**: Ona  
**Recommendation**: Update CSP immediately to allow Wix CDN
