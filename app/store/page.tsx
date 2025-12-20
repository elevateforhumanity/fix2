import { Metadata } from 'next';
import Link from 'next/link';
import { Check, Download, FileText, BookOpen, Gift } from 'lucide-react';
import { DIGITAL_PRODUCTS } from '@/lib/store/digital-products';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/store',
  },
  title: 'Digital Store | Elevate for Humanity',
  description:
    'Practical tools, guides, and resources for workforce training, business launch, and career development. Instant digital delivery.',
};

const categoryIcons = {
  toolkit: FileText,
  guide: BookOpen,
  course: BookOpen,
  template: FileText,
  donation: Gift,
};

export default function StorePage() {
  const featuredProducts = DIGITAL_PRODUCTS.filter((p) => p.featured);

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Digital Resources & Tools
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
            Practical tools, guides, and resources available instantly. No login
            required.
          </p>
        </div>

        {/* Featured Products */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProducts.map((product) => {
            const Icon = categoryIcons[product.category];

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icon className="text-brand-orange-600" size={24} />
                  </div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                    {product.category}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  {product.name}
                </h2>

                <p className="text-slate-600 mb-6">{product.description}</p>

                <ul className="space-y-2 mb-6">
                  {product.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check
                        className="text-brand-green-600 flex-shrink-0 mt-0.5"
                        size={16}
                      />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                  {product.features.length > 4 && (
                    <li className="text-sm text-slate-500 ml-6">
                      +{product.features.length - 4} more
                    </li>
                  )}
                </ul>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-3xl font-bold text-slate-900">
                    {product.priceDisplay}
                  </div>
                  {product.deliveryType === 'download' && product.fileSize && (
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Download size={16} />
                      {product.fileSize}
                    </div>
                  )}
                </div>

                <Link
                  href={`/store/checkout/${product.slug}`}
                  className="block w-full text-center bg-brand-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-orange-600 transition"
                >
                  {product.category === 'donation' ? 'Donate Now' : 'Buy Now'}
                </Link>

                <p className="text-xs text-slate-500 text-center mt-3">
                  Instant digital delivery • No login required
                </p>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Why Buy Digital Products?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-slate-700">
            <div>
              <h3 className="font-bold mb-2">✅ Instant Access</h3>
              <p className="text-sm">
                Download immediately after purchase. No waiting.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">✅ No Login Required</h3>
              <p className="text-sm">Quick checkout. No account needed.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">✅ Lifetime Access</h3>
              <p className="text-sm">Download as many times as you need.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">✅ Secure Payment</h3>
              <p className="text-sm">Processed securely through Stripe.</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              <strong>Looking for full training programs?</strong> Check out our{' '}
              <Link
                href="/pricing"
                className="text-brand-orange-600 font-semibold hover:underline"
              >
                Platform Access
              </Link>{' '}
              for complete LMS access, courses, and certifications.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Questions About Our Products?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-slate-800 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
