import { NextRequest, NextResponse } from "next/server";
import { getUserOctokit } from "@/lib/github";

export async function GET(req: NextRequest) {
  const token = req.headers.get("x-gh-token");
  const repo = req.nextUrl.searchParams.get("repo");
  const path = req.nextUrl.searchParams.get("path");
  const ref = req.nextUrl.searchParams.get("ref") || "main";
  
  if (!token) {
    return NextResponse.json({ error: "Missing GitHub token" }, { status: 401 });
  }
  
  if (!repo || !path) {
    return NextResponse.json({ error: "Missing repo or path parameter" }, { status: 400 });
  }

  try {
    const [owner, name] = repo.split("/");
    const gh = getUserOctokit(token);
    
    const { data } = await gh.repos.getContent({ 
      owner, 
      repo: name, 
      path, 
      ref 
    });
    
    // Decode base64 content
    const content = Buffer.from((data as any).content, "base64").toString("utf8");
    
    return NextResponse.json({ 
      content, 
      sha: (data as any).sha,
      size: (data as any).size
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: "Failed to fetch file", 
      message: error.message 
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const token = req.headers.get("x-gh-token");
  
  if (!token) {
    return NextResponse.json({ error: "Missing GitHub token" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { repo, path, message, content, sha, branch = "main" } = body;
    
    if (!repo || !path || !message || !content) {
      return NextResponse.json({ 
        error: "Missing required fields" 
      }, { status: 400 });
    }

    const [owner, name] = repo.split("/");
    const gh = getUserOctokit(token);
    
    const res = await gh.repos.createOrUpdateFileContents({
      owner, 
      repo: name, 
      path, 
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      sha, 
      branch,
    });
    
    return NextResponse.json({ 
      ok: true, 
      commit: res.data.commit.sha,
      content: res.data.content
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: "Failed to save file", 
      message: error.message 
    }, { status: 500 });
  }
}
