'use client';

import type { Program } from "@/app/data/programs";
import AffirmCheckout from "@/components/payments/AffirmCheckout";
import { useState } from "react";

export function ProgramDetails({ program }: { program: Program }) {
  const [showAffirmPayment, setShowAffirmPayment] = useState(false);
  const isBarberProgram = program.slug === 'barber-apprenticeship';
  const programPrice = 2500; // Barber program price

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="grid gap-10 md:grid-cols-[2fr,1fr]">
        <div>
          <h2 className="text-xl font-bold text-slate-900">What You&apos;ll Learn</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {program.whatYouLearn?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
            Program Highlights
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {program.highlights?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
            Is This Program For You?
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {program.requirements?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className="space-y-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-800 ring-1 ring-slate-200">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Tuition & Funding
            </h3>
            <p className="mt-2 text-sm text-slate-800">Most students qualify for 100% free training</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-700">
              {program.fundingOptions?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              How to Apply
            </h4>
            <ol className="mt-2 space-y-2 text-xs text-slate-700">
              <li className="flex gap-2">
                <span className="font-semibold text-orange-600">1.</span>
                <span>Visit <strong>Indiana Career Connect</strong> to create your profile and browse approved training programs</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-orange-600">2.</span>
                <span>Schedule an appointment with your local <strong>WorkOne center</strong> to discuss funding options (WIOA, ETPL, etc.)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-orange-600">3.</span>
                <span>Your WorkOne career coach will help you apply for funding and connect with training providers</span>
              </li>
            </ol>
            <div className="mt-4 space-y-2">
              <a
                href={program.ctaPrimary.href}
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-orange-600 w-full"
              >
                {program.ctaPrimary.label} →
              </a>
              
              {isBarberProgram && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-xs font-semibold text-green-900">
                        Earn While You Learn
                      </p>
                      <p className="text-xs text-green-800 mt-1">
                        This is a Registered Apprenticeship - you'll work in a real barbershop and get paid while completing your training hours.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className="mt-3 text-[10px] text-slate-500">
              💡 Most training is 100% funded through WIOA or workforce grants. Your WorkOne coach will help you navigate the process.
            </p>
          </div>

          {isBarberProgram && (
            <div className="border-t border-slate-200 pt-4 mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-3">
                💳 Alternative: Self-Pay with Financing
              </h4>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                <div className="flex items-start gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-blue-900 mb-1">
                      Can't Wait for Funding? Pay Over Time with Affirm
                    </p>
                    <p className="text-xs text-blue-800">
                      Start training immediately and split your payment into easy monthly installments with 0% APR options available.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs text-blue-800 mt-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Pay in 4</strong> interest-free payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Or <strong>0% APR</strong> for 3-24 months</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>As low as <strong>$104/month</strong> for 24 months</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Instant approval • No hidden fees</span>
                  </div>
                </div>
              </div>

              {!showAffirmPayment ? (
                <button
                  onClick={() => setShowAffirmPayment(true)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Finance with Affirm
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-gray-700">Program Cost:</span>
                      <span className="text-lg font-bold text-gray-900">${programPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Choose your payment plan during checkout
                    </p>
                  </div>
                  
                  <AffirmCheckout
                    amount={programPrice}
                    courseId={program.slug}
                    courseName={program.name}
                    className="w-full"
                    onSuccess={(transactionId) => {
                      console.log('Payment successful:', transactionId);
                    }}
                    onError={(error) => {
                      console.error('Payment error:', error);
                    }}
                  />
                  
                  <button
                    onClick={() => setShowAffirmPayment(false)}
                    className="w-full text-xs text-gray-600 hover:text-gray-900 underline"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div className="mt-3 bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="text-xs font-bold text-purple-900">
                    Premium Adaptive Checkout™
                  </p>
                </div>
                <p className="text-xs text-gray-700 mb-2">
                  <strong>Flexible Payment Options:</strong>
                </p>
                <ul className="text-xs text-gray-600 space-y-1 pl-4 list-disc">
                  <li><strong>Pay in 4:</strong> Split into 4 interest-free payments</li>
                  <li><strong>Monthly:</strong> 3-24 months at 0% APR (qualified buyers)</li>
                  <li><strong>Extended:</strong> Up to 36 months with low rates</li>
                </ul>
                <div className="mt-2 pt-2 border-t border-purple-200">
                  <p className="text-xs text-gray-600">
                    <strong>How it works:</strong> Click "Finance with Affirm" → Get instant approval → Choose your plan → Start training today
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * Payment plans subject to credit approval. 0% APR for 3-24 months available for qualified buyers.
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
