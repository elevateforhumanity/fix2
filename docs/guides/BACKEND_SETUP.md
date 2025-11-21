# Backend Setup Guide

This guide will help you get the backend (Supabase) fully functional.

## Prerequisites

- A Supabase account (free tier works)
- Supabase CLI installed
- Access to your Supabase project dashboard

## Step 1: Install Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Verify installation
supabase --version
```

## Step 2: Create or Link Supabase Project

### Option A: Create New Project (Recommended)

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in:
   - **Name**: elevate-for-humanity
   - **Database Password**: (choose a strong password)
   - **Region**: (choose closest to your users)
4. Wait for project to be created (~2 minutes)

### Option B: Use Existing Project

If you already have a Supabase project, skip to Step 3.

## Step 3: Get Your Credentials

From your Supabase project dashboard:

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`)

3. Go to **Settings** → **General**
4. Copy:
   - **Reference ID** (e.g., `xxxxx`)

## Step 4: Configure Environment Variables

Create a `.env` file in the project root:

```bash
cat > .env << 'EOF'
# Supabase Configuration
VITE_SUPABASE_URL=https://YOURPROJECTID.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here
SUPABASE_PROJECT_REF=your-project-ref-here

# Database Password (from project creation)
SUPABASE_DB_PASSWORD=your-database-password

# Optional: For local development
SUPABASE_ACCESS_TOKEN=your-access-token-here
EOF
```

**Replace the placeholder values with your actual credentials!**

## Step 5: Link Project to Supabase CLI

```bash
# Navigate to project root
cd /workspaces/fix2

# Link to your Supabase project
supabase link --project-ref YOUR_PROJECT_REF

# You'll be prompted for your database password
```

## Step 6: Apply Database Migrations

```bash
# Navigate to supabase directory
cd supabase

# Push all migrations to your database
supabase db push

# This will apply all 17 migration files in order
```

**Expected output:**

```
Applying migration 001_lms_schema.sql...
Applying migration 002_auth_instructor_certificates.sql...
...
Applying migration 007_autopilot_system.sql...
✓ All migrations applied successfully
```

## Step 7: Deploy Edge Functions

```bash
# Deploy all Edge Functions
supabase functions deploy autopilot-worker
supabase functions deploy autopilot-bridge
supabase functions deploy autopilot-ai-worker
supabase functions deploy autopilot-db-worker
supabase functions deploy autopilot-health-worker
supabase functions deploy ai-ops-analyzer
supabase functions deploy health-logger
supabase functions deploy metrics-exporter

# Or deploy all at once
for func in autopilot-worker autopilot-bridge autopilot-ai-worker autopilot-db-worker autopilot-health-worker ai-ops-analyzer health-logger metrics-exporter; do
  echo "Deploying $func..."
  supabase functions deploy $func
done
```

## Step 8: Set Edge Function Secrets

```bash
# Set required secrets for Edge Functions
supabase secrets set SUPABASE_SERVICE_KEY=your-service-role-key
supabase secrets set OPENAI_API_KEY=your-openai-key  # If using AI features
supabase secrets set GITHUB_TOKEN=your-github-token  # For autopilot system
```

## Step 9: Verify Database Setup

```bash
# Run verification queries
supabase db execute -f VERIFICATION_QUERIES.sql

# Or connect to database directly
supabase db connect
```

In the SQL editor, run:

```sql
-- Check if tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

-- Should show: programs, courses, lessons, users, enrollments, etc.
```

## Step 10: Test Backend Connectivity

```bash
# Rebuild the app with new environment variables
npm run build

# Run the app
npm run dev
```

Visit the app and try:

1. **Sign up** - Create a new account
2. **Login** - Test authentication
3. **Browse Programs** - Should load from database
4. **Enroll in Course** - Test database writes

## Step 11: Enable Row Level Security (RLS)

The migrations include RLS policies, but verify they're enabled:

```sql
-- In Supabase SQL Editor
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- All tables should have rowsecurity = true
```

## Troubleshooting

### Issue: "Cannot connect to database"

**Solution**: Check your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct

### Issue: "Migration failed"

**Solution**:

```bash
# Reset database (WARNING: deletes all data)
supabase db reset

# Then reapply migrations
supabase db push
```

### Issue: "Edge Function deployment failed"

**Solution**:

```bash
# Check function logs
supabase functions logs autopilot-worker

# Redeploy with verbose output
supabase functions deploy autopilot-worker --debug
```

### Issue: "RLS policy blocking access"

**Solution**: Check the `RLS_POLICIES.md` file for policy details

## Quick Start Script

Save this as `setup-backend.sh`:

```bash
#!/bin/bash
set -e

echo "🚀 Setting up Elevate for Humanity Backend..."

# Check if .env exists
if [ ! -f .env ]; then
  echo "❌ .env file not found. Please create it first!"
  exit 1
fi

# Load environment variables
source .env

# Link project
echo "🔗 Linking Supabase project..."
supabase link --project-ref $SUPABASE_PROJECT_REF

# Apply migrations
echo "📦 Applying database migrations..."
cd supabase
supabase db push

# Deploy Edge Functions
echo "🚀 Deploying Edge Functions..."
for func in autopilot-worker autopilot-bridge autopilot-ai-worker autopilot-db-worker autopilot-health-worker ai-ops-analyzer health-logger metrics-exporter; do
  echo "  Deploying $func..."
  supabase functions deploy $func || echo "  ⚠️  $func deployment failed (non-critical)"
done

cd ..

# Build app
echo "🔨 Building application..."
npm run build

echo "✅ Backend setup complete!"
echo ""
echo "Next steps:"
echo "1. Run 'npm run dev' to start the app"
echo "2. Visit the app and test authentication"
echo "3. Check Supabase dashboard for data"
```

Make it executable:

```bash
chmod +x setup-backend.sh
./setup-backend.sh
```

## What You Get After Setup

✅ **Full Database** - All tables, relationships, and indexes  
✅ **Authentication** - User signup, login, password reset  
✅ **Data Persistence** - All data saved to database  
✅ **Edge Functions** - Autopilot system, AI workers, health monitoring  
✅ **Real-time Updates** - Supabase real-time subscriptions  
✅ **Row Level Security** - Secure data access policies  
✅ **API Endpoints** - Auto-generated REST and GraphQL APIs

## Estimated Time

- **With existing Supabase project**: 15-20 minutes
- **Creating new project**: 25-30 minutes

## Support

If you encounter issues:

1. Check Supabase logs: https://app.supabase.com/project//logs
2. Review `RLS_POLICIES.md` for security policies
3. Check `VERIFICATION_QUERIES.sql` for database validation

---

**Ready to proceed?** Start with Step 1 and work through each step carefully.
