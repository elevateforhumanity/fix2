// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { logger } from '@/lib/logger';
import { Resend } from 'resend';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const resendApiKey = process.env.RESEND_API_KEY || "";

const supabaseAdmin = supabaseUrl && serviceRoleKey 
  ? createClient(supabaseUrl, serviceRoleKey)
  : null;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone, program, message, role, interest, followup } = body;

    if (!name && !email && !phone) {
      return NextResponse.json(
        { ok: false, message: "Missing basic contact info." },
        { status: 400 }
      );
    }

    // Save to database if configured
    if (supabaseAdmin) {
      const { error } = await supabaseAdmin.from("contact_requests").insert({
        name,
        email,
        phone,
        role,
        interest: program || interest,
        followup: message || followup,
        source: "efh-website",
      });

      if (error) {
        logger.error("Error inserting contact request:", error);
      }
    }

    // Send email notification to elevate4humanityedu@gmail.com
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Elevate for Humanity <noreply@elevateforhumanity.org>',
          to: 'elevate4humanityedu@gmail.com',
          subject: `New Inquiry from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            ${program ? `<p><strong>Program Interest:</strong> ${program}</p>` : ''}
            ${message ? `<p><strong>Message:</strong><br>${message}</p>` : ''}
            <hr>
            <p><em>Submitted from elevateforhumanity.org</em></p>
          `,
        });
      } catch (emailError) {
        logger.error("Error sending email notification:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
