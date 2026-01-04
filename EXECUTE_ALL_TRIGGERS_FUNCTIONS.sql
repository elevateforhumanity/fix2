-- ============================================
-- ALL TRIGGERS AND FUNCTIONS - PRODUCTION READY
-- Execute this to complete the database
-- ============================================

-- ============================================
-- ENROLLMENT TRIGGERS
-- ============================================

-- Trigger: Validate license on enrollment
CREATE OR REPLACE FUNCTION validate_enrollment_license()
RETURNS TRIGGER AS $$
DECLARE
  v_license RECORD;
BEGIN
  -- If no license_key, allow (free enrollment)
  IF NEW.license_key IS NULL THEN
    RETURN NEW;
  END IF;
  
  -- Get license details
  SELECT * INTO v_license
  FROM program_licenses
  WHERE license_key = NEW.license_key;
  
  -- Check if license exists
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid license key: %', NEW.license_key;
  END IF;
  
  -- Check if license is active
  IF v_license.status != 'active' THEN
    RAISE EXCEPTION 'License is not active: %', v_license.status;
  END IF;
  
  -- Check if license is expired
  IF v_license.expires_at IS NOT NULL AND v_license.expires_at < NOW() THEN
    RAISE EXCEPTION 'License has expired on: %', v_license.expires_at;
  END IF;
  
  -- Check enrollment limit
  IF v_license.max_enrollments IS NOT NULL AND v_license.current_enrollments >= v_license.max_enrollments THEN
    RAISE EXCEPTION 'License enrollment limit reached: %/%', v_license.current_enrollments, v_license.max_enrollments;
  END IF;
  
  -- Set licensed_until from license expiration
  NEW.licensed_until := v_license.expires_at::DATE;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validate_enrollment_license ON enrollments;
CREATE TRIGGER trg_validate_enrollment_license
  BEFORE INSERT ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION validate_enrollment_license();

-- Trigger: Track license usage on enrollment
CREATE OR REPLACE FUNCTION track_license_usage()
RETURNS TRIGGER AS $$
DECLARE
  v_license_id UUID;
BEGIN
  -- Get license ID from key
  IF NEW.license_key IS NOT NULL THEN
    SELECT id INTO v_license_id
    FROM program_licenses
    WHERE license_key = NEW.license_key;
    
    IF FOUND THEN
      -- Increment usage
      UPDATE program_licenses
      SET current_enrollments = current_enrollments + 1,
          updated_at = NOW()
      WHERE id = v_license_id;
      
      -- Log usage
      INSERT INTO license_usage_log (license_id, enrollment_id, student_id, action)
      VALUES (v_license_id, NEW.id, NEW.student_id, 'enrolled');
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_track_license_usage ON enrollments;
CREATE TRIGGER trg_track_license_usage
  AFTER INSERT ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION track_license_usage();

-- Trigger: Decrement license usage on enrollment deletion
CREATE OR REPLACE FUNCTION decrement_license_usage()
RETURNS TRIGGER AS $$
DECLARE
  v_license_id UUID;
BEGIN
  IF OLD.license_key IS NOT NULL THEN
    SELECT id INTO v_license_id
    FROM program_licenses
    WHERE license_key = OLD.license_key;
    
    IF FOUND THEN
      -- Decrement usage
      UPDATE program_licenses
      SET current_enrollments = GREATEST(0, current_enrollments - 1),
          updated_at = NOW()
      WHERE id = v_license_id;
      
      -- Log usage
      INSERT INTO license_usage_log (license_id, enrollment_id, student_id, action)
      VALUES (v_license_id, OLD.id, OLD.student_id, 'dropped');
    END IF;
  END IF;
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_decrement_license_usage ON enrollments;
CREATE TRIGGER trg_decrement_license_usage
  AFTER DELETE ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION decrement_license_usage();

-- ============================================
-- DOCUMENT TRIGGERS
-- ============================================

-- Trigger: Auto-create document audit log
CREATE OR REPLACE FUNCTION log_document_action()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO document_audit_log (document_id, action, performed_by, notes)
    VALUES (NEW.id, 'uploaded', NEW.user_id, 'Document uploaded');
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != NEW.status THEN
      INSERT INTO document_audit_log (document_id, action, performed_by, notes)
      VALUES (NEW.id, NEW.status, auth.uid(), 'Status changed to ' || NEW.status);
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO document_audit_log (document_id, action, performed_by, notes)
    VALUES (OLD.id, 'deleted', auth.uid(), 'Document deleted');
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_log_document_action ON documents;
CREATE TRIGGER trg_log_document_action
  AFTER INSERT OR UPDATE OR DELETE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION log_document_action();

-- Trigger: Update document updated_at timestamp
CREATE OR REPLACE FUNCTION update_document_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_document_timestamp ON documents;
CREATE TRIGGER trg_update_document_timestamp
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION update_document_timestamp();

-- ============================================
-- PARTNER TRIGGERS
-- ============================================

-- Trigger: Validate partner course creation based on license
CREATE OR REPLACE FUNCTION validate_partner_course_creation()
RETURNS TRIGGER AS $$
DECLARE
  v_license RECORD;
BEGIN
  -- If no license_id, check if partner has any valid license
  IF NEW.license_id IS NULL THEN
    SELECT * INTO v_license
    FROM program_licenses
    WHERE license_holder_id = NEW.partner_id
      AND status = 'active'
      AND can_create_courses = true
      AND (expires_at IS NULL OR expires_at > NOW())
    LIMIT 1;
    
    IF NOT FOUND THEN
      RAISE EXCEPTION 'Partner does not have a valid license to create courses';
    END IF;
    
    NEW.license_id := v_license.id;
  ELSE
    -- Validate specific license
    SELECT * INTO v_license
    FROM program_licenses
    WHERE id = NEW.license_id
      AND license_holder_id = NEW.partner_id;
    
    IF NOT FOUND THEN
      RAISE EXCEPTION 'License not found or does not belong to partner';
    END IF;
    
    IF v_license.status != 'active' THEN
      RAISE EXCEPTION 'License is not active';
    END IF;
    
    IF NOT v_license.can_create_courses THEN
      RAISE EXCEPTION 'License does not allow course creation';
    END IF;
    
    IF v_license.expires_at IS NOT NULL AND v_license.expires_at < NOW() THEN
      RAISE EXCEPTION 'License has expired';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validate_partner_course_creation ON partner_lms_courses;
CREATE TRIGGER trg_validate_partner_course_creation
  BEFORE INSERT ON partner_lms_courses
  FOR EACH ROW
  EXECUTE FUNCTION validate_partner_course_creation();

-- ============================================
-- NOTIFICATION TRIGGERS
-- ============================================

-- Trigger: Create notification on document status change
CREATE OR REPLACE FUNCTION notify_document_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status != NEW.status THEN
    INSERT INTO notifications (user_id, type, title, message, link, metadata)
    VALUES (
      NEW.user_id,
      'document_' || NEW.status,
      'Document ' || CASE NEW.status
        WHEN 'approved' THEN 'Approved'
        WHEN 'rejected' THEN 'Rejected'
        ELSE 'Updated'
      END,
      'Your document "' || NEW.file_name || '" has been ' || NEW.status,
      '/documents/' || NEW.id,
      jsonb_build_object('document_id', NEW.id, 'old_status', OLD.status, 'new_status', NEW.status)
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_notify_document_status_change ON documents;
CREATE TRIGGER trg_notify_document_status_change
  AFTER UPDATE ON documents
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION notify_document_status_change();

-- Trigger: Create notification on enrollment
CREATE OR REPLACE FUNCTION notify_enrollment_created()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (user_id, type, title, message, link, metadata)
  VALUES (
    NEW.student_id,
    'enrollment_created',
    'Enrollment Confirmed',
    'You have been enrolled in a program',
    '/enrollments/' || NEW.id,
    jsonb_build_object('enrollment_id', NEW.id, 'program_id', NEW.program_id)
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_notify_enrollment_created ON enrollments;
CREATE TRIGGER trg_notify_enrollment_created
  AFTER INSERT ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION notify_enrollment_created();

-- ============================================
-- UTILITY FUNCTIONS
-- ============================================

-- Function: Get partner license info
CREATE OR REPLACE FUNCTION get_partner_license_info(p_partner_id UUID)
RETURNS TABLE (
  license_key TEXT,
  license_type TEXT,
  lms_model TEXT,
  can_create_courses BOOLEAN,
  can_upload_scorm BOOLEAN,
  max_enrollments INTEGER,
  current_enrollments INTEGER,
  status TEXT,
  expires_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pl.license_key,
    pl.license_type,
    pl.lms_model,
    pl.can_create_courses,
    pl.can_upload_scorm,
    pl.max_enrollments,
    pl.current_enrollments,
    pl.status,
    pl.expires_at
  FROM program_licenses pl
  WHERE pl.license_holder_id = p_partner_id
    AND pl.status = 'active'
    AND (pl.expires_at IS NULL OR pl.expires_at > NOW())
  ORDER BY pl.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Check if user can enroll
CREATE OR REPLACE FUNCTION can_user_enroll(p_user_id UUID, p_program_id UUID, p_license_key TEXT DEFAULT NULL)
RETURNS JSONB AS $$
DECLARE
  v_result JSONB;
  v_license RECORD;
  v_existing_enrollment RECORD;
BEGIN
  -- Check if already enrolled
  SELECT * INTO v_existing_enrollment
  FROM enrollments
  WHERE student_id = p_user_id
    AND program_id = p_program_id
    AND status IN ('active', 'pending');
  
  IF FOUND THEN
    RETURN jsonb_build_object(
      'can_enroll', false,
      'reason', 'Already enrolled in this program'
    );
  END IF;
  
  -- If license key provided, validate it
  IF p_license_key IS NOT NULL THEN
    SELECT * INTO v_license
    FROM program_licenses
    WHERE license_key = p_license_key;
    
    IF NOT FOUND THEN
      RETURN jsonb_build_object(
        'can_enroll', false,
        'reason', 'Invalid license key'
      );
    END IF;
    
    IF v_license.status != 'active' THEN
      RETURN jsonb_build_object(
        'can_enroll', false,
        'reason', 'License is not active'
      );
    END IF;
    
    IF v_license.expires_at IS NOT NULL AND v_license.expires_at < NOW() THEN
      RETURN jsonb_build_object(
        'can_enroll', false,
        'reason', 'License has expired'
      );
    END IF;
    
    IF v_license.max_enrollments IS NOT NULL AND v_license.current_enrollments >= v_license.max_enrollments THEN
      RETURN jsonb_build_object(
        'can_enroll', false,
        'reason', 'License enrollment limit reached'
      );
    END IF;
  END IF;
  
  RETURN jsonb_build_object(
    'can_enroll', true,
    'reason', NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Get document requirements for user
CREATE OR REPLACE FUNCTION get_user_document_requirements(p_user_id UUID)
RETURNS TABLE (
  document_type TEXT,
  is_required BOOLEAN,
  description TEXT,
  instructions TEXT,
  has_uploaded BOOLEAN,
  upload_status TEXT
) AS $$
DECLARE
  v_user_role TEXT;
BEGIN
  -- Get user role
  SELECT role INTO v_user_role
  FROM profiles
  WHERE id = p_user_id;
  
  RETURN QUERY
  SELECT 
    dr.document_type,
    dr.is_required,
    dr.description,
    dr.instructions,
    d.id IS NOT NULL as has_uploaded,
    d.status as upload_status
  FROM document_requirements dr
  LEFT JOIN documents d ON d.user_id = p_user_id AND d.document_type = dr.document_type
  WHERE dr.role = v_user_role
  ORDER BY dr.is_required DESC, dr.document_type;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- VERIFICATION
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '✅ ALL TRIGGERS AND FUNCTIONS CREATED!';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Enrollment Triggers:';
  RAISE NOTICE '  ✅ validate_enrollment_license';
  RAISE NOTICE '  ✅ track_license_usage';
  RAISE NOTICE '  ✅ decrement_license_usage';
  RAISE NOTICE '';
  RAISE NOTICE 'Document Triggers:';
  RAISE NOTICE '  ✅ log_document_action';
  RAISE NOTICE '  ✅ update_document_timestamp';
  RAISE NOTICE '  ✅ notify_document_status_change';
  RAISE NOTICE '';
  RAISE NOTICE 'Partner Triggers:';
  RAISE NOTICE '  ✅ validate_partner_course_creation';
  RAISE NOTICE '';
  RAISE NOTICE 'Notification Triggers:';
  RAISE NOTICE '  ✅ notify_enrollment_created';
  RAISE NOTICE '';
  RAISE NOTICE 'Utility Functions:';
  RAISE NOTICE '  ✅ get_partner_license_info()';
  RAISE NOTICE '  ✅ can_user_enroll()';
  RAISE NOTICE '  ✅ get_user_document_requirements()';
  RAISE NOTICE '';
  RAISE NOTICE 'System is now FULLY AUTOMATED!';
  RAISE NOTICE '';
END $$;
