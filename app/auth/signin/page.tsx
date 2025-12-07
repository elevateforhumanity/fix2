import { Metadata } from 'next';
import SignInForm from './SignInForm';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/auth/signin",
  },
  title: 'Sign In | Elevate For Humanity',
  description: 'Sign in to access your courses, track progress, and continue your workforce training journey.',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Elevate For Humanity" width={48} height={48} />
            <div>
              <div className="font-bold text-slate-900 text-lg">Elevate For Humanity</div>
              <div className="text-xs text-slate-600">Career & Technical Institute</div>
            </div>
          </Link>
        </div>

        <SignInForm />

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">Why Sign In?</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Access Your Courses</h3>
                <p className="text-sm text-slate-600">Watch lessons, complete assignments, and track your progress</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Earn Certificates</h3>
                <p className="text-sm text-slate-600">Complete programs and download indusstart-recognized certificates</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Track Progress</h3>
                <p className="text-sm text-slate-600">Monitor your learning journey and celebrate milestones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
