"use client";

import { useMemo, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseBySlug, type Course, type Lesson } from "@/lms-data/courses";
import { UniversalLessonPlayer } from "@/components/course/UniversalLessonPlayer";
import { CourseOutline } from "@/components/course/CourseOutline";

interface PageProps {
  params: { slug: string };
}

export default function CourseDetailPage({ params }: PageProps) {
  const course: Course | undefined = getCourseBySlug(params.slug);

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(() => {
    if (!course) return null;
    const firstModule = course.modules[0];
    if (!firstModule) return null;
    return firstModule.lessons[0] ?? null;
  });

  const title = course?.title || "Course not found";

  if (!course) {
    notFound();
  }

  const totalMinutes = useMemo(() => {
    return course.modules.reduce((acc, module) => {
      return (
        acc +
        module.lessons.reduce(
          (sum, lesson) => sum + (lesson.durationMinutes || 0),
          0
        )
      );
    }, 0);
  }, [course]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Course
          </p>
          <h1 className="mt-1 text-2xl font-bold">{title}</h1>
          {course.shortDescription && (
            <p className="mt-2 text-xs text-slate-300">
              {course.shortDescription}
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-slate-400">
            {course.level && (
              <span className="rounded-full border border-slate-700 px-2 py-0.5">
                Level: {course.level}
              </span>
            )}
            {course.estimatedWeeks && course.estimatedHoursPerWeek && (
              <span className="rounded-full border border-slate-700 px-2 py-0.5">
                Approx. {course.estimatedHoursPerWeek} hrs/week for{" "}
                {course.estimatedWeeks} weeks
              </span>
            )}
            {totalMinutes > 0 && (
              <span className="rounded-full border border-slate-700 px-2 py-0.5">
                ~{Math.round(totalMinutes / 60)} hours of content
              </span>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <Link
              href="/apply"
              className="rounded-md bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
            >
              Enroll in Program
            </Link>
            <Link
              href="/programs"
              className="rounded-md border border-slate-600 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* PLAYER + OUTLINE */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <div className="grid gap-4 md:grid-cols-[1.6fr,1.1fr]">
            <div className="space-y-3">
              {activeLesson ? (
                <UniversalLessonPlayer lesson={activeLesson} />
              ) : (
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
                  Choose a lesson from the outline to start.
                </div>
              )}
              {course.longDescription && (
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-200">
                  {course.longDescription}
                </div>
              )}
              <p className="text-[10px] text-slate-500">
                This course is meant to sit on top of credential partner
                content. Some sections may direct you to external platforms
                (Milady, IRS Link & Learn, HSI, CareerSafe, Intuit, etc.). Use
                Elevate to keep everything organized and aligned to funding.
              </p>
            </div>
            <CourseOutline
              course={course}
              activeLessonId={activeLesson?.id}
              onSelectLesson={(lesson: Lesson) => setActiveLesson(lesson)}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
