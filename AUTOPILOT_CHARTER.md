# Elevate DevOps Autopilot – Netlify & Supabase Guardian

## Charter Version: 1.0

**Last Updated**: 2025-01-15  
**Status**: Active  
**Owner**: Elevate for Humanity DevOps Team

---

## Primary Mission

Keep **elevateforhumanity.org** online and healthy by:

1. **Owning environment variables** for:
   - Netlify → build + runtime
   - GitHub Actions → secrets that feed Netlify
   - Supabase → URLs + keys

2. **Preventing bad deployment targets** from interfering:
   - No Vercel
   - No wrong site IDs
   - No wrong URLs

3. **Guarding critical connections**:
   - `NEXT_PUBLIC_SUPABASE_URL` must always point to the REAL Supabase project
   - Keys in GitHub Secrets must match keys in Netlify

4. **Running in "fix it, don't ask" mode**:
   - Detect → Compare → Correct → Redeploy
   - Only escalate to humans when something requires manual intervention (like missing secret values)

---

## Critical Rules

### ✅ ALLOWED

- Read and update Netlify environment variables
- Validate GitHub Secrets exist (names only, not values)
- Clear Netlify build cache
- Trigger Netlify production builds
- Remove Vercel configuration files
- Report missing secrets with clear instructions

### ❌ FORBIDDEN

- Change business logic, pages, or UI code
- Switch hosting platforms (Netlify is the ONLY deployment target)
- Create fake keys or invent secret values
- Call Vercel APIs or configure Vercel
- Silently ignore blocking problems
- Make large, risky changes

---

## Core Responsibilities

### 1. Netlify Environment Management

**Authentication**:

- Use `NETLIFY_AUTH_TOKEN` from GitHub Secrets
- Use `NETLIFY_SITE_ID` from GitHub Secrets
- If either is missing → STOP and report exactly which one

**Critical Variables to Enforce**:

| Variable                        | Required Value                             | Source                      |
| ------------------------------- | ------------------------------------------ | --------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | `https://cuxzzpsyufcewtmicszk.supabase.co` | Hardcoded                   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Value from GitHub Secret                   | `SUPABASE_ANON_KEY`         |
| `SUPABASE_SERVICE_ROLE_KEY`     | Value from GitHub Secret                   | `SUPABASE_SERVICE_ROLE_KEY` |
| `NEXT_PUBLIC_APP_URL`           | `https://elevateforhumanity.org`           | Hardcoded                   |
| `NEXT_PUBLIC_SITE_URL`          | `https://elevateforhumanity.org`           | Hardcoded                   |
| `NEXT_PUBLIC_BASE_URL`          | `https://elevateforhumanity.org`           | Hardcoded                   |
| `NODE_ENV`                      | `production`                               | Hardcoded                   |

**Behavior Per Variable**:

- **If missing** → Set to correct value
- **If different** → Overwrite with correct value
- **If correct** → Do nothing

**After Changes**:

1. Clear Netlify build cache (optional but recommended)
2. Trigger new production build via Netlify API
3. Output summary:
   - How many vars were corrected
   - How many were missing
   - Which ones are still manual

---

### 2. GitHub Secrets Validation

**Required Secrets** (must exist in repository):

- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

**Validation Process**:

1. List all secret names (not values)
2. Check each required secret exists
3. If any are missing:
   - Do NOT invent values
   - Mark workflow as failed/warning
   - Print clear human instruction:
     ```
     ❌ Missing GitHub Secret: SUPABASE_SERVICE_ROLE_KEY
     → Add from Supabase dashboard → Settings → API → service_role key
     ```

**Optional Checks**:

- Compare `NEXT_PUBLIC_SUPABASE_URL` in repo `.env.production` with Supabase project URL
- Warn if repo config is wrong

---

### 3. Deployment Target Protection

**Purpose**: Ensure only Netlify is the deploy host

**Checks**:

1. **Vercel Integration**:
   - Detect if Vercel is still connected to repo
   - Remind to disconnect in Vercel UI if detected

2. **Dangerous Configs in Repo**:
   - Look for:
     - `vercel.json`
     - `.vercel/` folder
     - Vercel references in GitHub Actions
   - If found:
     - Fail the check
     - Print: `"Vercel config found, remove before next deploy: [path]"`

3. **Netlify Primary**:
   - Confirm Netlify deployment workflow exists
   - Explain which deploy pipeline is active

---

### 4. Error Handling and Reporting

**Never Silently Ignore**:

- Problems that block production
- Missing required secrets
- Failed Netlify API calls

**When Blocked**:

1. Stop further destructive actions
2. Print short, clear, non-technical summary
3. Include:
   - What you checked
   - What you changed
   - What is still blocking deployment

**Example Output**:

```
✅ Checked: 7 environment variables
✅ Fixed: 3 variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_APP_URL, NODE_ENV)
✅ Correct: 4 variables
❌ Blocking: Missing GitHub Secret NETLIFY_AUTH_TOKEN
   → Add from Netlify dashboard → User settings → Applications → Personal access tokens
```

---

## Execution Mode

**Assumptions**:

- Allowed to run shell commands inside repo
- Can call Netlify CLI and APIs
- Has access to GitHub Secrets (names only)

**Preferences**:

- Small, focused fixes over large, risky changes
- Idempotent operations (safe to run multiple times)
- Clear, actionable error messages

**Success Criteria**:
After autopilot runs, **elevateforhumanity.org** should:

- Build successfully on Netlify
- Load without Internal Server Error
- Connect to correct Supabase project
- Display correct environment-specific URLs

---

## Workflow Triggers

### Manual Trigger

```yaml
workflow_dispatch:
  inputs:
    force_redeploy:
      description: 'Force Netlify redeploy even if no changes'
      required: false
      default: 'false'
```

### Automatic Triggers (Optional)

- On push to `main` branch (if enabled)
- Nightly cron for validation (if enabled)
- After failed deployment (if enabled)

---

## Integration Points

### Netlify CLI Commands

```bash
# Authenticate
netlify login --auth $NETLIFY_AUTH_TOKEN

# List environment variables
netlify env:list --site $NETLIFY_SITE_ID

# Get specific variable
netlify env:get VAR_NAME --site $NETLIFY_SITE_ID

# Set variable
netlify env:set VAR_NAME "value" --site $NETLIFY_SITE_ID

# Trigger build
curl -X POST "https://api.netlify.com/api/v1/sites/$NETLIFY_SITE_ID/builds" \
  -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN"
```

### GitHub API Commands

```bash
# List secrets (names only)
gh secret list

# Check if secret exists
gh secret list | grep SECRET_NAME
```

### Supabase References

- **Project URL**: `https://cuxzzpsyufcewtmicszk.supabase.co`
- **Dashboard**: `https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk`
- **API Keys Location**: Settings → API

---

## Escalation Path

### Level 1: Autopilot Fixes Automatically

- Wrong environment variable values
- Missing environment variables (with known values)
- Stale build cache
- Incorrect NODE_ENV

### Level 2: Autopilot Reports, Human Fixes

- Missing GitHub Secrets (unknown values)
- Netlify authentication failures
- Supabase connection issues
- Vercel still connected to repo

### Level 3: Human Investigation Required

- Repeated build failures after fixes
- Supabase project URL changed
- Netlify site ID changed
- Fundamental architecture changes needed

---

## Monitoring and Alerts

### Success Metrics

- ✅ All environment variables correct
- ✅ All GitHub Secrets present
- ✅ No Vercel configuration detected
- ✅ Netlify build successful
- ✅ Production site loads without errors

### Failure Alerts

- ❌ Missing required GitHub Secret
- ❌ Netlify API authentication failed
- ❌ Environment variable sync failed
- ❌ Vercel configuration detected
- ❌ Production build failed

---

## Version History

### v1.0 (2025-01-15)

- Initial charter
- Netlify environment guardian
- GitHub secrets validation
- Deployment target protection
- Error handling and reporting

---

## Related Documents

- `AUTOPILOT_NETLIFY_GUARDIAN.yml` - Netlify environment worker
- `AUTOPILOT_SECRETS_VALIDATOR.yml` - GitHub secrets worker
- `AUTOPILOT_DEPLOYMENT_BOUNCER.yml` - Deployment target worker
- `NETLIFY_DEPLOYMENT.md` - Manual deployment guide
- `VERCEL_CLEANUP.md` - Vercel removal instructions

---

## Support

**Questions or Issues?**

1. Check workflow logs in GitHub Actions
2. Review error messages in autopilot output
3. Consult related documentation
4. Escalate to DevOps team if blocked

**Emergency Override**:
If autopilot is causing issues, disable workflows:

```bash
# Disable all autopilot workflows
gh workflow disable autopilot-netlify-guardian.yml
gh workflow disable autopilot-secrets-validator.yml
gh workflow disable autopilot-deployment-bouncer.yml
```

---

**End of Charter**
