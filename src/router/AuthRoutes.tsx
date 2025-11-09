/**
 * Auth Routes
 * Routes for authentication and role-based access
 */

import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { ProtectedRoute, RoleRoute } from '../components/ProtectedRoute';

const AuthCallback = lazy(() => import('../pages/AuthCallback'));
const MyCertificates = lazy(() => import('../pages/MyCertificates'));
const StaffPanel = lazy(() => import('../pages/StaffPanel'));
const Verify = lazy(() => import('../pages/Verify'));
const NotAuthorized = lazy(() => import('../pages/NotAuthorized'));

export function getAuthRoutes() {
  return [
    <Route key="auth-callback" path="/auth/callback" element={<AuthCallback />} />,
    <Route
      key="my-certificates"
      path="/my-certificates"
      element={
        <ProtectedRoute>
          <MyCertificates />
        </ProtectedRoute>
      }
    />,
    <Route
      key="staff-panel"
      path="/staff"
      element={
        <RoleRoute roles={['staff', 'admin']}>
          <StaffPanel />
        </RoleRoute>
      }
    />,
    <Route key="verify" path="/verify/:code" element={<Verify />} />,
    <Route key="not-authorized" path="/not-authorized" element={<NotAuthorized />} />
  ];
}
