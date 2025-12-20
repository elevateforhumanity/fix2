# Test Application Form Locally

## What I Found

**REAL TEST RESULTS:**

- ✅ Tested live site: https://www.elevateforhumanity.org/api/applications
- ❌ **CONFIRMED ERROR:** "Failed to save application. Please call 317-314-3757 for immediate assistance."
- ❌ **ALSO FAILING:** /api/inquiries endpoint returns "Failed to save inquiry"

**Both APIs are failing**, which means the Supabase connection is broken.

## To Test Locally

### Step 1: Get Environment Variables from Vercel

You said the variables ARE set in Vercel. To test locally, you need to copy them:

**Option A: Use Vercel CLI**

```bash
cd /workspaces/fix2
npm install -g vercel
vercel login
vercel env pull .env.local
```

**Option B: Manual Copy from Vercel Dashboard**

1. Go to: https://vercel.com/[your-team]/fix2/settings/environment-variables
2. Copy these values:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Paste into `.env.local` file

### Step 2: Fill in .env.local

Edit `/workspaces/fix2/.env.local`:

```bash
# From Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Local development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 3: Run Development Server

```bash
cd /workspaces/fix2
npm run dev
```

### Step 4: Test Application Form

**Open browser:**

```
http://localhost:3000/apply
```

**Or test API directly:**

```bash
curl -X POST http://localhost:3000/api/applications \
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

**Expected success response:**

```json
{
  "ok": true,
  "id": "uuid-here",
  "email": "test@example.com",
  "program": "barber",
  "referenceNumber": "EFH-XXXXX"
}
```

**If you get error, check console output for:**

- "Supabase admin credentials not configured" → Missing env vars
- "Supabase insert error" → Database issue with specific error code

### Step 5: Test Diagnostic Endpoint

Once deployed, test:

```bash
curl https://www.elevateforhumanity.org/api/test-supabase
```

This will show:

- Which environment variables are set
- If Supabase client can be created
- If database query works
- Specific error codes if failing

## What to Check in Vercel

Since you said variables ARE set, check:

### 1. Variable Names Are Exact

```
✅ NEXT_PUBLIC_SUPABASE_URL (not SUPABASE_URL)
✅ SUPABASE_SERVICE_ROLE_KEY (not SERVICE_ROLE_KEY)
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 2. Environment Selection

- Make sure variables are set for **Production** environment
- Not just Preview or Development

### 3. Values Are Complete

- Service role key should be LONG (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`)
- URL should be full: `https://[project-ref].supabase.co`
- No extra spaces or quotes

### 4. Redeployed After Adding

- Environment variables only take effect after redeployment
- Push a commit or manually redeploy in Vercel

## Possible Issues

### Issue 1: Wrong Supabase Project

- Check if the URL in Vercel matches your actual Supabase project
- Go to Supabase Dashboard → Settings → API
- Compare URL

### Issue 2: Service Role Key Expired/Regenerated

- If you regenerated the key in Supabase, update in Vercel
- Service role keys don't expire, but can be regenerated

### Issue 3: Table Doesn't Exist

- Check Supabase Dashboard → Table Editor
- Look for "applications" table
- If missing, run migration from `APPLICATION-SUBMISSION-FIX.md`

### Issue 4: RLS Policy Blocking

- Even with service role key, check RLS policies
- Service role SHOULD bypass RLS, but verify

### Issue 5: Supabase Project Paused

- Free tier projects pause after inactivity
- Go to Supabase Dashboard and check if project is active

## Next Steps

1. **Pull environment variables from Vercel** to test locally
2. **Run dev server** and test application form
3. **Check console logs** for specific error
4. **Test diagnostic endpoint** once deployed
5. **Compare Vercel env vars** with Supabase Dashboard values

## Quick Verification

Run this in Vercel Dashboard → Project → Settings → Environment Variables:

**Check these exist for Production:**

- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] SUPABASE_SERVICE_ROLE_KEY

**If any are missing, add them and redeploy.**

## Contact

If still failing after verification:

- Check Vercel function logs for actual error
- Check Supabase logs for failed requests
- Call: 317-314-3757
