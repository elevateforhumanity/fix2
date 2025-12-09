# How to Apply the Moderation Migration

## Location
The migration file is at: `/workspaces/fix2/supabase/migrations/20240116_content_moderation.sql`

## Option 1: Apply via Supabase Dashboard (Easiest)

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New query"

3. **Copy the SQL**
   - Open the migration file: `supabase/migrations/20240116_content_moderation.sql`
   - Copy ALL the SQL content

4. **Paste and Run**
   - Paste into SQL Editor
   - Click "Run" button
   - Wait for success message

5. **Verify**
   - Go to "Table Editor"
   - Check that these tables exist:
     - `moderation_reports`
     - `moderation_actions`
     - `moderation_rules`
   - Check that these tables have `moderation_status` column:
     - `courses`
     - `discussions`
     - `comments`
     - `reviews`

## Option 2: Quick Fix - Just Add the Column

If you only need to fix the error and don't need full moderation features, run this minimal SQL:

```sql
-- Just add the moderation_status column to fix the error
ALTER TABLE courses ADD COLUMN IF NOT EXISTS moderation_status TEXT DEFAULT 'approved';
ALTER TABLE discussions ADD COLUMN IF NOT EXISTS moderation_status TEXT DEFAULT 'approved';
ALTER TABLE comments ADD COLUMN IF NOT EXISTS moderation_status TEXT DEFAULT 'approved';
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS moderation_status TEXT DEFAULT 'approved';
```

## Option 3: Disable Content Moderation

If you're not using content moderation features, you can disable it:

1. **Find the code using it:**
   - File: `lib/contentModeration.ts`

2. **Comment it out or add a check:**

```typescript
// lib/contentModeration.ts
export async function updateModerationStatus(
  contentType: string,
  contentId: string,
  status: string
) {
  // Temporarily disabled - migration not applied
  console.warn('Content moderation disabled - migration not run');
  return;
  
  // Original code below...
}
```

## What the Migration Does

### Creates 3 New Tables:
1. **moderation_reports** - User-submitted reports of problematic content
2. **moderation_actions** - Actions taken by moderators
3. **moderation_rules** - Automated moderation rules

### Adds Column to 4 Tables:
- `courses.moderation_status`
- `discussions.moderation_status`
- `comments.moderation_status`
- `reviews.moderation_status`

### Sets Up:
- Row Level Security (RLS) policies
- Indexes for performance
- Default moderation rules (spam, profanity, harassment)

## When to Apply This

**Apply if:**
- You're getting "column moderation_status does not exist" errors
- You want to use content moderation features
- You want users to report inappropriate content
- You want automated spam/profanity filtering

**Skip if:**
- You're not using content moderation
- You don't have those tables (courses, discussions, comments, reviews)
- You want to disable the feature instead

## After Applying

The error should be gone:
```
ERROR: 42703: column "moderation_status" does not exist
```

Your site will continue to work normally, and you'll have content moderation features available if needed.

## Troubleshooting

### Error: "relation does not exist"
One of the tables (courses, discussions, comments, reviews) doesn't exist.
- Check which tables you actually have
- Remove the ALTER TABLE lines for tables you don't have

### Error: "column already exists"
The column was already added.
- This is fine, the migration uses `IF NOT EXISTS`
- The error is harmless

### Error: "permission denied"
You don't have admin access to the database.
- Use the Supabase dashboard instead
- Or ask someone with admin access

---

**Recommendation:** Use Option 1 (Supabase Dashboard) - it's the safest and easiest method.
