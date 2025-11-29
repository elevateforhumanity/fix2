-- Quiz and Assessment Engine Migration
-- For course assessments, knowledge checks, and certification exams

-- ============================================================================
-- QUIZZES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS quizzes (
    id SERIAL PRIMARY KEY,
    course_id INTEGER,
    lesson_id INTEGER,
    
    -- Quiz Information
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT,
    
    -- Quiz Type
    quiz_type VARCHAR(50) DEFAULT 'knowledge_check', -- knowledge_check, final_exam, practice_test, certification_exam
    
    -- Settings
    time_limit_minutes INTEGER, -- NULL = no time limit
    passing_score INTEGER DEFAULT 70, -- percentage
    max_attempts INTEGER, -- NULL = unlimited
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
    difficulty_level VARCHAR(20), -- beginner, intermediate, advanced
    
    created_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_quizzes_course ON quizzes(course_id);
CREATE INDEX idx_quizzes_lesson ON quizzes(lesson_id);
CREATE INDEX idx_quizzes_type ON quizzes(quiz_type);

-- ============================================================================
-- QUIZ QUESTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS quiz_questions (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER NOT NULL,
    
    -- Question Content
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL, -- multiple_choice, true_false, multiple_select, short_answer, essay
    
    -- Display
    question_order INTEGER DEFAULT 0,
    points INTEGER DEFAULT 1,
    
    -- Media
    image_url TEXT,
    video_url TEXT,
    
    -- Explanation
    explanation TEXT, -- Shown after answer
    reference_material TEXT, -- Link to course content
    
    -- Settings
    is_required BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_questions_quiz ON quiz_questions(quiz_id);
CREATE INDEX idx_questions_order ON quiz_questions(quiz_id, question_order);

-- ============================================================================
-- QUIZ ANSWER OPTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS quiz_answer_options (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL,
    
    -- Answer Content
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    
    -- Display
    answer_order INTEGER DEFAULT 0,
    
    -- Feedback
    feedback TEXT, -- Specific feedback for this answer choice
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_answers_question ON quiz_answer_options(question_id);
CREATE INDEX idx_answers_correct ON quiz_answer_options(question_id, is_correct);

-- ============================================================================
-- QUIZ ATTEMPTS TABLE
-- ============================================================================
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
    score DECIMAL(5, 2), -- percentage
    points_earned INTEGER,
    points_possible INTEGER,
    passed BOOLEAN DEFAULT FALSE,
    
    -- Status
    status VARCHAR(50) DEFAULT 'in_progress', -- in_progress, submitted, graded, abandoned
    
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

-- ============================================================================
-- QUIZ RESPONSES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS quiz_responses (
    id SERIAL PRIMARY KEY,
    attempt_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    
    -- Response Data
    selected_option_ids INTEGER[], -- For multiple choice/select
    text_response TEXT, -- For short answer/essay
    
    -- Grading
    is_correct BOOLEAN,
    points_earned INTEGER DEFAULT 0,
    points_possible INTEGER,
    
    -- Manual Grading (for essays)
    graded_by INTEGER, -- staff user_id
    graded_at TIMESTAMP,
    grader_feedback TEXT,
    
    -- Timing
    time_spent_seconds INTEGER,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_responses_attempt ON quiz_responses(attempt_id);
CREATE INDEX idx_responses_question ON quiz_responses(question_id);

-- ============================================================================
-- ASSESSMENTS TABLE (Pre/Post Tests, Skills Assessments)
-- ============================================================================
CREATE TABLE IF NOT EXISTS assessments (
    id SERIAL PRIMARY KEY,
    program_id INTEGER,
    
    -- Assessment Information
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assessment_type VARCHAR(50) NOT NULL, -- pre_test, post_test, skills_assessment, competency_check
    
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

-- ============================================================================
-- ASSESSMENT RESULTS TABLE
-- ============================================================================
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
    
    -- Skills Breakdown (JSON for flexibility)
    skills_scores JSONB, -- {"communication": 85, "technical": 90, "safety": 95}
    
    -- Notes
    assessor_notes TEXT,
    assessed_by INTEGER, -- staff user_id
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_assessment_results_user ON assessment_results(user_id);
CREATE INDEX idx_assessment_results_assessment ON assessment_results(assessment_id);
CREATE INDEX idx_assessment_results_program ON assessment_results(program_id);

-- ============================================================================
-- QUESTION BANK TABLE (Reusable Questions)
-- ============================================================================
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
    cognitive_level VARCHAR(50), -- remember, understand, apply, analyze, evaluate, create
    
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

-- ============================================================================
-- TRIGGERS
-- ============================================================================
CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON quizzes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_questions_updated_at BEFORE UPDATE ON quiz_questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_attempts_updated_at BEFORE UPDATE ON quiz_attempts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VIEWS FOR REPORTING
-- ============================================================================

-- Quiz Performance Summary
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

-- User Quiz Progress
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

-- ============================================================================
-- COMMENTS
-- ============================================================================
COMMENT ON TABLE quizzes IS 'Quiz definitions and settings';
COMMENT ON TABLE quiz_questions IS 'Questions within quizzes';
COMMENT ON TABLE quiz_answer_options IS 'Answer choices for quiz questions';
COMMENT ON TABLE quiz_attempts IS 'User attempts at quizzes';
COMMENT ON TABLE quiz_responses IS 'Individual question responses within attempts';
COMMENT ON TABLE assessments IS 'Skills assessments and competency checks';
COMMENT ON TABLE assessment_results IS 'Results from skills assessments';
COMMENT ON TABLE question_bank IS 'Reusable question library';
