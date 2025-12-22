# 🚀 RUN THIS NOW - Simple Launch Steps

## Step 1: Run the SQL Migration (5 minutes)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the ENTIRE contents of this file:
   ```
   supabase/migrations/20241219_security_lockdown.sql
   ```
6. Paste into the SQL editor
7. Click **Run** (or press Cmd/Ctrl + Enter)

**Expected output:**

```
✅ Security lockdown complete
✅ RLS enabled on all tables
✅ Public catalog access configured
✅ Student-owned data policies active
✅ Course completion tracking table created

🔒 Database is now launch-ready
```

---

## Step 2: Test It Works (2 minutes)

**In your terminal** (not in Supabase):

```bash
# Make sure you have environment variables set
# Check .env.local has:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY

# Run the test
node scripts/test-application-flow.mjs
```

**Expected output:**

```
✅ PASSED: Application inserted successfully
✅ PASSED: Anonymous users cannot read applications (secure)
✅ PASSED: Programs catalog is publicly readable
✅ All tests passed!
```

---

## Step 3: Deploy (1 minute)

```bash
# Deploy to Vercel
vercel --prod

# Or push to trigger auto-deploy
git push origin main
```

---

## Common Errors

### Error: "syntax error at or near 'scripts'"

**Problem:** You're trying to run JavaScript in SQL editor  
**Fix:** Only run the `.sql` file in Supabase. Run `.mjs` files in your terminal.

### Error: "NEXT_PUBLIC_SUPABASE_URL not set"

**Problem:** Missing environment variables  
**Fix:** Create `.env.local` with your Supabase credentials

### Error: "Failed to insert application"

**Problem:** RLS policies not applied correctly  
**Fix:** Re-run the migration, check for errors in output

---

## What Each File Does

| File                                                 | Where to Run        | What It Does        |
| ---------------------------------------------------- | ------------------- | ------------------- |
| `supabase/migrations/20241219_security_lockdown.sql` | Supabase SQL Editor | Locks down database |
| `scripts/test-application-flow.mjs`                  | Your terminal       | Tests if it works   |
| `scripts/verify-security-lockdown.mjs`               | Your terminal       | Checks security     |

---

## That's It

Three steps:

1. Run SQL in Supabase
2. Test in terminal
3. Deploy

**Total time: 8 minutes**

Then you're live.
