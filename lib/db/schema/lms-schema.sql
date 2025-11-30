-- Universal LMS Multi-Tenant Database Schema
-- Supports unlimited clients with full isolation and white-label capabilities

-- ============================================================================
-- TENANT MANAGEMENT
-- ============================================================================

CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  domain VARCHAR(255) UNIQUE,
  custom_domain VARCHAR(255) UNIQUE,
  
  -- White-label branding
  logo_url TEXT,
  favicon_url TEXT,
  primary_color VARCHAR(7) DEFAULT '#ea580c',
  secondary_color VARCHAR(7) DEFAULT '#2563eb',
  accent_color VARCHAR(7) DEFAULT '#16a34a',
  
  -- Configuration
  settings JSONB DEFAULT '{}',
  features JSONB DEFAULT '{}',
  limits JSONB DEFAULT '{"max_students": 1000, "max_courses": 100, "max_storage_gb": 50}',
  
  -- Subscription
  plan VARCHAR(50) DEFAULT 'free',
  subscription_status VARCHAR(50) DEFAULT 'active',
  trial_ends_at TIMESTAMPTZ,
  subscription_ends_at TIMESTAMPTZ,
  
  -- Metadata
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_tenants_domain ON tenants(domain);
CREATE INDEX idx_tenants_status ON tenants(status);

-- ============================================================================
-- USER MANAGEMENT (Multi-tenant)
-- ============================================================================

CREATE TABLE tenant_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  -- User info
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  phone VARCHAR(50),
  
  -- Authentication
  password_hash TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  email_verified_at TIMESTAMPTZ,
  
  -- Roles: super_admin, admin, instructor, student, guest
  role VARCHAR(50) DEFAULT 'student',
  permissions JSONB DEFAULT '[]',
  
  -- Profile
  bio TEXT,
  timezone VARCHAR(100) DEFAULT 'America/New_York',
  language VARCHAR(10) DEFAULT 'en',
  preferences JSONB DEFAULT '{}',
  
  -- Status
  status VARCHAR(50) DEFAULT 'active',
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  
  UNIQUE(tenant_id, email)
);

CREATE INDEX idx_tenant_users_tenant ON tenant_users(tenant_id);
CREATE INDEX idx_tenant_users_email ON tenant_users(email);
CREATE INDEX idx_tenant_users_role ON tenant_users(role);
CREATE INDEX idx_tenant_users_status ON tenant_users(status);

-- ============================================================================
-- COURSE MANAGEMENT
-- ============================================================================

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  -- Basic info
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  short_description TEXT,
  
  -- Content
  thumbnail_url TEXT,
  trailer_video_url TEXT,
  syllabus_url TEXT,
  
  -- Categorization
  category VARCHAR(100),
  tags TEXT[],
  level VARCHAR(50), -- beginner, intermediate, advanced
  language VARCHAR(10) DEFAULT 'en',
  
  -- Instructor
  instructor_id UUID REFERENCES tenant_users(id),
  co_instructors UUID[],
  
  -- Pricing
  price DECIMAL(10,2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'USD',
  is_free BOOLEAN DEFAULT TRUE,
  
  -- Settings
  duration_hours INTEGER,
  max_students INTEGER,
  enrollment_type VARCHAR(50) DEFAULT 'open', -- open, approval_required, invite_only
  certificate_enabled BOOLEAN DEFAULT TRUE,
  
  -- Scheduling
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  enrollment_deadline TIMESTAMPTZ,
  
  -- Status
  status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
  published_at TIMESTAMPTZ,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  
  UNIQUE(tenant_id, slug)
);

CREATE INDEX idx_courses_tenant ON courses(tenant_id);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_category ON courses(category);

-- ============================================================================
-- COURSE STRUCTURE
-- ============================================================================

CREATE TABLE course_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  
  -- Settings
  is_locked BOOLEAN DEFAULT FALSE,
  unlock_date TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_course_sections_course ON course_sections(course_id);
CREATE INDEX idx_course_sections_order ON course_sections(course_id, order_index);

CREATE TABLE course_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  section_id UUID REFERENCES course_sections(id) ON DELETE CASCADE,
  
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  
  -- Content
  content_type VARCHAR(50), -- video, text, quiz, assignment, scorm, live_session
  content TEXT,
  video_url TEXT,
  video_duration INTEGER, -- seconds
  attachments JSONB DEFAULT '[]',
  
  -- Settings
  is_preview BOOLEAN DEFAULT FALSE,
  is_required BOOLEAN DEFAULT TRUE,
  estimated_duration INTEGER, -- minutes
  
  -- Completion criteria
  completion_type VARCHAR(50) DEFAULT 'manual', -- manual, video_watched, quiz_passed, assignment_submitted
  passing_score INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(course_id, slug)
);

CREATE INDEX idx_course_lessons_course ON course_lessons(course_id);
CREATE INDEX idx_course_lessons_section ON course_lessons(section_id);
CREATE INDEX idx_course_lessons_order ON course_lessons(course_id, order_index);

-- ============================================================================
-- ENROLLMENT & PROGRESS
-- ============================================================================

CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES tenant_users(id) ON DELETE CASCADE,
  
  -- Enrollment details
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  enrollment_type VARCHAR(50) DEFAULT 'self', -- self, admin, bulk, api
  
  -- Progress
  status VARCHAR(50) DEFAULT 'active', -- active, completed, dropped, suspended
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  completed_lessons INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  
  -- Completion
  completed_at TIMESTAMPTZ,
  certificate_issued_at TIMESTAMPTZ,
  certificate_url TEXT,
  
  -- Grading
  final_grade DECIMAL(5,2),
  grade_letter VARCHAR(2),
  
  -- Access
  access_expires_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(tenant_id, course_id, student_id)
);

CREATE INDEX idx_enrollments_tenant ON enrollments(tenant_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);

CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES course_lessons(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES tenant_users(id) ON DELETE CASCADE,
  
  -- Progress
  status VARCHAR(50) DEFAULT 'not_started', -- not_started, in_progress, completed
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  
  -- Video tracking
  video_position INTEGER DEFAULT 0, -- seconds
  video_completed BOOLEAN DEFAULT FALSE,
  
  -- Completion
  completed_at TIMESTAMPTZ,
  time_spent INTEGER DEFAULT 0, -- seconds
  
  -- Attempts
  attempts INTEGER DEFAULT 0,
  last_attempt_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(enrollment_id, lesson_id)
);

CREATE INDEX idx_lesson_progress_enrollment ON lesson_progress(enrollment_id);
CREATE INDEX idx_lesson_progress_lesson ON lesson_progress(lesson_id);
CREATE INDEX idx_lesson_progress_student ON lesson_progress(student_id);

-- ============================================================================
-- ASSESSMENTS (Quizzes & Assignments)
-- ============================================================================

CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES course_lessons(id) ON DELETE CASCADE,
  
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL, -- quiz, assignment, exam, survey
  
  -- Settings
  time_limit INTEGER, -- minutes
  attempts_allowed INTEGER DEFAULT 1,
  passing_score DECIMAL(5,2) DEFAULT 70,
  randomize_questions BOOLEAN DEFAULT FALSE,
  show_correct_answers BOOLEAN DEFAULT TRUE,
  
  -- Scheduling
  available_from TIMESTAMPTZ,
  available_until TIMESTAMPTZ,
  
  -- Grading
  total_points DECIMAL(10,2) DEFAULT 100,
  weight DECIMAL(5,2) DEFAULT 1.0,
  auto_grade BOOLEAN DEFAULT TRUE,
  
  -- Instructions
  instructions TEXT,
  
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_assessments_course ON assessments(course_id);
CREATE INDEX idx_assessments_lesson ON assessments(lesson_id);

CREATE TABLE assessment_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  
  question_text TEXT NOT NULL,
  question_type VARCHAR(50) NOT NULL, -- multiple_choice, true_false, short_answer, essay, file_upload
  order_index INTEGER NOT NULL,
  
  -- Options (for multiple choice)
  options JSONB DEFAULT '[]',
  correct_answer JSONB,
  
  -- Grading
  points DECIMAL(10,2) DEFAULT 1,
  
  -- Feedback
  explanation TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_assessment_questions_assessment ON assessment_questions(assessment_id);

CREATE TABLE assessment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES tenant_users(id) ON DELETE CASCADE,
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  
  -- Submission
  attempt_number INTEGER DEFAULT 1,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  
  -- Answers
  answers JSONB DEFAULT '{}',
  
  -- Grading
  status VARCHAR(50) DEFAULT 'in_progress', -- in_progress, submitted, graded
  score DECIMAL(10,2),
  percentage DECIMAL(5,2),
  passed BOOLEAN,
  
  -- Feedback
  feedback TEXT,
  graded_by UUID REFERENCES tenant_users(id),
  graded_at TIMESTAMPTZ,
  
  -- Time tracking
  time_spent INTEGER, -- seconds
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_assessment_submissions_assessment ON assessment_submissions(assessment_id);
CREATE INDEX idx_assessment_submissions_student ON assessment_submissions(student_id);
CREATE INDEX idx_assessment_submissions_enrollment ON assessment_submissions(enrollment_id);

-- ============================================================================
-- CERTIFICATES
-- ============================================================================

CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES tenant_users(id) ON DELETE CASCADE,
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  
  -- Certificate details
  certificate_number VARCHAR(100) UNIQUE NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  
  -- Content
  template_id UUID,
  certificate_url TEXT,
  pdf_url TEXT,
  
  -- Verification
  verification_code VARCHAR(50) UNIQUE,
  is_verified BOOLEAN DEFAULT TRUE,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_certificates_tenant ON certificates(tenant_id);
CREATE INDEX idx_certificates_course ON certificates(course_id);
CREATE INDEX idx_certificates_student ON certificates(student_id);
CREATE INDEX idx_certificates_number ON certificates(certificate_number);
CREATE INDEX idx_certificates_verification ON certificates(verification_code);

-- ============================================================================
-- DISCUSSIONS & COMMUNICATION
-- ============================================================================

CREATE TABLE discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES course_lessons(id) ON DELETE CASCADE,
  
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES tenant_users(id),
  
  -- Thread management
  parent_id UUID REFERENCES discussions(id) ON DELETE CASCADE,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  
  -- Engagement
  views_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  
  -- Status
  status VARCHAR(50) DEFAULT 'active',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_discussions_course ON discussions(course_id);
CREATE INDEX idx_discussions_lesson ON discussions(lesson_id);
CREATE INDEX idx_discussions_author ON discussions(author_id);
CREATE INDEX idx_discussions_parent ON discussions(parent_id);

CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES tenant_users(id),
  
  -- Targeting
  target_audience VARCHAR(50) DEFAULT 'all', -- all, students, instructors
  
  -- Scheduling
  published_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  
  -- Notifications
  send_email BOOLEAN DEFAULT FALSE,
  send_push BOOLEAN DEFAULT FALSE,
  
  status VARCHAR(50) DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_announcements_tenant ON announcements(tenant_id);
CREATE INDEX idx_announcements_course ON announcements(course_id);

-- ============================================================================
-- ANALYTICS & REPORTING
-- ============================================================================

CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES tenant_users(id) ON DELETE SET NULL,
  
  -- Activity details
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100),
  entity_id UUID,
  
  -- Context
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_tenant ON activity_logs(tenant_id);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);

-- ============================================================================
-- AUTOMATION & WORKFLOWS
-- ============================================================================

CREATE TABLE automation_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  name VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Trigger
  trigger_type VARCHAR(100) NOT NULL, -- enrollment_created, lesson_completed, course_completed, etc.
  trigger_conditions JSONB DEFAULT '{}',
  
  -- Actions
  actions JSONB NOT NULL, -- [{type: 'send_email', config: {...}}, {type: 'issue_certificate', config: {...}}]
  
  -- Settings
  is_active BOOLEAN DEFAULT TRUE,
  priority INTEGER DEFAULT 0,
  
  -- Stats
  executions_count INTEGER DEFAULT 0,
  last_executed_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_automation_rules_tenant ON automation_rules(tenant_id);
CREATE INDEX idx_automation_rules_trigger ON automation_rules(trigger_type);
CREATE INDEX idx_automation_rules_active ON automation_rules(is_active);

-- ============================================================================
-- PAYMENTS & SUBSCRIPTIONS
-- ============================================================================

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES tenant_users(id) ON DELETE CASCADE,
  
  -- Transaction details
  type VARCHAR(50) NOT NULL, -- course_purchase, subscription, refund
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  
  -- Related entities
  course_id UUID REFERENCES courses(id),
  enrollment_id UUID REFERENCES enrollments(id),
  
  -- Payment gateway
  gateway VARCHAR(50), -- stripe, paypal, etc.
  gateway_transaction_id VARCHAR(255),
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_tenant ON transactions(tenant_id);
CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_course ON transactions(course_id);
CREATE INDEX idx_transactions_status ON transactions(status);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tenant_users_updated_at BEFORE UPDATE ON tenant_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON enrollments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lesson_progress_updated_at BEFORE UPDATE ON lesson_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Calculate enrollment progress
CREATE OR REPLACE FUNCTION calculate_enrollment_progress()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE enrollments
  SET 
    completed_lessons = (
      SELECT COUNT(*) 
      FROM lesson_progress 
      WHERE enrollment_id = NEW.enrollment_id 
      AND status = 'completed'
    ),
    progress_percentage = (
      SELECT COALESCE(
        (COUNT(*) FILTER (WHERE status = 'completed')::DECIMAL / NULLIF(COUNT(*), 0)) * 100,
        0
      )
      FROM lesson_progress 
      WHERE enrollment_id = NEW.enrollment_id
    )
  WHERE id = NEW.enrollment_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_enrollment_progress 
AFTER INSERT OR UPDATE ON lesson_progress 
FOR EACH ROW EXECUTE FUNCTION calculate_enrollment_progress();
