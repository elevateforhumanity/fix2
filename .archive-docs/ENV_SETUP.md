# Environment Variables Setup Guide

## Required Variables

### Supabase Configuration

Get these from your Supabase project dashboard:

```bash
# Project URL - found in Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Anon/Public Key - found in Project Settings > API
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Service Role Key - found in Project Settings > API (keep secret!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Where to find:**

1. Go to [supabase.com](https://supabase.com)
2. Select your project
3. Click Settings (gear icon) > API
4. Copy the values

### Optional: Sentry Error Monitoring

```bash
# Sentry DSN - found in Sentry project settings
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# Sentry Auth Token - for source maps (create in Sentry)
SENTRY_AUTH_TOKEN=sntrys_xxx
```

**Setup:**

1. Create account at [sentry.io](https://sentry.io)
2. Create new Next.js project
3. Copy DSN from project settings
4. Generate auth token in Settings > Auth Tokens

### Optional: Analytics

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Setting Variables in Vercel

### Via Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Go to Settings > Environment Variables
4. Add each variable:
   - Key: Variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Value: The actual value
   - Environment: Select Production, Preview, Development as needed

### Via CLI

```bash
# Set a single variable
vercel env add NEXT_PUBLIC_SUPABASE_URL production

# Pull variables to local .env.local
vercel env pull .env.local
```

## Local Development Setup

Create `.env.local` in project root:

```bash
# Copy from .env.example
cp .env.example .env.local

# Edit with your values
nano .env.local
```

**Never commit `.env.local` to git!** It's already in `.gitignore`.

## Environment-Specific Variables

### Production

- Use production Supabase project
- Enable Sentry error tracking
- Use production analytics ID

### Preview/Staging

- Can use same Supabase project or separate staging project
- Optional: Use separate Sentry project
- Optional: Use separate analytics ID

### Development

- Use development Supabase project or production with caution
- Sentry optional
- Analytics optional

## Verification

After setting variables, verify they're loaded:

```bash
# In your app, check if variables are defined
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing');
```

Or use the Vercel CLI:

```bash
vercel env ls
```

## Security Notes

1. **Never expose service role key** - only use server-side
2. **NEXT*PUBLIC*\* variables are exposed** - don't put secrets there
3. **Rotate keys if compromised** - regenerate in Supabase
4. **Use different keys per environment** - don't share prod keys with dev

## Troubleshooting

### "Supabase client not initialized"

- Check `NEXT_PUBLIC_SUPABASE_URL` is set
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- Verify no typos in variable names

### "Auth not working"

- Verify Supabase URL is correct
- Check anon key is valid
- Ensure service role key is set for server operations

### "Variables not updating"

- Redeploy after changing variables in Vercel
- Clear browser cache
- Check correct environment (prod vs preview)

## Quick Setup Script

```bash
#!/bin/bash
# setup-env.sh

echo "Setting up environment variables..."

# Check if .env.local exists
if [ -f .env.local ]; then
  echo "⚠️  .env.local already exists"
  read -p "Overwrite? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 0
  fi
fi

# Create .env.local from template
cp .env.example .env.local

echo "✅ Created .env.local"
echo "📝 Edit .env.local with your values:"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   - SUPABASE_SERVICE_ROLE_KEY"
echo ""
echo "Run: nano .env.local"
```

Make executable: `chmod +x setup-env.sh`
