# ⚡ Quick Check - Vercel Environment Variables

**Time**: 30 seconds  
**Goal**: See if Supabase is connected

---

## 🎯 One-Click Check

### Step 1: Open This Link

```
https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables
```

### Step 2: Look for These 3 Variables

```
□ NEXT_PUBLIC_SUPABASE_URL
□ NEXT_PUBLIC_SUPABASE_ANON_KEY
□ SUPABASE_SERVICE_ROLE_KEY
```

### Step 3: Check Result

**If you see all 3 variables**:

- Click on each one
- Check if value contains "placeholder" or real data
- Real data = starts with `https://` or `eyJ`

**If you DON'T see these variables**:

- Not configured yet
- App is using mock data (17 sample courses)
- This is fine for testing!

---

## 📊 Quick Visual Check

### What You'll See in Vercel:

**Scenario A: Not Configured** (Current Expected)

```
Environment Variables
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Search variables...                    [Add Variable]

No Supabase variables found
(or they contain "placeholder")

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Scenario B: Configured** (Production)

```
Environment Variables
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Search variables...                    [Add Variable]

✅ NEXT_PUBLIC_SUPABASE_URL
   https://xxxxx.supabase.co
   Production, Preview, Development

✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Production, Preview, Development

✅ SUPABASE_SERVICE_ROLE_KEY
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Production, Preview, Development

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🎯 What This Means

### If NOT Configured:

```
✅ App works perfectly with mock data
✅ Shows 17 sample courses
✅ Blue banner visible
✅ Good for testing/demos
⏳ Add real database when ready
```

### If Configured:

```
✅ Connected to real Supabase database
✅ Shows courses from database
✅ No blue banner
✅ Full enrollment functionality
✅ Production ready
```

---

## 🚀 Quick Actions

### Current Status (Expected):

**Not Configured** → Using mock data → **This is fine!**

### To Test Now:

```
Visit: https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/admin/courses

You should see:
✅ 17 courses
✅ Blue banner
✅ All working
```

### To Activate Database (Later):

```
1. Get Supabase credentials (5 min)
2. Add to Vercel (2 min)
3. Redeploy (3 min)
4. Run migrations (30 min)
```

---

## 📞 Direct Links

**Check Variables Now**:
https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables

**Test Live Site**:
https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/admin/courses

**Full Guide**:
See `CHECK_VERCEL_ENV.md` for detailed instructions

---

**Quick Answer**: Click the first link above to see if variables are configured!

---

_Quick Check Guide - November 19, 2025_
