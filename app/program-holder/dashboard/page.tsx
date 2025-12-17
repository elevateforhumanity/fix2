import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';
import { redirect } from 'next/navigation';
import Link from 'next/link';
export const dynamic = 'force-dynamic';

import {
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Program Holder Dashboard | Elevate For Humanity',
  description:
    'Manage your apprentices, track progress, and oversee training programs.',
};

export default async function ProgramHolderDashboard() {
  // Require authorized role
  const { user, profile } = await requireRole(['admin', 'super_admin']);

  const supabase = await createClient();

  // Fetch profile

  // Fetch apprentices/students under this program holder
  const { data: apprentices } = await supabase
    .from('enrollments')
    .select(
      `
      *,
      profiles (id, full_name, email),
      programs (id, title, name, training_hours)
    `
    )
    .order('created_at', { ascending: false })
    .limit(10);

  // Calculate stats
  const totalApprentices = apprentices?.length || 0;
  const activeApprentices =
    apprentices?.filter((e) => e.status === 'active').length || 0;
  const completedApprentices =
    apprentices?.filter((e) => e.status === 'completed').length || 0;

  return (
    <div className="min-h-screen   ">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Program Holder Dashboard
              </h1>
              <p className="text-slate-600 mt-1">
                Welcome back, {profile?.full_name || 'Program Holder'}!
              </p>
            </div>
            <Link
              href="/program-holder/apprentices/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Add Apprentice
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-base md:text-lg font-bold text-slate-900">
                  {totalApprentices}
                </p>
                <p className="text-sm text-slate-600">Total Apprentices</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-base md:text-lg font-bold text-slate-900">
                  {activeApprentices}
                </p>
                <p className="text-sm text-slate-600">Active</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Award className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-base md:text-lg font-bold text-slate-900">
                  {completedApprentices}
                </p>
                <p className="text-sm text-slate-600">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-base md:text-lg font-bold text-slate-900">
                  0
                </p>
                <p className="text-sm text-slate-600">Pending Review</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Apprentices List */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">
                  Recent Apprentices
                </h2>
                <Link
                  href="/program-holder/apprentices"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              {apprentices && apprentices.length > 0 ? (
                <div className="space-y-4">
                  {apprentices.slice(0, 5).map((apprentice: any) => (
                    <div
                      key={apprentice.id}
                      className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {apprentice.profiles?.full_name || 'Unknown'}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {apprentice.programs?.title ||
                              apprentice.programs?.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {apprentice.programs?.training_hours} hours
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              apprentice.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : apprentice.status === 'completed'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {apprentice.status}
                          </span>
                          <p className="text-xs text-slate-500 mt-2">
                            Started{' '}
                            {new Date(
                              apprentice.started_at || apprentice.created_at
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                  <p className="text-slate-600 mb-4">No apprentices yet</p>
                  <Link
                    href="/program-holder/apprentices/new"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Add Your First Apprentice
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/program-holder/apprentices"
                  className="block w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition"
                >
                  <p className="font-medium text-slate-900">
                    Manage Apprentices
                  </p>
                  <p className="text-xs text-slate-600">
                    View and manage all apprentices
                  </p>
                </Link>
                <Link
                  href="/program-holder/programs"
                  className="block w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition"
                >
                  <p className="font-medium text-slate-900">View Programs</p>
                  <p className="text-xs text-slate-600">
                    Browse available programs
                  </p>
                </Link>
                <Link
                  href="/program-holder/settings"
                  className="block w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition"
                >
                  <p className="font-medium text-slate-900">Settings</p>
                  <p className="text-xs text-slate-600">Update your profile</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
