/**
 * Netlify Function: Create Donation Session
 * 
 * Creates Stripe Checkout session for donations to Selfish Inc Foundation.
 * Supports one-time and recurring (monthly) donations.
 * 
 * Endpoint: POST /.netlify/functions/create-donation-session
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { amount, type, donor_name, donor_email } = JSON.parse(event.body);

    if (!amount || amount < 5) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Minimum donation amount is $5' }),
      };
    }

    const donationType = type || 'one-time';

    // Create Stripe Checkout session
    const sessionConfig = {
      payment_method_types: ['card'],
      mode: donationType === 'monthly' ? 'subscription' : 'payment',
      success_url: `${process.env.FRONTEND_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/donate`,
      customer_email: donor_email,
      metadata: {
        donation_type: donationType,
        donor_name: donor_name || 'Anonymous',
        organization: 'Selfish Inc Foundation',
      },
    };

    if (donationType === 'monthly') {
      // Create recurring subscription
      sessionConfig.line_items = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Monthly Donation to Selfish Inc Foundation',
              description: 'Recurring monthly donation supporting scholarships and community programs',
              images: ['https://elevateforhumanity.org/images/selfish-inc-logo.png'],
            },
            unit_amount: Math.round(amount * 100),
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ];
    } else {
      // One-time payment
      sessionConfig.line_items = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation to Selfish Inc Foundation',
              description: 'Tax-deductible donation supporting scholarships and community programs',
              images: ['https://elevateforhumanity.org/images/selfish-inc-logo.png'],
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ];
    }

    // Add tax receipt information
    sessionConfig.payment_intent_data = {
      description: `${donationType === 'monthly' ? 'Monthly' : 'One-time'} donation to Selfish Inc Foundation`,
      metadata: {
        donation_type: donationType,
        donor_name: donor_name || 'Anonymous',
        tax_deductible: 'yes',
      },
    };

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sessionId: session.id,
        url: session.url,
      }),
    };
  } catch (error) {
    console.error('Create donation session error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to create donation session',
      }),
    };
  }
};
