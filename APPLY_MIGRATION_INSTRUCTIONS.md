# How to Apply the Verification Migration

## ❌ What NOT to Do

**DO NOT** copy/paste from the documentation files into SQL editor. Files like:

- `VERIFICATION_SYSTEM_COMPLETE.md`
- `SETUP_VERIFICATION.md`
- `PROGRAM_HOLDER_ONBOARDING_SYSTEM.md`

These are **documentation**, not SQL.

## ✅ What TO Do

### Option 1: Use the Shell Script (Recommended)

```bash
./apply-verification-migration.sh
```

This script will:

1. Check if Supabase CLI is installed
2. Apply the migration file
3. Show success/error messages

### Option 2: Use Supabase CLI Directly

```bash
supabase db push
```

This applies all pending migrations in `/supabase/migrations/`

### Option 3: Apply Manually via Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the contents of **THIS FILE ONLY**:
   ```
   /workspaces/fix2/supabase/migrations/20241223_program_holder_verification.sql
   ```
5. Paste into SQL editor
6. Click **Run**

### Option 4: Apply via psql

```bash
psql "postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:5432/postgres" \
  -f supabase/migrations/20241223_program_holder_verification.sql
```

## 🔍 Verify Migration Applied

After applying, check that tables exist:

```sql
-- Check tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN (
  'program_holder_documents',
  'program_holder_banking',
  'program_holder_verification'
);

-- Check storage bucket exists
SELECT * FROM storage.buckets WHERE id = 'program-holder-documents';

-- Check RLS policies exist
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE tablename IN (
  'program_holder_documents',
  'program_holder_banking',
  'program_holder_verification'
);
```

## 🐛 Troubleshooting

### Error: "syntax error at or near -"

**Cause**: You copied from a markdown documentation file instead of the SQL file.

**Solution**: Use the actual SQL file at:

```
supabase/migrations/20241223_program_holder_verification.sql
```

### Error: "relation already exists"

**Cause**: Tables already created.

**Solution**: Safe to ignore, or drop and recreate:

```sql
DROP TABLE IF EXISTS program_holder_verification CASCADE;
DROP TABLE IF EXISTS program_holder_banking CASCADE;
DROP TABLE IF EXISTS program_holder_documents CASCADE;
```

Then re-run the migration.

### Error: "permission denied"

**Cause**: Not using service role key or insufficient permissions.

**Solution**:

- Use Supabase service role key (not anon key)
- Or apply via Supabase dashboard as project owner

### Error: "storage bucket already exists"

**Cause**: Bucket already created.

**Solution**: Safe to ignore, the `ON CONFLICT DO NOTHING` handles this.

## 📝 What Gets Created

After successful migration:

### Tables

- ✅ `program_holder_documents` - Document uploads
- ✅ `program_holder_banking` - Banking information
- ✅ `program_holder_verification` - Verification tracking
- ✅ `program_holders.verification_status` - New column

### Storage

- ✅ `program-holder-documents` bucket

### Security

- ✅ RLS policies on all tables
- ✅ Storage policies on bucket
- ✅ Indexes for performance

## 🚀 After Migration

1. **Test signup flow**: `/program-holder/signup`
2. **Test onboarding**: `/program-holder/onboarding/setup`
3. **Test verification**: `/program-holder/verify-identity`
4. **Test admin dashboard**: `/admin/program-holders/verification`

## 📚 Related Documentation

- **Setup Guide**: `SETUP_VERIFICATION.md`
- **System Overview**: `VERIFICATION_SYSTEM_COMPLETE.md`
- **Onboarding Details**: `PROGRAM_HOLDER_ONBOARDING_SYSTEM.md`
