import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/rbac";

const VERCEL_API_BASE = "https://api.vercel.com";

interface RouteParams {
  params: { id: string };
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin(req);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;
  const { id: deploymentId } = params;

  if (!token || !projectId || !deploymentId) {
    return NextResponse.json(
      { error: "Missing Vercel API configuration or deployment id" },
      { status: 500 }
    );
  }

  const url = new URL(
    `${VERCEL_API_BASE}/v9/projects/${projectId}/rollback/${deploymentId}`
  );
  if (teamId) url.searchParams.set("teamId", teamId);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: "Rollback failed", details: text },
      { status: 500 }
    );
  }

  const data = await res.json().catch(() => ({}));

  return NextResponse.json({
    ok: true,
    message:
      "Instant rollback triggered. Note: new production auto-assign may be paused until you reconfigure in Vercel.",
    data,
  });
}
