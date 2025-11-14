# Add GitHub Secrets for Autopilot

## Found Keys in Repository:

### ✅ SUPABASE_ANON_KEY (Found)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ
```

### ❌ SUPABASE_SERVICE_ROLE_KEY (Need to get)
Get from: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api

## Add to GitHub Secrets

Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions

### Click "New repository secret" and add each:

1. **Name:** `SUPABASE_ANON_KEY`
   **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ`

2. **Name:** `SUPABASE_SERVICE_ROLE_KEY`
   **Value:** [Get from Supabase Dashboard]

3. **Name:** `NETLIFY_AUTH_TOKEN`
   **Value:** [Get from https://app.netlify.com/user/applications]

4. **Name:** `NETLIFY_SITE_ID`
   **Value:** [Get from Netlify site settings]

## Or Use GitHub CLI:

```bash
# Add SUPABASE_ANON_KEY
gh secret set SUPABASE_ANON_KEY --body "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ"

# Add SUPABASE_SERVICE_ROLE_KEY (get from Supabase first)
gh secret set SUPABASE_SERVICE_ROLE_KEY --body "YOUR_SERVICE_ROLE_KEY"

# Add NETLIFY_AUTH_TOKEN
gh secret set NETLIFY_AUTH_TOKEN --body "YOUR_NETLIFY_TOKEN"

# Add NETLIFY_SITE_ID
gh secret set NETLIFY_SITE_ID --body "YOUR_SITE_ID"
```

## Then Run Autopilot

Once secrets are added, run:
https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-fix-netlify-api.yml

Click "Run workflow" and it will automatically set all Netlify environment variables!
