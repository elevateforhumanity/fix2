'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Briefcase } from 'lucide-react';
import { useState } from 'react';

export default function PostJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'full-time',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">Post a Job</h1>
          <p className="text-slate-600 mt-1">Create a new job posting to attract qualified candidates</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Job Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Title *
                </label>
                <Input
                  placeholder="e.g., HVAC Technician"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Location *
                  </label>
                  <Input
                    placeholder="e.g., Milwaukee, WI"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Job Type *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Salary Range
                </label>
                <Input
                  placeholder="e.g., $45,000 - $55,000"
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  rows={6}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the role, responsibilities, and what makes this opportunity great..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Requirements *
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="List required skills, certifications, and experience..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Benefits
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Health insurance, 401(k), paid time off, etc..."
                  value={formData.benefits}
                  onChange={(e) => setFormData({...formData, benefits: e.target.value})}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="primary" size="lg">
                  Publish Job
                </Button>
                <Button variant="outline" size="lg">
                  Save as Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
