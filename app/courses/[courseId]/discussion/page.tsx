// app/courses/[courseId]/discussion/page.tsx
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getThreads(courseId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("discussion_threads")
    .select("*")
    .eq("course_id", courseId)
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false });

  return data || [];
}

export default async function DiscussionPage({
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

  const threads = await getThreads(params.courseId);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-4xl px-4 py-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Course Discussion
            </h1>
            <p className="mt-1 text-xs text-slate-600">
              Ask questions, share tips, and support other learners.
            </p>
          </div>
          <Link
            href={`/courses/${params.courseId}/discussion/new`}
            className="rounded-2xl bg-orange-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-600"
          >
            New Thread
          </Link>
        </header>

        <div className="mt-6 space-y-3">
          {threads.map((t) => (
            <Link
              key={t.id}
              href={`/courses/${params.courseId}/discussion/${t.id}`}
              className="block rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm shadow-sm hover:border-orange-500"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900">{t.title}</p>
                {t.pinned && (
                  <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-600">
                    Pinned
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Created {new Date(t.created_at).toLocaleDateString()}
              </p>
            </Link>
          ))}
          {threads.length === 0 && (
            <p className="text-xs text-slate-500">
              No discussions yet. Be the first to start a conversation.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
