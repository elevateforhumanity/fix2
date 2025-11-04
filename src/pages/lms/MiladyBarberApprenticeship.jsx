import React, { useState } from 'react';
import { Award, Clock, DollarSign, CheckCircle, Users, BookOpen, ShoppingCart, Phone, Mail, Scissors, GraduationCap } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

/**
 * Barber Apprenticeship Program
 * DOL Registered Apprenticeship & ETPL Approved
 * 2,000 Hours - Indiana State Licensure
 * Powered by Milady curriculum (internal use only)
 */

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const MiladyBarberApprenticeship = () => {
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productType: 'apprenticeship',
          programId: 'barber-apprenticeship',
          productName: 'Barber Apprenticeship Program',
          price: 0, // Free with WIOA/WRG funding
          successUrl: `${window.location.origin}/lms/enrollment-success`,
          cancelUrl: `${window.location.origin}/lms/barber-apprenticeship`,
        }),
      });

      const { sessionId } = await response.json();
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Enrollment error. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Scissors className="w-20 h-20 text-blue-400" />
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Barber Apprenticeship Program
            </h1>
            <p className="text-2xl mb-6 text-gray-300">
              DOL Registered Apprenticeship • ETPL Approved • Indiana State Licensure
            </p>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Earn while you learn with industry-leading curriculum. 2,000 hours of comprehensive training leading to Indiana State Barber License.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleEnroll}
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Apply Now - $0 with Funding'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Program Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">2,000 Hours</h3>
            <p className="text-gray-600">12-18 months of comprehensive training</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">$0 Cost</h3>
            <p className="text-gray-600">Free with WIOA/WRG funding approval</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">State License</h3>
            <p className="text-gray-600">Indiana State Barber License upon completion</p>
          </div>
        </div>

        {/* Curriculum */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Professional Barbering Curriculum</h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Industry-leading content meeting all Indiana State Board requirements and national standards
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Theory Modules */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                Theory & Classroom (400 Hours)
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Barbering History & Professional Image</strong> - Industry foundations and ethics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Infection Control & Safety</strong> - Sanitation, sterilization, and OSHA standards</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Anatomy & Physiology</strong> - Skin, hair, and scalp science</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Trichology</strong> - Hair structure, growth, and disorders</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Chemistry & Products</strong> - Chemical services and product knowledge</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Business Management</strong> - Shop operations and client relations</span>
                </li>
              </ul>
            </div>

            {/* Practical Skills */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Scissors className="w-6 h-6 mr-2 text-purple-600" />
                Practical Skills (1,600 Hours)
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Haircutting Techniques</strong> - Fades, tapers, line-ups, and classic cuts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Clipper & Shear Work</strong> - Professional tool mastery</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Beard Design & Grooming</strong> - Shaping, trimming, and styling</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Shaving Services</strong> - Straight razor techniques and hot towel services</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Hair Coloring & Chemical Services</strong> - Color theory and application</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Styling & Finishing</strong> - Blow-drying, product application, and styling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* DOL & ETPL Compliance */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">DOL Registered & ETPL Approved</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Department of Labor (DOL) Registration</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                  <span>Federally recognized apprenticeship program</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                  <span>Structured on-the-job learning with wage progression</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                  <span>Related technical instruction (RTI) requirements met</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                  <span>Portable credential recognized nationwide</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Eligible Training Provider List (ETPL)</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                  <span>WIOA-approved training provider</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                  <span>Eligible for Workforce Ready Grant (WRG) funding</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                  <span>Performance outcomes tracked and verified</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                  <span>High placement rates in barbering careers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Career Outcomes */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Career Pathways</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Licensed Barber</h3>
              <p className="text-gray-700 mb-4">
                Work in established barbershops across Indiana with your state license
              </p>
              <p className="text-lg font-semibold text-green-600">$35,000 - $50,000/year</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Shop Owner</h3>
              <p className="text-gray-700 mb-4">
                Start your own barbershop and build your client base
              </p>
              <p className="text-lg font-semibold text-green-600">$60,000 - $100,000+/year</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Master Barber Educator</h3>
              <p className="text-gray-700 mb-4">
                Train the next generation of barbers as a licensed instructor
              </p>
              <p className="text-lg font-semibold text-green-600">$45,000 - $70,000/year</p>
            </div>
          </div>
        </div>

        {/* Eligibility */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Eligibility Requirements</h2>
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1" />
                <span className="text-lg">18 years or older</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1" />
                <span className="text-lg">High school diploma or GED</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1" />
                <span className="text-lg">Marion County, IN resident (or willing to relocate)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1" />
                <span className="text-lg">Eligible for WIOA or WRG funding</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1" />
                <span className="text-lg">Pass background check</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1" />
                <span className="text-lg">Commitment to complete 2,000 hours</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Barbering Career?</h2>
          <p className="text-xl mb-8">
            Join our DOL-registered apprenticeship program with industry-leading curriculum
          </p>
          <button
            onClick={handleEnroll}
            disabled={loading}
            className="bg-white text-blue-600 px-12 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Apply Now - Free with Funding'}
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions About the Program?</h3>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a
                href="mailto:elevateforhumanity@gmail.com"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                <Mail className="w-5 h-5" />
                elevateforhumanity@gmail.com
              </a>
              <a
                href="tel:+13173143757"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
              >
                <Phone className="w-5 h-5" />
                (317) 314-3757
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiladyBarberApprenticeship;

// Job Ready Indy Integration
// Organization: Elevate for Humanity Career and Training Institute
// Facilitator: Elizabeth Greene
// Participant Registration: https://learning.employindy.org/jri-participant-elevatehumanitycareertraining
// Access Portal: jri.employindy.org
