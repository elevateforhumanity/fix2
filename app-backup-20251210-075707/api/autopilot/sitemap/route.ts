import { generateSitemap } from "@/lib/autopilot/sitemap-generator";

export async function GET() {
  const res = await generateSitemap();
  return Response.json(res);
}
