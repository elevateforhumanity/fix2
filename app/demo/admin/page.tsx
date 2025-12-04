'use client';

import Link from 'next/link';
import { Users, DollarSign, TrendingUp, Settings, BarChart3, Shield } from 'lucide-react';

export default function AdminDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👁️</span>
              <span className="font-semibold">DEMO MODE - Admin Dashboard Preview</span>
            </div>
            <Link href="/demo" className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-semibold">
              Back to Store
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <Users className="w-8 h-8 text-red-600 mb-2" />
            <p className="text-3xl font-bold">1,247</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <DollarSign className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-3xl font-bold">$127K</p>
            <p className="text-sm text-gray-600">Monthly Revenue</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-3xl font-bold">89%</p>
            <p className="text-sm text-gray-600">Platform Uptime</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <BarChart3 className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-3xl font-bold">342</p>
            <p className="text-sm text-gray-600">Active Programs</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Platform Analytics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span>New Enrollments (30d)</span>
                <span className="font-bold text-green-600">+127</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span>Course Completions</span>
                <span className="font-bold text-blue-600">892</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span>Certificates Issued</span>
                <span className="font-bold text-purple-600">456</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">System Health</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Database</span>
                <span className="text-green-600 font-semibold">✓ Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <span>API Services</span>
                <span className="text-green-600 font-semibold">✓ Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Storage</span>
                <span className="text-yellow-600 font-semibold">⚠ 78% Used</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-red-900 mb-2">Admin Dashboard Demo</h3>
          <p className="text-red-700 mb-4">Full platform control, user management, analytics, and system settings</p>
          <div className="flex gap-4 justify-center">
            <Link href="/demo" className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold">View Pricing</Link>
            <Link href="/contact" className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold border-2 border-red-600">Contact Sales</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
