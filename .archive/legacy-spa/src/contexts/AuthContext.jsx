import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function boot() {
      if (!supabase) {
        setReady(true);
        return;
      }

      const { data } = await supabase.auth.getSession();
      const u = data.session?.user ?? null;
      setUser(u);

      // Prefer DB role if table exists; fallback to metadata
      if (u) {
        const { data: r } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', u.id)
          .maybeSingle();
        setRole(r?.role || u.user_metadata?.role || 'student');
      } else {
        setRole(null);
      }
      setReady(true);
    }
    boot();

    if (!supabase) return;

    const { data: sub } = supabase.auth.onAuthStateChange(
      async (_e, session) => {
        const u = session?.user ?? null;
        setUser(u);
        if (!u) {
          setRole(null);
        } else {
          const { data: r } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', u.id)
            .maybeSingle();
          setRole(r?.role || u.user_metadata?.role || 'student');
        }
      }
    );

    return () => sub.subscription.unsubscribe();
  }, []);

  const loginWithMagicLink = async (email, returnTo = '/student-portal') => {
    if (!supabase) throw new Error('Supabase not initialized');
    const emailRedirectTo = `${window.location.origin}/auth/callback?returnTo=${encodeURIComponent(returnTo)}`;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo },
    });
    if (error) throw error;
  };

  const logout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  const value = useMemo(
    () => ({ user, role, ready, loginWithMagicLink, logout }),
    [user, role, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
