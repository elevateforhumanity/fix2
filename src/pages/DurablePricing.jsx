import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function DurablePricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Access to free courses',
        'Community support',
        'Basic certificates',
        'Limited AI tutor access',
      ],
      cta: 'Get Started',
      link: '/get-started',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      features: [
        'All free features',
        'Unlimited course access',
        'Premium certificates',
        'Unlimited AI tutor',
        'Career services',
        'Priority support',
      ],
      cta: 'Start Free Trial',
      link: '/get-started',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      features: [
        'All Pro features',
        'Custom learning paths',
        'Dedicated account manager',
        'API access',
        'Advanced analytics',
        'White-label options',
      ],
      cta: 'Contact Sales',
      link: '/contact',
      highlighted: false,
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Pricing | Elevate for Humanity</title>
        <meta name="description" content="Simple, transparent pricing. Choose the plan that's right for you." />
      </Helmet>
      
      <Navigation />
      
      <div className="section bg-beige-50">
        <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-brown-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-brown-600 max-w-2xl mx-auto">
            Choose the plan that's right for you
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card p-8 ${plan.highlighted ? 'ring-4 ring-green-600 transform scale-105' : ''}`}
            >
              {plan.highlighted && (
                <div className="bg-green-600 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-brown-600 ml-2">
                  / {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-brown-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={plan.link}
                className={plan.highlighted ? 'btn-primary w-full text-center' : 'btn-outline w-full text-center'}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
