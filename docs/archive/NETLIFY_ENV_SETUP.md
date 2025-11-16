# Netlify Environment Variables Setup

## Instructions for Workers

### Required Environment Variables

The following environment variables must be added to Netlify for the build to succeed:

1. `NEXT_PUBLIC_SUPABASE_URL`
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Steps to Retrieve Values from Supabase

1. **Log in to Supabase Dashboard**
   - Go to: https://supabase.com/dashboard

2. **Select the Project**
   - Choose the "Elevate for Humanity" or relevant project

3. **Navigate to API Settings**
   - Click on "Project Settings" (gear icon in sidebar)
   - Click on "API" in the settings menu
   - Or go directly to: https://supabase.com/dashboard/project/_/settings/api

4. **Copy the Required Values**
   - **Project URL**: Copy the URL shown under "Project URL" section
     - Format: `https://[project-ref].supabase.co`
     - This will be the value for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key**: Copy the key shown under "Project API keys" → "anon public"
     - This is a long string starting with `eyJ...`
     - This will be the value for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Steps to Add Variables to Netlify

1. **Log in to Netlify Dashboard**
   - Go to: https://app.netlify.com

2. **Select the Site**
   - Choose the "fix2" or relevant site

3. **Navigate to Environment Variables**
   - Click on "Site settings" in the top navigation
   - Click on "Environment variables" in the left sidebar
   - Or: Deploys → Environment → Environment variables

4. **Add Each Variable**
   - Click "Add a variable" or "Add environment variable"
   - For the first variable:
     - Key: `NEXT_PUBLIC_SUPABASE_URL`
     - Value: [paste the Project URL from Supabase]
     - Scopes: Select "All" or "Production" and "Deploy previews"
   - Click "Create variable"
   - For the second variable:
     - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - Value: [paste the anon public key from Supabase]
     - Scopes: Select "All" or "Production" and "Deploy previews"
   - Click "Create variable"

5. **Trigger a New Deploy**
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Clear cache and deploy site"
   - Or push a new commit to trigger automatic deployment

### Verification

After adding the variables and triggering a new deploy:

- The build should complete successfully
- Check the deploy logs to confirm no Supabase client errors
- The site should be able to connect to Supabase at runtime

### Security Notes

- These are **public** keys (prefixed with `NEXT_PUBLIC_`) and are safe to expose in the browser
- Do NOT share the `service_role` key - that should only be used server-side if needed
- The `anon` key has Row Level Security (RLS) policies applied, so it's safe for client-side use

### Troubleshooting

If the build still fails after adding variables:

1. Verify the variable names are exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Check that there are no extra spaces in the values
3. Ensure the variables are set for the correct scopes (Production + Deploy previews)
4. Try clearing the cache and redeploying
5. Check the Netlify deploy logs for specific error messages
