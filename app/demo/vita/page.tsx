'use client';

import Link from 'next/link';
import { DollarSign, Users, FileText, Calendar } from 'lucide-react';

export default function VitaDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👁️</span>
              <span className="font-semibold">DEMO MODE - VITA Tax Services Preview</span>
            </div>
            <Link href="/demo" className="bg-white text-orange-600 px-4 py-2 rounded-lg text-sm font-semibold">
              Back to Store
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">VITA Tax Services</h1>
          <p className="text-gray-600">Free tax preparation for students and low-income individuals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <Users className="w-8 h-8 text-orange-600 mb-2" />
            <p className="text-3xl font-bold">342</p>
            <p className="text-sm text-gray-600">Returns Filed</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <DollarSign className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-3xl font-bold">$487K</p>
            <p className="text-sm text-gray-600">Refunds Secured</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <FileText className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-3xl font-bold">28</p>
            <p className="text-sm text-gray-600">Pending Reviews</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <Calendar className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-3xl font-bold">45</p>
            <p className="text-sm text-gray-600">Days Until Deadline</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Tax Returns</h2>
            <div className="space-y-3">
              {[
                { name: 'John Smith', status: 'Completed', refund: '$2,450' },
                { name: 'Maria Garcia', status: 'In Review', refund: '$1,890' },
                { name: 'James Wilson', status: 'Pending', refund: '$3,200' }
              ].map((client, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold">{client.name}</p>
                    <p className="text-sm text-gray-600">{client.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{client.refund}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">VITA Services</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <h3 className="font-semibold">Free Tax Preparation</h3>
                  <p className="text-sm text-gray-600">IRS-certified volunteers prepare returns at no cost</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <h3 className="font-semibold">E-Filing Included</h3>
                  <p className="text-sm text-gray-600">Fast refunds through electronic filing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <h3 className="font-semibold">Student Focused</h3>
                  <p className="text-sm text-gray-600">Specialized support for education credits and deductions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Why VITA Matters</h3>
          <p className="text-yellow-100 mb-4">
            VITA (Volunteer Income Tax Assistance) helps students and low-income individuals get their full refund 
            without paying expensive tax preparation fees. Our platform manages appointments, document collection, 
            and return preparation efficiently.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-3xl font-bold mb-1">$1,425</p>
              <p className="text-sm text-yellow-100">Average Refund</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-3xl font-bold mb-1">100%</p>
              <p className="text-sm text-yellow-100">Free Service</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-3xl font-bold mb-1">7 Days</p>
              <p className="text-sm text-yellow-100">Avg. Processing Time</p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-yellow-900 mb-2">VITA Tax Services Demo</h3>
          <p className="text-yellow-700 mb-4">Free tax preparation platform for students and community members</p>
          <div className="flex gap-4 justify-center">
            <Link href="/demo" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold">View Pricing</Link>
            <Link href="/contact" className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold border-2 border-orange-600">Contact Sales</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
