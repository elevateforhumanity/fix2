-- Per-tenant compliance flags
ALTER TABLE tenants
ADD COLUMN IF NOT EXISTS compliance_wioa boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS compliance_ferpa boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS compliance_hipaa boolean NOT NULL DEFAULT false;

-- Account export events for audit trail
CREATE TABLE IF NOT EXISTS account_export_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  email text NOT NULL,
  exported_at timestamptz NOT NULL DEFAULT now(),
  format text NOT NULL DEFAULT 'json'
);

CREATE INDEX IF NOT EXISTS idx_export_events_user ON account_export_events(user_id);
CREATE INDEX IF NOT EXISTS idx_export_events_exported ON account_export_events(exported_at DESC);
