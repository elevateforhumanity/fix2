# Configure "elevate" Supabase Project for Netlify

## Current Situation

**Old Project:** `cuxzzpsyufcewtmicszk` (elevateforhumanity's Project)  
**New Project:** `elevate` (nano tier, AWS us-east-2)  
**Status:** 3 tables, 0 functions, 0 replicas

## Step 1: Get Project Details from Supabase

### 1.1 Get Project Reference ID

1. Go to: https://supabase.com/dashboard
2. Click on "elevate" project
3. Look at the URL: `https://supabase.com/dashboard/project/[PROJECT_REF]`
4. Copy the `[PROJECT_REF]` (should be something like `abcdefghijklmnop`)

### 1.2 Get API Keys

1. In "elevate" project, go to: Settings → API
2. Copy these values:

```
Project URL: https://[PROJECT_REF].supabase.co
anon public key: eyJhbGc...
service_role key: eyJhbGc... (⚠️ Keep secret!)
```

## Step 2: Update Local Configuration

### 2.1 Update .env File

```bash
# Edit .env file
nano .env

# Replace these values:
VITE_SUPABASE_URL=https://[NEW_PROJECT_REF].supabase.co
VITE_SUPABASE_ANON_KEY=[NEW_ANON_KEY]
SUPABASE_URL=https://[NEW_PROJECT_REF].supabase.co
SUPABASE_SERVICE_KEY=[NEW_SERVICE_ROLE_KEY]
```

### 2.2 Update netlify.toml

```bash
# Edit netlify.toml
nano netlify.toml

# Find and replace in [build.environment] section:
VITE_SUPABASE_URL = "https://[NEW_PROJECT_REF].supabase.co"
VITE_SUPABASE_ANON_KEY = "[NEW_ANON_KEY]"
```

### 2.3 Update Security Headers

In `netlify.toml`, find the CSP header and update Supabase URLs:

```toml
Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://[NEW_PROJECT_REF].supabase.co https://js.stripe.com; ... connect-src 'self' https://[NEW_PROJECT_REF].supabase.co wss://[NEW_PROJECT_REF].supabase.co ..."
```

## Step 3: Run Database Migrations

### 3.1 Apply Schema to New Project

```bash
# Set database URL
export DB_URL="postgres://postgres:[PASSWORD]@db.[NEW_PROJECT_REF].supabase.co:5432/postgres"

# Run migrations
bash scripts/autopilot_migrate.sh "$DB_URL"
```

### 3.2 Verify Tables Created

1. Go to: https://supabase.com/dashboard/project/[NEW_PROJECT_REF]/editor
2. Check these tables exist:
   - programs
   - courses
   - lessons
   - enrollments
   - lesson_progress
   - certificates
   - instructor_certificates
   - analytics_events
   - page_views
   - automation_workflows
   - automation_executions
   - generated_content
   - scholarship_applications
   - scholarship_reviews
   - stripe_accounts
   - stripe_splits

## Step 4: Update GitHub Secrets

### 4.1 Go to GitHub Repository Settings

```
https://github.com/elevateforhumanity/fix2/settings/secrets/actions
```

### 4.2 Update These Secrets

Click "Update" on each:

```
SUPABASE_PROJECT_REF = [NEW_PROJECT_REF]
SUPABASE_DB_URL = postgres://postgres:[PASSWORD]@db.[NEW_PROJECT_REF].supabase.co:5432/postgres
SUPABASE_SERVICE_ROLE_KEY = [NEW_SERVICE_ROLE_KEY]
```

## Step 5: Update Netlify Environment Variables

### 5.1 Go to Netlify Site Settings

```
https://app.netlify.com/sites/elevateforhumanityfix2/settings/env
```

### 5.2 Update These Variables

```
VITE_SUPABASE_URL = https://[NEW_PROJECT_REF].supabase.co
VITE_SUPABASE_ANON_KEY = [NEW_ANON_KEY]
```

## Step 6: Test Locally

```bash
# Install dependencies
pnpm install

# Test build
pnpm build

# Test locally
pnpm dev
```

Visit: http://localhost:5173

Test:
- Homepage loads
- Can view programs
- Can view courses
- No console errors

## Step 7: Commit and Deploy

```bash
# Add changes
git add .env netlify.toml

# Commit
git commit -m "chore: switch to elevate Supabase project

- Update project ref to new elevate project
- Update API keys and URLs
- Update security headers
- Ready for deployment"

# Push
git push origin main
```

## Step 8: Verify Deployment

### 8.1 Check Netlify Build

1. Go to: https://app.netlify.com/sites/elevateforhumanityfix2/deploys
2. Wait for build to complete
3. Check for errors

### 8.2 Test Live Site

```
https://www.elevateforhumanity.org
```

Test:
- Homepage loads
- Programs page works
- Courses page works
- No errors in browser console

## Step 9: Delete Old Project (Optional)

Once everything works with new project:

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
2. Settings → General → Delete Project
3. Confirm deletion

## Automated Script

I can create a script to automate this. Just provide:

1. **New Project Ref:** `_____________`
2. **New Anon Key:** `_____________`
3. **New Service Role Key:** `_____________`
4. **Database Password:** `_____________`

Then I'll:
- ✅ Update all config files
- ✅ Run migrations
- ✅ Test build
- ✅ Commit changes
- ✅ Update documentation

## Quick Checklist

- [ ] Get project ref from Supabase dashboard
- [ ] Get anon key from Settings → API
- [ ] Get service role key from Settings → API
- [ ] Get database password from Settings → Database
- [ ] Update .env file
- [ ] Update netlify.toml
- [ ] Run migrations
- [ ] Update GitHub secrets
- [ ] Update Netlify env vars
- [ ] Test locally
- [ ] Commit and push
- [ ] Verify deployment
- [ ] Delete old project

## Need Help?

Provide the 4 values above and I'll automate the entire process!

---

**Status:** Waiting for project details  
**Time:** 10-15 minutes to complete  
**Risk:** Low (can revert if issues)
