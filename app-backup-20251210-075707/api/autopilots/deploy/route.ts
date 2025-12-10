import { runAutopilot } from "@/lib/autopilot/runner";

export async function POST() {
  await runAutopilot("deploy-vercel");
  return Response.json({ ok: true });
}
