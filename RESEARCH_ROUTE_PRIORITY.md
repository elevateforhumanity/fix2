# Research Findings: Next.js App Router Route Priority

## Question
In Next.js App Router, if I have both `/app/programs/[slug]/page.tsx` (dynamic route) and `/app/programs/hvac-technician/page.tsx` (static route), which one takes priority when a user visits `/programs/hvac-technician`? Will the static route override the dynamic route?

## Answer: YES, Static Routes Take Priority

**The static route `/app/programs/hvac-technician/page.tsx` will ALWAYS take priority over the dynamic route `/app/programs/[slug]/page.tsx`.**

This is by design in Next.js App Router and is documented behavior.

---

## Evidence from Codebase Analysis

### Current Situation
The codebase has:
- **1 Dynamic Route**: `/app/programs/[slug]/page.tsx`
- **32 Static Routes**: Including:
  - `/app/programs/hvac-technician/page.tsx`
  - `/app/programs/barber/page.tsx`
  - `/app/programs/cna/page.tsx`
  - And 29 more...

### Test Results
Running the analysis script (`test-route-priority.mjs`) confirms:

```
✅ /programs/hvac-technician
   Matches: STATIC route (/programs/hvac-technician/page.tsx)

✅ /programs/barber
   Matches: STATIC route (/programs/barber/page.tsx)

✅ /programs/some-other-program
   Matches: DYNAMIC route (/programs/[slug]/page.tsx)
```

---

## Next.js Route Priority Order

According to Next.js documentation and behavior:

1. **Predefined/Static Routes** (highest priority)
   - Example: `/app/programs/hvac-technician/page.tsx`
   
2. **Dynamic Routes** (medium priority)
   - Example: `/app/programs/[slug]/page.tsx`
   
3. **Catch-all Routes** (lowest priority)
   - Example: `/app/programs/[...slug]/page.tsx`

---

## Why This Happens

Next.js uses a **file-system based router**. When a request comes in:

1. Next.js first checks for **exact matches** (static routes)
2. If no exact match is found, it checks **dynamic routes**
3. Finally, it checks **catch-all routes**

This ensures that:
- Specific routes always win over generic ones
- You can override dynamic behavior for specific cases
- The routing is predictable and deterministic

---

## The Problem in This Codebase

The user has:
- A **centralized dynamic system** at `/app/programs/[slug]/page.tsx` that should handle ALL programs
- **Old static folders** (hvac-technician, barber, cna, etc.) with their own `page.tsx` files
- These static routes are **intercepting** requests and preventing the dynamic route from handling them

This causes:
- ❌ Wrong pages loading (old static pages instead of new dynamic pages)
- ❌ Inconsistent behavior across different programs
- ❌ Maintenance nightmare (32 duplicate files to update)

---

## Solutions

### Option 1: Delete Static Routes (RECOMMENDED)

**Remove all static program folders and keep only the dynamic route.**

```bash
# Delete all static program folders
rm -rf app/programs/hvac-technician/
rm -rf app/programs/barber/
rm -rf app/programs/cna/
# ... delete all 32 static folders

# Keep only:
# - app/programs/[slug]/page.tsx
# - app/programs/page.tsx (programs listing)
# - app/programs/admin/ (if needed)
```

**Pros:**
- ✅ Clean, maintainable codebase
- ✅ Single source of truth
- ✅ All programs use the same template
- ✅ Easy to update and maintain

**Cons:**
- ⚠️ Need to ensure all program data is in the database/config
- ⚠️ Need to test all program pages after deletion

---

### Option 2: Redirect Static Routes to Dynamic Route

**Keep static folders but make them redirect to the dynamic route.**

Example for `/app/programs/hvac-technician/page.tsx`:

```typescript
import { redirect } from 'next/navigation';

export default function HvacTechnicianPage() {
  // Redirect to the dynamic route
  redirect('/programs/hvac-technician');
}
```

**Pros:**
- ✅ Preserves folder structure (if needed for other reasons)
- ✅ Forces all requests through the dynamic route
- ✅ Can be done incrementally

**Cons:**
- ❌ Extra redirect adds latency
- ❌ Still have 32 files to maintain
- ❌ Confusing for developers

---

### Option 3: Use Middleware to Rewrite

**Create middleware to rewrite static paths to the dynamic route.**

Example `middleware.ts`:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const staticProgramSlugs = [
  'hvac-technician',
  'barber',
  'cna',
  // ... all 32 slugs
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if this is a static program route
  const match = pathname.match(/^\/programs\/([^\/]+)$/);
  if (match && staticProgramSlugs.includes(match[1])) {
    // Rewrite to the dynamic route
    return NextResponse.rewrite(
      new URL(`/programs/${match[1]}`, request.url)
    );
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/programs/:path*',
};
```

**Pros:**
- ✅ Fine-grained control over routing
- ✅ Can handle complex routing logic

**Cons:**
- ❌ Most complex solution
- ❌ Still need to maintain the list of static slugs
- ❌ Middleware runs on every request (performance impact)

---

## Recommended Action

**Option 1 (Delete Static Routes)** is the best solution because:

1. **Simplicity**: One dynamic route handles everything
2. **Maintainability**: Single source of truth
3. **Performance**: No redirects or middleware overhead
4. **Clarity**: Clear routing behavior for developers

### Implementation Steps:

1. **Backup**: Ensure all program data is in `config/programs.json` or database
2. **Verify**: Test that `/programs/[slug]/page.tsx` works for all programs
3. **Delete**: Remove all 32 static program folders
4. **Test**: Verify all program pages load correctly
5. **Deploy**: Push changes to production

---

## Code Examples

### Current Dynamic Route
`/app/programs/[slug]/page.tsx`:
```typescript
import { notFound } from "next/navigation";
import { getAllPrograms, getProgramBySlug } from "@/lib/programs";
import { ProgramHero } from "@/components/programs/ProgramHero";
import { ProgramDetails } from "@/components/programs/ProgramDetails";

type Params = { slug: string };

export function generateStaticParams() {
  const programs = getAllPrograms();
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const program = getProgramBySlug(params.slug);
  
  if (!program) {
    return {
      title: "Program Not Found"
    };
  }

  return {
    title: `${program.name} | Elevate for Humanity`,
    description: program.shortTagline
  };
}

export default function ProgramDetailPage({ params }: { params: Params }) {
  const program = getProgramBySlug(params.slug);

  if (!program) {
    return notFound();
  }

  return (
    <main className="bg-slate-50">
      <ProgramHero program={program} />
      <ProgramDetails program={program} />
    </main>
  );
}
```

### Current Static Route (PROBLEMATIC)
`/app/programs/hvac-technician/page.tsx`:
```typescript
import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'HVAC Technician Training | Elevate For Humanity',
  description: '100% free training. Learn heating, ventilation, and air conditioning systems.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="HVAC Technician Training"
        description="100% free training..."
        // ... hardcoded content
      />
      {/* More hardcoded content */}
    </div>
  );
}
```

**Problem**: This static route intercepts `/programs/hvac-technician` and prevents the dynamic route from handling it.

---

## References

- **Next.js Documentation**: [Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- **Next.js Documentation**: [Defining Routes](https://nextjs.org/docs/app/building-your-application/routing/defining-routes)
- **Route Priority**: Static routes > Dynamic routes > Catch-all routes

---

## Conclusion

**YES, the static route `/app/programs/hvac-technician/page.tsx` WILL override the dynamic route `/app/programs/[slug]/page.tsx`.**

This is intentional Next.js behavior. To fix the issue:
1. Delete all static program folders
2. Keep only the dynamic route
3. Ensure all program data is in the centralized data source

This will give you a clean, maintainable, and consistent program system.
