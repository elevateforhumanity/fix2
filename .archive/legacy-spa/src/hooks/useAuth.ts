/**
 * useAuth Hook
 * Manages authentication state and user session
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { Role } from '../lib/rbac';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: Role | null;
  orgId: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    role: null,
    orgId: null,
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserRole(session.user.id).then((roleData) => {
          setState({
            user: session.user,
            session,
            loading: false,
            role: roleData.role,
            orgId: roleData.orgId,
          });
        });
      } else {
        setState({
          user: null,
          session: null,
          loading: false,
          role: null,
          orgId: null,
        });
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const roleData = await loadUserRole(session.user.id);
        setState({
          user: session.user,
          session,
          loading: false,
          role: roleData.role,
          orgId: roleData.orgId,
        });
      } else {
        setState({
          user: null,
          session: null,
          loading: false,
          role: null,
          orgId: null,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return state;
}

/**
 * Load user's role and org from org_members table
 */
async function loadUserRole(
  userId: string
): Promise<{ role: Role | null; orgId: string | null }> {
  try {
    // Get user's primary org membership (first one)
    const { data, error } = await supabase
      .from('org_members')
      .select('org_id, role')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return { role: null, orgId: null };
    }

    // Store in localStorage for quick access
    localStorage.setItem('org_id', data.org_id);
    localStorage.setItem('user_role', data.role);

    return {
      role: data.role as Role,
      orgId: data.org_id,
    };
  } catch (error) {
    return { role: null, orgId: null };
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

/**
 * Sign up with email and password
 */
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

/**
 * Sign out
 */
export async function signOut() {
  localStorage.removeItem('org_id');
  localStorage.removeItem('user_role');
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Reset password
 */
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) throw error;
}

/**
 * Update password
 */
export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
}
