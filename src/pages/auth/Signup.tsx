import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <Helmet>
        <title>Sign Up | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <Section background="white">
        <div className="mx-auto max-w-md">
          <h1 className="section-title text-center">Create Account</h1>
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div>
              <label htmlFor="name" className="label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="input"
              />
            </div>
            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="input"
              />
            </div>
            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="input"
              />
            </div>
            <button type="submit" className="button w-full">
              Create Account
            </button>
          </form>
          <p className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="text-[var(--color-green-600)] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
