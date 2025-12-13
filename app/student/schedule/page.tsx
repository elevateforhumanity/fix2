import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Schedule | Student Portal',
  description: 'View your training schedule and upcoming sessions',
};

export default async function SchedulePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/student/schedule');
  }

  // Get student profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get active enrollment
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select(
      `
      *,
      program:programs(*)
    `
    )
    .eq('student_id', user.id)
    .eq('status', 'active')
    .single();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Schedule</h1>
              <p className="text-slate-600 mt-1">
                {enrollment?.program?.name || 'Your Training Schedule'}
              </p>
            </div>
            <Link
              href="/student/dashboard"
              className="px-4 py-2 text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Schedule Info */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-6">
          <div className="text-center">
            <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Flexible Training Schedule
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Your training is self-paced with flexible scheduling. Complete
              online coursework through Milady RISE anytime, and coordinate
              practical hours with your assigned shop.
            </p>
          </div>
        </div>

        {/* Training Components */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Online Training */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Online Coursework
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  Complete Milady RISE courses on your own schedule, 24/7 access
                </p>
                <Link
                  href="/student/dashboard"
                  className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                >
                  Launch Courses →
                </Link>
              </div>
            </div>
          </div>

          {/* Practical Training */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Shop Training
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  Coordinate with your assigned barbershop for practical hours
                </p>
                <Link
                  href="/student/hours-tracking"
                  className="text-green-600 hover:text-green-700 font-semibold text-sm"
                >
                  Log Hours →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            📅 Getting Started
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  Complete Online Courses
                </p>
                <p className="text-sm text-slate-600">
                  Start with Milady RISE theory courses
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-semibold text-slate-900">Shop Placement</p>
                <p className="text-sm text-slate-600">
                  We'll connect you with a local barbershop
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                3
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  Begin Practical Training
                </p>
                <p className="text-sm text-slate-600">
                  Work in the shop and log your hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-6 text-center">
          <p className="text-slate-600 mb-4">
            Need help with scheduling or have questions?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <User className="w-5 h-5" />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
