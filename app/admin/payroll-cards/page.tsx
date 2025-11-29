'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PayrollCardsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'cards' | 'revenue' | 'issue'>('overview');

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Payroll Cards</h1>
              <p className="mt-1 text-sm text-slate-600">
                Issue prepaid debit cards and earn revenue from fees
              </p>
            </div>
            <button
              onClick={() => setActiveTab('issue')}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Issue New Card
            </button>
          </div>
        </div>

        {/* Revenue Summary Cards */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-medium text-slate-600">Total Revenue (MTD)</div>
            <div className="mt-2 text-2xl font-bold text-green-600">$12,450</div>
            <div className="mt-1 text-xs text-slate-500">+18% from last month</div>
          </div>
          
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-medium text-slate-600">Active Cards</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">847</div>
            <div className="mt-1 text-xs text-slate-500">+23 this month</div>
          </div>
          
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-medium text-slate-600">Avg Revenue/Card</div>
            <div className="mt-2 text-2xl font-bold text-blue-600">$14.70</div>
            <div className="mt-1 text-xs text-slate-500">Per month</div>
          </div>
          
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-medium text-slate-600">Load Volume (MTD)</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">$284,500</div>
            <div className="mt-1 text-xs text-slate-500">1,247 loads</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-slate-200">
          <div className="flex gap-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'cards', label: 'Card Management' },
              { id: 'revenue', label: 'Revenue Analytics' },
              { id: 'issue', label: 'Issue Card' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'cards' && <CardsTab />}
        {activeTab === 'revenue' && <RevenueTab />}
        {activeTab === 'issue' && <IssueCardTab />}
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Revenue Breakdown */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Revenue Breakdown (This Month)</h2>
        <div className="mt-4 space-y-3">
          {[
            { label: 'Monthly Maintenance Fees', amount: '$4,192.65', count: '847 cards × $4.95' },
            { label: 'Load Fees', amount: '$1,870.50', count: '1,247 loads × $1.50' },
            { label: 'ATM Withdrawal Fees', amount: '$3,125.00', count: '1,250 withdrawals × $2.50' },
            { label: 'Card Replacement Fees', amount: '$145.00', count: '29 replacements × $5.00' },
            { label: 'Other Fees', amount: '$3,116.85', count: 'Balance inquiries, etc.' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="text-sm font-medium text-slate-900">{item.label}</div>
                <div className="text-xs text-slate-500">{item.count}</div>
              </div>
              <div className="text-lg font-semibold text-green-600">{item.amount}</div>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2">
            <div className="text-base font-bold text-slate-900">Total Revenue</div>
            <div className="text-2xl font-bold text-green-600">$12,450.00</div>
          </div>
        </div>
      </div>

      {/* Fee Structure */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Current Fee Structure</h2>
        <p className="mt-1 text-sm text-slate-600">Elevate Payroll Card Program (EPC-001)</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            { label: 'Activation Fee', value: '$0.00', note: 'Waived for first card' },
            { label: 'Monthly Fee', value: '$4.95', note: 'Charged on anniversary' },
            { label: 'Load Fee', value: '$1.50', note: 'Per load transaction' },
            { label: 'ATM Withdrawal', value: '$2.50', note: 'Per withdrawal' },
            { label: 'Balance Inquiry', value: '$0.50', note: 'At ATM' },
            { label: 'Card Replacement', value: '$5.00', note: 'Lost/stolen cards' },
          ].map((fee) => (
            <div key={fee.label} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <div className="text-xs font-medium text-slate-600">{fee.label}</div>
              <div className="mt-1 text-xl font-bold text-slate-900">{fee.value}</div>
              <div className="mt-1 text-xs text-slate-500">{fee.note}</div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link
            href="/admin/payroll-cards/fee-structure"
            className="text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            Edit Fee Structure →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/admin/payroll-cards/issue"
          className="rounded-lg border border-slate-200 bg-white p-6 hover:border-orange-300 hover:bg-orange-50"
        >
          <div className="text-3xl">💳</div>
          <div className="mt-3 text-sm font-semibold text-slate-900">Issue New Card</div>
          <div className="mt-1 text-xs text-slate-600">Create and issue a new payroll card</div>
        </Link>
        
        <Link
          href="/admin/payroll-cards/load"
          className="rounded-lg border border-slate-200 bg-white p-6 hover:border-green-300 hover:bg-green-50"
        >
          <div className="text-3xl">💰</div>
          <div className="mt-3 text-sm font-semibold text-slate-900">Load Funds</div>
          <div className="mt-1 text-xs text-slate-600">Add money to existing cards</div>
        </Link>
        
        <Link
          href="/admin/payroll-cards/reports"
          className="rounded-lg border border-slate-200 bg-white p-6 hover:border-blue-300 hover:bg-blue-50"
        >
          <div className="text-3xl">📊</div>
          <div className="mt-3 text-sm font-semibold text-slate-900">Revenue Reports</div>
          <div className="mt-1 text-xs text-slate-600">View detailed revenue analytics</div>
        </Link>
      </div>
    </div>
  );
}

function CardsTab() {
  const cards = [
    { id: 1, holder: 'John Smith', last4: '4532', status: 'active', balance: '$245.67', revenue: '$18.45', issued: '2024-01-15' },
    { id: 2, holder: 'Sarah Johnson', last4: '8821', status: 'active', balance: '$892.34', revenue: '$24.90', issued: '2024-01-20' },
    { id: 3, holder: 'Mike Davis', last4: '3344', status: 'active', balance: '$156.89', revenue: '$12.45', issued: '2024-02-01' },
    { id: 4, holder: 'Emily Brown', last4: '7765', status: 'suspended', balance: '$0.00', revenue: '$8.95', issued: '2024-02-10' },
    { id: 5, holder: 'David Wilson', last4: '2198', status: 'active', balance: '$534.21', revenue: '$21.40', issued: '2024-02-15' },
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">All Cards</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search cards..."
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
            />
            <select className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm">
              <option>All Status</option>
              <option>Active</option>
              <option>Suspended</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Card Holder</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Last 4</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Balance</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Revenue (MTD)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Issued</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cards.map((card) => (
              <tr key={card.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{card.holder}</td>
                <td className="px-4 py-3 text-sm text-slate-600">****{card.last4}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    card.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {card.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-slate-900">{card.balance}</td>
                <td className="px-4 py-3 text-sm font-semibold text-green-600">{card.revenue}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{card.issued}</td>
                <td className="px-4 py-3">
                  <button className="text-sm font-medium text-orange-600 hover:text-orange-700">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RevenueTab() {
  return (
    <div className="space-y-6">
      {/* Revenue Chart Placeholder */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Revenue Trend (Last 6 Months)</h2>
        <div className="mt-4 flex h-64 items-end justify-around gap-2">
          {[8200, 9500, 10200, 11800, 11200, 12450].map((amount, i) => (
            <div key={i} className="flex flex-1 flex-col items-center">
              <div
                className="w-full rounded-t-lg bg-green-500"
                style={{ height: `${(amount / 12450) * 100}%` }}
              />
              <div className="mt-2 text-xs font-medium text-slate-600">
                {['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
              </div>
              <div className="text-xs text-slate-500">${(amount / 1000).toFixed(1)}k</div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue by Fee Type */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="text-base font-semibold text-slate-900">Revenue by Fee Type</h3>
          <div className="mt-4 space-y-3">
            {[
              { type: 'Monthly Fees', amount: 4192.65, percentage: 33.7 },
              { type: 'ATM Fees', amount: 3125.00, percentage: 25.1 },
              { type: 'Other Fees', amount: 3116.85, percentage: 25.0 },
              { type: 'Load Fees', amount: 1870.50, percentage: 15.0 },
              { type: 'Replacement Fees', amount: 145.00, percentage: 1.2 },
            ].map((item) => (
              <div key={item.type}>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">{item.type}</span>
                  <span className="font-semibold text-slate-900">${item.amount.toFixed(2)}</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="text-base font-semibold text-slate-900">Key Metrics</h3>
          <div className="mt-4 space-y-4">
            {[
              { label: 'Revenue per Active Card', value: '$14.70', change: '+5.2%' },
              { label: 'Average Load Amount', value: '$228.15', change: '+2.1%' },
              { label: 'ATM Withdrawal Rate', value: '1.48', change: '-0.3%', suffix: ' per card' },
              { label: 'Card Retention Rate', value: '94.2%', change: '+1.8%' },
            ].map((metric) => (
              <div key={metric.label} className="flex items-center justify-between">
                <div className="text-sm text-slate-600">{metric.label}</div>
                <div className="text-right">
                  <div className="text-base font-semibold text-slate-900">
                    {metric.value}{metric.suffix}
                  </div>
                  <div className={`text-xs ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function IssueCardTab() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Issue New Payroll Card</h2>
        <p className="mt-1 text-sm text-slate-600">
          Create and issue a new prepaid payroll debit card
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Card Holder Name</label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="John Smith"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Phone</label>
              <input
                type="tel"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Card Type</label>
            <select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option>Employee Payroll Card</option>
              <option>Student Stipend Card</option>
              <option>Contractor Payment Card</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Initial Load Amount (Optional)</label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="0.00"
              step="0.01"
            />
            <p className="mt-1 text-xs text-slate-500">
              Load fee of $1.50 will be charged if amount is entered
            </p>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="text-sm font-semibold text-blue-900">Fee Structure</h3>
            <div className="mt-2 space-y-1 text-xs text-blue-700">
              <div>• Activation Fee: $0.00 (Waived)</div>
              <div>• Monthly Maintenance: $4.95</div>
              <div>• Load Fee: $1.50 per load</div>
              <div>• ATM Withdrawal: $2.50 per withdrawal</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Issue Card
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
