-- ============================================
-- SEED DATA PART 2: ACHIEVEMENTS
-- Run this SECOND in Supabase SQL Editor (after Part 1)
-- ============================================

-- Clear existing test achievements (optional)
-- DELETE FROM achievements WHERE category IN ('onboarding', 'learning', 'streak', 'completion', 'assessment', 'progress');

INSERT INTO achievements (name, description, icon, category, points, is_active) VALUES
  ('Profile Complete', 'Completed your profile information', '✅', 'onboarding', 25, true),
  ('First Lesson', 'Completed your first lesson', '📖', 'learning', 50, true),
  ('Fast Learner', 'Completed 3 lessons in one day', '⚡', 'learning', 75, true),
  ('Dedicated Student', 'Logged in 5 days in a row', '📚', 'streak', 150, true),
  ('Week Warrior', 'Logged in 7 days in a row', '🔥', 'streak', 200, true),
  ('Course Champion', 'Completed your first course', '🏆', 'completion', 400, true),
  ('Perfect Score', 'Got 100% on a quiz', '💯', 'assessment', 100, true),
  ('Helper', 'Helped another student in forums', '🤝', 'social', 50, true),
  ('Early Bird', 'Completed assignment before due date', '🌅', 'learning', 25, true),
  ('Overachiever', 'Completed all optional lessons in a course', '⭐', 'completion', 200, true),
  ('Certificate Earned', 'Earned your first certificate', '🎓', 'completion', 500, true),
  ('Halfway There', 'Completed 50% of a program', '🎯', 'progress', 250, true),
  ('Almost Done', 'Completed 90% of a program', '🚀', 'progress', 350, true),
  ('Month Streak', 'Logged in 30 days in a row', '📅', 'streak', 500, true),
  ('Quiz Master', 'Completed 10 quizzes with 90%+ scores', '🧠', 'assessment', 300, true);

-- ============================================
-- VERIFICATION
-- ============================================

SELECT COUNT(*) as achievement_count FROM achievements;
SELECT name, description, category, points FROM achievements ORDER BY category, points;
