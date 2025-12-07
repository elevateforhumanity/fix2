'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Play, Pause, Trash2, Edit, Users, Mail, Clock, Zap } from 'lucide-react';

interface Workflow {
  id: string;
  name: string;
  trigger: string;
  status: 'active' | 'paused' | 'draft';
  emails: number;
  recipients: number;
  lastRun: string | null;
}

export default function AutomationPage() {
  const router = useRouter();
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Welcome Series',
      trigger: 'New Student Enrollment',
      status: 'active',
      emails: 3,
      recipients: 142,
      lastRun: '2025-12-07T10:30:00Z',
    },
    {
      id: '2',
      name: 'Application Follow-Up',
      trigger: 'Abandoned Application',
      status: 'active',
      emails: 2,
      recipients: 67,
      lastRun: '2025-12-06T15:45:00Z',
    },
    {
      id: '3',
      name: 'Course Completion',
      trigger: 'Program Completed',
      status: 'paused',
      emails: 4,
      recipients: 0,
      lastRun: null,
    },
  ]);

  const toggleStatus = (id: string) => {
    setWorkflows(workflows.map(w => 
      w.id === id 
        ? { ...w, status: w.status === 'active' ? 'paused' : 'active' }
        : w
    ));
  };

  const deleteWorkflow = (id: string) => {
    if (confirm('Delete this workflow?')) {
      setWorkflows(workflows.filter(w => w.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Marketing Automation</h1>
              <p className="text-gray-600 mt-1">Create automated email workflows and drip campaigns</p>
            </div>
            
            <button
              onClick={() => router.push('/admin/email-marketing/automation/new')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>Create Workflow</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{workflows.length}</div>
            <div className="text-sm text-gray-600">Total Workflows</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <Play className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {workflows.filter(w => w.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Workflows</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <Mail className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {workflows.reduce((sum, w) => sum + w.emails, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Emails</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {workflows.reduce((sum, w) => sum + w.recipients, 0)}
            </div>
            <div className="text-sm text-gray-600">Active Recipients</div>
          </div>
        </div>

        {/* Workflow Templates */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Start Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <WorkflowTemplate
              title="Welcome Series"
              description="Onboard new students with 3-email sequence"
              icon={Mail}
              color="blue"
              onClick={() => router.push('/admin/email-marketing/automation/new?template=welcome')}
            />
            <WorkflowTemplate
              title="Abandoned Application"
              description="Re-engage applicants who didn't complete"
              icon={Clock}
              color="orange"
              onClick={() => router.push('/admin/email-marketing/automation/new?template=abandoned')}
            />
            <WorkflowTemplate
              title="Course Reminders"
              description="Send reminders before class starts"
              icon={Zap}
              color="purple"
              onClick={() => router.push('/admin/email-marketing/automation/new?template=reminder')}
            />
          </div>
        </div>

        {/* Workflows List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Workflows</h2>
          </div>

          {workflows.length === 0 ? (
            <div className="p-12 text-center">
              <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No workflows yet</h3>
              <p className="text-gray-600 mb-6">Create your first automated workflow to save time</p>
              <button
                onClick={() => router.push('/admin/email-marketing/automation/new')}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Create Workflow</span>
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          workflow.status === 'active' ? 'bg-green-100 text-green-800' :
                          workflow.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {workflow.status === 'active' ? '● Active' : 
                           workflow.status === 'paused' ? '⏸ Paused' : 
                           '○ Draft'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4" />
                          <span>Trigger: {workflow.trigger}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{workflow.emails} emails</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{workflow.recipients} recipients</span>
                        </div>
                        {workflow.lastRun && (
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>Last run: {new Date(workflow.lastRun).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleStatus(workflow.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          workflow.status === 'active'
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                        title={workflow.status === 'active' ? 'Pause' : 'Activate'}
                      >
                        {workflow.status === 'active' ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => router.push(`/admin/email-marketing/automation/${workflow.id}/edit`)}
                        className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => deleteWorkflow(workflow.id)}
                        className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface WorkflowTemplateProps {
  title: string;
  description: string;
  icon: any;
  color: 'blue' | 'orange' | 'purple';
  onClick: () => void;
}

function WorkflowTemplate({ title, description, icon: Icon, color, onClick }: WorkflowTemplateProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
  };

  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all text-left ${colorClasses[color]}`}
    >
      <Icon className="w-8 h-8 mb-3" />
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
}
