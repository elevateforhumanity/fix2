-- Gradebook System
-- Migration: 20251118_gradebook

-- Grade items (assignments, quizzes, exams)
CREATE TABLE IF NOT EXISTS grade_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Assignment',
  max_points integer NOT NULL DEFAULT 100,
  weight numeric(5,2) NOT NULL DEFAULT 1.0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_grade_items_course ON grade_items(course_id);

-- Individual grades for students per item
CREATE TABLE IF NOT EXISTS grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_item_id uuid NOT NULL REFERENCES grade_items(id) ON DELETE CASCADE,
  enrollment_id uuid NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  points numeric(8,2) NOT NULL,
  graded_at timestamptz NOT NULL DEFAULT now(),
  feedback text
);

CREATE INDEX IF NOT EXISTS idx_grades_grade_item ON grades(grade_item_id);
CREATE INDEX IF NOT EXISTS idx_grades_enrollment ON grades(enrollment_id);

-- Add unique constraint for grade_item_id and enrollment_id combination
ALTER TABLE grades ADD CONSTRAINT grades_unique_item_enrollment UNIQUE (grade_item_id, enrollment_id);

-- Email templates for multi-tenant white-labeling
CREATE TABLE IF NOT EXISTS email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NULL REFERENCES tenants(id) ON DELETE CASCADE,
  key text NOT NULL,
  subject text NOT NULL,
  html text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, key)
);

CREATE INDEX IF NOT EXISTS idx_email_templates_tenant ON email_templates(tenant_id);
CREATE INDEX IF NOT EXISTS idx_email_templates_key ON email_templates(key);

-- Insert default email templates
INSERT INTO email_templates (tenant_id, key, subject, html) VALUES
(NULL, 'welcome_student', 'Welcome to {{ platform_name }}!', 
'<html><body><h1>Welcome {{ student_name }}!</h1><p>We''re excited to have you join {{ platform_name }}.</p><p>Get started by exploring your courses and completing your profile.</p></body></html>'),

(NULL, 'enrollment_confirmation', 'You''re enrolled in {{ course_title }}', 
'<html><body><h1>Enrollment Confirmed</h1><p>Hi {{ student_name }},</p><p>You''re now enrolled in <strong>{{ course_title }}</strong>.</p><p>Start date: {{ start_date }}</p><p>Access your course now and begin learning!</p></body></html>'),

(NULL, 'course_reminder', 'Don''t forget about {{ course_title }}', 
'<html><body><h1>Course Reminder</h1><p>Hi {{ student_name }},</p><p>This is a friendly reminder about your course: <strong>{{ course_title }}</strong>.</p><p>You''re {{ progress }}% complete. Keep up the great work!</p></body></html>'),

(NULL, 'certificate_earned', 'Congratulations! You earned a certificate', 
'<html><body><h1>Certificate Earned! 🎉</h1><p>Congratulations {{ student_name }}!</p><p>You''ve successfully completed <strong>{{ course_title }}</strong> and earned your certificate.</p><p>Download your certificate from your dashboard.</p></body></html>')
ON CONFLICT (tenant_id, key) DO NOTHING;
