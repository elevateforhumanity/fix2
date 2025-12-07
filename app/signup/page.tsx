import { Metadata } from 'next';
import SignupForm from './SignupForm';

export const metadata: Metadata = {
  title: 'Sign Up | Elevate For Humanity',
  description: 'Create your account to start your workforce training journey',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Start Your Journey</h1>
            <p className="text-xl text-blue-100">Create your account to access free training programs</p>
          </div>
        </div>
      </section>

      {/* Signup Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <SignupForm />
          </div>
        </div>
      </section>
    </div>
  );
}