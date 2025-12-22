# Application Submission Error - Diagnostic & Fix

## Error Message

```
Failed to save application. Please call 317-314-3757 for immediate assistance.
```

## Root Cause Analysis

### 1. Error Location

File: `/app/api/applications/route.ts`
Line: 88-93

```typescript
if (error) {
  console.error('Supabase insert error:', error);
  return NextResponse.json(
    {
      error:
        'Failed to save application. Please call 317-314-3757 for immediate assistance.',
    },
    { status: 500 }
  );
}
```

### 2. Likely Causes

#### A. Missing Environment Variable (MOST LIKELY)

The API uses `createAdminClient()` which requires:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

**Check in Vercel:**

1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Verify both variables are set for Production
3. Service role key should start with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

#### B. Database Table Missing

The `applications` table might not exist in production database.

**Migration file:** `supabase/migrations/20251204022427_create_applications_table.sql`

#### C. RLS Policy Issue

The table has RLS enabled, but the admin client should bypass it.

**Policy:** "Anyone can submit applications" - allows anon/authenticated inserts

### 3. Database Schema

```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  program_id TEXT,
  status TEXT DEFAULT 'pending',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Fix Steps

### Step 1: Verify Environment Variables in Vercel

1. **Go to Vercel Dashboard:**
   - https://vercel.com/[your-team]/[project-name]/settings/environment-variables

2. **Check these variables exist:**

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **If missing, add them:**
   - Get from Supabase Dashboard → Project Settings → API
   - Service role key is under "Project API keys" → "service_role" (secret)
   - **IMPORTANT:** Select "Production" environment when adding

4. **Redeploy after adding:**
   ```bash
   vercel --prod
   ```

### Step 2: Verify Database Table Exists

1. **Go to Supabase Dashboard:**
   - https://supabase.com/dashboard/project/[project-ref]/editor

2. **Check if `applications` table exists:**
   - Go to Table Editor
   - Look for "applications" table

3. **If missing, run migration:**

   ```sql
   -- Run this in SQL Editor
   -- Copy from: supabase/migrations/20251204022427_create_applications_table.sql

   CREATE TABLE IF NOT EXISTS applications (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     first_name TEXT NOT NULL,
     last_name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT,
     program_id TEXT,
     status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'contacted')),
     submitted_at TIMESTAMPTZ DEFAULT NOW(),
     notes TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Create indexes
   CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
   CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
   CREATE INDEX IF NOT EXISTS idx_applications_submitted_at ON applications(submitted_at DESC);

   -- Enable RLS
   ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

   -- RLS Policies
   CREATE POLICY "Admins can view all applications"
     ON applications FOR SELECT
     TO authenticated
     USING (
       EXISTS (
         SELECT 1 FROM profiles
         WHERE profiles.id = auth.uid()
         AND profiles.role IN ('admin', 'super_admin')
       )
     );

   CREATE POLICY "Anyone can submit applications"
     ON applications FOR INSERT
     TO anon, authenticated
     WITH CHECK (true);

   CREATE POLICY "Admins can update applications"
     ON applications FOR UPDATE
     TO authenticated
     USING (
       EXISTS (
         SELECT 1 FROM profiles
         WHERE profiles.id = auth.uid()
         AND profiles.role IN ('admin', 'super_admin')
       )
     );
   ```

### Step 3: Test the Fix

1. **Check Vercel logs:**

   ```bash
   vercel logs --prod
   ```

   Look for "Supabase insert error:" to see the actual error

2. **Test application submission:**
   - Go to https://www.elevateforhumanity.org/apply
   - Fill out form
   - Submit
   - Check if it works

3. **Verify in Supabase:**
   - Go to Table Editor → applications
   - Check if new row was inserted

### Step 4: Add Better Error Logging

Update `/app/api/applications/route.ts` to log more details:

```typescript
if (error) {
  console.error('Supabase insert error:', {
    error,
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint,
  });
  return NextResponse.json(
    {
      error:
        'Failed to save application. Please call 317-314-3757 for immediate assistance.',
    },
    { status: 500 }
  );
}
```

## Quick Verification Checklist

- [ ] `NEXT_PUBLIC_SUPABASE_URL` set in Vercel Production
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set in Vercel Production
- [ ] `applications` table exists in Supabase
- [ ] RLS policies are created
- [ ] Redeployed after adding env vars
- [ ] Tested application submission
- [ ] Checked Vercel logs for errors
- [ ] Verified data in Supabase table

## Alternative: Use Anon Key Instead

If service role key is not available, you can modify the API to use anon key (since RLS allows anon inserts):

```typescript
// Instead of createAdminClient()
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

This works because the RLS policy allows anon inserts:

```sql
CREATE POLICY "Anyone can submit applications"
  ON applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
```

## Contact Support

If issue persists after these steps:

1. Check Vercel logs: `vercel logs --prod`
2. Check Supabase logs: Dashboard → Logs
3. Call: 317-314-3757
4. Email: elevate4humanityedu@gmail.com

## Expected Behavior After Fix

1. User submits application form
2. API receives POST request
3. Validates required fields
4. Inserts into `applications` table
5. Sends confirmation email to applicant
6. Sends notification email to staff
7. Returns success with application ID
8. User sees success message with tracking link
