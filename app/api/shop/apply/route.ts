import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logAuditEvent, AuditActions } from '@/lib/audit';
import { resend, notifyFrom } from '@/lib/email/resend';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = await createClient();

    const {
      shop_name,
      owner_name,
      email,
      phone,
      address,
      city,
      state,
      zip,
      license_number,
      years_in_business,
      message,
    } = body;

    // Validate required fields
    if (!shop_name || !owner_name || !email || !phone || !license_number) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create or get auth user for shop owner
    const { data: authUser, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
      });

    const userId = authUser?.user?.id;

    if (!userId) {
      console.error('User creation failed:', authError);
      throw new Error('User creation failed');
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        full_name: owner_name,
        email,
        phone,
        role: 'shop_owner',
      });

    if (profileError) {
      console.error('Profile creation failed:', profileError);
    }

    // Create shop record
    const { data: shop, error: shopError } = await supabase
      .from('shops')
      .insert({
        name: shop_name,
        owner_id: userId,
        license_number,
        address,
        city,
        state,
        zip,
        phone,
        email,
        years_in_business: parseInt(years_in_business) || 0,
        status: 'pending',
        approved: false,
      })
      .select()
      .single();

    if (shopError) {
      console.error('Shop creation failed:', shopError);
      throw new Error('Shop creation failed');
    }

    // Create shop staff record
    await supabase.from('shop_staff').insert({
      shop_id: shop.id,
      user_id: userId,
      role: 'owner',
    });

    // Create onboarding record
    await supabase.from('shop_onboarding').insert({
      shop_id: shop.id,
      application_submitted: true,
      application_notes: message || null,
    });

    // Send welcome email
    try {
      await resend.emails.send({
        from: notifyFrom(),
        to: email,
        subject: 'Shop Partner Application Received - Elevate for Humanity',
        text: `
Hello ${owner_name},

Thank you for applying to become a shop partner with Elevate for Humanity!

We've received your application for ${shop_name} and will review it within 2-3 business days.

What happens next:
• Our team will review your application and credentials
• We'll verify your shop license and location
• You'll receive an email with next steps for onboarding
• Once approved, you can begin the document upload process

If you have any questions, please don't hesitate to reach out.

Welcome to the Elevate for Humanity network!

— Elevate for Humanity Team
        `,
      });
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
      // Continue - not critical
    }

    // Log audit event
    await logAuditEvent({
      userId,
      action: AuditActions.USER_CREATED,
      resourceType: 'shop',
      resourceId: shop.id,
      metadata: {
        shop_name,
        license_number,
        city,
        state,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      shop_id: shop.id,
      user_id: userId,
    });

  } catch (err: any) {
    console.error('Shop application error:', err);
    return NextResponse.json(
      { error: err.message || 'Application failed' },
      { status: 500 }
    );
  }
}
