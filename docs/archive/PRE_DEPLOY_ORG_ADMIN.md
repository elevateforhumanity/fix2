# PRE-DEPLOY: MAKE YOURSELF ORG_ADMIN

## WHY THIS IS REQUIRED

The new RLS policies require you to be in the `organization_users` table with `org_admin` role. Without this, admin features will be blocked (correctly) by security policies.

**Do this BEFORE deploying code.**

---

## STEP-BY-STEP INSTRUCTIONS

### 1. Open Supabase SQL Editor

1. Go to [supabase.com](https://supabase.com)
2. Select your EFH project
3. Click **SQL Editor** in left sidebar
4. Click **New Query**

### 2. Find Your User ID

Copy and run this query:

```sql
SELECT id, email, created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 25;
```

**Find your email in the results and copy the `id` (UUID)**

Example result:

```
id: 12345678-1234-1234-1234-123456789abc
email: you@elevateforhumanity.org
```

### 3. Find Your Organization ID

Copy and run this query:

```sql
SELECT id, slug, name
FROM public.organizations;
```

**Copy the `id` (UUID) for Elevate for Humanity**

Example result:

```
id: 87654321-4321-4321-4321-cba987654321
slug: elevate-for-humanity
name: Elevate for Humanity
```

### 4. Add Yourself as Org Admin

**Replace the UUIDs below with YOUR values from steps 2 & 3:**

```sql
INSERT INTO public.organization_users (organization_id, user_id, role)
VALUES (
  '87654321-4321-4321-4321-cba987654321',  -- YOUR ORG UUID
  '12345678-1234-1234-1234-123456789abc',  -- YOUR USER UUID
  'org_admin'
)
ON CONFLICT (organization_id, user_id)
DO UPDATE SET role = 'org_admin';
```

### 5. Verify It Worked

Run this query to confirm:

```sql
SELECT
  ou.organization_id,
  o.name as org_name,
  ou.user_id,
  u.email,
  ou.role,
  ou.created_at
FROM public.organization_users ou
JOIN public.organizations o ON o.id = ou.organization_id
JOIN auth.users u ON u.id = ou.user_id
ORDER BY ou.created_at DESC;
```

**Expected result:**

```
org_name: Elevate for Humanity
email: you@elevateforhumanity.org
role: org_admin
```

---

## VERIFICATION CHECKLIST

- [ ] Ran Step 2 - Found my user UUID
- [ ] Ran Step 3 - Found my org UUID
- [ ] Ran Step 4 - Inserted org_admin membership
- [ ] Ran Step 5 - Verified I see my row with org_admin role

**If all checked:** ✅ READY TO DEPLOY

---

## AFTER VERIFICATION

Once you see your row with `org_admin` role, reply with:

**"Ready to deploy"**

And I'll give you the deployment command.

---

## TROUBLESHOOTING

### "No rows returned" from Step 2 (users)

- You need to be logged in at least once
- Create an account at your site first
- Then run the query again

### "No rows returned" from Step 3 (organizations)

- Run the migrations first
- Check if `organizations` table exists
- You may need to create the default org

### "Duplicate key error" on Step 4

- You're already in the table
- Run Step 5 to verify your role
- If role is not `org_admin`, update it:

```sql
UPDATE public.organization_users
SET role = 'org_admin'
WHERE user_id = 'YOUR_USER_UUID';
```

---

## WHAT THIS ENABLES

After adding yourself as org_admin, you can:

- ✅ Invite other users
- ✅ Manage organization settings
- ✅ View all applications in your org
- ✅ Export ETPL reports
- ✅ Manage case managers
- ✅ Assign advisors

**Without this, RLS will correctly block these actions.**

---

## NEXT: DEPLOY

After verification, the deployment is simple:

```bash
git add -A
git commit -m "Add org_admin membership for deployment"
git push origin main
```

**But wait for verification first!**
