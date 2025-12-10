import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Business Startup & Marketing Training | Elevate For Humanity',
  description:
    'Turn your idea into a business in 5 weeks. $4,550. Learn digital marketing, business planning, and entrepreneurship.',
  alternates: {
    canonical:
      'https://www.elevateforhumanity.org/programs/business-startup-marketing',
  },
};

export default function BusinessStartupMarketingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Business Startup & Marketing
          </h1>
          <p className="text-xl">
            5 weeks to launch. Turn your idea into income.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xl text-slate-700 mb-6 leading-relaxed">
            You have an idea. Maybe it's a service you can offer, a product you
            want to sell, or a skill you want to monetize. But you don't know
            where to start.
          </p>
          <p className="text-lg text-slate-600 mb-6">
            Most businesses fail not because the idea was bad, but because the
            founder didn't know how to market it, price it, or reach customers.
            This program teaches you exactly that—the practical skills to launch
            and grow a real business.
          </p>
          <p className="text-lg text-slate-600">
            Whether you want to start a side hustle or build a full-time
            business, you'll learn digital marketing, social media, business
            planning, and how to get your first customers.
          </p>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Program Details
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                5 Weeks
              </div>
              <div className="text-slate-600">Part-time flexible</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                $4,550
              </div>
              <div className="text-slate-600">Total cost</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                Certified
              </div>
              <div className="text-slate-600">Business credential</div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg mb-6">
            <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Business planning and market research</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Legal structure (LLC, sole proprietor, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Pricing strategies and financial basics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Digital marketing and social media strategy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Facebook, Instagram, TikTok, LinkedIn marketing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Google Ads and SEO fundamentals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Email marketing and customer retention</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Building a website and online presence</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              Your Certification & Career Paths
            </h3>

            <div className="space-y-4 mb-6">
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                <p className="font-bold text-purple-900 mb-1">
                  📜 Business Startup & Marketing Certificate
                </p>
                <p className="text-purple-800 text-sm">
                  Industry-recognized credential in entrepreneurship and digital
                  marketing
                </p>
              </div>
            </div>

            <h4 className="font-bold text-lg mb-3">What You Can Do:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  Start Your Own Business:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Service business (cleaning, landscaping, etc.)</li>
                  <li>• E-commerce store</li>
                  <li>• Consulting or coaching</li>
                  <li>• Food truck or catering</li>
                  <li>• Online course or digital products</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  Get Hired in Marketing:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Social Media Manager ($40K-$60K)</li>
                  <li>• Digital Marketing Specialist</li>
                  <li>• Marketing Coordinator</li>
                  <li>• Content Creator</li>
                  <li>• SEO Specialist</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-900 mb-2">
                <strong>💡 Real Business Launch:</strong> You'll create an
                actual business plan, build a website, and launch your first
                marketing campaign during the program.
              </p>
              <p className="text-sm text-blue-900">
                <strong>💡 Ongoing Support:</strong> After graduation, you'll
                have access to mentorship and resources to help your business
                grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Choose Your Path
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* FREE */}
            <div className="bg-white border-2 border-green-500 rounded-xl p-8">
              <div className="text-3xl font-bold text-green-700 mb-4">
                100% FREE
              </div>
              <p className="text-lg mb-4">
                If you qualify for government funding through:
              </p>
              <ul className="space-y-2 mb-6 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>
                    <strong>WRG</strong> - Workforce Ready Grant (Indiana
                    residents)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>
                    <strong>WIOA</strong> - Workforce Innovation
                    (unemployed/underemployed)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>
                    <strong>Other grants</strong> - We help you apply
                  </span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all"
              >
                Apply for Free Training
              </Link>
            </div>

            {/* PAID */}
            <div className="bg-white border-2 border-blue-500 rounded-xl p-8">
              <div className="text-3xl font-bold text-blue-700 mb-4">
                $4,550
              </div>
              <p className="text-lg mb-4">
                Don't qualify for free training? Pay directly and start
                immediately.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  💳 Flexible Payment Options:
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Split into payments with Affirm, Klarna, Afterpay</li>
                  <li>• PayPal, Venmo, Cash App Pay</li>
                  <li>• Credit/Debit cards</li>
                  <li>• ACH bank transfer</li>
                </ul>
              </div>
              <Link
                href="/enroll-simple"
                className="block w-full text-center px-6 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
              >
                Pay $4,550 Now
              </Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-600 mb-2">
              Not sure which option is right for you?
            </p>
            <p className="text-lg">
              Call us at{' '}
              <a
                href="tel:3173143757"
                className="text-orange-600 font-bold hover:text-orange-700"
              >
                317-314-3757
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
