/**
 * Login Page
 * Handles user authentication with redirect to intended destination
 */

import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const { loginWithMagicLink } = useAuth();
  
  // Get the page they were trying to access, default to student portal
  const from = location.state?.from?.pathname || '/student-portal';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await loginWithMagicLink(email, from);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-base">
      <Helmet>
        <title>Sign In | Elevate for Humanity</title>
        <meta name="description" content="Sign in to access your student portal, courses, and certificates." />
      </Helmet>

      <Navigation />

      <main id="main-content" className="flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="heading-1 mb-2">Welcome Back</h1>
            <p className="body-large text-text-secondary">
              Sign in to access your student portal
            </p>
          </div>

          <div className="card card-spacious">
            {success ? (
              <div className="text-center py-8">
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                  Check your email! We've sent you a magic link to sign in.
                </div>
                <p className="text-sm text-text-secondary">
                  Click the link in your email to complete sign in. You can close this page.
                </p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleLogin}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-xs text-text-secondary mt-2">
                    We'll send you a magic link to sign in - no password needed!
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full text-lg"
                >
                  {loading ? 'Sending magic link...' : 'Send Magic Link'}
                </button>

                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-text-secondary">
                    Don't have an account?{' '}
                    <Link to="/apply" className="text-brand hover:text-brand-primary-hover font-medium">
                      Create Account
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </div>

          <p className="text-center text-sm text-text-secondary mt-6">
            Need help? <Link to="/contact" className="text-brand hover:text-brand-primary-hover">Contact Support</Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
