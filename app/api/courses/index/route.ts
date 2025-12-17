import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      logger.error("Supabase error:", error);
      return NextResponse.json({ error: toErrorMessage(error) }, { status: 400 });
    }

    return NextResponse.json(data || []);
  } catch (error: unknown) {
    logger.error("Get courses error:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses", message: toErrorMessage(error) },
      { status: 500 }
    );
  }
}
