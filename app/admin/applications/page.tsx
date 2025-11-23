'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, XCircle, RefreshCw, Search } from 'lucide-react';

type Application = {
  id: string;
  email: string;
  program: string;
  status: 'pending' | 'approved' | 'denied';
  submittedAt: string;
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      email: 'john.doe@gmail.com',
      program: 'WIOA',
      status: 'pending',
      submittedAt: '2024-01-15',
    },
    {
      id: '2',
      email: 'jane.smith@gmail.com',
      program: 'WRG',
      status: 'approved',
      submittedAt: '2024-01-14',
    },
    {
      id: '3',
      email: 'bob.johnson@gmail.com',
      program: 'JRI',
      status: 'pending',
      submittedAt: '2024-01-13',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleApprove = (id: string) => {
    setApplications(apps =>
      apps.map(app => (app.id === id ? { ...app, status: 'approved' as const } : app))
    );
  };

  const handleDeny = (id: string) => {
    setApplications(apps =>
      apps.map(app => (app.id === id ? { ...app, status: 'denied' as const } : app))
    );
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.program.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'denied':
        return <Badge variant="destructive">Denied</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Funding Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search email or program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'pending' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('pending')}
                >
                  Pending
                </Button>
                <Button
                  variant={statusFilter === 'approved' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('approved')}
                >
                  Approved
                </Button>
                <Button
                  variant={statusFilter === 'denied' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('denied')}
                >
                  Denied
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            {/* Applications Table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                      Program
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                      Submitted
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                        No applications found
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm text-slate-900">{app.email}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{app.program}</td>
                        <td className="px-4 py-3">{getStatusBadge(app.status)}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{app.submittedAt}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            {app.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="primary"
                                  onClick={() => handleApprove(app.id)}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeny(app.id)}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Deny
                                </Button>
                              </>
                            )}
                            {app.status !== 'pending' && (
                              <span className="text-sm text-slate-500">No actions</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-red-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm font-medium text-blue-900">Total Applications</div>
                <div className="text-2xl font-bold text-red-600 mt-1">
                  {applications.length}
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="text-sm font-medium text-yellow-900">Pending Review</div>
                <div className="text-2xl font-bold text-yellow-600 mt-1">
                  {applications.filter(a => a.status === 'pending').length}
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-sm font-medium text-green-900">Approved</div>
                <div className="text-2xl font-bold text-green-600 mt-1">
                  {applications.filter(a => a.status === 'approved').length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
