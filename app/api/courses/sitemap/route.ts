import { NextRequest, NextResponse } from "next/server";
import { gh, parseRepo } from "@/lib/github";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const repo = searchParams.get("repo") || "elevateforhumanity/fix2";
    const branch = searchParams.get("branch") || "main";

    const client = gh();
    const { owner, name } = parseRepo(repo);

    // Get the tree recursively
    const { data: tree } = await client.git.getTree({
      owner,
      repo: name,
      tree_sha: branch,
      recursive: "true",
    });

    // Get all course-related files
    const courseFiles = tree.tree
      ?.filter((item) => 
        item.path?.startsWith("courses/") && 
        item.type === "blob"
      )
      .map((item) => ({
        path: item.path,
        type: item.path?.split('.').pop(),
        size: item.size,
      })) || [];

    // Organize by course
    const sitemap: Record<string, any> = {};
    
    courseFiles.forEach((file) => {
      const parts = file.path!.split("/");
      const courseSlug = parts[1];
      
      if (!sitemap[courseSlug]) {
        sitemap[courseSlug] = {
          slug: courseSlug,
          files: [],
          modules: new Set(),
          lessons: [],
        };
      }
      
      sitemap[courseSlug].files.push(file.path);
      
      // Track modules
      if (parts.length > 3 && parts[2] === "modules") {
        sitemap[courseSlug].modules.add(parts[3]);
      }
      
      // Track lessons
      if (file.path!.endsWith('.html') || file.path!.endsWith('.md')) {
        sitemap[courseSlug].lessons.push(file.path);
      }
    });

    // Convert sets to arrays
    Object.keys(sitemap).forEach((key) => {
      sitemap[key].modules = Array.from(sitemap[key].modules);
    });

    return NextResponse.json({
      sitemap,
      courses: Object.keys(sitemap),
      totalFiles: courseFiles.length,
    });
  } catch (error: any) {
    console.error("Generate sitemap error:", error);
    return NextResponse.json(
      { error: "Failed to generate sitemap", message: error.message },
      { status: 500 }
    );
  }
}
