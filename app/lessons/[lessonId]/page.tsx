// app/lessons/[lessonId]/page.tsx

import { redirect, notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { LessonQuizSection } from "@/components/assessments/LessonQuizSection";
import Link from "next/link";
import { BookOpen, Download, MessageSquare, FileText, Captions } from "lucide-react";

interface LessonPageProps {
  params: { lessonId: string };
}

export const metadata = {
  title: "Lesson | Elevate For Humanity",
  description: "Interactive lesson with resources, transcript, quiz, and community.",
};

export default async function LessonPage({ params }: LessonPageProps) {
  const supabase = getSupabaseServerClient();
  const lessonId = params.lessonId;

  // 🔐 Get user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const userId = user.id;

  // 📚 Load lesson + program
  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select(
      `
      id,
      title,
      description,
      video_url,
      program_id
    `
    )
    .eq("id", lessonId)
    .maybeSingle();

  if (lessonError || !lesson) {
    notFound();
  }

  // 🎓 Load program (for breadcrumbs / context)
  const { data: program } = await supabase
    .from("programs")
    .select("id, name, slug")
    .eq("id", lesson.program_id)
    .maybeSingle();

  // 🧑‍🎓 Find enrollment for this user + program
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("user_id", userId)
    .eq("program_id", lesson.program_id)
    .maybeSingle();

  // 📎 Resources for this lesson
  const { data: resources } = await supabase
    .from("lesson_resources")
    .select("*")
    .eq("lesson_id", lesson.id)
    .order("order_index");

  // 🎧 Transcript
  const { data: transcript } = await supabase
    .from("video_transcripts")
    .select("*")
    .eq("lesson_id", lesson.id)
    .eq("language", "en")
    .maybeSingle();

  // ❓ Interactive quiz for this lesson (optional)
  const { data: quiz } = await supabase
    .from("interactive_quizzes")
    .select("id, title, passing_score")
    .eq("lesson_id", lesson.id)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Header / Breadcrumb */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <nav className="text-sm text-slate-400 mb-2">
            <Link href="/student/dashboard" className="hover:text-white">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            {program && (
              <>
                <Link href={`/programs/${program.slug}`} className="hover:text-white">
                  {program.name}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-white">{lesson.title}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {lesson.title}
          </h1>
          {lesson.description && (
            <p className="text-slate-300 max-w-2xl">{lesson.description}</p>
          )}
        </div>
      </section>

      {/* Main layout */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Video + Quiz */}
        <div className="lg:col-span-2 space-y-6">
          {/* 🎥 Video player */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="aspect-video bg-black flex items-center justify-center">
              {lesson.video_url ? (
                <video
                  src={lesson.video_url}
                  controls
                  className="w-full h-full"
                />
              ) : (
                <div className="text-slate-500 text-sm">
                  No video attached to this lesson yet.
                </div>
              )}
            </div>
          </div>

          {/* 🧪 Interactive Quiz */}
          {quiz && enrollment ? (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Knowledge Check: {quiz.title}
              </h2>
              <LessonQuizSection quizId={quiz.id} enrollmentId={enrollment.id} />
            </div>
          ) : (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 text-sm text-slate-400">
              {quiz
                ? "Enroll in this program to unlock the interactive quiz."
                : "Quiz coming soon for this lesson."}
            </div>
          )}
        </div>

        {/* Right: Resources / Transcript / Discussion */}
        <div className="space-y-6">
          {/* 📎 Resources */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">
                Lesson Resources
              </h3>
            </div>
            {resources && resources.length > 0 ? (
              <ul className="space-y-3">
                {resources.map((res: any) => (
                  <li
                    key={res.id}
                    className="flex items-start justify-between gap-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-white flex items-center gap-2">
                        <Download className="w-4 h-4 text-slate-400" />
                        {res.title}
                      </p>
                      {res.description && (
                        <p className="text-xs text-slate-400 mt-1">
                          {res.description}
                        </p>
                      )}
                    </div>
                    <a
                      href={res.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-200 hover:bg-orange-500 hover:text-white transition-colors"
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">
                No downloadable resources yet for this lesson.
              </p>
            )}
          </div>

          {/* 🎧 Transcript */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Captions className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">
                Transcript
              </h3>
            </div>
            {transcript ? (
              <div className="max-h-72 overflow-y-auto pr-2 text-sm text-slate-300 space-y-2">
                {transcript.transcript_text
                  .split("\n")
                  .filter((line: string) => line.trim().length > 0)
                  .map((line: string, idx: number) => (
                    <p key={idx}>{line}</p>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                Transcript will appear here once it's added.
              </p>
            )}
          </div>

          {/* 💬 Discussion */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">
                Lesson Discussion
              </h3>
            </div>
            <p className="text-sm text-slate-400 mb-3">
              Ask questions, share tips, and learn from other students taking this lesson.
            </p>
            <Link
              href={`/community?lessonId=${lesson.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Open Discussion in Community
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
