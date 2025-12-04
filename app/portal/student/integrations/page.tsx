'use client';

import { useState } from 'react';
import { Plug, Check, X, Settings, ExternalLink, RefreshCw, AlertCircle, Zap, Calendar, Mail, MessageSquare, Github, Linkedin, Slack, Video } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  isConnected: boolean;
  lastSync?: string;
  status: 'active' | 'error' | 'disconnected';
  features: string[];
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Google Calendar',
      description: 'Sync your course schedule and assignments with Google Calendar',
      category: 'Productivity',
      icon: '📅',
      isConnected: true,
      lastSync: '2024-12-04T10:30:00',
      status: 'active',
      features: ['Schedule sync', 'Assignment reminders', 'Event notifications'],
    },
    {
      id: '2',
      name: 'Slack',
      description: 'Receive notifications and updates in your Slack workspace',
      category: 'Communication',
      icon: '💬',
      isConnected: true,
      lastSync: '2024-12-04T09:15:00',
      status: 'active',
      features: ['Grade notifications', 'Assignment alerts', 'Course updates'],
    },
    {
      id: '3',
      name: 'GitHub',
      description: 'Connect your GitHub account for code submissions and portfolio',
      category: 'Development',
      icon: '🐙',
      isConnected: false,
      status: 'disconnected',
      features: ['Code submissions', 'Portfolio sync', 'Project tracking'],
    },
    {
      id: '4',
      name: 'LinkedIn',
      description: 'Share certificates and achievements on your LinkedIn profile',
      category: 'Professional',
      icon: '💼',
      isConnected: false,
      status: 'disconnected',
      features: ['Certificate sharing', 'Achievement posts', 'Profile updates'],
    },
    {
      id: '5',
      name: 'Zoom',
      description: 'Join virtual classes and meetings directly from the portal',
      category: 'Video',
      icon: '🎥',
      isConnected: true,
      lastSync: '2024-12-04T08:00:00',
      status: 'active',
      features: ['One-click join', 'Recording access', 'Meeting history'],
    },
    {
      id: '6',
      name: 'Microsoft Teams',
      description: 'Collaborate with classmates using Microsoft Teams',
      category: 'Communication',
      icon: '👥',
      isConnected: false,
      status: 'disconnected',
      features: ['Team chat', 'File sharing', 'Video calls'],
    },
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredIntegrations = integrations.filter(i => 
    filterCategory === 'all' || i.category === filterCategory
  );

  const connectedCount = integrations.filter(i => i.isConnected).length;
  const activeCount = integrations.filter(i => i.status === 'active').length;
  const errorCount = integrations.filter(i => i.status === 'error').length;

  const handleConnect = (id: string) => {
    setIntegrations(prev => prev.map(i => 
      i.id === id ? { ...i, isConnected: true, status: 'active', lastSync: new Date().toISOString() } : i
    ));
  };

  const handleDisconnect = (id: string) => {
    setIntegrations(prev => prev.map(i => 
      i.id === id ? { ...i, isConnected: false, status: 'disconnected', lastSync: undefined } : i
    ));
  };

  const handleSync = (id: string) => {
    setIntegrations(prev => prev.map(i => 
      i.id === id ? { ...i, lastSync: new Date().toISOString() } : i
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-gray-600 mt-1">Connect your favorite tools and services</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <Plug className="text-blue-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{integrations.length}</p>
            <p className="text-sm text-gray-600">Available Integrations</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Check className="text-green-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{connectedCount}</p>
            <p className="text-sm text-gray-600">Connected</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Zap className="text-purple-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{activeCount}</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <AlertCircle className="text-orange-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{errorCount}</p>
            <p className="text-sm text-gray-600">Needs Attention</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Available Integrations</h2>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                <option value="all">All Categories</option>
                <option value="Productivity">Productivity</option>
                <option value="Communication">Communication</option>
                <option value="Development">Development</option>
                <option value="Professional">Professional</option>
                <option value="Video">Video</option>
              </select>
            </div>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredIntegrations.map((integration) => (
                <div key={integration.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{integration.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{integration.name}</h3>
                        <span className="text-xs text-gray-600">{integration.category}</span>
                      </div>
                    </div>
                    {integration.isConnected && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        integration.status === 'active' ? 'bg-green-100 text-green-700' :
                        integration.status === 'error' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {integration.status}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

                  <div className="mb-4">
                    <p className="text-xs text-gray-600 mb-2">Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {integration.features.map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {integration.lastSync && (
                    <p className="text-xs text-gray-500 mb-4">
                      Last synced: {new Date(integration.lastSync).toLocaleString()}
                    </p>
                  )}

                  <div className="flex gap-2">
                    {integration.isConnected ? (
                      <>
                        <button
                          onClick={() => handleSync(integration.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                        >
                          <RefreshCw size={16} />
                          Sync Now
                        </button>
                        <button
                          onClick={() => {
                            setSelectedIntegration(integration);
                            setShowConfigModal(true);
                          }}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                        >
                          <Settings size={16} />
                        </button>
                        <button
                          onClick={() => handleDisconnect(integration.id)}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm"
                        >
                          Disconnect
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleConnect(integration.id)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Zap size={20} />
            Integration Benefits
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Sync your schedule across all your devices</li>
            <li>• Get real-time notifications where you work</li>
            <li>• Automate repetitive tasks and save time</li>
            <li>• Share achievements with your professional network</li>
            <li>• Access all your tools from one place</li>
          </ul>
        </div>

        {showConfigModal && selectedIntegration && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Configure {selectedIntegration.name}</h3>
                <button onClick={() => {
                  setShowConfigModal(false);
                  setSelectedIntegration(null);
                }} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{selectedIntegration.icon}</span>
                    <div>
                      <p className="font-semibold">{selectedIntegration.name}</p>
                      <p className="text-sm text-gray-600">{selectedIntegration.category}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Notification Settings</h4>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <span className="text-sm">Grade notifications</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <span className="text-sm">Assignment reminders</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <span className="text-sm">Course updates</span>
                      <input type="checkbox" className="rounded" />
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Sync Settings</h4>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <span className="text-sm">Auto-sync</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                    <div className="p-3 border rounded-lg">
                      <label className="block text-sm mb-2">Sync frequency</label>
                      <select className="w-full px-3 py-2 border rounded text-sm">
                        <option>Every 15 minutes</option>
                        <option>Every hour</option>
                        <option>Every 6 hours</option>
                        <option>Daily</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Save Settings
                  </button>
                  <button
                    onClick={() => {
                      setShowConfigModal(false);
                      setSelectedIntegration(null);
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
