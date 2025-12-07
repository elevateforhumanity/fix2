import { Metadata } from 'next';
import ResetPasswordForm from './ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Set New Password | Elevate For Humanity',
  description: 'Create a new password for your account',
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Set New Password</h1>
            <p className="text-xl text-blue-100">Choose a strong password for your account</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <ResetPasswordForm />
          </div>
        </div>
      </section>
    </div>
  );
}
