# Supabase Configuration Guide

## Current Status

### ✅ Environment Variables Configured

All Supabase environment variables are set in Netlify:

- `SUPABASE_URL` - Project URL
- `SUPABASE_ANON_KEY` - Public anonymous key
- `SUPABASE_SERVICE_KEY` - Service role key (full access)
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (alias)
- `SUPABASE_SECRET_KEY` - Secret key
- `SUPABASE_PUBLISHABLE_KEY` - Publishable key
- `SUPABASE_JWT_SECRET` - JWT secret for token verification
- `SUPABASE_DATABASE_URL` - Direct database connection
- `VITE_SUPABASE_URL` - Frontend URL
- `VITE_SUPABASE_ANON_KEY` - Frontend anonymous key

### ✅ Database Schema

The following tables are defined in migrations:

**Core LMS Tables**:

- `programs` - Course programs/tracks
- `courses` - Individual courses
- `lessons` - Course lessons/modules
- `enrollments` - Student enrollments
- `lesson_progress` - Student progress tracking
- `quiz_questions` - Quiz questions
- `quiz_responses` - Student quiz responses
- `certificates` - Course completion certificates

**User Management**:

- `profiles` - User profiles
- `notifications` - User notifications
- `notification_preferences` - Notification settings

**Analytics**:

- `analytics_events` - Event tracking

**Automation**:

- `automation.admin_users` - Admin users
- `automation.health_log` - System health logs
- `automation.tasks` - Automation tasks
- `automation.task_edges` - Task dependencies

### ✅ Row Level Security (RLS)

All tables have RLS policies configured. See `supabase/RLS_POLICIES.md` for details.

## Database Migrations

### Available Migrations

Located in `supabase/migrations/`:

1. `001_lms_schema.sql` - Core LMS schema
2. `002_auth_instructor_certificates.sql` - Auth and certificates
3. `003_analytics_events.sql` - Analytics tracking
4. `004_add_missing_rls_policies.sql` - Comprehensive RLS
5. `004_analytics_rls.sql` - Analytics RLS
6. `005_notifications.sql` - Notification system
7. `006_add_funding_type.sql` - Funding types
8. `007_autopilot_system.sql` - Autopilot automation
9. `20250127000000_autopilot_logging.sql` - Autopilot logging
10. `20250127000001_autopilot_phase4_dashboard.sql` - Dashboard
11. `20250127_create_automation_tables.sql` - Automation tables
12. `20250127_create_generated_content.sql` - Content generation
13. `20250127_create_scholarship_applications.sql` - Scholarships
14. `20250127_create_stripe_split_tables.sql` - Stripe splits
15. `20250128000000_alerting_rules.sql` - Alerting system
16. `20250128000001_performance_profiling.sql` - Performance monitoring

### All-in-One Migration

`ALL_IN_ONE__paste_into_dashboard.sql` - Complete schema in one file

## How to Apply Migrations

### Option 1: Supabase Dashboard (Recommended)

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
2. Click "SQL Editor" in left sidebar
3. Click "New query"
4. Copy contents of `supabase/migrations/ALL_IN_ONE__paste_into_dashboard.sql`
5. Paste into editor
6. Click "Run"

### Option 2: Individual Migrations

Run each migration file in order:

1. Go to SQL Editor
2. For each file in `supabase/migrations/` (in order):
   - Copy file contents
   - Paste into new query
   - Run

### Option 3: Supabase CLI (If installed)

```bash
# Link to project
supabase link --project-ref cuxzzpsyufcewtmicszk

# Apply all migrations
supabase db push
```

## Authentication Configuration

### Current Setup

- **Provider**: Supabase Auth
- **JWT Secret**: Configured in environment variables
- **Anon Key**: Public access key for client-side
- **Service Key**: Full access key for server-side

### Recommended Auth Settings

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/users
2. Configure:
   - **Email Auth**: Enable
   - **Email Confirmations**: Enable (recommended)
   - **Password Requirements**: Minimum 8 characters
   - **JWT Expiry**: 3600 seconds (1 hour)
   - **Refresh Token Rotation**: Enable

### Social Auth (Optional)

Configure in: Authentication > Providers

- Google OAuth
- GitHub OAuth
- Facebook OAuth

## Storage Configuration

### Buckets to Create

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets

2. Create these buckets:
   - `course-materials` - Course files, videos, PDFs
   - `user-uploads` - Student submissions, profile pictures
   - `certificates` - Generated certificates
   - `generated-content` - AI-generated content

3. Configure bucket policies:

   ```sql
   -- Allow authenticated users to upload to user-uploads
   create policy "Users can upload own files"
   on storage.objects for insert
   to authenticated
   with check (bucket_id = 'user-uploads' and auth.uid()::text = (storage.foldername(name))[1]);

   -- Allow public read of course materials
   create policy "Public can view course materials"
   on storage.objects for select
   to public
   using (bucket_id = 'course-materials');
   ```

## API Settings

### Current Configuration

- **URL**: https://cuxzzpsyufcewtmicszk.supabase.co
- **Anon Key**: Configured
- **Service Role Key**: Configured

### API Settings to Verify

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api

2. Check:
   - **Auto API Documentation**: Enabled
   - **GraphQL**: Enabled (optional)
   - **Realtime**: Enabled for tables that need it

### Enable Realtime (Optional)

For tables that need real-time updates:

```sql
alter publication supabase_realtime add table notifications;
alter publication supabase_realtime add table lesson_progress;
```

## Database Functions

### Existing Functions

Check `supabase/functions/` directory for Edge Functions:

- Custom business logic
- Scheduled tasks
- Webhooks

### Deploy Edge Functions

```bash
# Deploy all functions
supabase functions deploy

# Deploy specific function
supabase functions deploy function-name
```

## Security Checklist

### ✅ Completed

- [x] Environment variables configured
- [x] RLS policies defined
- [x] JWT secret configured
- [x] Service role key secured

### ⏳ To Verify in Dashboard

- [ ] RLS enabled on all tables
- [ ] Auth settings configured
- [ ] Storage buckets created
- [ ] API rate limiting configured
- [ ] Database backups enabled

## Testing Supabase Connection

### Test from Netlify Function

The `health-check` function tests Supabase connectivity:

```bash
curl https://elevateforhumanityfix2.netlify.app/api/health-check
```

### Test from Frontend

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Test query
const { data, error } = await supabase.from('programs').select('*').limit(1);

console.log(data, error);
```

## Monitoring & Logs

### Database Logs

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/logs/postgres-logs
2. Monitor:
   - Slow queries
   - Errors
   - Connection issues

### API Logs

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/logs/edge-logs
2. Monitor:
   - API requests
   - Function invocations
   - Errors

## Backup & Recovery

### Automatic Backups

Supabase provides automatic daily backups.

### Manual Backup

```bash
# Export database
pg_dump -h db.cuxzzpsyufcewtmicszk.supabase.co -U postgres -d postgres > backup.sql
```

### Restore from Backup

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/database/backups
2. Select backup
3. Click "Restore"

## Performance Optimization

### Indexes

Check `supabase/migrations/` for index definitions:

- `idx_courses_program_id` - Course lookups
- `idx_lessons_course_id_idx` - Lesson queries
- Additional indexes in migration files

### Query Optimization

Use the SQL Editor to:

1. Run `EXPLAIN ANALYZE` on slow queries
2. Add indexes where needed
3. Optimize RLS policies

## Troubleshooting

### Connection Issues

- Verify `SUPABASE_URL` is correct
- Check API keys are valid
- Ensure RLS policies allow access

### Authentication Issues

- Check JWT secret matches
- Verify user exists in auth.users
- Check RLS policies for user's role

### Function Errors

- Check function logs in dashboard
- Verify environment variables
- Test with service role key

## Next Steps

1. **Apply Migrations**:
   - Run `ALL_IN_ONE__paste_into_dashboard.sql` in SQL Editor

2. **Configure Auth**:
   - Set up email templates
   - Configure password requirements
   - Enable social providers (optional)

3. **Create Storage Buckets**:
   - course-materials
   - user-uploads
   - certificates
   - generated-content

4. **Test Connection**:
   - Run health check function
   - Test from frontend
   - Verify RLS policies

5. **Enable Monitoring**:
   - Set up alerts
   - Monitor logs
   - Track performance

## Support Links

- **Dashboard**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
- **SQL Editor**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql
- **Auth Settings**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/users
- **Storage**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets
- **API Settings**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
- **Logs**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/logs

---

**Status**: Environment configured, migrations ready to apply
**Next Action**: Apply migrations in Supabase dashboard
