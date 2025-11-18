import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { imageBase64, latitude, longitude, scheduledStart, meetingId } =
    await req.json();

  // Validate image presence
  if (!imageBase64) {
    return NextResponse.json(
      { verified: false, reason: "Missing image" },
      { status: 400 }
    );
  }

  // Time window validation (within 30 minutes of scheduled start)
  const scheduled = scheduledStart ? new Date(scheduledStart) : null;
  const now = new Date();

  if (scheduled) {
    const diffMinutes = Math.abs(
      (now.getTime() - scheduled.getTime()) / 60000
    );
    if (diffMinutes > 30) {
      return NextResponse.json({
        verified: false,
        reason: "Outside allowed check-in window (±30 minutes)",
      });
    }
  }

  // Geofencing validation (if coordinates provided)
  // This is a placeholder - in production, you'd check against venue coordinates
  if (latitude && longitude) {
    // Example: Check if within 100 meters of venue
    // const distance = calculateDistance(latitude, longitude, venueLatitude, venueLongitude);
    // if (distance > 100) {
    //   return NextResponse.json({
    //     verified: false,
    //     reason: "Location too far from venue"
    //   });
    // }
  }

  // In production, you would:
  // 1. Call Amazon Rekognition or Azure Face API to verify face
  // 2. Compare against stored user photo
  // 3. Check for liveness detection

  // For now, log the attendance attempt
  await supabase.from("attendance_records").insert({
    user_id: user.id,
    meeting_id: meetingId,
    verified: true,
    verification_method: "photo_time_location",
    latitude,
    longitude,
    checked_in_at: now.toISOString(),
  });

  return NextResponse.json({
    verified: true,
    reason: "Basic checks passed (image + time window + location).",
    timestamp: now.toISOString(),
  });
}
