# Vercel Environment Variables Audit Checklist

## Project: fix2-1c7w

**URL:** https://vercel.com/gitpod/fix2-1c7w

---

## 🎯 Mission

Ensure ALL 6 environment variables are present in ALL 3 environments (Production, Preview, Development).

---

## 📋 Environment Variables Checklist

### Variable 1: SUPABASE_URL

| Environment | Required | Value                                      | Status |
| ----------- | -------- | ------------------------------------------ | ------ |
| Production  | ✅ Yes   | `https://cuxzzpsyufcewtmicszk.supabase.co` | [ ]    |
| Preview     | ✅ Yes   | `https://cuxzzpsyufcewtmicszk.supabase.co` | [ ]    |
| Development | ✅ Yes   | `https://cuxzzpsyufcewtmicszk.supabase.co` | [ ]    |

---

### Variable 2: SUPABASE_ANON_KEY

| Environment | Required | Value                                                                                                                                                                                                               | Status |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Production  | ✅ Yes   | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ` | [ ]    |
| Preview     | ✅ Yes   | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ` | [ ]    |
| Development | ✅ Yes   | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ` | [ ]    |

---

### Variable 3: SUPABASE_SERVICE_ROLE_KEY ⚠️ SECRET

| Environment | Required | How to Get                    | Status |
| ----------- | -------- | ----------------------------- | ------ |
| Production  | ✅ Yes   | Get from Supabase (see below) | [ ]    |
| Preview     | ✅ Yes   | Same value as Production      | [ ]    |
| Development | ✅ Yes   | Same value as Production      | [ ]    |

**How to get SUPABASE_SERVICE_ROLE_KEY:**

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
2. Find the `service_role` key (marked as "secret")
3. Click the **"Reveal"** button
4. Copy the entire key (starts with `eyJ...`)
5. Paste it in Vercel for all 3 environments

---

### Variable 4: NEXT_PUBLIC_SUPABASE_URL

| Environment | Required | Value                                      | Status |
| ----------- | -------- | ------------------------------------------ | ------ |
| Production  | ✅ Yes   | `https://cuxzzpsyufcewtmicszk.supabase.co` | [ ]    |
| Preview     | ✅ Yes   | `https://cuxzzpsyufcewtmicszk.supabase.co` | [ ]    |
| Development | ✅ Yes   | `https://cuxzzpsyufcewtmicszk.supabase.co` | [ ]    |

---

### Variable 5: NEXT_PUBLIC_SUPABASE_ANON_KEY

| Environment | Required | Value                                                                                                                                                                                                               | Status |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Production  | ✅ Yes   | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ` | [ ]    |
| Preview     | ✅ Yes   | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ` | [ ]    |
| Development | ✅ Yes   | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ` | [ ]    |

---

### Variable 6: NEXT_PUBLIC_SITE_URL ⚠️ DIFFERENT PER ENVIRONMENT

| Environment | Required | Value                                      | Status |
| ----------- | -------- | ------------------------------------------ | ------ |
| Production  | ✅ Yes   | `https://www.elevateconnectsdirectory.org` | [ ]    |
| Preview     | ✅ Yes   | Leave empty or use preview URL pattern     | [ ]    |
| Development | ✅ Yes   | `http://localhost:3000`                    | [ ]    |

**Note:** This variable has DIFFERENT values for each environment!

---

## 🔧 How to Add/Update Variables in Vercel

### Step 1: Navigate to Environment Variables

1. Go to: https://vercel.com/gitpod/fix2-1c7w
2. Click **Settings** (left sidebar)
3. Click **Environment Variables**

### Step 2: Check Existing Variables

For each of the 6 variables above:

1. Look for the variable name in the list
2. Check which environments it's assigned to (Production/Preview/Development)
3. Mark the checkbox in the table above if it's present

### Step 3: Add Missing Variables

If a variable is missing from ANY environment:

1. Click **"Add New"** button
2. Enter the **Key** (variable name)
3. Enter the **Value** (from tables above)
4. Check ALL THREE boxes: Production, Preview, Development
5. Click **"Save"**

### Step 4: Update Existing Variables

If a variable exists but is missing from some environments:

1. Click the **three dots** (⋮) next to the variable
2. Click **"Edit"**
3. Check the missing environment boxes
4. Verify the value is correct
5. Click **"Save"**

### Step 5: Verify SUPABASE_SERVICE_ROLE_KEY

This is the most critical variable:

1. Check if it exists in all 3 environments
2. If it says "placeholder" or is missing, get the real value:
   - Go to Supabase dashboard
   - Copy the service_role key
   - Update in Vercel
3. Make sure it's marked as "Sensitive" (hidden value)

---

## ✅ Final Verification

Before deploying, confirm:

- [ ] All 6 variables are present in **Production**
- [ ] All 6 variables are present in **Preview**
- [ ] All 6 variables are present in **Development**
- [ ] SUPABASE_SERVICE_ROLE_KEY is set (not placeholder)
- [ ] NEXT_PUBLIC_SITE_URL has correct value per environment
- [ ] All values match the tables above exactly

---

## 🧹 Step 4: Clean Up Unused Projects and Old Deployments

### A. Audit All Vercel Projects

1. Go to Vercel Dashboard: https://vercel.com/gitpod
2. Click **"View All Projects"**
3. Look for ALL projects starting with `fix2`

**Expected projects:**

- `fix2-1c7w` ✅ KEEP (correct project)
- `fix2-8mig` ❌ DELETE (wrong project, old code)
- `fix2-i3z8` ❌ DELETE (old config)
- Any other `fix2-*` ❌ REVIEW and likely DELETE

### B. Delete Unused Projects

For each project that should be deleted:

1. Click on the project name
2. Go to **Settings** (left sidebar)
3. Scroll to **Advanced** section at bottom
4. Click **"Delete Project"**
5. Type the project name to confirm
6. Click **"Delete"**

**Document deleted projects:**

- [ ] fix2-8mig - Deleted (reason: deploying old code)
- [ ] fix2-i3z8 - Deleted (reason: old configuration)
- [ ] Other: \***\*\_\_\*\*** - Deleted (reason: \***\*\_\_\*\***)

### C. Review Old Deployments in fix2-1c7w

1. Go to: https://vercel.com/gitpod/fix2-1c7w
2. Click **Deployments** tab
3. Review the deployment history

**Look for:**

- ❌ Failed deployments (red X)
- ⚠️ Deployments with old commits (3d3bd68 and earlier)
- ⚠️ Deployments with build warnings
- ⚠️ Deployments that never completed

**Document findings:**

| Commit   | Status   | Date   | Issues Found                          | Action     |
| -------- | -------- | ------ | ------------------------------------- | ---------- |
| 3d3bd68  | Failed   | [date] | Deprecated packages, Stripe API error | Can delete |
| [commit] | [status] | [date] | [issues]                              | [action]   |

### D. Clean Up Failed Deployments (Optional)

Old failed deployments can be deleted to clean up the list:

1. Click the **three dots** (⋮) next to a failed deployment
2. Click **"Delete"**
3. Confirm deletion

**Note:** Only delete old failed deployments. Keep recent ones for debugging.

### E. Compare Environments Across Projects

If multiple projects exist, compare their environment variables:

**Project: fix2-1c7w (KEEP)**

- Production: [list variables]
- Preview: [list variables]
- Development: [list variables]

**Project: fix2-8mig (DELETE)**

- Production: [list variables]
- Preview: [list variables]
- Development: [list variables]

**Differences found:**

- [Document any differences]

**Action:** Ensure fix2-1c7w has all necessary variables before deleting other projects.

---

## 🚀 Step 5: Deploy After Cleanup

Once all variables are confirmed and cleanup is complete:

1. Go to **Deployments** tab in fix2-1c7w
2. Click **"Redeploy"** on latest commit (1fedb63e or newer)
3. **UNCHECK** "Use existing build cache"
4. Click **"Deploy"**
5. Monitor build logs for success
6. Verify site loads without errors

---

## 📊 Summary Table

| Variable                      | Production | Preview | Development | Notes                         |
| ----------------------------- | ---------- | ------- | ----------- | ----------------------------- |
| SUPABASE_URL                  | ✅         | ✅      | ✅          | Same value all environments   |
| SUPABASE_ANON_KEY             | ✅         | ✅      | ✅          | Same value all environments   |
| SUPABASE_SERVICE_ROLE_KEY     | ✅         | ✅      | ✅          | Get from Supabase dashboard   |
| NEXT_PUBLIC_SUPABASE_URL      | ✅         | ✅      | ✅          | Same value all environments   |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | ✅         | ✅      | ✅          | Same value all environments   |
| NEXT_PUBLIC_SITE_URL          | ✅         | ✅      | ✅          | **Different per environment** |

**Total:** 6 variables × 3 environments = 18 configurations to verify

---

## 🆘 Troubleshooting

### Issue: Can't find SUPABASE_SERVICE_ROLE_KEY

**Solution:**

1. Go to https://supabase.com/dashboard
2. Select project `cuxzzpsyufcewtmicszk`
3. Settings → API
4. Find `service_role` key (secret)
5. Click "Reveal" and copy

### Issue: Variable exists but wrong environment

**Solution:**

1. Click three dots (⋮) next to variable
2. Click "Edit"
3. Check the missing environment boxes
4. Save

### Issue: Not sure if value is correct

**Solution:**

- Compare with the tables above
- Values should match EXACTLY (including https://)
- Copy/paste to avoid typos

---

## 📝 Completion Report

After completing the audit, document:

```markdown
## Vercel Environment Audit & Cleanup Complete

Date: [Date]
Worker: [Your name]
Project: fix2-1c7w

### Part 1: Environment Variables Audit

#### Variables Added/Updated:

- [List any variables that were added or updated]

#### Environments Verified:

- [x] Production - All 6 variables present
- [x] Preview - All 6 variables present
- [x] Development - All 6 variables present

#### SUPABASE_SERVICE_ROLE_KEY Status:

- [x] Retrieved from Supabase dashboard
- [x] Set in all 3 environments
- [x] Verified not a placeholder

### Part 2: Project Cleanup

#### Projects Found:

- fix2-1c7w: ✅ KEPT (correct project)
- fix2-8mig: [✅ Deleted / ❌ Not found / ⚠️ Kept (reason)]
- fix2-i3z8: [✅ Deleted / ❌ Not found / ⚠️ Kept (reason)]
- Other: [list any other projects found]

#### Projects Deleted:

- [List projects deleted and reason]

#### Old Deployments Reviewed:

- Total failed deployments found: [number]
- Deployments with old commits: [number]
- Deployments deleted: [number]
- Issues documented: [list any patterns found]

### Part 3: Environment Comparison

#### Differences Found Between Projects:

- [List any differences in environment variables between projects]
- [Note if any variables were missing from fix2-1c7w]

#### Actions Taken:

- [List any variables copied from old projects to fix2-1c7w]

### Part 4: Deployment

#### New Deployment Triggered:

- Commit: [commit hash]
- Build Status: [Success / Failed]
- Build Duration: [time]
- Deprecation Warnings: [count or "None"]
- Deployment URL: [URL]

#### Site Verification:

- [x] Homepage loads
- [x] /lms/dashboard loads (or redirects to login)
- [x] /programs loads
- [x] /login loads
- [x] No 500 errors

### Issues Found:

- [List any issues or "None"]

### Recommendations:

- [Any suggestions for future improvements]

### Next Steps:

- [x] Audit complete
- [x] Cleanup complete
- [x] Deployment successful
- [x] Ready for production use
```

Save this report as: `VERCEL_ENV_AUDIT_COMPLETE.md`
