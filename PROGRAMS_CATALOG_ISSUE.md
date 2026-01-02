# 🔍 Programs Catalog Issue - Analysis & Fix

**Issue:** `/programs-catalog` redirects to login page  
**Status:** ⚠️ IDENTIFIED  
**Severity:** Medium (affects user experience)

---

## 🎯 Root Cause

### The Problem

**Page:** `/programs-catalog`  
**Behavior:** HTTP 307 redirect to `/login?next=%2Fprograms-catalog`  
**Expected:** Should be publicly accessible

### Why It's Happening

The `/programs-catalog/page.tsx` file:

1. **Uses server-side Supabase client:**
   ```typescript
   import { createClient } from '@/lib/supabase/server';
   const supabase = await createClient();
   ```

2. **Fetches from database:**
   ```typescript
   const { data: dbPrograms, error } = await supabase
     .from('programs')
     .select('*')
     .eq('active', true)
     .order('name');
   ```

3. **Likely has middleware or RLS policy requiring authentication**

---

## 🔍 Related Issues

### Programs Page Links

The main `/programs` page has links to:
- ✅ `/programs` - Works (HTTP 200)
- ❌ `/programs-catalog` - Redirects to login (HTTP 307)
- ❌ `/program-finder` - Unknown status
- ❌ `/compare-programs` - Unknown status
- ✅ `/apprenticeships` - Works (HTTP 200)
- ❌ `/courses` - Unknown status
- ❌ `/pathways` - Unknown status
- ❌ `/credentials` - Unknown status
- ❌ `/certificates` - Unknown status

---

## ✅ Solutions

### Option 1: Make Page Public (Recommended)

**Change the page to not require authentication:**

```typescript
// app/programs-catalog/page.tsx

// Instead of server client that checks auth:
import { createClient } from '@/lib/supabase/server';

// Use browser client or make query public:
import { createClient } from '@supabase/supabase-js';

export default async function ProgramsCatalogPage() {
  // Create public client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  // This will work without authentication if RLS allows public read
  const { data: dbPrograms } = await supabase
    .from('programs')
    .select('*')
    .eq('active', true)
    .order('name');
    
  // ... rest of code
}
```

### Option 2: Update RLS Policies

**Ensure programs table allows public SELECT:**

```sql
-- In Supabase SQL Editor
CREATE POLICY "Public can view active programs"
ON programs
FOR SELECT
TO anon
USING (active = true);
```

### Option 3: Use Static Data

**Remove database dependency:**

```typescript
// app/programs-catalog/page.tsx
import { programs } from '@/app/data/programs';

export default function ProgramsCatalogPage() {
  // Use static data instead of database
  const allPrograms = programs;
  
  // ... rest of code
}
```

---

## 🚀 Quick Fix (Immediate)

### Redirect to Working Page

**Update the link in `/programs/page.tsx`:**

```typescript
// Change from:
{ label: 'Programs Catalog', href: '/programs-catalog' },

// To:
{ label: 'Programs Catalog', href: '/programs' },
// Or to a working catalog page
```

---

## 📊 Impact Analysis

### Current State

**Broken Links from `/programs` page:**
- Programs Catalog → Redirects to login
- Program Finder → Unknown (likely broken)
- Compare Programs → Unknown (likely broken)
- Courses → Unknown (likely broken)
- Pathways → Unknown (likely broken)
- Credentials → Unknown (likely broken)
- Certificates → Unknown (likely broken)

**Working Links:**
- Apprenticeships → Works
- Individual program pages → Work

### User Impact

**Medium:**
- Users can still browse individual programs
- Main `/programs` page works
- But catalog/finder features require login

---

## 🔧 Recommended Fix

### Step 1: Check RLS Policies

```sql
-- Check current policies on programs table
SELECT * FROM pg_policies WHERE tablename = 'programs';
```

### Step 2: Add Public Read Policy (if missing)

```sql
-- Allow public to read active programs
CREATE POLICY "Anyone can view active programs"
ON programs
FOR SELECT
TO public
USING (active = true);
```

### Step 3: Test

```bash
curl -I https://www.elevateforhumanity.org/programs-catalog
# Should return HTTP 200, not 307
```

---

## 🎯 Alternative: Create Public Catalog Page

If you want to keep the database version private, create a public version:

```typescript
// app/programs/catalog/page.tsx
import { programs } from '@/app/data/programs';

export default function PublicProgramsCatalog() {
  return (
    <div>
      <h1>Programs Catalog</h1>
      {programs.map(program => (
        <div key={program.slug}>
          <h2>{program.name}</h2>
          <p>{program.description}</p>
          <Link href={`/programs/${program.slug}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
```

Then update link:
```typescript
{ label: 'Programs Catalog', href: '/programs/catalog' },
```

---

## 📝 Summary

**Issue:** Programs catalog requires authentication  
**Cause:** Server-side Supabase client + RLS policies  
**Fix:** Either make RLS public or use static data  
**Priority:** Medium (workaround exists - individual program pages work)

---

## ✅ Action Items

1. **Immediate:** Update link to point to working page
2. **Short-term:** Fix RLS policies to allow public read
3. **Long-term:** Decide if catalog should be public or private

---

**Issue documented:** January 2, 2026  
**Status:** Identified, solutions provided  
**Next step:** Choose and implement solution
