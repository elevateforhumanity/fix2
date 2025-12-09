// app/api/admin/completions/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { withAuth } from '@/lib/withAuth';

function getSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

/**
 * Admin completions API
 * GET /api/admin/completions?days=7&format=json|csv
 *
 * Returns partner certificate completions in the last X days (default 7)
 */
export const GET = withAuth(
  async (req: Request, user) => {

  const url = new URL(req.url);
  const daysParam = url.searchParams.get("days");
  const format = url.searchParams.get("format") || "json";
  const days = daysParam ? Number(daysParam) : 7;

  const since = new Date();
  since.setDate(since.getDate() - (isNaN(days) ? 7 : days));

  const supabase = getSupabaseServerClient();

  // Admin access control should be implemented via middleware or role check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ completions: [] }, { status: 200 });
  }

  // Pull recent certificates + join related data
  const { data, error } = await supabase
    .from("partner_certificates")
    .select(
      `
      id,
      certificate_number,
      certificate_url,
      verification_url,
      issued_date,
      enrollment_id,
      partner_lms_enrollments!inner (
        id,
        program_id,
        provider_id,
        student_id,
        partner_lms_providers ( provider_name ),
        partner_courses ( course_name ),
        profiles ( full_name, email )
      )
    `
    )
    .gte("issued_date", since.toISOString())
    .order("issued_date", { ascending: false });

  if (error) {
    console.error("[GET /api/admin/completions] error", error);
    return NextResponse.json({ completions: [], error: error.message }, { status: 200 });
  }

  const completions = (data ?? []).map((row: any) => {
    const e = row.partner_lms_enrollments ?? {};
    const student = e.profiles ?? {};
    const provider = e.partner_lms_providers ?? {};
    const course = e.partner_courses ?? {};

    // Try to determine funding source from program_id or metadata
    // For now, default to "Unknown" - can be enhanced with programs table join
    const fundingSource = "WIOA/WRG"; // Placeholder - enhance with real program data

    return {
      id: row.id,
      certificateNumber: row.certificate_number ?? null,
      certificateUrl: row.certificate_url,
      verificationUrl: row.verification_url ?? null,
      issuedDate: row.issued_date,
      courseName: course.course_name ?? "Partner Course",
      partnerName: provider.provider_name ?? "Partner",
      studentName: student.full_name ?? "Student",
      studentEmail: student.email ?? "",
      programName: null, // Can be enhanced with programs table
      fundingSource,
    };
  });

  // CSV export
  if (format === "csv") {
    const headers = [
      "Student Name",
      "Student Email",
      "Course Name",
      "Partner",
      "Funding Source",
      "Certificate Number",
      "Issued Date",
      "Certificate URL",
      "Verification URL",
    ];

    const rows = completions.map((c) => [
      c.studentName,
      c.studentEmail,
      c.courseName,
      c.partnerName,
      c.fundingSource,
      c.certificateNumber || "",
      new Date(c.issuedDate).toLocaleDateString(),
      c.certificateUrl,
      c.verificationUrl || "",
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="completions-${days}days-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  }

  return NextResponse.json({ completions });

  },
  { roles: ['admin', 'super_admin'] }
);
