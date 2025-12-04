'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  type: 'license' | 'white-label' | 'clone';
}

export default function Page() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: 'single-license',
      name: 'Single Organization License',
      price: 50000,
      description: 'Full platform access for one organization',
      features: [
        'Complete LMS platform',
        'All 30+ programs included',
        'Grant Autopilot system',
        'VITA & Supersonic tax services',
        'Partner API integrations',
        '1 year support & updates',
        'Training & onboarding included'
      ],
      type: 'license'
    },
    {
      id: 'white-label',
      name: 'White-Label Partnership',
      price: 100000,
      description: 'Fully branded platform with your organization name',
      features: [
        'Everything in Single License',
        'Custom branding & domain',
        'Your logo throughout platform',
        'Custom color scheme',
        'Dedicated support team',
        'Priority feature requests',
        'Lifetime updates included'
      ],
      type: 'white-label'
    },
    {
      id: 'full-clone',
      name: 'Complete Codebase Clone',
      price: 500000,
      description: 'Own the entire platform - full source code transfer',
      features: [
        'Complete source code ownership',
        'All 1,861 TypeScript files',
        '639 pages, 305 API routes',
        'Database schema & migrations',
        'Documentation & setup guides',
        'Intellectual property transfer',
        '90 days technical support',
        'Resale rights included'
      ],
      type: 'clone'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-red-600 via-white to-blue-600 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-gray-900">Platform Store</h1>
            <p className="text-xl mb-8 text-gray-700">License or purchase the complete Elevate For Humanity workforce development platform</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 text-lg"
              >
                View Options
              </button>
              <Link href="/contact" className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 border-2 border-red-600 text-lg">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-red-600 mb-2">1,861</div>
                <div className="text-gray-600">TypeScript Files</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">639</div>
                <div className="text-gray-600">Pages Built</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-600 mb-2">305</div>
                <div className="text-gray-600">API Routes</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">0</div>
                <div className="text-gray-600">TypeScript Errors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Choose Your Option</h2>
            <p className="text-xl text-gray-600 text-center mb-12">License, white-label, or own the complete platform</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      ${(product.price / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-gray-500">One-time payment</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demos Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Try the Platform</h2>
            <p className="text-xl text-gray-600 text-center mb-12">Explore each section with interactive demos</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/demo/student" className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-8 text-white hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold mb-2">Student Portal</h3>
                <p className="text-blue-100 mb-4">Course access, progress tracking, certificates</p>
                <div className="text-sm font-semibold">Try Demo →</div>
              </Link>

              <Link href="/demo/program-holder" className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-8 text-white hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-2xl font-bold mb-2">Program Holder</h3>
                <p className="text-purple-100 mb-4">Manage students, track outcomes, reporting</p>
                <div className="text-sm font-semibold">Try Demo →</div>
              </Link>

              <Link href="/demo/admin" className="bg-gradient-to-br from-red-500 to-red-700 rounded-xl p-8 text-white hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="text-2xl font-bold mb-2">Admin Dashboard</h3>
                <p className="text-red-100 mb-4">Full platform control, analytics, settings</p>
                <div className="text-sm font-semibold">Try Demo →</div>
              </Link>

              <Link href="/demo/grants" className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-8 text-white hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-2xl font-bold mb-2">Grant Autopilot</h3>
                <p className="text-green-100 mb-4">AI-powered grant writing and management</p>
                <div className="text-sm font-semibold">Try Demo →</div>
              </Link>

              <Link href="/demo/vita" className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl p-8 text-white hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-2xl font-bold mb-2">VITA Tax Services</h3>
                <p className="text-yellow-100 mb-4">Free tax preparation for students</p>
                <div className="text-sm font-semibold">Try Demo →</div>
              </Link>

              <Link href="/demo/supersonic" className="bg-gradient-to-br from-pink-500 to-rose-700 rounded-xl p-8 text-white hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold mb-2">Supersonic Fast Cash</h3>
                <p className="text-pink-100 mb-4">Tax refund advances and financial services</p>
                <div className="text-sm font-semibold">Try Demo →</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Complete LMS Platform</h3>
                  <p className="text-sm text-gray-600">30+ programs, course management, student tracking</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Grant Autopilot System</h3>
                  <p className="text-sm text-gray-600">AI-powered grant writing with GPT-4</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Tax Services (VITA + Supersonic)</h3>
                  <p className="text-sm text-gray-600">Free tax prep and refund advance systems</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Partner Integrations</h3>
                  <p className="text-sm text-gray-600">HSI, Certiport, CareerSafe, EPS Financial</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Payment Processing</h3>
                  <p className="text-sm text-gray-600">Stripe integration for subscriptions and one-time payments</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Mobile-Ready Super App</h3>
                  <p className="text-sm text-gray-600">6 role-based sections, responsive design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedProduct.name}</h2>
                  <p className="text-gray-600">{selectedProduct.description}</p>
                </div>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  ${(selectedProduct.price / 1000).toFixed(0)}K
                </div>
                <div className="text-gray-600">One-time payment</div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">Included Features:</h3>
                <ul className="space-y-3">
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <Link 
                  href="/contact" 
                  className="flex-1 bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 text-center"
                >
                  Contact Sales
                </Link>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 bg-white text-gray-600 py-4 rounded-lg font-semibold hover:bg-gray-50 border-2 border-gray-300 text-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Copyright */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400 mb-2">
              © {new Date().getFullYear()} Elevate For Humanity. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Platform developed by Elizabeth Greene. Patent pending. Unauthorized reproduction prohibited.
            </p>
            <div className="mt-4 flex justify-center gap-6 text-sm">
              <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}