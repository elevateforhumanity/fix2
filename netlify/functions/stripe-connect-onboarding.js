/**
 * Netlify Function: Stripe Connect Onboarding
 * 
 * Creates Stripe Connect account links for instructors to onboard
 * and receive split payouts.
 * 
 * Endpoint: POST /.netlify/functions/stripe-connect-onboarding
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

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
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    const { instructor_id, email, return_url, refresh_url } = JSON.parse(event.body);

    if (!instructor_id || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields: instructor_id, email',
        }),
      };
    }

    // Check if instructor already has Stripe account
    const { data: instructor, error: instructorError } = await supabase
      .from('instructors')
      .select('stripe_account_id')
      .eq('id', instructor_id)
      .single();

    let accountId = instructor?.stripe_account_id;

    // Create Stripe Connect account if doesn't exist
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        email: email,
        capabilities: {
          transfers: { requested: true },
        },
        business_type: 'individual',
        metadata: {
          instructor_id,
        },
      });

      accountId = account.id;

      // Save account ID to database
      await supabase
        .from('instructors')
        .update({
          stripe_account_id: accountId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', instructor_id);
    }

    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: refresh_url || `${process.env.FRONTEND_URL}/instructor/connect/refresh`,
      return_url: return_url || `${process.env.FRONTEND_URL}/instructor/connect/return`,
      type: 'account_onboarding',
    });

    // Log activity
    await supabase.from('activity_log').insert({
      entity_type: 'stripe_connect',
      entity_id: instructor_id,
      action: 'onboarding_started',
      details: {
        account_id: accountId,
        email,
      },
      created_at: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        account_id: accountId,
        onboarding_url: accountLink.url,
        message: 'Stripe Connect onboarding link created',
      }),
    };
  } catch (error) {
    console.error('Stripe Connect onboarding error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Internal server error',
      }),
    };
  }
};
