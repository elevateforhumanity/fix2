# Next.js App Router - Route Priority Visual Guide

## Current File Structure

```
app/
└── programs/
    ├── [slug]/
    │   └── page.tsx          ← Dynamic route (handles ANY slug)
    ├── hvac-technician/
    │   └── page.tsx          ← Static route (handles ONLY hvac-technician)
    ├── barber/
    │   └── page.tsx          ← Static route (handles ONLY barber)
    ├── cna/
    │   └── page.tsx          ← Static route (handles ONLY cna)
    └── ... (29 more static folders)
```

---

## Route Matching Flow

### Request: `/programs/hvac-technician`

```
User visits: /programs/hvac-technician
                    ↓
        ┌───────────────────────┐
        │  Next.js Router       │
        └───────────────────────┘
                    ↓
        ┌───────────────────────┐
        │  Step 1: Check for    │
        │  EXACT MATCH          │
        │  (Static Routes)      │
        └───────────────────────┘
                    ↓
        ┌───────────────────────┐
        │  Found:               │
        │  /programs/           │
        │  hvac-technician/     │
        │  page.tsx             │
        └───────────────────────┘
                    ↓
        ┌───────────────────────┐
        │  ✅ MATCH!            │
        │  Render static route  │
        │  STOP SEARCHING       │
        └───────────────────────┘
                    ↓
        ┌───────────────────────┐
        │  Dynamic route        │
        │  [slug]/page.tsx      │
        │  is NEVER checked     │
        └───────────────────────┘
```

### Request: `/programs/some-other-program`

```
User visits: /programs/some-other-program
                    ↓
        ┌───────────────────────┐
        │  Next.js Router       │
        └───────────────────────┘
                    ↓
        ┌───────────────────────┐
        │  Step 1: Check for    │
        │  EXACT MATCH          │
        │  (Static Routes)      │
        └───────────────────────┘
                    ↓
        ┌───────────────────────┐
        │  No exact match for   │
        │  "some-other-program" │
        └───────────────────────┘
                    ↓
        ┌───────────────────────┐
        │  Step 2: Check for    │
        │  DYNAMIC MATCH        │
        │  (Dynamic Routes)     │
        └───────────────────────┘
                    ↓
        ┌───────────────────────┐
        │  Found:               │
        │  /programs/[slug]/    │
        │  page.tsx             │
        └───────────────────────┘
                    ↓
        ┌───────────────────────┐
        │  ✅ MATCH!            │
        │  slug = "some-other-  │
        │  program"             │
        │  Render dynamic route │
        └───────────────────────┘
```

---

## Priority Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  HIGHEST PRIORITY                                       │
│  ┌───────────────────────────────────────────────────┐ │
│  │  1. Static/Predefined Routes                      │ │
│  │     /programs/hvac-technician/page.tsx            │ │
│  │     /programs/barber/page.tsx                     │ │
│  │     /programs/cna/page.tsx                        │ │
│  └───────────────────────────────────────────────────┘ │
│                         ↓                               │
│  ┌───────────────────────────────────────────────────┐ │
│  │  2. Dynamic Routes                                │ │
│  │     /programs/[slug]/page.tsx                     │ │
│  └───────────────────────────────────────────────────┘ │
│                         ↓                               │
│  ┌───────────────────────────────────────────────────┐ │
│  │  3. Catch-all Routes                              │ │
│  │     /programs/[...slug]/page.tsx                  │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  LOWEST PRIORITY                                        │
└─────────────────────────────────────────────────────────┘
```

---

## Real-World Example

### Current Behavior (PROBLEMATIC)

```
┌──────────────────────────────────────────────────────────────┐
│  URL: /programs/hvac-technician                              │
├──────────────────────────────────────────────────────────────┤
│  Matches: /programs/hvac-technician/page.tsx (STATIC)        │
│  Result:  Old hardcoded page with outdated content           │
│  Problem: Dynamic route is never used!                       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  URL: /programs/barber                                       │
├──────────────────────────────────────────────────────────────┤
│  Matches: /programs/barber/page.tsx (STATIC)                 │
│  Result:  Old hardcoded page with outdated content           │
│  Problem: Dynamic route is never used!                       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  URL: /programs/dental-assistant                             │
├──────────────────────────────────────────────────────────────┤
│  Matches: /programs/dental-assistant/page.tsx (STATIC)       │
│  Result:  Old hardcoded page with outdated content           │
│  Problem: Dynamic route is never used!                       │
└──────────────────────────────────────────────────────────────┘
```

### After Deleting Static Routes (FIXED)

```
┌──────────────────────────────────────────────────────────────┐
│  URL: /programs/hvac-technician                              │
├──────────────────────────────────────────────────────────────┤
│  Matches: /programs/[slug]/page.tsx (DYNAMIC)                │
│  Result:  New dynamic page with data from database           │
│  Success: Consistent behavior across all programs!           │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  URL: /programs/barber                                       │
├──────────────────────────────────────────────────────────────┤
│  Matches: /programs/[slug]/page.tsx (DYNAMIC)                │
│  Result:  New dynamic page with data from database           │
│  Success: Consistent behavior across all programs!           │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  URL: /programs/dental-assistant                             │
├──────────────────────────────────────────────────────────────┤
│  Matches: /programs/[slug]/page.tsx (DYNAMIC)                │
│  Result:  New dynamic page with data from database           │
│  Success: Consistent behavior across all programs!           │
└──────────────────────────────────────────────────────────────┘
```

---

## Comparison Table

| Aspect | With Static Routes | Without Static Routes |
|--------|-------------------|----------------------|
| **Files to maintain** | 33 files (1 dynamic + 32 static) | 1 file (dynamic only) |
| **Consistency** | ❌ Inconsistent (32 different implementations) | ✅ Consistent (1 implementation) |
| **Updates** | ❌ Must update 32 files | ✅ Update 1 file |
| **Routing** | ❌ Static routes intercept requests | ✅ Dynamic route handles all |
| **Data source** | ❌ Hardcoded in each file | ✅ Centralized (database/config) |
| **Maintainability** | ❌ Nightmare | ✅ Easy |
| **Performance** | ⚠️ Same (both are static at build time) | ⚠️ Same |

---

## Decision Matrix

### Should I keep static routes?

```
┌─────────────────────────────────────────────────────────────┐
│  Do you need different layouts for different programs?      │
│  ├─ YES → Consider keeping static routes                    │
│  └─ NO  → Delete static routes ✅                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Do you need different functionality per program?           │
│  ├─ YES → Consider keeping static routes                    │
│  └─ NO  → Delete static routes ✅                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Is your program data in a centralized location?            │
│  ├─ YES → Delete static routes ✅                           │
│  └─ NO  → Centralize data first, then delete                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Do you want easy maintenance and updates?                  │
│  ├─ YES → Delete static routes ✅                           │
│  └─ NO  → Keep static routes (not recommended)              │
└─────────────────────────────────────────────────────────────┘
```

---

## Summary

### The Rule
**Static routes ALWAYS take priority over dynamic routes in Next.js App Router.**

### The Problem
32 static program folders are intercepting requests and preventing the dynamic route from working.

### The Solution
Delete all static program folders and use only the dynamic route for a clean, maintainable codebase.

### The Benefit
- ✅ Single source of truth
- ✅ Easy to maintain
- ✅ Consistent behavior
- ✅ Centralized data management
- ✅ Fewer files to manage
