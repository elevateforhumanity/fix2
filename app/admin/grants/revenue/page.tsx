'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DollarSign, FileText, Users, TrendingUp, Download } from 'lucide-react';

const grantRevenue = [
  {
    id: 1,
    grantName: 'WIOA Youth Program 2024',
    totalAmount: 100000,
    programHolder: 'ABC Training Center',
    programHolderShare: 33333,
    elevateShare: 66667,
    grantWritingFee: 5000,
    complianceFee: 0,
    status: 'Active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  {
    id: 2,
    grantName: 'WRG Healthcare Training',
    totalAmount: 50000,
    programHolder: 'Medical Skills Institute',
    programHolderShare: 16667,
    elevateShare: 33333,
    grantWritingFee: 0,
    complianceFee: 3000,
    status: 'Active',
    startDate: '2024-03-01',
    endDate: '2024-09-30',
  },
  {
    id: 3,
    grantName: 'DOL Apprenticeship Grant',
    totalAmount: 150000,
    programHolder: 'Trades Academy',
    programHolderShare: 50000,
    elevateShare: 100000,
    grantWritingFee: 7500,
    complianceFee: 5000,
    status: 'Pending',
    startDate: '2024-06-01',
    endDate: '2025-05-31',
  },
];

export default function GrantRevenuePage() {
  const [selectedGrant, setSelectedGrant] = useState<number | null>(null);

  const totalGrantFunding = grantRevenue.reduce((sum, g) => sum + g.totalAmount, 0);
  const totalProgramHolderShare = grantRevenue.reduce((sum, g) => sum + g.programHolderShare, 0);
  const totalElevateShare = grantRevenue.reduce((sum, g) => sum + g.elevateShare, 0);
  const totalFees = grantRevenue.reduce((sum, g) => sum + g.grantWritingFee + g.complianceFee, 0);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/admin" className="text-sm text-slate-600 hover:text-slate-900 mb-2 inline-block">
            ← Back to Admin
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Grant Revenue Management</h1>
          <p className="text-slate-600 mt-2">
            Track grant funding, revenue splits, and program holder payments
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600">Total Grant Funding</span>
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">
              ${totalGrantFunding.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-1">Across all active grants</div>
          </div>

          <div className="bg-white rounded-xl border-2 border-green-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600">Program Holder Share</span>
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-700">
              ${totalProgramHolderShare.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-1">1/3 of grant funds</div>
          </div>

          <div className="bg-white rounded-xl border-2 border-purple-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600">Elevate Share</span>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-700">
              ${totalElevateShare.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-1">2/3 of grant funds</div>
          </div>

          <div className="bg-white rounded-xl border-2 border-orange-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600">Additional Fees</span>
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-700">
              ${totalFees.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-1">Writing + Compliance</div>
          </div>
        </div>

        {/* Revenue Split Explanation */}
        <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-6 mb-8">
          <h3 className="font-bold text-slate-900 mb-3">📊 Revenue Split Structure</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold text-slate-900 mb-2">Program Holder (1/3)</div>
              <ul className="space-y-1 text-slate-700">
                <li>• Instruction & training delivery</li>
                <li>• Subject matter expertise</li>
                <li>• Student assessment</li>
                <li>• Optional: Grant writing fees</li>
                <li>• Optional: Compliance consulting</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-2">Elevate (2/3)</div>
              <ul className="space-y-1 text-slate-700">
                <li>• Marketing & recruitment</li>
                <li>• Enrollment & administration</li>
                <li>• Compliance & reporting</li>
                <li>• Student support services</li>
                <li>• Materials & books</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-2">Additional Fees</div>
              <ul className="space-y-1 text-slate-700">
                <li>• Grant writing: $2.5K-$7.5K</li>
                <li>• Compliance consulting: $75-$150/hr</li>
                <li>• Paid to program holder</li>
                <li>• On top of 1/3 share</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Grants Table */}
        <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Active Grants</h2>
              <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Grant Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Program Holder</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Total Amount</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Holder Share (1/3)</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Elevate Share (2/3)</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Additional Fees</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {grantRevenue.map((grant) => (
                  <tr key={grant.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedGrant(grant.id)}>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{grant.grantName}</div>
                      <div className="text-xs text-slate-500">{grant.startDate} to {grant.endDate}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{grant.programHolder}</td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-900">
                      ${grant.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-green-700">
                      ${grant.programHolderShare.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-purple-700">
                      ${grant.elevateShare.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-sm font-semibold text-orange-700">
                        ${(grant.grantWritingFee + grant.complianceFee).toLocaleString()}
                      </div>
                      {grant.grantWritingFee > 0 && (
                        <div className="text-xs text-slate-500">Writing: ${grant.grantWritingFee.toLocaleString()}</div>
                      )}
                      {grant.complianceFee > 0 && (
                        <div className="text-xs text-slate-500">Compliance: ${grant.complianceFee.toLocaleString()}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        grant.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {grant.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Link
            href="/admin/grants/new"
            className="block p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-colors"
          >
            <h3 className="font-bold text-slate-900 mb-2">Add New Grant</h3>
            <p className="text-sm text-slate-600">Record a new grant award and set up revenue split</p>
          </Link>

          <Link
            href="/admin/grants/payments"
            className="block p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-green-300 transition-colors"
          >
            <h3 className="font-bold text-slate-900 mb-2">Process Payments</h3>
            <p className="text-sm text-slate-600">Pay program holders their share and fees</p>
          </Link>

          <Link
            href="/admin/grants/reports"
            className="block p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-purple-300 transition-colors"
          >
            <h3 className="font-bold text-slate-900 mb-2">Generate Reports</h3>
            <p className="text-sm text-slate-600">Export revenue reports for accounting</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
