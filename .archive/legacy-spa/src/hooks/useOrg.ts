/**
 * useOrg Hook
 * Manages organization context and switching
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Role } from '../lib/rbac';

interface Org {
  id: string;
  name: string;
  slug: string;
  tier: 'starter' | 'growth' | 'enterprise';
  status: 'active' | 'suspended' | 'cancelled';
  settings: Record<string, any>;
  created_at: string;
}

interface OrgMembership {
  org: Org;
  role: Role;
  status: 'active' | 'invited' | 'suspended';
}

interface OrgState {
  currentOrg: Org | null;
  currentRole: Role | null;
  memberships: OrgMembership[];
  loading: boolean;
}

export function useOrg(userId: string | null) {
  const [state, setState] = useState<OrgState>({
    currentOrg: null,
    currentRole: null,
    memberships: [],
    loading: true,
  });

  useEffect(() => {
    if (!userId) {
      setState({
        currentOrg: null,
        currentRole: null,
        memberships: [],
        loading: false,
      });
      return;
    }

    loadOrganizations(userId);
  }, [userId]);

  async function loadOrganizations(userId: string) {
    try {
      // Get all org memberships for user
      const { data: memberships, error } = await supabase
        .from('org_members')
        .select(
          `
          role,
          status,
          org:orgs (
            id,
            name,
            slug,
            tier,
            status,
            settings,
            created_at
          )
        `
        )
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const orgMemberships: OrgMembership[] = (memberships || []).map(
        (m: any) => ({
          org: m.org,
          role: m.role as Role,
          status: m.status,
        })
      );

      // Get current org from localStorage or use first one
      const storedOrgId = localStorage.getItem('org_id');
      let currentMembership = orgMemberships.find(
        (m) => m.org.id === storedOrgId
      );

      if (!currentMembership && orgMemberships.length > 0) {
        currentMembership = orgMemberships[0];
        localStorage.setItem('org_id', currentMembership.org.id);
      }

      setState({
        currentOrg: currentMembership?.org || null,
        currentRole: currentMembership?.role || null,
        memberships: orgMemberships,
        loading: false,
      });
    } catch (error) {
      setState({
        currentOrg: null,
        currentRole: null,
        memberships: [],
        loading: false,
      });
    }
  }

  /**
   * Switch to a different organization
   */
  async function switchOrg(orgId: string) {
    const membership = state.memberships.find((m) => m.org.id === orgId);
    if (!membership) {
      throw new Error('Not a member of this organization');
    }

    localStorage.setItem('org_id', orgId);
    localStorage.setItem('user_role', membership.role);

    setState((prev) => ({
      ...prev,
      currentOrg: membership.org,
      currentRole: membership.role,
    }));

    // Reload page to refresh all org-scoped data
    window.location.reload();
  }

  /**
   * Create a new organization
   */
  async function createOrg(name: string, slug: string) {
    if (!userId) throw new Error('Not authenticated');

    // Create org
    const { data: org, error: orgError } = await supabase
      .from('orgs')
      .insert({
        name,
        slug,
        tier: 'starter',
        status: 'active',
      })
      .select()
      .single();

    if (orgError) throw orgError;

    // Add user as owner
    const { error: memberError } = await supabase.from('org_members').insert({
      org_id: org.id,
      user_id: userId,
      role: 'owner',
      status: 'active',
    });

    if (memberError) throw memberError;

    // Create default entitlements
    const { error: entError } = await supabase.from('entitlements').insert({
      org_id: org.id,
      max_seats: 5,
      max_courses: 10,
      features: { audit: true, customBranding: false },
    });

    if (entError) throw entError;

    // Reload organizations
    await loadOrganizations(userId);

    // Switch to new org
    await switchOrg(org.id);

    return org;
  }

  /**
   * Get entitlements for current org
   */
  async function getEntitlements() {
    if (!state.currentOrg) return null;

    const { data, error } = await supabase
      .from('entitlements')
      .select('*')
      .eq('org_id', state.currentOrg.id)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  /**
   * Check if feature is enabled for current org
   */
  async function hasFeature(featureKey: string): Promise<boolean> {
    const entitlements = await getEntitlements();
    if (!entitlements) return false;

    return entitlements.features?.[featureKey] === true;
  }

  /**
   * Get usage stats for current org
   */
  async function getUsageStats() {
    if (!state.currentOrg) return null;

    const [members, courses, entitlements] = await Promise.all([
      supabase
        .from('org_members')
        .select('id', { count: 'exact', head: true })
        .eq('org_id', state.currentOrg.id)
        .eq('status', 'active'),
      supabase
        .from('courses')
        .select('id', { count: 'exact', head: true })
        .eq('org_id', state.currentOrg.id),
      getEntitlements(),
    ]);

    return {
      seats: {
        used: members.count || 0,
        max: entitlements?.max_seats || 5,
      },
      courses: {
        used: courses.count || 0,
        max: entitlements?.max_courses || 10,
      },
    };
  }

  return {
    ...state,
    switchOrg,
    createOrg,
    getEntitlements,
    hasFeature,
    getUsageStats,
    reload: () => userId && loadOrganizations(userId),
  };
}
