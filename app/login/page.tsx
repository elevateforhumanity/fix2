import { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Login | Elevate For Humanity',
  description: 'Sign in to access your courses and training programs',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-xl text-blue-100">Sign in to continue your learning journey</p>
          </div>
        </div>
      </section>

      {/* Login Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <LoginForm />
          </div>
        </div>
      </section>
    </div>
  );
}