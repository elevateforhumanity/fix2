# 🗄️ SQL TO RUN IN SUPABASE

## Copy and paste this into Supabase SQL Editor

Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql

---

## STEP 1: Fix Forum Columns

```sql
-- Add missing columns to forum_threads
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_threads' AND column_name='author_id') THEN
    ALTER TABLE forum_threads ADD COLUMN author_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_threads' AND column_name='is_pinned') THEN
    ALTER TABLE forum_threads ADD COLUMN is_pinned BOOLEAN DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_threads' AND column_name='is_locked') THEN
    ALTER TABLE forum_threads ADD COLUMN is_locked BOOLEAN DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_threads' AND column_name='view_count') THEN
    ALTER TABLE forum_threads ADD COLUMN view_count INTEGER DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_threads' AND column_name='last_activity') THEN
    ALTER TABLE forum_threads ADD COLUMN last_activity TIMESTAMPTZ DEFAULT NOW();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_threads' AND column_name='tags') THEN
    ALTER TABLE forum_threads ADD COLUMN tags TEXT[] DEFAULT '{}';
  END IF;
END $$;

-- Add missing columns to forum_posts
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_posts' AND column_name='author_id') THEN
    ALTER TABLE forum_posts ADD COLUMN author_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_posts' AND column_name='is_solution') THEN
    ALTER TABLE forum_posts ADD COLUMN is_solution BOOLEAN DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_posts' AND column_name='attachments') THEN
    ALTER TABLE forum_posts ADD COLUMN attachments JSONB DEFAULT '[]';
  END IF;
END $$;

-- Add missing columns to forum_votes
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_votes' AND column_name='user_id') THEN
    ALTER TABLE forum_votes ADD COLUMN user_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_votes' AND column_name='vote_type') THEN
    ALTER TABLE forum_votes ADD COLUMN vote_type TEXT CHECK (vote_type IN ('upvote', 'downvote'));
  END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_forum_threads_author ON forum_threads(author_id);
CREATE INDEX IF NOT EXISTS idx_forum_threads_activity ON forum_threads(last_activity DESC);
CREATE INDEX IF NOT EXISTS idx_forum_posts_author ON forum_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_forum_votes_user ON forum_votes(user_id);
```

**Click "Run"**

---

## ✅ DONE!

Your forums should now work without errors.

Visit: https://elevateforhumanity.org/forums

---

**If you still get errors, share the exact error message.**
