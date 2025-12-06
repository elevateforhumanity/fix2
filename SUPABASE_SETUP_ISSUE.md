# Supabase "Not Found" Issue - Diagnosis & Fix

**Issue:** Supabase is not being found/connected  
**Status:** Configuration exists but using placeholder values  
**Solution:** Need real Supabase credentials

---

## 🔍 Diagnosis

### Current Configuration ✅

Your Supabase setup is **correctly configured** in the code:

**Files Found:**
- ✅ `lib/supabase/client.ts` - Browser client
- ✅ `lib/supabase/server.ts` - Server client
- ✅ Both using `@supabase/ssr` (correct)
- ✅ Environment variables properly referenced

**Current Environment Variables:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key
SUPABASE_SERVICE_ROLE_KEY=placeholder-service-role-key
```

### The Problem ❌

**You're using placeholder values!**

The code is looking for Supabase at:
- `https://placeholder.supabase.co` ← This doesn't exist!
- With key: `placeholder-anon-key` ← This is fake!

That's why Supabase is "not found" - you haven't created a real Supabase project yet.

---

## ✅ Solution: Create Real Supabase Project

### Step 1: Create Supabase Account (2 minutes)

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email
4. Verify your email

### Step 2: Create New Project (3 minutes)

1. Click "New Project"
2. Fill in:
   - **Name:** elevate-for-humanity
   - **Database Password:** (generate strong password - save it!)
   - **Region:** Choose closest to you (e.g., US East)
   - **Pricing Plan:** Free (for now)
3. Click "Create new project"
4. **Wait 2-3 minutes** for project to provision

### Step 3: Get Your Credentials (1 minute)

1. Once project is ready, go to **Settings** (gear icon)
2. Click **API** in sidebar
3. You'll see:

```
Project URL
https://abcdefghijklmnop.supabase.co
                    ↑
            Copy this entire URL

Project API keys
anon/public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
             ↑
     Copy this entire key (it's very long)

service_role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
              ↑
      Copy this entire key (also very long)
```

### Step 4: Update Your .env.local (1 minute)

Replace the placeholder values in `.env.local`:

**Before:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key
SUPABASE_SERVICE_ROLE_KEY=placeholder-service-role-key
```

**After:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_ACTUAL_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTU4NzIwMCwiZXhwIjoxOTU1MTYzMjAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM5NTg3MjAwLCJleHAiOjE5NTUxNjMyMDB9.yyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

### Step 5: Test Connection (1 minute)

Create a test file:

```typescript
// test-supabase-connection.ts
import { createClient } from '@/lib/supabase/server';

async function testConnection() {
  const supabase = await createClient();
  
  // Try to query (will fail if no tables, but connection will work)
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .limit(1);
  
  if (error) {
    console.log('❌ Error:', error.message);
    if (error.message.includes('relation') || error.message.includes('does not exist')) {
      console.log('✅ Connection works! (Just need to run migrations)');
    }
  } else {
    console.log('✅ Connection successful!');
    console.log('Data:', data);
  }
}

testConnection();
```

Run it:
```bash
npx tsx test-supabase-connection.ts
```

---

## 🔧 For Vercel Deployment

When deploying to Vercel, you need to add the same environment variables there:

### Option 1: Via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** > **Environment Variables**
4. Add these three variables:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://YOUR_ACTUAL_PROJECT.supabase.co
Environment: Production, Preview, Development

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environment: Production, Preview, Development

Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environment: Production, Preview, Development
```

5. Click "Save"
6. Redeploy your project

### Option 2: Via Vercel CLI

```bash
# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste your URL when prompted

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste your anon key when prompted

vercel env add SUPABASE_SERVICE_ROLE_KEY production
# Paste your service role key when prompted

# Redeploy
vercel --prod
```

---

## 🗄️ After Getting Credentials

Once you have real Supabase credentials, you need to:

### 1. Run Database Migrations (10 minutes)

Go to Supabase Dashboard > SQL Editor and run:

```sql
-- Run this first
-- File: supabase-schema.sql
-- (Copy and paste the entire file)
```

Then run:
```sql
-- Run this second
-- File: WORKING_SEED.sql
-- (Copy and paste the entire file)
```

### 2. Verify Tables Created

Run this query:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see tables like:
- programs
- courses
- enrollments
- users
- etc.

---

## 🧪 Testing After Setup

### Test 1: Local Development
```bash
# Start dev server
pnpm dev

# Visit these pages:
http://localhost:3000
http://localhost:3000/programs
http://localhost:3000/lms/courses
```

### Test 2: Database Connection
```bash
# Create test file
cat > test-db.ts << 'EOF'
import { createClient } from '@/lib/supabase/server';

async function test() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('programs').select('*').limit(3);
  console.log('Programs:', data);
  console.log('Error:', error);
}

test();
EOF

# Run test
npx tsx test-db.ts
```

---

## 🔍 Common Issues

### Issue 1: "Invalid API key"
**Cause:** Wrong anon key or service role key  
**Fix:** Double-check you copied the entire key (they're very long!)

### Issue 2: "Project not found"
**Cause:** Wrong project URL  
**Fix:** Make sure URL matches exactly: `https://YOUR_PROJECT.supabase.co`

### Issue 3: "relation does not exist"
**Cause:** Migrations not run  
**Fix:** Run migrations in Supabase SQL Editor

### Issue 4: "Connection timeout"
**Cause:** Supabase project paused (free tier)  
**Fix:** Visit Supabase dashboard to wake it up

---

## 📋 Quick Checklist

- [ ] Created Supabase account
- [ ] Created new project
- [ ] Waited for project to provision (2-3 min)
- [ ] Copied Project URL
- [ ] Copied anon/public key
- [ ] Copied service_role key
- [ ] Updated .env.local with real values
- [ ] Ran migrations in Supabase SQL Editor
- [ ] Tested connection locally
- [ ] Added env vars to Vercel (if deploying)
- [ ] Redeployed to Vercel

---

## 🎯 Summary

**Why Supabase is "not found":**
- You're using placeholder values
- No real Supabase project exists yet

**How to fix:**
1. Create Supabase account (2 min)
2. Create project (3 min)
3. Copy credentials (1 min)
4. Update .env.local (1 min)
5. Run migrations (10 min)

**Total time:** 15-20 minutes

**Then:** Everything will work! 🎉

---

## 🆘 Still Having Issues?

### Check These:

1. **Environment variables loaded?**
   ```bash
   # In your code, add this temporarily:
   console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
   ```

2. **Correct file?**
   - Make sure you're editing `.env.local` (not `.env.example`)

3. **Server restarted?**
   - After changing .env.local, restart dev server:
   ```bash
   # Stop server (Ctrl+C)
   pnpm dev  # Start again
   ```

4. **Keys complete?**
   - Supabase keys are 200+ characters long
   - Make sure you copied the entire key

---

**Next Step:** Create your Supabase account at https://supabase.com

---

**Last Updated:** December 6, 2024
