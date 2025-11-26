import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Calendar | Student Portal',
  description: 'View your schedule and upcoming events',
  openGraph: {
    images: ["/images/students-new/student-29.jpg"],
    type: "website",
  }};

export default function StudentCalendarPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/student/dashboard"
            className="text-red-600 hover:underline mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Calendar className="h-8 w-8 text-red-600" />
            My Calendar
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                November 2025
              </h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50">
                  ←
                </button>
                <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50">
                  Today
                </button>
                <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50">
                  →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-semibold text-slate-600 py-2"
                >
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => (
                <div
                  key={i}
                  className="aspect-square border border-slate-200 rounded p-2 hover:bg-slate-50 cursor-pointer"
                >
                  <div className="text-sm text-slate-700">{(i % 30) + 1}</div>
                  {i === 18 && (
                    <div className="text-xs bg-red-100 text-red-800 rounded px-1 mt-1">
                      Assignment Due
                    </div>
                  )}
                  {i === 22 && (
                    <div className="text-xs bg-blue-100 text-blue-800 rounded px-1 mt-1">
                      Class
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Upcoming Events
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-red-600 pl-3">
                <div className="font-medium text-slate-900">
                  HVAC Assignment Due
                </div>
                <div className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  Nov 19, 11:59 PM
                </div>
              </div>

              <div className="border-l-4 border-brandPrimary pl-3">
                <div className="font-medium text-slate-900">Live Class</div>
                <div className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  Nov 22, 2:00 PM
                </div>
              </div>

              <div className="border-l-4 border-green-600 pl-3">
                <div className="font-medium text-slate-900">Quiz Available</div>
                <div className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  Nov 25, 9:00 AM
                </div>
              </div>
            </div>

            <Link
              href="/lms/assignments"
              className="block mt-6 text-center px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              View All Assignments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
