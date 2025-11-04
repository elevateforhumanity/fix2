/**
 * Feature Flags System
 * Control feature access based on entitlements
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { supabase } from './supabase';

export type FeatureKey =
  | 'audit'
  | 'customBranding'
  | 'sso'
  | 'aiWebsiteBuilder'
  | 'aiCourseCreator'
  | 'mobileApps'
  | 'advancedAnalytics'
  | 'whiteLabel'
  | 'prioritySupport'
  | 'community'
  | 'marketing'
  | 'assessments'
  | 'integrations';

interface Entitlements {
  max_seats: number;
  max_courses: number;
  features: Record<string, boolean>;
}

/**
 * Check if a feature is enabled for an organization
 */
export async function hasFeature(
  orgId: string,
  featureKey: FeatureKey
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('entitlements')
      .select('features')
      .eq('org_id', orgId)
      .maybeSingle();

    if (error || !data) {
      console.error('Failed to fetch entitlements:', error);
      return false;
    }

    return data.features?.[featureKey] === true;
  } catch (error) {
    console.error('Error checking feature flag:', error);
    return false;
  }
}

/**
 * Get all entitlements for an organization
 */
export async function getEntitlements(
  orgId: string
): Promise<Entitlements | null> {
  try {
    const { data, error } = await supabase
      .from('entitlements')
      .select('*')
      .eq('org_id', orgId)
      .maybeSingle();

    if (error) {
      console.error('Failed to fetch entitlements:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching entitlements:', error);
    return null;
  }
}

/**
 * Check if organization has reached a limit
 */
export async function hasReachedLimit(
  orgId: string,
  limitType: 'seats' | 'courses'
): Promise<boolean> {
  try {
    const entitlements = await getEntitlements(orgId);
    if (!entitlements) return true;

    const maxLimit =
      limitType === 'seats' ? entitlements.max_seats : entitlements.max_courses;

    // -1 means unlimited
    if (maxLimit === -1) return false;

    // Count current usage
    const table = limitType === 'seats' ? 'org_members' : 'courses';
    const { count, error } = await supabase
      .from(table)
      .select('id', { count: 'exact', head: true })
      .eq('org_id', orgId);

    if (error) {
      console.error(`Failed to count ${limitType}:`, error);
      return true;
    }

    return (count || 0) >= maxLimit;
  } catch (error) {
    console.error('Error checking limit:', error);
    return true;
  }
}

/**
 * Get usage stats for an organization
 */
export async function getUsageStats(orgId: string) {
  try {
    const entitlements = await getEntitlements(orgId);
    if (!entitlements) return null;

    const [seatsCount, coursesCount] = await Promise.all([
      supabase
        .from('org_members')
        .select('id', { count: 'exact', head: true })
        .eq('org_id', orgId)
        .eq('status', 'active'),
      supabase
        .from('courses')
        .select('id', { count: 'exact', head: true })
        .eq('org_id', orgId),
    ]);

    return {
      seats: {
        used: seatsCount.count || 0,
        max: entitlements.max_seats,
        percentage:
          entitlements.max_seats === -1
            ? 0
            : ((seatsCount.count || 0) / entitlements.max_seats) * 100,
      },
      courses: {
        used: coursesCount.count || 0,
        max: entitlements.max_courses,
        percentage:
          entitlements.max_courses === -1
            ? 0
            : ((coursesCount.count || 0) / entitlements.max_courses) * 100,
      },
    };
  } catch (error) {
    console.error('Error fetching usage stats:', error);
    return null;
  }
}

/**
 * Feature flag descriptions
 */
export const FEATURE_DESCRIPTIONS: Record<FeatureKey, string> = {
  audit: 'Complete audit trail of all actions',
  customBranding: 'Custom colors, logos, and branding',
  sso: 'Single Sign-On (SSO) integration',
  aiWebsiteBuilder: 'AI-powered website generation',
  aiCourseCreator: 'AI-powered course creation',
  mobileApps: 'Native iOS and Android apps',
  advancedAnalytics: 'Advanced analytics and reporting',
  whiteLabel: 'White-label multi-tenant solution',
  prioritySupport: '24/7 priority support',
  community: 'Forums, badges, and leaderboards',
  marketing: 'Marketing automation and campaigns',
  assessments: 'Advanced assessment engine',
  integrations: 'Third-party integrations hub',
};

/**
 * Plan-based feature sets
 */
export const PLAN_FEATURES: Record<string, FeatureKey[]> = {
  starter: ['audit', 'community', 'assessments'],
  growth: [
    'audit',
    'customBranding',
    'aiWebsiteBuilder',
    'aiCourseCreator',
    'mobileApps',
    'advancedAnalytics',
    'community',
    'marketing',
    'assessments',
    'integrations',
  ],
  enterprise: [
    'audit',
    'customBranding',
    'sso',
    'aiWebsiteBuilder',
    'aiCourseCreator',
    'mobileApps',
    'advancedAnalytics',
    'whiteLabel',
    'prioritySupport',
    'community',
    'marketing',
    'assessments',
    'integrations',
  ],
};

/**
 * React hook for feature flags
 */
export function useFeatureFlags(orgId: string | null) {
  const [entitlements, setEntitlements] = React.useState<Entitlements | null>(
    null
  );
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!orgId) {
      setLoading(false);
      return;
    }

    getEntitlements(orgId).then((data) => {
      setEntitlements(data);
      setLoading(false);
    });
  }, [orgId]);

  const hasFeatureFlag = (featureKey: FeatureKey): boolean => {
    return entitlements?.features?.[featureKey] === true;
  };

  return {
    entitlements,
    loading,
    hasFeature: hasFeatureFlag,
  };
}

// Import React for the hook
import React from 'react';
