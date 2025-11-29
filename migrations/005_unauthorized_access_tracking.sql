-- Unauthorized Access Tracking Migration
-- Logs when someone copies your site and hosts it elsewhere
-- Creates permanent evidence for legal proceedings

-- ============================================================================
-- UNAUTHORIZED ACCESS LOG TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS unauthorized_access_log (
    id SERIAL PRIMARY KEY,
    
    -- Site Information
    domain VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    referrer TEXT,
    
    -- User Information
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    -- Geolocation (if available)
    country VARCHAR(100),
    city VARCHAR(100),
    
    -- Timestamps
    detected_at TIMESTAMP NOT NULL,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Evidence
    screenshot_url TEXT,
    html_snapshot TEXT,
    
    -- Status
    status VARCHAR(50) DEFAULT 'detected', -- detected, investigated, dmca_sent, legal_action, resolved
    
    -- Actions Taken
    cease_desist_sent BOOLEAN DEFAULT FALSE,
    cease_desist_date DATE,
    dmca_filed BOOLEAN DEFAULT FALSE,
    dmca_filed_date DATE,
    legal_action_taken BOOLEAN DEFAULT FALSE,
    legal_action_date DATE,
    
    -- Notes
    notes TEXT,
    assigned_to INTEGER, -- staff user_id handling the case
    
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

-- ============================================================================
-- ALERT NOTIFICATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS alert_notifications (
    id SERIAL PRIMARY KEY,
    
    -- Alert Type
    alert_type VARCHAR(50) NOT NULL, -- unauthorized_copy, suspicious_activity, security_breach
    severity VARCHAR(20) DEFAULT 'high', -- low, medium, high, critical
    
    -- Alert Details
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    -- Related Data
    related_log_id INTEGER, -- References unauthorized_access_log
    related_url TEXT,
    
    -- Notification Status
    sent BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP,
    sent_to TEXT[], -- Array of email addresses
    
    -- Acknowledgment
    acknowledged BOOLEAN DEFAULT FALSE,
    acknowledged_by INTEGER, -- staff user_id
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

-- ============================================================================
-- DMCA TAKEDOWN REQUESTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS dmca_takedown_requests (
    id SERIAL PRIMARY KEY,
    
    -- Target Information
    infringing_domain VARCHAR(255) NOT NULL,
    infringing_url TEXT NOT NULL,
    hosting_provider VARCHAR(255),
    hosting_provider_email VARCHAR(255),
    
    -- Request Details
    request_date DATE NOT NULL,
    request_sent_by INTEGER, -- staff user_id
    
    -- Content
    dmca_notice_text TEXT,
    dmca_notice_file_url TEXT,
    
    -- Infringing Content
    infringing_elements TEXT[], -- Array of specific copied elements
    evidence_urls TEXT[], -- Screenshots, archives, etc.
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending', -- pending, sent, acknowledged, complied, refused, escalated
    
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

-- ============================================================================
-- LEGAL ACTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS legal_actions (
    id SERIAL PRIMARY KEY,
    
    -- Case Information
    case_number VARCHAR(100),
    case_type VARCHAR(50), -- cease_desist, copyright_infringement, trade_secret, etc.
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
    status VARCHAR(50) DEFAULT 'initiated', -- initiated, cease_desist_sent, lawsuit_filed, in_litigation, settled, won, lost
    
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

-- ============================================================================
-- MONITORING ALERTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS monitoring_alerts (
    id SERIAL PRIMARY KEY,
    
    -- Alert Source
    source VARCHAR(50) NOT NULL, -- google_alerts, copyscape, domain_monitor, manual
    
    -- Alert Details
    alert_title VARCHAR(255) NOT NULL,
    alert_description TEXT,
    alert_url TEXT,
    
    -- Severity
    severity VARCHAR(20) DEFAULT 'medium', -- low, medium, high, critical
    
    -- Status
    status VARCHAR(50) DEFAULT 'new', -- new, reviewing, investigating, false_positive, confirmed, resolved
    
    -- Investigation
    investigated_by INTEGER, -- staff user_id
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

-- ============================================================================
-- TRIGGERS
-- ============================================================================
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

-- ============================================================================
-- VIEWS FOR REPORTING
-- ============================================================================

-- Active Unauthorized Copies
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

-- Pending Alerts
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

-- Legal Actions Summary
CREATE OR REPLACE VIEW legal_actions_summary AS
SELECT 
    status,
    COUNT(*) as case_count,
    SUM(damages_sought) as total_damages_sought,
    SUM(damages_awarded) as total_damages_awarded,
    SUM(legal_fees) as total_legal_fees
FROM legal_actions
GROUP BY status;

-- ============================================================================
-- COMMENTS
-- ============================================================================
COMMENT ON TABLE unauthorized_access_log IS 'Logs unauthorized copies of the website for legal evidence';
COMMENT ON TABLE alert_notifications IS 'Tracks alerts sent to staff about security issues';
COMMENT ON TABLE dmca_takedown_requests IS 'Tracks DMCA takedown notices sent to hosting providers';
COMMENT ON TABLE legal_actions IS 'Tracks legal actions taken against infringers';
COMMENT ON TABLE monitoring_alerts IS 'Tracks alerts from monitoring services (Google Alerts, Copyscape, etc.)';

-- ============================================================================
-- SAMPLE DATA (for testing)
-- ============================================================================
-- Uncomment to insert sample data for testing

/*
INSERT INTO unauthorized_access_log (domain, url, ip_address, user_agent, detected_at) VALUES
('copycat-site.com', 'https://copycat-site.com/', '192.168.1.100', 'Mozilla/5.0...', NOW()),
('fake-elevate.com', 'https://fake-elevate.com/programs', '10.0.0.50', 'Chrome/120.0...', NOW());

INSERT INTO alert_notifications (alert_type, severity, title, message) VALUES
('unauthorized_copy', 'critical', 'Unauthorized Site Copy Detected', 'Someone has copied your website to copycat-site.com');
*/
