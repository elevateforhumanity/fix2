# Deploy Supabase Migrations

## ✅ Code Already Deployed

All code changes have been pushed to GitHub and will auto-deploy via Vercel.

## 🗄️ Database Migrations Need Manual Deployment

The following migrations need to be applied to your Supabase database:

### 1. Students Claim Applications Policy

**File:** `supabase/migrations/20241221_students_claim_applications.sql`

### 2. Claim Applications RPC Function

**File:** `supabase/migrations/20241221_claim_applications_function.sql`

---

## 📋 Deployment Steps

### Option 1: Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `cuxzzpsyufcewtmicszk`

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Apply Migration 1: RLS Policy**
   - Copy contents from: `supabase/migrations/20241221_students_claim_applications.sql`
   - Paste into SQL Editor
   - Click "Run" or press Ctrl+Enter
   - Verify: "Success. No rows returned"

4. **Apply Migration 2: RPC Function**
   - Click "New Query" again
   - Copy contents from: `supabase/migrations/20241221_claim_applications_function.sql`
   - Paste into SQL Editor
   - Click "Run" or press Ctrl+Enter
   - Verify: "Success. No rows returned"

5. **Verify Deployment**
   - Go to "Database" → "Policies"
   - Look for: `students_claim_applications` on `applications` table
   - Go to "Database" → "Functions"
   - Look for: `claim_my_applications`

---

### Option 2: Supabase CLI (If Installed)

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref cuxzzpsyufcewtmicszk

# Push migrations
supabase db push

# Verify
supabase db diff
```

---

### Option 3: Direct SQL Connection

If you have direct database access:

```bash
# Connect to your database
psql "postgresql://postgres:[YOUR-PASSWORD]@db.cuxzzpsyufcewtmicszk.supabase.co:5432/postgres"

# Run migration 1
\i supabase/migrations/20241221_students_claim_applications.sql

# Run migration 2
\i supabase/migrations/20241221_claim_applications_function.sql
```

---

## 🧪 Test After Deployment

### Test 1: Check Policy Exists

```sql
SELECT * FROM pg_policies
WHERE tablename = 'applications'
AND policyname = 'students_claim_applications';
```

### Test 2: Check Function Exists

```sql
SELECT proname, prosrc
FROM pg_proc
WHERE proname = 'claim_my_applications';
```

### Test 3: Test Function (as authenticated user)

```sql
SELECT claim_my_applications();
```

---

## 📝 Migration Contents

### Migration 1: RLS Policy

```sql
drop policy if exists students_claim_applications on public.applications;

create policy students_claim_applications
on public.applications
for update
to authenticated
using (user_id is null and lower(email) = lower(auth.email()))
with check (user_id = auth.uid());
```

### Migration 2: RPC Function

```sql
drop function if exists public.claim_my_applications();

create or replace function public.claim_my_applications()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  claimed_count integer;
  user_email text;
begin
  select email into user_email
  from auth.users
  where id = auth.uid();

  if user_email is null then
    return 0;
  end if;

  with updated as (
    update public.applications
    set
      user_id = auth.uid(),
      updated_at = now()
    where
      user_id is null
      and lower(email) = lower(user_email)
    returning id
  )
  select count(*) into claimed_count from updated;

  return claimed_count;
end;
$$;

grant execute on function public.claim_my_applications() to authenticated;
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Policy `students_claim_applications` exists on `applications` table
- [ ] Function `claim_my_applications()` exists and is executable
- [ ] Function returns integer (count of claimed applications)
- [ ] Test sign-in flow claims applications correctly
- [ ] RLS policies allow authenticated users to see their applications

---

## 🚨 Troubleshooting

### Error: "permission denied for table applications"

- Check RLS is enabled on `applications` table
- Verify user has proper authentication

### Error: "function claim_my_applications() does not exist"

- Re-run migration 2
- Check function was created in `public` schema
- Verify `grant execute` was applied

### Applications not being claimed

- Check email matches exactly (case-insensitive)
- Verify `user_id` is null on applications
- Check user is authenticated when calling function

---

## 📊 Current Status

✅ Migrations created and committed  
✅ Code pushed to GitHub  
✅ Vercel deployment triggered  
⏳ **Database migrations need manual deployment**

**Next Step:** Apply migrations in Supabase Dashboard (Option 1 above)

---

## 🔗 Quick Links

- **Supabase Dashboard:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
- **SQL Editor:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql
- **Database Policies:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/policies
- **Database Functions:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/database/functions

---

**Ready to deploy!** Follow Option 1 above to apply migrations in Supabase Dashboard.
