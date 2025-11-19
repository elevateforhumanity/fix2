import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function GET() {
  // Dynamic import for CommonJS module
  const PDFDocument = (await import('pdfkit')).default;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user is board member
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, organization, full_name')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'board') {
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
  doc.fontSize(18).text('Elevate for Humanity – Compliance Overview', {
    align: 'center',
  });
  doc.moveDown();

  doc
    .fontSize(10)
    .text(
      `Generated for: ${profile.organization || 'Board Partner'} • ${new Date().toLocaleString()}`,
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
    .text(`Checklist Completion: ${completed}/${total} (${pct}%)`, {
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
      doc.fontSize(11).fillColor('#000000').text(`• ${item.title}`);
      doc.fontSize(9).fillColor('#555555').text(`  Status: ${item.status}`);
      doc.text(`  Description: ${item.description}`);

      const evidenceCount = item.compliance_evidence?.length || 0;
      doc.text(`  Evidence files: ${evidenceCount} attachment(s)`);

      doc.moveDown(0.5);
    });

    doc.moveDown();
  });

  // Footer
  doc
    .fontSize(8)
    .fillColor('#888888')
    .text(
      'This compliance overview is provided for workforce board partners. For detailed information, contact Elevate for Humanity.',
      { align: 'center' }
    );

  doc.end();
  await new Promise((resolve) => doc.on('end', resolve));

  const pdf = Buffer.concat(chunks);

  // Log report generation
  await supabase.from('audit_logs').insert({
    actor_id: user.id,
    actor_email: user.email,
    action: 'board_compliance_report_generated',
    resource_type: 'compliance_report',
    metadata: {
      boardOrg: profile.organization,
      itemCount: total,
      completionRate: pct,
    },
  });

  return new NextResponse(pdf, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition':
        'attachment; filename="efh-board-compliance-overview.pdf"',
    },
  });
}
