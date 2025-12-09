# Database Setup Guide

This project includes an automated database migration and seeding system that works with Supabase.

## Quick Start

### 1. Set Environment Variables

Add these to your `.env.local`:

```env
# Required for all methods
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Required for Node.js runner (recommended)
SUPABASE_DB_URL=postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres

# Optional: for Supabase CLI method
SUPABASE_PROJECT_REF=your-project-ref
SUPABASE_ACCESS_TOKEN=your-access-token
SUPABASE_DB_PASSWORD=your-db-password
```

### 2. Run Setup

```bash
# Run migrations + seeds (recommended)
npm run db:setup

# Or run separately
npm run db:migrate  # migrations only
npm run db:seed     # seeds only

# Check database health
npm run db:check
```

## How It Works

The system supports two methods:

### Method 1: Node.js Runner (Recommended)

When `SUPABASE_DB_URL` is set, the system uses Node.js scripts that:
- Connect directly to your Supabase database via PostgreSQL
- Track applied migrations in `efh_migrations` table
- Run migrations in alphabetical order
- Apply seeds from `supabase/seeds/` directory
- Support transactions with automatic rollback on errors

**Advantages:**
- Works everywhere (local, CI/CD, Gitpod)
- No additional CLI tools required
- Tracks migration history
- Fast and reliable

### Method 2: Supabase CLI

When `SUPABASE_DB_URL` is not set, falls back to Supabase CLI:
- Uses `supabase db push` for migrations
- Requires Supabase CLI installed
- Requires `SUPABASE_PROJECT_REF` and `SUPABASE_ACCESS_TOKEN`

## Directory Structure

```
supabase/
├── migrations/
│   ├── 001_init_schema.sql
│   ├── 002_courses.sql
│   ├── 003_products.sql
│   └── ...
└── seeds/
    ├── 001_seed_programs.sql
    ├── 002_seed_products.sql
    └── 003_seed_test_users.sql
```

## Migration Files

Migrations are SQL files that:
- Must be in `supabase/migrations/` directory
- Must end with `.sql`
- Are executed in alphabetical order
- Are tracked to prevent re-running

Example migration:

```sql
-- 008_add_user_preferences.sql
create table if not exists user_preferences (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  preferences jsonb,
  created_at timestamp default now()
);
```

## Seed Files

Seeds are SQL files that:
- Must be in `supabase/seeds/` directory
- Must end with `.sql`
- Are executed in alphabetical order
- Can be re-run (use `ON CONFLICT` clauses)

Example seed:

```sql
-- 004_seed_categories.sql
insert into categories (slug, name)
values
  ('technology', 'Technology'),
  ('healthcare', 'Healthcare')
on conflict (slug) do nothing;
```

## GitHub Actions

Migrations and seeds run automatically on push to `main` when files in `supabase/migrations/` or `supabase/seeds/` change.

### Required Secrets

Add these to GitHub → Settings → Secrets:

- `SUPABASE_DB_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional (for CLI method):
- `SUPABASE_PROJECT_REF`
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_DB_PASSWORD`

## Gitpod Integration

Add to `.gitpod.yml`:

```yaml
tasks:
  - name: Setup Database
    init: |
      npm install
      npm run db:setup
    command: npm run dev
```

## Troubleshooting

### "SUPABASE_DB_URL is not set"

Add the database connection string to `.env.local`:

```env
SUPABASE_DB_URL=postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres
```

Get it from: Supabase Dashboard → Settings → Database → Connection string

### "Migration failed"

Check the error message for SQL syntax issues. The system will rollback the failed migration automatically.

To fix:
1. Correct the SQL in the migration file
2. Run `npm run db:migrate` again

### "Table already exists"

Use `CREATE TABLE IF NOT EXISTS` in migrations:

```sql
create table if not exists my_table (
  id uuid primary key
);
```

### "Seed data already exists"

Use `ON CONFLICT` clauses in seeds:

```sql
insert into programs (slug, title)
values ('my-program', 'My Program')
on conflict (slug) do nothing;
```

## Best Practices

1. **Always use transactions** - The system handles this automatically
2. **Make migrations idempotent** - Use `IF NOT EXISTS`, `IF EXISTS`
3. **Use proper naming** - `001_descriptive_name.sql`
4. **Test locally first** - Run `npm run db:setup` before pushing
5. **Keep migrations small** - One logical change per file
6. **Document complex changes** - Add SQL comments
7. **Use seeds for reference data** - Not for user data

## Advanced Usage

### Custom Migration Order

Migrations run in alphabetical order. Use numeric prefixes:

```
001_init.sql
002_users.sql
003_courses.sql
010_add_feature_x.sql
011_add_feature_y.sql
```

### Conditional Seeds

Use environment-specific seeds:

```sql
-- Only insert test data in development
insert into users (email)
select 'test@example.com'
where current_database() like '%dev%';
```

### Rollback

To rollback a migration:
1. Create a new migration that reverses the changes
2. Run `npm run db:migrate`

Example:

```sql
-- 012_rollback_feature_x.sql
drop table if exists feature_x;
```

## Scripts Reference

- `npm run db:setup` - Run migrations + seeds
- `npm run db:migrate` - Run migrations only
- `npm run db:seed` - Run seeds only
- `npm run db:check` - Check database health
- `npm run supabase:test` - Test Supabase connection

## Support

For issues:
1. Check this guide
2. Review error messages
3. Check Supabase logs
4. Open an issue on GitHub
