# Get Your Service Role Key

## ✅ Progress So Far

You've already set:

- ✅ **NEXT_PUBLIC_SUPABASE_URL**: `https://cuxzzpsyufcewtmicszk.supabase.co`
- ✅ **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Set correctly!
- ❌ **SUPABASE_SERVICE_ROLE_KEY**: Still needed

---

## 🔑 Get the Service Role Key (1 minute)

### Step 1: Go to Supabase Dashboard

Click this link:  
**[https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api)**

### Step 2: Find the Service Role Key

On the API settings page, scroll down to find:

**"service_role" key** (secret)

It looks like:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

⚠️ **This is a SECRET key** - it has full database access!

### Step 3: Copy the Key

Click the copy icon next to "service_role" key.

### Step 4: Update .env.local

```bash
# Open the file
nano .env.local

# Find this line:
SUPABASE_SERVICE_ROLE_KEY=GET_THIS_FROM_SUPABASE_DASHBOARD

# Replace with your actual key:
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.YOUR_ACTUAL_KEY_HERE

# Save and exit (Ctrl+X, then Y, then Enter)
```

---

## ✅ Verify It Works

```bash
# Check all three variables are set
cat .env.local | grep SUPABASE

# Should show:
# NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co ✅
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M... ✅
# SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M... ✅

# Check for placeholder text (should return nothing)
grep "GET_THIS_FROM\|your-project-ref\|your-anon-key" .env.local
```

If the last command returns **nothing**, you're all set! ✅

---

## 🚀 Start Your App

Once you have the service_role key:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

Your website should now work! 🎉

---

## 🔒 Security Note

**The service_role key:**

- ✅ Has full database access
- ✅ Bypasses Row Level Security (RLS)
- ❌ Should NEVER be exposed in frontend code
- ❌ Should NEVER be committed to git
- ✅ Is already in `.gitignore` (safe)

---

## ❓ Can't Access Supabase Dashboard?

If you get "Access denied":

1. **Check you're logged into the right account**
2. **Ask team admin** to add you to the project
3. **Alternative:** Ask admin to send you the service_role key directly

---

## Quick Summary

**What you have:**

```bash
✅ Supabase URL: https://cuxzzpsyufcewtmicszk.supabase.co
✅ Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
❌ Service Role Key: Need to get from dashboard
```

**What you need to do:**

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
2. Copy the "service_role" key
3. Update `.env.local`
4. Run `pnpm install && pnpm run dev`

**You're almost there!** Just one more key to go! 🚀
