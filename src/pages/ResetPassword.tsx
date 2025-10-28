import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validatingToken, setValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  const accessToken = searchParams.get('access_token');
  const type = searchParams.get('type');

  useEffect(() => {
    validateToken();
  }, [accessToken, type]);

  const validateToken = async () => {
    setValidatingToken(true);

    // Check if this is a password recovery link
    if (type === 'recovery' && accessToken) {
      try {
        // Set the session with the recovery token
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: searchParams.get('refresh_token') || '',
        });

        if (error) throw error;

        setTokenValid(true);
      } catch (err: any) {
        console.error('Token validation error:', err);
        setTokenValid(false);
      }
    } else {
      setTokenValid(false);
    }

    setValidatingToken(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setSuccess(true);

      // Sign out and redirect to login
      await supabase.auth.signOut();
      setTimeout(() => navigate('/auth/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (validatingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-surface">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-brand-text-muted">Validating reset link...</p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-surface">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-brand-text mb-2">
            Invalid Reset Link
          </h2>
          <p className="text-brand-text-muted mb-6">
            This password reset link is invalid or has expired.
          </p>
          <button
            onClick={() => navigate('/auth/forgot-password')}
            className="btn"
          >
            Request New Link
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-surface">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-green-500 text-4xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-brand-text mb-2">
            Password Reset Successful
          </h2>
          <p className="text-brand-text-muted">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-surface">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-info/10 rounded-full mb-4">
            <Lock className="h-8 w-8 text-brand-info" />
          </div>
          <h2 className="text-2xl font-bold text-brand-text">
            Reset Your Password
          </h2>
          <p className="text-brand-text-muted mt-2">
            Enter your new password below
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-brand-text mb-2">
              New Password
            </label>
            <input
              type="password"
              aria-label="password input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-info focus:border-transparent"
              placeholder="Enter new password"
              required
              minLength={8}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-text mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              aria-label="password input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-info focus:border-transparent"
              placeholder="Confirm new password"
              required
              minLength={8}
            />
          </div>
          <button type="submit" disabled={loading} className="w-full btn">
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
