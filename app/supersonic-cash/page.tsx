'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { 
  Zap, DollarSign, Clock, Shield, CheckCircle, ArrowRight,
  CreditCard, Calendar, TrendingUp, Award, AlertCircle
} from 'lucide-react';
import Image from 'next/image';

export default function SupersonicCashPage() {
  const router = useRouter();
  const [loanAmount, setLoanAmount] = useState(500);

  useEffect(() => {
    // Google Analytics page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Supersonic Cash Advance',
        page_location: window.location.href,
        page_path: '/supersonic-cash',
      });
    }
  }, []);

  const calculateFee = (amount: number) => {
    // Similar to H&R Block: $0 fee for advances under $1000
    if (amount <= 1000) return 0;
    // Small fee for larger amounts
    return Math.round(amount * 0.03); // 3% fee
  };

  const fee = calculateFee(loanAmount);
  const totalRepayment = loanAmount + fee;

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Supersonic Cash Advance",
    "description": "Fast cash advance up to $3,500 with no credit check. Approved in minutes, repaid from paycheck.",
    "provider": {
      "@type": "Organization",
      "name": "Elevate for Humanity",
      "url": "https://elevateforhumanity.org",
      "logo": "https://elevateforhumanity.org/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-317-314-3757",
        "contactType": "Customer Service",
        "areaServed": "US",
        "availableLanguage": ["English", "Spanish"]
      }
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://elevateforhumanity.org/supersonic-cash/apply"
    },
    "feesAndCommissionsSpecification": "No fee for advances under $1,000. 3% fee for advances over $1,000.",
    "interestRate": "0%",
    "loanTerm": "14-30 days",
    "amount": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "minValue": "100",
      "maxValue": "3500"
    }
  };

  return (
    <>
      {/* Structured Data */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Google Analytics Event Tracking */}
      <Script id="ga-events" strategy="afterInteractive">
        {`
          function trackCashAdvanceEvent(action, label, value) {
            if (typeof gtag !== 'undefined') {
              gtag('event', action, {
                event_category: 'Supersonic Cash',
                event_label: label,
                value: value
              });
            }
          }
        `}
      </Script>

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">Lightning Fast Approval</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                Supersonic Cash Advance
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Get up to $3,500 in minutes. No credit check. No hidden fees. Repaid from your next paycheck or training stipend.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push('/supersonic-cash/apply')}
                  className="inline-flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all font-bold text-lg shadow-xl"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center space-x-2 bg-blue-700 text-white px-8 py-4 rounded-xl hover:bg-blue-800 transition-all font-bold text-lg"
                >
                  <span>How It Works</span>
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Quick Calculator</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">How much do you need?</label>
                    <input
                      type="range"
                      min="100"
                      max="3500"
                      step="50"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                      className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm mt-2">
                      <span>$100</span>
                      <span className="text-2xl font-bold">${loanAmount}</span>
                      <span>$3,500</span>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Advance Amount:</span>
                      <span className="font-bold">${loanAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fee:</span>
                      <span className="font-bold">${fee}</span>
                    </div>
                    <div className="border-t border-white/20 pt-2 flex justify-between text-lg">
                      <span className="font-bold">Total Repayment:</span>
                      <span className="font-bold">${totalRepayment}</span>
                    </div>
                  </div>
                  <div className="text-sm text-blue-100">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    {fee === 0 ? 'No fee for advances under $1,000!' : 'Low 3% fee'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Why Choose Supersonic Cash?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Inspired by H&R Block's trusted model, designed for students and workers
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <BenefitCard
              icon={<Zap className="w-12 h-12 text-yellow-500" />}
              title="Instant Approval"
              description="Get approved in minutes, not days. Money in your account within 24 hours."
            />
            <BenefitCard
              icon={<Shield className="w-12 h-12 text-green-500" />}
              title="No Credit Check"
              description="Bad credit? No credit? No problem. We approve based on your income, not your score."
            />
            <BenefitCard
              icon={<DollarSign className="w-12 h-12 text-blue-500" />}
              title="Low Fees"
              description="$0 fee for advances under $1,000. Only 3% for larger amounts. No hidden charges."
            />
            <BenefitCard
              icon={<Clock className="w-12 h-12 text-purple-500" />}
              title="Flexible Repayment"
              description="Automatically repaid from your next paycheck or training stipend. No stress."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get cash in 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Apply Online"
              description="Fill out our quick 2-minute application. No paperwork, no hassle."
              icon={<CreditCard className="w-8 h-8" />}
            />
            <StepCard
              number="2"
              title="Get Approved"
              description="Instant decision. We verify your income and approve you on the spot."
              icon={<CheckCircle className="w-8 h-8" />}
            />
            <StepCard
              number="3"
              title="Receive Cash"
              description="Money deposited directly to your bank account within 24 hours."
              icon={<DollarSign className="w-8 h-8" />}
            />
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Who Qualifies?</h2>
              <div className="space-y-4">
                <EligibilityItem text="Currently enrolled in Elevate for Humanity programs" />
                <EligibilityItem text="Receiving training stipend or have regular income" />
                <EligibilityItem text="Active bank account for direct deposit" />
                <EligibilityItem text="18+ years old with valid ID" />
                <EligibilityItem text="U.S. citizen or permanent resident" />
              </div>
              <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">Special for Students</h3>
                    <p className="text-blue-800">
                      If you're in our apprenticeship program earning $15-18/hour, you automatically qualify for up to $2,000!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6">Advance Amounts</h3>
              <div className="space-y-6">
                <AmountTier
                  title="Quick Cash"
                  amount="$100 - $500"
                  description="Perfect for emergencies"
                  fee="$0 fee"
                />
                <AmountTier
                  title="Standard"
                  amount="$500 - $1,000"
                  description="Cover bills and expenses"
                  fee="$0 fee"
                />
                <AmountTier
                  title="Max Advance"
                  amount="$1,000 - $3,500"
                  description="Major expenses covered"
                  fee="3% fee"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison to H&R Block */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Inspired by the Best</h2>
            <p className="text-xl text-gray-600">
              We modeled our system after H&R Block's trusted tax refund advance program
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">H&R Block</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">Supersonic Cash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <ComparisonRow
                    feature="Maximum Amount"
                    hrBlock="$3,500"
                    supersonic="$3,500"
                    highlight={true}
                  />
                  <ComparisonRow
                    feature="Approval Time"
                    hrBlock="Same day"
                    supersonic="Minutes"
                    highlight={true}
                  />
                  <ComparisonRow
                    feature="Credit Check"
                    hrBlock="No"
                    supersonic="No"
                    highlight={true}
                  />
                  <ComparisonRow
                    feature="Fee (under $1,000)"
                    hrBlock="$0"
                    supersonic="$0"
                    highlight={true}
                  />
                  <ComparisonRow
                    feature="Fee (over $1,000)"
                    hrBlock="Varies"
                    supersonic="3%"
                    highlight={false}
                  />
                  <ComparisonRow
                    feature="Repayment"
                    hrBlock="From tax refund"
                    supersonic="From paycheck/stipend"
                    highlight={false}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <FAQItem
              question="How fast can I get the money?"
              answer="Most approvals happen within minutes. Once approved, funds are deposited to your bank account within 24 hours, often same-day."
            />
            <FAQItem
              question="What if I have bad credit?"
              answer="No problem! We don't check credit scores. We approve based on your current income (training stipend, wages, etc.), not your credit history."
            />
            <FAQItem
              question="How is it repaid?"
              answer="Automatically deducted from your next paycheck or training stipend. You choose the repayment date during application. No manual payments needed."
            />
            <FAQItem
              question="Are there hidden fees?"
              answer="Absolutely not. $0 fee for advances under $1,000. Only 3% for larger amounts. No interest, no late fees, no surprises."
            />
            <FAQItem
              question="Can I get another advance?"
              answer="Yes! Once your first advance is repaid, you can apply again immediately. Many students use this regularly for emergencies."
            />
            <FAQItem
              question="What can I use it for?"
              answer="Anything! Rent, car repairs, medical bills, groceries, utilities—it's your money to use however you need."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-4xl font-extrabold mb-6">Ready to Get Cash Now?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who've used Supersonic Cash for emergencies and expenses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/supersonic-cash/apply')}
              className="inline-flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all font-bold text-lg shadow-xl"
            >
              <span>Apply Now - 2 Minutes</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => router.push('/contact')}
              className="inline-flex items-center justify-center space-x-2 bg-blue-700 text-white px-8 py-4 rounded-xl hover:bg-blue-800 transition-all font-bold text-lg"
            >
              <span>Questions? Call (317) 314-3757</span>
            </button>
          </div>
          <p className="text-sm text-blue-200 mt-6">
            * Subject to approval. Terms and conditions apply. Repayment required from next income.
          </p>
        </div>
      </section>
    </div>
  );
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 text-center mb-3">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description, icon }: { number: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="relative bg-white rounded-xl p-8 shadow-lg">
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
        {number}
      </div>
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function EligibilityItem({ text }: { text: string }) {
  return (
    <div className="flex items-start space-x-3">
      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
      <span className="text-lg text-gray-700">{text}</span>
    </div>
  );
}

function AmountTier({ title, amount, description, fee }: { title: string; amount: string; description: string; fee: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <div className="text-3xl font-extrabold mb-2">{amount}</div>
      <p className="text-blue-100 mb-3">{description}</p>
      <div className="inline-block bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
        {fee}
      </div>
    </div>
  );
}

function ComparisonRow({ feature, hrBlock, supersonic, highlight }: { feature: string; hrBlock: string; supersonic: string; highlight: boolean }) {
  return (
    <tr className={highlight ? 'bg-blue-50' : ''}>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">{feature}</td>
      <td className="px-6 py-4 text-sm text-gray-600 text-center">{hrBlock}</td>
      <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-center">{supersonic}</td>
    </tr>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-bold text-gray-900 mb-3">{question}</h3>
      <p className="text-gray-600 leading-relaxed">{answer}</p>
    </div>
  );
}
