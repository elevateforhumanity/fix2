import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("course_leaderboard")
    .select("user_id, progress_percent")
    .eq("course_id", params.courseId)
    .order("progress_percent", { ascending: false })
    .limit(10);

  if (error) {
    console.error("leaderboard error", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  // Optionally join profile names
  const userIds = data?.map((r) => r.user_id) || [];
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name")
    .in("id", userIds);

  const nameMap = new Map(
    (profiles || []).map((p) => [p.id, p.full_name || "Learner"])
  );

  const rows = (data || []).map((row, index) => ({
    rank: index + 1,
    userId: row.user_id,
    name: nameMap.get(row.user_id) || "Learner",
    progress: row.progress_percent,
  }));

  return NextResponse.json({ leaderboard: rows });
}
