import Link from 'next/link';

export default function LMSPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-200">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Learning Management System
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-2xl">
            Access your courses, track your progress, and earn certifications.
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/lms/courses"
            className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              My Courses
            </h3>
            <p className="text-gray-600">
              View and access your enrolled courses
            </p>
          </Link>

          <Link
            href="/lms/dashboard"
            className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Dashboard
            </h3>
            <p className="text-gray-600">
              Track your progress and achievements
            </p>
          </Link>

          <Link
            href="/certificates"
            className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Certificates
            </h3>
            <p className="text-gray-600">
              View and download your certificates
            </p>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            LMS Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                📹 Video Lessons
              </h3>
              <p className="text-gray-600">
                High-quality video content from industry experts
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                ✅ Quizzes & Assessments
              </h3>
              <p className="text-gray-600">
                Test your knowledge and track your progress
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                📱 Mobile Access
              </h3>
              <p className="text-gray-600">
                Learn anywhere, anytime on any device
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                🎓 Certifications
              </h3>
              <p className="text-gray-600">
                Earn industry-recognized certifications
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Not Enrolled Yet?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Explore our programs and start your learning journey today.
        </p>
        <Link
          href="/programs"
          className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          View Programs
        </Link>
      </section>
    </div>
  );
}
