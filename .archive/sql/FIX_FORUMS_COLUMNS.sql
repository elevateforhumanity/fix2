-- =====================================================
-- FIX FORUMS TABLES - Add Missing Columns
-- Run this if you get "column does not exist" errors
-- =====================================================

-- Add missing columns to forum_threads if they don't exist
DO $$ 
BEGIN
  -- Add author_id column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_threads' AND column_name='author_id') THEN
    ALTER TABLE forum_threads ADD COLUMN author_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
  END IF;
  
  -- Add is_pinned column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_threads' AND column_name='is_pinned') THEN
    ALTER TABLE forum_threads ADD COLUMN is_pinned BOOLEAN DEFAULT false;
  END IF;
  
  -- Add is_locked column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_threads' AND column_name='is_locked') THEN
    ALTER TABLE forum_threads ADD COLUMN is_locked BOOLEAN DEFAULT false;
  END IF;
  
  -- Add view_count column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_threads' AND column_name='view_count') THEN
    ALTER TABLE forum_threads ADD COLUMN view_count INTEGER DEFAULT 0;
  END IF;
  
  -- Add last_activity column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_threads' AND column_name='last_activity') THEN
    ALTER TABLE forum_threads ADD COLUMN last_activity TIMESTAMPTZ DEFAULT NOW();
  END IF;
  
  -- Add tags column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_threads' AND column_name='tags') THEN
    ALTER TABLE forum_threads ADD COLUMN tags TEXT[] DEFAULT '{}';
  END IF;
END $$;

-- Add missing columns to forum_posts if they don't exist
DO $$ 
BEGIN
  -- Add author_id column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_posts' AND column_name='author_id') THEN
    ALTER TABLE forum_posts ADD COLUMN author_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
  END IF;
  
  -- Add is_solution column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_posts' AND column_name='is_solution') THEN
    ALTER TABLE forum_posts ADD COLUMN is_solution BOOLEAN DEFAULT false;
  END IF;
  
  -- Add attachments column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_posts' AND column_name='attachments') THEN
    ALTER TABLE forum_posts ADD COLUMN attachments JSONB DEFAULT '[]';
  END IF;
END $$;

-- Add missing columns to forum_votes if they don't exist
DO $$ 
BEGIN
  -- Add user_id column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_votes' AND column_name='user_id') THEN
    ALTER TABLE forum_votes ADD COLUMN user_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
  END IF;
  
  -- Add vote_type column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='forum_votes' AND column_name='vote_type') THEN
    ALTER TABLE forum_votes ADD COLUMN vote_type TEXT CHECK (vote_type IN ('upvote', 'downvote'));
  END IF;
END $$;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_forum_threads_author ON forum_threads(author_id);
CREATE INDEX IF NOT EXISTS idx_forum_threads_activity ON forum_threads(last_activity DESC);
CREATE INDEX IF NOT EXISTS idx_forum_posts_author ON forum_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_forum_votes_user ON forum_votes(user_id);

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Forum tables updated successfully!';
  RAISE NOTICE '📊 All missing columns added';
  RAISE NOTICE '🎯 Forums are now ready to use';
END $$;
