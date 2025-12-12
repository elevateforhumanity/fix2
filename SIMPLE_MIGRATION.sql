-- =====================================================
-- SIMPLE MIGRATION - Only Creates New Tables
-- =====================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- FORUM CATEGORIES
-- =====================================================

CREATE TABLE IF NOT EXISTS forum_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT 'blue',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- FORUM THREADS
-- =====================================================

CREATE TABLE IF NOT EXISTS forum_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES forum_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- FORUM POSTS
-- =====================================================

CREATE TABLE IF NOT EXISTS forum_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_id UUID NOT NULL,
  is_solution BOOLEAN DEFAULT false,
  attachments JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- FORUM VOTES
-- =====================================================

CREATE TABLE IF NOT EXISTS forum_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE,
  post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  vote_type TEXT CHECK (vote_type IN ('upvote', 'downvote')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- CHAT CONVERSATIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'archived')),
  assigned_to UUID,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- =====================================================
-- CHAT MESSAGES
-- =====================================================

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system')),
  attachments JSONB DEFAULT '[]',
  is_ai_generated BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- AI CHAT CONTEXT
-- =====================================================

CREATE TABLE IF NOT EXISTS ai_chat_context (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
  context_data JSONB NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  model TEXT DEFAULT 'gpt-4',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PUSH NOTIFICATION TOKENS
-- =====================================================

CREATE TABLE IF NOT EXISTS push_notification_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  token TEXT NOT NULL UNIQUE,
  platform TEXT CHECK (platform IN ('ios', 'android', 'web')),
  device_info JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- OFFLINE SYNC QUEUE
-- =====================================================

CREATE TABLE IF NOT EXISTS offline_sync_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  action TEXT CHECK (action IN ('create', 'update', 'delete')),
  table_name TEXT NOT NULL,
  record_data JSONB NOT NULL,
  sync_status TEXT DEFAULT 'pending' CHECK (sync_status IN ('pending', 'synced', 'failed')),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  synced_at TIMESTAMPTZ
);

-- =====================================================
-- PAYMENT METHODS
-- =====================================================

CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  type TEXT CHECK (type IN ('card', 'bank_account', 'paypal', 'affirm')),
  provider TEXT CHECK (provider IN ('stripe', 'paypal', 'affirm')),
  provider_payment_method_id TEXT,
  last_four TEXT,
  brand TEXT,
  exp_month INTEGER,
  exp_year INTEGER,
  is_default BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_forum_threads_category ON forum_threads(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_threads_author ON forum_threads(author_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_thread ON forum_posts(thread_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_author ON forum_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_forum_votes_thread ON forum_votes(thread_id);
CREATE INDEX IF NOT EXISTS idx_forum_votes_post ON forum_votes(post_id);
CREATE INDEX IF NOT EXISTS idx_forum_votes_user ON forum_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user ON chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_push_tokens_user ON push_notification_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_queue_user ON offline_sync_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_methods_user ON payment_methods(user_id);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_context ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_notification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE offline_sync_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- Simple policies (allow all for now)
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "public_read_categories" ON forum_categories;
  DROP POLICY IF EXISTS "public_read_threads" ON forum_threads;
  DROP POLICY IF EXISTS "public_read_posts" ON forum_posts;
  DROP POLICY IF EXISTS "allow_all_chat_conversations" ON chat_conversations;
  DROP POLICY IF EXISTS "allow_all_chat_messages" ON chat_messages;
  DROP POLICY IF EXISTS "allow_all_push_tokens" ON push_notification_tokens;
  DROP POLICY IF EXISTS "allow_all_sync_queue" ON offline_sync_queue;
  DROP POLICY IF EXISTS "allow_all_payment_methods" ON payment_methods;
  
  -- Create new policies
  EXECUTE 'CREATE POLICY "public_read_categories" ON forum_categories FOR SELECT USING (true)';
  EXECUTE 'CREATE POLICY "public_read_threads" ON forum_threads FOR SELECT USING (true)';
  EXECUTE 'CREATE POLICY "public_read_posts" ON forum_posts FOR SELECT USING (true)';
  EXECUTE 'CREATE POLICY "allow_all_chat_conversations" ON chat_conversations FOR ALL USING (true)';
  EXECUTE 'CREATE POLICY "allow_all_chat_messages" ON chat_messages FOR ALL USING (true)';
  EXECUTE 'CREATE POLICY "allow_all_push_tokens" ON push_notification_tokens FOR ALL USING (true)';
  EXECUTE 'CREATE POLICY "allow_all_sync_queue" ON offline_sync_queue FOR ALL USING (true)';
  EXECUTE 'CREATE POLICY "allow_all_payment_methods" ON payment_methods FOR ALL USING (true)';
END $$;

-- =====================================================
-- SEED DATA
-- =====================================================

INSERT INTO forum_categories (name, description, icon, color, display_order) VALUES
('Healthcare Discussions', 'Connect with fellow healthcare students and professionals', 'heart-pulse', 'red', 1),
('Skilled Trades Community', 'Share experiences in construction, electrical, plumbing, and more', 'wrench', 'orange', 2),
('Business & Professional', 'Network with business, accounting, and management students', 'briefcase', 'blue', 3),
('Beauty & Cosmetology', 'Discuss techniques, trends, and career opportunities', 'sparkles', 'pink', 4),
('Social Services Support', 'Connect with social work and community service professionals', 'users', 'green', 5),
('Technology & IT', 'Share knowledge about programming, networking, and cybersecurity', 'laptop', 'purple', 6),
('Transportation & Logistics', 'Discuss CDL, logistics, and transportation careers', 'truck', 'yellow', 7),
('Hospitality & Food Service', 'Connect with culinary and hospitality professionals', 'utensils', 'amber', 8),
('General Discussion', 'Off-topic conversations and community building', 'message-circle', 'gray', 9),
('Career Advice', 'Get guidance on job search, interviews, and career development', 'compass', 'indigo', 10),
('Study Groups', 'Form study groups and collaborate on coursework', 'book-open', 'teal', 11),
('Success Stories', 'Share your achievements and inspire others', 'trophy', 'gold', 12)
ON CONFLICT DO NOTHING;
