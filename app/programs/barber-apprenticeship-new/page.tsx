import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Clock, DollarSign, Award, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Barber Apprenticeship - Earn While You Learn',
  description: 'Become a licensed barber while you work and earn. Train in a real shop, complete required theory, and log hours toward licensure. Free with funding.',
};

export default function BarberApprenticeshipPage() {
  return (
    <main className="bg-white">
      {/* SECTION 1: HERO - Student Language Only */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Become a licensed barber while you work and earn
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Train in a real shop, complete required theory, and log hours toward licensure.
            </p>
            
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="px-4 py-2 bg-green-500 text-white rounded-full font-semibold text-sm">
                💰 Earn While You Learn
              </span>
              <span className="px-4 py-2 bg-orange-500 text-white rounded-full font-semibold text-sm">
                Free with funding (if eligible)
              </span>
              <span className="px-4 py-2 bg-purple-500 text-white rounded-full font-semibold text-sm">
                Apprenticeship Pathway
              </span>
            </div>

            {/* PRIMARY CTA - Only One */}
            <Link
              href="/apply"
              className="inline-block px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold rounded-lg shadow-lg transition-all"
            >
              Start My Path →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: Is This Program for You? */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Is This Program for You?
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            This program is a good fit if you:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3 bg-white p-6 rounded-lg shadow-sm">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Want hands-on training</h3>
                <p className="text-gray-600">Learn by doing in a real barbershop, not sitting in a classroom all day</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-white p-6 rounded-lg shadow-sm">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Need to earn while learning</h3>
                <p className="text-gray-600">Get paid through hourly wages, commission, or tips while you train</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-white p-6 rounded-lg shadow-sm">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Starting fresh or starting over</h3>
                <p className="text-gray-600">Returning from justice involvement or career disruption? You're welcome here</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-white p-6 rounded-lg shadow-sm">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Want a license and a real trade</h3>
                <p className="text-gray-600">Build a career you can take anywhere—shop employment or your own business</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Outcomes - Make it Concrete */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Where This Takes You
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            After completion, students typically move into:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Licensed Barber Roles</h3>
              <p className="text-gray-600 text-sm">Full state licensure to work in any shop</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Shop-Based Employment</h3>
              <p className="text-gray-600 text-sm">Steady work with established clientele</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Booth Rental or Self-Employment</h3>
              <p className="text-gray-600 text-sm">Be your own boss, set your own hours</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 text-center mt-6">
            Wages vary by location, experience, and clientele. Most barbers earn $25,000-$50,000+ annually.
          </p>
        </div>
      </section>

      {/* SECTION 4: How Training Actually Works */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            How Training Actually Works
          </h2>
          
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Train in a licensed barbershop</h3>
                  <p className="text-gray-600">You'll be matched with a shop where you work with real clients under supervision</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Complete required theory online</h3>
                  <p className="text-gray-600">Study sanitation, safety, and technique at your own pace</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Log hours toward state licensure</h3>
                  <p className="text-gray-600">Track your progress—typically 1,500 hours over 12-18 months</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Receive placement and support</h3>
                  <p className="text-gray-600">We help you find the right shop and stay on track through completion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Cost & Funding - Reduce Fear */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Cost & Funding
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Most students pay <strong>$0 out of pocket</strong> if eligible for:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="font-bold text-gray-900 mb-2">WIOA</h3>
              <p className="text-gray-600 text-sm">Workforce Innovation and Opportunity Act funding for eligible adults</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="font-bold text-gray-900 mb-2">JRI</h3>
              <p className="text-gray-600 text-sm">Justice Reinvestment Initiative for returning citizens</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="font-bold text-gray-900 mb-2">Workforce Grants</h3>
              <p className="text-gray-600 text-sm">State and local workforce development funding</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="font-bold text-gray-900 mb-2">Employer Sponsorship</h3>
              <p className="text-gray-600 text-sm">Some shops sponsor apprentices directly</p>
            </div>
          </div>
          
          <p className="text-center text-gray-600 bg-blue-50 p-4 rounded-lg">
            <strong>Funding eligibility is reviewed during advising.</strong> We help you navigate the paperwork.
          </p>
        </div>
      </section>

      {/* SECTION 6: Support Services - Your Secret Weapon */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            We Help You Navigate Barriers
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Life has obstacles. We help students work through:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Case Management</h3>
              <p className="text-gray-600">Regular check-ins to keep you on track</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Justice System Requirements</h3>
              <p className="text-gray-600">We coordinate with probation, parole, and reentry programs</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Transportation & Scheduling</h3>
              <p className="text-gray-600">Help finding shops near you and managing your hours</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Documentation & Reporting</h3>
              <p className="text-gray-600">We handle the paperwork with the state and funders</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: What Happens Next - ONE Path */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Happens Next
          </h2>
          
          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Submit your application</h3>
                <p className="text-blue-100">Takes 5 minutes. Tell us about yourself and what you're looking for.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Meet with an advisor</h3>
                <p className="text-blue-100">We'll call you within 24-48 hours to schedule a conversation.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Confirm eligibility</h3>
                <p className="text-blue-100">We help you apply for funding and complete any required steps.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Start training</h3>
                <p className="text-blue-100">Get matched to a shop and begin your apprenticeship.</p>
              </div>
            </div>
          </div>
          
          {/* FINAL CTA - No Other Buttons */}
          <div className="text-center">
            <Link
              href="/apply"
              className="inline-block px-12 py-5 bg-orange-500 hover:bg-orange-600 text-white text-2xl font-bold rounded-lg shadow-xl transition-all"
            >
              Start My Path →
            </Link>
            <p className="text-sm text-blue-200 mt-4">
              Questions? <Link href="/contact" className="underline">Contact us</Link> anytime.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
