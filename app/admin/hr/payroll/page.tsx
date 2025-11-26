// app/admin/hr/payroll/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DollarSign, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

type PayrollRecord = {
  id: string;
  employee_id: string;
  pay_period_start: string;
  pay_period_end: string;
  gross_pay: number;
  net_pay: number;
  status: string;
  processed_at?: string;
  employee: {
    employee_number: string;
    profile: {
      full_name: string;
    };
  };
};

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<PayrollRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadPayrolls();
  }, []);

  async function loadPayrolls() {
    try {
      const res = await fetch('/api/hr/payroll');
      if (!res.ok) throw new Error('Failed to load payroll');
      const data = await res.json();
      setPayrolls(data.payrolls || []);
    } catch (error) {
      console.error('Error loading payroll:', error);
    } finally {
      setLoading(false);
    }
  }

  async function processPayroll() {
    if (!confirm('Process payroll for all active employees?')) return;

    setProcessing(true);
    try {
      const res = await fetch('/api/hr/payroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pay_period_start: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          ).toISOString(),
          pay_period_end: new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
          ).toISOString(),
        }),
      });

      if (!res.ok) throw new Error('Failed to process payroll');

      alert('Payroll processed successfully!');
      await loadPayrolls();
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setProcessing(false);
    }
  }

  const totalGross = payrolls.reduce((sum, p) => sum + p.gross_pay, 0);
  const totalNet = payrolls.reduce((sum, p) => sum + p.net_pay, 0);
  const processedCount = payrolls.filter(
    (p) => p.status === 'processed'
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/admin/hr"
                className="text-sm text-gray-600 hover:text-gray-900 mb-2 inline-block"
              >
                ← Back to HR
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Payroll Processing
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Process and manage employee payroll
              </p>
            </div>
            <button
              onClick={processPayroll}
              disabled={processing}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center gap-2"
            >
              <DollarSign className="h-4 w-4" />
              {processing ? 'Processing...' : 'Process Payroll'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Gross Pay</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalGross.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-brandPrimary" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Net Pay</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalNet.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Processed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {processedCount}/{payrolls.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payroll Records */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-bold text-gray-900">Payroll Records</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading payroll records...</p>
            </div>
          ) : payrolls.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Employee
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Pay Period
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                      Gross Pay
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                      Net Pay
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Processed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payrolls.map((payroll) => (
                    <tr
                      key={payroll.id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {payroll.employee?.profile?.full_name || 'N/A'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {payroll.employee?.employee_number || 'N/A'}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(payroll.pay_period_start).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                          }
                        )}{' '}
                        -{' '}
                        {new Date(payroll.pay_period_end).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">
                        ${payroll.gross_pay.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">
                        ${payroll.net_pay.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            payroll.status === 'processed'
                              ? 'bg-green-100 text-green-800'
                              : payroll.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {payroll.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {payroll.processed_at
                          ? new Date(payroll.processed_at).toLocaleDateString(
                              'en-US',
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              }
                            )
                          : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">
                No Payroll Records
              </h3>
              <p className="text-gray-600 mb-6">
                Process your first payroll to get started
              </p>
              <button
                onClick={processPayroll}
                disabled={processing}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              >
                <DollarSign className="h-4 w-4" />
                {processing ? 'Processing...' : 'Process Payroll'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
