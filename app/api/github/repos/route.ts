import { NextRequest, NextResponse } from "next/server";
import { getUserOctokit } from "@/lib/github";

export async function GET(req: NextRequest) {
  const token = req.headers.get("x-gh-token");
  
  if (!token) {
    return NextResponse.json({ error: "Missing GitHub token" }, { status: 401 });
  }

  try {
    const gh = getUserOctokit(token);
    const { data } = await gh.repos.listForAuthenticatedUser({ 
      per_page: 100, 
      sort: "updated" 
    });
    
    const repos = data.map(r => ({ 
      name: r.name, 
      full_name: r.full_name, 
      private: r.private, 
      default_branch: r.default_branch,
      description: r.description,
      updated_at: r.updated_at
    }));
    
    return NextResponse.json(repos);
  } catch (error: any) {
    return NextResponse.json({ 
      error: "Failed to fetch repos", 
      message: error.message 
    }, { status: 500 });
  }
}
