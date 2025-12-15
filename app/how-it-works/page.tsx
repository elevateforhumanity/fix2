import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight, Users, GraduationCap, Briefcase, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works | Elevate For Humanity',
  description: 'Learn how our apprenticeship program works - from application to certification and career placement.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/how-it-works',
  },
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              How It Works
            </h1>
            <p className="text-base md:text-lg text-blue-100 max-w-3xl mx-auto">
              Your path from application to career success in four simple steps
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-base font-bold">
                    1
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Apply for Free</h2>
                </div>
                <p className="text-lg text-slate-600 mb-6">
                  Submit your application online in minutes. No application fee, no hidden costs. 
                  We'll review your application and contact you within 2-3 business days.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700">100% free application process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700">No prior experience required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700">Quick response time</span>
                  </li>
                </ul>
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Start Your Application
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/gallery/image1.jpg"
                    alt="Apply for free"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/gallery/image2.jpg"
                    alt="Get matched with a shop"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-base font-bold">
                    2
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Get Matched with a Shop</h2>
                </div>
                <p className="text-lg text-slate-600 mb-6">
                  We'll match you with an approved training shop in your area. Our partner shops are 
                  licensed, experienced, and committed to quality training.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700">Vetted and approved training locations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700">Experienced master barbers as mentors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700">Convenient locations across Indiana</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-base font-bold">
                    3
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Complete Your Training</h2>
                </div>
                <p className="text-lg text-slate-600 mb-6">
                  Work and learn at your training shop while completing online coursework. 
                  Track your hours, submit progress reports, and prepare for your licensing exam.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700">1,500 hours of hands-on training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700">Online coursework and resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700">Exam preparation and support</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/gallery/image3.jpg"
                    alt="Complete your training"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/gallery/image4.jpg"
                    alt="Get licensed and start your career"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-base font-bold">
                    4
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Get Licensed & Start Your Career</h2>
                </div>
                <p className="text-lg text-slate-600 mb-6">
                  Pass your state licensing exam and launch your career as a licensed barber. 
                  We'll support you with job placement assistance and ongoing career resources.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700">State licensing exam preparation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700">Job placement assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700">Ongoing career support</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Why Choose Our Program?
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
              We provide everything you need to succeed in your barbering career
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Expert Mentors</h3>
              <p className="text-slate-600">
                Learn from experienced master barbers who are passionate about teaching
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Free Training</h3>
              <p className="text-slate-600">
                100% funded through WIOA - no tuition, no hidden fees
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Earn While You Learn</h3>
              <p className="text-slate-600">
                Get paid as you train and build your skills
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">State Certification</h3>
              <p className="text-slate-600">
                Earn your Indiana barber license and launch your career
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-base md:text-lg text-blue-100 mb-8">
            Join hundreds of students who have launched successful barbering careers through our program
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 text-lg inline-flex items-center justify-center gap-2"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/faq"
              className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 border-2 border-white text-lg"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
