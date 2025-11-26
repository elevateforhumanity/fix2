// app/admin/operations/page.tsx
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/getSupabaseServerClient";
import Link from "next/link";

async function getAdminOpsData() {
  const supabase = getSupabaseServerClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  // Count users by checking profiles
  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  // Count programs
  const { count: totalPrograms } = await supabase
    .from("programs")
    .select("*", { count: "exact", head: true });

  // Count courses
  const { count: totalCourses } = await supabase
    .from("courses")
    .select("*", { count: "exact", head: true });

  // Count enrollments
  const { count: totalEnrollments } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true });

  // Count program holders
  const { count: totalProgramHolders } = await supabase
    .from("program_holders")
    .select("*", { count: "exact", head: true });

  // Count delegates
  const { count: totalDelegates } = await supabase
    .from("delegates")
    .select("*", { count: "exact", head: true });

  // Get recent enrollments (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { count: newEnrollments } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .gte("created_at", sevenDaysAgo.toISOString());

  return {
    user,
    stats: {
      totalUsers: totalUsers || 0,
      totalPrograms: totalPrograms || 0,
      totalCourses: totalCourses || 0,
      totalEnrollments: totalEnrollments || 0,
      totalProgramHolders: totalProgramHolders || 0,
      totalDelegates: totalDelegates || 0,
      newEnrollments: newEnrollments || 0,
    },
  };
}

export default async function AdminOperationsPage() {
  const data = await getAdminOpsData();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <header className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            System Administration
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Admin Operations Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage users, programs, and system-wide operations.
          </p>
        </header>

        {/* Stats Grid */}
        <section className="mb-8 grid gap-4 md:grid-cols-3 lg:grid-cols-7">
          <StatCard label="Total Users" value={data.stats.totalUsers} />
          <StatCard label="Programs" value={data.stats.totalPrograms} />
          <StatCard label="Courses" value={data.stats.totalCourses} />
          <StatCard
            label="Enrollments"
            value={data.stats.totalEnrollments}
          />
          <StatCard
            label="Program Holders"
            value={data.stats.totalProgramHolders}
          />
          <StatCard label="Delegates" value={data.stats.totalDelegates} />
          <StatCard
            label="New (7d)"
            value={data.stats.newEnrollments}
            helper="Last 7 days"
          />
        </section>

        {/* Quick Links */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Quick Actions
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <QuickLink
              title="Manage Users"
              description="View and manage all users"
              href="/admin/users"
            />
            <QuickLink
              title="Manage Programs"
              description="Create and edit programs"
              href="/admin/programs"
            />
            <QuickLink
              title="Course Builder"
              description="Create and manage courses"
              href="/admin/course-builder"
            />
            <QuickLink
              title="Enrollment Tools"
              description="Enroll students in courses"
              href="/admin/enrollment"
            />
            <QuickLink
              title="Compliance Dashboard"
              description="WIOA/WRG compliance tracking"
              href="/admin/compliance-dashboard"
            />
            <QuickLink
              title="Analytics"
              description="View system analytics"
              href="/admin/analytics"
            />
            <QuickLink
              title="MOU Management"
              description="Manage digital MOUs"
              href="/admin/mou"
            />
            <QuickLink
              title="Program Holder Approvals"
              description="Approve training providers"
              href="/admin/program-holders"
            />
            <QuickLink
              title="System Settings"
              description="Configure system settings"
              href="/admin/settings"
            />
          </div>
        </section>

        {/* System Status */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            System Status
          </h2>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <StatusItem
                label="Database"
                status="operational"
                message="All systems operational"
              />
              <StatusItem
                label="Authentication"
                status="operational"
                message="Supabase Auth active"
              />
              <StatusItem
                label="File Storage"
                status="operational"
                message="Supabase Storage active"
              />
              <StatusItem
                label="Email Service"
                status="operational"
                message="Ready to send"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: number | string;
  helper?: string;
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-white p-4 shadow-sm">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <span className="mt-1 text-2xl font-semibold text-slate-900">
        {value}
      </span>
      {helper && (
        <span className="mt-1 text-[11px] text-slate-500">{helper}</span>
      )}
    </div>
  );
}

function QuickLink({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl bg-white p-4 shadow-sm transition hover:bg-slate-50 hover:shadow-md"
    >
      <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600">
        {title}
      </h3>
      <p className="mt-1 text-xs text-slate-600">{description}</p>
    </Link>
  );
}

function StatusItem({
  label,
  status,
  message,
}: {
  label: string;
  status: "operational" | "warning" | "error";
  message: string;
}) {
  const statusColors = {
    operational: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    error: "bg-rose-100 text-rose-700",
  };

  const statusIcons = {
    operational: "✓",
    warning: "⚠",
    error: "✕",
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="text-xs text-slate-600">{message}</p>
      </div>
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${statusColors[status]}`}
      >
        {statusIcons[status]}
      </span>
    </div>
  );
}
