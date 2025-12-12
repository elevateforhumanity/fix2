-- ============================================
-- STANDALONE ACCREDITATION TABLES
-- No dependencies - creates everything from scratch
-- ============================================

-- Student Records (Core accreditation table)
CREATE TABLE IF NOT EXISTS student_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  program_name TEXT NOT NULL,
  
  -- Academic tracking
  gpa DECIMAL(3,2) DEFAULT 0,
  attendance_percentage DECIMAL(5,2) DEFAULT 100,
  hours_completed DECIMAL(10,2) DEFAULT 0,
  hours_required DECIMAL(10,2) DEFAULT 0,
  
  -- SAP (Satisfactory Academic Progress)
  sap_status TEXT DEFAULT 'good_standing' CHECK (sap_status IN ('good_standing', 'warning', 'probation', 'dismissed')),
  sap_last_checked TIMESTAMPTZ,
  
  -- Enrollment info
  enrollment_status TEXT DEFAULT 'active' CHECK (enrollment_status IN ('pending', 'active', 'completed', 'dropped', 'suspended')),
  start_date DATE DEFAULT CURRENT_DATE,
  expected_completion_date DATE,
  actual_completion_date DATE,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(user_id, program_name)
);

-- Attendance Records
CREATE TABLE IF NOT EXISTS attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL REFERENCES student_records(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'tardy', 'excused')),
  check_in_time TIME,
  check_out_time TIME,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_record_id, date)
);

-- Grade Records
CREATE TABLE IF NOT EXISTS grade_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL REFERENCES student_records(id) ON DELETE CASCADE,
  course_name TEXT NOT NULL,
  assignment_name TEXT NOT NULL,
  assignment_type TEXT NOT NULL CHECK (assignment_type IN ('quiz', 'exam', 'project', 'practical', 'participation')),
  points_earned DECIMAL(10,2) NOT NULL,
  points_possible DECIMAL(10,2) NOT NULL,
  percentage DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE 
      WHEN points_possible > 0 THEN (points_earned / points_possible * 100)
      ELSE 0
    END
  ) STORED,
  letter_grade TEXT,
  graded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  graded_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Hour Tracking
CREATE TABLE IF NOT EXISTS hour_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL REFERENCES student_records(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  theory_hours DECIMAL(5,2) DEFAULT 0,
  practical_hours DECIMAL(5,2) DEFAULT 0,
  total_hours DECIMAL(5,2) GENERATED ALWAYS AS (theory_hours + practical_hours) STORED,
  activity_description TEXT,
  supervisor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  approved BOOLEAN DEFAULT false,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SAP Records (History)
CREATE TABLE IF NOT EXISTS sap_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL REFERENCES student_records(id) ON DELETE CASCADE,
  check_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL CHECK (status IN ('good_standing', 'warning', 'probation', 'dismissed')),
  gpa DECIMAL(3,2),
  attendance_percentage DECIMAL(5,2),
  hours_completed DECIMAL(10,2),
  hours_required DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Complaints
CREATE TABLE IF NOT EXISTS complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  student_record_id UUID REFERENCES student_records(id) ON DELETE SET NULL,
  complaint_type TEXT NOT NULL CHECK (complaint_type IN ('academic', 'financial', 'discrimination', 'harassment', 'facility', 'other')),
  description TEXT NOT NULL,
  desired_resolution TEXT,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'resolved', 'closed')),
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  resolution TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Refunds
CREATE TABLE IF NOT EXISTS refunds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL REFERENCES student_records(id) ON DELETE CASCADE,
  amount_requested DECIMAL(10,2) NOT NULL,
  amount_approved DECIMAL(10,2),
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied', 'processed')),
  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  processed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Withdrawals
CREATE TABLE IF NOT EXISTS withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL REFERENCES student_records(id) ON DELETE CASCADE,
  withdrawal_type TEXT NOT NULL CHECK (withdrawal_type IN ('voluntary', 'administrative', 'academic', 'financial')),
  reason TEXT NOT NULL,
  effective_date DATE NOT NULL,
  last_attendance_date DATE,
  refund_amount DECIMAL(10,2),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'completed')),
  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  processed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ECR Snapshots (Electronic Completion Records)
CREATE TABLE IF NOT EXISTS ecr_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL REFERENCES student_records(id) ON DELETE CASCADE,
  snapshot_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  theory_hours DECIMAL(10,2) DEFAULT 0,
  practical_hours DECIMAL(10,2) DEFAULT 0,
  total_hours DECIMAL(10,2) DEFAULT 0,
  gpa DECIMAL(3,2) DEFAULT 0,
  attendance_percentage DECIMAL(5,2) DEFAULT 100,
  sap_status TEXT,
  progress_percentage INTEGER DEFAULT 0,
  milady_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Welcome Packets
CREATE TABLE IF NOT EXISTS welcome_packets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL REFERENCES student_records(id) ON DELETE CASCADE,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  pdf_url TEXT,
  status TEXT DEFAULT 'generated' CHECK (status IN ('generated', 'sent', 'acknowledged')),
  acknowledged_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Onboarding Checklist
CREATE TABLE IF NOT EXISTS onboarding_checklist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL REFERENCES student_records(id) ON DELETE CASCADE,
  task_name TEXT NOT NULL,
  task_description TEXT,
  task_order INTEGER NOT NULL,
  required BOOLEAN DEFAULT true,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Email Notifications Log
CREATE TABLE IF NOT EXISTS email_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  email_type TEXT NOT NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'bounced')),
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- MOU Signatures
CREATE TABLE IF NOT EXISTS mou_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL REFERENCES student_records(id) ON DELETE CASCADE,
  signature_data TEXT NOT NULL,
  signed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Academic Integrity Violations
CREATE TABLE IF NOT EXISTS academic_integrity_violations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL REFERENCES student_records(id) ON DELETE CASCADE,
  violation_type TEXT NOT NULL CHECK (violation_type IN ('plagiarism', 'cheating', 'falsification', 'unauthorized_collaboration')),
  description TEXT NOT NULL,
  incident_date DATE NOT NULL,
  reported_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action_taken TEXT,
  status TEXT DEFAULT 'reported' CHECK (status IN ('reported', 'under_review', 'resolved')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Makeup Work Requests
CREATE TABLE IF NOT EXISTS makeup_work_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL REFERENCES student_records(id) ON DELETE CASCADE,
  missed_date DATE NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied', 'completed')),
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Course Syllabi
CREATE TABLE IF NOT EXISTS course_syllabi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_name TEXT NOT NULL,
  program_name TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0',
  content TEXT NOT NULL,
  effective_date DATE NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_student_records_user ON student_records(user_id);
CREATE INDEX IF NOT EXISTS idx_student_records_program ON student_records(program_name);
CREATE INDEX IF NOT EXISTS idx_student_records_sap ON student_records(sap_status);
CREATE INDEX IF NOT EXISTS idx_student_records_status ON student_records(enrollment_status);

CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance_records(student_record_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance_records(date DESC);

CREATE INDEX IF NOT EXISTS idx_grades_student ON grade_records(student_record_id);
CREATE INDEX IF NOT EXISTS idx_grades_course ON grade_records(course_name);

CREATE INDEX IF NOT EXISTS idx_hours_student ON hour_tracking(student_record_id);
CREATE INDEX IF NOT EXISTS idx_hours_date ON hour_tracking(date DESC);

CREATE INDEX IF NOT EXISTS idx_sap_student ON sap_records(student_record_id);
CREATE INDEX IF NOT EXISTS idx_sap_date ON sap_records(check_date DESC);

CREATE INDEX IF NOT EXISTS idx_complaints_user ON complaints(user_id);
CREATE INDEX IF NOT EXISTS idx_complaints_student ON complaints(student_record_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);

CREATE INDEX IF NOT EXISTS idx_refunds_student ON refunds(student_record_id);
CREATE INDEX IF NOT EXISTS idx_refunds_status ON refunds(status);

CREATE INDEX IF NOT EXISTS idx_withdrawals_student ON withdrawals(student_record_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_status ON withdrawals(status);

CREATE INDEX IF NOT EXISTS idx_ecr_student ON ecr_snapshots(student_record_id);
CREATE INDEX IF NOT EXISTS idx_ecr_date ON ecr_snapshots(snapshot_date DESC);

CREATE INDEX IF NOT EXISTS idx_welcome_student ON welcome_packets(student_record_id);

CREATE INDEX IF NOT EXISTS idx_onboarding_student ON onboarding_checklist(student_record_id);

CREATE INDEX IF NOT EXISTS idx_emails_user ON email_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_emails_sent ON email_notifications(sent_at DESC);

CREATE INDEX IF NOT EXISTS idx_mou_student ON mou_signatures(student_record_id);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ All accreditation tables created successfully!';
  RAISE NOTICE '📊 Created 16 standalone tables for compliance tracking';
  RAISE NOTICE '🔑 Using auth.users(id) as only external dependency';
  RAISE NOTICE '✨ No enrollments, programs, or courses tables needed';
  RAISE NOTICE '🎯 Ready for production use!';
END $$;
