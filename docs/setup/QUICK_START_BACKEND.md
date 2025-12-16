# Quick Start: Get Backend Working in 10 Minutes

## Option 1: Interactive Setup (Recommended)

```bash
./setup-backend-interactive.sh
```

This script will:

1. ✅ Prompt you for Supabase credentials
2. ✅ Link your Supabase project
3. ✅ Apply all database migrations
4. ✅ Deploy Edge Functions
5. ✅ Build the application

**Time**: ~10 minutes

## Option 2: Manual Setup

### Step 1: Get Supabase Credentials (2 minutes)

1. Go to https://app.supabase.com
2. Create a new project or select existing
3. Go to **Settings** → **API**
4. Copy:
   - Project URL
   - anon/public key
   - service_role key
   - Project Reference ID

### Step 2: Configure Environment (1 minute)

```bash
cat > .env << 'EOF'
VITE_SUPABASE_URL=https://YOURPROJECTID.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here
SUPABASE_PROJECT_REF=your-project-ref-here
EOF
```

### Step 3: Setup Database (5 minutes)

```bash
# Link project
npx supabase link --project-ref YOUR_PROJECT_REF

# Apply migrations
cd supabase
npx supabase db push
cd ..
```

### Step 4: Deploy Functions (2 minutes)

```bash
cd supabase
npx supabase functions deploy autopilot-worker
npx supabase functions deploy autopilot-bridge
cd ..
```

### Step 5: Build & Run

```bash
npm run build
npm run dev
```

## Option 3: Use Existing Supabase Project

If you already have a Supabase project with data:

```bash
# Just configure credentials
cat > .env << 'EOF'
VITE_SUPABASE_URL=your-existing-url
VITE_SUPABASE_ANON_KEY=your-existing-key
SUPABASE_SERVICE_KEY=your-service-key
EOF

# Build and run
npm run build
npm run dev
```

## Verify It's Working

1. **Start the app**: `npm run dev`
2. **Visit**: http://localhost:3000
3. **Test**:
   - Click "Sign Up" → Create account
   - Check Supabase dashboard → Should see new user
   - Browse programs → Should load from database

## Troubleshooting

### "Cannot connect to database"

```bash
# Check credentials
cat .env

# Test connection
npx supabase db execute --sql "SELECT 1"
```

### "Migration failed"

```bash
# Reset and retry
npx supabase db reset
cd supabase && npx supabase db push
```

### "Edge Function not working"

```bash
# Check logs
npx supabase functions logs autopilot-worker

# Redeploy
cd supabase
npx supabase functions deploy autopilot-worker --debug
```

## What You Get

After setup, your backend will have:

✅ **17 Database Tables** - Programs, courses, users, enrollments, etc.  
✅ **8 Edge Functions** - Autopilot workers, AI analyzers, health monitors  
✅ **Row Level Security** - Secure data access policies  
✅ **Real-time Subscriptions** - Live data updates  
✅ **Auto-generated APIs** - REST and GraphQL endpoints  
✅ **Authentication** - Email/password, OAuth, magic links

## Need Help?

- **Detailed Guide**: See `BACKEND_SETUP.md`
- **Supabase Docs**: https://supabase.com/docs
- **Check Logs**: `npx supabase functions logs <function-name>`
- **Database Console**: https://app.supabase.com/project//editor

---

**Ready?** Run `./setup-backend-interactive.sh` to get started!
