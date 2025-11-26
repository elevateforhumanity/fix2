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
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
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
            <Shield className="w-5 h-5 text-brandPrimary" />
          </div>
          <div className="text-3xl font-bold">{completionPercentage}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-brandPrimary h-2 rounded-full transition-all"
              style={{ width: `${completionPercentage}%` }}
             />
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
                      className="bg-brandPrimary h-2 rounded-full transition-all"
                      style={{ width: `${categoryProgress}%` }}
                     />
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
                                      className="text-brandPrimary hover:underline truncate flex-1"
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
    </div>
  );
}
