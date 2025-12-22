# Application Submission Error - Complete Fix Guide

## Problem

Users getting error: "Failed to save application. Please call 317-314-3757 for immediate assistance."

## Root Cause

The application form (`QuickApplyFormClient.tsx`) calls `/api/applications` which uses `createAdminClient()` to insert into Supabase. The error occurs when:

1. Environment variables are missing or incorrect in Vercel
2. The Supabase service role key is not set
3. The applications table doesn't exist or has wrong schema

## Files Involved

### 1. Application Form

- `/app/apply/QuickApplyFormClient.tsx` - Calls `/api/applications`
- `/app/apply/ApplyFormClient.tsx` - Calls `/api/inquiries` (different endpoint)

### 2. API Routes

- `/app/api/applications/route.ts` - Main application submission
- `/app/api/inquiries/route.ts` - Simple inquiry form

### 3. Supabase Client

- `/lib/supabase/admin.ts` - Creates admin client with service role key

### 4. Database

- `/supabase/migrations/20251204022427_create_applications_table.sql` - Table schema

## Fix Steps

### Step 1: Verify Vercel Environment Variables

**Go to Vercel Dashboard:**

```
https://vercel.com/[your-team]/[project]/settings/environment-variables
```

**Required Variables:**

```bash
# Public URL (should already be set)
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co

# Service Role Key (THIS IS THE CRITICAL ONE)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**How to Get Service Role Key:**

1. Go to Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Under "Project API keys" find "service_role" (secret)
5. Copy the full key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`)

**Add to Vercel:**

1. Click "Add New" in Environment Variables
2. Name: `SUPABASE_SERVICE_ROLE_KEY`
3. Value: Paste the service role key
4. Environment: Select "Production" (and Preview/Development if needed)
5. Click "Save"

**IMPORTANT:** After adding environment variables, you MUST redeploy:

```bash
# Trigger a new deployment
vercel --prod
```

Or push a commit to trigger automatic deployment.

### Step 2: Verify Database Table Exists

**Check in Supabase Dashboard:**

1. Go to https://supabase.com/dashboard/project/[project-ref]/editor
2. Look for "applications" table in the left sidebar
3. If missing, run the migration

**Run Migration (if table is missing):**

1. Go to SQL Editor in Supabase Dashboard
2. Copy and paste this SQL:

```sql
-- Create applications table
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

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

3. Click "Run" to execute

### Step 3: Check Vercel Logs for Actual Error

**View logs:**

```bash
vercel logs --prod
```

Or in Vercel Dashboard:

1. Go to your project
2. Click "Deployments"
3. Click on the latest deployment
4. Click "Functions" tab
5. Look for errors in the logs

**Look for these error messages:**

- "Supabase admin credentials not configured" → Missing env vars
- "Supabase insert error" → Database issue
- Specific Supabase error codes

### Step 4: Test the Fix

**Test application submission:**

1. Go to https://www.elevateforhumanity.org/apply
2. Fill out the form with test data:
   - First Name: Test
   - Last Name: User
   - Phone: 317-555-1234
   - Email: test@example.com
   - City: Indianapolis
   - ZIP: 46204
   - Program: Any program
   - Preferred Contact: Email
3. Submit
4. Should redirect to success page

**Verify in Supabase:**

1. Go to Table Editor → applications
2. Check if new row was inserted
3. Verify all fields are populated correctly

### Step 5: Monitor for Issues

**Check these after deployment:**

- [ ] Application form submits successfully
- [ ] User receives confirmation email
- [ ] Staff receives notification email
- [ ] Data appears in Supabase applications table
- [ ] No errors in Vercel logs

## Improved Error Logging

I've added better error logging to help diagnose issues:

**In `/lib/supabase/admin.ts`:**

- Now logs which credentials are missing
- Shows URL prefix for debugging

**In `/app/api/applications/route.ts` and `/app/api/inquiries/route.ts`:**

- Now logs full error details (code, message, details, hint)
- Shows debug info in development mode

**To see detailed errors:**

1. Check Vercel logs: `vercel logs --prod`
2. Look for "Supabase insert error:" entries
3. Check the error code and message

## Common Error Codes

| Error Code | Meaning                | Fix                                          |
| ---------- | ---------------------- | -------------------------------------------- |
| `PGRST301` | JWT expired            | Service role key is wrong/expired            |
| `42P01`    | Table doesn't exist    | Run migration to create table                |
| `23502`    | NOT NULL violation     | Missing required field                       |
| `23505`    | Unique violation       | Duplicate entry (shouldn't happen with UUID) |
| `42501`    | Insufficient privilege | RLS policy blocking insert                   |

## Alternative: Use Anon Key (Temporary Workaround)

If you can't get the service role key working immediately, you can temporarily use the anon key:

**Edit `/lib/supabase/admin.ts`:**

```typescript
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // TEMPORARY: Use anon key instead of service role
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error('Supabase credentials missing');
    throw new Error('Supabase credentials not configured');
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
```

**This works because:**

- The RLS policy allows anon inserts: `WITH CHECK (true)`
- Anon key is already public (in NEXT_PUBLIC_SUPABASE_ANON_KEY)

**BUT:** This is less secure for admin operations. Use service role key for production.

## Verification Checklist

- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set in Vercel
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel
- [ ] Service role key is correct (from Supabase Dashboard → Settings → API)
- [ ] Environment variables are set for "Production" environment
- [ ] Redeployed after adding environment variables
- [ ] `applications` table exists in Supabase
- [ ] RLS policies are created
- [ ] Tested application submission
- [ ] Checked Vercel logs for errors
- [ ] Verified data in Supabase table
- [ ] Confirmation email received
- [ ] Staff notification email received

## Quick Test Script

Create a test file to verify the API works:

```bash
# Test the API directly
curl -X POST https://www.elevateforhumanity.org/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "phone": "317-555-1234",
    "email": "test@example.com",
    "city": "Indianapolis",
    "zip": "46204",
    "program": "barber",
    "preferredContact": "email"
  }'
```

**Expected response:**

```json
{
  "ok": true,
  "id": "uuid-here",
  "email": "test@example.com",
  "program": "barber",
  "referenceNumber": "EFH-XXXXX"
}
```

**Error response:**

```json
{
  "error": "Failed to save application. Please call 317-314-3757 for immediate assistance."
}
```

## Contact for Help

If issue persists:

1. **Check Vercel logs first:** `vercel logs --prod`
2. **Check Supabase logs:** Dashboard → Logs → API
3. **Call:** 317-314-3757
4. **Email:** elevate4humanityedu@gmail.com

## Summary

**Most likely cause:** Missing `SUPABASE_SERVICE_ROLE_KEY` in Vercel environment variables.

**Quick fix:**

1. Get service role key from Supabase Dashboard
2. Add to Vercel environment variables
3. Redeploy
4. Test

**Verification:** Check Vercel logs and Supabase table after submission.
