# Mobile Cache & Hero Banner Fix

## Root Cause Analysis

Based on Vercel edge cache behavior and mobile Safari specifics:

1. **Vercel Edge Cache Serving Stale HTML**: Mobile browsers hitting `x-vercel-cache: HIT/STALE` with old deployment artifacts
2. **Hero Hidden Until Hydration**: `isLoaded` state starts false, hiding hero until JS loads - mobile blockers/slow JS = no hero
3. **iOS Safari Viewport Collapse**: Fixed pixel heights + `100vh` causing hero to collapse when address bar expands/contracts
4. **Deployment-Coupled Resources**: Images via `/_next/image?...&dpl=...` tied to specific deployments - stale HTML = broken references

## Targeted Fixes Implemented

### 1. Stop Vercel Edge from Serving Stale HTML (`/next.config.mjs`)

**Problem**: Mobile hitting `x-vercel-cache: HIT` with old HTML
**Fix**: Vercel-specific cache headers for homepage

```javascript
{
  source: '/',
  headers: [
    { key: 'Cache-Control', value: 's-maxage=0, stale-while-revalidate=0' },
    { key: 'CDN-Cache-Control', value: 'no-store' },
    { key: 'Vercel-CDN-Cache-Control', value: 'no-store' },
  ],
}
```

- `s-maxage=0` - No edge caching
- `CDN-Cache-Control: no-store` - Vercel-specific bypass
- Keeps static assets cached for performance

### 2. Hero Visible by Default (`/components/home/VideoHeroBanner.tsx`)

**Problem**: Hero hidden until `isLoaded` state becomes true - mobile JS blockers/slow network = no hero
**Fix**: Progressive enhancement - hero visible immediately

```javascript
const [isLoaded, setIsLoaded] = useState(true); // Start true
```

- Hero renders immediately with fallback background
- Video enhances progressively when loaded
- No "hide until hydrated" pattern

### 3. iOS Safari Viewport Fix (`/components/home/VideoHeroBanner.tsx`)

**Problem**: `100vh` includes address bar, causing collapse on scroll
**Fix**: Inline styles with `100svh` fallback

```javascript
style={{
  height: '100vh',      // Fallback for older browsers
  height: '100svh',     // Small viewport height (excludes address bar)
  maxHeight: '900px',   // Prevent excessive height on tablets
}}
```

- `100svh` excludes Safari address bar
- Prevents hero collapse on scroll
- Maintains consistent height

### 4. Force Dynamic Rendering (`/app/page.tsx`)

**Problem**: Static generation can serve stale content
**Fix**: Force dynamic rendering for homepage

```javascript
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
```

- Ensures fresh HTML on every request
- No ISR/SSG caching

### 5. Service Worker Network-First (`/public/service-worker.js`)

**Problem**: Old service worker caching HTML pages
**Fix**: Network-first strategy for HTML, cache for assets

- HTML pages: Always fetch from network
- Static assets: Cache-first for performance
- Auto-delete old caches on activation

### 6. Cache Diagnostic Page (`/app/cache-diagnostic/page.tsx`)

**New**: Diagnostic page to verify cache behavior

- Shows server timestamp and build ID
- Instructions for checking response headers
- Visit: `/cache-diagnostic`

## Testing Instructions

### Step 1: Verify Cache Headers (Critical)

1. **Mobile Safari** (with Mac):
   - Connect iPhone to Mac
   - Safari → Develop → [Your iPhone] → elevateforhumanity.org
   - Reload page
   - Click document request in Network tab
   - **Check these headers**:
     - `x-vercel-cache`: Should be **MISS** or **BYPASS** (not HIT/STALE)
     - `age`: Should be **0** or absent
     - `cache-control`: Should show `s-maxage=0`
     - `x-vercel-id`: Note the deployment ID

2. **Mobile Chrome DevTools**:
   - chrome://inspect on desktop
   - Connect phone via USB
   - Inspect → Network → Reload
   - Check same headers as above

3. **Diagnostic Page**:
   - Visit: https://www.elevateforhumanity.org/cache-diagnostic
   - Should show current timestamp (not stale)
   - Check response headers match above

### Step 2: Verify Hero Visibility

1. **Immediate Visibility Test**:
   - Open site on mobile
   - Hero should be visible **immediately** (no flash/delay)
   - Background image should show even if video fails

2. **Scroll Test** (iOS Safari):
   - Scroll down (address bar hides)
   - Scroll up (address bar shows)
   - Hero height should remain consistent
   - No collapse or clipping

3. **Slow Network Test**:
   - Chrome DevTools → Network → Slow 3G
   - Reload page
   - Hero should still be visible (not hidden waiting for JS)

### Step 3: Clear Old Caches (If Issues Persist)

1. **Mobile Safari**: Settings → Safari → Clear History and Website Data
2. **Mobile Chrome**: Settings → Privacy → Clear Browsing Data
3. **Service Worker**: Visit site → DevTools → Application → Service Workers → Unregister

## Technical Details

### Why Vercel-Specific Cache Headers?

- `s-maxage=0` - Tells Vercel edge to not cache HTML
- `CDN-Cache-Control` - Vercel-specific header for edge behavior
- `Vercel-CDN-Cache-Control` - Additional Vercel bypass
- Browser cache still works (client-side caching OK)
- Static assets (`/_next/static/*`) still cached for performance

### Why Hero Visible by Default?

- **Problem**: `useState(false)` + conditional render = hidden until hydration
- **Mobile impact**: Slow JS/blockers = hero never appears
- **Fix**: Render hero immediately, enhance progressively
- **Pattern**: Visible → Enhanced (not Hidden → Visible)

### Why 100svh instead of 100vh?

- Mobile Safari address bar: 50-100px height
- `100vh` = viewport + address bar = content clipped
- `100svh` = small viewport (excludes address bar)
- Consistent height regardless of scroll position
- Fallback to `100vh` for older browsers

### Why dpl= Parameter Matters?

- Next.js images: `/_next/image?url=...&dpl=abc123`
- `dpl` = deployment ID
- Stale HTML references old deployment ID
- New deployment = different ID = 404 or wrong image
- Fix: Prevent stale HTML via cache headers

## Diagnostic Checklist

If hero still disappears on mobile:

### 1. Check Vercel Cache Headers

```bash
curl -I https://www.elevateforhumanity.org
```

Look for:

- `x-vercel-cache: MISS` or `BYPASS` ✅
- `x-vercel-cache: HIT` or `STALE` ❌ (still cached)

### 2. Check Hero Element in DevTools

When hero disappears:

- Inspect hero container
- Check computed styles:
  - `height: 0` ❌ (viewport issue)
  - `opacity: 0` ❌ (animation issue)
  - `display: none` ❌ (JS hiding it)
  - `height: 500px+` ✅ (should be visible)

### 3. Check Console Errors

- Video load errors?
- Hydration mismatches?
- Service worker errors?

### 4. Check Network Tab

- Is video loading?
- Are images 404ing?
- Check `dpl=` parameter in image URLs

## Monitoring Post-Deployment

1. **Vercel Analytics**: Mobile bounce rate should decrease
2. **Cache Headers**: Spot-check `/cache-diagnostic` on mobile
3. **User Reports**: Hero visibility on first load
4. **Performance**: LCP should improve (hero visible immediately)

## Related Files

- `/public/service-worker.js` - Service worker with network-first strategy
- `/components/home/VideoHeroBanner.tsx` - Hero banner with viewport units
- `/components/ServiceWorkerCleanup.tsx` - Automatic cleanup on page load
- `/app/globals.css` - Mobile viewport fixes
- `/next.config.mjs` - Cache headers
- `/public/manifest.json` - PWA configuration
- `/app/layout.tsx` - Meta tags and service worker integration
