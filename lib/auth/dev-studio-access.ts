import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const DEV_STUDIO_ROLES = [
  'admin',
  'super_admin',
  'org_admin',
  'platform_operator',
] as const;

export async function requireDevStudioAccess() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Authentication required', reason: 'auth_required' },
      { status: 401 }
    );
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const role = profile?.role ? String(profile.role) : null;

  if (
    !role ||
    !DEV_STUDIO_ROLES.includes(role as (typeof DEV_STUDIO_ROLES)[number])
  ) {
    return NextResponse.json(
      {
        error: 'Platform operator access required',
        reason: 'platform_operator',
        role,
      },
      { status: 403 }
    );
  }

  return null;
}
