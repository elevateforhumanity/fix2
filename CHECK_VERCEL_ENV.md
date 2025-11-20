# 🔍 Check Vercel Environment Variables

**Purpose**: Verify Supabase variables are configured in Vercel  
**Time**: 2 minutes  
**Result**: Know if database is connected or using mock data

---

## 🎯 Quick Check

### Method 1: Visit Vercel Dashboard (Recommended)

**Step 1: Go to Environment Variables**

```
https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables
```

**Step 2: Look for These Variables**
Check if these exist:

- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`

**Step 3: Check Values**
Click on each variable to see if:

- ❌ Value contains "placeholder" → Using mock data
- ❌ Value is empty → Using mock data
- ✅ Value starts with "https://" (URL) → Real credentials
- ✅ Value starts with "eyJ" (JWT token) → Real credentials

---

## 📊 What You Should See

### Scenario A: Variables NOT Configured (Current State)

```
Environment Variables (0-3 variables)

Either:
1. No Supabase variables exist
2. Variables exist but contain "placeholder"
3. Variables exist but are empty

Result: ✅ App uses mock data (17 courses)
```

### Scenario B: Variables Configured (Production Ready)

```
Environment Variables (3+ variables)

✅ NEXT_PUBLIC_SUPABASE_URL
   Value: https://xxxxx.supabase.co
   Environments: Production, Preview, Development

✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Environments: Production, Preview, Development

✅ SUPABASE_SERVICE_ROLE_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Environments: Production, Preview, Development

Result: ✅ App connects to real database
```

---

## 🔧 How to Add Variables (If Missing)

### Step 1: Get Supabase Credentials

**A. Create Supabase Account** (if needed):

```
1. Go to: https://supabase.com
2. Sign up (free)
3. Create project: "elevate-for-humanity"
4. Wait 2 minutes
```

**B. Get Credentials**:

```
1. Supabase Dashboard → Settings → API
2. Copy:
   - Project URL
   - anon public key
   - service_role key
```

### Step 2: Add to Vercel

**Go to**: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables

**Add Variable 1**:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxx.supabase.co
Environments: ✅ Production ✅ Preview ✅ Development
[Save]
```

**Add Variable 2**:

```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environments: ✅ Production ✅ Preview ✅ Development
[Save]
```

**Add Variable 3**:

```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environments: ✅ Production ✅ Preview ✅ Development
[Save]
```

### Step 3: Redeploy

```
1. Go to: Deployments tab
2. Click latest deployment
3. Click "..." → Redeploy
4. Wait 2-3 minutes
```

---

## 🧪 Test Current Configuration

### Method 2: Check Live Site

**Visit**: https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/admin/courses

**Look for Blue Banner**:

**If you see this**:

```
┌─────────────────────────────────────────────┐
│ ℹ️ Using Mock Course Data                  │
│                                             │
│ Showing 17 sample courses for testing...   │
└─────────────────────────────────────────────┘
```

**Result**: ❌ Variables NOT configured (using mock data)

**If you DON'T see the banner**:

```
No blue banner at top of page
```

**Result**: ✅ Variables configured (using real database)

---

## 📋 Verification Checklist

### Check These Items:

**In Vercel Dashboard**:

- [ ] Go to Settings → Environment Variables
- [ ] Count how many variables exist
- [ ] Check if Supabase variables present
- [ ] Verify values are not "placeholder"
- [ ] Confirm all 3 environments checked

**On Live Site**:

- [ ] Visit /admin/courses
- [ ] Look for blue banner
- [ ] Check course count
- [ ] Test enrollment (if no banner)

---

## 🎯 Current Status Check

### Quick Test:

**1. Open Vercel Dashboard**

```
https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables
```

**2. Count Variables**

- **0-2 variables**: Not configured → Using mock data
- **3+ variables**: Check if Supabase ones exist
- **Supabase variables with real values**: Configured ✅

**3. Visit Live Site**

```
https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/admin/courses
```

**4. Check Banner**

- **Blue banner visible**: Using mock data
- **No blue banner**: Using real database

---

## 🔍 Detailed Inspection

### Check Variable Values:

**In Vercel Dashboard**, click each variable to see:

**NEXT_PUBLIC_SUPABASE_URL**:

```
✅ Good: https://abcdefgh.supabase.co
❌ Bad: https://placeholder.supabase.co
❌ Bad: (empty)
```

**NEXT_PUBLIC_SUPABASE_ANON_KEY**:

```
✅ Good: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSI...
❌ Bad: placeholder-anon-key
❌ Bad: (empty)
```

**SUPABASE_SERVICE_ROLE_KEY**:

```
✅ Good: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSI...
❌ Bad: placeholder-service-role-key
❌ Bad: (empty)
```

---

## 📊 What Each Status Means

### Status 1: No Variables

```
Environment Variables: 0 Supabase variables

Meaning: Not configured
Result: Using mock data
Action: Add variables if you want real database
```

### Status 2: Placeholder Values

```
Environment Variables: 3 variables
Values: All contain "placeholder"

Meaning: Configured but not real
Result: Using mock data
Action: Replace with real Supabase credentials
```

### Status 3: Real Values

```
Environment Variables: 3 variables
Values: Real Supabase credentials

Meaning: Fully configured
Result: Connected to real database
Action: Run migrations if not done yet
```

---

## 🚀 Recommended Actions

### If Variables NOT Configured:

**Option A: Keep Using Mock Data** (Testing)

```
✅ Do nothing
✅ Mock data works perfectly
✅ Test UI and functionality
✅ Show stakeholders
⏳ Add real database later
```

**Option B: Configure Now** (Production)

```
1. Create Supabase account (5 min)
2. Get credentials (2 min)
3. Add to Vercel (2 min)
4. Redeploy (3 min)
5. Run migrations (30 min)
Total: ~42 minutes
```

### If Variables Configured:

**Check Database**:

```
1. Verify migrations run
2. Test enrollment
3. Check progress tracking
4. Verify certificates work
```

---

## 📞 Quick Links

### Vercel:

- **Environment Variables**: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables
- **Deployments**: https://vercel.com/elevate-48e460c9/fix2-gpql/deployments
- **Dashboard**: https://vercel.com/elevate-48e460c9/fix2-gpql

### Supabase:

- **Sign Up**: https://supabase.com
- **Dashboard**: https://app.supabase.com

### Test Site:

- **Admin Courses**: https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/admin/courses

---

## ✅ Summary

### To Check Variables:

1. Go to Vercel dashboard
2. Click Settings → Environment Variables
3. Look for 3 Supabase variables
4. Check if values are real or placeholder

### Current Expected Status:

- ❌ Variables NOT configured (or placeholders)
- ✅ App uses mock data
- ✅ Blue banner shows
- ✅ 17 courses display
- ✅ Everything works for testing

### To Activate Database:

1. Add real Supabase credentials
2. Redeploy
3. Run migrations
4. Blue banner disappears
5. Real database active

---

**Action**: Visit Vercel dashboard now to check variables  
**URL**: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables

---

_Last Updated: November 19, 2025_  
_Document: CHECK_VERCEL_ENV.md_
