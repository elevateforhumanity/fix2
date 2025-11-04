import React from 'react';
/**
 * Admin Billing Page
 * View subscription, plan, and entitlements
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useOrg } from '../../hooks/useOrg';

interface BillingSubscription {
  org_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  plan: string;
  status: string;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  seats: number;
  metadata: Record<string, any>;
}

interface Entitlements {
  org_id: string;
  max_seats: number;
  max_courses: number;
  features: Record<string, any>;
  source: string;
  updated_at: string;
}

export default function Billing() {
  const { user } = useAuth();
  const { currentOrg, getUsageStats } = useOrg(user?.id || null);
  const [billing, setBilling] = useState<BillingSubscription | null>(null);
  const [entitlements, setEntitlements] = useState<Entitlements | null>(null);
  const [usage, setUsage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentOrg) {
      loadBillingData();
    }
  }, [currentOrg]);

  async function loadBillingData() {
    if (!currentOrg) return;

    try {
      setLoading(true);

      // Load billing subscription
      const { data: billingData, error: billingError } = await supabase
        .from('billing_subscriptions')
        .select('*')
        .eq('org_id', currentOrg.id)
        .maybeSingle();

      if (billingError && billingError.code !== 'PGRST116') {
        throw billingError;
      }

      setBilling(billingData);

      // Load entitlements
      const { data: entData, error: entError } = await supabase
        .from('entitlements')
        .select('*')
        .eq('org_id', currentOrg.id)
        .maybeSingle();

      if (entError && entError.code !== 'PGRST116') {
        throw entError;
      }

      setEntitlements(entData);

      // Load usage stats
      const usageData = await getUsageStats();
      setUsage(usageData);
    } catch (error) {
      console.error('Failed to load billing data:', error);
      alert('Failed to load billing data');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  const planDetails = {
    starter: {
      name: 'Starter',
      price: '$49/month',
      features: [
        '5 team members',
        '10 courses',
        'Basic analytics',
        'Email support',
      ],
    },
    growth: {
      name: 'Growth',
      price: '$199/month',
      features: [
        '50 team members',
        '100 courses',
        'Advanced analytics',
        'White-label branding',
        'Mobile apps',
        'Priority support',
      ],
    },
    enterprise: {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Unlimited team members',
        'Unlimited courses',
        'All features',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantee',
      ],
    },
  };

  const currentPlan = billing?.plan || 'starter';
  const plan = planDetails[currentPlan as keyof typeof planDetails];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Billing & Subscription
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your subscription and view usage
        </p>
      </div>
      {/* Current Plan */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Current Plan
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {plan.name}
              </span>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  billing?.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : billing?.status === 'trialing'
                      ? 'bg-blue-100 text-blue-800'
                      : billing?.status === 'past_due'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                }`}
              >
                {billing?.status || 'active'}
              </span>
            </div>
            <p className="text-gray-600 mt-2">{plan.price}</p>
          </div>
          <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
            Upgrade Plan
          </button>
        </div>
        {/* Plan Features */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Plan Features
          </h3>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center text-sm text-gray-700"
              >
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        {/* Billing Period */}
        {billing?.current_period_end && (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Current billing period</span>
              <span className="font-medium text-gray-900">
                {billing.current_period_start &&
                  new Date(
                    billing.current_period_start
                  ).toLocaleDateString()}{' '}
                - {new Date(billing.current_period_end).toLocaleDateString()}
              </span>
            </div>
            {billing.cancel_at_period_end && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Your subscription will be cancelled at the end of the current
                  billing period.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Usage & Limits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seats Usage */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Team Members
          </h3>
          {usage && (
            <>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  {usage.seats.used}
                </span>
                <span className="text-gray-600">
                  of {usage.seats.max} seats
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className={`h-2 rounded-full ${
                    usage.seats.used >= usage.seats.max
                      ? 'bg-red-500'
                      : usage.seats.used >= usage.seats.max * 0.8
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                  }`}
                  style={{
                    width: `${Math.min(
                      (usage.seats.used / usage.seats.max) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
              {usage.seats.used >= usage.seats.max && (
                <p className="text-sm text-red-600">
                  You've reached your seat limit. Upgrade to add more team
                  members.
                </p>
              )}
            </>
          )}
        </div>
        {/* Courses Usage */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Courses</h3>
          {usage && (
            <>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  {usage.courses.used}
                </span>
                <span className="text-gray-600">
                  of {usage.courses.max} courses
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className={`h-2 rounded-full ${
                    usage.courses.used >= usage.courses.max
                      ? 'bg-red-500'
                      : usage.courses.used >= usage.courses.max * 0.8
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                  }`}
                  style={{
                    width: `${Math.min(
                      (usage.courses.used / usage.courses.max) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
              {usage.courses.used >= usage.courses.max && (
                <p className="text-sm text-red-600">
                  You've reached your course limit. Upgrade to create more
                  courses.
                </p>
              )}
            </>
          )}
        </div>
      </div>
      {/* Feature Entitlements */}
      {entitlements && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Feature Access
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(entitlements.features).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                {value ? (
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Last updated: {new Date(entitlements.updated_at).toLocaleString()}
          </p>
        </div>
      )}
      {/* Billing Details */}
      {billing && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Billing Details
          </h3>
          <dl className="space-y-3">
            <div className="flex justify-between text-sm">
              <dt className="text-gray-600">Stripe Customer ID</dt>
              <dd className="font-mono text-gray-900">
                {billing.stripe_customer_id}
              </dd>
            </div>
            {billing.stripe_subscription_id && (
              <div className="flex justify-between text-sm">
                <dt className="text-gray-600">Subscription ID</dt>
                <dd className="font-mono text-gray-900">
                  {billing.stripe_subscription_id}
                </dd>
              </div>
            )}
            {billing.stripe_price_id && (
              <div className="flex justify-between text-sm">
                <dt className="text-gray-600">Price ID</dt>
                <dd className="font-mono text-gray-900">
                  {billing.stripe_price_id}
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}
      {/* Actions */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Manage Subscription
        </h3>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
            Update Payment Method
          </button>
          <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            View Invoices
          </button>
          <button className="px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
}
