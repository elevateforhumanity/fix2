-- Social Learning and Gamification Tables
-- Migration: 20251118_social_gamification

-- Discussion Threads
CREATE TABLE IF NOT EXISTS discussion_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  tenant_id uuid NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title text NOT NULL,
  created_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  pinned boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_discussion_threads_course ON discussion_threads(course_id);
CREATE INDEX IF NOT EXISTS idx_discussion_threads_tenant ON discussion_threads(tenant_id);
CREATE INDEX IF NOT EXISTS idx_discussion_threads_created_by ON discussion_threads(created_by);

-- Discussion Posts
CREATE TABLE IF NOT EXISTS discussion_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES discussion_threads(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_discussion_posts_thread ON discussion_posts(thread_id);
CREATE INDEX IF NOT EXISTS idx_discussion_posts_author ON discussion_posts(author_id);

-- Badges
CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  icon text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- User Badges
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id uuid NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  awarded_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_badge ON user_badges(badge_id);

-- Leaderboard Scores
CREATE TABLE IF NOT EXISTS leaderboard_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid NULL REFERENCES courses(id) ON DELETE CASCADE,
  points integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_leaderboard_scores_user ON leaderboard_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_scores_course ON leaderboard_scores(course_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_scores_points ON leaderboard_scores(points DESC);

-- Insert default badges
INSERT INTO badges (key, name, description, icon) VALUES
  ('first_course', 'First Course', 'Completed your first course', '🎓'),
  ('perfect_score', 'Perfect Score', 'Achieved 100% on an assessment', '💯'),
  ('helpful_peer', 'Helpful Peer', 'Received 10+ upvotes on forum posts', '🤝'),
  ('early_bird', 'Early Bird', 'Completed a course ahead of schedule', '🐦'),
  ('streak_7', '7-Day Streak', 'Logged in 7 days in a row', '🔥')
ON CONFLICT (key) DO NOTHING;
