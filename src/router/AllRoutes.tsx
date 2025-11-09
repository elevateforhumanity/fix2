/**
 * All Routes
 * Comprehensive routing including admin, auth, and public routes
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AdminRoutes from './AdminRoutes';
import { ProtectedRoute, RoleRoute } from '../components/ProtectedRoute';

const AuthCallback = lazy(() => import('../pages/AuthCallback'));
const MyCertificates = lazy(() => import('../pages/MyCertificates'));
const StaffPanel = lazy(() => import('../pages/StaffPanel'));
const Verify = lazy(() => import('../pages/Verify'));
const NotAuthorized = lazy(() => import('../pages/NotAuthorized'));

const Fallback = () => (
  <div className="min-h-screen grid place-items-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

export default function AllRoutes() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/my-certificates"
          element={
            <ProtectedRoute>
              <MyCertificates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <RoleRoute roles={['staff', 'admin']}>
              <StaffPanel />
            </RoleRoute>
          }
        />
        <Route path="/verify/:code" element={<Verify />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        {/* Public Routes */}
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </Suspense>
  );
}
