import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Heart, Download, Share2 } from 'lucide-react';

export default function DonateSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [donation, setDonation] = useState<any>(null);

  useEffect(() => {
    const fetchDonationDetails = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        // Call Netlify function to fetch Stripe session details
        const response = await fetch(
          `/.netlify/functions/stripe-webhook?session_id=${sessionId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch donation details');
        }

        const data = await response.json();

        setDonation({
          amount: data.amount_total ? data.amount_total / 100 : 100,
          type: data.mode === 'subscription' ? 'monthly' : 'one-time',
          date: new Date().toLocaleDateString(),
          email: data.customer_email,
          receiptUrl: data.receipt_url,
        });
      } catch (error) {
        console.error('Error fetching donation details:', error);
        // Fallback to default values
        setDonation({
          amount: 100,
          type: 'one-time',
          date: new Date().toLocaleDateString(),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDonationDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-brand-text-muted">Processing your donation...</p>
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
            <h1 className="text-4xl font-bold text-brand-text mb-4">
              Thank You for Your Generosity!
            </h1>
            <p className="text-xl text-brand-text-muted mb-8">
              Your donation will help transform lives through education and
              workforce development.
            </p>
          </div>
          {/* Donation Details */}
          {donation && (
            <div className="bg-brand-surface rounded-xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <div className="text-sm text-brand-text-light mb-1">
                    Donation Amount
                  </div>
                  <div className="text-2xl font-bold text-brand-info">
                    ${donation.amount}
                    {donation.type === 'monthly' && (
                      <span className="text-base">/month</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-brand-text-light mb-1">
                    Donation Type
                  </div>
                  <div className="text-lg font-semibold text-brand-text capitalize">
                    {donation.type === 'monthly'
                      ? 'Monthly Recurring'
                      : 'One-Time'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-brand-text-light mb-1">Date</div>
                  <div className="text-lg font-semibold text-brand-text">
                    {donation.date}
                  </div>
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
                <span className="text-brand-text">
                  <strong>Email Receipt:</strong> You'll receive a
                  tax-deductible receipt via email within 24 hours.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-brand-text">
                  <strong>Impact Report:</strong> We'll send quarterly updates
                  showing how your donation is making a difference.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-brand-text">
                  <strong>Student Stories:</strong> Hear directly from students
                  whose lives you're helping transform.
                </span>
              </li>
              {donation?.type === 'monthly' && (
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-brand-text">
                    <strong>Monthly Giving:</strong> Your card will be charged
                    automatically each month. You can cancel anytime.
                  </span>
                </li>
              )}
            </ul>
          </div>
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center gap-2 bg-brand-info text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-info-hover transition-colors">
              <Download className="w-5 h-5" />
              Download Receipt
            </button>
            <button className="flex items-center justify-center gap-2 bg-brand-surface-dark text-brand-text py-3 px-6 rounded-lg font-semibold hover:bg-brand-border transition-colors">
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
                  <div className="text-3xl font-bold mb-2">
                    {Math.floor((donation?.amount || 0) / 50)}
                  </div>
                  <div>Students with books</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-2">
                    {Math.floor((donation?.amount || 0) / 100)}
                  </div>
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
              className="bg-white text-brand-text py-3 px-6 rounded-lg font-semibold hover:bg-brand-surface transition-colors border-2 border-brand-border"
            >
              Return Home
            </Link>
            <Link
              to="/programs"
              className="bg-brand-info text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-info-hover transition-colors"
            >
              Explore Programs
            </Link>
            <Link
              to="/volunteer"
              className="bg-brand-secondary text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-secondary-hover transition-colors"
            >
              Volunteer With Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
