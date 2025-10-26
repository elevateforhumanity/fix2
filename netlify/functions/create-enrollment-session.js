const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { programId, programName, price } = JSON.parse(event.body);

    // Validate required fields
    if (!programId || !programName) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Missing required fields: programId, programName',
        }),
      };
    }

    // Handle free enrollment
    if (!price || price === 0) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: true,
          free: true,
          message: 'Free enrollment - no payment required',
        }),
      };
    }

    // Create Stripe Checkout Session for paid enrollment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: programName,
              description: `Enrollment in ${programName}`,
            },
            unit_amount: Math.round(price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${event.headers.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${event.headers.origin}/payment/cancelled`,
      metadata: {
        programId,
        programName,
        type: 'enrollment',
      },
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        sessionId: session.id,
        url: session.url,
      }),
    };
  } catch (error) {
    console.error('Enrollment session error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || 'Failed to create enrollment session',
      }),
    };
  }
};
