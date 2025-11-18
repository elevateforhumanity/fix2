import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getMeetings(courseId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("meetings")
    .select("*")
    .eq("course_id", courseId)
    .order("start_time", { ascending: true });

  return data || [];
}

export default async function LiveClassPage({
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

  const meetings = await getMeetings(params.courseId);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-xl font-semibold text-slate-900">Live Classes</h1>
        <p className="mt-1 text-xs text-slate-600">
          Join your instructor-led Zoom or Teams sessions.
        </p>

        <div className="mt-4 space-y-3">
          {meetings.map((m) => {
            const startTime = new Date(m.start_time);
            const now = new Date();
            const isUpcoming = startTime > now;
            const isLive =
              startTime <= now &&
              now <= new Date(startTime.getTime() + m.duration_minutes * 60000);

            return (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900">{m.topic}</p>
                    {isLive && (
                      <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                        Live Now
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    {m.provider.toUpperCase()} •{" "}
                    {startTime.toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <Link
                  href={m.join_url}
                  className={`rounded-2xl px-3 py-1.5 text-xs font-semibold text-white shadow-sm ${
                    isLive
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-emerald-500 hover:bg-emerald-600"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isLive ? "Join Now" : "Join"}
                </Link>
              </div>
            );
          })}
          {meetings.length === 0 && (
            <p className="text-xs text-slate-500">
              No live classes scheduled yet.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
