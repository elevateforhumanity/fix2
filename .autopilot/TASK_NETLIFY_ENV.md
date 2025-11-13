# AUTOPILOT TASK: Configure Netlify Environment Variables

## PRIORITY: CRITICAL - BLOCKING DEPLOYMENT

## TASK SUMMARY
Retrieve ALL Supabase credentials and environment variables, then add them to Netlify to fix build failures.

## WHAT WE HAVE
- Supabase Project URL: `https://cuxzzpsyufcewtmicszk.supabase.co`

## WHAT WE NEED
1. Supabase Anon Key (public key)
2. Supabase Service Role Key (server-side key)
3. Any other API keys or secrets configured in Supabase
4. Verify all environment variables needed for the application

## STEP 1: GET ALL SUPABASE CREDENTIALS

### Action Required:
1. Go to: https://supabase.com/dashboard
2. Log in with Elevate for Humanity credentials
3. Select the project (URL: cuxzzpsyufcewtmicszk.supabase.co)
4. Navigate to: **Project Settings** → **API**
5. Copy ALL of the following:

#### A. Project API Keys:
- **Project URL**: Should be `https://cuxzzpsyufcewtmicszk.supabase.co` (verify)
- **anon public key**: Long string starting with `eyJ...` (labeled "anon public")
- **service_role key**: Long string starting with `eyJ...` (labeled "service_role") - **KEEP SECRET**

#### B. Database Connection:
6. Navigate to: **Project Settings** → **Database**
7. Copy the **Connection String** (if needed for backend)
8. Note the **Database Password** (if you have it)

#### C. Storage & Auth Settings:
9. Navigate to: **Project Settings** → **Configuration**
10. Check for any additional API keys or secrets
11. Note any custom domain configurations

#### D. Third-Party Integrations:
12. Check if there are any configured integrations (Stripe, email services, etc.)
13. Document any API keys for these services

### Expected Output:
You should have collected:
- ✅ Project URL: `https://cuxzzpsyufcewtmicszk.supabase.co`
- ✅ Anon key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (public, safe for client)
- ✅ Service role key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (secret, server-only)
- ✅ Any other credentials found

## STEP 2: CHECK WHAT ELSE IS NEEDED

### Review Application Requirements:
1. Check `.env.local.example` file in the repository for all required variables
2. Check `NETLIFY_ENV_SETUP.md` for additional requirements
3. Common variables needed:
   - Supabase (URL, anon key, service role key)
   - Stripe (if payment processing is used)
   - Email service (if email notifications are configured)
   - Analytics (Google Analytics, etc.)
   - Any other third-party services

### Document Everything:
Create a list of ALL environment variables needed with their values.

## STEP 3: ADD EVERYTHING TO NETLIFY

### Action Required:
1. Go to: https://app.netlify.com
2. Log in with Elevate for Humanity credentials
3. Select the **fix2** site (or "elevateforhumanity/fix2")
4. Navigate to: **Site settings** → **Environment variables**
5. Add ALL required variables:

#### Required Variables (Minimum):

**Variable 1:**
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://cuxzzpsyufcewtmicszk.supabase.co`
- **Scopes**: All (Production + Deploy previews + Branch deploys)

**Variable 2:**
- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: [paste the anon public key from Step 1]
- **Scopes**: All (Production + Deploy previews + Branch deploys)

**Variable 3:**
- **Key**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: [paste the service_role key from Step 1]
- **Scopes**: Production only (NOT deploy previews - this is secret)

#### Additional Variables (if found):
Add any other variables discovered in Step 2, following the same pattern.

## STEP 4: PROVIDE CREDENTIALS TO DEVELOPER

### Action Required:
**IMPORTANT**: Before adding to Netlify, provide ALL credentials to the developer for review.

Create a secure document (use password-protected file or secure sharing service) with:

```
SUPABASE CREDENTIALS
====================
Project URL: https://cuxzzpsyufcewtmicszk.supabase.co
Anon Key: [paste here]
Service Role Key: [paste here]

DATABASE
========
Connection String: [if retrieved]
Database Password: [if available]

OTHER SERVICES
==============
[List any other API keys or credentials found]

NETLIFY ACCESS
==============
Site Name: [fix2 or actual site name]
Site URL: [current deploy URL]
Account: [account email used]
```

**Share this document securely with the developer before proceeding.**

## STEP 5: TRIGGER NEW DEPLOY

### Action Required:
1. After developer confirms credentials are correct
2. In Netlify, go to **Deploys** tab
3. Click **Trigger deploy** → **Clear cache and deploy site**
4. Wait for build to complete
5. Verify build succeeds (no Supabase client errors)

## VERIFICATION

### Success Criteria:
- ✅ Build completes without errors
- ✅ No "Supabase client URL and API key required" errors in logs
- ✅ Site deploys successfully

### If Build Still Fails:
1. Double-check variable names are EXACTLY: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Verify no extra spaces in values
3. Confirm variables are set for all scopes
4. Check deploy logs for specific error messages

## CREDENTIALS NEEDED

You will need access to:
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Netlify Dashboard**: https://app.netlify.com

If you don't have access, contact the project administrator.

## ESTIMATED TIME: 5-10 minutes

## REPORT BACK
Once completed, provide:

### Checklist:
- [ ] Supabase anon key retrieved
- [ ] Supabase service role key retrieved
- [ ] All other credentials documented
- [ ] Credentials shared securely with developer
- [ ] Developer confirmed credentials are correct
- [ ] All variables added to Netlify
- [ ] New deploy triggered
- [ ] Build completed successfully
- [ ] Site is live and functional

### Provide:
1. **Credentials Document**: Secure link or file with all credentials
2. **Netlify Site URL**: [provide production URL]
3. **Deploy Status**: SUCCESS/FAILED
4. **Build Log**: If failed, provide relevant error messages
5. **Total Variables Added**: [number]
6. **List of Variables**: [list all variable names added]

### Additional Information:
- Netlify account email used: [email]
- Supabase project name: [name]
- Any issues encountered: [describe]
- Time taken: [minutes]
