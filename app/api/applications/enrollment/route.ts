// app/api/applications/enrollment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      program_type, // WIOA, WRG, JRI, OJT, WEX, APPRENTICESHIP
      course_id,
      personal_info,
      employment_info,
      education_info,
      funding_info,
      documents,
      signature,
    } = body;

    // Validate required fields
    if (!program_type || !course_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create funding application
    const { data: application, error: appError } = await supabase
      .from("funding_applications")
      .insert({
        user_id: user.id,
        program_type,
        course_id,
        status: "pending",
        personal_info,
        employment_info,
        education_info,
        funding_info,
        documents,
        signature,
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (appError) {
      console.error("Error creating application:", appError);
      return NextResponse.json(
        { error: "Failed to create application" },
        { status: 500 }
      );
    }

    // Create enrollment record with pending status
    const { error: enrollError } = await supabase.from("enrollments").insert({
      user_id: user.id,
      course_id,
      status: "pending_approval",
      funding_program_id: funding_info?.program_id || null,
      started_at: new Date().toISOString(),
    });

    if (enrollError) {
      console.error("Error creating enrollment:", enrollError);
      // Don't fail the whole request, application is still created
    }

    // Send notification to admin
    await supabase.from("notifications").insert({
      user_id: user.id,
      type: "application_submitted",
      title: `New ${program_type} Application`,
      message: `Application for ${program_type} program has been submitted`,
      data: { application_id: application.id },
    });

    return NextResponse.json({
      success: true,
      application_id: application.id,
      status: "pending",
    });
  } catch (error) {
    console.error("[Enrollment Application Error]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let query = supabase
      .from("funding_applications")
      .select(
        `
        *,
        course:course_id(title, description)
      `
      )
      .eq("user_id", user.id)
      .order("submitted_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data: applications, error } = await query;

    if (error) {
      console.error("Error fetching applications:", error);
      return NextResponse.json(
        { error: "Failed to fetch applications" },
        { status: 500 }
      );
    }

    return NextResponse.json({ applications: applications || [] });
  } catch (error) {
    console.error("[Get Applications Error]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
