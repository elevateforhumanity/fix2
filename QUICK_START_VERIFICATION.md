# Quick Start: Apply Verification Migration

## The Error You're Seeing

```
ERROR: 42601: syntax error at or near "-"
LINE 1: - program_holder_documents (for uploads)
```

**This means**: You copied from a markdown documentation file instead of the SQL file.

## ✅ Fix: Use the Correct File

The **ONLY** file you should run as SQL is:

```
supabase/migrations/20241223_program_holder_verification.sql
```

## 🚀 How to Apply (Choose One)

### Method 1: Supabase Dashboard (Easiest)

1. Open: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Run this command to display the SQL:
   ```bash
   ./copy-migration-sql.sh
   ```
6. Copy the output
7. Paste into Supabase SQL Editor
8. Click **Run**

### Method 2: Direct File Copy

```bash
# Display the SQL
cat supabase/migrations/20241223_program_holder_verification.sql

# Copy output and paste into Supabase SQL Editor
```

### Method 3: If You Have psql

```bash
# Replace with your connection string
psql "postgresql://postgres:YOUR_PASSWORD@YOUR_PROJECT.supabase.co:5432/postgres" \
  -f supabase/migrations/20241223_program_holder_verification.sql
```

## ✅ Verify It Worked

Run this in Supabase SQL Editor:

```sql
-- Should return 3 tables
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN (
  'program_holder_documents',
  'program_holder_banking',
  'program_holder_verification'
);

-- Should return 1 bucket
SELECT * FROM storage.buckets
WHERE id = 'program-holder-documents';
```

## 📋 What Gets Created

- ✅ `program_holder_documents` table
- ✅ `program_holder_banking` table
- ✅ `program_holder_verification` table
- ✅ `program-holder-documents` storage bucket
- ✅ RLS policies for security
- ✅ Storage policies for access control

## 🎯 After Migration

Test the complete flow:

1. **Signup**: [http://localhost:3000/program-holder/signup](http://localhost:3000/program-holder/signup)
2. **Onboarding**: [http://localhost:3000/program-holder/onboarding/setup](http://localhost:3000/program-holder/onboarding/setup)
3. **Verification**: [http://localhost:3000/program-holder/verify-identity](http://localhost:3000/program-holder/verify-identity)
4. **Admin Dashboard**: [http://localhost:3000/admin/program-holders/verification](http://localhost:3000/admin/program-holders/verification)

## 🆘 Still Getting Errors?

### "relation already exists"

Tables already created. Safe to ignore or drop first:

```sql
DROP TABLE IF EXISTS program_holder_verification CASCADE;
DROP TABLE IF EXISTS program_holder_banking CASCADE;
DROP TABLE IF EXISTS program_holder_documents CASCADE;
```

### "permission denied"

Use service role key or apply via dashboard as project owner.

### "syntax error"

You're still copying from markdown docs. Use **ONLY** the `.sql` file.

## 📞 Need Help?

Check: `APPLY_MIGRATION_INSTRUCTIONS.md` for detailed troubleshooting.
