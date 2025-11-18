-- System Events for Security Center
-- Migration: 20251118_system_events

CREATE TABLE IF NOT EXISTS system_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('db_backup', 'security_scan', 'penetration_test', 'deployment', 'incident')),
  status text NOT NULL DEFAULT 'success' CHECK (status IN ('success', 'failure', 'in_progress')),
  details jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_system_events_type ON system_events(type);
CREATE INDEX IF NOT EXISTS idx_system_events_created_at ON system_events(created_at DESC);
