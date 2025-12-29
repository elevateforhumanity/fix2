import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { checkout_token, program } = await request.json();

    // Call Affirm API to authorize the charge
    const affirmResponse = await fetch('https://api.affirm.com/api/v2/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${process.env.AFFIRM_PUBLIC_KEY}:${process.env.AFFIRM_PRIVATE_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify({
        checkout_token,
      }),
    });

    const chargeData = await affirmResponse.json();

    if (!affirmResponse.ok) {
      throw new Error(chargeData.message || 'Affirm charge failed');
    }

    // TODO: Save enrollment to database
    // await saveEnrollment({
    //   program,
    //   payment_method: 'affirm',
    //   charge_id: chargeData.id,
    //   amount: chargeData.amount,
    // });

    return NextResponse.json({ 
      success: true,
      charge_id: chargeData.id 
    });
  } catch (error: any) {
    console.error('Affirm charge error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process Affirm payment' },
      { status: 500 }
    );
  }
}
