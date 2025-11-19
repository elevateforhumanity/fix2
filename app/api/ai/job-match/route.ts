import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resumeText } = await req.json();

  if (!resumeText) {
    return NextResponse.json(
      { error: "Resume text required" },
      { status: 400 }
    );
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a career counselor for Elevate for Humanity, a workforce development platform.
Analyze resumes and match skills to:
1. Elevate training programs (healthcare, IT, manufacturing, hospitality)
2. WIOA-eligible occupations
3. Local job opportunities in Marion County, Indiana
4. Skills gaps and recommended training

Provide specific, actionable recommendations.`,
        },
        {
          role: "user",
          content: `Analyze this resume and provide program recommendations:\n\n${resumeText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const matches = completion.choices[0].message.content;

    // Log the job match for analytics
    await supabase.from("ai_job_matches").insert({
      user_id: user.id,
      resume_text: resumeText.slice(0, 1000), // Store first 1000 chars
      recommendations: matches,
    });

    return NextResponse.json({ matches });
  } catch (error: any) {
    console.error("Job match error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to match jobs" },
      { status: 500 }
    );
  }
}
