/**
 * Admin Routes
 * Routing configuration for admin section
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../admin/AdminLayout';

// Lazy load admin pages
const Launchpad = lazy(() => import('../admin/routes/Launchpad'));
const Dashboard = lazy(() => import('../admin/routes/Dashboard'));
const Users = lazy(() => import('../admin/routes/Users'));
const Courses = lazy(() => import('../admin/routes/Courses'));
const Community = lazy(() => import('../admin/routes/Community'));
const Marketing = lazy(() => import('../admin/routes/Marketing'));
const Assessments = lazy(() => import('../admin/routes/Assessments'));
const Analytics = lazy(() => import('../admin/routes/Analytics'));
const Integrations = lazy(() => import('../admin/routes/Integrations'));
const Billing = lazy(() => import('../admin/routes/Billing'));
const Audit = lazy(() => import('../admin/routes/Audit'));

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Launchpad />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="courses" element={<Courses />} />
        <Route
          path="enrollments"
          element={<Navigate to="/admin/courses" replace />}
        />
        <Route path="community" element={<Community />} />
        <Route path="marketing" element={<Marketing />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="billing" element={<Billing />} />
        <Route path="audit" element={<Audit />} />
        <Route
          path="orgs"
          element={<Navigate to="/admin/dashboard" replace />}
        />
      </Route>
    </Routes>
  );
}
