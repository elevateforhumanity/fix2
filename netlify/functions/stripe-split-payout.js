/**
 * Netlify Function: Stripe Split Payout
 * 
 * Handles revenue sharing for course/program payments:
 * - 60% to Elevate for Humanity (operations)
 * - 25% to instructor (teaching fees)
 * - 10% to Selfish Inc Foundation (scholarships)
 * - 5% to platform (maintenance)
 * 
 * Uses Stripe Connect for automated payouts.
 * 
 * Endpoint: POST /.netlify/functions/stripe-split-payout
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

    const { payment_intent_id, amount, program_id, instructor_id, funding_source } = JSON.parse(event.body);

    if (!payment_intent_id || !amount || !program_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields: payment_intent_id, amount, program_id',
        }),
      };
    }

    // Skip split payout for government-funded programs (WIOA, WRG, OJT)
    // These are FREE to students and EFH receives 100% of government reimbursement
    if (funding_source && ['WIOA', 'WRG', 'OJT'].includes(funding_source.toUpperCase())) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Government-funded program - no split payout needed',
          funding_source,
        }),
      };
    }

    // Get instructor and connected account info
    const { data: instructor, error: instructorError } = await supabase
      .from('instructors')
      .select('id, stripe_account_id, payout_percentage')
      .eq('id', instructor_id)
      .single();

    if (instructorError || !instructor) {
      console.error('Instructor not found:', instructorError);
      // Default to standard split if instructor not found
    }

    // Calculate split amounts (in cents)
    // Model: 50% to EFH, 50% to Partners
    const totalAmount = amount; // Already in cents
    const efhShare = Math.floor(totalAmount * 0.50); // 50% to EFH
    const partnerShare = totalAmount - efhShare; // 50% to Partners
    
    // Partner share distribution (can be customized per program)
    const instructorPercentage = instructor?.payout_percentage || 80; // 80% of partner share = 40% of total
    const selfishIncPercentage = 20; // 20% of partner share = 10% of total
    
    const splits = {
      efh: efhShare, // 50% to EFH
      instructor: Math.floor(partnerShare * (instructorPercentage / 100)), // Default: 40% of total
      selfish_inc: Math.floor(partnerShare * (selfishIncPercentage / 100)), // Default: 10% of total
      platform: 0, // No separate platform fee (included in EFH share)
    };

    // Adjust for rounding (ensure total equals original amount)
    const splitTotal = splits.efh + splits.instructor + splits.selfish_inc + splits.platform;
    if (splitTotal !== totalAmount) {
      splits.efh += totalAmount - splitTotal;
    }

    // Create transfers using Stripe Connect
    const transfers = [];

    // Transfer to instructor (if they have connected account)
    if (instructor?.stripe_account_id && splits.instructor > 0) {
      try {
        const instructorTransfer = await stripe.transfers.create({
          amount: splits.instructor,
          currency: 'usd',
          destination: instructor.stripe_account_id,
          transfer_group: payment_intent_id,
          description: `Instructor payout for program ${program_id}`,
          metadata: {
            program_id,
            instructor_id,
            split_type: 'instructor',
            percentage: instructorPercentage,
          },
        });
        transfers.push({
          type: 'instructor',
          transfer_id: instructorTransfer.id,
          amount: splits.instructor,
          account_id: instructor.stripe_account_id,
        });
      } catch (error) {
        console.error('Instructor transfer failed:', error);
      }
    }

    // Transfer to Selfish Inc (if connected account exists)
    const selfishIncAccountId = process.env.STRIPE_SELFISH_INC_ACCOUNT_ID;
    if (selfishIncAccountId && splits.selfish_inc > 0) {
      try {
        const selfishIncTransfer = await stripe.transfers.create({
          amount: splits.selfish_inc,
          currency: 'usd',
          destination: selfishIncAccountId,
          transfer_group: payment_intent_id,
          description: `Scholarship fund contribution for program ${program_id}`,
          metadata: {
            program_id,
            split_type: 'selfish_inc',
            percentage: 10,
          },
        });
        transfers.push({
          type: 'selfish_inc',
          transfer_id: selfishIncTransfer.id,
          amount: splits.selfish_inc,
          account_id: selfishIncAccountId,
        });
      } catch (error) {
        console.error('Selfish Inc transfer failed:', error);
      }
    }

    // EFH and platform amounts stay in main account (no transfer needed)
    // These are automatically retained

    // Log the split payout in database
    const { data: payout, error: payoutError } = await supabase
      .from('split_payouts')
      .insert({
        payment_intent_id,
        program_id,
        instructor_id,
        total_amount: totalAmount,
        efh_amount: splits.efh,
        instructor_amount: splits.instructor,
        selfish_inc_amount: splits.selfish_inc,
        platform_amount: splits.platform,
        transfers: transfers,
        status: 'completed',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (payoutError) {
      console.error('Failed to log payout:', payoutError);
    }

    // Log activity
    await supabase.from('activity_log').insert({
      entity_type: 'split_payout',
      entity_id: payout?.id || payment_intent_id,
      action: 'created',
      details: {
        payment_intent_id,
        program_id,
        splits,
        transfers: transfers.length,
      },
      created_at: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        payout_id: payout?.id,
        splits,
        transfers: transfers.map((t) => ({
          type: t.type,
          amount: t.amount,
          transfer_id: t.transfer_id,
        })),
        message: 'Split payout processed successfully',
      }),
    };
  } catch (error) {
    console.error('Split payout error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Internal server error',
      }),
    };
  }
};
