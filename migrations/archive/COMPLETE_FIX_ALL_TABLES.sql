-- ============================================================================
-- COMPLETE FIX - Handles existing tables and creates missing ones
-- Run this ONCE to fix everything
-- ============================================================================

-- Drop and recreate lessons table with correct structure
DROP TABLE IF EXISTS lesson_progress CASCADE;
DROP TABLE IF EXISTS interactive_quizzes CASCADE;
DROP TABLE IF EXISTS lesson_resources CASCADE;
DROP TABLE IF EXISTS video_transcripts CASCADE;
DROP TABLE IF EXISTS lessons CASCADE;
DROP TABLE IF EXISTS modules CASCADE;

-- Create modules table
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  summary TEXT,
  order_index INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

CREATE INDEX idx_modules_program_id ON modules(program_id);
CREATE INDEX idx_modules_program_order ON modules(program_id, order_index);

-- Create lessons table
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  lesson_type TEXT NOT NULL DEFAULT 'video',
  video_url TEXT,
  content_url TEXT,
  quiz_id UUID,
  order_index INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

CREATE INDEX idx_lessons_program_id ON lessons(program_id);
CREATE INDEX idx_lessons_module_id ON lessons(module_id);
CREATE INDEX idx_lessons_module_order ON lessons(module_id, order_index);

-- Create lesson_progress table
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started',
  last_viewed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

CREATE UNIQUE INDEX idx_progress_enrollment_lesson ON lesson_progress(enrollment_id, lesson_id);
CREATE INDEX idx_progress_status ON lesson_progress(status);

-- Create interactive_quizzes table
CREATE TABLE interactive_quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  passing_score INTEGER DEFAULT 70,
  time_limit_minutes INTEGER,
  max_attempts INTEGER DEFAULT 3,
  show_correct_answers BOOLEAN DEFAULT true,
  shuffle_questions BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_interactive_quizzes_lesson ON interactive_quizzes(lesson_id);

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES interactive_quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'true_false', 'multiple_select')),
  options TEXT[] NOT NULL,
  correct_answer JSONB NOT NULL,
  explanation TEXT,
  points INTEGER DEFAULT 1,
  order_index INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz ON quiz_questions(quiz_id);

-- Create quiz_attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  quiz_id UUID NOT NULL REFERENCES interactive_quizzes(id) ON DELETE CASCADE,
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  score INTEGER NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  passed BOOLEAN NOT NULL,
  time_taken_seconds INTEGER,
  attempt_number INTEGER NOT NULL,
  feedback JSONB DEFAULT '{}'::jsonb,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz ON quiz_attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_enrollment ON quiz_attempts(enrollment_id);

-- Create lesson_resources table
CREATE TABLE lesson_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('pdf', 'template', 'checklist', 'worksheet', 'guide', 'tool', 'infographic')),
  file_url TEXT NOT NULL,
  file_size_kb INTEGER,
  download_count INTEGER DEFAULT 0,
  order_index INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_lesson_resources_lesson ON lesson_resources(lesson_id);

-- Create resource_downloads table
CREATE TABLE IF NOT EXISTS resource_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  resource_id UUID NOT NULL REFERENCES lesson_resources(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_resource_downloads_user ON resource_downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_resource_downloads_resource ON resource_downloads(resource_id);

-- Create video_transcripts table
CREATE TABLE video_transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  language TEXT NOT NULL DEFAULT 'en',
  transcript_text TEXT NOT NULL,
  vtt_url TEXT,
  srt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_video_transcripts_lesson ON video_transcripts(lesson_id);
CREATE UNIQUE INDEX idx_video_transcripts_lesson_lang ON video_transcripts(lesson_id, language);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  total_lessons INTEGER DEFAULT 0,
  completed_lessons INTEGER DEFAULT 0,
  total_quizzes INTEGER DEFAULT 0,
  completed_quizzes INTEGER DEFAULT 0,
  total_resources INTEGER DEFAULT 0,
  downloaded_resources INTEGER DEFAULT 0,
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  estimated_completion_date DATE,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_progress_enrollment ON user_progress(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_program ON user_progress(program_id);

-- Enable RLS
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read modules" ON modules;
CREATE POLICY "Public read modules" ON modules FOR SELECT USING (true);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Learners read lessons" ON lessons;
CREATE POLICY "Learners read lessons" ON lessons FOR SELECT USING (true);

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Learners select own progress" ON lesson_progress;
CREATE POLICY "Learners select own progress" ON lesson_progress FOR SELECT
  USING (EXISTS (SELECT 1 FROM enrollments e WHERE e.id = lesson_progress.enrollment_id AND e.user_id = auth.uid()));

DROP POLICY IF EXISTS "Learners update own progress" ON lesson_progress;
CREATE POLICY "Learners update own progress" ON lesson_progress FOR UPDATE
  USING (EXISTS (SELECT 1 FROM enrollments e WHERE e.id = lesson_progress.enrollment_id AND e.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM enrollments e WHERE e.id = lesson_progress.enrollment_id AND e.user_id = auth.uid()));

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ ALL TABLES FIXED AND CREATED!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Ready to run seeding script:';
  RAISE NOTICE '   export NEXT_PUBLIC_SUPABASE_URL="your-url"';
  RAISE NOTICE '   export SUPABASE_SERVICE_ROLE_KEY="your-key"';
  RAISE NOTICE '   npx ts-node scripts/seed-courses.ts';
END $$;
