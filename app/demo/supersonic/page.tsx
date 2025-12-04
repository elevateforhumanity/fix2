'use client';

import Link from 'next/link';
import { Zap, DollarSign, Clock, TrendingUp } from 'lucide-react';

export default function SupersonicDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-pink-500 to-rose-700 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👁️</span>
              <span className="font-semibold">DEMO MODE - Supersonic Fast Cash Preview</span>
            </div>
            <Link href="/demo" className="bg-white text-pink-600 px-4 py-2 rounded-lg text-sm font-semibold">
              Back to Store
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Supersonic Fast Cash</h1>
          <p className="text-gray-600">Tax refund advances and financial services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <Zap className="w-8 h-8 text-pink-600 mb-2" />
            <p className="text-3xl font-bold">156</p>
            <p className="text-sm text-gray-600">Advances Issued</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <DollarSign className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-3xl font-bold">$234K</p>
            <p className="text-sm text-gray-600">Total Advanced</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <Clock className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-3xl font-bold">24hrs</p>
            <p className="text-sm text-gray-600">Avg. Processing</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-3xl font-bold">98%</p>
            <p className="text-sm text-gray-600">Approval Rate</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-pink-100 text-pink-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">File Your Taxes</h3>
                  <p className="text-sm text-gray-600">Complete your tax return through VITA or our platform</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-pink-100 text-pink-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Get Approved</h3>
                  <p className="text-sm text-gray-600">Instant approval for advances up to $6,000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-pink-100 text-pink-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Receive Funds</h3>
                  <p className="text-sm text-gray-600">Money in your account within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-pink-100 text-pink-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Automatic Repayment</h3>
                  <p className="text-sm text-gray-600">Paid back when IRS issues your refund</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Advance Calculator</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Refund Amount
                </label>
                <input 
                  type="number" 
                  placeholder="$3,000" 
                  className="w-full border rounded-lg px-4 py-3 text-lg"
                  defaultValue="3000"
                />
              </div>
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Advance Amount (80%)</span>
                  <span className="text-2xl font-bold text-pink-600">$2,400</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Processing Fee (5%)</span>
                  <span className="font-semibold">$120</span>
                </div>
              </div>
              <button className="w-full bg-pink-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-pink-700">
                Apply for Advance
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-700 rounded-xl p-8 text-white mb-8">
          <h3 className="text-2xl font-bold mb-4">Why Choose Supersonic?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Zap className="w-12 h-12 mb-3" />
              <h4 className="font-bold mb-2">Lightning Fast</h4>
              <p className="text-pink-100 text-sm">Get your money in 24 hours, not weeks</p>
            </div>
            <div>
              <DollarSign className="w-12 h-12 mb-3" />
              <h4 className="font-bold mb-2">Up to $6,000</h4>
              <p className="text-pink-100 text-sm">Advance up to 80% of your expected refund</p>
            </div>
            <div>
              <Clock className="w-12 h-12 mb-3" />
              <h4 className="font-bold mb-2">No Credit Check</h4>
              <p className="text-pink-100 text-sm">Approval based on your tax refund, not credit score</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Advances</h2>
          <div className="space-y-3">
            {[
              { name: 'Sarah J.', amount: '$2,400', status: 'Funded', date: '2 hours ago' },
              { name: 'Michael B.', amount: '$3,200', status: 'Approved', date: '5 hours ago' },
              { name: 'Jennifer L.', amount: '$1,800', status: 'Processing', date: '1 day ago' }
            ].map((advance, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">{advance.name}</p>
                  <p className="text-sm text-gray-600">{advance.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{advance.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    advance.status === 'Funded' ? 'bg-green-100 text-green-700' :
                    advance.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {advance.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-pink-50 border border-pink-200 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-pink-900 mb-2">Supersonic Fast Cash Demo</h3>
          <p className="text-pink-700 mb-4">Tax refund advances with 24-hour funding and no credit check</p>
          <div className="flex gap-4 justify-center">
            <Link href="/demo" className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold">View Pricing</Link>
            <Link href="/contact" className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold border-2 border-pink-600">Contact Sales</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
