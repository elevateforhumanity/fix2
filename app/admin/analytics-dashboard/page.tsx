'use client';

import { useEffect, useState } from 'react';

export default function AnalyticsDashboardPage() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetch('/api/analytics').then(r => r.json()).then(setAnalytics);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Website Traffic</h3>
            <div className="text-4xl font-bold text-blue-600">12,456</div>
            <div className="text-sm text-gray-600">visitors this month</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Applications</h3>
            <div className="text-4xl font-bold text-green-600">342</div>
            <div className="text-sm text-gray-600">new applications</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Conversion Rate</h3>
            <div className="text-4xl font-bold text-purple-600">8.2%</div>
            <div className="text-sm text-gray-600">visitor to applicant</div>
          </div>
        </div>
      </div>
    </div>
  );
}
