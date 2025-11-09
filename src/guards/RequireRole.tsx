/**
 * RequireRole Guard Component
 * Protects routes based on user role
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { Role } from '../lib/rbac';
import type { ReactElement } from 'react';

interface RequireRoleProps {
  allow: Role[];
  children: ReactElement;
  redirectTo?: string;
}

export default function RequireRole({
  allow,
  children,
  redirectTo = '/login',
}: RequireRoleProps) {
  const { loading, session, role } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!session) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // No role assigned - show error
  if (!role) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center max-w-md p-8">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have access to any organization. Please contact your
            administrator.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  // Role not allowed - show forbidden
  if (!allow.includes(role)) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center max-w-md p-8">
          <h1 className="text-2xl font-bold mb-4">Access Forbidden</h1>
          <p className="text-gray-600 mb-2">
            Your role (<strong>{role}</strong>) does not have permission to
            access this page.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Required roles: {allow.join(', ')}
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  // All checks passed - render children
  return children;
}
