# 🔍 DATABASE CONNECTION DIAGNOSIS

**Date:** December 8, 2024  
**Status:** ⚠️ Database credentials NOT configured in local environment

---

## ✅ WHAT WE FOUND

### 1. **Supabase Project EXISTS** ✅
- **Project ID:** `cuxzzpsyufcewtmicszk`
- **Project URL:** `https://cuxzzpsyufcewtmicszk.supabase.co`
- **Status:** Project is LIVE and responding
- **Test Result:** Returns "No API key found" (expected - means project exists)

### 2. **Vercel Project EXISTS** ✅
- **Project ID:** `prj_S1qaRjgCpbvMkUuV2gob3ACLn8YO`
- **Team ID:** `team_Ae8f33vVYR36quLOS8HCeROs`
- **Project Name:** `fix2-gpql`
- **Status:** Deployed to Vercel

### 3. **Local Environment** ❌
- **No .env file** - Not created
- **No .env.local file** - Not created
- **No environment variables set** - Empty
- **Cannot connect to database** - Missing credentials

---

## 🔑 WHAT YOU NEED

To connect to your database, you need **3 critical values** from Supabase:

### Required Credentials:
1. **NEXT_PUBLIC_SUPABASE_URL** - Already known: `https://cuxzzpsyufcewtmicszk.supabase.co`
2. **NEXT_PUBLIC_SUPABASE_ANON_KEY** - Need to retrieve from Supabase
3. **SUPABASE_SERVICE_ROLE_KEY** - Need to retrieve from Supabase

---

## 📋 HOW TO GET YOUR CREDENTIALS

### Option 1: Via Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard:**
   ```
   https://app.supabase.com/project/cuxzzpsyufcewtmicszk
   ```

2. **Navigate to Settings:**
   - Click "Settings" in left sidebar
   - Click "API" section

3. **Copy Your Keys:**
   - **Project URL:** Already shown (copy it)
   - **anon public key:** Copy the long string
   - **service_role key:** Copy the long string (keep this SECRET!)

4. **Create .env.local file:**
   ```bash
   cd /workspaces/fix2
   nano .env.local
   ```

5. **Paste these values:**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

6. **Save and test:**
   ```bash
   node test-supabase-connection.mjs
   ```

### Option 2: Via Vercel Dashboard

If credentials are already set in Vercel:

1. **Go to Vercel Dashboard:**
   ```
   https://vercel.com/team_Ae8f33vVYR36quLOS8HCeROs/fix2-gpql/settings/environment-variables
   ```

2. **Copy the values** for:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

3. **Create .env.local** with those values (see Option 1, step 4-6)

### Option 3: Ask Project Owner

If you don't have access to Supabase or Vercel dashboards:

1. **Contact the person who set up the project**
2. **Ask them to send you:**
   - Supabase anon key
   - Supabase service role key
3. **Create .env.local** with those values

---

## 🚀 QUICK SETUP SCRIPT

Once you have your credentials, run this:

```bash
cd /workspaces/fix2

# Create .env.local file
cat > .env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Stripe (optional for now)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder
EOF

# Test connection
node test-supabase-connection.mjs

# If successful, start dev server
pnpm dev
```

---

## 🔍 VERIFY CONNECTION

After setting up credentials, verify everything works:

### Test 1: Connection Test
```bash
node test-supabase-connection.mjs
```

**Expected output:**
```
✅ NEXT_PUBLIC_SUPABASE_URL: Set
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: Set
✅ SUPABASE_SERVICE_ROLE_KEY: Set
✅ Supabase connection successful!
```

### Test 2: Check Database Tables
```bash
node check-database.mjs
```

**Expected output:**
```
✅ Connected to Supabase
✅ Found X tables in database
```

### Test 3: Start Dev Server
```bash
pnpm dev
```

**Expected output:**
```
✓ Ready in 3.2s
○ Local: http://localhost:3000
```

---

## 📊 DATABASE STATUS

### What We Know:
- ✅ Supabase project exists
- ✅ Project ID: `cuxzzpsyufcewtmicszk`
- ✅ Project is live and responding
- ❌ Cannot verify tables (need credentials)
- ❌ Cannot verify migrations (need credentials)
- ❌ Cannot verify data (need credentials)

### What We Need to Check (After Connection):
1. **Tables exist** - Run migrations if needed
2. **RLS policies active** - Security enabled
3. **Seed data loaded** - Programs, courses, etc.
4. **Storage buckets configured** - For images, videos, etc.

---

## 🎯 NEXT STEPS

### Immediate (5 minutes):
1. ✅ Get Supabase credentials from dashboard
2. ✅ Create .env.local file
3. ✅ Test connection
4. ✅ Verify it works

### After Connection (30 minutes):
1. Check if database tables exist
2. Run migrations if needed
3. Load seed data if needed
4. Test a few API endpoints

### Then Deploy (15 minutes):
1. Add credentials to Vercel
2. Trigger deployment
3. Test live site
4. Verify everything works

---

## 🆘 TROUBLESHOOTING

### "Invalid API key" Error
**Problem:** Wrong credentials or typo  
**Solution:** Double-check you copied the full key (they're very long)

### "Project not found" Error
**Problem:** Wrong project ID  
**Solution:** Verify project ID is `cuxzzpsyufcewtmicszk`

### "Connection refused" Error
**Problem:** Supabase project paused or deleted  
**Solution:** Check Supabase dashboard, unpause project if needed

### "No tables found" Error
**Problem:** Migrations haven't been run  
**Solution:** Run migrations (see next section)

---

## 📝 RUNNING MIGRATIONS

If database is empty after connecting:

### Option 1: Run All Migrations at Once
```bash
# In Supabase Dashboard SQL Editor:
# Copy contents of: supabase/migrations/RUN_ALL_MIGRATIONS.sql
# Paste and execute
```

### Option 2: Run Migrations Individually
```bash
# In Supabase Dashboard SQL Editor:
# Run each file in supabase/migrations/ in order
# Start with: 001_init_schema.sql
# Then: 002_courses.sql
# etc.
```

### Option 3: Use Supabase CLI (if installed)
```bash
supabase db push
```

---

## ✅ SUCCESS CRITERIA

You'll know everything is working when:

1. ✅ `node test-supabase-connection.mjs` shows all green checkmarks
2. ✅ `pnpm dev` starts without errors
3. ✅ Can visit http://localhost:3000 and see homepage
4. ✅ Can navigate to /programs and see programs list
5. ✅ Can click on a program and see details
6. ✅ No console errors about Supabase

---

## 📞 NEED HELP?

If you're stuck:

1. **Check Supabase Dashboard:** https://app.supabase.com/project/cuxzzpsyufcewtmicszk
2. **Check Vercel Dashboard:** https://vercel.com (search for "fix2-gpql")
3. **Check this file:** `.env.example` for reference
4. **Ask project owner** for credentials if you don't have access

---

## 🎉 ONCE CONNECTED

After successful connection, you can:

- ✅ Run the app locally
- ✅ Test all features
- ✅ Make database queries
- ✅ Deploy to production
- ✅ Enroll students
- ✅ Process payments
- ✅ Generate certificates

**Your platform is ready to go - it just needs credentials!**
