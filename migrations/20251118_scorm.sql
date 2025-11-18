-- SCORM package management
CREATE TABLE IF NOT EXISTS scorm_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL,
  title text NOT NULL,
  version text NOT NULL, -- 1.2 | 2004
  identifier text NOT NULL,
  manifest_xml text NOT NULL,
  launch_url text NOT NULL,
  storage_path text NOT NULL,
  uploaded_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- SCORM attempt tracking
CREATE TABLE IF NOT EXISTS scorm_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid NOT NULL REFERENCES scorm_packages(id) ON DELETE CASCADE,
  student_id uuid NOT NULL,
  attempt_number integer NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'incomplete', -- incomplete | completed | passed | failed
  score_raw numeric(5,2),
  score_min numeric(5,2),
  score_max numeric(5,2),
  score_scaled numeric(5,4),
  completion_status text,
  success_status text,
  session_time interval,
  total_time interval,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  suspend_data text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- SCORM CMI data storage (for suspend_data and other runtime data)
CREATE TABLE IF NOT EXISTS scorm_cmi_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid NOT NULL REFERENCES scorm_attempts(id) ON DELETE CASCADE,
  cmi_key text NOT NULL,
  cmi_value text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(attempt_id, cmi_key)
);

CREATE INDEX IF NOT EXISTS idx_scorm_attempts_student ON scorm_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_scorm_attempts_package ON scorm_attempts(package_id);
CREATE INDEX IF NOT EXISTS idx_scorm_cmi_attempt ON scorm_cmi_data(attempt_id);
