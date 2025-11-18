import { createClient } from '@/lib/supabase/server';

/**
 * RBAC Helper - Role-Based Access Control
 * 
 * Enforces role-based permissions at the API layer
 * 
 * Roles:
 * - admin: Full system access
 * - hr_admin: HR and payroll management
 * - marketing_admin: Marketing campaigns and contacts
 * - manager: Team management
 * - provider_admin: Program holder admin
 * - delegate: Case management
 * - student: Student portal access
 */

export async function requireRole(roles: string[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('UNAUTHENTICATED');
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, role, full_name, email')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    throw new Error('PROFILE_NOT_FOUND');
  }

  if (!roles.includes(profile.role)) {
    throw new Error('FORBIDDEN');
  }

  return { user, profile };
}

/**
 * Check if user has any of the specified roles
 */
export async function hasRole(roles: string[]): Promise<boolean> {
  try {
    await requireRole(roles);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get current user's role
 */
export async function getCurrentRole(): Promise<string | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    return profile?.role || null;
  } catch {
    return null;
  }
}

/**
 * Middleware-style error handler for RBAC
 */
export function handleRBACError(error: Error) {
  if (error.message === 'UNAUTHENTICATED') {
    return { error: 'Unauthenticated', status: 401 };
  }
  if (error.message === 'FORBIDDEN') {
    return { error: 'Forbidden - insufficient permissions', status: 403 };
  }
  if (error.message === 'PROFILE_NOT_FOUND') {
    return { error: 'User profile not found', status: 404 };
  }
  return { error: error.message || 'Internal server error', status: 500 };
}

/**
 * Role hierarchy - higher roles include permissions of lower roles
 */
const ROLE_HIERARCHY: Record<string, number> = {
  admin: 100,
  hr_admin: 80,
  marketing_admin: 80,
  manager: 60,
  provider_admin: 50,
  delegate: 40,
  student: 20,
};

/**
 * Check if user's role is at least the specified level
 */
export async function requireRoleLevel(minRole: string): Promise<{ user: any; profile: any }> {
  const { user, profile } = await requireRole(Object.keys(ROLE_HIERARCHY));
  
  const userLevel = ROLE_HIERARCHY[profile.role] || 0;
  const requiredLevel = ROLE_HIERARCHY[minRole] || 0;

  if (userLevel < requiredLevel) {
    throw new Error('FORBIDDEN');
  }

  return { user, profile };
}
