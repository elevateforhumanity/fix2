import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { STORE_PRODUCTS } from '@/app/data/store-products';
import { Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/platform',
  },
  title: 'Platform Licenses | Elevate For Humanity',
  description:
    'Deploy the complete Elevate workforce development platform. Choose from single-site, school, or enterprise licenses.',
};

export default function PlatformStorePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Platform Licenses"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Deploy Your Own Workforce Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Licensed platform access with modular apps. Built for training
            providers, schools, and workforce agencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#licenses"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              View Licenses
            </Link>
            <Link
              href="/platform/apps"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Explore Apps
            </Link>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              What You're Buying
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This is not a theme. It's a licensed platform with modular apps,
              deployment rights, and post-purchase onboarding.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🏗️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Licensed Platform
              </h3>
              <p className="text-gray-600">
                Deploy on your domain with your branding. Full source code
                access with deployment rights.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">🧩</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Modular Apps
              </h3>
              <p className="text-gray-600">
                Enable only the apps you need. LMS, enrollment, payments, case
                management, and more.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Onboarding Support
              </h3>
              <p className="text-gray-600">
                Post-purchase checklist, setup guides, and technical support to
                get you live fast.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* License Tiers */}
      <section id="licenses" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Choose Your License
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every license includes apps, updates, and support. Scale as you
              grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STORE_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                  product.licenseType === 'school' ? 'ring-2 ring-blue-600' : ''
                }`}
              >
                {product.licenseType === 'school' && (
                  <div className="bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 min-h-[60px]">
                    {product.description}
                  </p>

                  <div className="mb-6">
                    <div className="text-4xl font-bold text-gray-900">
                      ${product.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {product.billingType === 'one_time'
                        ? 'One-time payment'
                        : 'Per month'}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-semibold text-gray-700 mb-2">
                      {product.appsIncluded.length} Apps Included:
                    </div>
                    <ul className="space-y-2">
                      {product.appsIncluded.slice(0, 4).map((app) => (
                        <li
                          key={app}
                          className="flex items-start text-sm text-gray-600"
                        >
                          <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{app}</span>
                        </li>
                      ))}
                      {product.appsIncluded.length > 4 && (
                        <li className="text-sm text-gray-500">
                          + {product.appsIncluded.length - 4} more
                        </li>
                      )}
                    </ul>
                  </div>

                  <Link
                    href={`/platform/${product.slug}`}
                    className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                      product.licenseType === 'school'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {product.requiresApproval
                      ? 'Request Access'
                      : 'View Details'}
                    <ArrowRight className="inline-block ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
            Who This Is For
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Training Providers
              </h3>
              <p className="text-gray-600 mb-4">
                Launch workforce programs with enrollment, LMS, and payment
                processing built-in.
              </p>
              <p className="text-sm text-gray-500">
                Best fit: <strong>Core Platform</strong> or{' '}
                <strong>School License</strong>
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Workforce Boards
              </h3>
              <p className="text-gray-600 mb-4">
                Manage WIOA contracts, track outcomes, and report compliance
                across multiple providers.
              </p>
              <p className="text-sm text-gray-500">
                Best fit: <strong>School License</strong> or{' '}
                <strong>Enterprise</strong>
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Community Colleges
              </h3>
              <p className="text-gray-600 mb-4">
                White-label platform for continuing education, workforce
                training, and non-credit programs.
              </p>
              <p className="text-sm text-gray-500">
                Best fit: <strong>School License</strong> or{' '}
                <strong>Enterprise</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Deploy Your Platform?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Choose a license, complete checkout, and get onboarding support to
            launch your workforce programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#licenses"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              View Licenses
            </Link>
            <Link
              href="/contact"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors border-2 border-white"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
