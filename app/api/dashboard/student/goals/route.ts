import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const dailyMinutes = Number(body?.dailyMinutes || 0);

  if (!dailyMinutes || dailyMinutes <= 0) {
    return NextResponse.json(
      { error: "dailyMinutes must be > 0" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("learning_goals")
    .upsert(
      {
        user_id: user.id,
        daily_minutes: dailyMinutes,
      },
      { onConflict: "user_id" }
    )
    .select()
    .single();

  if (error) {
    console.error("learning_goals upsert error", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  return NextResponse.json({ success: true, goal: data });
}
