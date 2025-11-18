'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function GoogleClassroomPage() {
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus] = useState<any>(null);
  const [syncResult, setSyncResult] = useState<any>(null);

  const checkStatus = async () => {
    const res = await fetch('/api/google-classroom/sync');
    const data = await res.json();
    setStatus(data);
  };

  const runSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/google-classroom/sync', {
        method: 'POST',
      });
      const data = await res.json();
      setSyncResult(data);
    } catch (error: any) {
      setSyncResult({ error: error.message });
    }
    setSyncing(false);
  };

  const modules = [
    { name: 'LMS Sync', description: 'Sync courses between Google Classroom and LMS', status: 'active' },
    { name: 'Email Correlation', description: 'Match student emails across systems', status: 'active' },
    { name: 'Guardian Preferences', description: 'Parent notification settings', status: 'active' },
    { name: 'Missing Assignments', description: 'Automated reminder emails', status: 'active' },
    { name: 'Auto Sync Jobs', description: 'Scheduled background syncing', status: 'active' },
    { name: 'Alerts', description: 'Real-time system alerts', status: 'active' },
    { name: 'Email Webhooks', description: 'Email event handling', status: 'active' },
    { name: 'Identity Import', description: 'Bulk student import', status: 'active' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl">Google Classroom Autopilot</CardTitle>
            <p className="text-gray-600 mt-2">
              Automated synchronization between Google Classroom and your LMS
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <Button onClick={checkStatus} variant="outline" size="lg">
                Check Status
              </Button>
              <Button onClick={runSync} disabled={syncing} size="lg">
                {syncing ? 'Syncing...' : 'Run Sync Now'}
              </Button>
            </div>

            {status && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-bold text-green-900 mb-2">System Status</h3>
                <pre className="text-sm text-green-800 overflow-auto">
                  {JSON.stringify(status, null, 2)}
                </pre>
              </div>
            )}

            {syncResult && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-bold text-blue-900 mb-2">Sync Results</h3>
                <pre className="text-sm text-blue-800 overflow-auto">
                  {JSON.stringify(syncResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Autopilot Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {modules.map((module, index) => (
                <div key={index} className="p-4 border rounded-lg bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold">{module.name}</h3>
                    <Badge variant="success">{module.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-bold mb-2">1. Google Cloud Console Setup</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Create a Google Cloud project</li>
                  <li>Enable Google Classroom API</li>
                  <li>Create OAuth 2.0 credentials</li>
                  <li>Add authorized redirect URIs</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">2. Environment Variables</h4>
                <div className="bg-gray-100 p-3 rounded font-mono text-xs">
                  GOOGLE_CLIENT_ID=your_client_id<br/>
                  GOOGLE_CLIENT_SECRET=your_client_secret<br/>
                  GOOGLE_REDIRECT_URI=your_redirect_uri
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-2">3. Domain-Wide Delegation</h4>
                <p className="text-gray-600">
                  See <code>google-classroom-autopilot/DOMAIN_WIDE_DELEGATION_SETUP.md</code> for detailed instructions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
