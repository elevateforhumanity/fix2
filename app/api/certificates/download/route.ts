import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const enrollmentId = searchParams.get('enrollmentId');
    const type = searchParams.get('type') || 'internal';

    if (!enrollmentId) {
      return NextResponse.json({ error: 'Enrollment ID required' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch enrollment and course details
    let enrollment: any;
    let courseName = '';
    let completionDate = '';

    if (type === 'partner') {
      const { data } = await supabase
        .from('partner_enrollments')
        .select('*, partner_courses(course_name, certification_name)')
        .eq('id', enrollmentId)
        .eq('user_id', user.id)
        .eq('progress_percentage', 100)
        .single();

      enrollment = data;
      courseName = data?.partner_courses?.certification_name || data?.partner_courses?.course_name || 'Course';
      completionDate = data?.completed_at;
    } else {
      const { data } = await supabase
        .from('enrollments')
        .select('*, courses(title)')
        .eq('id', enrollmentId)
        .eq('user_id', user.id)
        .eq('progress_percentage', 100)
        .single();

      enrollment = data;
      courseName = data?.courses?.title || 'Course';
      completionDate = data?.completed_at;
    }

    if (!enrollment) {
      return NextResponse.json({ error: 'Certificate not found or not completed' }, { status: 404 });
    }

    // Get or create certificate record
    let certificate: any;
    const { data: existingCert } = await supabase
      .from('certificates')
      .select('*')
      .eq('enrollment_id', enrollmentId)
      .single();

    if (existingCert) {
      certificate = existingCert;
    } else {
      // Create new certificate
      const { data: profile } = await supabase
        .from('users')
        .select('full_name, email')
        .eq('id', user.id)
        .single();

      const { data: newCert } = await supabase
        .from('certificates')
        .insert({
          user_id: user.id,
          enrollment_id: enrollmentId,
          course_id: enrollment.course_id,
          student_name: profile?.full_name || user.email || 'Student',
          course_name: courseName,
          completion_date: completionDate || new Date().toISOString(),
          certificate_type: type,
        })
        .select()
        .single();

      certificate = newCert;
    }

    // Generate PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([792, 612]); // Letter landscape
    const { width, height } = page.getSize();

    // Load fonts
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const timesRomanItalicFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

    // Colors
    const darkBlue = rgb(0.15, 0.39, 0.65);
    const gold = rgb(0.85, 0.65, 0.13);
    const black = rgb(0, 0, 0);

    // Border
    page.drawRectangle({
      x: 30,
      y: 30,
      width: width - 60,
      height: height - 60,
      borderColor: gold,
      borderWidth: 3,
    });

    page.drawRectangle({
      x: 40,
      y: 40,
      width: width - 80,
      height: height - 80,
      borderColor: darkBlue,
      borderWidth: 1,
    });

    // Title
    page.drawText('CERTIFICATE OF COMPLETION', {
      x: width / 2 - 200,
      y: height - 100,
      size: 32,
      font: timesRomanBoldFont,
      color: darkBlue,
    });

    // Subtitle
    page.drawText('This certifies that', {
      x: width / 2 - 70,
      y: height - 160,
      size: 16,
      font: timesRomanItalicFont,
      color: black,
    });

    // Student Name
    page.drawText(certificate.student_name, {
      x: width / 2 - (certificate.student_name.length * 10),
      y: height - 220,
      size: 36,
      font: timesRomanBoldFont,
      color: darkBlue,
    });

    // Has successfully completed
    page.drawText('has successfully completed', {
      x: width / 2 - 100,
      y: height - 270,
      size: 16,
      font: timesRomanItalicFont,
      color: black,
    });

    // Course Name
    const courseNameLines = courseName.length > 50 
      ? [courseName.substring(0, 50), courseName.substring(50)]
      : [courseName];

    courseNameLines.forEach((line, index) => {
      page.drawText(line, {
        x: width / 2 - (line.length * 8),
        y: height - 320 - (index * 30),
        size: 24,
        font: timesRomanBoldFont,
        color: black,
      });
    });

    // Date
    const formattedDate = new Date(certificate.completion_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    page.drawText(`Completed on ${formattedDate}`, {
      x: width / 2 - 100,
      y: height - 400,
      size: 14,
      font: timesRomanFont,
      color: black,
    });

    // Certificate Number
    page.drawText(`Certificate No: ${certificate.certificate_number}`, {
      x: 60,
      y: 80,
      size: 10,
      font: timesRomanFont,
      color: black,
    });

    // Issuer
    page.drawText('Elevate For Humanity', {
      x: width - 200,
      y: 120,
      size: 14,
      font: timesRomanBoldFont,
      color: darkBlue,
    });

    page.drawText('Workforce Development & Training', {
      x: width - 220,
      y: 100,
      size: 10,
      font: timesRomanFont,
      color: black,
    });

    // Signature line
    page.drawLine({
      start: { x: width - 250, y: 160 },
      end: { x: width - 80, y: 160 },
      thickness: 1,
      color: black,
    });

    page.drawText('Authorized Signature', {
      x: width - 220,
      y: 145,
      size: 10,
      font: timesRomanItalicFont,
      color: black,
    });

    // Verification URL
    const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elevateforhumanity.com'}/verify/${certificate.certificate_number}`;
    page.drawText(`Verify at: ${verifyUrl}`, {
      x: 60,
      y: 60,
      size: 8,
      font: timesRomanFont,
      color: darkBlue,
    });

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save();

    // Return PDF
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="certificate-${certificate.certificate_number}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error('Certificate download error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate certificate' },
      { status: 500 }
    );
  }
}
