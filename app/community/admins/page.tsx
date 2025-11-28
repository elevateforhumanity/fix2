import Link from 'next/link';

export const metadata = {
  title: 'Admin Community | Elevate for Humanity',
  description: 'Connect with other administrators, share best practices, and access admin resources.',
};

export default function CommunityAdminsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/community" className="text-blue-100 hover:text-white mb-4 inline-block">
            ← Back to Community Hub
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">Admin Community</h1>
          <p className="text-xl text-blue-50">
            Connect with fellow administrators, share insights, and collaborate on best practices.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Discussion Forums</h3>
              <p className="text-gray-600 mb-4">
                Join conversations about student management, program administration, and compliance.
              </p>
              <Link href="/community" className="text-blue-600 hover:underline font-semibold">
                View Forums →
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Resource Library</h3>
              <p className="text-gray-600 mb-4">
                Access templates, guides, and documentation for effective program administration.
              </p>
              <Link href="/docs/admins" className="text-green-600 hover:underline font-semibold">
                Browse Resources →
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Events & Webinars</h3>
              <p className="text-gray-600 mb-4">
                Attend training sessions, workshops, and networking events for administrators.
              </p>
              <Link href="/webinars" className="text-purple-600 hover:underline font-semibold">
                View Events →
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Discussions</h2>
            <div className="space-y-4">
              {[
                { title: 'Best practices for student enrollment tracking', replies: 12, author: 'Admin Team' },
                { title: 'WIOA compliance documentation tips', replies: 8, author: 'Compliance Officer' },
                { title: 'Managing multiple program cohorts', replies: 15, author: 'Program Director' },
              ].map((discussion, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{discussion.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{discussion.replies} replies</span>
                    <span>•</span>
                    <span>Posted by {discussion.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link 
              href="/admin/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Go to Admin Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
