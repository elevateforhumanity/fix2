import { Metadata } from 'next';
import SignupForm from './SignupForm';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/signup",
  },
  title: 'Create Account | Elevate For Humanity',
  description: 'Create your account to access training programs, courses, and career development resources.',
};

export default async function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SignupForm />
    </div>
  );
}
