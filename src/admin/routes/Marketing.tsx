/**
 * Admin Marketing Page
 * Manage campaigns, A/B tests, and funnels
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useOrg } from '../../hooks/useOrg';

interface Campaign {
  id: string;
  name: string;
  channel: string;
  status: string;
  config: any;
  created_at: string;
}

interface ABTest {
  id: string;
  entity: string;
  variants: any;
  metrics: any;
  active: boolean;
  created_at: string;
}

interface Funnel {
  id: string;
  name: string;
  steps: any;
  created_at: string;
}

export default function Marketing() {
  const { user } = useAuth();
  const { currentOrg } = useOrg(user?.id || null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [abTests, setABTests] = useState<ABTest[]>([]);
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'campaigns' | 'abtests' | 'funnels'
  >('campaigns');

  // Campaign form
  const [campaignName, setCampaignName] = useState('');
  const [channel, setChannel] = useState('email');
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (currentOrg) {
      loadMarketingData();
    }
  }, [currentOrg]);

  async function loadMarketingData() {
    if (!currentOrg) return;

    try {
      setLoading(true);

      const [campaignsRes, abTestsRes, funnelsRes] = await Promise.all([
        supabase
          .from('campaigns')
          .select('*')
          .eq('org_id', currentOrg.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('ab_tests')
          .select('*')
          .eq('org_id', currentOrg.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('funnels')
          .select('*')
          .eq('org_id', currentOrg.id)
          .order('created_at', { ascending: false }),
      ]);

      setCampaigns(campaignsRes.data || []);
      setABTests(abTestsRes.data || []);
      setFunnels(funnelsRes.data || []);
    } catch (error) {
      alert('Failed to load marketing data');
    } finally {
      setLoading(false);
    }
  }

  async function createCampaign() {
    if (!currentOrg || !campaignName.trim()) return;

    try {
      setCreating(true);

      if (!supabase) throw new Error('Supabase not initialized');
      const { error } = await supabase.from('campaigns').insert({
        org_id: currentOrg.id,
        name: campaignName,
        channel,
        config: {},
        status: 'draft',
      });

      if (error) throw error;

      setCampaignName('');
      setShowCampaignModal(false);
      await loadMarketingData();
      alert('Campaign created successfully!');
    } catch (error: any) {
      alert('Failed to create campaign: ' + error.message);
    } finally {
      setCreating(false);
    }
  }

  async function updateCampaignStatus(campaignId: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({ status: newStatus })
        .eq('id', campaignId);

      if (error) throw error;

      await loadMarketingData();
      alert(`Campaign ${newStatus}`);
    } catch (error: any) {
      alert('Failed to update campaign: ' + error.message);
    }
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
          <h1 className="text-3xl font-bold text-gray-900">
            Marketing Automation
          </h1>
          <p className="mt-2 text-gray-600">
            Manage campaigns, A/B tests, and conversion funnels
          </p>
        </div>
        <button
          onClick={() => setShowCampaignModal(true)}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Create Campaign
        </button>
      </div>
      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'campaigns'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Campaigns ({campaigns.length})
        </button>
        <button
          onClick={() => setActiveTab('abtests')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'abtests'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          A/B Tests ({abTests.length})
        </button>
        <button
          onClick={() => setActiveTab('funnels')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'funnels'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Funnels ({funnels.length})
        </button>
      </div>
      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Campaigns
          </h2>
          {campaigns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No campaigns yet</p>
              <button
                onClick={() => setShowCampaignModal(true)}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Create Your First Campaign
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {campaign.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                        <span className="capitalize">{campaign.channel}</span>
                        <span>•</span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            campaign.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : campaign.status === 'draft'
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {campaign.status}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(campaign.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {campaign.status === 'draft' && (
                        <button
                          onClick={() =>
                            updateCampaignStatus(campaign.id, 'active')
                          }
                          className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Launch
                        </button>
                      )}
                      {campaign.status === 'active' && (
                        <button
                          onClick={() =>
                            updateCampaignStatus(campaign.id, 'paused')
                          }
                          className="px-4 py-2 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        >
                          Pause
                        </button>
                      )}
                      <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* A/B Tests Tab */}
      {activeTab === 'abtests' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            A/B Tests
          </h2>
          {abTests.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No A/B tests yet. Create one to optimize your campaigns.
            </div>
          ) : (
            <div className="space-y-3">
              {abTests.map((test) => (
                <div
                  key={test.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {test.entity}
                      </h3>
                      <div className="text-sm text-gray-600 mt-1">
                        {test.active ? (
                          <span className="text-green-600">● Active</span>
                        ) : (
                          <span className="text-gray-400">● Inactive</span>
                        )}
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                      View Results
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Funnels Tab */}
      {activeTab === 'funnels' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Conversion Funnels
          </h2>
          {funnels.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No funnels yet. Create one to track user journeys.
            </div>
          ) : (
            <div className="space-y-3">
              {funnels.map((funnel) => (
                <div
                  key={funnel.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h3 className="font-semibold text-gray-900">{funnel.name}</h3>
                  <div className="text-sm text-gray-600 mt-2">
                    {Array.isArray(funnel.steps) && funnel.steps.length} steps
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Create Campaign Modal */}
      {showCampaignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Create New Campaign
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Name *
                </label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Welcome Email Series"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Channel
                </label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="push">Push Notification</option>
                  <option value="funnel">Funnel</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setShowCampaignModal(false);
                  setCampaignName('');
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createCampaign}
                disabled={creating || !campaignName.trim()}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {creating ? 'Creating...' : 'Create Campaign'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
