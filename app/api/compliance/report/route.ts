import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import { createClient } from '@/utils/supabase/server';

export const runtime = 'nodejs';

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Fetch compliance items with evidence
  const { data: items } = await supabase
    .from('compliance_items')
    .select(
      `
      *,
      compliance_evidence(*)
    `
    )
    .order('category', { ascending: true });

  if (!items) {
    return NextResponse.json(
      { error: 'Failed to fetch compliance items' },
      { status: 500 }
    );
  }

  // Create PDF
  const doc = new PDFDocument({ margin: 50 });
  const chunks: Buffer[] = [];

  doc.on('data', (chunk) => chunks.push(chunk));
  doc.on('end', () => {});

  // Header
  doc.fontSize(18).text('Elevate for Humanity – Compliance Status Report', {
    align: 'center',
  });
  doc.moveDown();

  doc
    .fontSize(10)
    .text(
      `Generated at: ${new Date().toLocaleString()} • Prepared for: ${
        profile.full_name || user.email
      }`,
      { align: 'center' }
    );
  doc.moveDown();

  // Calculate completion stats
  let completed = 0;
  const total = items.length;
  items.forEach((i) => {
    if (i.status === 'complete') completed += 1;
  });

  const pct = total ? ((completed / total) * 100).toFixed(1) : '0.0';

  doc
    .fontSize(12)
    .text(`Overall Checklist Completion: ${completed}/${total} (${pct}%)`, {
      align: 'center',
    });
  doc.moveDown();
  doc.moveDown();

  // Group by category
  const categories = Array.from(new Set(items.map((i) => i.category)));

  categories.forEach((category) => {
    const categoryItems = items.filter((i) => i.category === category);

    doc.fontSize(14).fillColor('#000000').text(category, { underline: true });
    doc.moveDown(0.5);

    categoryItems.forEach((item) => {
      doc.fontSize(11).fillColor('#000000').text(`• ${item.title}`, {
        indent: 20,
      });

      doc.fontSize(9).fillColor('#555555').text(`Status: ${item.status}`, {
        indent: 30,
      });

      doc.text(`Description: ${item.description}`, { indent: 30 });

      const evidenceCount = item.compliance_evidence?.length || 0;
      doc.text(`Evidence files: ${evidenceCount} attachment(s)`, {
        indent: 30,
      });

      if (evidenceCount > 0) {
        item.compliance_evidence.forEach((ev: any) => {
          doc
            .fontSize(8)
            .fillColor('#0066cc')
            .text(`  - ${ev.file_name}`, { indent: 40 });
        });
      }

      if (item.last_reviewed_at) {
        doc
          .fontSize(8)
          .fillColor('#888888')
          .text(
            `Last reviewed: ${new Date(item.last_reviewed_at).toLocaleDateString()}`,
            { indent: 30 }
          );
      }

      doc.moveDown(0.5);
    });

    doc.moveDown();
  });

  // Footer
  doc
    .fontSize(8)
    .fillColor('#888888')
    .text(
      'This report is generated for compliance tracking purposes. For questions, contact admin@elevateforhumanity.org',
      { align: 'center' }
    );

  doc.end();
  await new Promise((resolve) => doc.on('end', resolve));

  const pdf = Buffer.concat(chunks);

  // Log report generation
  await supabase.from('audit_logs').insert({
    actor_id: user.id,
    actor_email: user.email,
    action: 'compliance_report_generated',
    resource_type: 'compliance_report',
    metadata: { itemCount: total, completionRate: pct },
  });

  return new NextResponse(pdf, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition':
        'attachment; filename="efh-compliance-status-report.pdf"',
    },
  });
}
