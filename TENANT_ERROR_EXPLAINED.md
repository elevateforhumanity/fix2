# "Tenant or user not found" Error - Complete Explanation

## 🔍 What This Error Means

The error **"Tenant or user not found"** is a PostgreSQL authentication error (code 28P01).

In this context, **"tenant"** refers to the **PostgreSQL user/role** trying to connect to the database.

---

## 🎯 The Exact Problem

Your `DATABASE_URL` in Vercel has one of these issues:

### 1. Wrong Password
The password in the connection string is incorrect or expired.

### 2. Wrong Project Reference
The username format is `postgres.[project-ref]` and the project-ref doesn't match your actual Supabase project.

### 3. Old/Deleted Project
The DATABASE_URL is from a different Supabase project that no longer exists or you no longer have access to.

---

## 🔬 Line-by-Line Analysis

### What the Migration Script Does

**File:** `scripts/run-migrations-vercel.mjs`

**Line 20-30:** Gets environment variables
```javascript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
let dbUrl = process.env.DATABASE_URL;
```

**Line 75-85:** Constructs connection config
```javascript
const client = new pg.Client({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 30000,
});
```

**Line 89:** **THIS IS WHERE IT FAILS**
```javascript
await client.connect();  // ❌ "Tenant or user not found"
```

### Why It Fails

When PostgreSQL tries to authenticate, it checks:
1. Does the user `postgres.[project-ref]` exist?
2. Is the password correct?
3. Does this user have access to the database?

If ANY of these fail, you get: **"Tenant or user not found"**

---

## 🔍 How to Diagnose

### Run the Diagnostic Script

```bash
node scripts/diagnose-database-connection.mjs
```

This will show you:
- ✅ Which environment variables are set
- ✅ What project ref is in each variable
- ✅ If there's a mismatch between them
- ✅ If the password is missing
- ✅ If the port is wrong
- ✅ Specific fix recommendations

### Example Output

```
🔍 Database Connection Diagnostic

📋 Environment Variables Check:

1. NEXT_PUBLIC_SUPABASE_URL:
   ✅ SET: https://cuxzzpsyufcewtmicszk.supabase.co
   📌 Project Ref: cuxzzpsyufcewtmicszk

2. SUPABASE_SERVICE_ROLE_KEY:
   ✅ SET: eyJhbGciOiJIUzI1NiI...
   ✅ Format looks correct

3. DATABASE_URL:
   ✅ SET
   
   📊 Parsed Connection Details:
   - Username: postgres.oldprojectref123
   - Password: [HIDDEN - 32 chars]
   - Host: aws-0-us-west-1.pooler.supabase.com
   - Port: 6543
   
   🔍 Username Analysis:
   ❌ MISMATCH!
      DATABASE_URL project ref: oldprojectref123
      SUPABASE_URL project ref: cuxzzpsyufcewtmicszk
   🚨 THIS IS THE PROBLEM!
```

---

## ✅ How to Fix

### Step 1: Go to Your CURRENT Supabase Project

1. Visit: https://supabase.com/dashboard
2. **Make sure you're in the CORRECT project**
3. Check the project ref in the URL: `supabase.com/project/[project-ref]`

### Step 2: Get Fresh DATABASE_URL

1. Go to: **Settings → Database**
2. Scroll to "Connection string"
3. Select: **"Transaction mode"** (this is the pooler)
4. Click "Copy"

**It should look like:**
```
postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
```

**Important parts:**
- `postgres.[project-ref]` - Username with your project ref
- `:[YOUR-PASSWORD]` - Your actual database password
- `.pooler.supabase.com` - Pooler hostname
- `:6543` - Pooler port (NOT 5432)

### Step 3: Update in Vercel

1. Go to: https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2/settings/environment-variables
2. Find `DATABASE_URL`
3. Click "Edit"
4. Paste the EXACT string from Supabase
5. Make sure it's set for: Production, Preview, Development
6. Click "Save"

### Step 4: Verify Other Variables Match

While you're there, verify these also match the SAME project:

**NEXT_PUBLIC_SUPABASE_URL:**
```
https://[same-project-ref].supabase.co
```

**NEXT_PUBLIC_SUPABASE_ANON_KEY:**
- Get from: Settings → API → "anon public" key

**SUPABASE_SERVICE_ROLE_KEY:**
- Get from: Settings → API → "service_role" key

### Step 5: Redeploy

```bash
# Trigger a new deployment
git commit --allow-empty -m "chore: trigger redeploy with fixed credentials"
git push origin main
```

Or click "Redeploy" in Vercel dashboard.

---

## 🎯 Common Mistakes

### Mistake 1: Using Direct Connection Instead of Pooler

**Wrong:**
```
postgresql://postgres:[password]@db.cuxzzpsyufcewtmicszk.supabase.co:5432/postgres
```

**Right:**
```
postgresql://postgres.cuxzzpsyufcewtmicszk:[password]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

**Key differences:**
- Username: `postgres` → `postgres.[project-ref]`
- Host: `db.[ref].supabase.co` → `aws-0-[region].pooler.supabase.com`
- Port: `5432` → `6543`

### Mistake 2: Mixed Project References

**NEXT_PUBLIC_SUPABASE_URL:**
```
https://cuxzzpsyufcewtmicszk.supabase.co  ← New project
```

**DATABASE_URL:**
```
postgresql://postgres.oldprojectref123:...  ← Old project
```

**Result:** "Tenant or user not found" because the old project doesn't exist anymore.

### Mistake 3: Missing Password

**Wrong:**
```
postgresql://postgres.cuxzzpsyufcewtmicszk@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

**Right:**
```
postgresql://postgres.cuxzzpsyufcewtmicszk:YOUR_PASSWORD_HERE@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

### Mistake 4: Wrong Password

Even if the format is correct, if the password is wrong, you'll get this error.

**Solution:** Get a fresh connection string from Supabase (it includes the correct password).

---

## 🧪 How to Test Locally

### Test 1: Check Environment Variables

```bash
# In your local environment
echo $DATABASE_URL
echo $NEXT_PUBLIC_SUPABASE_URL

# Compare the project refs
```

### Test 2: Test Connection

```bash
# Install psql if needed
# Then try to connect
psql "$DATABASE_URL"

# If it connects, your DATABASE_URL is correct
# If it fails with "Tenant or user not found", it's wrong
```

### Test 3: Run Diagnostic

```bash
node scripts/diagnose-database-connection.mjs
```

---

## 📊 Expected Result After Fix

### Build Log Should Show:

```
🚀 Running Supabase Migrations
📡 Connecting to database...
✅ Connected to database
📦 Found 252 migration files
✅ 252 migrations already executed
✅ Migrations complete!
```

### NOT:

```
❌ Migration failed: Tenant or user not found
```

---

## 🆘 Still Not Working?

### Double-Check These:

1. **Are you in the correct Supabase project?**
   - Check the project name in Supabase dashboard
   - Verify it's the project you're actually using

2. **Did you copy the ENTIRE connection string?**
   - Including the password
   - No spaces or line breaks
   - Exact copy from Supabase

3. **Did you save in Vercel?**
   - Click "Save" after editing
   - Check all 3 environments (Production, Preview, Development)

4. **Did you redeploy?**
   - Changes only take effect after redeployment
   - Push a commit or click "Redeploy"

### Get More Help:

Run the diagnostic and share the output (hide the password):
```bash
node scripts/diagnose-database-connection.mjs
```

---

## 💡 Pro Tip

**Always use the connection pooler (port 6543) in Vercel/production.**

Why?
- ✅ Better compatibility with serverless
- ✅ Handles IPv6/IPv4 issues
- ✅ Connection pooling for performance
- ✅ More reliable in Vercel environment

**Get it from:** Supabase → Settings → Database → Connection string → **"Transaction mode"**

---

**Last Updated:** December 26, 2025

**Status:** Diagnostic tools added and ready

**Action Required:** 
1. Run diagnostic script
2. Get fresh DATABASE_URL from Supabase
3. Update in Vercel
4. Redeploy
