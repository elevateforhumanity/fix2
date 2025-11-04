import React from 'react';
/**
 * All Routes
 * Comprehensive routing including admin and public routes
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AdminRoutes from './AdminRoutes';

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
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        {/* Public Routes */}
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </Suspense>
  );
}
