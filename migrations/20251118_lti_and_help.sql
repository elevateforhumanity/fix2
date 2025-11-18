-- LTI 1.3 Platform registrations
CREATE TABLE IF NOT EXISTS lti_platforms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  issuer text NOT NULL,
  client_id text NOT NULL,
  auth_login_url text NOT NULL,
  auth_token_url text NOT NULL,
  key_set_url text NOT NULL,
  audience text NOT NULL,
  name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (issuer, client_id)
);

CREATE TABLE IF NOT EXISTS lti_deployments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id uuid NOT NULL REFERENCES lti_platforms(id) ON DELETE CASCADE,
  deployment_id text NOT NULL,
  tenant_id uuid NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (platform_id, deployment_id)
);

-- Help Center articles
CREATE TABLE IF NOT EXISTS help_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  audience text NOT NULL, -- student | instructor | admin
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Add LTI fields to users and courses if not exists
ALTER TABLE users ADD COLUMN IF NOT EXISTS lti_subject text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS lti_context_id text;
CREATE INDEX IF NOT EXISTS idx_courses_lti_context ON courses(lti_context_id);
