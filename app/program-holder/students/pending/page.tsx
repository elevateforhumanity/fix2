import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, AlertCircle, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pending Applications | Program Holder Portal',
  description: 'Review pending student applications',
};

export default async function PendingStudentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'program_holder') redirect('/');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                Feature Coming Soon
              </h3>
              <p className="text-yellow-800 mb-4">
                The pending applications interface is under development. Contact
                support to review and accept student applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:program-holders@elevateforhumanity.org"
                  className="inline-flex items-center text-yellow-900 hover:text-yellow-700 font-medium"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  program-holders@elevateforhumanity.org
                </a>
                <a
                  href="tel:317-314-3757"
                  className="inline-flex items-center text-yellow-900 hover:text-yellow-700 font-medium"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  317-314-3757
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Pending Applications
              </h1>
              <p className="text-slate-600">
                Review and accept student enrollment requests
              </p>
            </div>
            <UserPlus className="h-12 w-12 text-brand-orange-600" />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/program-holder/students"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Back to Students
            </Link>
            <Link
              href="/program-holder/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-lg border-2 border-slate-300 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
