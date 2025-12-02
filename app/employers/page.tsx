import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Employers | Elevate For Humanity',
  description: 'Learn more about Employers inside the Elevate For Humanity workforce ecosystem.',
};

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Employers | Elevate For Humanity</h1>
            <p className="text-xl mb-8 text-blue-100">Learn more about Employers inside the Elevate For Humanity workforce ecosystem.</p>
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

      {/* Work Experience (WEX) & OJT Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-6">Work Experience (WEX) & On-the-Job Training (OJT)</h2>
            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
              Elevate For Humanity works with workforce boards and employers to create paid work experiences and on-the-job training (OJT) tied to our programs in healthcare, trades, CDL, technology, beauty, and customer service.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-slate-700 leading-relaxed">
                As an approved <strong>ETP</strong>, <strong>WRG</strong>, <strong>JRI provider</strong> and <strong>DOL Registered Apprenticeship sponsor</strong>, we help employers:
              </p>
              <ul className="mt-4 space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Build entry-level talent pipelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Access wage reimbursements and training incentives</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Connect with WEX, internships, and OJT programs through EmployIndy and WorkOne</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Design a Role</h4>
                    <p className="text-slate-700">
                      We help you define a WEX/OJT role that fits your business (e.g., Health & Safety Tech Apprentice, Logistics Assistant, Customer Service Representative, Barber Apprentice).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Match Candidates</h4>
                    <p className="text-slate-700">
                      We match students and jobseekers coming through our programs and workforce partners.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Leverage Funding</h4>
                    <p className="text-slate-700">
                      We coordinate with workforce partners to explore WEX, OJT, apprenticeship, or WRG support where available.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Interested in WEX or OJT?</h3>
              <p className="text-lg mb-6">
                Email us at <a href="mailto:employers@elevateforhumanity.org" className="underline font-semibold">employers@elevateforhumanity.org</a> or call <a href="tel:317-760-7908" className="underline font-semibold">317-760-7908</a> and ask for our Employer Workforce Partnership Packet.
              </p>
              <Link 
                href="/contact" 
                className="inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-all shadow-lg"
              >
                Contact Us Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-12">Employer Services</h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Post Jobs</h3>
              <p className="text-gray-600">Create and manage job postings</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Talent</h3>
              <p className="text-gray-600">Access qualified candidates</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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