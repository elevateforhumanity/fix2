import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Heart, Download, Share2 } from 'lucide-react';

export default function DonateSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [donation, setDonation] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      // TODO: Fetch donation details from Stripe
      // For now, show success message
      setLoading(false);
      setDonation({
        amount: 100,
        type: 'one-time',
        date: new Date().toLocaleDateString(),
      });
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your donation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Message */}
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Thank You for Your Generosity!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your donation will help transform lives through education and workforce development.
            </p>
          </div>

          {/* Donation Details */}
          {donation && (
            <div className="bg-gray-50 rounded-xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Donation Amount</div>
                  <div className="text-2xl font-bold text-blue-600">
                    ${donation.amount}
                    {donation.type === 'monthly' && <span className="text-base">/month</span>}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Donation Type</div>
                  <div className="text-lg font-semibold text-gray-900 capitalize">
                    {donation.type === 'monthly' ? 'Monthly Recurring' : 'One-Time'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Date</div>
                  <div className="text-lg font-semibold text-gray-900">{donation.date}</div>
                </div>
              </div>
            </div>
          )}

          {/* What Happens Next */}
          <div className="text-left mb-8">
            <h2 className="text-2xl font-bold mb-4">What Happens Next?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Email Receipt:</strong> You'll receive a tax-deductible receipt via email within 24 hours.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Impact Report:</strong> We'll send quarterly updates showing how your donation is making a difference.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Student Stories:</strong> Hear directly from students whose lives you're helping transform.
                </span>
              </li>
              {donation?.type === 'monthly' && (
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <strong>Monthly Giving:</strong> Your card will be charged automatically each month. You can cancel anytime.
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              <Download className="w-5 h-5" />
              Download Receipt
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              <Share2 className="w-5 h-5" />
              Share Your Impact
            </button>
          </div>
        </div>

        {/* Your Impact */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <Heart className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Your Impact</h2>
          <p className="text-xl mb-6">
            Your ${donation?.amount} donation will help provide:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {donation?.amount >= 5000 ? (
              <>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-2">1</div>
                  <div>Full-ride scholarship</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-2">10</div>
                  <div>Emergency assistance grants</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-2">50</div>
                  <div>Students with books</div>
                </div>
              </>
            ) : donation?.amount >= 2500 ? (
              <>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-2">1</div>
                  <div>Partial scholarship</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-2">5</div>
                  <div>Emergency assistance grants</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-2">25</div>
                  <div>Students with books</div>
                </div>
              </>
            ) : donation?.amount >= 500 ? (
              <>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-2">1</div>
                  <div>Emergency assistance grant</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-2">5</div>
                  <div>Students with transportation</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-2">10</div>
                  <div>Students with books</div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-2">{Math.floor((donation?.amount || 0) / 50)}</div>
                  <div>Students with books</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-2">{Math.floor((donation?.amount || 0) / 100)}</div>
                  <div>Months of transportation</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-2">∞</div>
                  <div>Lives changed</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-6">Continue Your Journey</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-white text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-gray-200"
            >
              Return Home
            </Link>
            <Link
              to="/programs"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Explore Programs
            </Link>
            <Link
              to="/volunteer"
              className="bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Volunteer With Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
