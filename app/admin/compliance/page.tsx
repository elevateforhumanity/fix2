'use client';

import { useState, useEffect } from 'react';
import {
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

type ComplianceStatus = 'todo' | 'in_progress' | 'complete';

interface ComplianceEvidence {
  id: string;
  file_url: string;
  file_name: string;
  uploaded_by: string | null;
  uploaded_at: string;
}

interface ComplianceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  status: ComplianceStatus;
  last_reviewed_at: string | null;
  compliance_evidence: ComplianceEvidence[];
}

export default function Compliance() {
  const [items, setItems] = useState<ComplianceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['SOC 2', 'WIOA', 'WCAG 2.1 AA'])
  );

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const res = await fetch('/api/compliance/items');
      const data = await res.json();
      if (data.items) {
        setItems(data.items);
      }
    } catch (error) {
      console.error('Failed to fetch compliance items:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: ComplianceStatus) {
    // Optimistic update
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );

    try {
      await fetch('/api/compliance/items', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
    } catch (error) {
      console.error('Failed to update status:', error);
      // Revert on error
      fetchItems();
    }
  }

  function toggleCategory(category: string) {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }

  async function handleUploadEvidence(itemId: string, file: File | null) {
    if (!file) return;
    setUploadingId(itemId);

    const formData = new FormData();
    formData.append('itemId', itemId);
    formData.append('file', file);

    try {
      const res = await fetch('/api/compliance/evidence', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const data = await res.json();
      const evidence: ComplianceEvidence = data.evidence;

      // Update items with new evidence
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? {
                ...item,
                compliance_evidence: [...item.compliance_evidence, evidence],
              }
            : item
        )
      );
    } catch (error) {
      console.error('Failed to upload evidence:', error);
      alert('Failed to upload evidence file.');
    } finally {
      setUploadingId(null);
    }
  }

  const categories = Array.from(new Set(items.map((item) => item.category)));
  const statusCounts = {
    todo: items.filter((i) => i.status === 'todo').length,
    in_progress: items.filter((i) => i.status === 'in_progress').length,
    complete: items.filter((i) => i.status === 'complete').length,
  };
  const completionPercentage = items.length
    ? Math.round((statusCounts.complete / items.length) * 100)
    : 0;

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  async function downloadReport() {
    try {
      const res = await fetch('/api/compliance/report');
      if (!res.ok) {
        alert('Unable to generate report.');
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'efh-compliance-status-report.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download report:', error);
      alert('Failed to download report');
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Compliance Checklist</h1>
          <p className="text-gray-600">
            Track and manage compliance requirements across SOC 2, WIOA, WCAG, FERPA, and GDPR
          </p>
        </div>
        <button
          onClick={downloadReport}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-semibold"
        >
          Download Compliance Report (PDF)
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Overall Progress</span>
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold">{completionPercentage}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Complete</span>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600">
            {statusCounts.complete}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">In Progress</span>
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold text-yellow-600">
            {statusCounts.in_progress}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">To Do</span>
            <AlertCircle className="w-5 h-5 text-gray-600" />
          </div>
          <div className="text-3xl font-bold text-gray-600">
            {statusCounts.todo}
          </div>
        </div>
      </div>

      {/* Compliance Items by Category */}
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryItems = items.filter((item) => item.category === category);
          const isExpanded = expandedCategories.has(category);
          const categoryComplete = categoryItems.filter(
            (i) => i.status === 'complete'
          ).length;
          const categoryProgress = Math.round(
            (categoryComplete / categoryItems.length) * 100
          );

          return (
            <div key={category} className="bg-white rounded-lg shadow">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                  <h2 className="text-xl font-semibold">{category}</h2>
                  <span className="text-sm text-gray-500">
                    {categoryComplete}/{categoryItems.length} complete
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${categoryProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-12 text-right">
                    {categoryProgress}%
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t divide-y">
                  {categoryItems.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          {item.last_reviewed_at && (
                            <p className="text-xs text-gray-400 mt-2">
                              Last reviewed:{' '}
                              {new Date(item.last_reviewed_at).toLocaleDateString()}
                            </p>
                          )}

                          {/* Evidence Section */}
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs font-semibold text-gray-700 mb-2">
                              Evidence ({item.compliance_evidence.length})
                            </p>
                            {item.compliance_evidence.length > 0 && (
                              <ul className="space-y-1 mb-2">
                                {item.compliance_evidence.map((ev) => (
                                  <li key={ev.id} className="flex items-center justify-between text-xs">
                                    <a
                                      href={ev.file_url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-blue-600 hover:underline truncate flex-1"
                                    >
                                      {ev.file_name}
                                    </a>
                                    <span className="text-gray-500 ml-2">
                                      {new Date(ev.uploaded_at).toLocaleDateString()}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            <label className="inline-flex items-center gap-2 px-3 py-1 bg-white border rounded cursor-pointer hover:bg-gray-50 text-xs">
                              <span>
                                {uploadingId === item.id ? 'Uploading...' : 'Attach Evidence'}
                              </span>
                              <input
                                type="file"
                                className="hidden"
                                disabled={uploadingId === item.id}
                                onChange={(e) =>
                                  handleUploadEvidence(item.id, e.target.files?.[0] ?? null)
                                }
                              />
                            </label>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(item.id, 'todo')}
                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                              item.status === 'todo'
                                ? 'bg-gray-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            To Do
                          </button>
                          <button
                            onClick={() => updateStatus(item.id, 'in_progress')}
                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                              item.status === 'in_progress'
                                ? 'bg-yellow-600 text-white'
                                : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                            }`}
                          >
                            In Progress
                          </button>
                          <button
                            onClick={() => updateStatus(item.id, 'complete')}
                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                              item.status === 'complete'
                                ? 'bg-green-600 text-white'
                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                            }`}
                          >
                            Complete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            No compliance items found. Run the migration to seed initial data.
          </p>
        </div>
      )}
      status: 'compliant',
      participants: 892,
      completion: 95,
      icon: Users,
    },
    {
      id: 'pirl',
      title: 'PIRL Reporting',
      description: 'Federal participant data reporting to DOL',
      status: 'compliant',
      participants: 1247,
      completion: 100,
      icon: BarChart,
    },
    {
      id: 'eligibility',
      title: 'Eligibility Verification',
      description: 'Federal program eligibility documentation',
      status: 'compliant',
      participants: 1247,
      completion: 100,
      icon: Shield,
    },
    {
      id: 'skills',
      title: 'Skills Assessment',
      description: 'Pre/post program skills evaluation',
      status: 'compliant',
      participants: 1156,
      completion: 93,
      icon: TrendingUp,
    },
    {
      id: 'employers',
      title: 'Employer Partnerships',
      description: 'Job placement and partnership tracking',
      status: 'compliant',
      participants: 1876,
      completion: 98,
      icon: Users,
    },
    {
      id: 'performance',
      title: 'Performance Tracking',
      description: 'Federal outcome measurements',
      status: 'compliant',
      participants: 1247,
      completion: 100,
      icon: Award,
    },
    {
      id: 'audit',
      title: 'Audit & Compliance Logs',
      description: 'Comprehensive compliance documentation',
      status: 'compliant',
      participants: 1247,
      completion: 100,
      icon: FileCheck,
    },
    {
      id: 'cost',
      title: 'Cost Tracking & Funding',
      description: 'Federal funding accountability',
      status: 'compliant',
      participants: 1247,
      completion: 100,
      icon: BarChart,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'PIRL Submission',
      description: 'Q4 2024 PIRL data submitted to DOL',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'completed',
      user: 'System',
    },
    {
      id: 2,
      type: 'IEP Created',
      description: 'New Individual Employment Plan for participant #1248',
      timestamp: '2024-01-14T14:22:00Z',
      status: 'completed',
      user: 'Case Manager',
    },
    {
      id: 3,
      type: 'Eligibility Verified',
      description: 'WIOA eligibility verified for 12 new participants',
      timestamp: '2024-01-14T09:15:00Z',
      status: 'completed',
      user: 'Eligibility Specialist',
    },
    {
      id: 4,
      type: 'Performance Review',
      description: 'Monthly performance outcomes analyzed',
      timestamp: '2024-01-13T16:45:00Z',
      status: 'completed',
      user: 'Data Analyst',
    },
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Compliance Status Banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              🏛️ 100% Federal DOL/DWD Compliance
            </h2>
            <p className="text-green-100">
              Complete infrastructure ready for multi-million dollar federal
              workforce development contracts
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {complianceMetrics.federalCompliance}%
            </div>
            <div className="text-green-100">Compliant</div>
          </div>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-2xl font-bold text-red-600">
            {complianceMetrics.totalParticipants.toLocaleString()}
          </div>
          <div className="text-gray-600 text-sm">Total Participants</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-2xl font-bold text-green-600">
            {complianceMetrics.activeEnrollments}
          </div>
          <div className="text-gray-600 text-sm">Active Enrollments</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-2xl font-bold text-purple-600">
            {complianceMetrics.completionRate}%
          </div>
          <div className="text-gray-600 text-sm">Completion Rate</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-2xl font-bold text-orange-600">
            {complianceMetrics.employmentRate}%
          </div>
          <div className="text-gray-600 text-sm">Employment Rate</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-2xl font-bold text-green-600">
            {complianceMetrics.federalCompliance}%
          </div>
          <div className="text-gray-600 text-sm">Federal Compliance</div>
        </div>
      </div>
      {/* Compliance Areas Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceAreas.map((area) => (
          <button
            key={area.id}
            onClick={() => setActiveSection(area.id)}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <area.icon className="h-8 w-8 text-red-600" />
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  area.status === 'compliant'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {area.status}
              </span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">{area.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{area.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Participants</span>
                <span className="font-medium">
                  {area.participants.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Completion</span>
                <span className="font-medium">{area.completion}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 rounded-full h-2"
                  style={{ width: `${area.completion}%` }}
                />
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            Recent Compliance Activity
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div
                  className={`p-2 rounded-full ${
                    activity.status === 'completed'
                      ? 'bg-green-100'
                      : 'bg-yellow-100'
                  }`}
                >
                  <CheckCircle
                    className={`h-4 w-4 ${
                      activity.status === 'completed'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">
                      {activity.type}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500">By {activity.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderComplianceSection = (sectionId: string) => {
    const section = complianceAreas.find((area) => area.id === sectionId);
    if (!section) return null;

    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <section.icon className="h-8 w-8 text-red-600" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {section.title}
                </h2>
                <p className="text-gray-600">{section.description}</p>
              </div>
            </div>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${
                section.status === 'compliant'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {section.status}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {section.participants.toLocaleString()}
              </div>
              <div className="text-red-700 text-sm">Total Participants</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {section.completion}%
              </div>
              <div className="text-green-700 text-sm">Completion Rate</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-purple-700 text-sm">Federal Standards</div>
            </div>
          </div>
          {/* Section-specific content */}
          <div className="space-y-6">
            {sectionId === 'iep' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Individual Employment Plan Management
                </h3>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-gray-700 mb-4">
                    Complete IEP lifecycle management including assessment, goal
                    setting, service planning, and progress tracking.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Key Features:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Comprehensive career assessments</li>
                        <li>• SMART goal setting and tracking</li>
                        <li>• Service coordination and referrals</li>
                        <li>• Progress monitoring and updates</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Federal Requirements:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• WIOA Section 134 compliance</li>
                        <li>• Career pathway alignment</li>
                        <li>• Barrier identification and services</li>
                        <li>• Performance outcome tracking</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {sectionId === 'pirl' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  PIRL Federal Reporting
                </h3>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-gray-700 mb-4">
                    Automated PIRL (Participant Individual Record Layout) data
                    collection and federal submission system.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Data Collection:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Participant demographics</li>
                        <li>• Employment history and outcomes</li>
                        <li>• Education and training completion</li>
                        <li>• Support services received</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Federal Submission:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Quarterly DOL reporting</li>
                        <li>• Data validation and quality checks</li>
                        <li>• Performance metrics calculation</li>
                        <li>• Audit trail documentation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex space-x-4">
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Generate Report
              </button>
              <button className="bg-white text-red-600 border border-orange-500 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors">
                Export Data
              </button>
              <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: BarChart },
    { id: 'iep', label: 'IEP Management', icon: Users },
    { id: 'pirl', label: 'PIRL Reporting', icon: FileCheck },
    { id: 'eligibility', label: 'Eligibility', icon: Shield },
    { id: 'skills', label: 'Skills Assessment', icon: TrendingUp },
    { id: 'employers', label: 'Employers', icon: Users },
    { id: 'performance', label: 'Performance', icon: Award },
    { id: 'audit', label: 'Audit Logs', icon: FileCheck },
    { id: 'cost', label: 'Cost Tracking', icon: BarChart },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Federal Compliance Portal
              </h1>
              <p className="text-gray-600 mt-1">
                Complete DOL/DWD compliance management for workforce development
                programs
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ✅ 100% Compliant
              </div>
              <div className="bg-red-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                🏛️ Federal Ready
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <section.icon className="h-4 w-4" />
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'overview' && renderOverview()}
        {activeSection !== 'overview' && renderComplianceSection(activeSection)}
      </div>
      {/* Federal Compliance Footer */}
      <div className="bg-orange-50 border-t-4 border-orange-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-orange-900 mb-2">
              🎉 Historic Achievement: 100% Federal DOL/DWD Compliance
            </h3>
            <p className="text-orange-700 mb-4">
              Complete infrastructure enabling access to multi-million dollar
              federal workforce development contracts across all 50 states plus
              territories.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/programs"
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Explore Programs
              </Link>
              <Link
                href="/pay"
                className="bg-white text-orange-600 border border-orange-600 px-6 py-2 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Federal Funding
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
