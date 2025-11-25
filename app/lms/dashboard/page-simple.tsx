// app/lms/dashboard/page.tsx - Simplified Hub Version
import Link from "next/link";
import { 
  BookOpen, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  MessageCircle, 
  FileText 
} from "lucide-react";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Welcome back, Elevate Scholar
        </h1>
        <p className="text-sm text-slate-600">
          Track your progress, jump into your courses, and connect with your
          community.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="My Courses"
          description="Resume where you left off or start a new program."
          href="/lms/courses"
          icon={<BookOpen className="w-5 h-5" />}
          color="blue"
        />
        <DashboardCard
          title="Forums"
          description="Ask questions, share wins, and learn from others."
          href="/lms/forums"
          icon={<MessageSquare className="w-5 h-5" />}
          color="purple"
        />
        <DashboardCard
          title="Study Groups"
          description="Join live or in-person study groups and cohorts."
          href="/study-groups"
          icon={<Users className="w-5 h-5" />}
          color="green"
        />
        <DashboardCard
          title="My Analytics"
          description="See your streaks, completion, and time on task."
          href="/student/analytics"
          icon={<TrendingUp className="w-5 h-5" />}
          color="orange"
        />
        <DashboardCard
          title="AI Tutor Chat"
          description="Get instant help with lessons, quizzes, and concepts."
          href="/chat"
          icon={<MessageCircle className="w-5 h-5" />}
          color="red"
        />
        <DashboardCard
          title="Resources"
          description="Download guides, work keys, WIOA/WRG instructions, and more."
          href="/lms/resources"
          icon={<FileText className="w-5 h-5" />}
          color="slate"
        />
      </section>
    </div>
  );
}

function DashboardCard(props: {
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
