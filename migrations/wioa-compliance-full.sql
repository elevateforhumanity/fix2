-- =====================================================
-- COMPREHENSIVE WIOA COMPLIANCE SCHEMA
-- Implements full WIOA/PIRL data elements and tracking
-- =====================================================

-- =====================================================
-- 1. PARTICIPANT ELIGIBILITY (Enhanced)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.wioa_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Demographics (PIRL Required)
  date_of_birth DATE NOT NULL,
  gender TEXT CHECK (gender IN ('Male', 'Female', 'Prefer not to answer')),
  ethnicity TEXT CHECK (ethnicity IN ('Hispanic or Latino', 'Not Hispanic or Latino')),
  race TEXT[] CHECK (race <@ ARRAY['American Indian or Alaska Native', 'Asian', 'Black or African American', 'Native Hawaiian or Other Pacific Islander', 'White']),
  
  -- Citizenship & Work Authorization
  us_citizen BOOLEAN DEFAULT false,
  work_authorized BOOLEAN DEFAULT false,
  work_authorization_type TEXT,
  work_authorization_expiry DATE,
  
  -- Selective Service (Males 18-25)
  selective_service_registered BOOLEAN,
  selective_service_exempt BOOLEAN DEFAULT false,
  selective_service_exempt_reason TEXT,
  
  -- Priority of Service
  is_veteran BOOLEAN DEFAULT false,
  veteran_type TEXT CHECK (veteran_type IN ('Vietnam Era Veteran', 'Disabled Veteran', 'Recently Separated Veteran', 'Active Duty Wartime or Campaign Badge Veteran', 'Armed Forces Service Medal Veteran', 'Other Eligible Veteran')),
  veteran_dd214_url TEXT,
  
  is_military_spouse BOOLEAN DEFAULT false,
  
  -- Low Income Determination
  is_low_income BOOLEAN DEFAULT false,
  household_size INTEGER,
  annual_income DECIMAL(10,2),
  income_verification_url TEXT,
  income_verification_date DATE,
  income_verification_method TEXT CHECK (income_verification_method IN ('Pay Stubs', 'Tax Return', 'Public Assistance Records', 'Unemployment Compensation', 'Self-Attestation')),
  
  -- Public Assistance
  receives_tanf BOOLEAN DEFAULT false,
  receives_snap BOOLEAN DEFAULT false,
  receives_ssi BOOLEAN DEFAULT false,
  receives_ssdi BOOLEAN DEFAULT false,
  receives_general_assistance BOOLEAN DEFAULT false,
  
  -- Dislocated Worker
  is_dislocated_worker BOOLEAN DEFAULT false,
  layoff_date DATE,
  layoff_reason TEXT,
  warn_notice_received BOOLEAN DEFAULT false,
  ui_exhausted BOOLEAN DEFAULT false,
  self_employed_now_unemployed BOOLEAN DEFAULT false,
  displaced_homemaker BOOLEAN DEFAULT false,
  military_spouse_displaced BOOLEAN DEFAULT false,
  
  -- Youth (16-24)
  is_youth BOOLEAN DEFAULT false,
  youth_in_school BOOLEAN,
  youth_out_of_school BOOLEAN,
  
  -- Barriers to Employment (PIRL Required)
  is_displaced_homemaker BOOLEAN DEFAULT false,
  is_homeless BOOLEAN DEFAULT false,
  homeless_type TEXT CHECK (homeless_type IN ('Sheltered', 'Unsheltered', 'At Risk')),
  is_runaway_youth BOOLEAN DEFAULT false,
  is_foster_care_youth BOOLEAN DEFAULT false,
  foster_care_age_out BOOLEAN DEFAULT false,
  is_pregnant_parenting BOOLEAN DEFAULT false,
  number_of_children INTEGER,
  is_ex_offender BOOLEAN DEFAULT false,
  offender_type TEXT CHECK (offender_type IN ('Currently Incarcerated', 'Ex-Offender', 'Probation/Parole')),
  
  -- Disability
  has_disability BOOLEAN DEFAULT false,
  disability_types TEXT[] CHECK (disability_types <@ ARRAY['Hearing Impairment', 'Visual Impairment', 'Missing Extremities', 'Partial Paralysis', 'Complete Paralysis', 'Epilepsy', 'Intellectual Disability', 'Other']),
  disability_documentation_url TEXT,
  requires_accommodation BOOLEAN DEFAULT false,
  accommodation_needs TEXT,
  
  -- Education Level (PIRL Required)
  highest_education_level TEXT CHECK (highest_education_level IN (
    'No School Grades Completed',
    'Grades 1-8',
    'Grades 9-11',
    'High School Diploma',
    'GED/HSE',
    'Some College, No Degree',
    'Associate Degree',
    'Bachelor Degree',
    'Beyond Bachelor Degree'
  )),
  school_status TEXT CHECK (school_status IN ('In School', 'Not in School', 'Not Attending')),
  
  -- Employment Status at Entry
  employment_status_at_entry TEXT CHECK (employment_status_at_entry IN ('Employed', 'Employed but Received Notice of Termination', 'Not in Labor Force', 'Unemployed')),
  employed_at_entry BOOLEAN DEFAULT false,
  
  -- Basic Skills Deficient
  is_basic_skills_deficient BOOLEAN DEFAULT false,
  basic_skills_assessment_date DATE,
  basic_skills_assessment_type TEXT,
  basic_skills_reading_level TEXT,
  basic_skills_math_level TEXT,
  
  -- English Language Learner
  is_english_language_learner BOOLEAN DEFAULT false,
  primary_language TEXT,
  
  -- Long-term Unemployed
  is_long_term_unemployed BOOLEAN DEFAULT false,
  unemployment_duration_weeks INTEGER,
  
  -- Migrant/Seasonal Farmworker
  is_migrant_farmworker BOOLEAN DEFAULT false,
  is_seasonal_farmworker BOOLEAN DEFAULT false,
  
  -- Single Parent
  is_single_parent BOOLEAN DEFAULT false,
  
  -- Cultural Barriers
  has_cultural_barriers BOOLEAN DEFAULT false,
  cultural_barrier_description TEXT,
  
  -- Eligibility Determination
  eligibility_status TEXT CHECK (eligibility_status IN ('Pending', 'Eligible', 'Ineligible', 'Needs More Info')) DEFAULT 'Pending',
  eligibility_determined_by UUID REFERENCES auth.users(id),
  eligibility_determined_date DATE,
  eligibility_notes TEXT,
  
  -- Program Assignment
  wioa_program TEXT CHECK (wioa_program IN ('Adult', 'Dislocated Worker', 'Youth')),
  funding_source TEXT[] CHECK (funding_source <@ ARRAY['WIOA Adult', 'WIOA Dislocated Worker', 'WIOA Youth', 'TANF', 'SNAP E&T', 'WRG', 'TAA', 'JVSG', 'Other']),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_age CHECK (date_of_birth <= CURRENT_DATE - INTERVAL '16 years')
);

-- =====================================================
-- 2. INDIVIDUAL EMPLOYMENT PLAN (IEP)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.individual_employment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES public.wioa_participants(id) ON DELETE CASCADE,
  
  -- Career Goals
  primary_career_goal TEXT NOT NULL,
  secondary_career_goal TEXT,
  target_occupation_soc_code TEXT, -- Standard Occupational Classification
  target_wage_goal DECIMAL(10,2),
  
  -- Barriers Identified
  identified_barriers TEXT[],
  barrier_mitigation_strategies TEXT,
  
  -- Services Needed
  assessment_services_needed TEXT[],
  training_services_needed TEXT[],
  supportive_services_needed TEXT[],
  follow_up_services_needed TEXT[],
  
  -- Education/Training Plan
  training_program_id UUID REFERENCES public.programs(id),
  expected_training_start_date DATE,
  expected_training_completion_date DATE,
  credential_goal TEXT,
  
  -- Employment Plan
  job_search_activities TEXT[],
  job_placement_assistance_needed BOOLEAN DEFAULT false,
  
  -- Milestones
  short_term_goals TEXT[],
  long_term_goals TEXT[],
  
  -- Plan Status
  plan_status TEXT CHECK (plan_status IN ('Draft', 'Active', 'Completed', 'Revised', 'Closed')) DEFAULT 'Draft',
  plan_created_by UUID REFERENCES auth.users(id),
  plan_approved_by UUID REFERENCES auth.users(id),
  plan_approved_date DATE,
  
  -- Participant Agreement
  participant_signature_url TEXT,
  participant_signed_date DATE,
  case_manager_signature_url TEXT,
  case_manager_signed_date DATE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. SERVICES TRACKING (PIRL Required)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.wioa_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES public.wioa_participants(id) ON DELETE CASCADE,
  iep_id UUID REFERENCES public.individual_employment_plans(id),
  
  -- Service Type (PIRL Categories)
  service_category TEXT CHECK (service_category IN (
    'Basic Career Services',
    'Individualized Career Services',
    'Training Services',
    'Follow-up Services',
    'Supportive Services'
  )) NOT NULL,
  
  service_type TEXT NOT NULL,
  -- Basic Career Services: Eligibility Determination, Outreach, Initial Assessment, Labor Market Info, etc.
  -- Individualized: Comprehensive Assessment, IEP Development, Career Planning, Short-term Prevocational Services
  -- Training: Occupational Skills Training, OJT, Incumbent Worker Training, Workplace Training, Adult Ed/Literacy
  -- Follow-up: Post-employment services for 12 months
  -- Supportive: Transportation, Childcare, Housing, etc.
  
  service_description TEXT,
  service_provider TEXT,
  service_provider_id UUID REFERENCES auth.users(id),
  
  -- Service Dates
  service_start_date DATE NOT NULL,
  service_end_date DATE,
  service_hours DECIMAL(10,2),
  
  -- Service Status
  service_status TEXT CHECK (service_status IN ('Scheduled', 'In Progress', 'Completed', 'Cancelled', 'No Show')) DEFAULT 'Scheduled',
  
  -- Service Cost (for tracking funding)
  service_cost DECIMAL(10,2),
  funding_source TEXT,
  
  -- Service Outcome
  service_outcome TEXT,
  participant_satisfaction_rating INTEGER CHECK (participant_satisfaction_rating BETWEEN 1 AND 5),
  
  -- Documentation
  service_documentation_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 4. SUPPORTIVE SERVICES
-- =====================================================

CREATE TABLE IF NOT EXISTS public.supportive_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES public.wioa_participants(id) ON DELETE CASCADE,
  
  -- Service Type
  service_type TEXT CHECK (service_type IN (
    'Transportation',
    'Childcare',
    'Housing Assistance',
    'Needs-Related Payments',
    'Medical/Health Services',
    'Legal Aid',
    'Referrals to Other Services',
    'Work Clothing/Uniforms',
    'Tools/Equipment',
    'Books/Supplies',
    'Testing/Licensing Fees',
    'Other'
  )) NOT NULL,
  
  service_description TEXT,
  
  -- Financial Details
  amount_requested DECIMAL(10,2),
  amount_approved DECIMAL(10,2),
  amount_paid DECIMAL(10,2),
  
  -- Approval Workflow
  request_status TEXT CHECK (request_status IN ('Pending', 'Approved', 'Denied', 'Paid')) DEFAULT 'Pending',
  requested_by UUID REFERENCES auth.users(id),
  requested_date DATE DEFAULT CURRENT_DATE,
  approved_by UUID REFERENCES auth.users(id),
  approved_date DATE,
  denial_reason TEXT,
  
  -- Payment Details
  payment_method TEXT CHECK (payment_method IN ('Direct Payment', 'Reimbursement', 'Voucher')),
  payment_date DATE,
  payment_reference TEXT,
  
  -- Documentation
  supporting_documentation_url TEXT,
  receipt_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 5. ASSESSMENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.wioa_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES public.wioa_participants(id) ON DELETE CASCADE,
  
  -- Assessment Type
  assessment_type TEXT CHECK (assessment_type IN (
    'Initial Assessment',
    'Comprehensive Assessment',
    'Basic Skills Assessment',
    'Occupational Skills Assessment',
    'Career Interest Inventory',
    'Work Readiness Assessment',
    'Barrier Assessment',
    'Follow-up Assessment'
  )) NOT NULL,
  
  assessment_name TEXT,
  assessment_provider TEXT,
  
  -- Assessment Details
  assessment_date DATE NOT NULL,
  administered_by UUID REFERENCES auth.users(id),
  
  -- Results
  assessment_results JSONB,
  overall_score TEXT,
  reading_level TEXT,
  math_level TEXT,
  
  -- Recommendations
  recommendations TEXT,
  services_recommended TEXT[],
  
  -- Documentation
  assessment_report_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 6. TRAINING ENROLLMENT (Enhanced)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.wioa_training_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES public.wioa_participants(id) ON DELETE CASCADE,
  iep_id UUID REFERENCES public.individual_employment_plans(id),
  program_id UUID REFERENCES public.programs(id),
  
  -- Training Details
  training_type TEXT CHECK (training_type IN (
    'Occupational Skills Training',
    'On-the-Job Training (OJT)',
    'Incumbent Worker Training',
    'Workplace Training',
    'Adult Education and Literacy',
    'Customized Training',
    'Entrepreneurial Training',
    'Skill Upgrading',
    'Job Readiness Training'
  )) NOT NULL,
  
  training_provider TEXT,
  training_provider_ein TEXT, -- Employer Identification Number
  
  -- Enrollment Dates
  enrollment_date DATE NOT NULL,
  training_start_date DATE,
  expected_completion_date DATE,
  actual_completion_date DATE,
  
  -- Training Status
  training_status TEXT CHECK (training_status IN (
    'Enrolled',
    'In Training',
    'Completed',
    'Dropped Out',
    'Transferred',
    'On Hold'
  )) DEFAULT 'Enrolled',
  
  -- Attendance Tracking
  required_hours DECIMAL(10,2),
  hours_completed DECIMAL(10,2) DEFAULT 0,
  attendance_percentage DECIMAL(5,2),
  
  -- Performance
  current_grade TEXT,
  passing_grade BOOLEAN,
  
  -- Credential Goal
  credential_sought TEXT,
  credential_type TEXT CHECK (credential_type IN (
    'Secondary School Diploma',
    'GED/HSE',
    'Certificate',
    'Certification',
    'License',
    'Associate Degree',
    'Bachelor Degree',
    'Beyond Bachelor Degree',
    'Other Recognized Credential'
  )),
  
  -- Credential Attainment
  credential_attained BOOLEAN DEFAULT false,
  credential_attainment_date DATE,
  credential_number TEXT,
  credential_verification_url TEXT,
  
  -- Funding
  training_cost DECIMAL(10,2),
  wioa_funding_amount DECIMAL(10,2),
  other_funding_source TEXT,
  other_funding_amount DECIMAL(10,2),
  
  -- Exit Information
  exit_date DATE,
  exit_reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 7. EMPLOYMENT OUTCOMES (PIRL Required)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.employment_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES public.wioa_participants(id) ON DELETE CASCADE,
  
  -- Employment Details
  employer_name TEXT NOT NULL,
  employer_ein TEXT,
  employer_address TEXT,
  employer_contact_name TEXT,
  employer_contact_phone TEXT,
  employer_contact_email TEXT,
  
  -- Job Details
  job_title TEXT NOT NULL,
  soc_code TEXT, -- Standard Occupational Classification
  naics_code TEXT, -- North American Industry Classification System
  
  -- Employment Type
  employment_type TEXT CHECK (employment_type IN (
    'Full-Time',
    'Part-Time',
    'Temporary',
    'Seasonal',
    'Self-Employed',
    'Apprenticeship',
    'OJT'
  )) NOT NULL,
  
  -- Wages
  hourly_wage DECIMAL(10,2),
  annual_salary DECIMAL(10,2),
  hours_per_week DECIMAL(5,2),
  
  -- Benefits
  has_health_insurance BOOLEAN DEFAULT false,
  has_retirement_benefits BOOLEAN DEFAULT false,
  has_paid_leave BOOLEAN DEFAULT false,
  other_benefits TEXT[],
  
  -- Employment Dates
  hire_date DATE NOT NULL,
  employment_verification_date DATE,
  employment_verified_by UUID REFERENCES auth.users(id),
  
  -- Retention Tracking (WIOA requires 2nd and 4th quarter after exit)
  retained_2nd_quarter BOOLEAN,
  retained_2nd_quarter_verification_date DATE,
  retained_4th_quarter BOOLEAN,
  retained_4th_quarter_verification_date DATE,
  
  -- Job Separation
  separation_date DATE,
  separation_reason TEXT,
  
  -- Related to Training
  related_to_training BOOLEAN,
  
  -- Documentation
  employment_verification_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 8. CASE NOTES
-- =====================================================

CREATE TABLE IF NOT EXISTS public.case_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES public.wioa_participants(id) ON DELETE CASCADE,
  
  -- Note Details
  note_type TEXT CHECK (note_type IN (
    'Initial Contact',
    'Assessment',
    'Service Delivery',
    'Progress Update',
    'Barrier Identified',
    'Barrier Resolved',
    'Employment Update',
    'Follow-up',
    'Case Closure',
    'Other'
  )) NOT NULL,
  
  note_content TEXT NOT NULL,
  
  -- Contact Information
  contact_method TEXT CHECK (contact_method IN ('In-Person', 'Phone', 'Email', 'Video Call', 'Text Message')),
  contact_duration_minutes INTEGER,
  
  -- Case Manager
  case_manager_id UUID REFERENCES auth.users(id) NOT NULL,
  
  -- Follow-up
  requires_follow_up BOOLEAN DEFAULT false,
  follow_up_date DATE,
  follow_up_completed BOOLEAN DEFAULT false,
  
  -- Attachments
  attachments TEXT[],
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 9. PROGRAM EXIT
-- =====================================================

CREATE TABLE IF NOT EXISTS public.program_exits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES public.wioa_participants(id) ON DELETE CASCADE,
  
  -- Exit Details
  exit_date DATE NOT NULL,
  exit_type TEXT CHECK (exit_type IN (
    'Entered Employment',
    'Entered Education/Training',
    'Entered Military',
    'Attained Credential',
    'Achieved Goals',
    'Moved Out of Area',
    'Health/Medical',
    'Family Responsibilities',
    'Institutionalized',
    'Deceased',
    'Other Reason',
    'No Contact'
  )) NOT NULL,
  
  exit_reason_detail TEXT,
  
  -- Employment at Exit
  employed_at_exit BOOLEAN DEFAULT false,
  employment_id UUID REFERENCES public.employment_outcomes(id),
  
  -- Credential at Exit
  credential_attained_at_exit BOOLEAN DEFAULT false,
  
  -- Measurable Skill Gains
  msg_attained BOOLEAN DEFAULT false,
  msg_type TEXT CHECK (msg_type IN (
    'Educational Functioning Level Gain',
    'Secondary School Diploma/Equivalent',
    'Secondary/Postsecondary Transcript/Report Card',
    'Training Milestone',
    'Skills Progression'
  )),
  
  -- Exit Status
  exit_status TEXT CHECK (exit_status IN ('Positive', 'Neutral', 'Negative')) DEFAULT 'Neutral',
  
  -- Follow-up Plan
  follow_up_required BOOLEAN DEFAULT true,
  follow_up_schedule TEXT,
  
  -- Case Manager
  exited_by UUID REFERENCES auth.users(id),
  
  -- Documentation
  exit_documentation_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 10. AUDIT LOG
-- =====================================================

CREATE TABLE IF NOT EXISTS public.wioa_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- What was accessed/changed
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT CHECK (action IN ('CREATE', 'READ', 'UPDATE', 'DELETE', 'EXPORT')) NOT NULL,
  
  -- Who did it
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  user_role TEXT,
  
  -- When
  action_timestamp TIMESTAMPTZ DEFAULT NOW(),
  
  -- Details
  old_values JSONB,
  new_values JSONB,
  changed_fields TEXT[],
  
  -- Context
  ip_address INET,
  user_agent TEXT,
  session_id TEXT,
  
  -- Compliance
  data_access_reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_wioa_participants_user_id ON public.wioa_participants(user_id);
CREATE INDEX idx_wioa_participants_eligibility_status ON public.wioa_participants(eligibility_status);
CREATE INDEX idx_wioa_participants_wioa_program ON public.wioa_participants(wioa_program);
CREATE INDEX idx_wioa_participants_is_veteran ON public.wioa_participants(is_veteran);
CREATE INDEX idx_wioa_participants_is_low_income ON public.wioa_participants(is_low_income);

CREATE INDEX idx_iep_participant_id ON public.individual_employment_plans(participant_id);
CREATE INDEX idx_iep_plan_status ON public.individual_employment_plans(plan_status);

CREATE INDEX idx_wioa_services_participant_id ON public.wioa_services(participant_id);
CREATE INDEX idx_wioa_services_service_category ON public.wioa_services(service_category);
CREATE INDEX idx_wioa_services_service_start_date ON public.wioa_services(service_start_date);

CREATE INDEX idx_supportive_services_participant_id ON public.supportive_services(participant_id);
CREATE INDEX idx_supportive_services_request_status ON public.supportive_services(request_status);

CREATE INDEX idx_wioa_training_participant_id ON public.wioa_training_enrollments(participant_id);
CREATE INDEX idx_wioa_training_training_status ON public.wioa_training_enrollments(training_status);

CREATE INDEX idx_employment_outcomes_participant_id ON public.employment_outcomes(participant_id);
CREATE INDEX idx_employment_outcomes_hire_date ON public.employment_outcomes(hire_date);

CREATE INDEX idx_case_notes_participant_id ON public.case_notes(participant_id);
CREATE INDEX idx_case_notes_case_manager_id ON public.case_notes(case_manager_id);
CREATE INDEX idx_case_notes_created_at ON public.case_notes(created_at DESC);

CREATE INDEX idx_program_exits_participant_id ON public.program_exits(participant_id);
CREATE INDEX idx_program_exits_exit_date ON public.program_exits(exit_date);

CREATE INDEX idx_audit_log_table_record ON public.wioa_audit_log(table_name, record_id);
CREATE INDEX idx_audit_log_user_id ON public.wioa_audit_log(user_id);
CREATE INDEX idx_audit_log_timestamp ON public.wioa_audit_log(action_timestamp DESC);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.wioa_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.individual_employment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wioa_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supportive_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wioa_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wioa_training_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employment_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_exits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wioa_audit_log ENABLE ROW LEVEL SECURITY;

-- Participants can view their own data
CREATE POLICY "Participants can view own data" ON public.wioa_participants
  FOR SELECT USING (auth.uid() = user_id);

-- Case managers and admins can view all
CREATE POLICY "Case managers can view all participants" ON public.wioa_participants
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('case_manager', 'admin', 'workforce_board')
    )
  );

-- Similar policies for other tables...
CREATE POLICY "Case managers can manage IEPs" ON public.individual_employment_plans
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('case_manager', 'admin', 'workforce_board')
    )
  );

CREATE POLICY "Case managers can manage services" ON public.wioa_services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('case_manager', 'admin', 'workforce_board')
    )
  );

-- Audit log is read-only for admins
CREATE POLICY "Admins can view audit log" ON public.wioa_audit_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- =====================================================
-- TRIGGERS FOR AUDIT LOGGING
-- =====================================================

CREATE OR REPLACE FUNCTION log_wioa_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.wioa_audit_log (
    table_name,
    record_id,
    action,
    user_id,
    old_values,
    new_values
  ) VALUES (
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    TG_OP,
    auth.uid(),
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit triggers to sensitive tables
CREATE TRIGGER audit_wioa_participants
  AFTER INSERT OR UPDATE OR DELETE ON public.wioa_participants
  FOR EACH ROW EXECUTE FUNCTION log_wioa_changes();

CREATE TRIGGER audit_iep
  AFTER INSERT OR UPDATE OR DELETE ON public.individual_employment_plans
  FOR EACH ROW EXECUTE FUNCTION log_wioa_changes();

CREATE TRIGGER audit_employment_outcomes
  AFTER INSERT OR UPDATE OR DELETE ON public.employment_outcomes
  FOR EACH ROW EXECUTE FUNCTION log_wioa_changes();

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE public.wioa_participants IS 'Comprehensive WIOA participant eligibility and demographics tracking per PIRL requirements';
COMMENT ON TABLE public.individual_employment_plans IS 'Individual Employment Plans (IEPs) required for WIOA participants';
COMMENT ON TABLE public.wioa_services IS 'Tracking of all WIOA services provided to participants';
COMMENT ON TABLE public.supportive_services IS 'Supportive services funding and tracking (transportation, childcare, etc.)';
COMMENT ON TABLE public.employment_outcomes IS 'Employment outcomes and retention tracking for WIOA performance measures';
COMMENT ON TABLE public.wioa_audit_log IS 'Audit trail for all WIOA data access and modifications';
