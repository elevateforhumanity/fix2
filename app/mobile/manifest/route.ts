import { NextResponse } from "next/server";
import { mobileAppConfig } from "@/lms-data/mobileAppConfig";

export const runtime = "edge";

export async function GET() {
  // In the future you can:
  // - read auth token
  // - filter programs by learner
  // - override per-tenant settings
  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    config: mobileAppConfig,
  });
}
