import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, CheckCircle, FileText, AlertCircle } from 'lucide-react';
import { HandbookAcknowledgeButton } from '@/components/student/HandbookAcknowledgeButton';

export const metadata: Metadata = {
  title: 'Student Handbook | Elevate For Humanity',
  description: 'Indiana Barber Apprenticeship Program Handbook',
};

export default async function StudentHandbookPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/student/handbook');
  }

  // Get onboarding status
  const { data: onboarding } = await supabase
    .from('student_onboarding')
    .select('handbook_reviewed, handbook_reviewed_at')
    .eq('student_id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-brand-blue-600" />
            <h1 className="text-3xl font-bold text-slate-900">
              Student Handbook
            </h1>
          </div>
          <p className="text-lg text-slate-600">
            Indiana Barber Apprenticeship Program
          </p>
          {onboarding?.handbook_reviewed && (
            <div className="mt-4 flex items-center gap-2 text-brand-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-semibold">
                Reviewed on{' '}
                {new Date(
                  onboarding.handbook_reviewed_at!
                ).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 space-y-8">
          {/* Welcome */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Welcome to Your Apprenticeship
            </h2>
            <p className="text-slate-700 leading-relaxed">
              This handbook outlines the policies, procedures, and expectations
              for your Indiana Barber Apprenticeship through Elevate for
              Humanity. As a DOL Registered Apprenticeship program, we follow
              strict compliance standards to ensure your success.
            </p>
          </section>

          {/* Program Overview */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-brand-blue-600" />
              Program Overview
            </h2>
            <div className="space-y-4 text-slate-700">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Duration</h3>
                <p>2,000 hours total (300 classroom + 1,700 on-the-job)</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Funding</h3>
                <p>
                  WIOA-funded through WorkOne. Students pay $0 for tuition,
                  materials, and instruction.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Curriculum</h3>
                <p>
                  Milady RISE online coursework (classroom hours) + supervised
                  on-the-job training at assigned barbershop.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Certification</h3>
                <p>
                  Upon completion, you are eligible to sit for the Indiana State
                  Board Barber Exam.
                </p>
              </div>
            </div>
          </section>

          {/* Student Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Student Responsibilities
            </h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-brand-green-600 mt-0.5 flex-shrink-0" />
                <span>Complete all Milady RISE coursework on schedule</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-brand-green-600 mt-0.5 flex-shrink-0" />
                <span>Log all on-the-job training hours accurately</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-brand-green-600 mt-0.5 flex-shrink-0" />
                <span>Maintain professional conduct at your assigned shop</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-brand-green-600 mt-0.5 flex-shrink-0" />
                <span>
                  Communicate with your AI instructor and program coordinator
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-brand-green-600 mt-0.5 flex-shrink-0" />
                <span>Follow all Indiana State Board regulations</span>
              </li>
            </ul>
          </section>

          {/* Attendance Policy */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Attendance Policy
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              You must complete all 2,000 required hours to be eligible for
              certification. Hours are tracked through:
            </p>
            <ul className="space-y-2 text-slate-700 ml-6">
              <li>• Milady RISE platform (classroom hours)</li>
              <li>• Manual hour logging (on-the-job hours)</li>
              <li>• Employer verification (shop supervisor approval)</li>
            </ul>
          </section>

          {/* Code of Conduct */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Code of Conduct
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-brand-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-slate-700">
                  <p className="font-semibold text-slate-900 mb-2">
                    Professional Standards
                  </p>
                  <p>
                    As an apprentice, you represent Elevate for Humanity and
                    your assigned barbershop. Maintain professionalism,
                    punctuality, and respect at all times. Violations may result
                    in program dismissal.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Support Resources */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Support Resources
            </h2>
            <div className="space-y-2 text-slate-700">
              <p>
                <strong>AI Instructor:</strong> Available 24/7 through your
                dashboard chat
              </p>
              <p>
                <strong>Program Coordinator:</strong>{' '}
                elevate4humanityedu@gmail.com
              </p>
              <p>
                <strong>Technical Support:</strong> Available through dashboard
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          {!onboarding?.handbook_reviewed && (
            <section className="border-t border-slate-200 pt-8">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Acknowledgment Required
                </h3>
                <p className="text-slate-700 mb-4">
                  By clicking "I Acknowledge," you confirm that you have read
                  and understand the policies outlined in this handbook.
                </p>
                <HandbookAcknowledgeButton userId={user.id} />
              </div>
            </section>
          )}
        </div>

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <Link
            href="/student/dashboard"
            className="inline-flex items-center gap-2 text-brand-blue-600 hover:text-brand-blue-700 font-semibold"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
