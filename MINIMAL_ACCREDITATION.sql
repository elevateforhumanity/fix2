-- ============================================
-- MINIMAL ACCREDITATION TABLES
-- Absolutely zero external dependencies
-- ============================================

-- Student Records (Core table - no foreign keys)
CREATE TABLE IF NOT EXISTS student_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  program_name TEXT NOT NULL,
  gpa DECIMAL(3,2) DEFAULT 0,
  attendance_percentage DECIMAL(5,2) DEFAULT 100,
  hours_completed DECIMAL(10,2) DEFAULT 0,
  hours_required DECIMAL(10,2) DEFAULT 0,
  sap_status TEXT DEFAULT 'good_standing',
  sap_last_checked TIMESTAMPTZ,
  enrollment_status TEXT DEFAULT 'active',
  start_date DATE DEFAULT CURRENT_DATE,
  expected_completion_date DATE,
  actual_completion_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, program_name)
);

-- Attendance Records
CREATE TABLE IF NOT EXISTS attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL,
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
  student_record_id UUID NOT NULL,
  course_name TEXT NOT NULL,
  assignment_name TEXT NOT NULL,
  assignment_type TEXT NOT NULL,
  points_earned DECIMAL(10,2) NOT NULL,
  points_possible DECIMAL(10,2) NOT NULL,
  percentage DECIMAL(5,2),
  letter_grade TEXT,
  graded_by UUID,
  graded_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Hour Tracking
CREATE TABLE IF NOT EXISTS hour_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL,
  date DATE NOT NULL,
  theory_hours DECIMAL(5,2) DEFAULT 0,
  practical_hours DECIMAL(5,2) DEFAULT 0,
  total_hours DECIMAL(5,2),
  activity_description TEXT,
  supervisor_id UUID,
  approved BOOLEAN DEFAULT false,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SAP Records
CREATE TABLE IF NOT EXISTS sap_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL,
  check_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL,
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
  user_id UUID NOT NULL,
  student_record_id UUID,
  complaint_type TEXT NOT NULL,
  description TEXT NOT NULL,
  desired_resolution TEXT,
  status TEXT NOT NULL DEFAULT 'submitted',
  assigned_to UUID,
  resolution TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Refunds
CREATE TABLE IF NOT EXISTS refunds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL,
  amount_requested DECIMAL(10,2) NOT NULL,
  amount_approved DECIMAL(10,2),
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  processed_by UUID,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Withdrawals
CREATE TABLE IF NOT EXISTS withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL,
  withdrawal_type TEXT NOT NULL,
  reason TEXT NOT NULL,
  effective_date DATE NOT NULL,
  last_attendance_date DATE,
  refund_amount DECIMAL(10,2),
  status TEXT NOT NULL DEFAULT 'pending',
  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  processed_by UUID,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ECR Snapshots
CREATE TABLE IF NOT EXISTS ecr_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL,
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
  student_record_id UUID NOT NULL,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  pdf_url TEXT,
  status TEXT DEFAULT 'generated',
  acknowledged_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Onboarding Checklist
CREATE TABLE IF NOT EXISTS onboarding_checklist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL,
  task_name TEXT NOT NULL,
  task_description TEXT,
  task_order INTEGER NOT NULL,
  required BOOLEAN DEFAULT true,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Email Notifications
CREATE TABLE IF NOT EXISTS email_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  email_type TEXT NOT NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT DEFAULT 'sent',
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- MOU Signatures
CREATE TABLE IF NOT EXISTS mou_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL,
  signature_data TEXT NOT NULL,
  signed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Academic Integrity Violations
CREATE TABLE IF NOT EXISTS academic_integrity_violations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL,
  violation_type TEXT NOT NULL,
  description TEXT NOT NULL,
  incident_date DATE NOT NULL,
  reported_by UUID,
  action_taken TEXT,
  status TEXT DEFAULT 'reported',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Makeup Work Requests
CREATE TABLE IF NOT EXISTS makeup_work_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_record_id UUID NOT NULL,
  missed_date DATE NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  approved_by UUID,
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
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_student_records_user ON student_records(user_id);
CREATE INDEX IF NOT EXISTS idx_student_records_program ON student_records(program_name);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance_records(student_record_id);
CREATE INDEX IF NOT EXISTS idx_grades_student ON grade_records(student_record_id);
CREATE INDEX IF NOT EXISTS idx_hours_student ON hour_tracking(student_record_id);
CREATE INDEX IF NOT EXISTS idx_sap_student ON sap_records(student_record_id);
CREATE INDEX IF NOT EXISTS idx_complaints_user ON complaints(user_id);
CREATE INDEX IF NOT EXISTS idx_refunds_student ON refunds(student_record_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_student ON withdrawals(student_record_id);
CREATE INDEX IF NOT EXISTS idx_ecr_student ON ecr_snapshots(student_record_id);
CREATE INDEX IF NOT EXISTS idx_welcome_student ON welcome_packets(student_record_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_student ON onboarding_checklist(student_record_id);
CREATE INDEX IF NOT EXISTS idx_emails_user ON email_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_mou_student ON mou_signatures(student_record_id);

SELECT '✅ SUCCESS! All 16 accreditation tables created!' as message;
