import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import PaymentButton from '@/components/PaymentButton';
import { CheckCircle, Shield, Clock, Award } from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const supabase = await createClient();
  const { data: program } = await supabase
    .from('programs')
    .select('name')
    .eq('slug', params.slug)
    .single();

  return {
    title: `Enroll in ${program?.name || 'Program'} | Elevate for Humanity`,
    description: `Complete your enrollment and payment for ${program?.name || 'this program'}`,
  };
}

export default async function ProgramEnrollPage({ params }: PageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/programs/${params.slug}/enroll`);
  }

  // Get program details
  const { data: program } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!program) {
    notFound();
  }

  // Check if already enrolled
  const { data: existingEnrollment } = await supabase
    .from('enrollments')
    .select('*')
    .eq('student_id', user.id)
    .eq('program_id', program.id)
    .single();

  if (existingEnrollment) {
    redirect('/student/dashboard');
  }

  const price = program.tuition || 0;
  const monthlyPayment = price >= 500 ? Math.ceil(price / 4) : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link
            href={`/programs/${params.slug}`}
            className="text-blue-600 hover:text-blue-700 font-semibold mb-4 inline-block"
          >
            ← Back to Program
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">
            Complete Your Enrollment
          </h1>
          <p className="text-slate-600 mt-1">{program.name}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Program Summary */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Program Summary
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-slate-600">Program</span>
                  <span className="font-semibold text-slate-900">
                    {program.name}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-semibold text-slate-900">
                    {program.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-slate-600">Total Hours</span>
                  <span className="font-semibold text-slate-900">
                    {program.total_hours} hours
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-600">Credential</span>
                  <span className="font-semibold text-slate-900">
                    {program.credential}
                  </span>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What's Included
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    All course materials and textbooks
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    Hands-on training with industry equipment
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    Industry certification exam preparation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    Career services and job placement assistance
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    Student support services
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    Access to online learning platform
                  </span>
                </li>
              </ul>
            </div>

            {/* Payment Security */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Secure Payment
                  </h3>
                  <p className="text-blue-800 text-sm">
                    Your payment is processed securely through Stripe. We never
                    store your payment information. All transactions are
                    encrypted and PCI-compliant.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border sticky top-6">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Payment Options
                </h2>
                <p className="text-sm text-slate-600">
                  Choose how you'd like to pay
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Full Payment */}
                <div className="border-2 border-slate-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-900">
                      Pay in Full
                    </h3>
                    <span className="text-2xl font-bold text-slate-900">
                      ${price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    One-time payment
                  </p>
                  <PaymentButton
                    programId={program.id}
                    programName={program.name}
                    price={price}
                    paymentType="full"
                    fullWidth
                  />
                </div>

                {/* Payment Plan */}
                {price >= 500 && (
                  <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          Payment Plan
                        </h3>
                        <p className="text-xs text-blue-700">Most Popular</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-900">
                          ${monthlyPayment.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-600">/month × 4</div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      Split into 4 monthly payments
                    </p>
                    <PaymentButton
                      programId={program.id}
                      programName={program.name}
                      price={price}
                      paymentType="plan"
                      fullWidth
                    />
                  </div>
                )}

                {/* Financing Options */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 mb-3">
                    Financing Available
                  </h3>
                  <div className="space-y-2 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>
                        <strong>Affirm:</strong> 3, 6, or 12 months
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>
                        <strong>Klarna:</strong> 4 interest-free payments
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>
                        <strong>Afterpay:</strong> 4 interest-free payments
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-3">
                    Select your preferred financing option at checkout
                  </p>
                </div>

                {/* Free Programs */}
                {price === 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">
                      100% Free Training
                    </h3>
                    <p className="text-sm text-green-800 mb-4">
                      This program is fully funded. No payment required!
                    </p>
                    <Link
                      href="/apply"
                      className="block w-full text-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
                    >
                      Complete Application
                    </Link>
                  </div>
                )}

                {/* Additional Info */}
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Start date will be confirmed after enrollment</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Certificate issued upon successful completion</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t bg-slate-50">
                <p className="text-xs text-slate-600 text-center">
                  By enrolling, you agree to our{' '}
                  <Link
                    href="/terms"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/refund-policy"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Refund Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
