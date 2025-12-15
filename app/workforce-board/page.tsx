import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
import { Users, TrendingUp, FileText, Calendar, Award, Briefcase } from 'lucide-react';

export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/workforce-board",
  },
  title: 'Workforce Board Portal | Elevate For Humanity',
  description: 'Workforce development board access for program oversight, reporting, and compliance.',
};

export default async function WorkforceBoardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Require authentication
  if (!user) {
    redirect('/login?next=/workforce-board');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  // Check if user has workforce board access
  const allowedRoles = ['admin', 'super_admin', 'workforce_board', 'staff'];
  if (!profile || !allowedRoles.includes(profile.role)) {
    redirect('/unauthorized');
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean, No Gradient, No Image */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Workforce Board Portal
          </h1>
          <p className="text-base md:text-lg text-slate-300">
            Program oversight, reporting, and workforce development management
          </p>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/workforce-board/dashboard"
              className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Dashboard</h3>
              <p className="text-slate-600">
                View program metrics, enrollment data, and performance indicators
              </p>
            </Link>

            <Link
              href="/workforce-board/reports"
              className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-green-500 hover:shadow-lg transition-all"
            >
              <FileText className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Reports</h3>
              <p className="text-slate-600">
                Access compliance reports, outcomes data, and performance analytics
              </p>
            </Link>

            <Link
              href="/workforce-board/participants"
              className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-purple-500 hover:shadow-lg transition-all"
            >
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Participants</h3>
              <p className="text-slate-600">
                Manage participant records, eligibility, and enrollment status
              </p>
            </Link>

            <Link
              href="/workforce-board/training"
              className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-orange-500 hover:shadow-lg transition-all"
            >
              <Award className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Training Programs</h3>
              <p className="text-slate-600">
                Monitor training programs, completion rates, and credential attainment
              </p>
            </Link>

            <Link
              href="/workforce-board/employment"
              className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-indigo-500 hover:shadow-lg transition-all"
            >
              <Briefcase className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Employment</h3>
              <p className="text-slate-600">
                Track job placements, wages, and employment outcomes
              </p>
            </Link>

            <Link
              href="/workforce-board/follow-ups"
              className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-red-500 hover:shadow-lg transition-all"
            >
              <Calendar className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Follow-Ups</h3>
              <p className="text-slate-600">
                Manage participant follow-ups and retention tracking
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Information */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Workforce Development Oversight</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Program Compliance</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>WIOA Title I compliance and reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Workforce Ready Grant (WRG) oversight</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Performance accountability measures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Eligible Training Provider List (ETPL) compliance</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Performance Metrics</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Employment rate in 2nd quarter after exit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Employment rate in 4th quarter after exit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Median earnings in 2nd quarter after exit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Credential attainment rate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Need Assistance?
          </h2>
          <p className="text-base md:text-lg text-slate-600 mb-8">
            Contact our workforce development team for support with reporting, compliance, or data access
          </p>
          <div className="bg-slate-50 p-6 rounded-lg inline-block">
            <p className="text-slate-700 mb-2">
              <strong>Workforce Development Team</strong>
            </p>
            <p className="text-slate-700 mb-2">
              Phone: <a href="tel:317-314-3757" className="text-blue-600 hover:underline">317-314-3757</a>
            </p>
            <p className="text-slate-700">
              Email: <a href="mailto:workforce@elevateforhumanity.org" className="text-blue-600 hover:underline">workforce@elevateforhumanity.org</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
