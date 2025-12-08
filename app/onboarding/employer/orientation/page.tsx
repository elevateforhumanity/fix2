import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/onboarding/employer/orientation",
  },
  title: 'Orientation | Elevate For Humanity',
  description: 'Discover more about Orientation inside the Elevate For Humanity workforce ecosystem.',
};

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Orientation | Elevate For Humanity</h1>
            <p className="text-xl mb-8 text-blue-100">Discover more about Orientation inside the Elevate For Humanity workforce ecosystem.</p>
            <div className="flex gap-4 justify-center">
              <Link href="/employer/jobs/new" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 text-lg">
                Post a Job
              </Link>
              <Link href="/employer/candidates" className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 border-2 border-white text-lg">
                Find Candidates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Post Jobs</h3>
              <p className="text-gray-600">Create and manage job postings</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Talent</h3>
              <p className="text-gray-600">Access qualified candidates</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Hire Fast</h3>
              <p className="text-gray-600">Streamlined hiring process</p>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}