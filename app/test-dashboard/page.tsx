'use client';

import { useState } from 'react';
import { Play, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function TestDashboard() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runTests = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/run-all-tests');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Test execution failed');
      }

      setResults(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Production Readiness Test Dashboard
          </h1>
          <p className="text-gray-600 mb-4">
            Run comprehensive tests to verify all systems are operational
          </p>

          <button
            onClick={runTests}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Running Tests...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Run All Tests
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-800">
              <XCircle className="w-5 h-5" />
              <span className="font-semibold">Error:</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <>
            {/* Overall Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Overall Summary
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-blue-600 font-medium mb-1">
                    Total Tests
                  </div>
                  <div className="text-3xl font-bold text-blue-900">
                    {results.overall_summary.total_tests}
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-green-600 font-medium mb-1">
                    Passed
                  </div>
                  <div className="text-3xl font-bold text-green-900">
                    {results.overall_summary.passed_tests}
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <div className="text-sm text-red-600 font-medium mb-1">
                    Failed
                  </div>
                  <div className="text-3xl font-bold text-red-900">
                    {results.overall_summary.failed_tests}
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-sm text-purple-600 font-medium mb-1">
                    Success Rate
                  </div>
                  <div className="text-3xl font-bold text-purple-900">
                    {results.overall_summary.success_rate}
                  </div>
                </div>
              </div>

              {/* Production Readiness */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Production Readiness Assessment
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">
                      Multi-Tenant Isolation:
                    </span>
                    <span className="font-bold text-gray-900">
                      {results.production_readiness.multi_tenant}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">License Enforcement:</span>
                    <span className="font-bold text-gray-900">
                      {results.production_readiness.license_enforcement}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Compliance Reporting:</span>
                    <span className="font-bold text-gray-900">
                      {results.production_readiness.compliance}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-gray-900 font-semibold">
                      Overall:
                    </span>
                    <span className="font-bold text-lg text-gray-900">
                      {results.production_readiness.overall}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Suites */}
            {results.test_suites.map((suite: any, index: number) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {suite.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    {suite.status === 'PASSED' && (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="text-green-600 font-semibold">
                          PASSED
                        </span>
                      </>
                    )}
                    {suite.status === 'FAILED' && (
                      <>
                        <XCircle className="w-6 h-6 text-red-600" />
                        <span className="text-red-600 font-semibold">
                          FAILED
                        </span>
                      </>
                    )}
                    {suite.status === 'ERROR' && (
                      <>
                        <AlertCircle className="w-6 h-6 text-yellow-600" />
                        <span className="text-yellow-600 font-semibold">
                          ERROR
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {suite.summary && (
                  <div className="mb-4 text-sm text-gray-600">
                    {suite.summary.passed} / {suite.summary.total} tests passed
                    ({suite.summary.success_rate})
                  </div>
                )}

                {suite.tests && (
                  <div className="space-y-2">
                    {suite.tests.map((test: any, testIndex: number) => (
                      <div
                        key={testIndex}
                        className={`flex items-start gap-3 p-3 rounded-lg ${
                          test.passed ? 'bg-green-50' : 'bg-red-50'
                        }`}
                      >
                        {test.passed ? (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div
                            className={`font-medium ${
                              test.passed ? 'text-green-900' : 'text-red-900'
                            }`}
                          >
                            {test.name}
                          </div>
                          {test.error && (
                            <div className="text-sm text-red-700 mt-1">
                              Error: {test.error}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {suite.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-red-800 font-medium mb-1">Error:</div>
                    <div className="text-red-700 text-sm">{suite.error}</div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* Instructions */}
        {!results && !loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">
              What This Tests:
            </h3>
            <ul className="space-y-2 text-blue-800">
              <li>✓ Multi-tenant isolation and data separation</li>
              <li>✓ License enforcement and feature gating</li>
              <li>✓ Compliance reporting (WIOA/ETPL)</li>
              <li>✓ Database functions and RLS policies</li>
              <li>✓ All critical business logic</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
