# Test Application Insert

## Issue

Applications are failing to save to the database.

## Diagnosis

### Table Schema

```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  program_id TEXT,
  status TEXT DEFAULT 'pending',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### RLS Policy

```sql
CREATE POLICY "Anyone can submit applications"
  ON applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
```

### API Insert Code

```typescript
const { data, error } = await supabase
  .from('applications')
  .insert({
    first_name: body.firstName,
    last_name: body.lastName,
    email: body.email,
    phone: body.phone,
    program_id: body.program,
    status: 'pending',
    notes: notes,
  })
  .select()
  .single();
```

## Test Query

Run this in Supabase SQL Editor to test insert:

```sql
-- Test insert as anon user
INSERT INTO applications (
  first_name,
  last_name,
  email,
  phone,
  program_id,
  status,
  notes
) VALUES (
  'Test',
  'User',
  'test@example.com',
  '3175551234',
  'hvac-technician',
  'pending',
  'Test application'
) RETURNING *;
```

## Possible Issues

1. **RLS Policy Not Applied**: Run migration to ensure policy exists
2. **Service Role Key Missing**: Check `.env.local` has `SUPABASE_SERVICE_ROLE_KEY`
3. **Table Doesn't Exist**: Run migration `20241204_create_applications_table.sql`
4. **Column Mismatch**: API sending fields that don't exist in table

## Fix

If table doesn't exist, run:

```bash
# Apply migration
psql $DATABASE_URL -f supabase/migrations/20241204_create_applications_table.sql
```

Or in Supabase SQL Editor, copy/paste the migration file.
