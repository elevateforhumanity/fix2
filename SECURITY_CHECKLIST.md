# Security Patch Checklist

## ✅ Completed by Script
- [x] Created `lib/withAuth.ts` - Authentication wrapper
- [x] Created `lib/validateRequest.ts` - Input validation
- [x] Created `lib/securityLogger.ts` - Security logging
- [x] Created RLS policies migration
- [x] Fixed auth cookie handlers
- [x] Created example secure route

## 🔧 Manual Steps Required

### 1. Update All Admin API Routes
Replace unsecured routes with the new pattern:

**Before:**
```typescript
export async function GET(req: NextRequest) {
  // No auth check
}
```

**After:**
```typescript
import { withAuth } from '@/lib/withAuth';

export const GET = withAuth(
  async (req, context, user) => {
    // Handler code
  },
  { roles: ['admin'] }
);
```

**Files to update:**
- [ ] `app/api/admin/applications/[id]/route.ts`
- [ ] All other `app/api/admin/**/route.ts` files

### 2. Add Input Validation to Public Endpoints
Update `app/api/applications/route.ts`:

```typescript
import { validateRequest, applicationSchema } from '@/lib/validateRequest';

export async function POST(req: Request) {
  const { data, error } = await validateRequest(req, applicationSchema);
  if (error) return error;
  
  // Use validated data
  const { full_name, email, phone, program_interest, referral_source } = data;
  // ... rest of code
}
```

### 3. Apply RLS Migration
```bash
# If using Supabase CLI
supabase db push

# Or apply manually in Supabase dashboard
# SQL Editor → Run the migration file
```

### 4. Set Up Redis (Required for Production)
Add to `.env`:
```
REDIS_URL=your-redis-url
REDIS_TOKEN=your-redis-token
```

Get Redis from: https://upstash.com (free tier available)

### 5. Update Middleware for Redis Rate Limiting
See `SECURITY_AUDIT_REPORT.md` section on rate limiting.

### 6. Test All Changes
```bash
# Run tests
pnpm test

# Check TypeScript
pnpm typecheck

# Test authentication
# 1. Try accessing /api/admin/applications-secure/1 without auth (should fail)
# 2. Login as admin and try again (should work)
# 3. Login as student and try (should fail)
```

### 7. Deploy
```bash
git add .
git commit -m "security: apply critical security patches

- Add authentication wrapper for API routes
- Implement input validation
- Add RLS policies for applications
- Fix auth cookie handlers
- Add security logging

Addresses critical issues from security audit"

git push origin main
```

## 📊 Verification

After deployment, verify:
- [ ] Admin routes require authentication
- [ ] Non-admin users cannot access admin endpoints
- [ ] Application submissions validate input
- [ ] RLS policies are active in database
- [ ] Auth cookies work correctly
- [ ] No console errors

## 🚨 If Issues Occur

1. Check Vercel logs for errors
2. Verify environment variables are set
3. Test locally first: `pnpm dev`
4. Rollback if needed: `git revert HEAD`

## 📞 Support

If you encounter issues:
- Review `SECURITY_AUDIT_REPORT.md`
- Check code annotations in IDE
- Contact: Elevate4humanityedu@gmail.com
