import { NextRequest, NextResponse } from "next/server";
import { cloneRepository } from "@/lib/store/stripe-products";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Missing productId" },
        { status: 400 }
      );
    }

    // Get product details
    const supabase = await createClient();
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error || !product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Generate unique repo name
    const timestamp = Date.now();
    const newRepoName = `${product.repo.split('/')[1]}-clone-${timestamp}`;

    // Clone the repository
    const clonedRepo = await cloneRepository(product.repo, newRepoName);

    // Log the clone (optional - could save to database)
    await supabase.from("product_clones").insert({
      product_id: productId,
      cloned_repo: clonedRepo,
      cloned_at: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      message: "Repository cloned successfully!",
      repo: clonedRepo,
      url: `https://github.com/${clonedRepo}`,
    });

  } catch (error: any) {
    console.error("Clone codebase error:", error);
    return NextResponse.json(
      {
        error: "Failed to clone repository",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
