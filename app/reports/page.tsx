'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  GraduationCap, 
  Briefcase,
  Download
} from 'lucide-react';

export default function ReportsPage() {
  const metrics = [
    {
      title: 'Total Enrollments',
      value: '2,547',
      change: '+12%',
      trend: 'up',
      period: 'vs last month',
    },
    {
      title: 'Completion Rate',
      value: '87%',
      change: '+3%',
      trend: 'up',
      period: 'vs last quarter',
    },
    {
      title: 'Job Placements',
      value: '412',
      change: '+8%',
      trend: 'up',
      period: 'this quarter',
    },
    {
      title: 'Avg Time to Placement',
      value: '45 days',
      change: '-5 days',
      trend: 'up',
      period: 'vs last quarter',
    },
  ];

  const programPerformance = [
    { program: 'HVAC Technician', enrolled: 450, completed: 414, placed: 364, rate: 88 },
    { program: 'CNA Training', enrolled: 380, completed: 334, placed: 307, rate: 92 },
    { program: 'Web Development', enrolled: 320, completed: 272, placed: 231, rate: 85 },
    { program: 'Electrical Systems', enrolled: 290, completed: 261, placed: 227, rate: 87 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
              <p className="text-slate-600 mt-1">Track performance and outcomes</p>
            </div>
            <Button variant="primary">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-sm text-slate-600">{metric.title}</div>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {metric.value}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={metric.trend === 'up' ? 'success' : 'error'} size="sm">
                    {metric.change}
                  </Badge>
                  <span className="text-xs text-slate-500">{metric.period}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Program Performance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Program Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                      Program
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                      Enrolled
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                      Completed
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                      Placed
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                      Placement Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {programPerformance.map((prog) => (
                    <tr key={prog.program} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{prog.program}</td>
                      <td className="px-4 py-3 text-slate-600">{prog.enrolled}</td>
                      <td className="px-4 py-3 text-slate-600">{prog.completed}</td>
                      <td className="px-4 py-3 text-slate-600">{prog.placed}</td>
                      <td className="px-4 py-3">
                        <Badge variant="success">{prog.rate}%</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600 mb-1">Active Students</div>
                  <div className="text-2xl font-bold text-slate-900">1,847</div>
                </div>
                <Users className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600 mb-1">Graduates (YTD)</div>
                  <div className="text-2xl font-bold text-slate-900">1,281</div>
                </div>
                <GraduationCap className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600 mb-1">Employer Partners</div>
                  <div className="text-2xl font-bold text-slate-900">52</div>
                </div>
                <Briefcase className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
