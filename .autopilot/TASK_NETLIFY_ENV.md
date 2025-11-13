# AUTOPILOT TASK: Configure Netlify Environment Variables

## PRIORITY: CRITICAL - BLOCKING DEPLOYMENT

## TASK SUMMARY
Retrieve Supabase credentials and add them to Netlify to fix build failures.

## WHAT WE HAVE
- Supabase Project URL: `https://cuxzzpsyufcewtmicszk.supabase.co`
- Supabase Anon Key: **NEEDS TO BE RETRIEVED**

## STEP 1: GET SUPABASE ANON KEY

### Action Required:
1. Go to: https://supabase.com/dashboard
2. Log in with Elevate for Humanity credentials
3. Select the project (URL: cuxzzpsyufcewtmicszk.supabase.co)
4. Navigate to: **Project Settings** → **API**
5. Copy the **anon public** key (long string starting with `eyJ...`)

### Expected Output:
A key that looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc...`

## STEP 2: ADD TO NETLIFY

### Action Required:
1. Go to: https://app.netlify.com
2. Log in with Elevate for Humanity credentials
3. Select the **fix2** site
4. Navigate to: **Site settings** → **Environment variables**
5. Add TWO variables:

#### Variable 1:
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://cuxzzpsyufcewtmicszk.supabase.co`
- **Scopes**: All (or Production + Deploy previews + Branch deploys)

#### Variable 2:
- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: [paste the anon key from Step 1]
- **Scopes**: All (or Production + Deploy previews + Branch deploys)

## STEP 3: TRIGGER NEW DEPLOY

### Action Required:
1. In Netlify, go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Wait for build to complete
4. Verify build succeeds (no Supabase client errors)

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
Once completed, confirm:
1. Anon key retrieved: YES/NO
2. Variables added to Netlify: YES/NO
3. New deploy triggered: YES/NO
4. Build successful: YES/NO
5. Deploy URL: [provide URL]
