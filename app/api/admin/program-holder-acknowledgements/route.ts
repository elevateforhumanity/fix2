import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // TODO: Add authentication check here
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user || user.role !== 'admin') {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { data, error } = await supabase
      .from("program_holder_acknowledgements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json(
        { error: "Failed to fetch acknowledgements" },
        { status: 500 }
      );
    }

    return NextResponse.json({ acknowledgements: data || [] });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}
