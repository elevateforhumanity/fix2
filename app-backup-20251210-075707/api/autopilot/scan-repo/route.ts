import { scanRepo } from "@/lib/autopilot/repo-scanner";

export async function GET() {
  const res = await scanRepo();
  return Response.json(res);
}
