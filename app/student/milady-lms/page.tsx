import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ExternalLink,
  BookOpen,
  Award,
  Clock,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Milady RISE Courses | Elevate For Humanity',
  description: 'Access your Milady RISE certification courses',
};

export default async function MiladyLmsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/student/milady-lms');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get student's enrollment
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('*, program:programs(*)')
    .eq('student_id', user.id)
    .eq('status', 'active')
    .single();

  // Milady RISE courses available
  const miladyCourses = [
    {
      id: 'rise-wellbeing',
      title: 'RISE Client Well-Being & Safety',
      description:
        'Human Trafficking Awareness, Domestic Abuse Awareness, and Practical Infection Control',
      duration: '3.5 hours',
      price: '$29.95',
      url: 'https://www.miladytraining.com/bundles/client-well-being-safety-certification',
      certificate: 'RISE Certification',
      required: true,
    },
    {
      id: 'rise-finance',
      title: 'RISE Finance Fundamentals',
      description:
        'Profit & Loss 101, Understanding Cash Flow, Increase Top Line Sales, How to Raise Prices',
      duration: '4 hours',
      price: '$99.95',
      url: 'https://www.miladytraining.com/bundles/rise-certification-finance-fundamentals',
      certificate: 'RISE Finance Certification',
      required: false,
    },
    {
      id: 'rise-educator',
      title: 'RISE Educator Program',
      description:
        'Instructor-led blended learning with self-paced content and live Q&A sessions',
      duration: '6 months',
      price: '$599.99',
      url: 'https://www.miladytraining.com/courses/rise-educator-program',
      certificate: 'RISE Educator Certification',
      required: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link
            href="/student/dashboard"
            className="text-brand-blue-600 hover:text-brand-blue-700 font-semibold mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">
            Milady RISE Courses
          </h1>
          <p className="text-slate-600 mt-1">
            Professional development and certification courses
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <BookOpen className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                Welcome to Milady RISE
              </h2>
              <p className="text-blue-800 text-sm">
                RISE (Reimagine, Inspire, Succeed, Elevate) courses provide
                industry-recognized certifications to enhance your professional
                skills. All courses are 100% online and self-paced.
              </p>
            </div>
          </div>
        </div>

        {/* Login Info */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Your Milady Account
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-slate-600 mb-1">Login URL:</p>
              <a
                href="https://login.cengagebrain.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue-600 hover:text-brand-blue-700 font-semibold flex items-center gap-2"
              >
                https://login.cengagebrain.com
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Your Email:</p>
              <p className="font-semibold text-slate-900">{profile?.email}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Support:</p>
              <a
                href="https://www.milady.com/support"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue-600 hover:text-brand-blue-700 font-semibold"
              >
                Milady Support Center
              </a>
            </div>
          </div>
        </div>

        {/* Available Courses */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Available Courses
          </h2>

          {miladyCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        {course.title}
                      </h3>
                      {course.required && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-semibold">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 mb-4">{course.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>{course.certificate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right ml-6">
                    <div className="text-2xl font-bold text-slate-900 mb-2">
                      {course.price}
                    </div>
                    <p className="text-xs text-brand-green-600 font-semibold">
                      100% Funded
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700 transition-colors font-semibold"
                  >
                    <span>Launch Course</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.milady.com/support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
                  >
                    Get Help
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-slate-100 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            How to Access Your Courses
          </h3>
          <ol className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-brand-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              <span>Click "Launch Course" on any course above</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-brand-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              <span>
                Log in with your email: <strong>{profile?.email}</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-brand-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              <span>Complete the course at your own pace</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-brand-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </span>
              <span>Download your certificate upon completion</span>
            </li>
          </ol>
        </div>

        {/* Support */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Need Help?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">
                Milady Support
              </h4>
              <p className="text-sm text-slate-600 mb-2">
                For course content and technical issues
              </p>
              <a
                href="https://www.milady.com/support"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue-600 hover:text-brand-blue-700 font-semibold text-sm"
              >
                Visit Milady Support →
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">
                Elevate for Humanity
              </h4>
              <p className="text-sm text-slate-600 mb-2">
                For enrollment and program questions
              </p>
              <a
                href="mailto:support@elevateforhumanity.org"
                className="text-brand-blue-600 hover:text-brand-blue-700 font-semibold text-sm"
              >
                support@elevateforhumanity.org
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
