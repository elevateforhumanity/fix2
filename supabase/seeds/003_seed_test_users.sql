-- Seed test users (optional - only for development)
-- Note: These are placeholder users. In production, users are created via Supabase Auth

INSERT INTO users (email)
VALUES
  ('admin@elevateforhumanity.org'),
  ('student@example.com'),
  ('instructor@example.com')
ON CONFLICT (email) DO NOTHING;
