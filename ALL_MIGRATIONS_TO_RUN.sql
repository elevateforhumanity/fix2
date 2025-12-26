-- ============================================
-- RUN ALL 13 MIGRATIONS IN ORDER
-- Copy this entire file and paste into Supabase SQL Editor
-- ============================================

-- MIGRATION 1: STAFF TRAINING SYSTEM
-- Staff Training System
-- Tables for training modules and staff progress tracking

-- Training Modules Table
CREATE TABLE IF NOT EXISTS training_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration INTEGER, -- in minutes
  quiz_questions JSONB DEFAULT '[]'::jsonb,
  required BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Staff Training Progress Table
CREATE TABLE IF NOT EXISTS staff_training_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES training_modules(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ,
  quiz_score INTEGER,
  certification_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_training_modules_required ON training_modules(required);
CREATE INDEX IF NOT EXISTS idx_training_modules_order ON training_modules(order_index);
CREATE INDEX IF NOT EXISTS idx_staff_training_progress_user ON staff_training_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_staff_training_progress_module ON staff_training_progress(module_id);

-- RLS
ALTER TABLE training_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_training_progress ENABLE ROW LEVEL SECURITY;

-- Anyone can view training modules
CREATE POLICY "Anyone can view training modules"
  ON training_modules FOR SELECT
  USING (true);

-- Admin can manage training modules
CREATE POLICY "Admin can manage training modules"
  ON training_modules FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Users can view their own progress
CREATE POLICY "Users can view own training progress"
  ON staff_training_progress FOR SELECT
  USING (user_id = auth.uid());

-- Users can insert their own progress
CREATE POLICY "Users can insert own training progress"
  ON staff_training_progress FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Users can update their own progress
CREATE POLICY "Users can update own training progress"
  ON staff_training_progress FOR UPDATE
  USING (user_id = auth.uid());

-- Admin can view all progress
CREATE POLICY "Admin can view all training progress"
  ON staff_training_progress FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

COMMENT ON TABLE training_modules IS 'Training modules for staff';
COMMENT ON TABLE staff_training_progress IS 'Staff progress through training modules';

-- MIGRATION 2: PROCESS DOCUMENTATION SYSTEM
-- Process Documentation System
-- Tables for documenting internal processes with step-by-step guides

-- Processes Table
CREATE TABLE IF NOT EXISTS processes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  documents_required TEXT[],
  average_time INTEGER, -- in minutes
  completion_rate DECIMAL(5,2),
  category TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Process Steps Table
CREATE TABLE IF NOT EXISTS process_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  process_id UUID NOT NULL REFERENCES processes(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  screenshot_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(process_id, step_number)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_processes_category ON processes(category);
CREATE INDEX IF NOT EXISTS idx_processes_created_by ON processes(created_by);
CREATE INDEX IF NOT EXISTS idx_process_steps_process ON process_steps(process_id);
CREATE INDEX IF NOT EXISTS idx_process_steps_order ON process_steps(process_id, step_number);

-- RLS
ALTER TABLE processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;

-- Staff can view all processes
CREATE POLICY "Staff can view processes"
  ON processes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'staff', 'advisor')
    )
  );

-- Admin can manage processes
CREATE POLICY "Admin can manage processes"
  ON processes FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Staff can view all process steps
CREATE POLICY "Staff can view process steps"
  ON process_steps FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'staff', 'advisor')
    )
  );

-- Admin can manage process steps
CREATE POLICY "Admin can manage process steps"
  ON process_steps FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

COMMENT ON TABLE processes IS 'Internal process documentation';
COMMENT ON TABLE process_steps IS 'Step-by-step instructions for processes';

-- MIGRATION 3: QA CHECKLIST SYSTEM
-- QA Checklist System
-- Tables for quality assurance checklists and completions

-- QA Checklists Table
CREATE TABLE IF NOT EXISTS qa_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  frequency TEXT CHECK (frequency IN ('daily', 'weekly', 'monthly', 'quarterly')),
  tasks JSONB DEFAULT '[]'::jsonb,
  assignee_role TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- QA Checklist Completions Table
CREATE TABLE IF NOT EXISTS qa_checklist_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  checklist_id UUID NOT NULL REFERENCES qa_checklists(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_qa_checklists_frequency ON qa_checklists(frequency);
CREATE INDEX IF NOT EXISTS idx_qa_checklists_role ON qa_checklists(assignee_role);
CREATE INDEX IF NOT EXISTS idx_qa_checklists_active ON qa_checklists(is_active);
CREATE INDEX IF NOT EXISTS idx_qa_completions_checklist ON qa_checklist_completions(checklist_id);
CREATE INDEX IF NOT EXISTS idx_qa_completions_user ON qa_checklist_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_qa_completions_date ON qa_checklist_completions(completed_at);

-- RLS
ALTER TABLE qa_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE qa_checklist_completions ENABLE ROW LEVEL SECURITY;

-- Staff can view active checklists
CREATE POLICY "Staff can view active checklists"
  ON qa_checklists FOR SELECT
  USING (
    is_active = true
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'staff', 'advisor')
    )
  );

-- Admin can manage checklists
CREATE POLICY "Admin can manage checklists"
  ON qa_checklists FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Users can view their own completions
CREATE POLICY "Users can view own completions"
  ON qa_checklist_completions FOR SELECT
  USING (user_id = auth.uid());

-- Users can insert their own completions
CREATE POLICY "Users can insert own completions"
  ON qa_checklist_completions FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Admin can view all completions
CREATE POLICY "Admin can view all completions"
  ON qa_checklist_completions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Admin can update completions (for approval)
CREATE POLICY "Admin can update completions"
  ON qa_checklist_completions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

COMMENT ON TABLE qa_checklists IS 'Quality assurance checklists';
COMMENT ON TABLE qa_checklist_completions IS 'Completed QA checklists';

-- MIGRATION 4: CUSTOMER SERVICE SYSTEM
-- Customer Service System
-- Tables for customer service protocols and ticket management

-- Customer Service Protocols Table
CREATE TABLE IF NOT EXISTS customer_service_protocols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  dos TEXT[],
  donts TEXT[],
  examples JSONB DEFAULT '[]'::jsonb,
  escalation_rules TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service Tickets Table
CREATE TABLE IF NOT EXISTS service_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  issue TEXT NOT NULL,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')) DEFAULT 'open',
  assigned_to UUID REFERENCES auth.users(id),
  resolution TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_service_protocols_category ON customer_service_protocols(category);
CREATE INDEX IF NOT EXISTS idx_service_tickets_student ON service_tickets(student_id);
CREATE INDEX IF NOT EXISTS idx_service_tickets_assigned ON service_tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_service_tickets_status ON service_tickets(status);
CREATE INDEX IF NOT EXISTS idx_service_tickets_priority ON service_tickets(priority);

-- RLS
ALTER TABLE customer_service_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_tickets ENABLE ROW LEVEL SECURITY;

-- Staff can view protocols
CREATE POLICY "Staff can view protocols"
  ON customer_service_protocols FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'staff', 'advisor')
    )
  );

-- Admin can manage protocols
CREATE POLICY "Admin can manage protocols"
  ON customer_service_protocols FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Staff can view tickets
CREATE POLICY "Staff can view tickets"
  ON service_tickets FOR SELECT
  USING (
    student_id = auth.uid()
    OR assigned_to = auth.uid()
    OR created_by = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'staff', 'advisor')
    )
  );

-- Staff can create tickets
CREATE POLICY "Staff can create tickets"
  ON service_tickets FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'staff', 'advisor')
    )
  );

-- Staff can update assigned tickets
CREATE POLICY "Staff can update tickets"
  ON service_tickets FOR UPDATE
  USING (
    assigned_to = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

COMMENT ON TABLE customer_service_protocols IS 'Customer service guidelines and protocols';
COMMENT ON TABLE service_tickets IS 'Customer service tickets';

-- MIGRATION 5: PERFORMANCE ANALYTICS SYSTEM
-- Performance and Analytics System
-- Tables for tracking performance metrics, page views, and conversions

-- Performance Metrics Table
CREATE TABLE IF NOT EXISTS performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  value DECIMAL(12,2) NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page Views Table
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversions Table
CREATE TABLE IF NOT EXISTS conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  conversion_type TEXT NOT NULL CHECK (conversion_type IN (
    'application_submitted',
    'enrollment_completed',
    'payment_completed',
    'course_completed',
    'certificate_earned',
    'appointment_booked',
    'donation_made',
    'event_registered',
    'referral_completed'
  )),
  value DECIMAL(10,2),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_performance_metrics_date ON performance_metrics(date);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_category ON performance_metrics(category);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_name ON performance_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_user ON page_views(user_id);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_conversions_user ON conversions(user_id);
CREATE INDEX IF NOT EXISTS idx_conversions_type ON conversions(conversion_type);
CREATE INDEX IF NOT EXISTS idx_conversions_created ON conversions(created_at);

-- RLS
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;

-- Admin can view all metrics
CREATE POLICY "Admin can view all metrics"
  ON performance_metrics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Admin can insert metrics
CREATE POLICY "Admin can insert metrics"
  ON performance_metrics FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Admin can view all page views
CREATE POLICY "Admin can view all page views"
  ON page_views FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Anyone can insert page views (for tracking)
CREATE POLICY "Anyone can insert page views"
  ON page_views FOR INSERT
  WITH CHECK (true);

-- Admin can view all conversions
CREATE POLICY "Admin can view all conversions"
  ON conversions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Users can view their own conversions
CREATE POLICY "Users can view own conversions"
  ON conversions FOR SELECT
  USING (user_id = auth.uid());

-- System can insert conversions
CREATE POLICY "System can insert conversions"
  ON conversions FOR INSERT
  WITH CHECK (true);

COMMENT ON TABLE performance_metrics IS 'Performance metrics tracking';
COMMENT ON TABLE page_views IS 'Page view analytics';
COMMENT ON TABLE conversions IS 'Conversion tracking';

-- Seed initial performance metrics
INSERT INTO performance_metrics (metric_name, value, date, category) VALUES
  ('total_students', 0, CURRENT_DATE, 'students'),
  ('active_enrollments', 0, CURRENT_DATE, 'enrollments'),
  ('completion_rate', 0, CURRENT_DATE, 'performance'),
  ('revenue', 0, CURRENT_DATE, 'financial'),
  ('applications_submitted', 0, CURRENT_DATE, 'applications')
ON CONFLICT DO NOTHING;

-- MIGRATION 6: TAX DOCUMENTS SYSTEM
-- Tax Documents System
-- Secure document upload and management for tax filing

-- Tax Documents Table
CREATE TABLE IF NOT EXISTS tax_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  upload_date TIMESTAMPTZ DEFAULT NOW(),
  virus_scan_status TEXT CHECK (virus_scan_status IN ('pending', 'clean', 'infected', 'failed')) DEFAULT 'pending',
  encrypted BOOLEAN DEFAULT true,
  document_category TEXT CHECK (document_category IN (
    'w2',
    '1099',
    'id_verification',
    'social_security_card',
    'bank_statement',
    'other'
  )),
  tax_year INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tax_documents_user ON tax_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_documents_scan_status ON tax_documents(virus_scan_status);
CREATE INDEX IF NOT EXISTS idx_tax_documents_category ON tax_documents(document_category);
CREATE INDEX IF NOT EXISTS idx_tax_documents_tax_year ON tax_documents(tax_year);
CREATE INDEX IF NOT EXISTS idx_tax_documents_upload_date ON tax_documents(upload_date);

-- RLS
ALTER TABLE tax_documents ENABLE ROW LEVEL SECURITY;

-- Users can view their own documents
CREATE POLICY "Users can view own tax documents"
  ON tax_documents FOR SELECT
  USING (user_id = auth.uid());

-- Users can insert their own documents
CREATE POLICY "Users can insert own tax documents"
  ON tax_documents FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Users can delete their own documents
CREATE POLICY "Users can delete own tax documents"
  ON tax_documents FOR DELETE
  USING (user_id = auth.uid());

-- Admin and tax preparers can view all documents
CREATE POLICY "Admin can view all tax documents"
  ON tax_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'tax_preparer')
    )
  );

-- Admin can manage all documents
CREATE POLICY "Admin can manage tax documents"
  ON tax_documents FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

COMMENT ON TABLE tax_documents IS 'Secure tax document storage with virus scanning';

-- MIGRATION 7: VOLUNTEER APPLICATIONS SYSTEM
-- Volunteer Applications System
-- VITA volunteer application and background check management

-- Volunteer Applications Table
CREATE TABLE IF NOT EXISTS volunteer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  availability JSONB DEFAULT '[]'::jsonb,
  experience TEXT,
  certifications TEXT[],
  background_check_status TEXT CHECK (background_check_status IN (
    'not_started',
    'pending',
    'in_progress',
    'approved',
    'rejected',
    'expired'
  )) DEFAULT 'not_started',
  background_check_date TIMESTAMPTZ,
  background_check_expiry TIMESTAMPTZ,
  approval_status TEXT CHECK (approval_status IN (
    'pending',
    'approved',
    'rejected',
    'waitlisted'
  )) DEFAULT 'pending',
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  irs_certification_number TEXT,
  irs_certification_expiry TIMESTAMPTZ,
  training_completed BOOLEAN DEFAULT false,
  training_completed_at TIMESTAMPTZ,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_email ON volunteer_applications(email);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_status ON volunteer_applications(approval_status);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_background ON volunteer_applications(background_check_status);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_user ON volunteer_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_created ON volunteer_applications(created_at);

-- RLS
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Users can view their own applications
CREATE POLICY "Users can view own volunteer applications"
  ON volunteer_applications FOR SELECT
  USING (
    user_id = auth.uid()
    OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Anyone can submit applications
CREATE POLICY "Anyone can submit volunteer applications"
  ON volunteer_applications FOR INSERT
  WITH CHECK (true);

-- Users can update their own pending applications
CREATE POLICY "Users can update own pending applications"
  ON volunteer_applications FOR UPDATE
  USING (
    user_id = auth.uid()
    AND approval_status = 'pending'
  );

-- Admin can view all applications
CREATE POLICY "Admin can view all volunteer applications"
  ON volunteer_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'tax_coordinator')
    )
  );

-- Admin can manage all applications
CREATE POLICY "Admin can manage volunteer applications"
  ON volunteer_applications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'tax_coordinator')
    )
  );

COMMENT ON TABLE volunteer_applications IS 'VITA volunteer applications with background checks';

-- MIGRATION 8: DONATIONS AND CAMPAIGNS SYSTEM
-- Donations and Campaigns System
-- Full Stripe integration for Rise Foundation donations

-- Campaigns Table
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  goal_amount DECIMAL(10,2) NOT NULL,
  current_amount DECIMAL(10,2) DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  image_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Donations Table
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  donor_phone TEXT,
  amount DECIMAL(10,2) NOT NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  payment_status TEXT CHECK (payment_status IN (
    'pending',
    'processing',
    'succeeded',
    'failed',
    'refunded',
    'cancelled'
  )) DEFAULT 'pending',
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_checkout_session_id TEXT,
  receipt_sent BOOLEAN DEFAULT false,
  receipt_sent_at TIMESTAMPTZ,
  is_recurring BOOLEAN DEFAULT false,
  recurring_frequency TEXT CHECK (recurring_frequency IN ('monthly', 'quarterly', 'yearly')),
  stripe_subscription_id TEXT,
  anonymous BOOLEAN DEFAULT false,
  message TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_campaigns_active ON campaigns(is_active);
CREATE INDEX IF NOT EXISTS idx_campaigns_dates ON campaigns(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_donations_campaign ON donations(campaign_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(payment_status);
CREATE INDEX IF NOT EXISTS idx_donations_stripe_intent ON donations(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_donations_stripe_session ON donations(stripe_checkout_session_id);
CREATE INDEX IF NOT EXISTS idx_donations_user ON donations(user_id);
CREATE INDEX IF NOT EXISTS idx_donations_email ON donations(donor_email);
CREATE INDEX IF NOT EXISTS idx_donations_created ON donations(created_at);

-- RLS
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Anyone can view active campaigns
CREATE POLICY "Anyone can view active campaigns"
  ON campaigns FOR SELECT
  USING (is_active = true);

-- Admin can manage campaigns
CREATE POLICY "Admin can manage campaigns"
  ON campaigns FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Users can view their own donations
CREATE POLICY "Users can view own donations"
  ON donations FOR SELECT
  USING (
    user_id = auth.uid()
    OR donor_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Anyone can create donations (for checkout)
CREATE POLICY "Anyone can create donations"
  ON donations FOR INSERT
  WITH CHECK (true);

-- System can update donations (for webhooks)
CREATE POLICY "System can update donations"
  ON donations FOR UPDATE
  USING (true);

-- Admin can view all donations
CREATE POLICY "Admin can view all donations"
  ON donations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Function to update campaign amount when donation succeeds
CREATE OR REPLACE FUNCTION update_campaign_amount()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.payment_status = 'succeeded' AND (OLD.payment_status IS NULL OR OLD.payment_status != 'succeeded') THEN
    UPDATE campaigns
    SET current_amount = current_amount + NEW.amount,
        updated_at = NOW()
    WHERE id = NEW.campaign_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER donation_succeeded_update_campaign
AFTER INSERT OR UPDATE ON donations
FOR EACH ROW
EXECUTE FUNCTION update_campaign_amount();

COMMENT ON TABLE campaigns IS 'Fundraising campaigns for Rise Foundation';
COMMENT ON TABLE donations IS 'Donations with Stripe integration';

-- Seed initial campaign
INSERT INTO campaigns (name, description, goal_amount, start_date, is_active) VALUES
  ('General Fund', 'Support our mission to elevate individuals and communities through education and workforce development.', 50000.00, CURRENT_DATE, true)
ON CONFLICT DO NOTHING;

-- MIGRATION 9: REVIEWS SYSTEM
-- Reviews System
-- Customer reviews with moderation and platform syncing

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  response TEXT,
  responded_by UUID REFERENCES auth.users(id),
  responded_at TIMESTAMPTZ,
  platform_synced BOOLEAN DEFAULT false,
  synced_platforms TEXT[],
  moderation_status TEXT CHECK (moderation_status IN (
    'pending',
    'approved',
    'rejected',
    'flagged'
  )) DEFAULT 'pending',
  moderated_by UUID REFERENCES auth.users(id),
  moderated_at TIMESTAMPTZ,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(moderation_status);
CREATE INDEX IF NOT EXISTS idx_reviews_featured ON reviews(is_featured);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews(created_at);

-- RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved reviews
CREATE POLICY "Anyone can view approved reviews"
  ON reviews FOR SELECT
  USING (moderation_status = 'approved');

-- Users can view their own reviews
CREATE POLICY "Users can view own reviews"
  ON reviews FOR SELECT
  USING (user_id = auth.uid());

-- Anyone can submit reviews
CREATE POLICY "Anyone can submit reviews"
  ON reviews FOR INSERT
  WITH CHECK (true);

-- Admin can view all reviews
CREATE POLICY "Admin can view all reviews"
  ON reviews FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Admin can manage reviews
CREATE POLICY "Admin can manage reviews"
  ON reviews FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

COMMENT ON TABLE reviews IS 'Customer reviews with moderation';

