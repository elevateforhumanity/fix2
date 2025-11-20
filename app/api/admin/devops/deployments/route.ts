import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/rbac";

const VERCEL_API_BASE = "https://api.vercel.com";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId) {
    return NextResponse.json(
      { error: "Missing Vercel API configuration" },
      { status: 500 }
    );
  }

  const url = new URL(`${VERCEL_API_BASE}/v6/deployments`);
  url.searchParams.set("projectId", projectId);
  url.searchParams.set("limit", "20");
  url.searchParams.set("sort", "createdAt");
  url.searchParams.set("direction", "desc");
  if (teamId) url.searchParams.set("teamId", teamId);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: "Failed to fetch deployments", details: text },
      { status: 500 }
    );
  }

  const json = await res.json();

  // Normalize data for frontend
  const deployments = (json.deployments || []).map((d: any) => ({
    id: d.uid,
    url: d.url ? `https://${d.url}` : null,
    state: d.state || d.readyState,
    createdAt: d.created,
    createdBy: d.creator || d.meta?.user,
    target: d.target,
    meta: {
      gitBranch: d.meta?.githubCommitRef || d.meta?.branch,
      gitCommitSha: d.meta?.githubCommitSha,
      gitCommitMessage: d.meta?.githubCommitMessage,
    },
  }));

  return NextResponse.json({ deployments });
}
