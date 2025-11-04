/**
 * RBAC - Role-Based Access Control
 * Defines permissions for each role in the system
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

export type Role = 'owner' | 'admin' | 'instructor' | 'staff' | 'student';

export interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
}

/**
 * Permission matrix - defines what each role can do
 */
const PERMISSIONS: Record<Role, Permission[]> = {
  owner: [
    // Owners can do everything
    { resource: '*', action: 'manage' },
  ],
  admin: [
    // Admins can manage most things except billing
    { resource: 'users', action: 'manage' },
    { resource: 'courses', action: 'manage' },
    { resource: 'enrollments', action: 'manage' },
    { resource: 'analytics', action: 'read' },
    { resource: 'audit', action: 'read' },
    { resource: 'settings', action: 'update' },
    { resource: 'integrations', action: 'manage' },
    { resource: 'communities', action: 'manage' },
    { resource: 'assessments', action: 'manage' },
  ],
  instructor: [
    // Instructors can manage courses and students
    { resource: 'courses', action: 'create' },
    { resource: 'courses', action: 'read' },
    { resource: 'courses', action: 'update' },
    { resource: 'enrollments', action: 'read' },
    { resource: 'enrollments', action: 'create' },
    { resource: 'assessments', action: 'manage' },
    { resource: 'analytics', action: 'read' },
    { resource: 'communities', action: 'read' },
  ],
  staff: [
    // Staff can view and assist
    { resource: 'courses', action: 'read' },
    { resource: 'enrollments', action: 'read' },
    { resource: 'users', action: 'read' },
    { resource: 'analytics', action: 'read' },
    { resource: 'communities', action: 'read' },
  ],
  student: [
    // Students can only access their own content
    { resource: 'courses', action: 'read' },
    { resource: 'enrollments', action: 'read' },
    { resource: 'communities', action: 'read' },
  ],
};

/**
 * Check if a role has permission for a specific action
 */
export function hasPermission(
  role: Role,
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete' | 'manage'
): boolean {
  const rolePermissions = PERMISSIONS[role];

  // Check for wildcard permission (owner)
  if (
    rolePermissions.some((p) => p.resource === '*' && p.action === 'manage')
  ) {
    return true;
  }

  // Check for specific resource permission
  return rolePermissions.some((p) => {
    if (p.resource !== resource) return false;
    if (p.action === 'manage') return true;
    return p.action === action;
  });
}

/**
 * Convenience functions for common permission checks
 */
export const can = {
  // User management
  manageUsers: (role: Role) => hasPermission(role, 'users', 'manage'),
  inviteUsers: (role: Role) => hasPermission(role, 'users', 'create'),
  viewUsers: (role: Role) => hasPermission(role, 'users', 'read'),
  editUsers: (role: Role) => hasPermission(role, 'users', 'update'),
  deleteUsers: (role: Role) => hasPermission(role, 'users', 'delete'),

  // Course management
  manageCourses: (role: Role) => hasPermission(role, 'courses', 'manage'),
  createCourses: (role: Role) => hasPermission(role, 'courses', 'create'),
  viewCourses: (role: Role) => hasPermission(role, 'courses', 'read'),
  editCourses: (role: Role) => hasPermission(role, 'courses', 'update'),
  deleteCourses: (role: Role) => hasPermission(role, 'courses', 'delete'),

  // Enrollment management
  manageEnrollments: (role: Role) =>
    hasPermission(role, 'enrollments', 'manage'),
  createEnrollments: (role: Role) =>
    hasPermission(role, 'enrollments', 'create'),
  viewEnrollments: (role: Role) => hasPermission(role, 'enrollments', 'read'),

  // Billing (owner only)
  viewBilling: (role: Role) => role === 'owner',
  manageBilling: (role: Role) => role === 'owner',

  // Audit logs (owner + admin)
  viewAudit: (role: Role) => ['owner', 'admin'].includes(role),

  // Analytics
  viewAnalytics: (role: Role) => hasPermission(role, 'analytics', 'read'),

  // Settings
  manageSettings: (role: Role) => hasPermission(role, 'settings', 'manage'),
  editSettings: (role: Role) => hasPermission(role, 'settings', 'update'),

  // Integrations
  manageIntegrations: (role: Role) =>
    hasPermission(role, 'integrations', 'manage'),

  // Communities
  manageCommunities: (role: Role) =>
    hasPermission(role, 'communities', 'manage'),
  viewCommunities: (role: Role) => hasPermission(role, 'communities', 'read'),

  // Assessments
  manageAssessments: (role: Role) =>
    hasPermission(role, 'assessments', 'manage'),
  viewAssessments: (role: Role) => hasPermission(role, 'assessments', 'read'),
};

/**
 * Get human-readable role name
 */
export function getRoleName(role: Role): string {
  const names: Record<Role, string> = {
    owner: 'Owner',
    admin: 'Administrator',
    instructor: 'Instructor',
    staff: 'Staff',
    student: 'Student',
  };
  return names[role];
}

/**
 * Get role description
 */
export function getRoleDescription(role: Role): string {
  const descriptions: Record<Role, string> = {
    owner:
      'Full access to all features including billing and organization settings',
    admin: 'Manage users, courses, and most platform features',
    instructor: 'Create and manage courses, view student progress',
    staff: 'View-only access to courses and student information',
    student: 'Access enrolled courses and learning materials',
  };
  return descriptions[role];
}

/**
 * Get all available roles
 */
export function getAllRoles(): Role[] {
  return ['owner', 'admin', 'instructor', 'staff', 'student'];
}

/**
 * Check if role can assign another role
 */
export function canAssignRole(assignerRole: Role, targetRole: Role): boolean {
  // Only owners can assign owner role
  if (targetRole === 'owner') {
    return assignerRole === 'owner';
  }

  // Owners and admins can assign other roles
  return ['owner', 'admin'].includes(assignerRole);
}

/**
 * Get role hierarchy level (higher = more permissions)
 */
export function getRoleLevel(role: Role): number {
  const levels: Record<Role, number> = {
    owner: 5,
    admin: 4,
    instructor: 3,
    staff: 2,
    student: 1,
  };
  return levels[role];
}

/**
 * Check if one role is higher than another
 */
export function isRoleHigher(role1: Role, role2: Role): boolean {
  return getRoleLevel(role1) > getRoleLevel(role2);
}
