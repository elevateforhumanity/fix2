-- xAPI statements for SCORM/xAPI tracking
CREATE TABLE IF NOT EXISTS xapi_statements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor jsonb NOT NULL,
  verb jsonb NOT NULL,
  object jsonb NOT NULL,
  context jsonb,
  result jsonb,
  timestamp timestamptz,
  stored_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_xapi_actor ON xapi_statements((actor->>'mbox'));
CREATE INDEX IF NOT EXISTS idx_xapi_verb ON xapi_statements((verb->>'id'));
CREATE INDEX IF NOT EXISTS idx_xapi_stored ON xapi_statements(stored_at DESC);

-- Tenant resource quotas
ALTER TABLE tenants
ADD COLUMN IF NOT EXISTS max_active_learners integer DEFAULT 100,
ADD COLUMN IF NOT EXISTS max_courses integer DEFAULT 20,
ADD COLUMN IF NOT EXISTS max_storage_gb integer DEFAULT 50;
