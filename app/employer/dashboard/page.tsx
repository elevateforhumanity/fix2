'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  FileText,
  Plus,
  Eye,
  CheckCircle
} from 'lucide-react';

export default function EmployerDashboardPage() {
  const stats = {
    activeJobs: 5,
    totalApplications: 47,
    newApplications: 12,
    hiredCandidates: 8,
  };

  const recentJobs = [
    {
      id: 1,
      title: 'HVAC Technician',
      location: 'Milwaukee, WI',
      posted: '2024-02-10',
      applications: 15,
      status: 'active',
    },
    {
      id: 2,
      title: 'Certified Nursing Assistant',
      location: 'Madison, WI',
      posted: '2024-02-08',
      applications: 22,
      status: 'active',
    },
    {
      id: 3,
      title: 'Electrician Apprentice',
      location: 'Green Bay, WI',
      posted: '2024-02-05',
      applications: 10,
      status: 'active',
    },
  ];

  const recentApplications = [
    {
      id: 1,
      candidateName: 'Sarah Johnson',
      position: 'HVAC Technician',
      appliedDate: '2024-02-15',
      status: 'new',
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      position: 'CNA',
      appliedDate: '2024-02-15',
      status: 'new',
    },
    {
      id: 3,
      candidateName: 'Emily Rodriguez',
      position: 'Electrician Apprentice',
      appliedDate: '2024-02-14',
      status: 'reviewed',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Employer Dashboard</h1>
              <p className="text-slate-600 mt-1">Manage your job postings and candidates</p>
            </div>
            <Button variant="primary">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Active Jobs</div>
                  <div className="text-3xl font-bold text-slate-900 mt-1">{stats.activeJobs}</div>
                </div>
                <Briefcase className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Total Applications</div>
                  <div className="text-3xl font-bold text-slate-900 mt-1">{stats.totalApplications}</div>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">New Applications</div>
                  <div className="text-3xl font-bold text-orange-600 mt-1">{stats.newApplications}</div>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Hired</div>
                  <div className="text-3xl font-bold text-green-600 mt-1">{stats.hiredCandidates}</div>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Active Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Active Job Postings</span>
                <Button variant="ghost" size="sm">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-900">{job.title}</h3>
                        <p className="text-sm text-slate-600">{job.location}</p>
                      </div>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Posted: {job.posted}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-900 font-medium">
                          {job.applications} applications
                        </span>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Applications</span>
                <Button variant="ghost" size="sm">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-900">{app.candidateName}</h3>
                        <p className="text-sm text-slate-600">{app.position}</p>
                      </div>
                      <Badge variant={app.status === 'new' ? 'warning' : 'primary'}>
                        {app.status === 'new' ? 'New' : 'Reviewed'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Applied: {app.appliedDate}</span>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-24 flex-col">
                <Plus className="h-6 w-6 mb-2" />
                Post New Job
              </Button>
              <Button variant="outline" className="h-24 flex-col">
                <Users className="h-6 w-6 mb-2" />
                Browse Candidates
              </Button>
              <Button variant="outline" className="h-24 flex-col">
                <FileText className="h-6 w-6 mb-2" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
