import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { resend, notifyFrom, notifyTo } from '@/lib/email/resend';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    // Store in database
    const { error: dbError } = await supabase
      .from('partner_inquiries')
      .insert({
        full_name: data.fullName,
        organization: data.organization,
        email: data.email,
        phone: data.phone,
        relationship_type: data.relationshipType,
        resources: data.resources,
        seeking: data.seeking,
        written_agreement: data.writtenAgreement,
        additional_info: data.additionalInfo,
        ip_acknowledged: true,
        submitted_at: new Date().toISOString(),
      });

    if (dbError) {
      // Error: $1
      // Continue even if DB fails - we'll send email
    }

    // Send notification email
    try {
      await resend.emails.send({
        from: notifyFrom(),
        to: notifyTo(),
        subject: `New Partner Inquiry: ${data.fullName} (${data.relationshipType})`,
        text:
          `New Partner Inquiry\n\n` +
          `Name: ${data.fullName}\n` +
          `Org: ${data.organization || "-"}\n` +
          `Email: ${data.email}\n` +
          `Phone: ${data.phone || "-"}\n` +
          `Relationship: ${data.relationshipType}\n\n` +
          `Value:\n${data.resources}\n\n` +
          `Seeking: ${data.seeking}\n` +
          `Agreement Ack: ${data.writtenAgreement}\n\n` +
          `Additional Info:\n${data.additionalInfo || "-"}\n`,
      });

      // Send auto-reply to submitter
      await resend.emails.send({
        from: notifyFrom(),
        to: data.email,
        subject: "We received your partner inquiry | Elevate for Humanity",
        text:
          `Thank you for your inquiry.\n\n` +
          `We review requests through our structured process to protect participants and platform integrity.\n` +
          `If there is alignment, our team will follow up with next steps.\n\n` +
          `— Elevate for Humanity\n`,
      });
    } catch (emailError) {
      // Error: $1
      // Continue - inquiry is saved
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // Error: $1
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
