# Add Missing Supabase Tokens to Vercel

**Date:** December 26, 2025  
**Status:** 1 token missing from Vercel

---

## Current Status

**Vercel has these Supabase variables:**
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`

**Missing from Vercel:**
- ❌ `SUPABASE_DB_URL` (Direct database connection string)

---

## Why SUPABASE_DB_URL is Needed

This variable is used by:
- `scripts/db/runMigrations.js` - To run database migrations
- `scripts/db/runSeeds.js` - To seed the database
- `scripts/db-setup.ts` - Database setup automation

**Without it:** Migration and seeding scripts will fail

---

## How to Get SUPABASE_DB_URL

### Step 1: Go to Supabase Dashboard
1. Visit: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
2. Click **Settings** (gear icon)
3. Click **Database**

### Step 2: Get Connection String
1. Scroll to **Connection string**
2. Select **URI** format
3. You'll see something like:
   ```
   postgresql://postgres.cuxzzpsyufcewtmicszk:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

### Step 3: Replace [YOUR-PASSWORD]
The connection string has `[YOUR-PASSWORD]` placeholder.

**To get your password:**
- If you saved it when creating the project, use that
- If you forgot it, you need to reset it:
  1. In Database settings, click **Reset database password**
  2. Copy the new password
  3. Replace `[YOUR-PASSWORD]` in the connection string

**Final format:**
```
postgresql://postgres.cuxzzpsyufcewtmicszk:YOUR_ACTUAL_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

---

## How to Add to Vercel

### Option 1: Via Vercel Dashboard (Easiest)

1. Go to: https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2/settings/environment-variables

2. Click **Add New**

3. Fill in:
   - **Name:** `SUPABASE_DB_URL`
   - **Value:** `postgresql://postgres.cuxzzpsyufcewtmicszk:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres`
   - **Environments:** Select all (Production, Preview, Development)

4. Click **Save**

5. Redeploy:
   - Go to Deployments tab
   - Click **...** on latest deployment
   - Click **Redeploy**

### Option 2: Via CLI (I can do this)

**Give me the database password and I'll add it automatically.**

Just paste the password here, and I'll run:
```bash
vercel env add SUPABASE_DB_URL production --token YOUR_TOKEN
```

---

## Security Note

**SUPABASE_DB_URL contains your database password.**

- ✅ Safe to add to Vercel (encrypted)
- ❌ Never commit to git
- ❌ Never expose in client-side code
- ✅ Only use in server-side scripts

---

## Verification

After adding, verify it's there:

```bash
vercel env ls --token YOUR_TOKEN | grep SUPABASE
```

Should show:
```
SUPABASE_DB_URL                            Encrypted
SUPABASE_SERVICE_ROLE_KEY                  Encrypted
NEXT_PUBLIC_SUPABASE_ANON_KEY              Encrypted
NEXT_PUBLIC_SUPABASE_URL                   Encrypted
```

---

## Alternative: Use Service Role Key Instead

**If you don't want to add SUPABASE_DB_URL:**

The migration scripts can be updated to use the service role key instead of direct database connection.

**Pros:**
- No need for database password
- More secure (uses API, not direct DB access)

**Cons:**
- Requires updating migration scripts
- Slightly slower than direct connection

**Let me know if you want me to update the scripts to use service role key instead.**

---

## What to Do

**Choose one:**

1. **Give me the database password** → I'll add SUPABASE_DB_URL to Vercel
2. **Add it yourself** → Follow Option 1 above
3. **Skip it** → I'll update scripts to use service role key instead

**Which do you prefer?**
