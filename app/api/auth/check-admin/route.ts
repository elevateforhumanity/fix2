import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const ADMIN_ROLES = [
  'admin',
  'super_admin',
  'org_admin',
  'platform_operator',
] as const;
const PLATFORM_OPERATOR_ROLES = [
  'admin',
  'super_admin',
  'org_admin',
  'platform_operator',
] as const;

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      {
        isAdmin: false,
        isPlatformOperator: false,
        reason: 'auth_required',
      },
      { status: 401 }
    );
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, active, verified, onboarding_completed')
    .eq('id', user.id)
    .single();

  if (profileError || !profile?.role) {
    return NextResponse.json(
      {
        isAdmin: false,
        isPlatformOperator: false,
        reason: 'profile_not_found',
      },
      { status: 403 }
    );
  }

  const role = String(profile.role);
  const isAdmin = ADMIN_ROLES.includes(role as (typeof ADMIN_ROLES)[number]);
  const isPlatformOperator = PLATFORM_OPERATOR_ROLES.includes(
    role as (typeof PLATFORM_OPERATOR_ROLES)[number]
  );

  return NextResponse.json({
    isAdmin,
    isPlatformOperator,
    role,
    reason: isPlatformOperator ? null : 'platform_operator',
  });
}
