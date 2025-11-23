import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch certificate
    const { data: certificate, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('id', params.id)
      .eq('student_id', user.id)
      .single();

    if (error || !certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([792, 612]); // Letter size landscape
    const { width, height } = page.getSize();

    // Load fonts
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Draw border
    page.drawRectangle({
      x: 40,
      y: 40,
      width: width - 80,
      height: height - 80,
      borderColor: rgb(0.2, 0.5, 0.3),
      borderWidth: 3,
    });

    page.drawRectangle({
      x: 50,
      y: 50,
      width: width - 100,
      height: height - 100,
      borderColor: rgb(0.2, 0.5, 0.3),
      borderWidth: 1,
    });

    // Title
    page.drawText('CERTIFICATE OF COMPLETION', {
      x: width / 2 - 200,
      y: height - 120,
      size: 32,
      font: helveticaBold,
      color: rgb(0.2, 0.5, 0.3),
    });

    // Subtitle
    page.drawText('This certifies that', {
      x: width / 2 - 80,
      y: height - 180,
      size: 16,
      font: timesRomanFont,
      color: rgb(0.3, 0.3, 0.3),
    });

    // Student name
    page.drawText(certificate.student_name || 'Student', {
      x: width / 2 - (certificate.student_name?.length || 7) * 12,
      y: height - 240,
      size: 36,
      font: timesRomanBold,
      color: rgb(0.1, 0.1, 0.1),
    });

    // Course info
    page.drawText('has successfully completed', {
      x: width / 2 - 110,
      y: height - 290,
      size: 16,
      font: timesRomanFont,
      color: rgb(0.3, 0.3, 0.3),
    });

    page.drawText(certificate.course_title || 'Course', {
      x: width / 2 - (certificate.course_title?.length || 6) * 8,
      y: height - 340,
      size: 24,
      font: timesRomanBold,
      color: rgb(0.1, 0.1, 0.1),
    });

    // Program name
    if (certificate.program_name) {
      page.drawText(certificate.program_name, {
        x: width / 2 - certificate.program_name.length * 5,
        y: height - 370,
        size: 14,
        font: timesRomanFont,
        color: rgb(0.4, 0.4, 0.4),
      });
    }

    // Hours
    if (certificate.hours_completed) {
      page.drawText(`${certificate.hours_completed} hours completed`, {
        x: width / 2 - 80,
        y: height - 400,
        size: 12,
        font: timesRomanFont,
        color: rgb(0.4, 0.4, 0.4),
      });
    }

    // Date
    const issueDate = new Date(certificate.issued_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    page.drawText(`Issued on ${issueDate}`, {
      x: 100,
      y: 120,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.3, 0.3, 0.3),
    });

    // Certificate number
    page.drawText(`Certificate No: ${certificate.certificate_number}`, {
      x: 100,
      y: 100,
      size: 10,
      font: timesRomanFont,
      color: rgb(0.5, 0.5, 0.5),
    });

    // Verification code
    if (certificate.verification_code) {
      page.drawText(`Verification: ${certificate.verification_code}`, {
        x: width - 250,
        y: 100,
        size: 10,
        font: timesRomanFont,
        color: rgb(0.5, 0.5, 0.5),
      });
    }

    // Organization
    page.drawText('Elevate for Humanity', {
      x: width - 200,
      y: 150,
      size: 14,
      font: timesRomanBold,
      color: rgb(0.2, 0.5, 0.3),
    });

    // Signature line
    page.drawLine({
      start: { x: width - 250, y: 180 },
      end: { x: width - 100, y: 180 },
      thickness: 1,
      color: rgb(0.3, 0.3, 0.3),
    });

    page.drawText('Authorized Signature', {
      x: width - 230,
      y: 165,
      size: 10,
      font: timesRomanFont,
      color: rgb(0.5, 0.5, 0.5),
    });

    // Generate PDF
    const pdfBytes = await pdfDoc.save();

    // Return PDF
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="certificate-${certificate.certificate_number}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    return NextResponse.json(
      { error: 'Failed to generate certificate' },
      { status: 500 }
    );
  }
}
