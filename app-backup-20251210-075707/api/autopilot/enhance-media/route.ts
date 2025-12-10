import { enhanceImages } from "@/lib/autopilot/media-enhancer";

export async function POST() {
  const res = await enhanceImages();
  return Response.json(res);
}
