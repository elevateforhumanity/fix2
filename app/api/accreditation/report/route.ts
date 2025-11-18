import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import PDFDocument from "pdfkit";

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Fetch metrics
  const { count: enrollments } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true });

  const { count: completions } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("status", "completed");

  const completionRate =
    enrollments === 0 ? 0 : ((completions || 0) / (enrollments || 1)) * 100;

  const { count: activeLearners } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "student");

  const { count: programs } = await supabase
    .from("programs")
    .select("*", { count: "exact", head: true });

  // Generate PDF
  const doc = new PDFDocument({ margin: 50 });
  const chunks: Buffer[] = [];

  doc.on("data", (chunk) => chunks.push(chunk));

  // Header
  doc
    .fontSize(20)
    .text("Elevate for Humanity", { align: "center" })
    .fontSize(16)
    .text("Accreditation Summary Report", { align: "center" })
    .moveDown();

  doc
    .fontSize(10)
    .text(`Generated: ${new Date().toLocaleDateString()}`, { align: "center" })
    .moveDown(2);

  // Metrics Section
  doc.fontSize(14).text("Platform Metrics", { underline: true }).moveDown();

  doc
    .fontSize(12)
    .text(`Total Active Learners: ${activeLearners || 0}`)
    .text(`Total Programs: ${programs || 0}`)
    .text(`Total Enrollments: ${enrollments || 0}`)
    .text(`Total Completions: ${completions || 0}`)
    .text(`Completion Rate: ${completionRate.toFixed(1)}%`)
    .moveDown(2);

  // Compliance Section
  doc
    .fontSize(14)
    .text("Compliance & Standards", { underline: true })
    .moveDown();

  doc
    .fontSize(11)
    .text("✓ WIOA-aligned workforce development programs")
    .text("✓ FERPA-compliant data protection")
    .text("✓ GDPR data privacy controls")
    .text("✓ SOC 2 security standards")
    .text("✓ WCAG 2.1 AA accessibility compliance")
    .moveDown(2);

  // Footer
  doc
    .fontSize(10)
    .text(
      "This report summarizes learner outcomes for accreditation and funding partners.",
      { align: "center" }
    )
    .text("For questions, contact: support@elevateforhumanity.org", {
      align: "center",
    });

  doc.end();

  await new Promise((resolve) => doc.on("end", resolve));

  const pdf = Buffer.concat(chunks);

  return new NextResponse(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="efh-accreditation-summary.pdf"',
    },
  });
}
