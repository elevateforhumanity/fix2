-- Certification Autopilot System - Database Schema
-- Supabase PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id VARCHAR(50) UNIQUE NOT NULL,
    org_name VARCHAR(255) NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_profiles_org_id ON profiles(org_id);
CREATE INDEX idx_profiles_data ON profiles USING GIN(data);

-- ============================================
-- PROFILE HISTORY (Versioned Snapshots)
-- ============================================
CREATE TABLE profile_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    data JSONB NOT NULL,
    changed_by UUID REFERENCES auth.users(id),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    change_summary TEXT,
    diff JSONB
);

CREATE INDEX idx_profile_history_profile_id ON profile_history(profile_id);
CREATE INDEX idx_profile_history_changed_at ON profile_history(changed_at DESC);

-- ============================================
-- PACKETS TABLE
-- ============================================
CREATE TABLE packets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    packet_number VARCHAR(50) UNIQUE NOT NULL,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    certification_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    priority VARCHAR(20) DEFAULT 'normal',
    deadline DATE,
    data JSONB NOT NULL DEFAULT '{}',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id),
    approved_by UUID REFERENCES auth.users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    submitted_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_packets_profile_id ON packets(profile_id);
CREATE INDEX idx_packets_status ON packets(status);
CREATE INDEX idx_packets_certification_type ON packets(certification_type);
CREATE INDEX idx_packets_created_at ON packets(created_at DESC);

-- Status constraint
ALTER TABLE packets ADD CONSTRAINT chk_packet_status 
CHECK (status IN ('draft', 'needs_info', 'ready_for_review', 'rejected', 'approved', 'needs_revision', 'submitted', 'failed', 'completed'));

-- Priority constraint
ALTER TABLE packets ADD CONSTRAINT chk_packet_priority 
CHECK (priority IN ('low', 'normal', 'high', 'urgent'));

-- ============================================
-- PACKET FIELDS TABLE
-- ============================================
CREATE TABLE packet_fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    packet_id UUID REFERENCES packets(id) ON DELETE CASCADE,
    field_key VARCHAR(255) NOT NULL,
    field_value TEXT,
    field_type VARCHAR(50) DEFAULT 'text',
    is_required BOOLEAN DEFAULT FALSE,
    is_placeholder BOOLEAN DEFAULT FALSE,
    validation_rules JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_packet_fields_packet_id ON packet_fields(packet_id);
CREATE INDEX idx_packet_fields_key ON packet_fields(field_key);
CREATE INDEX idx_packet_fields_placeholder ON packet_fields(is_placeholder) WHERE is_placeholder = TRUE;

-- Unique constraint: one field per packet
ALTER TABLE packet_fields ADD CONSTRAINT uq_packet_field 
UNIQUE (packet_id, field_key);

-- ============================================
-- ATTACHMENTS TABLE
-- ============================================
CREATE TABLE attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    packet_id UUID REFERENCES packets(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100),
    file_size BIGINT,
    storage_path TEXT NOT NULL,
    storage_url TEXT,
    is_encrypted BOOLEAN DEFAULT TRUE,
    uploaded_by UUID REFERENCES auth.users(id),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB
);

CREATE INDEX idx_attachments_packet_id ON attachments(packet_id);
CREATE INDEX idx_attachments_uploaded_at ON attachments(uploaded_at DESC);

-- ============================================
-- AUDIT LOGS TABLE (Immutable)
-- ============================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_number VARCHAR(50) UNIQUE NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    action VARCHAR(100) NOT NULL,
    actor_id UUID REFERENCES auth.users(id),
    actor_email VARCHAR(255),
    actor_role VARCHAR(50),
    before_data JSONB,
    after_data JSONB,
    diff JSONB,
    ip_address INET,
    user_agent TEXT,
    session_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);

-- Prevent updates and deletes on audit logs
CREATE RULE audit_logs_no_update AS ON UPDATE TO audit_logs DO INSTEAD NOTHING;
CREATE RULE audit_logs_no_delete AS ON DELETE TO audit_logs DO INSTEAD NOTHING;

-- ============================================
-- USERS TABLE (extends Supabase auth.users)
-- ============================================
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) NOT NULL DEFAULT 'worker',
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB
);

CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_user_profiles_active ON user_profiles(is_active) WHERE is_active = TRUE;

-- Role constraint
ALTER TABLE user_profiles ADD CONSTRAINT chk_user_role 
CHECK (role IN ('admin', 'worker', 'reviewer', 'auditor'));

-- ============================================
-- ROLES & PERMISSIONS TABLE
-- ============================================
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    permissions JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed default roles
INSERT INTO roles (name, description, permissions) VALUES
('admin', 'Full system access', '["*"]'),
('worker', 'Edit packets and upload documents', '["packets:read", "packets:edit", "packets:create", "attachments:upload"]'),
('reviewer', 'Review and approve packets', '["packets:read", "packets:approve", "packets:submit"]'),
('auditor', 'Read-only access to logs', '["audit:read", "packets:read"]');

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- ============================================
-- SUBMISSION LOGS TABLE
-- ============================================
CREATE TABLE submission_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    packet_id UUID REFERENCES packets(id) ON DELETE CASCADE,
    portal_name VARCHAR(100) NOT NULL,
    submission_method VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    confirmation_number VARCHAR(255),
    response_data JSONB,
    error_message TEXT,
    submitted_by UUID REFERENCES auth.users(id),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    retry_count INTEGER DEFAULT 0
);

CREATE INDEX idx_submission_logs_packet_id ON submission_logs(packet_id);
CREATE INDEX idx_submission_logs_status ON submission_logs(status);
CREATE INDEX idx_submission_logs_submitted_at ON submission_logs(submitted_at DESC);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packets_updated_at BEFORE UPDATE ON packets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packet_fields_updated_at BEFORE UPDATE ON packet_fields
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create audit log entry
CREATE OR REPLACE FUNCTION create_audit_log(
    p_entity_type VARCHAR,
    p_entity_id UUID,
    p_action VARCHAR,
    p_actor_id UUID,
    p_before_data JSONB,
    p_after_data JSONB
) RETURNS UUID AS $$
DECLARE
    v_audit_id UUID;
    v_audit_number VARCHAR;
    v_actor_email VARCHAR;
    v_actor_role VARCHAR;
BEGIN
    -- Generate audit number
    v_audit_number := 'AUDIT_' || TO_CHAR(NOW(), 'YYYYMMDD') || '_' || LPAD(NEXTVAL('audit_seq')::TEXT, 6, '0');
    
    -- Get actor details
    SELECT email, role INTO v_actor_email, v_actor_role
    FROM user_profiles WHERE id = p_actor_id;
    
    -- Insert audit log
    INSERT INTO audit_logs (
        audit_number,
        entity_type,
        entity_id,
        action,
        actor_id,
        actor_email,
        actor_role,
        before_data,
        after_data,
        diff
    ) VALUES (
        v_audit_number,
        p_entity_type,
        p_entity_id,
        p_action,
        p_actor_id,
        v_actor_email,
        v_actor_role,
        p_before_data,
        p_after_data,
        jsonb_diff(p_before_data, p_after_data)
    ) RETURNING id INTO v_audit_id;
    
    RETURN v_audit_id;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for audit numbers
CREATE SEQUENCE IF NOT EXISTS audit_seq START 1;

-- Function to calculate JSON diff (simplified)
CREATE OR REPLACE FUNCTION jsonb_diff(old_data JSONB, new_data JSONB)
RETURNS JSONB AS $$
DECLARE
    result JSONB := '{}';
    key TEXT;
BEGIN
    -- Find changed keys
    FOR key IN SELECT jsonb_object_keys(new_data)
    LOOP
        IF old_data->key IS DISTINCT FROM new_data->key THEN
            result := result || jsonb_build_object(
                key, jsonb_build_object(
                    'old', old_data->key,
                    'new', new_data->key
                )
            );
        END IF;
    END LOOP;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE packets ENABLE ROW LEVEL SECURITY;
ALTER TABLE packet_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view profiles" ON profiles
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update profiles" ON profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policies for packets
CREATE POLICY "Users can view packets" ON packets
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Workers can create packets" ON packets
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role IN ('admin', 'worker')
        )
    );

CREATE POLICY "Workers can update draft packets" ON packets
    FOR UPDATE USING (
        status = 'draft' AND
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role IN ('admin', 'worker')
        )
    );

CREATE POLICY "Reviewers can approve packets" ON packets
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role IN ('admin', 'reviewer')
        )
    );

-- Policies for audit logs (read-only for auditors)
CREATE POLICY "Auditors can view audit logs" ON audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role IN ('admin', 'auditor')
        )
    );

-- ============================================
-- VIEWS
-- ============================================

-- View for packet summary
CREATE VIEW packet_summary AS
SELECT 
    p.id,
    p.packet_number,
    p.certification_type,
    p.status,
    p.priority,
    p.deadline,
    p.created_at,
    p.updated_at,
    prof.org_name,
    creator.full_name AS created_by_name,
    updater.full_name AS updated_by_name,
    approver.full_name AS approved_by_name,
    COUNT(DISTINCT pf.id) AS total_fields,
    COUNT(DISTINCT CASE WHEN pf.is_placeholder THEN pf.id END) AS placeholder_fields,
    COUNT(DISTINCT a.id) AS attachment_count
FROM packets p
LEFT JOIN profiles prof ON p.profile_id = prof.id
LEFT JOIN user_profiles creator ON p.created_by = creator.id
LEFT JOIN user_profiles updater ON p.updated_by = updater.id
LEFT JOIN user_profiles approver ON p.approved_by = approver.id
LEFT JOIN packet_fields pf ON p.id = pf.packet_id
LEFT JOIN attachments a ON p.id = a.packet_id
GROUP BY p.id, prof.org_name, creator.full_name, updater.full_name, approver.full_name;

-- View for audit trail
CREATE VIEW audit_trail AS
SELECT 
    al.id,
    al.audit_number,
    al.entity_type,
    al.entity_id,
    al.action,
    al.actor_email,
    al.actor_role,
    al.created_at,
    up.full_name AS actor_name,
    CASE 
        WHEN al.entity_type = 'packet' THEN p.packet_number
        WHEN al.entity_type = 'profile' THEN prof.org_name
        ELSE NULL
    END AS entity_name
FROM audit_logs al
LEFT JOIN user_profiles up ON al.actor_id = up.id
LEFT JOIN packets p ON al.entity_type = 'packet' AND al.entity_id = p.id
LEFT JOIN profiles prof ON al.entity_type = 'profile' AND al.entity_id = prof.id
ORDER BY al.created_at DESC;

-- ============================================
-- GRANTS
-- ============================================

-- Grant access to authenticated users
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT INSERT, UPDATE ON packets, packet_fields, attachments TO authenticated;
GRANT INSERT ON audit_logs TO authenticated;

-- Grant access to service role (for backend)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE profiles IS 'Master business profiles with canonical data';
COMMENT ON TABLE profile_history IS 'Versioned snapshots of profile changes';
COMMENT ON TABLE packets IS 'Certification application packets';
COMMENT ON TABLE packet_fields IS 'Individual fields within packets';
COMMENT ON TABLE attachments IS 'Uploaded documents for packets';
COMMENT ON TABLE audit_logs IS 'Immutable audit trail of all changes';
COMMENT ON TABLE user_profiles IS 'Extended user information and roles';
COMMENT ON TABLE roles IS 'RBAC role definitions';
COMMENT ON TABLE notifications IS 'User notifications';
COMMENT ON TABLE submission_logs IS 'Portal submission tracking';

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Additional indexes for common queries
CREATE INDEX idx_packets_status_priority ON packets(status, priority);
CREATE INDEX idx_packets_deadline ON packets(deadline) WHERE deadline IS NOT NULL;
CREATE INDEX idx_audit_logs_entity_created ON audit_logs(entity_type, entity_id, created_at DESC);
CREATE INDEX idx_packet_fields_required ON packet_fields(packet_id, is_required) WHERE is_required = TRUE;

-- ============================================
-- COMPLETE
-- ============================================

-- Schema version
CREATE TABLE schema_version (
    version VARCHAR(20) PRIMARY KEY,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO schema_version (version) VALUES ('1.0.0');

COMMENT ON TABLE schema_version IS 'Track database schema version';
