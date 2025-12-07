import { NextRequest, NextResponse } from "next/server";
import { getUserOctokit } from "@/lib/github";

export async function GET(req: NextRequest) {
  const token = req.headers.get("x-gh-token");
  const repo = req.nextUrl.searchParams.get("repo");
  const ref = req.nextUrl.searchParams.get("ref") || "main";
  
  if (!token) {
    return NextResponse.json({ error: "Missing GitHub token" }, { status: 401 });
  }
  
  if (!repo) {
    return NextResponse.json({ error: "Missing repo parameter" }, { status: 400 });
  }

  try {
    const [owner, name] = repo.split("/");
    const gh = getUserOctokit(token);
    
    // Get the latest commit
    const { data: commit } = await gh.repos.getCommit({ 
      owner, 
      repo: name, 
      ref 
    });
    
    // Get the file tree
    const { data: tree } = await gh.git.getTree({ 
      owner, 
      repo: name, 
      tree_sha: commit.sha, 
      recursive: "true" 
    });

    // Filter to only files (not directories)
    const files = tree.tree
      ?.filter(n => n.type === "blob")
      .map(n => ({
        path: n.path,
        sha: n.sha,
        size: n.size
      })) || [];
    
    return NextResponse.json({ 
      ref, 
      commit: commit.sha,
      files 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: "Failed to fetch file tree", 
      message: error.message 
    }, { status: 500 });
  }
}
