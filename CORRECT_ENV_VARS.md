# CORRECT ENVIRONMENT VARIABLES FOR NETLIFY

## ⚠️ CRITICAL: Someone set the wrong Supabase URL in Netlify!

The site is crashing because `NEXT_PUBLIC_SUPABASE_URL` is pointing to the website itself instead of the Supabase project.

## CORRECT VALUES (Set these in Netlify):

```bash
# SUPABASE - CORRECT URL
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co

# NOT THIS (WRONG):
# NEXT_PUBLIC_SUPABASE_URL=https://elevateconnectsdirectory.org  ❌

# SUPABASE KEYS (Get from Supabase Dashboard)
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key-from-supabase]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key-from-supabase]

# SITE URLS
NEXT_PUBLIC_APP_URL=https://elevateconnectsdirectory.org
NEXT_PUBLIC_SITE_URL=https://elevateconnectsdirectory.org
NEXT_PUBLIC_BASE_URL=https://elevateconnectsdirectory.org

# NODE
NODE_ENV=production
```

## How to Fix in Netlify:

1. Go to: https://app.netlify.com/sites/[your-site-id]/settings/deploys#environment
2. Find `NEXT_PUBLIC_SUPABASE_URL`
3. Change it from `https://elevateconnectsdirectory.org` to `https://cuxzzpsyufcewtmicszk.supabase.co`
4. Click Save
5. Trigger new deploy

## Get Supabase Keys:

https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api

- Copy "anon public" key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy "service_role" key → `SUPABASE_SERVICE_ROLE_KEY`
