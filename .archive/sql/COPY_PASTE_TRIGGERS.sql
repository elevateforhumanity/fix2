-- ============================================
-- COPY AND PASTE THIS ENTIRE FILE INTO SUPABASE SQL EDITOR
-- Run this AFTER running COPY_PASTE_SQL.sql
-- This creates all automatic triggers
-- ============================================

-- Function: Trigger welcome packet creation on enrollment
CREATE OR REPLACE FUNCTION trigger_welcome_packet()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'active' AND (OLD IS NULL OR OLD.status != 'active') THEN
    INSERT INTO welcome_packets (
      student_id,
      enrollment_id,
      program_id,
      status,
      created_at
    ) VALUES (
      NEW.student_id,
      NEW.id,
      NEW.program_id,
      'pending',
      NOW()
    )
    ON CONFLICT (enrollment_id) DO NOTHING;

    INSERT INTO welcome_packet_items (
      packet_id,
      item_id,
      title,
      description,
      type,
      url,
      required,
      completed
    )
    SELECT 
      wp.id,
      item.item_id,
      item.title,
      item.description,
      item.type,
      item.url,
      item.required,
      false
    FROM welcome_packets wp
    CROSS JOIN (
      VALUES
        ('welcome-letter', 'Welcome Letter', 'Personal welcome message from our team', 'document', '/documents/welcome-letter.pdf', false),
        ('student-handbook', 'Student Handbook', 'Complete guide to policies and procedures', 'document', '/student-handbook', true),
        ('program-workbook', 'Program Workbook', 'Program-specific learning materials', 'document', '/workbooks', true),
        ('enrollment-agreement', 'Enrollment Agreement', 'Review and acknowledge your enrollment terms', 'form', '/student/enrollment-agreement', true),
        ('ferpa-rights', 'FERPA Rights Notification', 'Your privacy rights under federal law', 'document', '/ferpa', true),
        ('technology-setup', 'Technology Setup Guide', 'Set up your student portal and LMS access', 'document', '/student/tech-setup', true),
        ('financial-aid-info', 'Financial Aid Information', 'Understanding your funding and payment options', 'document', '/funding', false),
        ('campus-map', 'Campus Map & Directions', 'Find your way around campus', 'document', '/campus-map', false),
        ('first-day-checklist', 'First Day Checklist', 'What to bring and expect on your first day', 'document', '/first-day-checklist', true),
        ('orientation-video', 'Orientation Video', 'Watch our welcome orientation (15 minutes)', 'video', '/orientation/video', true)
    ) AS item(item_id, title, description, type, url, required)
    WHERE wp.enrollment_id = NEW.id
    ON CONFLICT (packet_id, item_id) DO NOTHING;

    INSERT INTO email_logs (recipient, subject, type, sent_at, status)
    SELECT p.email, 'Welcome to Your Program!', 'welcome_packet', NOW(), 'pending'
    FROM profiles p WHERE p.id = NEW.student_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_enrollment_create_welcome_packet ON enrollments;
CREATE TRIGGER on_enrollment_create_welcome_packet
  AFTER INSERT OR UPDATE ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION trigger_welcome_packet();

-- Function: Initialize onboarding steps
CREATE OR REPLACE FUNCTION trigger_onboarding_steps()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO student_onboarding (student_id, enrollment_id, step_id, status, created_at)
  SELECT NEW.student_id, NEW.id, os.id, 'pending', NOW()
  FROM onboarding_steps os
  WHERE os.active = true
  ON CONFLICT (enrollment_id, step_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_enrollment_init_onboarding ON enrollments;
CREATE TRIGGER on_enrollment_init_onboarding
  AFTER INSERT ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION trigger_onboarding_steps();

-- Function: Update attendance percentage
CREATE OR REPLACE FUNCTION update_attendance_percentage()
RETURNS TRIGGER AS $$
DECLARE
  v_total_days INTEGER;
  v_present_days INTEGER;
  v_percentage DECIMAL;
BEGIN
  SELECT COUNT(*) INTO v_total_days
  FROM attendance_records
  WHERE student_id = NEW.student_id AND enrollment_id = NEW.enrollment_id;

  SELECT COUNT(*) INTO v_present_days
  FROM attendance_records
  WHERE student_id = NEW.student_id AND enrollment_id = NEW.enrollment_id
    AND status IN ('present', 'excused');

  IF v_total_days > 0 THEN
    v_percentage := (v_present_days::DECIMAL / v_total_days::DECIMAL) * 100;
    UPDATE enrollments
    SET attendance_percentage = v_percentage, updated_at = NOW()
    WHERE id = NEW.enrollment_id;

    IF v_percentage < 80 THEN
      INSERT INTO email_logs (recipient, subject, type, sent_at, status)
      SELECT p.email, 'Attendance Warning - Action Required', 'attendance_warning', NOW(), 'pending'
      FROM profiles p WHERE p.id = NEW.student_id
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_attendance_update_percentage ON attendance_records;
CREATE TRIGGER on_attendance_update_percentage
  AFTER INSERT OR UPDATE ON attendance_records
  FOR EACH ROW
  EXECUTE FUNCTION update_attendance_percentage();

-- Function: Update GPA
CREATE OR REPLACE FUNCTION update_student_gpa()
RETURNS TRIGGER AS $$
DECLARE
  v_avg_percentage DECIMAL;
  v_gpa DECIMAL;
BEGIN
  SELECT AVG(percentage) INTO v_avg_percentage
  FROM grades
  WHERE student_id = NEW.student_id AND enrollment_id = NEW.enrollment_id;

  v_gpa := CASE
    WHEN v_avg_percentage >= 90 THEN 4.0
    WHEN v_avg_percentage >= 80 THEN 3.0
    WHEN v_avg_percentage >= 70 THEN 2.0
    WHEN v_avg_percentage >= 60 THEN 1.0
    ELSE 0.0
  END;

  UPDATE enrollments
  SET gpa = v_gpa, updated_at = NOW()
  WHERE id = NEW.enrollment_id;

  IF v_gpa < 2.0 THEN
    INSERT INTO email_logs (recipient, subject, type, sent_at, status)
    SELECT p.email, 'Academic Warning - GPA Below Requirement', 'academic_warning', NOW(), 'pending'
    FROM profiles p WHERE p.id = NEW.student_id
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_grade_update_gpa ON grades;
CREATE TRIGGER on_grade_update_gpa
  AFTER INSERT OR UPDATE ON grades
  FOR EACH ROW
  EXECUTE FUNCTION update_student_gpa();

-- Function: Update total hours
CREATE OR REPLACE FUNCTION update_total_hours()
RETURNS TRIGGER AS $$
DECLARE
  v_practical_hours DECIMAL;
BEGIN
  SELECT COALESCE(SUM(hours), 0) INTO v_practical_hours
  FROM student_hours
  WHERE student_id = NEW.student_id AND enrollment_id = NEW.enrollment_id AND approved = true;

  UPDATE enrollments
  SET practical_hours_completed = v_practical_hours,
      total_hours_completed = COALESCE(theory_hours_completed, 0) + v_practical_hours,
      updated_at = NOW()
  WHERE id = NEW.enrollment_id;

  UPDATE enrollments e
  SET progress_percentage = CASE
    WHEN p.total_hours > 0 THEN ROUND((e.total_hours_completed / p.total_hours) * 100)
    ELSE 0
  END
  FROM programs p
  WHERE e.id = NEW.enrollment_id AND e.program_id = p.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_hours_update_total ON student_hours;
CREATE TRIGGER on_hours_update_total
  AFTER INSERT OR UPDATE ON student_hours
  FOR EACH ROW
  EXECUTE FUNCTION update_total_hours();

-- Function: Check SAP status
CREATE OR REPLACE FUNCTION check_sap_status()
RETURNS TRIGGER AS $$
DECLARE
  v_gpa DECIMAL;
  v_attendance DECIMAL;
  v_completion DECIMAL;
  v_sap_status TEXT;
BEGIN
  v_gpa := COALESCE(NEW.gpa, 0);
  v_attendance := COALESCE(NEW.attendance_percentage, 100);
  v_completion := COALESCE(NEW.progress_percentage, 0);

  IF v_gpa >= 2.0 AND v_attendance >= 80 AND v_completion >= 67 THEN
    v_sap_status := 'good_standing';
  ELSIF v_gpa >= 1.5 AND v_attendance >= 70 AND v_completion >= 50 THEN
    v_sap_status := 'warning';
  ELSIF v_gpa >= 1.0 AND v_attendance >= 60 AND v_completion >= 40 THEN
    v_sap_status := 'probation';
  ELSE
    v_sap_status := 'suspension';
  END IF;

  NEW.sap_status := v_sap_status;

  IF OLD IS NOT NULL AND OLD.sap_status != v_sap_status THEN
    INSERT INTO email_logs (recipient, subject, type, sent_at, status)
    SELECT p.email, 'SAP Status Change - ' || v_sap_status, 'sap_notification', NOW(), 'pending'
    FROM profiles p WHERE p.id = NEW.student_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_enrollment_check_sap ON enrollments;
CREATE TRIGGER on_enrollment_check_sap
  BEFORE UPDATE ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION check_sap_status();

-- Function: Check welcome packet completion
CREATE OR REPLACE FUNCTION check_welcome_packet_completion()
RETURNS TRIGGER AS $$
DECLARE
  v_total_required INTEGER;
  v_completed_required INTEGER;
  v_packet_id UUID;
BEGIN
  SELECT packet_id INTO v_packet_id FROM welcome_packet_items WHERE id = NEW.id;

  SELECT 
    COUNT(*) FILTER (WHERE required = true),
    COUNT(*) FILTER (WHERE required = true AND completed = true)
  INTO v_total_required, v_completed_required
  FROM welcome_packet_items WHERE packet_id = v_packet_id;

  IF v_total_required > 0 AND v_completed_required = v_total_required THEN
    UPDATE welcome_packets
    SET status = 'completed', completed_at = NOW()
    WHERE id = v_packet_id AND status != 'completed';

    INSERT INTO email_logs (recipient, subject, type, sent_at, status)
    SELECT p.email, 'Welcome Packet Complete - You''re Ready!', 'welcome_packet_complete', NOW(), 'pending'
    FROM welcome_packets wp
    JOIN profiles p ON p.id = wp.student_id
    WHERE wp.id = v_packet_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_packet_item_check_completion ON welcome_packet_items;
CREATE TRIGGER on_packet_item_check_completion
  AFTER UPDATE ON welcome_packet_items
  FOR EACH ROW
  WHEN (NEW.completed = true AND OLD.completed = false)
  EXECUTE FUNCTION check_welcome_packet_completion();

-- Function: Notify complaint submitted
CREATE OR REPLACE FUNCTION notify_complaint_submitted()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO email_logs (recipient, subject, type, sent_at, status)
  VALUES ('admin@elevateforhumanity.org', 'New Student Complaint Submitted', 'complaint_notification', NOW(), 'pending');

  INSERT INTO email_logs (recipient, subject, type, sent_at, status)
  SELECT p.email, 'Complaint Received - We''re Investigating', 'complaint_confirmation', NOW(), 'pending'
  FROM profiles p WHERE p.id = NEW.student_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_complaint_notify ON complaints;
CREATE TRIGGER on_complaint_notify
  AFTER INSERT ON complaints
  FOR EACH ROW
  EXECUTE FUNCTION notify_complaint_submitted();

-- Function: Process withdrawal
CREATE OR REPLACE FUNCTION process_withdrawal()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'approved' AND (OLD IS NULL OR OLD.status != 'approved') THEN
    UPDATE enrollments
    SET status = 'withdrawn', withdrawal_date = NEW.effective_date, updated_at = NOW()
    WHERE id = NEW.enrollment_id;

    INSERT INTO email_logs (recipient, subject, type, sent_at, status)
    SELECT p.email, 'Withdrawal Processed', 'withdrawal_confirmation', NOW(), 'pending'
    FROM profiles p WHERE p.id = NEW.student_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_withdrawal_process ON withdrawals;
CREATE TRIGGER on_withdrawal_process
  AFTER UPDATE ON withdrawals
  FOR EACH ROW
  EXECUTE FUNCTION process_withdrawal();

-- Function: Create ECR snapshot
CREATE OR REPLACE FUNCTION create_ecr_snapshot()
RETURNS TRIGGER AS $$
BEGIN
  IF ABS(COALESCE(NEW.progress_percentage, 0) - COALESCE(OLD.progress_percentage, 0)) >= 5 THEN
    INSERT INTO ecr_snapshots (
      student_id, enrollment_id, theory_hours, practical_hours,
      total_hours, progress_percentage, snapshot_date
    ) VALUES (
      NEW.student_id, NEW.id,
      COALESCE(NEW.theory_hours_completed, 0),
      COALESCE(NEW.practical_hours_completed, 0),
      COALESCE(NEW.total_hours_completed, 0),
      COALESCE(NEW.progress_percentage, 0),
      NOW()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_progress_create_snapshot ON enrollments;
CREATE TRIGGER on_progress_create_snapshot
  AFTER UPDATE ON enrollments
  FOR EACH ROW
  WHEN (OLD.progress_percentage IS DISTINCT FROM NEW.progress_percentage)
  EXECUTE FUNCTION create_ecr_snapshot();

-- Create update triggers
CREATE TRIGGER update_student_hours_updated_at
  BEFORE UPDATE ON student_hours
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_onboarding_updated_at
  BEFORE UPDATE ON student_onboarding
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_attendance_records_updated_at
  BEFORE UPDATE ON attendance_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grades_updated_at
  BEFORE UPDATE ON grades
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_complaints_updated_at
  BEFORE UPDATE ON complaints
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Verification
DO $$
DECLARE
  v_triggers INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_triggers
  FROM information_schema.triggers
  WHERE trigger_schema = 'public' AND trigger_name LIKE 'on_%';

  RAISE NOTICE '';
  RAISE NOTICE '✅ TRIGGERS CREATED!';
  RAISE NOTICE '==========================================';
  RAISE NOTICE 'Total Triggers: %', v_triggers;
  RAISE NOTICE '';
  RAISE NOTICE 'Automatic Actions Enabled:';
  RAISE NOTICE '  ✅ Welcome packet on enrollment';
  RAISE NOTICE '  ✅ Onboarding checklist initialization';
  RAISE NOTICE '  ✅ Attendance percentage updates';
  RAISE NOTICE '  ✅ GPA calculations';
  RAISE NOTICE '  ✅ Hour tracking updates';
  RAISE NOTICE '  ✅ SAP status monitoring';
  RAISE NOTICE '  ✅ Email notifications';
  RAISE NOTICE '  ✅ ECR snapshots';
  RAISE NOTICE '  ✅ Complaint notifications';
  RAISE NOTICE '  ✅ Withdrawal processing';
  RAISE NOTICE '';
  RAISE NOTICE '✅ All automation active!';
  RAISE NOTICE '==========================================';
END $$;
