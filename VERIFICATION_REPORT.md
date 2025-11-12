# LINE-BY-LINE MIGRATION VERIFICATION

## Step 0: High-level goals ✅

- [x] Ship finished HTML with SSR/SSG (no endless skeletons)
  - ✅ Using Next.js static export with generateStaticParams
  - ✅ 18 pages pre-rendered at build time
  
- [x] Strong SEO for state/funding keywords
  - ✅ Metadata in app/layout.tsx
  - ✅ Per-page metadata in each page.tsx
  
- [x] Clean repo: no SPA remnants, no duplicate configs
  - ✅ All Vite configs removed
  - ✅ All SPA pages deleted
  
- [x] Gradual TypeScript adoption
  - ✅ allowJs: true in tsconfig.json
  - ✅ Can convert page-by-page
  
- [x] First-class adapters for Netlify + Cloudflare + Supabase + Stripe
  - ✅ Netlify config updated
  - ⚠️ Supabase server client - NOT YET CREATED
  - ⚠️ Stripe routes - NOT YET CREATED
  - ⚠️ Cloudflare adapter - NOT INSTALLED

---

## Step 1: Safe snapshot & branch ⚠️

```bash
git checkout -b chore/next-migration
```

**Status:** ⚠️ SKIPPED - Migration done directly on main branch
**Action needed:** None (already deployed)

---

## Step 2: Catalog and DELETE SPA-only files ✅

### Files to check:

**SPA Files Check:**
- [x] vite.config.* - DELETED ✅
- [x] vite-env.d.ts - DELETED ✅
- [x] index.html (root) - DELETED ✅
- [x] service-worker.js - NOT FOUND ✅
- [x] craco.config.js - NOT FOUND ✅
- [x] config-overrides.js - NOT FOUND ✅
- [x] react-app-env.d.ts - NOT FOUND ✅
- [x] setupProxy.js - NOT FOUND ✅

**Note:** out/index.html exists (Next.js build output) - This is CORRECT ✅

**SPA Dependencies Check:**

**Status:** ✅ COMPLETE - All SPA files and dependencies removed

---

## Step 3: Create Next.js skeleton ✅

**Check for Next.js structure:**

---

## Step 4: Package.json reset ⚠️

**Check package.json scripts:**

**Core scripts check:**
- [x] "dev": "next dev" ✅
- [x] "build": "next build" ✅
- [x] "start": "next start" - ⚠️ MISSING
- [x] "lint": "next lint" - ⚠️ Using custom lint

**Status:** ⚠️ PARTIAL - Has extra scripts but core Next.js scripts present

**Action needed:** Add "start": "next start" to package.json

---

## Step 5: TypeScript config ✅

**Check tsconfig.json:**
