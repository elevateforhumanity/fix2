# Production Security Fixes - Implementation Status

**Date:** December 17, 2024  
**Priority:** CRITICAL - Active Vercel deployment

---

## ✅ COMPLETED

### 1. Rate Limiting Utility

**File:** `lib/rate-limit.ts`  
**Status:** ✅ Already exists and working

Features:

- In-memory rate limiting (Vercel-safe)
- Client identifier extraction (x-forwarded-for)
- Preset limits for different endpoint types
- Rate limit headers support

### 2. Fixed `/api/contact`

**File:** `app/api/contact/route.ts`  
**Status:** ✅ Just fixed

Changes applied:

- ✅ Added rate limiting (5 req/min per IP)
- ✅ Added Zod validation
- ✅ Using `createAdminClient()` consistently
- ✅ Proper error handling
- ✅ Non-blocking email notifications
- ✅ Sanitized error messages

### 3. Fixed `/api/applications`

**File:** `app/api/applications/route.ts`  
**Status:** ✅ Fixed earlier today

Changes applied:

- ✅ Schema matches database
- ✅ Using `createAdminClient()`
- ✅ Proper field mapping

---

## 🔄 IN PROGRESS

### 4. Add Rate Limiting to Public Endpoints

**Need to add rate limiting to:**

#### High Priority (Public Forms)

- [ ] `/api/apply/route.ts` - Application form
- [ ] `/api/applications/route.ts` - Full application
- [ ] `/api/enroll/route.ts` - Enrollment

#### Medium Priority (Auth/Invites)

- [ ] `/api/org/invite/route.ts` - Organization invites
- [ ] `/api/auth/*` - Auth endpoints

#### Lower Priority (Search/Lookup)

- [ ] `/api/search/route.ts` - Search
- [ ] Any token-based lookup endpoints

---

## ⏳ TODO

### 5. Add Explicit Admin Role Checks

**Create:** `lib/auth/require-org-admin.ts`

```typescript
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@supabase/supabase-js';

function createAuthSupabaseFromRequest(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) throw new Error('Supabase env not configured');

  const authHeader = req.headers.get('authorization') || '';
  return createClient(url, anon, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });
}

export async function requireOrgAdmin(req: Request, orgId: string) {
  const supabaseAuth = createAuthSupabaseFromRequest(req);
  const { data: userRes, error: userErr } = await supabaseAuth.auth.getUser();

  if (userErr || !userRes?.user) {
    throw new Error('Unauthorized');
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('organization_users')
    .select('role')
    .eq('organization_id', orgId)
    .eq('user_id', userRes.user.id)
    .maybeSingle();

  if (error || !data) throw new Error('Forbidden');
  if (!['org_admin', 'super_admin'].includes(data.role)) {
    throw new Error('Forbidden');
  }

  return { userId: userRes.user.id, role: data.role };
}
```

**Admin APIs that need this check:**

- `/api/admin/applications/*`
- `/api/admin/next-steps/*`
- `/api/admin/analytics/*`
- `/api/admin/reports/*`
- `/api/admin/program-holders/*`
- `/api/org/invite/*`

### 6. Environment Variable Validation

**Create:** `lib/env.ts`

```typescript
import { z } from 'zod';

const EnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20).optional(),
  RESEND_API_KEY: z.string().min(10).optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

export const env = EnvSchema.parse(process.env);
```

### 7. Ban New @ts-nocheck

**Add to package.json:**

```json
{
  "scripts": {
    "lint:ts-nocheck": "bash -c '! grep -r \"@ts-nocheck\" app lib components --include=\"*.ts\" --include=\"*.tsx\"'",
    "build": "npm run lint:ts-nocheck && NODE_OPTIONS=--max-old-space-size=4096 next build"
  }
}
```

### 8. Replace Existing @ts-nocheck

**Found:** 300+ files with `@ts-nocheck`

**Strategy:**

1. Start with critical API routes (10-20 files)
2. Replace with targeted `@ts-expect-error` comments
3. Document what needs fixing
4. Gradually fix underlying issues

**Priority files to fix:**

- All `/api/admin/*` routes
- All `/api/org/*` routes
- Public form endpoints
- Auth-related routes

---

## Current Files Status

### `/api/contact/route.ts` ✅

```typescript
// FIXED - Now includes:
// - Rate limiting (5/min)
// - Zod validation
// - createAdminClient()
// - Proper error handling
```

### `/api/applications/route.ts` ✅

```typescript
// FIXED - Now includes:
// - Correct schema mapping
// - createAdminClient()
// - Field validation
```

### `/api/apply/route.ts` ⚠️

**Needs:**

- Rate limiting
- Zod validation
- Consistent error handling

**Current issues:**

- Uses different field names than `/api/applications`
- No rate limiting
- Creates Resend client at module scope

### `/api/enroll/route.ts` ⚠️

**Needs:**

- Rate limiting
- Remove `@ts-nocheck`
- Consistent Supabase client usage

---

## Implementation Plan

### Phase 1: Critical Security (Today)

1. ✅ Fix `/api/contact` - DONE
2. ✅ Fix `/api/applications` - DONE
3. ⏳ Add rate limiting to `/api/apply`
4. ⏳ Add rate limiting to `/api/enroll`
5. ⏳ Create `requireOrgAdmin()` helper
6. ⏳ Add admin checks to top 5 admin APIs

### Phase 2: Validation & Cleanup (This Week)

7. Create `lib/env.ts` validation
8. Add `lint:ts-nocheck` to build
9. Fix top 20 files with `@ts-nocheck`
10. Add rate limiting to remaining public endpoints

### Phase 3: Complete Hardening (Next Week)

11. Fix all remaining `@ts-nocheck` files
12. Add comprehensive input validation
13. Add audit logging to admin actions
14. Add honeypot to public forms
15. Consider Upstash Redis for distributed rate limiting

---

## Quick Wins (Do These First)

### 1. Add Rate Limiting to `/api/apply`

```typescript
// At top of file
import { rateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limit';

// In POST handler
const identifier = getClientIdentifier(req.headers);
const rl = rateLimit(`apply:${identifier}`, RATE_LIMITS.APPLICATION_FORM);
if (!rl.ok) {
  return NextResponse.json(
    { error: 'Too many requests. Try again in a minute.' },
    { status: 429 }
  );
}
```

### 2. Add Rate Limiting to `/api/applications`

Same pattern as above, use `RATE_LIMITS.APPLICATION_FORM`.

### 3. Create Admin Auth Helper

Copy the `requireOrgAdmin()` function above into `lib/auth/require-org-admin.ts`.

### 4. Add Admin Check to One Route (Test)

```typescript
// In any /api/admin/* route
import { requireOrgAdmin } from '@/lib/auth/require-org-admin';

export async function GET(req: Request) {
  try {
    // Get org ID from query or body
    const orgId = 'org-uuid-here';

    // This throws if not admin
    const { userId, role } = await requireOrgAdmin(req, orgId);

    // Continue with admin logic...
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.message === 'Unauthorized' ? 401 : 403 }
    );
  }
}
```

---

## Testing Checklist

After implementing fixes:

### Rate Limiting

- [ ] Submit contact form 6 times in 1 minute → Should get 429 on 6th
- [ ] Wait 1 minute → Should work again
- [ ] Check response headers for rate limit info

### Admin Auth

- [ ] Try accessing `/api/admin/*` without auth → 401
- [ ] Try accessing as regular user → 403
- [ ] Try accessing as org_admin → 200

### Validation

- [ ] Submit invalid email → 400 with field errors
- [ ] Submit missing required field → 400
- [ ] Submit valid data → 200

---

## Files to Review

**Need your input on these files:**

1. `app/api/apply/route.ts` - Current implementation
2. `app/api/enroll/route.ts` - Current implementation
3. List of admin APIs that need `requireOrgAdmin()`

**Please paste contents of:**

- `/api/apply/route.ts`
- `/api/enroll/route.ts`

So I can apply the same security patterns.

---

## Monitoring After Deployment

### Check These Metrics:

1. **429 responses** - Should see some (rate limiting working)
2. **401/403 responses** - Admin endpoints properly protected
3. **400 responses** - Validation catching bad input
4. **500 responses** - Should decrease (better error handling)

### Vercel Logs to Watch:

- Rate limit hits
- Failed admin auth attempts
- Validation errors
- Database errors

---

**Status:** 2/8 critical fixes complete  
**Next:** Add rate limiting to `/api/apply` and `/api/enroll`  
**Blocker:** Need current implementation of those files to apply fixes
