import { useState } from 'react';
import { DollarSign, Heart, Users, GraduationCap, Gift } from 'lucide-react';

export default function Donate() {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>(
    'one-time'
  );
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  const donationLevels = {
    'one-time': [
      { amount: 50, label: '$50', description: 'Books for 1 student' },
      { amount: 100, label: '$100', description: 'Transportation for 1 month' },
      { amount: 500, label: '$500', description: 'Emergency assistance grant' },
      { amount: 2500, label: '$2,500', description: 'Partial scholarship' },
      { amount: 5000, label: '$5,000', description: 'Full-ride scholarship' },
      { amount: 10000, label: '$10,000', description: 'Named scholarship' },
    ],
    monthly: [
      { amount: 25, label: '$25/mo', description: 'Sustainer' },
      { amount: 50, label: '$50/mo', description: 'Supporter' },
      { amount: 100, label: '$100/mo', description: 'Champion' },
      { amount: 250, label: '$250/mo', description: 'Benefactor' },
    ],
  };

  const handleDonate = async () => {
    const finalAmount = amount || parseFloat(customAmount);

    if (!finalAmount || finalAmount < 5) {
      alert('Please select or enter a donation amount of at least $5');
      return;
    }

    try {
      // Create Stripe Checkout session
      const response = await fetch(
        '/.netlify/functions/create-donation-session',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: finalAmount,
            type: donationType,
            donor_name: '', // Can add form fields for this
            donor_email: '', // Can add form fields for this
          }),
        }
      );

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Donation error:', error);
      alert('Failed to process donation. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">
            Support Selfish Inc Foundation
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Your donation provides scholarships, emergency assistance, and
            community support to students transforming their lives through
            workforce development.
          </p>
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-4xl font-bold">$2.5M+</div>
              <div className="text-blue-100">Scholarships Awarded</div>
            </div>
            <div>
              <div className="text-4xl font-bold">1,200+</div>
              <div className="text-blue-100">Students Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold">92%</div>
              <div className="text-blue-100">Job Placement Rate</div>
            </div>
          </div>
        </div>
      </div>
      {/* Donation Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Donation Type Toggle */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setDonationType('one-time')}
              className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all ${
                donationType === 'one-time'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              One-Time Donation
            </button>
            <button
              onClick={() => setDonationType('monthly')}
              className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all ${
                donationType === 'monthly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Monthly Giving
            </button>
          </div>
          {/* Donation Levels */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {donationLevels[donationType].map((level) => (
              <button
                key={level.amount}
                onClick={() => {
                  setAmount(level.amount);
                  setCustomAmount('');
                }}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  amount === level.amount
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {level.label}
                </div>
                <div className="text-sm text-gray-600">{level.description}</div>
              </button>
            ))}
          </div>
          {/* Custom Amount */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or enter a custom amount:
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                min="5"
                step="1"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount(null);
                }}
                placeholder="Enter amount"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none text-lg"
              />
            </div>
          </div>
          {/* Donate Button */}
          <button
            onClick={handleDonate}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
          >
            Donate {amount || customAmount ? `$${amount || customAmount}` : ''}{' '}
            {donationType === 'monthly' ? 'Monthly' : 'Now'}
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">
            Selfish Inc Foundation is a 501(c)(3) nonprofit. Your donation is
            tax-deductible.
          </p>
        </div>
      </div>
      {/* Impact Stories */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Your Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <GraduationCap className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Scholarships</h3>
              <p className="text-gray-600 mb-4">
                Full-ride and partial scholarships cover tuition, books,
                transportation, and childcare for students who couldn't
                otherwise afford training.
              </p>
              <div className="text-2xl font-bold text-blue-600">$500K/year</div>
              <div className="text-sm text-gray-500">
                200 students supported
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Heart className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Emergency Assistance</h3>
              <p className="text-gray-600 mb-4">
                Emergency grants help students facing crisis situations stay
                enrolled and complete their training programs.
              </p>
              <div className="text-2xl font-bold text-purple-600">
                $250K/year
              </div>
              <div className="text-sm text-gray-500">500 families helped</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Community Hubs</h3>
              <p className="text-gray-600 mb-4">
                Community hubs provide training space, computer labs, food
                pantry, and support services in underserved neighborhoods.
              </p>
              <div className="text-2xl font-bold text-green-600">
                $150K/year
              </div>
              <div className="text-sm text-gray-500">
                10,000 visitors annually
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Other Ways to Give */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Other Ways to Give
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-100">
            <Gift className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Corporate Sponsorships</h3>
            <p className="text-gray-600 mb-6">
              Partner with us to support workforce development and gain access
              to our talent pipeline.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Founding Partner: $50K+ (named scholarship program)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Premier Partner: $25K-49K (logo on website)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Supporting Partner: $10K-24K (event invitations)</span>
              </li>
            </ul>
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Become a Sponsor
            </a>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-100">
            <Heart className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Legacy Giving</h3>
            <p className="text-gray-600 mb-6">
              Create a lasting impact through planned giving, bequests, or
              endowments.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Named endowment scholarships</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Bequests in your will or trust</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Retirement account beneficiary designation</span>
              </li>
            </ul>
            <a
              href="/contact"
              className="inline-block bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      {/* Tax Information */}
      <div className="bg-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Tax-Deductible Donations</h3>
          <p className="text-gray-700 mb-4">
            Selfish Inc Foundation is a 501(c)(3) nonprofit organization. Your
            donation is tax-deductible to the fullest extent allowed by law.
          </p>
          <p className="text-sm text-gray-600">
            EIN: [To be provided] | Questions? Email: finance@selfishinc.org
          </p>
        </div>
      </div>
    </div>
  );
}
