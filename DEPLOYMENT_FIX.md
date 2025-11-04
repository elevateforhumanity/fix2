# 🔧 Deployment Fix - Execute in Correct Order

## Issue

You got: **"syntax error at or near 'migrations'"**

## Cause

The migrations reference tables (organizations, users, courses) that don't exist yet.

## ✅ Solution

Execute SQL files in this order:

### Step 1: Create Base Tables (FIRST)

📄 File: `deployment-ready/00-prerequisites.sql`

Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new

1. Open `deployment-ready/00-prerequisites.sql`
2. Copy entire contents
3. Paste into SQL Editor
4. Click "Run"

**Creates:**

- organizations table
- users table
- courses table
- enrollments table
- assessments table
- Basic RLS policies

### Step 2: Create Admin Tables (SECOND)

📄 File: `deployment-ready/01-all-migrations.sql`

1. Open `deployment-ready/01-all-migrations.sql`
2. Copy entire contents
3. Paste into SQL Editor
4. Click "Run"

**Creates:**

- email_queue, email_logs
- webhooks, webhook_queue, webhook_logs
- campaigns, ab_tests, funnels
- forums, forum_posts, forum_members
- api_keys, ai_generations, integrations
- And 13 more tables...

### Step 3: Deploy Edge Functions

Then deploy the 4 Edge Functions as normal.

## Quick Commands

```bash
# View the files
cat deployment-ready/00-prerequisites.sql
cat deployment-ready/01-all-migrations.sql

# Check file sizes
ls -lh deployment-ready/
```

## Verification

After Step 1:

- ✅ organizations table exists
- ✅ users table exists
- ✅ courses table exists

After Step 2:

- ✅ email_queue table exists
- ✅ webhooks table exists
- ✅ campaigns table exists
- ✅ Total: 29 tables

## Why This Happened

The original `01-all-migrations.sql` has foreign key references like:

```sql
org_id UUID REFERENCES organizations(id)
user_id UUID REFERENCES users(id)
```

These require the `organizations` and `users` tables to exist first.

The `00-prerequisites.sql` file creates these base tables.

---

**Execute in order: 00 → 01 → Edge Functions**
