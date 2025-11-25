// app/admin/dashboard/page.tsx - Enhanced Admin Hub
import Link from "next/link";
import { 
  BarChart3, 
  FileText, 
  Edit3, 
  DollarSign, 
  Users, 
  Settings 
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Admin Control Center
        </h1>
        <p className="text-sm text-slate-600">
          Monitor programs, learners, funding, and outcomes in one place.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AdminCard
          title="Analytics Dashboard"
          description="Platform-wide engagement, completion, and activity."
          href="/admin/analytics"
          icon={<BarChart3 className="w-5 h-5" />}
          color="blue"
        />
        <AdminCard
          title="Reports & Caseloads"
          description="See On Track, At Risk, Not Engaged across all delegates."
          href="/admin/reports"
          icon={<FileText className="w-5 h-5" />}
          color="green"
        />
        <AdminCard
          title="Course Authoring"
          description="Create and edit programs, modules, and lessons."
          href="/admin/course-authoring"
          icon={<Edit3 className="w-5 h-5" />}
          color="purple"
        />
        <AdminCard
          title="Funding & Workforce"
          description="View WIOA/WRG/JRI pipelines and apprenticeship status."
          href="/admin/funding"
          icon={<DollarSign className="w-5 h-5" />}
          color="orange"
        />
        <AdminCard
          title="Program Holders"
          description="Onboard partners, manage MOUs, and track performance."
          href="/admin/program-holders"
          icon={<Users className="w-5 h-5" />}
          color="red"
        />
        <AdminCard
          title="Settings"
          description="Branding, video hosting, xAPI, and integrations."
          href="/admin/settings"
          icon={<Settings className="w-5 h-5" />}
          color="slate"
        />
      </section>
    </div>
  );
}

function AdminCard(props: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}) {
  const colorClasses = {
    blue: "border-blue-200 hover:border-blue-400 hover:bg-blue-50",
    purple: "border-purple-200 hover:border-purple-400 hover:bg-purple-50",
    green: "border-green-200 hover:border-green-400 hover:bg-green-50",
    orange: "border-orange-200 hover:border-orange-400 hover:bg-orange-50",
    red: "border-red-200 hover:border-red-400 hover:bg-red-50",
    slate: "border-slate-200 hover:border-slate-400 hover:bg-slate-50",
  };

  return (
    <Link
      href={props.href}
      className={`block rounded-2xl border-2 bg-white p-6 shadow-sm hover:shadow-md transition-all ${colorClasses[props.color as keyof typeof colorClasses]}`}
    >
      <div className="flex items-start gap-3">
        <div className="text-slate-700">{props.icon}</div>
        <div className="flex-1">
          <h2 className="text-base font-semibold mb-1 text-slate-900">{props.title}</h2>
          <p className="text-xs text-slate-600 leading-relaxed">{props.description}</p>
        </div>
      </div>
    </Link>
  );
}
