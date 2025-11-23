import GradebookClient from "./GradebookClient";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gradebook - Workforce Development Platform | Elevate for Humanity",
  description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
  keywords: ["workforce development", "career training", "job placement", "WIOA"],
  openGraph: {
    title: "Gradebook - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/hero-banner-new.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradebook - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/hero-banner-new.png"],
  },
};



async function getCourseGradebook(courseId: string, instructorId: string) {
  const supabase = await createClient();

  // Get course
  const { data: course } = await supabase
    .from("courses")
    .select("id, title, instructor_id")
    .eq("id", courseId)
    .eq("instructor_id", instructorId)
    .single();

  if (!course) return null;

  // Get enrollments with user info
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(
      `
      id,
      user_id,
      profiles:user_id (
        id,
        full_name,
        email
      )
    `
    )
    .eq("course_id", courseId);

  // Get grade items
  const { data: gradeItems } = await supabase
    .from("grade_items")
    .select("*")
    .eq("course_id", courseId)
    .order("created_at", { ascending: true });

  // Get all grades for this course
  const { data: grades } = await supabase
    .from("grades")
    .select("*")
    .in(
      "grade_item_id",
      (gradeItems || []).map((gi) => gi.id)
    );

  const students = (enrollments || []).map((e: any) => ({
    enrollmentId: e.id,
    userId: e.user_id,
    name: e.profiles?.full_name ?? e.profiles?.email ?? "Unknown",
    email: e.profiles?.email ?? "",
  }));

  return {
    course: { id: course.id, title: course.title },
    students,
    gradeItems: (gradeItems || []).map((gi: any) => ({
      id: gi.id,
      title: gi.title,
      category: gi.category,
      maxPoints: gi.max_points,
      grades: (grades || [])
        .filter((g: any) => g.grade_item_id === gi.id)
        .map((g: any) => ({
          enrollmentId: g.enrollment_id,
          points: Number(g.points),
        })),
    })),
  };
}

export default async function GradebookPage({
  params,
}: {
  params: { courseId: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check if user is instructor
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "instructor") {
    redirect("/");
  }

  const data = await getCourseGradebook(params.courseId, user.id);

  if (!data) {
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-4xl px-4 py-10">
          <p className="text-sm text-slate-600">
            Course not found or you don't have access.
          </p>
        </section>
      </main>
    );
  }

  return <GradebookClient initialData={data} />;
}
