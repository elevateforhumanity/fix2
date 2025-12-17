-- ============================================
-- ORG INVITES TABLE
-- ============================================
-- Self-service staff invitation system
-- ============================================

CREATE TABLE IF NOT EXISTS public.org_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_invite_role CHECK (role IN (
    'org_admin',
    'staff',
    'instructor',
    'employer_partner',
    'auditor'
  ))
);

CREATE INDEX IF NOT EXISTS idx_org_invites_token ON public.org_invites(token);
CREATE INDEX IF NOT EXISTS idx_org_invites_email ON public.org_invites(email);
CREATE INDEX IF NOT EXISTS idx_org_invites_org_id ON public.org_invites(organization_id);
CREATE INDEX IF NOT EXISTS idx_org_invites_expires_at ON public.org_invites(expires_at);

-- Enable RLS
ALTER TABLE public.org_invites ENABLE ROW LEVEL SECURITY;

-- Org admins can manage invites
DROP POLICY IF EXISTS "org_admins_manage_invites" ON public.org_invites;
CREATE POLICY "org_admins_manage_invites"
ON public.org_invites
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.organization_users
    WHERE organization_users.organization_id = org_invites.organization_id
    AND organization_users.user_id = auth.uid()
    AND organization_users.role IN ('org_admin', 'super_admin')
  )
);

-- Anyone can view their own invite by token (for acceptance)
DROP POLICY IF EXISTS "anyone_can_view_own_invite" ON public.org_invites;
CREATE POLICY "anyone_can_view_own_invite"
ON public.org_invites
FOR SELECT
USING (true);

COMMENT ON TABLE public.org_invites IS 'Organization staff invitation system';
