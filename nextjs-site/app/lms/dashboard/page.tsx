import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Link href="/lms" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to LMS
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Welcome back! Here's your learning progress.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-blue-600">3</div>
            <div className="text-gray-600 mt-2">Active Courses</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-green-600">75%</div>
            <div className="text-gray-600 mt-2">Overall Progress</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-orange-600">24</div>
            <div className="text-gray-600 mt-2">Hours Completed</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-purple-600">2</div>
            <div className="text-gray-600 mt-2">Certificates Earned</div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Continue Learning */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Continue Learning
            </h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Barber Fundamentals
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Lesson 9 of 12</span>
                  <Link
                    href="/lms/courses/1"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Continue →
                  </Link>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Advanced Techniques
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Not started</span>
                  <Link
                    href="/lms/courses/3"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Start →
                  </Link>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Achievements
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl">🏆</div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Course Completed
                  </h3>
                  <p className="text-sm text-gray-600">
                    Safety & Sanitation - 2 days ago
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-3xl">⭐</div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Perfect Score
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quiz: Sanitation Basics - 5 days ago
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-3xl">🎯</div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Milestone Reached
                  </h3>
                  <p className="text-sm text-gray-600">
                    50% Program Completion - 1 week ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/lms/courses"
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center"
          >
            <div className="text-3xl mb-2">📚</div>
            <div className="font-semibold text-gray-900">View All Courses</div>
          </Link>

          <Link
            href="/certificates"
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center"
          >
            <div className="text-3xl mb-2">🎓</div>
            <div className="font-semibold text-gray-900">My Certificates</div>
          </Link>

          <Link
            href="/profile"
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center"
          >
            <div className="text-3xl mb-2">👤</div>
            <div className="font-semibold text-gray-900">Edit Profile</div>
          </Link>
        </div>
      </section>
    </div>
  );
}
