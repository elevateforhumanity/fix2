// Integrations Marketplace
import { Plug, Check, Star, TrendingUp, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Integrations | Elevate LMS',
  description: 'Connect your favorite tools and services with Elevate LMS',
};

export default function IntegrationsPage() {
  const integrations = [
    {
      name: 'Zoom',
      category: 'Video Conferencing',
      description: 'Host live classes and virtual office hours',
      logo: '🎥',
      rating: 4.8,
      users: '2.5K',
      featured: true,
    },
    {
      name: 'Google Workspace',
      category: 'Productivity',
      description: 'Sync calendars, docs, and drive files',
      logo: '📧',
      rating: 4.9,
      users: '3.2K',
      featured: true,
    },
    {
      name: 'Slack',
      category: 'Communication',
      description: 'Get course notifications in Slack channels',
      logo: '💬',
      rating: 4.7,
      users: '1.8K',
      featured: true,
    },
    {
      name: 'Microsoft Teams',
      category: 'Collaboration',
      description: 'Integrate with Teams for seamless collaboration',
      logo: '👥',
      rating: 4.6,
      users: '2.1K',
      featured: false,
    },
    {
      name: 'Stripe',
      category: 'Payments',
      description: 'Accept payments for premium courses',
      logo: '💳',
      rating: 4.9,
      users: '4.5K',
      featured: true,
    },
    {
      name: 'Salesforce',
      category: 'CRM',
      description: 'Sync student data with Salesforce CRM',
      logo: '☁️',
      rating: 4.5,
      users: '1.2K',
      featured: false,
    },
    {
      name: 'Zapier',
      category: 'Automation',
      description: 'Connect to 5000+ apps with Zapier',
      logo: '⚡',
      rating: 4.8,
      users: '3.8K',
      featured: true,
    },
    {
      name: 'Canvas LMS',
      category: 'LMS',
      description: 'Import courses from Canvas LMS',
      logo: '📚',
      rating: 4.4,
      users: '890',
      featured: false,
    },
    {
      name: 'LinkedIn Learning',
      category: 'Content',
      description: 'Access LinkedIn Learning content',
      logo: '🎓',
      rating: 4.6,
      users: '1.5K',
      featured: false,
    },
    {
      name: 'Coursera',
      category: 'Content',
      description: 'Integrate Coursera courses',
      logo: '📖',
      rating: 4.7,
      users: '2.3K',
      featured: false,
    },
    {
      name: 'Udemy Business',
      category: 'Content',
      description: 'Access Udemy Business library',
      logo: '🎯',
      rating: 4.5,
      users: '1.9K',
      featured: false,
    },
    {
      name: 'Google Analytics',
      category: 'Analytics',
      description: 'Track learning analytics and engagement',
      logo: '📊',
      rating: 4.8,
      users: '2.7K',
      featured: true,
    },
  ];

  const categories = ['All', 'Video Conferencing', 'Productivity', 'Communication', 'Payments', 'CRM', 'Analytics', 'Content'];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Integrations Marketplace</h1>
          <p className="text-slate-600">Connect your favorite tools and extend your LMS capabilities</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-2xl font-bold text-brandPrimary mb-1">150+</div>
            <div className="text-sm text-slate-600">Available Integrations</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-2xl font-bold text-green-600 mb-1">50K+</div>
            <div className="text-sm text-slate-600">Active Connections</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-2xl font-bold text-purple-600 mb-1">99.9%</div>
            <div className="text-sm text-slate-600">Uptime</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-2xl font-bold text-orange-600 mb-1">4.7★</div>
            <div className="text-sm text-slate-600">Avg Rating</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search integrations..."
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Integrations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Featured Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.filter(i => i.featured).map((integration, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-purple-500 rounded-xl flex items-center justify-center text-3xl">
                    {integration.logo}
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-brandPrimary text-xs font-semibold rounded-full">
                    Featured
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{integration.name}</h3>
                <p className="text-sm text-slate-600 mb-3">{integration.category}</p>
                <p className="text-sm text-slate-700 mb-4">{integration.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-slate-900">{integration.rating}</span>
                  </div>
                  <span className="text-sm text-slate-600">{integration.users} users</span>
                </div>
                <button className="w-full px-4 py-2 bg-brandPrimary text-white rounded-lg hover:bg-brandPrimaryDark font-semibold">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* All Integrations */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">All Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.filter(i => !i.featured).map((integration, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-3xl">
                    {integration.logo}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{integration.name}</h3>
                <p className="text-sm text-slate-600 mb-3">{integration.category}</p>
                <p className="text-sm text-slate-700 mb-4">{integration.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-slate-900">{integration.rating}</span>
                  </div>
                  <span className="text-sm text-slate-600">{integration.users} users</span>
                </div>
                <button className="w-full px-4 py-2 border-2 border-brandPrimary text-brandPrimary rounded-lg hover:bg-blue-50 font-semibold">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Section */}
        <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Build Your Own Integration</h2>
            <p className="text-slate-300 mb-6">
              Use our API to create custom integrations and extend the platform to meet your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs/api" className="px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100">
                View API Docs
              </Link>
              <Link href="/developer" className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10">
                Developer Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
