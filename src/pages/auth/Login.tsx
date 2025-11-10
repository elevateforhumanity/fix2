import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <Helmet>
        <title>Login | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <Section background="white">
        <div className="mx-auto max-w-md">
          <h1 className="section-title text-center">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
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
            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="button w-full">
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link
              to="/auth/forgot-password"
              className="text-sm text-[var(--color-green-600)] hover:underline"
            >
              Forgot password?
            </Link>
            <p className="mt-4 text-sm">
              Don't have an account?{' '}
              <Link
                to="/auth/signup"
                className="text-[var(--color-green-600)] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
