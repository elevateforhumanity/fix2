// app/admin/success/page.tsx
import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '@/lib/auth/getSession';
import { redirect } from 'next/navigation';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success - Success Stories - Real People, Real Results | Elevate for Humanity",
  description: "Read inspiring stories from graduates who transformed their lives through our career training programs and found meaningful employment.",
  keywords: ["success stories", "graduate testimonials", "career transformation", "job placement"],
  openGraph: {
    title: "Success - Success Stories - Real People, Real Results | Elevate for Humanity",
    description: "Read inspiring stories from graduates who transformed their lives through our career training programs and found meaningful employment.",
    images: ["/images/homepage/success-stories.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Success - Success Stories - Real People, Real Results | Elevate for Humanity",
    description: "Read inspiring stories from graduates who transformed their lives through our career training programs and found meaningful employment.",
    images: ["/images/homepage/success-stories.png"],
  },
};



// Force dynamic rendering - don't build at compile time
export const dynamic = 'force-dynamic';

function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

async function getSuccessMetrics() {
  const supabase = getSupabaseClient();
  const [
    { count: totalStudents },
    { count: totalPartners },
    { count: enrollments },
    { count: completedEnrollments },
    { count: activeTenants },
  ] = await Promise.all([
    supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'student'),
    supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'partner_admin'),
    supabase.from('enrollments').select('*', { count: 'exact', head: true }),
    supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed'),
    supabase.from('tenants').select('*', { count: 'exact', head: true }),
  ]);

  const completionRate =
    enrollments === 0 ? 0 : ((completedEnrollments || 0) / (enrollments || 1)) * 100;

  return {
    totalStudents: totalStudents || 0,
    totalPartners: totalPartners || 0,
    enrollments: enrollments || 0,
    completedEnrollments: completedEnrollments || 0,
    completionRate,
    activeTenants: activeTenants || 0,
  };
}

export default async function CustomerSuccessPage() {
  const session = await requireAuth();
  if (!(session as any)?.isAdmin) {
    redirect('/');
  }

  const metrics = await getSuccessMetrics();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">
          Customer Success Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          High-level view of student outcomes, partner adoption, and program
          health across all tenants.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Students
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {metrics.totalStudents}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Partner Admins
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {metrics.totalPartners}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Enrollments
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {metrics.enrollments}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Completion Rate
            </p>
            <p className="mt-2 text-2xl font-semibold text-emerald-600">
              {metrics.completionRate.toFixed(1)}%
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Active Tenants
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {metrics.activeTenants}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
