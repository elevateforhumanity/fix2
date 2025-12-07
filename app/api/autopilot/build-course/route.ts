import { buildCourse } from "@/lib/autopilot/ai-course-builder";

export async function POST(req: Request) {
  const payload = await req.json();
  const res = await buildCourse(payload);
  return Response.json(res);
}
