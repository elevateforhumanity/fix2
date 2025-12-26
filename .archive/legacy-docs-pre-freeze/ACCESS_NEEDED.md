# Access Links Needed for Complete Verification

**Date:** December 26, 2025  
**Purpose:** Verify Vercel environment variables and Supabase storage policies

---

## 1. Vercel Dashboard Access

**I need you to:**

### Option A: Invite Me (Preferred)
1. Go to https://vercel.com/dashboard
2. Click on your project (elevateforhumanity or fix2)
3. Go to **Settings** → **Members**
4. Click **Invite Member**
5. Enter email: `ona-agent@temporary.com` (or any email you want to use)
6. Role: **Viewer** (read-only is fine)
7. Send invite

**OR**

### Option B: Share Screenshots
Take screenshots of:
1. **Settings → Environment Variables** page
   - Show all variable names and first 20 characters of values
   - I need to verify they match Supabase credentials

---

## 2. Supabase Dashboard Access

**I need you to:**

### Get the Anon Key
1. Go to https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
2. Click **Settings** → **API**
3. Copy the **`anon` `public`** key (the shorter one, NOT service_role)
4. Paste it here

**Format should be:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.XXXXXXXXXXXXXXXXX
```

---

## 3. Storage Policies Check

**I need to verify storage buckets and policies exist.**

### Option A: Give Me Storage Access
The service_role key you already gave me should work. I'll check:
- Bucket names
- Storage policies
- Public/private access rules

### Option B: Share Screenshots
Take screenshots of:
1. **Storage** → **Buckets** page (show all bucket names)
2. **Storage** → **Policies** page (show all policies)

---

## What I'll Verify

### Vercel Environment Variables:
- ✅ `NEXT_PUBLIC_SUPABASE_URL` = `https://cuxzzpsyufcewtmicszk.supabase.co`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (correct anon key)
- ✅ `SUPABASE_SERVICE_ROLE_KEY` = (correct service_role key)
- ✅ No swapped keys
- ✅ No missing variables

### Supabase Storage:
- ✅ Buckets exist (avatars, documents, certificates, etc.)
- ✅ Storage policies active
- ✅ Public buckets are public
- ✅ Private buckets are protected
- ✅ Seeded with test files (if needed)

---

## Quick Option (No Access Needed)

**If you don't want to give me access, just answer these questions:**

1. **In Vercel, what is the value of `NEXT_PUBLIC_SUPABASE_URL`?**
   - Should be: `https://cuxzzpsyufcewtmicszk.supabase.co`

2. **In Vercel, does `NEXT_PUBLIC_SUPABASE_ANON_KEY` start with `eyJ` and contain `"role":"anon"`?**
   - Should be: Yes

3. **In Vercel, does `SUPABASE_SERVICE_ROLE_KEY` start with `eyJ` and contain `"role":"service_role"`?**
   - Should be: Yes

4. **In Supabase Storage, what buckets exist?**
   - List all bucket names

5. **In Supabase Storage, are there any policies defined?**
   - Yes/No, and how many

---

## What to Send Me

**Minimum (no access needed):**
```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (paste the full key)
```

**Plus answers to:**
- Vercel URL matches? (Yes/No)
- Storage buckets: (list names)
- Storage policies: (count)

**OR**

**Full access:**
- Vercel invite sent to: (email)
- Supabase anon key: (paste here)

---

**I'm waiting for your response to continue verification.**
