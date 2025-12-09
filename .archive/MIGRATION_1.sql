-- MIGRATION 1: Employment Outcomes & Credentials
-- Copy everything below and paste into Supabase SQL Editor

CREATE TABLE IF NOT EXISTS employment_outcomes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    program_id INTEGER NOT NULL,
    employed BOOLEAN DEFAULT FALSE,
    employment_date DATE,
    employer_name VARCHAR(255),
    job_title VARCHAR(255),
    industry VARCHAR(100),
    hourly_wage DECIMAL(10, 2),
    annual_salary DECIMAL(12, 2),
    hours_per_week INTEGER,
    benefits_offered BOOLEAN DEFAULT FALSE,
    employment_type VARCHAR(50),
    is_career_pathway BOOLEAN DEFAULT FALSE,
    retained_30_days BOOLEAN,
    retained_90_days BOOLEAN,
    retained_180_days BOOLEAN,
    retained_1_year BOOLEAN,
    last_contact_date DATE,
    next_followup_date DATE,
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

CREATE TABLE IF NOT EXISTS credentials_attained (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    program_id INTEGER NOT NULL,
    credential_type VARCHAR(100) NOT NULL,
    credential_name VARCHAR(255) NOT NULL,
    issuing_organization VARCHAR(255),
    credential_number VARCHAR(100),
    issue_date DATE,
    expiration_date DATE,
    status VARCHAR(50) DEFAULT 'active',
    is_industry_recognized BOOLEAN DEFAULT TRUE,
    is_stackable BOOLEAN DEFAULT FALSE,
    verification_url TEXT,
    verification_code VARCHAR(100),
    verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP,
    certificate_file_url TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_credentials_user ON credentials_attained(user_id);
CREATE INDEX idx_credentials_program ON credentials_attained(program_id);
CREATE INDEX idx_credentials_type ON credentials_attained(credential_type);
CREATE INDEX idx_credentials_status ON credentials_attained(status);
CREATE INDEX idx_credentials_expiration ON credentials_attained(expiration_date);

CREATE TABLE IF NOT EXISTS quarterly_performance (
    id SERIAL PRIMARY KEY,
    quarter INTEGER NOT NULL,
    year INTEGER NOT NULL,
    program_id INTEGER,
    total_enrolled INTEGER DEFAULT 0,
    total_completed INTEGER DEFAULT 0,
    total_dropped INTEGER DEFAULT 0,
    completion_rate DECIMAL(5, 2),
    total_employed INTEGER DEFAULT 0,
    employed_in_field INTEGER DEFAULT 0,
    median_wage DECIMAL(10, 2),
    employment_rate DECIMAL(5, 2),
    credentials_earned INTEGER DEFAULT 0,
    credential_rate DECIMAL(5, 2),
    retained_30_days INTEGER DEFAULT 0,
    retained_90_days INTEGER DEFAULT 0,
    retention_rate_90 DECIMAL(5, 2),
    participants_female INTEGER DEFAULT 0,
    participants_male INTEGER DEFAULT 0,
    participants_minority INTEGER DEFAULT 0,
    participants_veteran INTEGER DEFAULT 0,
    participants_disability INTEGER DEFAULT 0,
    participants_low_income INTEGER DEFAULT 0,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    generated_by INTEGER,
    report_file_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(quarter, year, program_id)
);

CREATE INDEX idx_quarterly_period ON quarterly_performance(year, quarter);
CREATE INDEX idx_quarterly_program ON quarterly_performance(program_id);

CREATE TABLE IF NOT EXISTS participant_demographics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
    date_of_birth DATE,
    gender VARCHAR(50),
    race_ethnicity VARCHAR(100),
    is_veteran BOOLEAN DEFAULT FALSE,
    veteran_era VARCHAR(100),
    has_disability BOOLEAN DEFAULT FALSE,
    disability_type VARCHAR(255),
    is_low_income BOOLEAN DEFAULT FALSE,
    household_size INTEGER,
    annual_household_income DECIMAL(12, 2),
    highest_education VARCHAR(100),
    employment_status_at_entry VARCHAR(50),
    receiving_public_assistance BOOLEAN DEFAULT FALSE,
    barriers TEXT[],
    consent_to_share_data BOOLEAN DEFAULT FALSE,
    consent_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_demographics_user ON participant_demographics(user_id);
CREATE INDEX idx_demographics_veteran ON participant_demographics(is_veteran);
CREATE INDEX idx_demographics_low_income ON participant_demographics(is_low_income);

CREATE TABLE IF NOT EXISTS followup_schedule (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    program_id INTEGER NOT NULL,
    followup_type VARCHAR(50) NOT NULL,
    scheduled_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    completed_date DATE,
    completed_by INTEGER,
    contact_method VARCHAR(50),
    contact_attempts INTEGER DEFAULT 0,
    outcome_notes TEXT,
    still_employed BOOLEAN,
    needs_support BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_followup_user ON followup_schedule(user_id);
CREATE INDEX idx_followup_date ON followup_schedule(scheduled_date);
CREATE INDEX idx_followup_status ON followup_schedule(status);

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
