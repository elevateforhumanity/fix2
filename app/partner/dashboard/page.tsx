import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PartnerDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, tenant_id, organization")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "partner") {
    redirect("/");
  }

  // Get students for this partner's tenant
  const { data: students } = await supabase
    .from("enrollments")
    .select(
      `
      id,
      status,
      hours_trained,
      profiles:user_id (
        id,
        full_name,
        email
      ),
      courses:course_id (
        id,
        title
      )
    `
    )
    .eq("tenant_id", profile.tenant_id)
    .order("created_at", { ascending: false })
    .limit(100);

  // Calculate summary stats
  const totalStudents = students?.length || 0;
  const activeStudents =
    students?.filter((s) => s.status === "in_progress").length || 0;
  const completedStudents =
    students?.filter((s) => s.status === "completed").length || 0;
  const totalHours =
    students?.reduce((sum, s) => sum + (s.hours_trained || 0), 0) || 0;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">
          Partner Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Learners and progress within {profile.organization || "your"}{" "}
          partnership.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <Stat label="Total Learners" value={totalStudents} />
          <Stat label="Active" value={activeStudents} />
          <Stat label="Completed" value={completedStudents} />
          <Stat label="Training Hours" value={totalHours.toFixed(0)} />
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-900">
              Learner Details
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2 text-left text-[11px] font-medium text-slate-500">
                    Student
                  </th>
                  <th className="px-3 py-2 text-left text-[11px] font-medium text-slate-500">
                    Program
                  </th>
                  <th className="px-3 py-2 text-left text-[11px] font-medium text-slate-500">
                    Status
                  </th>
                  <th className="px-3 py-2 text-right text-[11px] font-medium text-slate-500">
                    Hours
                  </th>
                </tr>
              </thead>
              <tbody>
                {(students || []).map((s: any) => (
                  <tr key={s.id} className="border-t border-slate-100">
                    <td className="px-3 py-2 text-slate-800">
                      {s.profiles?.full_name || s.profiles?.email || "Unknown"}
                    </td>
                    <td className="px-3 py-2 text-slate-700">
                      {s.courses?.title || "N/A"}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          s.status === "completed"
                            ? "bg-emerald-50 text-emerald-600"
                            : s.status === "in_progress"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {s.status?.replace("_", " ") || "enrolled"}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-slate-700">
                      {s.hours_trained || 0}
                    </td>
                  </tr>
                ))}
                {(!students || students.length === 0) && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-sm text-slate-500"
                    >
                      No learners yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
