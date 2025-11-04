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
    const {
      programId,
      programName,
      price,
      successUrl,
      cancelUrl,
      planId,
      productType,
      productName,
    } = JSON.parse(event.body);

    // Handle certification purchases
    if (productType === 'certification') {
      const certificationPrices = {
        individual: 44.95,
        'team-5': 199.95,
        salon: 699.95,
      };

      const certPrice = certificationPrices[planId];
      if (!certPrice) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid plan selected' }),
        };
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${productName} - ${planId.replace('-', ' ').toUpperCase()}`,
                description: `Professional certification course bundle`,
              },
              unit_amount: Math.round(certPrice * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url:
          successUrl ||
          `${event.headers.origin}/lms/enrollment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:
          cancelUrl ||
          `${event.headers.origin}/lms/client-safety-certification`,
        metadata: {
          productType: 'certification',
          planId,
          productName,
        },
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ sessionId: session.id }),
      };
    }

    // Validate required fields for regular programs
    if (!programId || !programName || price === undefined) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Missing required fields: programId, programName, price',
        }),
      };
    }

    // Create Stripe Checkout Session
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
      success_url:
        successUrl ||
        `${event.headers.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${event.headers.origin}/payment/cancelled`,
      metadata: {
        programId,
        programName,
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
    console.error('Stripe checkout error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || 'Failed to create checkout session',
      }),
    };
  }
};
