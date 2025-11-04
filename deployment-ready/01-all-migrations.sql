-- Complete Database Setup
-- Execute this entire file in Supabase SQL Editor
-- Project: cuxzzpsyufcewtmicszk
-- Date: 2025-11-03

-- ============================================
-- PART 1: Admin Features Tables
-- ============================================

-- Admin Features Migration
-- Creates tables for email, webhooks, marketing, community, and AI features
-- Copyright (c) 2025 Elevate for Humanity

-- Email Queue Table
CREATE TABLE IF NOT EXISTS email_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  campaign_id UUID,
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  html TEXT,
  text TEXT,
  template TEXT,
  template_data JSONB DEFAULT '{}'::jsonb,
  from_email TEXT,
  reply_to TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'failed')),
  message_id TEXT,
  error TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_email_queue_status ON email_queue(status);
CREATE INDEX idx_email_queue_org_id ON email_queue(org_id);
CREATE INDEX idx_email_queue_created_at ON email_queue(created_at);

-- Email Logs Table
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  campaign_id UUID,
  recipients TEXT[],
  subject TEXT,
  status TEXT CHECK (status IN ('sent', 'failed')),
  message_id TEXT,
  error TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_email_logs_org_id ON email_logs(org_id);
CREATE INDEX idx_email_logs_created_at ON email_logs(created_at);
CREATE INDEX idx_email_logs_status ON email_logs(status);

-- Webhooks Table
CREATE TABLE IF NOT EXISTS webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  events TEXT[] NOT NULL DEFAULT '{}',
  secret TEXT NOT NULL,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_webhooks_org_id ON webhooks(org_id);
CREATE INDEX idx_webhooks_enabled ON webhooks(enabled);

-- Webhook Queue Table
CREATE TABLE IF NOT EXISTS webhook_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  event TEXT NOT NULL,
  data JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  result JSONB,
  error TEXT,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_webhook_queue_status ON webhook_queue(status);
CREATE INDEX idx_webhook_queue_org_id ON webhook_queue(org_id);
CREATE INDEX idx_webhook_queue_created_at ON webhook_queue(created_at);

-- Webhook Logs Table
CREATE TABLE IF NOT EXISTS webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  webhook_id UUID REFERENCES webhooks(id) ON DELETE CASCADE,
  event TEXT NOT NULL,
  payload JSONB,
  status TEXT CHECK (status IN ('delivered', 'failed')),
  status_code INTEGER,
  error TEXT,
  response_time_ms INTEGER,
  retry_count INTEGER DEFAULT 0,
  last_retry_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_webhook_logs_webhook_id ON webhook_logs(webhook_id);
CREATE INDEX idx_webhook_logs_status ON webhook_logs(status);
CREATE INDEX idx_webhook_logs_created_at ON webhook_logs(created_at);

-- Campaigns Table
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms', 'push', 'funnel')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_campaigns_org_id ON campaigns(org_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);

-- A/B Tests Table
CREATE TABLE IF NOT EXISTS ab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  entity TEXT NOT NULL,
  variants JSONB NOT NULL,
  metrics JSONB DEFAULT '{}'::jsonb,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ab_tests_org_id ON ab_tests(org_id);
CREATE INDEX idx_ab_tests_active ON ab_tests(active);

-- Funnels Table
CREATE TABLE IF NOT EXISTS funnels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  steps JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_funnels_org_id ON funnels(org_id);

-- Forums Table
CREATE TABLE IF NOT EXISTS forums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  is_private BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_forums_org_id ON forums(org_id);
CREATE INDEX idx_forums_category ON forums(category);

-- Forum Posts Table
CREATE TABLE IF NOT EXISTS forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  forum_id UUID REFERENCES forums(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_forum_posts_forum_id ON forum_posts(forum_id);
CREATE INDEX idx_forum_posts_user_id ON forum_posts(user_id);
CREATE INDEX idx_forum_posts_parent_id ON forum_posts(parent_id);
CREATE INDEX idx_forum_posts_created_at ON forum_posts(created_at);

-- Forum Members Table
CREATE TABLE IF NOT EXISTS forum_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  forum_id UUID REFERENCES forums(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(forum_id, user_id)
);

CREATE INDEX idx_forum_members_forum_id ON forum_members(forum_id);
CREATE INDEX idx_forum_members_user_id ON forum_members(user_id);

-- API Keys Table
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_prefix TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  permissions TEXT[] DEFAULT '{}',
  last_used TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_api_keys_org_id ON api_keys(org_id);
CREATE INDEX idx_api_keys_key_prefix ON api_keys(key_prefix);

-- AI Generations Table
CREATE TABLE IF NOT EXISTS ai_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('course', 'grading', 'content', 'other')),
  entity_id UUID,
  prompt TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_generations_org_id ON ai_generations(org_id);
CREATE INDEX idx_ai_generations_type ON ai_generations(type);
CREATE INDEX idx_ai_generations_created_at ON ai_generations(created_at);

-- Integrations Table
CREATE TABLE IF NOT EXISTS integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  config JSONB DEFAULT '{}'::jsonb,
  enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_integrations_org_id ON integrations(org_id);
CREATE INDEX idx_integrations_provider ON integrations(provider);
CREATE INDEX idx_integrations_enabled ON integrations(enabled);

-- Update triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_webhooks_updated_at BEFORE UPDATE ON webhooks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ab_tests_updated_at BEFORE UPDATE ON ab_tests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_funnels_updated_at BEFORE UPDATE ON funnels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forums_updated_at BEFORE UPDATE ON forums
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON forum_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments
COMMENT ON TABLE email_queue IS 'Queue for outgoing emails';
COMMENT ON TABLE email_logs IS 'Log of sent emails';
COMMENT ON TABLE webhooks IS 'Webhook configurations';
COMMENT ON TABLE webhook_queue IS 'Queue for outgoing webhooks';
COMMENT ON TABLE webhook_logs IS 'Log of webhook deliveries';
COMMENT ON TABLE campaigns IS 'Marketing campaigns';
COMMENT ON TABLE ab_tests IS 'A/B test configurations';
COMMENT ON TABLE funnels IS 'Conversion funnels';
COMMENT ON TABLE forums IS 'Community forums';
COMMENT ON TABLE forum_posts IS 'Forum posts and discussions';
COMMENT ON TABLE forum_members IS 'Forum membership';
COMMENT ON TABLE api_keys IS 'API key management';
COMMENT ON TABLE ai_generations IS 'AI generation logs';
COMMENT ON TABLE integrations IS 'Third-party integrations';

-- ============================================
-- PART 2: Missing Tables
-- ============================================

-- Missing Tables for Admin Features
-- Creates tables that are referenced but may not exist
-- Copyright (c) 2025 Elevate for Humanity

-- Analytics Events Table (if not exists)
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_org_id ON analytics_events(org_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);

-- Assessment Submissions Table (if not exists)
CREATE TABLE IF NOT EXISTS assessment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  score INTEGER,
  graded BOOLEAN DEFAULT false,
  grading_results JSONB,
  graded_at TIMESTAMPTZ,
  graded_by TEXT,
  requires_ai_grading BOOLEAN DEFAULT false,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assessment_submissions_org_id ON assessment_submissions(org_id);
CREATE INDEX IF NOT EXISTS idx_assessment_submissions_assessment_id ON assessment_submissions(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_submissions_user_id ON assessment_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_submissions_graded ON assessment_submissions(graded);

-- Assessments Table (if not exists)
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  module_id UUID,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('quiz', 'assignment', 'exam', 'survey')),
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  passing_score INTEGER DEFAULT 70,
  time_limit INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assessments_org_id ON assessments(org_id);
CREATE INDEX IF NOT EXISTS idx_assessments_course_id ON assessments(course_id);
CREATE INDEX IF NOT EXISTS idx_assessments_type ON assessments(type);

-- Audit Logs Table (if not exists)
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  changes JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_org_id ON audit_logs(org_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity_type ON audit_logs(entity_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- Badges Table (if not exists)
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  criteria JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_badges_org_id ON badges(org_id);

-- User Badges Table (if not exists)
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_badge_id ON user_badges(badge_id);

-- Leaderboards Table (if not exists)
CREATE TABLE IF NOT EXISTS leaderboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  points INTEGER DEFAULT 0,
  rank INTEGER,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_leaderboards_org_id ON leaderboards(org_id);
CREATE INDEX IF NOT EXISTS idx_leaderboards_user_id ON leaderboards(user_id);
CREATE INDEX IF NOT EXISTS idx_leaderboards_points ON leaderboards(points DESC);

-- Forum Threads Table (if not exists)
-- Note: This is an alias/view for forum_posts for backward compatibility
CREATE OR REPLACE VIEW forum_threads AS
SELECT * FROM forum_posts WHERE parent_id IS NULL;

-- Billing Subscriptions Table (if not exists)
CREATE TABLE IF NOT EXISTS billing_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  status TEXT,
  plan TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_billing_subscriptions_org_id ON billing_subscriptions(org_id);
CREATE INDEX IF NOT EXISTS idx_billing_subscriptions_stripe_subscription_id ON billing_subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_billing_subscriptions_status ON billing_subscriptions(status);

-- Entitlements Table (if not exists)
CREATE TABLE IF NOT EXISTS entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  enabled BOOLEAN DEFAULT true,
  limit_value INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, feature)
);

CREATE INDEX IF NOT EXISTS idx_entitlements_org_id ON entitlements(org_id);
CREATE INDEX IF NOT EXISTS idx_entitlements_feature ON entitlements(feature);

-- Course Versions Table (if not exists)
CREATE TABLE IF NOT EXISTS course_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  content JSONB NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, version)
);

CREATE INDEX IF NOT EXISTS idx_course_versions_course_id ON course_versions(course_id);
CREATE INDEX IF NOT EXISTS idx_course_versions_version ON course_versions(version);

-- Update triggers for updated_at
CREATE TRIGGER IF NOT EXISTS update_assessments_updated_at BEFORE UPDATE ON assessments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS update_billing_subscriptions_updated_at BEFORE UPDATE ON billing_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS update_entitlements_updated_at BEFORE UPDATE ON entitlements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS update_leaderboards_updated_at BEFORE UPDATE ON leaderboards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments
COMMENT ON TABLE analytics_events IS 'User activity and event tracking';
COMMENT ON TABLE assessment_submissions IS 'Student assessment submissions';
COMMENT ON TABLE assessments IS 'Quizzes, exams, and assignments';
COMMENT ON TABLE audit_logs IS 'System audit trail';
COMMENT ON TABLE badges IS 'Achievement badges';
COMMENT ON TABLE user_badges IS 'User earned badges';
COMMENT ON TABLE leaderboards IS 'User points and rankings';
COMMENT ON TABLE billing_subscriptions IS 'Stripe subscription data';
COMMENT ON TABLE entitlements IS 'Organization feature entitlements';
COMMENT ON TABLE course_versions IS 'Course version history';

-- ============================================
-- PART 3: Admin Features RLS Policies
-- ============================================

-- RLS Policies for Admin Features
-- Copyright (c) 2025 Elevate for Humanity

-- Enable RLS on all tables
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE funnels ENABLE ROW LEVEL SECURITY;
ALTER TABLE forums ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin/owner
CREATE OR REPLACE FUNCTION is_org_admin(check_org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM org_members
    WHERE org_id = check_org_id
    AND user_id = auth.uid()
    AND role IN ('admin', 'owner')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Email Queue Policies
CREATE POLICY "Service role can manage email queue"
  ON email_queue FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Admins can view email queue"
  ON email_queue FOR SELECT
  USING (is_org_admin(org_id));

-- Email Logs Policies
CREATE POLICY "Service role can manage email logs"
  ON email_logs FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Admins can view email logs"
  ON email_logs FOR SELECT
  USING (is_org_admin(org_id));

-- Webhooks Policies
CREATE POLICY "Service role can manage webhooks"
  ON webhooks FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Admins can manage webhooks"
  ON webhooks FOR ALL
  USING (is_org_admin(org_id));

-- Webhook Queue Policies
CREATE POLICY "Service role can manage webhook queue"
  ON webhook_queue FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Admins can view webhook queue"
  ON webhook_queue FOR SELECT
  USING (is_org_admin(org_id));

-- Webhook Logs Policies
CREATE POLICY "Service role can manage webhook logs"
  ON webhook_logs FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Admins can view webhook logs"
  ON webhook_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM webhooks
      WHERE webhooks.id = webhook_logs.webhook_id
      AND is_org_admin(webhooks.org_id)
    )
  );

-- Campaigns Policies
CREATE POLICY "Admins can manage campaigns"
  ON campaigns FOR ALL
  USING (is_org_admin(org_id));

CREATE POLICY "Users can view active campaigns"
  ON campaigns FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.org_id = campaigns.org_id
      AND org_members.user_id = auth.uid()
    )
    AND status = 'active'
  );

-- A/B Tests Policies
CREATE POLICY "Admins can manage ab tests"
  ON ab_tests FOR ALL
  USING (is_org_admin(org_id));

CREATE POLICY "Users can view active ab tests"
  ON ab_tests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.org_id = ab_tests.org_id
      AND org_members.user_id = auth.uid()
    )
    AND active = true
  );

-- Funnels Policies
CREATE POLICY "Admins can manage funnels"
  ON funnels FOR ALL
  USING (is_org_admin(org_id));

CREATE POLICY "Users can view funnels"
  ON funnels FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.org_id = funnels.org_id
      AND org_members.user_id = auth.uid()
    )
  );

-- Forums Policies
CREATE POLICY "Admins can manage forums"
  ON forums FOR ALL
  USING (is_org_admin(org_id));

CREATE POLICY "Users can view public forums"
  ON forums FOR SELECT
  USING (
    NOT is_private
    OR EXISTS (
      SELECT 1 FROM forum_members
      WHERE forum_members.forum_id = forums.id
      AND forum_members.user_id = auth.uid()
    )
  );

-- Forum Posts Policies
CREATE POLICY "Users can view forum posts"
  ON forum_posts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM forums
      WHERE forums.id = forum_posts.forum_id
      AND (
        NOT forums.is_private
        OR EXISTS (
          SELECT 1 FROM forum_members
          WHERE forum_members.forum_id = forums.id
          AND forum_members.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can create forum posts"
  ON forum_posts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM forums
      WHERE forums.id = forum_posts.forum_id
      AND EXISTS (
        SELECT 1 FROM forum_members
        WHERE forum_members.forum_id = forums.id
        AND forum_members.user_id = auth.uid()
      )
    )
    AND user_id = auth.uid()
  );

CREATE POLICY "Users can update own posts"
  ON forum_posts FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Moderators can manage posts"
  ON forum_posts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM forum_members
      WHERE forum_members.forum_id = forum_posts.forum_id
      AND forum_members.user_id = auth.uid()
      AND forum_members.role IN ('moderator', 'admin')
    )
  );

-- Forum Members Policies
CREATE POLICY "Users can view forum members"
  ON forum_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM forums
      WHERE forums.id = forum_members.forum_id
      AND (
        NOT forums.is_private
        OR EXISTS (
          SELECT 1 FROM forum_members fm
          WHERE fm.forum_id = forums.id
          AND fm.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can join public forums"
  ON forum_members FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM forums
      WHERE forums.id = forum_members.forum_id
      AND NOT forums.is_private
    )
    AND user_id = auth.uid()
  );

CREATE POLICY "Admins can manage forum members"
  ON forum_members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM forums
      WHERE forums.id = forum_members.forum_id
      AND is_org_admin(forums.org_id)
    )
  );

-- API Keys Policies
CREATE POLICY "Admins can manage api keys"
  ON api_keys FOR ALL
  USING (is_org_admin(org_id));

-- AI Generations Policies
CREATE POLICY "Service role can manage ai generations"
  ON ai_generations FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Admins can view ai generations"
  ON ai_generations FOR SELECT
  USING (is_org_admin(org_id));

CREATE POLICY "Users can view own ai generations"
  ON ai_generations FOR SELECT
  USING (user_id = auth.uid());

-- Integrations Policies
CREATE POLICY "Admins can manage integrations"
  ON integrations FOR ALL
  USING (is_org_admin(org_id));

CREATE POLICY "Users can view enabled integrations"
  ON integrations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.org_id = integrations.org_id
      AND org_members.user_id = auth.uid()
    )
    AND enabled = true
  );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- ============================================
-- PART 4: Missing Tables RLS Policies
-- ============================================

-- RLS Policies for Missing Tables
-- Copyright (c) 2025 Elevate for Humanity

-- Enable RLS
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_versions ENABLE ROW LEVEL SECURITY;

-- Analytics Events Policies
CREATE POLICY "Service role can manage analytics events"
  ON analytics_events FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Admins can view analytics events"
  ON analytics_events FOR SELECT
  USING (is_org_admin(org_id));

CREATE POLICY "Users can view own analytics events"
  ON analytics_events FOR SELECT
  USING (user_id = auth.uid());

-- Assessment Submissions Policies
CREATE POLICY "Users can view own submissions"
  ON assessment_submissions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own submissions"
  ON assessment_submissions FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all submissions"
  ON assessment_submissions FOR SELECT
  USING (is_org_admin(org_id));

CREATE POLICY "Admins can update submissions"
  ON assessment_submissions FOR UPDATE
  USING (is_org_admin(org_id));

CREATE POLICY "Service role can manage submissions"
  ON assessment_submissions FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- Assessments Policies
CREATE POLICY "Admins can manage assessments"
  ON assessments FOR ALL
  USING (is_org_admin(org_id));

CREATE POLICY "Users can view assessments"
  ON assessments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE enrollments.course_id = assessments.course_id
      AND enrollments.user_id = auth.uid()
    )
  );

-- Audit Logs Policies
CREATE POLICY "Service role can manage audit logs"
  ON audit_logs FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Admins can view audit logs"
  ON audit_logs FOR SELECT
  USING (is_org_admin(org_id));

-- Badges Policies
CREATE POLICY "Admins can manage badges"
  ON badges FOR ALL
  USING (is_org_admin(org_id));

CREATE POLICY "Users can view badges"
  ON badges FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.org_id = badges.org_id
      AND org_members.user_id = auth.uid()
    )
  );

-- User Badges Policies
CREATE POLICY "Users can view own badges"
  ON user_badges FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can view other badges"
  ON user_badges FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      JOIN org_members ON users.id = org_members.user_id
      WHERE users.id = user_badges.user_id
      AND org_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can manage user badges"
  ON user_badges FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- Leaderboards Policies
CREATE POLICY "Users can view leaderboards"
  ON leaderboards FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.org_id = leaderboards.org_id
      AND org_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can manage leaderboards"
  ON leaderboards FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- Billing Subscriptions Policies
CREATE POLICY "Admins can view billing subscriptions"
  ON billing_subscriptions FOR SELECT
  USING (is_org_admin(org_id));

CREATE POLICY "Service role can manage billing subscriptions"
  ON billing_subscriptions FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- Entitlements Policies
CREATE POLICY "Admins can view entitlements"
  ON entitlements FOR SELECT
  USING (is_org_admin(org_id));

CREATE POLICY "Users can view org entitlements"
  ON entitlements FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.org_id = entitlements.org_id
      AND org_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can manage entitlements"
  ON entitlements FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- Course Versions Policies
CREATE POLICY "Admins can manage course versions"
  ON course_versions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = course_versions.course_id
      AND is_org_admin(courses.org_id)
    )
  );

CREATE POLICY "Users can view course versions"
  ON course_versions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM courses
      JOIN enrollments ON courses.id = enrollments.course_id
      WHERE courses.id = course_versions.course_id
      AND enrollments.user_id = auth.uid()
    )
  );

-- ============================================
-- PART 5: Cron Jobs
-- ============================================

-- Cron Jobs Configuration
-- Sets up automated queue processing for Edge Functions
-- Copyright (c) 2025 Elevate for Humanity

-- Enable pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Helper function to get service role key
CREATE OR REPLACE FUNCTION get_service_role_key()
RETURNS TEXT AS $$
BEGIN
  RETURN current_setting('app.settings.service_role_key', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get project URL
CREATE OR REPLACE FUNCTION get_project_url()
RETURNS TEXT AS $$
BEGIN
  RETURN current_setting('app.settings.project_url', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Email Queue Processing (Every 5 minutes)
-- Processes pending emails in the queue
SELECT cron.schedule(
  'process-email-queue',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := get_project_url() || '/functions/v1/email-dispatch?action=process-queue',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || get_service_role_key(),
      'Content-Type', 'application/json'
    ),
    body := '{}'::jsonb
  );
  $$
);

-- Webhook Queue Processing (Every 2 minutes)
-- Processes pending webhooks in the queue
SELECT cron.schedule(
  'process-webhook-queue',
  '*/2 * * * *',
  $$
  SELECT net.http_post(
    url := get_project_url() || '/functions/v1/webhook-dispatch?action=process-queue',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || get_service_role_key(),
      'Content-Type', 'application/json'
    ),
    body := '{}'::jsonb
  );
  $$
);

-- Webhook Retry Failed (Every hour)
-- Retries failed webhook deliveries
SELECT cron.schedule(
  'retry-failed-webhooks',
  '0 * * * *',
  $$
  SELECT net.http_post(
    url := get_project_url() || '/functions/v1/webhook-dispatch?action=retry-failed',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || get_service_role_key(),
      'Content-Type', 'application/json'
    ),
    body := '{}'::jsonb
  );
  $$
);

-- AI Grading Queue Processing (Every 10 minutes)
-- Processes pending AI grading requests
SELECT cron.schedule(
  'process-grading-queue',
  '*/10 * * * *',
  $$
  SELECT net.http_post(
    url := get_project_url() || '/functions/v1/grade-ai?action=process-queue',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || get_service_role_key(),
      'Content-Type', 'application/json'
    ),
    body := '{}'::jsonb
  );
  $$
);

-- Cleanup Old Logs (Daily at 2 AM)
-- Removes logs older than 90 days
SELECT cron.schedule(
  'cleanup-old-logs',
  '0 2 * * *',
  $$
  DELETE FROM email_logs WHERE created_at < NOW() - INTERVAL '90 days';
  DELETE FROM webhook_logs WHERE created_at < NOW() - INTERVAL '90 days';
  DELETE FROM analytics_events WHERE created_at < NOW() - INTERVAL '90 days';
  $$
);

-- Cleanup Completed Queue Items (Daily at 3 AM)
-- Removes completed queue items older than 7 days
SELECT cron.schedule(
  'cleanup-completed-queues',
  '0 3 * * *',
  $$
  DELETE FROM email_queue WHERE status = 'sent' AND sent_at < NOW() - INTERVAL '7 days';
  DELETE FROM webhook_queue WHERE status = 'completed' AND processed_at < NOW() - INTERVAL '7 days';
  $$
);

-- View all scheduled jobs
COMMENT ON EXTENSION pg_cron IS 'Cron jobs for automated queue processing';

-- To view all cron jobs:
-- SELECT * FROM cron.job;

-- To unschedule a job:
-- SELECT cron.unschedule('job-name');

-- To view job run history:
-- SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 100;
