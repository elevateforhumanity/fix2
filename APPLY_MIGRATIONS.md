# Apply Program Holder Document Migrations

**Status:** Migrations created but not yet applied to production database

## Migrations to Apply

1. `supabase/migrations/20251222_program_holder_documents.sql`
   - Creates `program_holder_documents` table
   - Adds RLS policies
   - Creates indexes

2. `supabase/migrations/20251222_program_holder_documents_storage.sql`
   - Creates `program-holder-documents` storage bucket
   - Adds storage policies

## How to Apply

### Option 1: Supabase Dashboard (Recommended)

1. Log into Supabase Dashboard: https://supabase.com/dashboard
2. Select the project
3. Go to SQL Editor
4. Copy and paste the contents of each migration file
5. Run each migration in order
6. Verify tables exist in Table Editor

### Option 2: Supabase CLI

```bash
# Install Supabase CLI if not installed
npm install -g supabase

# Link to project
supabase link --project-ref YOUR_PROJECT_REF

# Apply migrations
supabase db push
```

### Option 3: Direct SQL Connection

```bash
# Connect to database
psql "postgresql://postgres:[PASSWORD]@db.cuxzzpsyufcewtmicszk.supabase.co:5432/postgres"

# Run migrations
\i supabase/migrations/20251222_program_holder_documents.sql
\i supabase/migrations/20251222_program_holder_documents_storage.sql
```

## Verification

After applying migrations, verify:

```sql
-- Check table exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'program_holder_documents';

-- Check RLS policies
SELECT policyname FROM pg_policies 
WHERE tablename = 'program_holder_documents';

-- Check storage bucket
SELECT id, name, public FROM storage.buckets 
WHERE id = 'program-holder-documents';
```

Expected results:
- 17 columns in program_holder_documents table
- 4 RLS policies
- 1 storage bucket (private)

## After Migration

Once migrations are applied:
1. Test document upload at /program-holder/documents
2. Test admin review at /admin/program-holder-documents
3. Run full verification checklist: PROGRAM_HOLDER_VERIFICATION_CHECKLIST.md
