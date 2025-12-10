'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Purchase {
  id: string;
  date: string;
  productName: string;
  productImage: string;
  amount: number;
  status: 'completed' | 'pending' | 'refunded';
  downloadUrl?: string;
  licenseKey?: string;
  digital: boolean;
}

// Mock data - in production, fetch from database
const mockPurchases: Purchase[] = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    productName: 'Barber Apprenticeship Complete Workbook',
    productImage: 'https://images.unsplash.com/pho
    amount: 49.00,
    status: 'completed',
    downloadUrl: '/downloads/barber-workbook.pdf',
    licenseKey: 'BARB-2024-XXXX-YYYY',
    digital: true,
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    productName: 'CNA Training Complete Study Guide',
    productImage: 'https://images.unsplash.com/pho
    amount: 56.00,
    status: 'completed',
    downloadUrl: '/downloads/cna-study-guide.pdf',
    licenseKey: 'CNA-2024-XXXX-ZZZZ',
    digital: true,
  },
];

export default function DashboardPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'digital' | 'physical'>('all');

  useEffect(() => {
    // In production, fetch from API
    setTimeout(() => {
      setPurchases(mockPurchases);
      setLoading(false);
    }, 500);
  }, []);

  const filteredPurchases = purchases.filter(p => {
    if (activeTab === 'digital') return p.digital;
    if (activeTab === 'physical') return !p.digital;
    return true;
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-600">Loading your purchases...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Purchases</h1>
          <p className="text-lg text-slate-600">
            Access your digital products, license keys, and order history
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {purchases.length}
            </div>
            <div className="text-sm text-slate-600">Total Orders</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {purchases.filter(p => p.digital).length}
            </div>
            <div className="text-sm text-slate-600">Digital Products</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl font-bold text-slate-900 mb-1">
              ${purchases.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
            </div>
            <div className="text-sm text-slate-600">Total Spent</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {purchases.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-sm text-slate-600">Completed</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-slate-200">
            <div className="flex gap-8 px-6">
              <button
                onClick={() => setActiveTab('all')}
                className={`py-4 font-semibold border-b-2 transition-colors ${
                  activeTab === 'all'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                All Purchases ({purchases.length})
              </button>
              <button
                onClick={() => setActiveTab('digital')}
                className={`py-4 font-semibold border-b-2 transition-colors ${
                  activeTab === 'digital'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Digital ({purchases.filter(p => p.digital).length})
              </button>
              <button
                onClick={() => setActiveTab('physical')}
                className={`py-4 font-semibold border-b-2 transition-colors ${
                  activeTab === 'physical'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Physical ({purchases.filter(p => !p.digital).length})
              </button>
            </div>
          </div>

          {/* Purchases List */}
          <div className="p-6">
            {filteredPurchases.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600 mb-4">No purchases found</p>
                <Link
                  href="/store"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
                >
                  Browse Store
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPurchases.map((purchase) => (
                  <div key={purchase.id} className="border border-slate-200 rounded-lg p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                        <Image
                          src={purchase.productImage}
                          alt={purchase.productName}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">
                              {purchase.productName}
                            </h3>
                            <p className="text-sm text-slate-600">
                              Order #{purchase.id} • {new Date(purchase.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900">
                              ${purchase.amount.toFixed(2)}
                            </div>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              purchase.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : purchase.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {purchase.status.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {/* License Key */}
                        {purchase.licenseKey && (
                          <div className="bg-slate-50 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-xs font-semibold text-slate-600 mb-1">
                                  LICENSE KEY
                                </div>
                                <div className="font-mono text-sm font-bold text-slate-900">
                                  {purchase.licenseKey}
                                </div>
                              </div>
                              <button
                                onClick={() => navigator.clipboard.writeText(purchase.licenseKey!)}
                                className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-all text-sm"
                              >
                                Copy
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3">
                          {purchase.downloadUrl && (
                            <a
                              href={purchase.downloadUrl}
                              download
                              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                            >
                              Download
                            </a>
                          )}
                          <button className="px-6 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-all">
                            View Receipt
                          </button>
                          <button className="px-6 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-all">
                            Get Support
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">Need Help?</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/store/support" className="flex items-start gap-3 text-blue-800 hover:text-blue-900">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <div>
                <div className="font-semibold">Support Center</div>
                <div className="text-sm">Get help with your purchases</div>
              </div>
            </Link>
            <Link href="/refund-policy" className="flex items-start gap-3 text-blue-800 hover:text-blue-900">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="font-semibold">Refund Policy</div>
                <div className="text-sm">30-day money-back guarantee</div>
              </div>
            </Link>
            <Link href="/contact" className="flex items-start gap-3 text-blue-800 hover:text-blue-900">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <div className="font-semibold">Contact Us</div>
                <div className="text-sm">Email or call support</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
