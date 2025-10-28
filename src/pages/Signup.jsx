import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      alert('Check your email for the confirmation link!');
      navigate('/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-surface py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-text">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <input
              type="text" aria-label="text input"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-brand-border-dark placeholder-gray-500 text-brand-text rounded-md focus:outline-none focus:ring-brand-focus focus:border-indigo-500 sm:text-sm"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="email" aria-label="email input"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-brand-border-dark placeholder-gray-500 text-brand-text rounded-md focus:outline-none focus:ring-brand-focus focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password" aria-label="password input"
              required
              minLength={6}
              className="appearance-none relative block w-full px-3 py-2 border border-brand-border-dark placeholder-gray-500 text-brand-text rounded-md focus:outline-none focus:ring-brand-focus focus:border-indigo-500 sm:text-sm"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-info hover:bg-brand-info-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-focus disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
          <div className="text-center">
            <Link to="/login" className="text-brand-info hover:text-indigo-500">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
