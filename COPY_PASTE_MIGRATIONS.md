# COPY-PASTE SQL MIGRATIONS

**Instructions:** Copy each section below and paste into Supabase SQL Editor, then click "Run"

---

## MIGRATION 1: Employment Outcomes & Credentials

**Copy everything below this line:**

```sql
-- Employment Outcomes and Credential Tracking Migration
-- For WIOA compliance and workforce reporting

-- EMPLOYMENT OUTCOMES TABLE
CREATE TABLE IF NOT EXISTS employment_outcomes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    program_id INTEGER NOT NULL,
    
    -- Employment Status
    employed BOOLEAN DEFAULT FALSE,
    employment_date DATE,
    employer_name VARCHAR(255),
    job_title VARCHAR(255),
    industry VARCHAR(100),
    
    -- Wage Information
    hourly_wage DECIMAL(10, 2),
    annual_salary DECIMAL(12, 2),
    hours_per_week INTEGER,
    benefits_offered BOOLEAN DEFAULT FALSE,
    
    -- Employment Type
    employment_type VARCHAR(50),
    is_career_pathway BOOLEAN DEFAULT FALSE,
    
    -- Retention Tracking
    retained_30_days BOOLEAN,
    retained_90_days BOOLEAN,
    retained_180_days BOOLEAN,
    retained_1_year BOOLEAN,
    
    -- Follow-up Dates
    last_contact_date DATE,
    next_followup_date DATE,
    
    -- Notes
    notes TEXT,
    verification_method VARCHAR(100),
    verified_by INTEGER,
    verified_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_employment_user ON employment_outcomes(user_id);
CREATE INDEX idx_employment_program ON employment_outcomes(program_id);
CREATE INDEX idx_employment_status ON employment_outcomes(employed);
CREATE INDEX idx_employment_date ON employment_outcomes(employment_date);

-- CREDENTIALS ATTAINMENT TABLE
CREATE TABLE IF NOT EXISTS credentials_attained (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    program_id INTEGER NOT NULL,
    
    -- Credential Information
    credential_type VARCHAR(100) NOT NULL,
    credential_name VARCHAR(255) NOT NULL,
    issuing_organization VARCHAR(255),
    credential_number VARCHAR(100),
    
    -- Dates
    issue_date DATE,
    expiration_date DATE,
    
    -- Status
    status VARCHAR(50) DEFAULT 'active',
    is_industry_recognized BOOLEAN DEFAULT TRUE,
    is_stackable BOOLEAN DEFAULT FALSE,
    
    -- Verification
    verification_url TEXT,
    verification_code VARCHAR(100),
    verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP,
    
    -- File Storage
    certificate_file_url TEXT,
    
    -- Metadata
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_credentials_user ON credentials_attained(user_id);
CREATE INDEX idx_credentials_program ON credentials_attained(program_id);
CREATE INDEX idx_credentials_type ON credentials_attained(credential_type);
CREATE INDEX idx_credentials_status ON credentials_attained(status);
CREATE INDEX idx_credentials_expiration ON credentials_attained(expiration_date);

-- QUARTERLY PERFORMANCE METRICS
CREATE TABLE IF NOT EXISTS quarterly_performance (
    id SERIAL PRIMARY KEY,
    
    -- Reporting Period
    quarter INTEGER NOT NULL,
    year INTEGER NOT NULL,
    program_id INTEGER,
    
    -- Enrollment Metrics
    total_enrolled INTEGER DEFAULT 0,
    total_completed INTEGER DEFAULT 0,
    total_dropped INTEGER DEFAULT 0,
    completion_rate DECIMAL(5, 2),
    
    -- Employment Metrics
    total_employed INTEGER DEFAULT 0,
    employed_in_field INTEGER DEFAULT 0,
    median_wage DECIMAL(10, 2),
    employment_rate DECIMAL(5, 2),
    
    -- Credential Metrics
    credentials_earned INTEGER DEFAULT 0,
    credential_rate DECIMAL(5, 2),
    
    -- Retention Metrics
    retained_30_days INTEGER DEFAULT 0,
    retained_90_days INTEGER DEFAULT 0,
    retention_rate_90 DECIMAL(5, 2),
    
    -- Demographics
    participants_female INTEGER DEFAULT 0,
    participants_male INTEGER DEFAULT 0,
    participants_minority INTEGER DEFAULT 0,
    participants_veteran INTEGER DEFAULT 0,
    participants_disability INTEGER DEFAULT 0,
    participants_low_income INTEGER DEFAULT 0,
    
    -- Report Metadata
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    generated_by INTEGER,
    report_file_url TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(quarter, year, program_id)
);

CREATE INDEX idx_quarterly_period ON quarterly_performance(year, quarter);
CREATE INDEX idx_quarterly_program ON quarterly_performance(program_id);

-- PARTICIPANT DEMOGRAPHICS
CREATE TABLE IF NOT EXISTS participant_demographics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
    
    -- Basic Demographics
    date_of_birth DATE,
    gender VARCHAR(50),
    race_ethnicity VARCHAR(100),
    
    -- Veteran Status
    is_veteran BOOLEAN DEFAULT FALSE,
    veteran_era VARCHAR(100),
    
    -- Disability
    has_disability BOOLEAN DEFAULT FALSE,
    disability_type VARCHAR(255),
    
    -- Economic Status
    is_low_income BOOLEAN DEFAULT FALSE,
    household_size INTEGER,
    annual_household_income DECIMAL(12, 2),
    
    -- Education Level
    highest_education VARCHAR(100),
    
    -- Employment Status at Entry
    employment_status_at_entry VARCHAR(50),
    receiving_public_assistance BOOLEAN DEFAULT FALSE,
    
    -- Barriers to Employment
    barriers TEXT[],
    
    -- Privacy
    consent_to_share_data BOOLEAN DEFAULT FALSE,
    consent_date DATE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_demographics_user ON participant_demographics(user_id);
CREATE INDEX idx_demographics_veteran ON participant_demographics(is_veteran);
CREATE INDEX idx_demographics_low_income ON participant_demographics(is_low_income);

-- FOLLOW-UP SCHEDULE
CREATE TABLE IF NOT EXISTS followup_schedule (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    program_id INTEGER NOT NULL,
    
    -- Follow-up Type
    followup_type VARCHAR(50) NOT NULL,
    scheduled_date DATE NOT NULL,
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending',
    completed_date DATE,
    completed_by INTEGER,
    
    -- Contact Method
    contact_method VARCHAR(50),
    contact_attempts INTEGER DEFAULT 0,
    
    -- Outcome
    outcome_notes TEXT,
    still_employed BOOLEAN,
    needs_support BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_followup_user ON followup_schedule(user_id);
CREATE INDEX idx_followup_date ON followup_schedule(scheduled_date);
CREATE INDEX idx_followup_status ON followup_schedule(status);

-- TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_employment_outcomes_updated_at BEFORE UPDATE ON employment_outcomes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_credentials_attained_updated_at BEFORE UPDATE ON credentials_attained
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quarterly_performance_updated_at BEFORE UPDATE ON quarterly_performance
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_participant_demographics_updated_at BEFORE UPDATE ON participant_demographics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_followup_schedule_updated_at BEFORE UPDATE ON followup_schedule
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## MIGRATION 2: Quiz & Assessment Engine

**Copy everything below this line:**

```sql
-- Quiz and Assessment Engine Migration

-- QUIZZES TABLE
CREATE TABLE IF NOT EXISTS quizzes (
    id SERIAL PRIMARY KEY,
    course_id INTEGER,
    lesson_id INTEGER,
    
    -- Quiz Information
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT,
    
    -- Quiz Type
    quiz_type VARCHAR(50) DEFAULT 'knowledge_check',
    
    -- Settings
    time_limit_minutes INTEGER,
    passing_score INTEGER DEFAULT 70,
    max_attempts INTEGER,
    randomize_questions BOOLEAN DEFAULT FALSE,
    randomize_answers BOOLEAN DEFAULT FALSE,
    show_correct_answers BOOLEAN DEFAULT TRUE,
    show_score_immediately BOOLEAN DEFAULT TRUE,
    
    -- Availability
    available_from TIMESTAMP,
    available_until TIMESTAMP,
    is_published BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    total_points INTEGER DEFAULT 0,
    estimated_duration_minutes INTEGER,
    difficulty_level VARCHAR(20),
    
    created_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_quizzes_course ON quizzes(course_id);
CREATE INDEX idx_quizzes_lesson ON quizzes(lesson_id);
CREATE INDEX idx_quizzes_type ON quizzes(quiz_type);

-- QUIZ QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS quiz_questions (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER NOT NULL,
    
    -- Question Content
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL,
    
    -- Display
    question_order INTEGER DEFAULT 0,
    points INTEGER DEFAULT 1,
    
    -- Media
    image_url TEXT,
    video_url TEXT,
    
    -- Explanation
    explanation TEXT,
    reference_material TEXT,
    
    -- Settings
    is_required BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_questions_quiz ON quiz_questions(quiz_id);
CREATE INDEX idx_questions_order ON quiz_questions(quiz_id, question_order);

-- QUIZ ANSWER OPTIONS TABLE
CREATE TABLE IF NOT EXISTS quiz_answer_options (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL,
    
    -- Answer Content
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    
    -- Display
    answer_order INTEGER DEFAULT 0,
    
    -- Feedback
    feedback TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_answers_question ON quiz_answer_options(question_id);
CREATE INDEX idx_answers_correct ON quiz_answer_options(question_id, is_correct);

-- QUIZ ATTEMPTS TABLE
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    
    -- Attempt Information
    attempt_number INTEGER NOT NULL,
    
    -- Timing
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP,
    time_spent_seconds INTEGER,
    
    -- Scoring
    score DECIMAL(5, 2),
    points_earned INTEGER,
    points_possible INTEGER,
    passed BOOLEAN DEFAULT FALSE,
    
    -- Status
    status VARCHAR(50) DEFAULT 'in_progress',
    
    -- Metadata
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_attempts_quiz ON quiz_attempts(quiz_id);
CREATE INDEX idx_attempts_user ON quiz_attempts(user_id);
CREATE INDEX idx_attempts_status ON quiz_attempts(status);
CREATE INDEX idx_attempts_user_quiz ON quiz_attempts(user_id, quiz_id);

-- QUIZ RESPONSES TABLE
CREATE TABLE IF NOT EXISTS quiz_responses (
    id SERIAL PRIMARY KEY,
    attempt_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    
    -- Response Data
    selected_option_ids INTEGER[],
    text_response TEXT,
    
    -- Grading
    is_correct BOOLEAN,
    points_earned INTEGER DEFAULT 0,
    points_possible INTEGER,
    
    -- Manual Grading
    graded_by INTEGER,
    graded_at TIMESTAMP,
    grader_feedback TEXT,
    
    -- Timing
    time_spent_seconds INTEGER,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_responses_attempt ON quiz_responses(attempt_id);
CREATE INDEX idx_responses_question ON quiz_responses(question_id);

-- ASSESSMENTS TABLE
CREATE TABLE IF NOT EXISTS assessments (
    id SERIAL PRIMARY KEY,
    program_id INTEGER,
    
    -- Assessment Information
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assessment_type VARCHAR(50) NOT NULL,
    
    -- Scoring
    passing_score INTEGER DEFAULT 70,
    is_required BOOLEAN DEFAULT FALSE,
    
    -- Availability
    is_published BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_assessments_program ON assessments(program_id);
CREATE INDEX idx_assessments_type ON assessments(assessment_type);

-- ASSESSMENT RESULTS TABLE
CREATE TABLE IF NOT EXISTS assessment_results (
    id SERIAL PRIMARY KEY,
    assessment_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    program_id INTEGER,
    
    -- Results
    score DECIMAL(5, 2),
    passed BOOLEAN DEFAULT FALSE,
    
    -- Timing
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Skills Breakdown
    skills_scores JSONB,
    
    -- Notes
    assessor_notes TEXT,
    assessed_by INTEGER,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_assessment_results_user ON assessment_results(user_id);
CREATE INDEX idx_assessment_results_assessment ON assessment_results(assessment_id);
CREATE INDEX idx_assessment_results_program ON assessment_results(program_id);

-- QUESTION BANK TABLE
CREATE TABLE IF NOT EXISTS question_bank (
    id SERIAL PRIMARY KEY,
    
    -- Question Content
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL,
    
    -- Categorization
    subject_area VARCHAR(100),
    topic VARCHAR(100),
    difficulty_level VARCHAR(20),
    
    -- Bloom's Taxonomy Level
    cognitive_level VARCHAR(50),
    
    -- Usage Tracking
    times_used INTEGER DEFAULT 0,
    average_score DECIMAL(5, 2),
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    reviewed_by INTEGER,
    reviewed_at TIMESTAMP,
    
    created_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_question_bank_subject ON question_bank(subject_area);
CREATE INDEX idx_question_bank_topic ON question_bank(topic);
CREATE INDEX idx_question_bank_difficulty ON question_bank(difficulty_level);

-- TRIGGERS
CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON quizzes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_questions_updated_at BEFORE UPDATE ON quiz_questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_attempts_updated_at BEFORE UPDATE ON quiz_attempts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- VIEWS
CREATE OR REPLACE VIEW quiz_performance_summary AS
SELECT 
    q.id as quiz_id,
    q.title as quiz_title,
    q.course_id,
    COUNT(DISTINCT qa.user_id) as total_attempts_by_users,
    COUNT(qa.id) as total_attempts,
    AVG(qa.score) as average_score,
    AVG(qa.time_spent_seconds / 60.0) as avg_time_minutes,
    SUM(CASE WHEN qa.passed THEN 1 ELSE 0 END)::FLOAT / NULLIF(COUNT(qa.id), 0) * 100 as pass_rate
FROM quizzes q
LEFT JOIN quiz_attempts qa ON q.id = qa.quiz_id AND qa.status = 'submitted'
GROUP BY q.id, q.title, q.course_id;

CREATE OR REPLACE VIEW user_quiz_progress AS
SELECT 
    qa.user_id,
    qa.quiz_id,
    q.title as quiz_title,
    q.course_id,
    MAX(qa.attempt_number) as total_attempts,
    MAX(qa.score) as best_score,
    MAX(CASE WHEN qa.passed THEN 1 ELSE 0 END) as has_passed,
    MAX(qa.submitted_at) as last_attempt_date
FROM quiz_attempts qa
JOIN quizzes q ON qa.quiz_id = q.id
WHERE qa.status = 'submitted'
GROUP BY qa.user_id, qa.quiz_id, q.title, q.course_id;
```

---

## MIGRATION 3: Unauthorized Access Tracking

**Copy everything below this line:**

```sql
-- Unauthorized Access Tracking Migration

-- UNAUTHORIZED ACCESS LOG TABLE
CREATE TABLE IF NOT EXISTS unauthorized_access_log (
    id SERIAL PRIMARY KEY,
    
    -- Site Information
    domain VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    referrer TEXT,
    
    -- User Information
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    -- Geolocation
    country VARCHAR(100),
    city VARCHAR(100),
    
    -- Timestamps
    detected_at TIMESTAMP NOT NULL,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Evidence
    screenshot_url TEXT,
    html_snapshot TEXT,
    
    -- Status
    status VARCHAR(50) DEFAULT 'detected',
    
    -- Actions Taken
    cease_desist_sent BOOLEAN DEFAULT FALSE,
    cease_desist_date DATE,
    dmca_filed BOOLEAN DEFAULT FALSE,
    dmca_filed_date DATE,
    legal_action_taken BOOLEAN DEFAULT FALSE,
    legal_action_date DATE,
    
    -- Notes
    notes TEXT,
    assigned_to INTEGER,
    
    -- Resolution
    resolved BOOLEAN DEFAULT FALSE,
    resolved_at TIMESTAMP,
    resolution_notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_unauthorized_domain ON unauthorized_access_log(domain);
CREATE INDEX idx_unauthorized_detected ON unauthorized_access_log(detected_at);
CREATE INDEX idx_unauthorized_status ON unauthorized_access_log(status);
CREATE INDEX idx_unauthorized_resolved ON unauthorized_access_log(resolved);

-- ALERT NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS alert_notifications (
    id SERIAL PRIMARY KEY,
    
    -- Alert Type
    alert_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) DEFAULT 'high',
    
    -- Alert Details
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    -- Related Data
    related_log_id INTEGER,
    related_url TEXT,
    
    -- Notification Status
    sent BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP,
    sent_to TEXT[],
    
    -- Acknowledgment
    acknowledged BOOLEAN DEFAULT FALSE,
    acknowledged_by INTEGER,
    acknowledged_at TIMESTAMP,
    
    -- Actions
    action_required BOOLEAN DEFAULT TRUE,
    action_taken TEXT,
    action_taken_by INTEGER,
    action_taken_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_alerts_type ON alert_notifications(alert_type);
CREATE INDEX idx_alerts_severity ON alert_notifications(severity);
CREATE INDEX idx_alerts_sent ON alert_notifications(sent);
CREATE INDEX idx_alerts_acknowledged ON alert_notifications(acknowledged);

-- DMCA TAKEDOWN REQUESTS TABLE
CREATE TABLE IF NOT EXISTS dmca_takedown_requests (
    id SERIAL PRIMARY KEY,
    
    -- Target Information
    infringing_domain VARCHAR(255) NOT NULL,
    infringing_url TEXT NOT NULL,
    hosting_provider VARCHAR(255),
    hosting_provider_email VARCHAR(255),
    
    -- Request Details
    request_date DATE NOT NULL,
    request_sent_by INTEGER,
    
    -- Content
    dmca_notice_text TEXT,
    dmca_notice_file_url TEXT,
    
    -- Infringing Content
    infringing_elements TEXT[],
    evidence_urls TEXT[],
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending',
    
    -- Response
    response_received BOOLEAN DEFAULT FALSE,
    response_date DATE,
    response_text TEXT,
    
    -- Compliance
    content_removed BOOLEAN DEFAULT FALSE,
    removal_verified_date DATE,
    
    -- Escalation
    escalated_to_legal BOOLEAN DEFAULT FALSE,
    escalation_date DATE,
    
    -- Notes
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_dmca_domain ON dmca_takedown_requests(infringing_domain);
CREATE INDEX idx_dmca_status ON dmca_takedown_requests(status);
CREATE INDEX idx_dmca_date ON dmca_takedown_requests(request_date);

-- LEGAL ACTIONS TABLE
CREATE TABLE IF NOT EXISTS legal_actions (
    id SERIAL PRIMARY KEY,
    
    -- Case Information
    case_number VARCHAR(100),
    case_type VARCHAR(50),
    defendant_name VARCHAR(255),
    defendant_domain VARCHAR(255),
    
    -- Legal Team
    attorney_name VARCHAR(255),
    law_firm VARCHAR(255),
    attorney_contact TEXT,
    
    -- Timeline
    action_initiated_date DATE NOT NULL,
    cease_desist_sent_date DATE,
    lawsuit_filed_date DATE,
    court_hearing_date DATE,
    resolution_date DATE,
    
    -- Status
    status VARCHAR(50) DEFAULT 'initiated',
    
    -- Financial
    damages_sought DECIMAL(12, 2),
    damages_awarded DECIMAL(12, 2),
    legal_fees DECIMAL(12, 2),
    
    -- Documents
    cease_desist_letter_url TEXT,
    complaint_file_url TEXT,
    settlement_agreement_url TEXT,
    court_order_url TEXT,
    
    -- Outcome
    outcome TEXT,
    lessons_learned TEXT,
    
    -- Notes
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_legal_defendant ON legal_actions(defendant_name);
CREATE INDEX idx_legal_status ON legal_actions(status);
CREATE INDEX idx_legal_date ON legal_actions(action_initiated_date);

-- MONITORING ALERTS TABLE
CREATE TABLE IF NOT EXISTS monitoring_alerts (
    id SERIAL PRIMARY KEY,
    
    -- Alert Source
    source VARCHAR(50) NOT NULL,
    
    -- Alert Details
    alert_title VARCHAR(255) NOT NULL,
    alert_description TEXT,
    alert_url TEXT,
    
    -- Severity
    severity VARCHAR(20) DEFAULT 'medium',
    
    -- Status
    status VARCHAR(50) DEFAULT 'new',
    
    -- Investigation
    investigated_by INTEGER,
    investigated_at TIMESTAMP,
    investigation_notes TEXT,
    
    -- Actions
    action_required BOOLEAN DEFAULT TRUE,
    action_taken TEXT,
    
    -- Related Records
    related_unauthorized_log_id INTEGER,
    related_dmca_id INTEGER,
    related_legal_action_id INTEGER,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_monitoring_source ON monitoring_alerts(source);
CREATE INDEX idx_monitoring_severity ON monitoring_alerts(severity);
CREATE INDEX idx_monitoring_status ON monitoring_alerts(status);

-- SCRAPING ATTEMPTS TABLE
CREATE TABLE IF NOT EXISTS scraping_attempts (
    id SERIAL PRIMARY KEY,
    
    -- Detection Info
    detection_type VARCHAR(50) NOT NULL,
    url TEXT NOT NULL,
    
    -- User Info
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    -- Additional Data
    additional_data JSONB,
    
    -- Timestamps
    detected_at TIMESTAMP NOT NULL,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Actions Taken
    blocked BOOLEAN DEFAULT FALSE,
    ip_banned BOOLEAN DEFAULT FALSE,
    alert_sent BOOLEAN DEFAULT TRUE,
    
    -- Notes
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_scraping_type ON scraping_attempts(detection_type);
CREATE INDEX idx_scraping_ip ON scraping_attempts(ip_address);
CREATE INDEX idx_scraping_detected ON scraping_attempts(detected_at);

-- TRIGGERS
CREATE TRIGGER update_unauthorized_access_log_updated_at BEFORE UPDATE ON unauthorized_access_log
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alert_notifications_updated_at BEFORE UPDATE ON alert_notifications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dmca_takedown_requests_updated_at BEFORE UPDATE ON dmca_takedown_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_legal_actions_updated_at BEFORE UPDATE ON legal_actions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_monitoring_alerts_updated_at BEFORE UPDATE ON monitoring_alerts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- VIEWS
CREATE OR REPLACE VIEW active_unauthorized_copies AS
SELECT 
    domain,
    COUNT(*) as access_count,
    MIN(detected_at) as first_detected,
    MAX(detected_at) as last_detected,
    status,
    cease_desist_sent,
    dmca_filed,
    legal_action_taken
FROM unauthorized_access_log
WHERE resolved = FALSE
GROUP BY domain, status, cease_desist_sent, dmca_filed, legal_action_taken
ORDER BY last_detected DESC;

CREATE OR REPLACE VIEW pending_alerts AS
SELECT 
    alert_type,
    severity,
    title,
    message,
    created_at,
    action_required
FROM alert_notifications
WHERE acknowledged = FALSE
ORDER BY 
    CASE severity
        WHEN 'critical' THEN 1
        WHEN 'high' THEN 2
        WHEN 'medium' THEN 3
        WHEN 'low' THEN 4
    END,
    created_at DESC;

CREATE OR REPLACE VIEW legal_actions_summary AS
SELECT 
    status,
    COUNT(*) as case_count,
    SUM(damages_sought) as total_damages_sought,
    SUM(damages_awarded) as total_damages_awarded,
    SUM(legal_fees) as total_legal_fees
FROM legal_actions
GROUP BY status;

CREATE OR REPLACE VIEW recent_scraping_attempts AS
SELECT 
    detection_type,
    COUNT(*) as attempt_count,
    MAX(detected_at) as last_attempt,
    ip_address,
    user_agent
FROM scraping_attempts
WHERE detected_at > NOW() - INTERVAL '24 hours'
GROUP BY detection_type, ip_address, user_agent
ORDER BY last_attempt DESC;
```

---

## ✅ HOW TO USE

1. **Go to Supabase Dashboard:** https://supabase.com/dashboard
2. **Select your project**
3. **Click "SQL Editor"** (left sidebar)
4. **Click "+ New query"**
5. **Copy Migration 1** (everything in the code block)
6. **Paste into editor**
7. **Click "Run"** button
8. **Wait for success message**
9. **Repeat for Migration 2 and 3**

---

## ✅ VERIFICATION

After running all 3 migrations, verify tables were created:

```sql
-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'employment_outcomes',
    'credentials_attained',
    'quarterly_performance',
    'participant_demographics',
    'followup_schedule',
    'quizzes',
    'quiz_questions',
    'quiz_answer_options',
    'quiz_attempts',
    'quiz_responses',
    'assessments',
    'assessment_results',
    'question_bank',
    'unauthorized_access_log',
    'alert_notifications',
    'dmca_takedown_requests',
    'legal_actions',
    'monitoring_alerts',
    'scraping_attempts'
)
ORDER BY table_name;
```

**Should return 19 tables!**

---

**All migrations are ready to copy and paste!** 🎉
