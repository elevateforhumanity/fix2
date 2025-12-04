'use client';

import Link from 'next/link';
import { FileText, DollarSign, TrendingUp, Sparkles } from 'lucide-react';

export default function GrantsDemoPage() {
  const grants = [
    { title: 'DOL Workforce Development Grant', amount: '$250,000', status: 'In Progress', deadline: '30 days' },
    { title: 'State Apprenticeship Funding', amount: '$100,000', status: 'Draft', deadline: '45 days' },
    { title: 'Community College Partnership', amount: '$75,000', status: 'Submitted', deadline: 'Awaiting response' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👁️</span>
              <span className="font-semibold">DEMO MODE - Grant Autopilot Preview</span>
            </div>
            <Link href="/demo" className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-semibold">
              Back to Store
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Grant Autopilot</h1>
          <p className="text-gray-600">AI-powered grant writing and management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <DollarSign className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-3xl font-bold">$425K</p>
            <p className="text-sm text-gray-600">Total Applied For</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-3xl font-bold">$175K</p>
            <p className="text-sm text-gray-600">Grants Awarded</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <FileText className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-gray-600">Active Applications</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Active Grant Applications</h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 flex items-center gap-2">
              <Sparkles size={18} />
              New Grant with AI
            </button>
          </div>
          <div className="space-y-4">
            {grants.map((grant, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{grant.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">Amount: {grant.amount}</p>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        grant.status === 'Submitted' ? 'bg-blue-100 text-blue-700' :
                        grant.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {grant.status}
                      </span>
                      <span className="text-sm text-gray-600">Deadline: {grant.deadline}</span>
                    </div>
                  </div>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-8 text-white">
          <div className="flex items-start gap-4">
            <Sparkles className="w-12 h-12 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-2">AI-Powered Grant Writing</h3>
              <p className="text-green-100 mb-4">
                Our GPT-4 powered system analyzes grant requirements, researches your organization, 
                and drafts compelling proposals that win funding.
              </p>
              <ul className="space-y-2 text-green-100">
                <li>✓ Automated research and data collection</li>
                <li>✓ Compliance checking and formatting</li>
                <li>✓ Budget development and justification</li>
                <li>✓ Deadline tracking and reminders</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-green-900 mb-2">Grant Autopilot Demo</h3>
          <p className="text-green-700 mb-4">Win more grants with AI-powered proposal writing and management</p>
          <div className="flex gap-4 justify-center">
            <Link href="/demo" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">View Pricing</Link>
            <Link href="/contact" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold border-2 border-green-600">Contact Sales</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
