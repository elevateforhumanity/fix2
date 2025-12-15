-- =====================================================
-- FORUMS SEED DATA - Real Discussion Threads
-- Run this to populate forums with actual content
-- =====================================================

-- First, let's add the missing 4 categories to get to 12 total
INSERT INTO forum_categories (name, description, icon, color, display_order) VALUES
('General Discussion', 'Off-topic conversations and community building', 'message-circle', 'gray', 9),
('Career Advice', 'Get guidance on job search, interviews, and career development', 'compass', 'indigo', 10),
('Study Groups', 'Form study groups and collaborate on coursework', 'book-open', 'teal', 11),
('Success Stories', 'Share your achievements and inspire others', 'trophy', 'gold', 12)
ON CONFLICT DO NOTHING;

-- Get a sample user ID (we'll use the first user in the system)
DO $$
DECLARE
  sample_user_id UUID;
  healthcare_cat_id UUID;
  trades_cat_id UUID;
  business_cat_id UUID;
  tech_cat_id UUID;
  general_cat_id UUID;
  career_cat_id UUID;
  thread1_id UUID;
  thread2_id UUID;
  thread3_id UUID;
  thread4_id UUID;
  thread5_id UUID;
  thread6_id UUID;
BEGIN
  -- Get first user ID (or create a system user)
  SELECT id INTO sample_user_id FROM auth.users LIMIT 1;
  
  -- If no users exist, we'll use a dummy UUID
  IF sample_user_id IS NULL THEN
    sample_user_id := '00000000-0000-0000-0000-000000000000';
  END IF;

  -- Get category IDs
  SELECT id INTO healthcare_cat_id FROM forum_categories WHERE name = 'Healthcare Discussions';
  SELECT id INTO trades_cat_id FROM forum_categories WHERE name = 'Skilled Trades Community';
  SELECT id INTO business_cat_id FROM forum_categories WHERE name = 'Business & Professional';
  SELECT id INTO tech_cat_id FROM forum_categories WHERE name = 'Technology & IT';
  SELECT id INTO general_cat_id FROM forum_categories WHERE name = 'General Discussion';
  SELECT id INTO career_cat_id FROM forum_categories WHERE name = 'Career Advice';

  -- Sample Thread 1: Healthcare
  INSERT INTO forum_threads (category_id, title, content, author_id, is_pinned, view_count)
  VALUES (
    healthcare_cat_id,
    'Welcome to Healthcare Discussions!',
    'This is the place to discuss all things healthcare - from CNA training to medical assistant programs. Share your experiences, ask questions, and connect with fellow healthcare students!',
    sample_user_id,
    true,
    156
  ) RETURNING id INTO thread1_id;

  -- Posts for Thread 1
  INSERT INTO forum_posts (thread_id, content, author_id) VALUES
  (thread1_id, 'Thanks for creating this space! I just started my CNA program and I''m excited to connect with others.', sample_user_id),
  (thread1_id, 'Welcome! I graduated from the CNA program last year. Happy to answer any questions!', sample_user_id);

  -- Sample Thread 2: Skilled Trades
  INSERT INTO forum_threads (category_id, title, content, author_id, view_count)
  VALUES (
    trades_cat_id,
    'HVAC Certification - Study Tips?',
    'I''m preparing for my HVAC certification exam. Does anyone have study tips or resources they found helpful?',
    sample_user_id,
    89
  ) RETURNING id INTO thread2_id;

  INSERT INTO forum_posts (thread_id, content, author_id) VALUES
  (thread2_id, 'I used the EPA 608 practice tests online. They were super helpful!', sample_user_id),
  (thread2_id, 'Make sure you understand refrigerant handling. That''s a big part of the exam.', sample_user_id),
  (thread2_id, 'Thanks for the tips! I''ll check out those practice tests.', sample_user_id);

  -- Sample Thread 3: Business
  INSERT INTO forum_threads (category_id, title, content, author_id, view_count)
  VALUES (
    business_cat_id,
    'Accounting Software Recommendations',
    'What accounting software do you recommend for small businesses? I''m learning QuickBooks in class but wondering what else is out there.',
    sample_user_id,
    67
  ) RETURNING id INTO thread3_id;

  INSERT INTO forum_posts (thread_id, content, author_id) VALUES
  (thread3_id, 'QuickBooks is the industry standard, but Xero is also popular and more modern.', sample_user_id),
  (thread3_id, 'I''d stick with QuickBooks since that''s what most employers use.', sample_user_id);

  -- Sample Thread 4: Technology
  INSERT INTO forum_threads (category_id, title, content, author_id, view_count)
  VALUES (
    tech_cat_id,
    'Best Resources for Learning Python?',
    'I''m new to programming and want to learn Python. What are the best free resources you''ve found?',
    sample_user_id,
    134
  ) RETURNING id INTO thread4_id;

  INSERT INTO forum_posts (thread_id, content, author_id) VALUES
  (thread4_id, 'Python.org has great tutorials for beginners. Also check out freeCodeCamp!', sample_user_id),
  (thread4_id, 'I love Codecademy for interactive learning. The free tier is pretty good.', sample_user_id),
  (thread4_id, 'Don''t forget YouTube! Corey Schafer has amazing Python tutorials.', sample_user_id);

  -- Sample Thread 5: General Discussion
  INSERT INTO forum_threads (category_id, title, content, author_id, view_count)
  VALUES (
    general_cat_id,
    'Introduce Yourself!',
    'New to the community? Tell us about yourself! What program are you in? What are your career goals?',
    sample_user_id,
    203
  ) RETURNING id INTO thread5_id;

  INSERT INTO forum_posts (thread_id, content, author_id) VALUES
  (thread5_id, 'Hi everyone! I''m Sarah, studying to be a medical assistant. Excited to be here!', sample_user_id),
  (thread5_id, 'Welcome Sarah! I''m in the HVAC program. Good luck with your studies!', sample_user_id),
  (thread5_id, 'Hey all! CDL student here. Looking forward to connecting with everyone.', sample_user_id);

  -- Sample Thread 6: Career Advice
  INSERT INTO forum_threads (category_id, title, content, author_id, view_count)
  VALUES (
    career_cat_id,
    'How to Prepare for Job Interviews?',
    'I have my first job interview next week after completing my training. Any tips on how to prepare and what to expect?',
    sample_user_id,
    98
  ) RETURNING id INTO thread6_id;

  INSERT INTO forum_posts (thread_id, content, author_id) VALUES
  (thread6_id, 'Research the company beforehand! Know their mission and values.', sample_user_id),
  (thread6_id, 'Practice common interview questions with a friend. It really helps!', sample_user_id),
  (thread6_id, 'Dress professionally and arrive 10 minutes early. First impressions matter!', sample_user_id),
  (thread6_id, 'Prepare questions to ask them too. Shows you''re interested in the role.', sample_user_id);

  RAISE NOTICE '✅ Sample forum data created successfully!';
  RAISE NOTICE '📊 Created 6 threads with multiple posts';
  RAISE NOTICE '🎯 Forums are now populated with sample content';
END $$;
