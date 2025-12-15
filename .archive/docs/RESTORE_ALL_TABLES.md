# 🔧 RESTORE ALL TABLES FROM MIGRATIONS

## Good News
You have 123 migration files that can recreate all your tables!

## Option 1: Use Supabase CLI (RECOMMENDED)

```bash
# Reset database and re-run all migrations
supabase db reset

# Or push migrations to remote
supabase db push
```

## Option 2: Manual SQL Restore

Run these migration files in order in Supabase SQL Editor:

### Core Schema (Run First)
1. `supabase/migrations/01_core_schema.sql`
2. `supabase/migrations/02_rls_policies.sql`
3. `supabase/migrations/20240110000000_complete_schema.sql`

### Then Run All Others in Date Order
```bash
# List all migrations in order
ls -1 supabase/migrations/*.sql | sort
```

## Option 3: Combine All Migrations

I can create a single SQL file with all migrations combined.

## What Happened?

Looking at your remaining tables, it seems like only the base schema exists.
The 123 migration files should recreate:
- applications
- courses  
- enrollments
- All 200+ tables

## Next Steps

1. **Check if Supabase CLI is installed:**
   ```bash
   supabase --version
   ```

2. **If installed, run:**
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   supabase db push
   ```

3. **If not installed, I'll create a combined SQL file**

Which option do you want to use?
