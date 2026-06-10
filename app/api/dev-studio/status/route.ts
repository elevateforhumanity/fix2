import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const DEV_STUDIO_ROLES = [
  'admin',
  'super_admin',
  'org_admin',
  'platform_operator',
];

function configured(value: string | undefined) {
  return Boolean(value && value.trim().length > 0);
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        ok: false,
        auth: { ok: false, reason: 'auth_required' },
      },
      { status: 401 }
    );
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, email, full_name')
    .eq('id', user.id)
    .single();

  const role = profile?.role ? String(profile.role) : null;
  const canUseDevStudio = Boolean(role && DEV_STUDIO_ROLES.includes(role));
  const githubTokenConfigured = configured(
    process.env.GITHUB_TOKEN || process.env.GH_TOKEN
  );
  const northflankTokenConfigured = configured(
    process.env.NORTHFLANK_API_TOKEN
  );
  const publicSiteConfigured = configured(
    process.env.NORTHFLANK_PUBLIC_SERVICE_ID
  );
  const adminSiteConfigured = configured(
    process.env.NORTHFLANK_ADMIN_SERVICE_ID
  );
  const lmsSiteConfigured = configured(process.env.NORTHFLANK_LMS_SERVICE_ID);
  const northflankProjectConfigured = configured(
    process.env.NORTHFLANK_PROJECT_ID
  );

  return NextResponse.json({
    ok: canUseDevStudio,
    auth: {
      ok: canUseDevStudio,
      role,
      reason: canUseDevStudio ? null : 'platform_operator',
    },
    integrations: {
      github: {
        ok: githubTokenConfigured,
        required: ['GITHUB_TOKEN'],
      },
      workflows: {
        ok: githubTokenConfigured,
        required: ['GITHUB_TOKEN'],
      },
      deployRelay: {
        ok: githubTokenConfigured,
        required: ['GITHUB_TOKEN'],
        note: 'Dispatches Northflank deploy workflows through GitHub Actions when direct container egress is blocked.',
      },
      northflank: {
        ok: northflankTokenConfigured && northflankProjectConfigured,
        required: ['NORTHFLANK_API_TOKEN', 'NORTHFLANK_PROJECT_ID'],
        services: {
          publicSite: publicSiteConfigured,
          adminDashboard: adminSiteConfigured,
          lms: lmsSiteConfigured,
        },
      },
      preview: {
        ok: githubTokenConfigured,
        required: ['GITHUB_TOKEN'],
      },
    },
  });
}
