import { prepareDeploy } from "@/lib/autopilot/deploy-prep";

export async function POST() {
  const res = await prepareDeploy();
  return Response.json(res);
}
