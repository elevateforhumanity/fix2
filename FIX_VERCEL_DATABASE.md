# 🚨 CRITICAL: Fix Vercel Database Connection

## ❌ Current Error

```
❌ Migration failed: Tenant or user not found
   Error code: XX000

🚨 AUTHENTICATION ERROR DETECTED
   "Tenant or user not found" means PostgreSQL authentication failed.
```

## ✅ Solution: Update Vercel Environment Variables

### Step 1: Get Correct Database URL from Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/database)
2. Click **Settings** → **Database**
3. Scroll to **Connection string**
4. Select **Transaction mode** (pooler)
5. Click **Copy** - it should look like:
   ```
   postgresql://postgres.cuxzzpsyufcewtmicszk:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

### Step 2: Update Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/elevateforhumanitys-projects/fix2/settings/environment-variables)
2. Find `DATABASE_URL`
3. Click **Edit**
4. Paste the EXACT connection string from Supabase (with your password)
5. Make sure it's set for **Production**, **Preview**, and **Development**
6. Click **Save**

### Step 3: Verify Other Variables

Make sure these match your Supabase project:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE
```

### Step 4: Redeploy

After updating environment variables:

1. Go to [Vercel Deployments](https://vercel.com/elevateforhumanitys-projects/fix2)
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger deployment

---

## 🔍 How to Find Your Database Password

If you don't know your database password:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/database)
2. Click **Settings** → **Database**
3. Under **Database password**, click **Reset database password**
4. Copy the new password
5. Update your connection string with the new password
6. Update Vercel environment variables

---

## ⚠️ Common Mistakes

❌ **Wrong:** Using direct connection (port 5432)
```
postgresql://postgres:password@db.cuxzzpsyufcewtmicszk.supabase.co:5432/postgres
```

✅ **Correct:** Using pooler connection (port 6543)
```
postgresql://postgres.cuxzzpsyufcewtmicszk:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

❌ **Wrong:** Password has special characters not URL-encoded
✅ **Correct:** URL-encode special characters in password

---

## 🎯 Quick Fix Command

If you have Vercel CLI installed:

```bash
# Set DATABASE_URL
vercel env add DATABASE_URL production

# Paste your connection string when prompted

# Redeploy
vercel --prod
```

---

## ✅ After Fixing

Once DATABASE_URL is correct:

1. Deployment will succeed
2. Migrations will run automatically
3. All database features will work
4. Frontend will connect properly

---

## 📞 Need Help?

The error message shows:
- Your Supabase project: `cuxzzpsyufcewtmicszk`
- Your database host: `db.cuxzzpsyufcewtmicszk.supabase.co`

Make sure the DATABASE_URL in Vercel matches this project exactly.
