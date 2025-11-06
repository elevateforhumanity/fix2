import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reset password for:', email);
    alert('Password reset link sent to ' + email);
  };

  return (
    <div>
      <Helmet>
        <title>Forgot Password | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <Section background="white">
        <div className="mx-auto max-w-md">
          <h1 className="section-title text-center">Reset Password</h1>
          <p className="text-center mt-4 mb-8">
            Enter your email and we'll send you a reset link.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
                placeholder="your.email@example.com"
              />
            </div>
            <button type="submit" className="button w-full">
              Send Reset Link
            </button>
          </form>
          <p className="mt-6 text-center text-sm">
            <Link
              to="/auth/login"
              className="text-[var(--color-green-600)] hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
