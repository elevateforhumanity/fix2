# Database Migration Guide - Elevate For Humanity

## Prerequisites

1. **Supabase Account:** Sign up at https://supabase.com
2. **Project Created:** Create a new Supabase project
3. **Credentials:** Get your project URL and keys from Settings > API

## Step 1: Update Environment Variables

After creating your Supabase project, update `.env.local`:

```bash
# Get these from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key
```

## Step 2: Apply Migrations in Order

Go to your Supabase Dashboard > SQL Editor and run these files **in order**:

### Core Schema (Run First)
```sql
-- 1. Base schema with programs, courses, lessons
supabase-schema.sql
```

### Compliance & Tracking
```sql
-- 2. WIOA compliance tables
migrations/002_wioa_compliance_tables.sql

-- 3. Employment outcomes and credentials
migrations/003_employment_outcomes_credentials.sql
```

### Assessment System
```sql
-- 4. Quiz and assessment engine
migrations/004_quiz_assessment_engine.sql

-- 5. Advanced assessments
migrations/20251118_advanced_assessments.sql

-- 6. Gradebook system
migrations/20251118_gradebook.sql
```

### Security & Monitoring
```sql
-- 7. Unauthorized access tracking
migrations/005_unauthorized_access_tracking.sql

-- 8. Audit logs
migrations/20251118_audit_logs.sql

-- 9. Audit logs for portals
migrations/20251118_audit_logs_portals.sql
```

### Features
```sql
-- 10. Social and gamification
migrations/20251118_social_gamification.sql

-- 11. AI features
migrations/20251118_ai_features.sql

-- 12. SCORM support
migrations/20251118_scorm.sql

-- 13. LTI and help system
migrations/20251118_lti_and_help.sql

-- 14. Billing and WIOA
migrations/20251118_billing_and_wioa.sql

-- 15. GDPR/FERPA compliance
migrations/20251118_gdpr_ferpa.sql
```

### Enterprise Features
```sql
-- 16. Enterprise features (if needed)
migrations/enterprise_features_fixed.sql

-- 17. 100% feature parity
migrations/100_PERCENT_FEATURE_PARITY.sql
```

### Fixes
```sql
-- 18. Fix programs status
migrations/20251118_fix_programs_status.sql
```

## Step 3: Seed Initial Data

After migrations, run the seed file:

```sql
-- Seed programs and initial data
supabase-schema.sql  -- (if not already run, contains seed data)
```

Or use one of the specialized seed files:

```sql
-- Simple seed with basic programs
SIMPLE_SEED.sql

-- Complete seed with all programs
COMPLETE_DATABASE_SEED.sql

-- Working seed (tested)
WORKING_SEED.sql
```

## Step 4: Verify Tables Created

Run this query to check all tables:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Expected tables:
- programs
- courses
- lessons
- modules
- enrollments
- quizzes
- quiz_questions
- quiz_attempts
- achievements
- user_progress
- certificates
- assignments
- grades
- audit_logs
- wioa_participants
- employment_outcomes
- credentials
- (and many more...)

## Step 5: Set Up Storage Buckets

In Supabase Dashboard > Storage, create these buckets:

1. **course-content** - For course materials (videos, PDFs, etc.)
2. **user-uploads** - For student submissions
3. **certificates** - For generated certificates
4. **profile-images** - For user avatars

### Storage Policies

For each bucket, add these policies:

**Public Read (for course-content):**
```sql
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-content');
```

**Authenticated Upload (for user-uploads):**
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'user-uploads' AND auth.role() = 'authenticated');
```

## Step 6: Test Database Connection

Run this command to test your connection:

```bash
pnpm run check:db
```

Or create a test file:

```typescript
// test-supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testConnection() {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .limit(5);
  
  if (error) {
    console.error('❌ Database connection failed:', error);
  } else {
    console.log('✅ Database connected! Found', data.length, 'programs');
    console.log(data);
  }
}

testConnection();
```

Run with: `npx tsx test-supabase.ts`

## Common Issues

### Issue: "relation does not exist"
**Solution:** Make sure you ran the migrations in order. Some tables depend on others.

### Issue: "permission denied"
**Solution:** Check your RLS (Row Level Security) policies. You may need to add policies for authenticated users.

### Issue: "duplicate key value"
**Solution:** You're trying to seed data that already exists. Either drop the tables or skip the seed step.

## Quick Start Script

Create this file to run all migrations at once:

```bash
#!/bin/bash
# run-all-migrations.sh

echo "🚀 Running all migrations..."

# Array of migration files in order
migrations=(
  "supabase-schema.sql"
  "migrations/002_wioa_compliance_tables.sql"
  "migrations/003_employment_outcomes_credentials.sql"
  "migrations/004_quiz_assessment_engine.sql"
  "migrations/20251118_advanced_assessments.sql"
  "migrations/20251118_gradebook.sql"
  "migrations/005_unauthorized_access_tracking.sql"
  "migrations/20251118_audit_logs.sql"
  "migrations/20251118_audit_logs_portals.sql"
  "migrations/20251118_social_gamification.sql"
  "migrations/20251118_ai_features.sql"
  "migrations/20251118_scorm.sql"
  "migrations/20251118_lti_and_help.sql"
  "migrations/20251118_billing_and_wioa.sql"
  "migrations/20251118_gdpr_ferpa.sql"
  "migrations/20251118_fix_programs_status.sql"
)

for migration in "${migrations[@]}"; do
  if [ -f "$migration" ]; then
    echo "📝 Applying: $migration"
    # You would use Supabase CLI here:
    # supabase db push --file "$migration"
  else
    echo "⚠️  File not found: $migration"
  fi
done

echo "✅ All migrations applied!"
```

## Using Supabase CLI (Alternative Method)

If you have Supabase CLI installed:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Apply migrations
supabase db push

# Or apply specific file
supabase db push --file migrations/002_wioa_compliance_tables.sql
```

## Next Steps

After migrations are applied:

1. ✅ Update `.env.local` with real Supabase credentials
2. ✅ Run `pnpm run check:db` to verify connection
3. ✅ Seed initial data
4. ✅ Test authentication flow
5. ✅ Test course enrollment
6. ✅ Verify LMS functionality

## Support

If you encounter issues:
1. Check Supabase logs in Dashboard > Logs
2. Verify all environment variables are set
3. Ensure migrations ran in correct order
4. Check RLS policies are configured

---

**Last Updated:** December 6, 2024
