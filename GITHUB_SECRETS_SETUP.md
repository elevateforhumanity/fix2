# GitHub Secrets Setup Guide

## Current Supabase Configuration

**Project:** elevate (cuxzzpsyufcewtmicszk)  
**Region:** AWS us-east-2  
**Tier:** nano

## Required GitHub Secrets

Your GitHub Actions workflows need these secrets to connect to Supabase:

### 1. SUPABASE_PROJECT_REF
```
cuxzzpsyufcewtmicszk
```

### 2. SUPABASE_SERVICE_ROLE_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE
```

### 3. SUPABASE_DB_URL
```
postgres://postgres:[YOUR_PASSWORD]@db.cuxzzpsyufcewtmicszk.supabase.co:5432/postgres
```

**Get your database password from:**
https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/database

---

## Method 1: Manual Update (Easiest)

### Step 1: Go to GitHub Secrets Page
```
https://github.com/elevateforhumanity/fix2/settings/secrets/actions
```

### Step 2: Update Each Secret

For each secret:
1. Click the secret name (or "New repository secret")
2. Paste the value from above
3. Click "Update secret" (or "Add secret")

**Update these 3 secrets:**
- `SUPABASE_PROJECT_REF`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DB_URL` (with your actual password)

---

## Method 2: Using GitHub CLI

### Step 1: Authenticate
```bash
gh auth login
```

### Step 2: Set Secrets
```bash
# Set project ref
echo "cuxzzpsyufcewtmicszk" | gh secret set SUPABASE_PROJECT_REF

# Set service role key
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE" | gh secret set SUPABASE_SERVICE_ROLE_KEY

# Set database URL (replace [PASSWORD] with your actual password)
echo "postgres://postgres:[PASSWORD]@db.cuxzzpsyufcewtmicszk.supabase.co:5432/postgres" | gh secret set SUPABASE_DB_URL
```

### Step 3: Verify
```bash
gh secret list
```

---

## Method 3: Using Automated Script

```bash
# Run the update script
bash UPDATE_GITHUB_SECRETS.sh
```

This will:
- ✅ Load values from .env
- ✅ Update SUPABASE_PROJECT_REF
- ✅ Update SUPABASE_SERVICE_ROLE_KEY
- ⚠️ Prompt you to manually set SUPABASE_DB_URL with password

---

## Verification

### Check Secrets Are Set

1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. You should see:
   - ✅ SUPABASE_PROJECT_REF
   - ✅ SUPABASE_SERVICE_ROLE_KEY
   - ✅ SUPABASE_DB_URL

### Test with Workflow

1. Go to: https://github.com/elevateforhumanity/fix2/actions
2. Click: "Supabase Autopilot"
3. Click: "Run workflow" → "Run workflow"
4. Wait for completion
5. Should succeed with ✅

---

## What These Secrets Do

### SUPABASE_PROJECT_REF
- Used to construct URLs
- Identifies your Supabase project
- Used in: supabase-autopilot.yml, autopilot-phase2-rollback.yml, etc.

### SUPABASE_SERVICE_ROLE_KEY
- Admin access to Supabase
- Bypasses Row Level Security (RLS)
- Used for: migrations, admin operations

### SUPABASE_DB_URL
- Direct PostgreSQL connection
- Used for: running migrations
- Format: `postgres://user:password@host:port/database`

---

## Troubleshooting

### Error: "SUPABASE_DB_URL secret not set"
**Solution:** Add the secret with your database password

### Error: "SUPABASE_PROJECT_REF secret not set"
**Solution:** Add the secret with value: `cuxzzpsyufcewtmicszk`

### Error: "Migration failed: connection refused"
**Solution:** Check SUPABASE_DB_URL has correct password

### Error: "Schema validation failed"
**Solution:** Run migrations manually:
```bash
export DB_URL="postgres://postgres:[PASSWORD]@db.cuxzzpsyufcewtmicszk.supabase.co:5432/postgres"
bash scripts/autopilot_migrate.sh "$DB_URL"
```

---

## Security Notes

⚠️ **Never commit these values to Git!**
- Service role key has admin access
- Database password is sensitive
- Always use GitHub Secrets for CI/CD

✅ **These are already in .env (gitignored)**
- Safe to use locally
- Not committed to repository
- Only you have access

---

## Quick Checklist

- [ ] Go to GitHub Secrets page
- [ ] Set SUPABASE_PROJECT_REF = `cuxzzpsyufcewtmicszk`
- [ ] Set SUPABASE_SERVICE_ROLE_KEY = (from above)
- [ ] Get database password from Supabase dashboard
- [ ] Set SUPABASE_DB_URL with your password
- [ ] Test by running Supabase Autopilot workflow
- [ ] Verify workflow succeeds

---

## After Setup

Once secrets are set:
1. ✅ GitHub Actions will work
2. ✅ Migrations will run automatically
3. ✅ Health checks will pass
4. ✅ No more "secret not set" errors

---

**Time to Complete:** 5 minutes  
**Difficulty:** Easy  
**Risk:** None (just configuration)
