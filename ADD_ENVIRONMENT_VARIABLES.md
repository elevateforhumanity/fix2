# 🔐 ADD ENVIRONMENT VARIABLES - EXACT STEPS

## 📍 STEP 1: GET YOUR SUPABASE CREDENTIALS

### Go to Supabase Dashboard
**Link:** https://supabase.com/dashboard

1. Click on your project (or create one if you don't have it)
2. Click **Settings** (gear icon in left sidebar)
3. Click **API** in the settings menu

### Copy These 3 Values:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```
Copy this entire URL

**anon public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
```
Copy this long string (starts with `eyJ`)

**service_role key:**
Click "Reveal" button, then copy the long string (starts with `eyJ`)

---

## 📍 STEP 2: ADD TO GITPOD (LOCAL DEVELOPMENT)

### Create .env.local File

In Gitpod terminal, run this command:

```bash
cd /workspaces/fix2
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=PASTE_YOUR_PROJECT_URL_HERE
NEXT_PUBLIC_SUPABASE_ANON_KEY=PASTE_YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=PASTE_YOUR_SERVICE_ROLE_KEY_HERE
EOF
```

### Edit the File

```bash
nano .env.local
```

Replace the placeholder text with your actual values:
- Replace `PASTE_YOUR_PROJECT_URL_HERE` with your Supabase URL
- Replace `PASTE_YOUR_ANON_KEY_HERE` with your anon key
- Replace `PASTE_YOUR_SERVICE_ROLE_KEY_HERE` with your service role key

**Save:** Press `Ctrl + X`, then `Y`, then `Enter`

### Verify It Worked

```bash
cat .env.local
```

You should see your actual values (not the placeholder text).

---

## 📍 STEP 3: ADD TO VERCEL (PRODUCTION)

### Go to Vercel Dashboard
**Link:** https://vercel.com/dashboard

### Navigate to Your Project
1. Click on your project name (probably "fix2" or "elevateforhumanity")
2. Click **Settings** tab at the top
3. Click **Environment Variables** in the left sidebar

### Add Variable 1: NEXT_PUBLIC_SUPABASE_URL

1. Click **Add New** button
2. **Name:** `NEXT_PUBLIC_SUPABASE_URL`
3. **Value:** Paste your Supabase project URL
4. **Environment:** Check all three boxes:
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development
5. Click **Save**

### Add Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY

1. Click **Add New** button
2. **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Value:** Paste your Supabase anon key
4. **Environment:** Check all three boxes:
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development
5. Click **Save**

### Add Variable 3: SUPABASE_SERVICE_ROLE_KEY

1. Click **Add New** button
2. **Name:** `SUPABASE_SERVICE_ROLE_KEY`
3. **Value:** Paste your Supabase service role key
4. **Environment:** Check all three boxes:
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development
5. Click **Save**

### Redeploy

After adding all variables:
1. Go to **Deployments** tab
2. Click the three dots (...) on the latest deployment
3. Click **Redeploy**
4. Check "Use existing Build Cache"
5. Click **Redeploy**

---

## 📍 STEP 4: CREATE SUPABASE TABLE

### Go to Supabase SQL Editor
**Link:** https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new

### Run This SQL:

```sql
create table if not exists applications (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text,
  program_interest text,
  referral_source text,
  created_at timestamptz default now()
);

alter table applications enable row level security;

create policy "Allow service role to insert"
  on applications
  for insert
  to service_role
  with check (true);
```

Click **Run** button.

---

## ✅ VERIFY EVERYTHING WORKS

### Test Locally (Gitpod)

```bash
# Restart dev server
pkill -f "next dev"
pnpm run dev
```

Visit: http://localhost:3000/apply
- Fill out the form
- Submit
- Check Supabase Table Editor for new row

### Test Production (After Vercel Redeploy)

Visit: https://www.elevateforhumanity.org/apply
- Fill out the form
- Submit
- Check Supabase Table Editor for new row

---

## 🔗 QUICK LINKS

### Supabase
- **Dashboard:** https://supabase.com/dashboard
- **API Settings:** https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
- **SQL Editor:** https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new
- **Table Editor:** https://supabase.com/dashboard/project/YOUR_PROJECT/editor

### Vercel
- **Dashboard:** https://vercel.com/dashboard
- **Environment Variables:** https://vercel.com/YOUR_USERNAME/YOUR_PROJECT/settings/environment-variables
- **Deployments:** https://vercel.com/YOUR_USERNAME/YOUR_PROJECT/deployments

---

## 🐛 TROUBLESHOOTING

### Issue: "Cannot find .env.local"
**Fix:**
```bash
cd /workspaces/fix2
ls -la .env.local
# If it doesn't exist, create it again
```

### Issue: "SUPABASE_URL is not defined"
**Check:**
1. `.env.local` exists in project root
2. Variable names are spelled exactly right (case-sensitive)
3. No extra spaces around `=` sign
4. Dev server was restarted after creating file

### Issue: Apply form shows "Could not save application"
**Check:**
1. All 3 environment variables are set
2. Supabase table exists
3. RLS policy allows inserts
4. Browser console for specific error

---

## 📋 CHECKLIST

Before deploying:

- [ ] Got Supabase URL from dashboard
- [ ] Got Supabase anon key from dashboard
- [ ] Got Supabase service role key from dashboard
- [ ] Created `.env.local` in Gitpod
- [ ] Added all 3 variables to `.env.local`
- [ ] Verified `.env.local` has actual values (not placeholders)
- [ ] Added all 3 variables to Vercel
- [ ] Created `applications` table in Supabase
- [ ] Tested apply form locally
- [ ] Redeployed Vercel
- [ ] Tested apply form in production

---

**Status:** Ready to add environment variables
**Time Required:** ~10 minutes
