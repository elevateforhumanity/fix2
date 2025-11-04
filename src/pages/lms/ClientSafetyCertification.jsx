import React, { useState } from 'react';
import { Award, Clock, DollarSign, CheckCircle, Users, BookOpen, ShoppingCart, Phone, Mail } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

/**
 * WHITE LABEL Client Well-Being & Safety Certification
 * Powered by Elevate for Humanity (Milady content, EFH branding)
 * 50% markup: $29.95 → $44.95
 */

const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY);

const ClientSafetyCertification = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const courses = [
    {
      id: 'infection-control',
      title: 'Infection Control & Safety Standards',
      duration: '2 hours',
      description: 'Master comprehensive infection control protocols and safety standards. Learn the latest COVID-19 safety measures, sterilization procedures, and client protection practices.',
      image: '/assets/images/infection-control.jpg',
      topics: [
        'Advanced sterilization techniques',
        'COVID-19 safety protocols',
        'Disinfection best practices',
        'Personal protective equipment',
        'Client safety standards',
        'Regulatory compliance'
      ],
      exam: {
        questions: 25,
        passingScore: 70
      }
    },
    {
      id: 'domestic-violence',
      title: 'Client Safety & Domestic Violence Awareness',
      duration: '1 hour',
      description: 'Learn to recognize signs of domestic violence and provide appropriate support. Understand your role as a trusted professional in helping clients in crisis.',
      image: '/assets/images/domestic-violence.jpg',
      topics: [
        'Recognizing warning signs',
        'Safe intervention strategies',
        'Resource referrals and support',
        'Creating safe spaces',
        'Legal and ethical considerations',
        'Trauma-informed care'
      ],
      exam: {
        questions: 10,
        passingScore: 70
      }
    },
    {
      id: 'human-trafficking',
      title: 'Human Trafficking Awareness & Response',
      duration: '30+ minutes',
      description: 'Understand human trafficking indicators and learn how to respond appropriately. Be part of the solution in protecting vulnerable individuals.',
      image: '/assets/images/human-trafficking.jpg',
      topics: [
        'Trafficking indicators and red flags',
        'Victim identification techniques',
        'Appropriate response protocols',
        'Reporting procedures',
        'Community resources',
        'Legal framework'
      ],
      exam: {
        questions: 5,
        passingScore: 70
      }
    }
  ];

  const pricingPlans = [
    {
      id: 'individual',
      name: 'Individual Certification',
      price: 44.95,
      originalPrice: 29.95,
      description: 'Perfect for individual professionals',
      features: [
        'All 3 certification courses',
        'Digital certificates upon completion',
        '60 days of access',
        'Lifetime certification validity',
        'Email support',
        'Mobile-friendly platform'
      ],
      popular: false
    },
    {
      id: 'team-5',
      name: 'Team Package (5 seats)',
      price: 199.95,
      originalPrice: 149.75,
      savings: 24.80,
      description: 'Best for small teams',
      features: [
        'All individual features',
        '5 team member seats',
        'Team progress dashboard',
        'Priority support',
        'Bulk certificate download',
        'Team completion reports'
      ],
      popular: true
    },
    {
      id: 'salon',
      name: 'Salon/School Package (20 seats)',
      price: 699.95,
      originalPrice: 599.00,
      savings: 199.05,
      description: 'Ideal for salons and schools',
      features: [
        'All team features',
        '20 team member seats',
        'Dedicated account manager',
        'Custom branding options',
        'Advanced analytics',
        'Phone support'
      ],
      popular: false
    }
  ];

  const benefits = [
    {
      icon: <Award className="w-8 h-8 text-indigo-600" />,
      title: 'Professional Certification',
      description: 'Earn a recognized certification that demonstrates your commitment to client safety and well-being.'
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: 'Make a Real Difference',
      description: 'Learn skills that can help you recognize and respond to clients in crisis situations.'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-indigo-600" />,
      title: 'Career Advancement',
      description: 'Stand out in your field with specialized training in client well-being and safety.'
    }
  ];

  const handleEnroll = async (planId) => {
    setLoading(true);
    setSelectedPlan(planId);

    try {
      // Create checkout session with Stripe
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          productType: 'certification',
          productName: 'Client Well-Being & Safety Certification',
          successUrl: `${window.location.origin}/lms/enrollment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/lms/client-safety-certification`
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        alert('Payment setup failed. Please try again.');
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-semibold">Professional Development</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Client Well-Being & Safety Certification
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Comprehensive training in infection control, domestic violence awareness, and human trafficking response. Protect your clients and make a difference.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>3.5 hours total</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>Professional Certification</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>3 Comprehensive Courses</span>
              </div>
            </div>
            <a
              href="#pricing"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              View Pricing & Enroll
            </a>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Get Certified?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            Complete Your Certification in 3.5 Hours
          </h2>
          <p className="text-center text-gray-600 mb-12">This certification includes:</p>

          <div className="space-y-12">
            {courses.map((course, index) => (
              <div key={course.id} className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/3">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.src = '/assets/images/placeholder-course.jpg';
                    }}
                  />
                </div>
                <div className="md:w-2/3">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-2xl font-bold">{course.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{course.description}</p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                    <ul className="space-y-1">
                      {course.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Assessment:</strong> {course.exam.questions} questions | {course.exam.passingScore}% passing score
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-gray-600">Select the option that works best for you or your team</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-indigo-600 relative' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-indigo-600 text-white text-center py-2 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-indigo-600">
                        ${plan.price}
                      </span>
                      {plan.savings && (
                        <span className="text-sm text-green-600 font-semibold">
                          Save ${plan.savings.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">One-time payment</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleEnroll(plan.id)}
                    disabled={loading && selectedPlan === plan.id}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    } ${loading && selectedPlan === plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading && selectedPlan === plan.id ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Enroll Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              All plans include 60 days of access and lifetime certification validity
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500">
              <span>✓ Secure payment via Stripe</span>
              <span>✓ Instant access</span>
              <span>✓ Money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <details className="bg-white p-6 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer">
              What's included in the certification?
            </summary>
            <p className="mt-4 text-gray-700">
              You get access to all three courses: Infection Control (2 hours), Domestic Violence Awareness (1 hour), and Human Trafficking Awareness (30 minutes). Upon completion, you'll receive a professional certification.
            </p>
          </details>

          <details className="bg-white p-6 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer">
              How long do I have to complete the courses?
            </summary>
            <p className="mt-4 text-gray-700">
              You have 60 days from enrollment to complete all courses. The total time required is approximately 3.5 hours, which you can complete at your own pace.
            </p>
          </details>

          <details className="bg-white p-6 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer">
              Does the certification expire?
            </summary>
            <p className="mt-4 text-gray-700">
              Your certification is valid for a lifetime. However, we recommend refreshing your knowledge every 2 years to stay current with evolving standards.
            </p>
          </details>

          <details className="bg-white p-6 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer">
              What payment methods do you accept?
            </summary>
            <p className="mt-4 text-gray-700">
              We accept all major credit cards, debit cards, and digital wallets through our secure Stripe payment processor.
            </p>
          </details>

          <details className="bg-white p-6 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer">
              Can I get a refund?
            </summary>
            <p className="mt-4 text-gray-700">
              Yes! We offer a 30-day money-back guarantee. If you're not satisfied with the course content, contact us for a full refund.
            </p>
          </details>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Certified?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of professionals who have earned their Client Well-Being & Safety Certification
          </p>
          <a
            href="#pricing"
            className="inline-block bg-white text-indigo-600 px-12 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition"
          >
            View Plans & Enroll Now
          </a>
        </div>
      </div>

      {/* Contact & Trust Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Info */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions? We're Here to Help</h3>
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

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 pt-8 border-t border-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Professional Certification</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSafetyCertification;
