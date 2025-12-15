# Authorization Diagnostic Report

## Common Authorization Issues

### 1. **Supabase Environment Variables**

Check `.env.local` has:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 2. **Login Flow Issues**

**Symptoms:**

- Can't login
- Redirects to login repeatedly
- "Unauthorized" errors

**Check:**

```sql
-- In Supabase SQL Editor
SELECT id, email, role, created_at
FROM profiles
WHERE email = 'your-email@example.com';
```

**Fix if user doesn't exist:**

```sql
-- Create profile for existing auth user
INSERT INTO profiles (id, email, role, full_name)
SELECT
  id,
  email,
  'student', -- or 'admin'
  email
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (id) DO NOTHING;
```

### 3. **Application Submission Issues**

**File:** `/app/api/enroll/route.ts`

**Issue:** Requires authentication for course enrollment but not for applications

**Flow:**

- **Authenticated users** → Direct enrollment
- **Non-authenticated users** → Create application record

**Test:**

```bash
# Test application submission (no auth required)
curl -X POST http://localhost:3000/api/enroll \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "555-1234",
    "programCode": "barber-apprenticeship"
  }'
```

### 4. **Student Dashboard Access**

**File:** `/app/student/dashboard/page.tsx`

**Check:**

```typescript
// Line ~23
const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  redirect('/login?next=/student/dashboard');
}
```

**Issue:** Requires valid session cookie

**Fix:**

1. Clear browser cookies
2. Login again
3. Check session in browser DevTools → Application → Cookies

### 5. **API Route Authorization**

**Files with auth checks:**

- `/app/api/student/log-hours/route.ts` - Requires auth
- `/app/api/enroll/route.ts` - Optional auth
- `/app/api/milady/auto-enroll/route.ts` - Requires auth

**Common Error:**

```json
{
  "error": "Unauthorized",
  "status": 401
}
```

**Fix:**
Check if session cookie is being sent:

```javascript
// In browser console
document.cookie;
// Should see: sb-<project>-auth-token
```

### 6. **RLS (Row Level Security) Issues**

**Check Supabase RLS policies:**

```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('profiles', 'enrollments', 'applications');

-- Check policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('profiles', 'enrollments', 'applications');
```

**Common Issue:** RLS enabled but no policies = no access

**Fix:**

```sql
-- Allow authenticated users to read their own profile
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Allow authenticated users to update their own profile
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- Allow anyone to insert applications
CREATE POLICY "Anyone can submit applications"
ON applications FOR INSERT
TO anon, authenticated
WITH CHECK (true);
```

### 7. **Session Expiration**

**Default:** Sessions expire after 1 hour

**Check:**

```sql
-- In Supabase Dashboard → Authentication → Settings
-- JWT expiry: 3600 seconds (1 hour)
```

**Extend session:**

```sql
-- In Supabase SQL Editor
UPDATE auth.config
SET value = '86400' -- 24 hours
WHERE parameter = 'jwt_expiry';
```

### 8. **CORS Issues**

**Symptom:** API calls fail from browser

**Check:** Browser console for CORS errors

**Fix:** Already configured in Next.js (no action needed)

## Quick Diagnostic Steps

### Step 1: Check if you can login

1. Go to `/login`
2. Enter credentials
3. Check browser console for errors

### Step 2: Check session

```javascript
// In browser console after login
fetch('/api/auth/session')
  .then((r) => r.json())
  .then(console.log);
```

### Step 3: Check database connection

```sql
-- In Supabase SQL Editor
SELECT COUNT(*) FROM profiles;
```

### Step 4: Check API routes

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test auth endpoint
curl http://localhost:3000/api/auth/session \
  -H "Cookie: sb-<project>-auth-token=<token>"
```

## Common Fixes

### Fix 1: Clear all auth state

```javascript
// In browser console
localStorage.clear();
sessionStorage.clear();
document.cookie.split(';').forEach((c) => {
  document.cookie = c
    .replace(/^ +/, '')
    .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
});
location.reload();
```

### Fix 2: Reset user password

```sql
-- In Supabase SQL Editor
-- This will send password reset email
SELECT auth.send_password_reset_email('user@example.com');
```

### Fix 3: Manually create session

```sql
-- In Supabase Dashboard → Authentication → Users
-- Click user → "Send magic link"
```

### Fix 4: Check Supabase service status

- Go to: https://status.supabase.com
- Check if there are any outages

## Environment-Specific Issues

### Development (localhost:3000)

- ✅ Should work with `.env.local`
- ✅ Cookies work on localhost

### Production (Vercel)

- ⚠️ Must set environment variables in Vercel dashboard
- ⚠️ Must use HTTPS (cookies won't work on HTTP)
- ⚠️ Check domain matches in Supabase settings

## Need More Help?

**Provide these details:**

1. Exact error message
2. Where it happens (login, dashboard, API call)
3. Browser console errors
4. Network tab showing failed requests
5. Are you logged in or logged out?

**Check these logs:**

- Browser DevTools → Console
- Browser DevTools → Network
- Vercel deployment logs (if production)
- Supabase logs (Dashboard → Logs)
