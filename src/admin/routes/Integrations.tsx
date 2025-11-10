/**
 * Admin Integrations Page
 * Manage third-party integrations, webhooks, and API connections
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useOrg } from '../../hooks/useOrg';

interface Integration {
  id: string;
  name: string;
  provider: string;
  config: any;
  enabled: boolean;
  created_at: string;
}

interface Webhook {
  id: string;
  url: string;
  events: string[];
  secret: string;
  enabled: boolean;
  created_at: string;
}

interface APIKey {
  id: string;
  name: string;
  key_prefix: string;
  permissions: string[];
  last_used: string | null;
  created_at: string;
}

export default function Integrations() {
  const { user } = useAuth();
  const { currentOrg } = useOrg(user?.id || null);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [apiKeys, setAPIKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'integrations' | 'webhooks' | 'api'
  >('integrations');

  // Webhook form
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookEvents, setWebhookEvents] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);

  // Available integrations
  const availableIntegrations = [
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Payment processing',
      icon: '💳',
    },
    {
      id: 'sendgrid',
      name: 'SendGrid',
      description: 'Email delivery',
      icon: '📧',
    },
    { id: 'zoom', name: 'Zoom', description: 'Video conferencing', icon: '📹' },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team communication',
      icon: '💬',
    },
    {
      id: 'google',
      name: 'Google Workspace',
      description: 'SSO and calendar',
      icon: '🔐',
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'CRM integration',
      icon: '☁️',
    },
  ];

  const availableEvents = [
    'user.created',
    'user.updated',
    'enrollment.created',
    'enrollment.completed',
    'payment.succeeded',
    'payment.failed',
    'course.published',
    'assessment.submitted',
  ];

  useEffect(() => {
    if (currentOrg) {
      loadIntegrationData();
    }
  }, [currentOrg]);

  async function loadIntegrationData() {
    if (!currentOrg) return;

    try {
      setLoading(true);

      const [integrationsRes, webhooksRes, apiKeysRes] = await Promise.all([
        supabase
          .from('integrations')
          .select('*')
          .eq('org_id', currentOrg.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('webhooks')
          .select('*')
          .eq('org_id', currentOrg.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('api_keys')
          .select('*')
          .eq('org_id', currentOrg.id)
          .order('created_at', { ascending: false }),
      ]);

      setIntegrations(integrationsRes.data || []);
      setWebhooks(webhooksRes.data || []);
      setAPIKeys(apiKeysRes.data || []);
    } catch (error) {
      alert('Failed to load integration data');
    } finally {
      setLoading(false);
    }
  }

  async function toggleIntegration(integrationId: string, enabled: boolean) {
    try {
      const { error } = await supabase
        .from('integrations')
        .update({ enabled })
        .eq('id', integrationId);

      if (error) throw error;

      await loadIntegrationData();
      alert(`Integration ${enabled ? 'enabled' : 'disabled'}`);
    } catch (error: any) {
      alert('Failed to toggle integration: ' + error.message);
    }
  }

  async function createWebhook() {
    if (!currentOrg || !webhookUrl.trim() || webhookEvents.length === 0) return;

    try {
      setCreating(true);

      // Generate a random secret
      const secret = 'whsec_' + Math.random().toString(36).substring(2, 15);

      if (!supabase) throw new Error('Supabase not initialized');
      const { error } = await supabase.from('webhooks').insert({
        org_id: currentOrg.id,
        url: webhookUrl,
        events: webhookEvents,
        secret,
        enabled: true,
      });

      if (error) throw error;

      setWebhookUrl('');
      setWebhookEvents([]);
      setShowWebhookModal(false);
      await loadIntegrationData();
      alert('Webhook created successfully!');
    } catch (error: any) {
      alert('Failed to create webhook: ' + error.message);
    } finally {
      setCreating(false);
    }
  }

  async function toggleWebhook(webhookId: string, enabled: boolean) {
    try {
      const { error } = await supabase
        .from('webhooks')
        .update({ enabled })
        .eq('id', webhookId);

      if (error) throw error;

      await loadIntegrationData();
      alert(`Webhook ${enabled ? 'enabled' : 'disabled'}`);
    } catch (error: any) {
      alert('Failed to toggle webhook: ' + error.message);
    }
  }

  async function createAPIKey() {
    if (!currentOrg) return;

    const name = prompt('Enter API key name:');
    if (!name) return;

    try {
      // Generate API key
      const keyPrefix = 'sk_' + Math.random().toString(36).substring(2, 10);
      const fullKey =
        keyPrefix + '_' + Math.random().toString(36).substring(2, 30);

      if (!supabase) throw new Error('Supabase not initialized');
      const { error } = await supabase.from('api_keys').insert({
        org_id: currentOrg.id,
        name,
        key_prefix: keyPrefix,
        key_hash: fullKey, // In production, hash this
        permissions: ['read', 'write'],
      });

      if (error) throw error;

      await loadIntegrationData();
      alert(
        `API Key created!\n\nKey: ${fullKey}\n\nSave this key securely - you won't see it again!`
      );
    } catch (error: any) {
      alert('Failed to create API key: ' + error.message);
    }
  }

  function toggleEvent(event: string) {
    setWebhookEvents((prev) =>
      prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="mt-2 text-gray-600">
            Connect third-party services, webhooks, and API access
          </p>
        </div>
        <div className="flex gap-3">
          {activeTab === 'webhooks' && (
            <button
              onClick={() => setShowWebhookModal(true)}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Create Webhook
            </button>
          )}
          {activeTab === 'api' && (
            <button
              onClick={createAPIKey}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Create API Key
            </button>
          )}
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('integrations')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'integrations'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Integrations
        </button>
        <button
          onClick={() => setActiveTab('webhooks')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'webhooks'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Webhooks ({webhooks.length})
        </button>
        <button
          onClick={() => setActiveTab('api')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'api'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          API Keys ({apiKeys.length})
        </button>
      </div>
      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Available Integrations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableIntegrations.map((integration) => {
                const existing = integrations.find(
                  (i) => i.provider === integration.id
                );
                return (
                  <div
                    key={integration.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{integration.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {integration.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {integration.description}
                          </p>
                          {existing && (
                            <div className="mt-2">
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  existing.enabled
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {existing.enabled ? 'Connected' : 'Disabled'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        {existing ? (
                          <button
                            onClick={() =>
                              toggleIntegration(existing.id, !existing.enabled)
                            }
                            className={`px-4 py-2 text-sm rounded ${
                              existing.enabled
                                ? 'border border-gray-300 hover:bg-gray-50'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {existing.enabled ? 'Disable' : 'Enable'}
                          </button>
                        ) : (
                          <button className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800">
                            Connect
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {/* Webhooks Tab */}
      {activeTab === 'webhooks' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Webhooks</h2>
          {webhooks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No webhooks configured</p>
              <button
                onClick={() => setShowWebhookModal(true)}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Create Your First Webhook
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {webhooks.map((webhook) => (
                <div
                  key={webhook.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-mono text-sm text-gray-900 mb-2">
                        {webhook.url}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            webhook.enabled
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {webhook.enabled ? 'Active' : 'Disabled'}
                        </span>
                        <span>•</span>
                        <span>{webhook.events.length} events</span>
                        <span>•</span>
                        <span>
                          {new Date(webhook.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {webhook.events.map((event) => (
                          <span
                            key={event}
                            className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded"
                          >
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          toggleWebhook(webhook.id, !webhook.enabled)
                        }
                        className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                      >
                        {webhook.enabled ? 'Disable' : 'Enable'}
                      </button>
                      <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                        Test
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* API Keys Tab */}
      {activeTab === 'api' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">API Keys</h2>
          {apiKeys.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No API keys created</p>
              <button
                onClick={createAPIKey}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Create Your First API Key
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {apiKey.name}
                      </h3>
                      <div className="font-mono text-sm text-gray-600 mt-1">
                        {apiKey.key_prefix}••••••••••••••••
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                        <span>
                          Permissions: {apiKey.permissions.join(', ')}
                        </span>
                        {apiKey.last_used && (
                          <>
                            <span>•</span>
                            <span>
                              Last used:{' '}
                              {new Date(apiKey.last_used).toLocaleDateString()}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                        Edit
                      </button>
                      <button className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50">
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Create Webhook Modal */}
      {showWebhookModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Create New Webhook
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook URL *
                </label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://example.com/webhook"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Events to Subscribe *
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {availableEvents.map((event) => (
                    <label
                      key={event}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={webhookEvents.includes(event)}
                        onChange={() => toggleEvent(event)}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">{event}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setShowWebhookModal(false);
                  setWebhookUrl('');
                  setWebhookEvents([]);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createWebhook}
                disabled={
                  creating || !webhookUrl.trim() || webhookEvents.length === 0
                }
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {creating ? 'Creating...' : 'Create Webhook'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
