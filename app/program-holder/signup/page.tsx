import { Metadata } from 'next';
import Link from 'next/link';
import ProgramHolderSignupForm from './SignupForm';

export const metadata: Metadata = {
  title: 'Program Holder Signup | Elevate for Humanity',
  description:
    'Create your program holder account to manage students, submit reports, and track compliance.',
};

export default function ProgramHolderSignupPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold text-black">
          Create Program Holder Account
        </h1>
        <p className="mt-2 text-gray-600">
          Sign up to manage your training program, track students, submit
          compliance reports, and access program holder resources.
        </p>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-black">What you get</h2>
          <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-2">
            <li>Student management and enrollment tracking</li>
            <li>Compliance reporting and monitoring</li>
            <li>Document upload and verification</li>
            <li>Direct support from compliance advisors</li>
          </ul>
        </div>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <ProgramHolderSignupForm />
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
          <Link href="/login" className="underline hover:text-brand-blue-600">
            Already have an account? Log in
          </Link>
          <Link href="/privacy" className="underline hover:text-brand-blue-600">
            Privacy Policy
          </Link>
        </div>
      </main>
    </div>
  );
}
