import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, subject, html, text } = body;

    if (!to || !subject || (!html && !text)) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, and html or text' },
        { status: 400 }
      );
    }

    // If no RESEND_API_KEY, log and return success (dev mode)
    if (!process.env.RESEND_API_KEY) {
      console.log('[Email] Would send:', { to, subject });
      return NextResponse.json({ 
        ok: true, 
        message: 'Email logged (no API key configured)' 
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'Elevate for Humanity <noreply@elevateforhumanity.org>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html: html || text,
      text: text || undefined,
    });

    if (error) {
      console.error('[Email] Send error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err: any) {
    console.error('[Email] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Unexpected error sending email' },
      { status: 500 }
    );
  }
}
