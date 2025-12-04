// app/student/courses/[courseId]/external/[moduleId]/page.tsx
// External partner module page - shows partner course as part of Elevate course

import { getSupabaseServerClient } from "@/lib/supabaseServer";
import ExternalModuleClient from "./ExternalModuleClient";
import { redirect } from "next/navigation";

type Props = {
  params: { courseId: string; moduleId: string };
};

export default async function ExternalPartnerModulePage({ params }: Props) {
  const supabase = getSupabaseServerClient();
  const { courseId, moduleId } = params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/student/courses/" + courseId);
  }

  // Fetch module details
  const { data: module, error: moduleError } = await supabase
    .from("external_partner_modules")
    .select("*")
    .eq("id", moduleId)
    .eq("course_id", courseId)
    .single();

  if (moduleError || !module) {
    console.error(moduleError);
    return (
      <main className="p-6">
        <p className="text-sm text-red-600">
          External partner module not found.
        </p>
      </main>
    );
  }

  // Fetch student's progress
  const { data: progress } = await supabase
    .from("external_partner_progress")
    .select("*")
    .eq("module_id", moduleId)
    .eq("user_id", user.id)
    .single();

  // Fetch course details for breadcrumb
  const { data: course } = await supabase
    .from("courses")
    .select("title")
    .eq("id", courseId)
    .single();

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      {course && (
        <nav className="mb-6 text-xs text-slate-600">
          <a
            href={`/student/courses/${courseId}`}
            className="hover:text-emerald-600"
          >
            ← Back to {course.title}
          </a>
        </nav>
      )}
      <ExternalModuleClient
        userId={user.id}
        module={module}
        initialProgress={progress || null}
      />
    </main>
  );
}
