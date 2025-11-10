import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function handleCallback() {
      if (!supabase) {
        navigate('/login');
        return;
      }

      try {
        // Supabase automatically handles the token exchange
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        // Get the returnTo parameter or default to student portal
        const returnTo = searchParams.get('returnTo') || '/student-portal';
        
        if (data.session) {
          navigate(returnTo, { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      } catch (error) {
        navigate('/login', { replace: true });
      }
    }

    handleCallback();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-base">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
        <p className="text-lg text-text-secondary">Completing sign in...</p>
      </div>
    </div>
  );
}
