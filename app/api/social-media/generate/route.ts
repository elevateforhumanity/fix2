import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PROGRAM_INFO = {
  barber: "DOL Registered Apprenticeship. 1500 hours. Earn $15-18/hour while learning. State-licensed. 100% free (WIOA-funded).",
  cna: "Certified Nursing Assistant. 4-6 weeks. High demand in Indianapolis hospitals. $16-20/hour starting. WIOA-funded.",
  cdl: "Commercial Driver's License Class A. 4-6 weeks. $50K-70K/year. High demand. WIOA-funded.",
  hvac: "HVAC Technician. EPA 608 certification. 6-12 months. $45K-65K/year. ETPL-approved.",
  welding: "Welding Certification (AWS). 6-12 months. $40K-60K/year. High demand in manufacturing.",
  'medical-assistant': "Medical Assistant. 8-12 weeks. $35K-45K/year. Clinical + administrative. WIOA-funded.",
  phlebotomy: "Phlebotomy Technician. 4-6 weeks. $30K-40K/year. High demand in healthcare.",
  'dental-assistant': "Dental Assistant. 8-12 weeks. $35K-45K/year. Clinical + front office.",
  all: "14+ workforce training programs. 100% free (WIOA-funded). Earn while you learn. Job placement assistance.",
};

export async function POST(req: Request) {
  try {
    const { program, count, contentSource } = await req.json();

    if (contentSource === 'blog') {
      // TODO: Fetch from blog posts
      return NextResponse.json({
        success: true,
        posts: Array(count).fill('Blog post content will be pulled from your blog system'),
      });
    }

    if (contentSource === 'manual') {
      return NextResponse.json({
        success: true,
        posts: Array(count).fill(''),
      });
    }

    // AI Generation
    const programInfo = PROGRAM_INFO[program as keyof typeof PROGRAM_INFO] || PROGRAM_INFO.all;
    
    const prompt = `Create ${count} engaging social media posts for Elevate for Humanity, a workforce training organization in Indianapolis.

Program Focus: ${program === 'all' ? 'All Programs' : program}
Program Details: ${programInfo}

Requirements:
- Mix of post types: success stories, program highlights, WIOA eligibility info, career outcomes, application CTAs
- Keep posts under 280 characters for Twitter compatibility
- Include relevant hashtags (#WorkforceDevelopment #Indianapolis #WIOA #CareerTraining)
- Emphasize "100% free" and "earn while you learn"
- Include call-to-action (Apply now, Learn more, Call us)
- Vary tone: inspirational, informational, urgent
- Mention Indianapolis/Indiana when relevant
- Focus on career outcomes and earning potential

Return ONLY a JSON array of ${count} posts, no other text.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a social media expert for workforce training. Create engaging, action-oriented posts that drive applications. Return only valid JSON array of strings."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.9,
      max_tokens: 3000,
    });

    const content = completion.choices[0].message.content || '[]';
    
    // Parse JSON response
    let posts: string[];
    try {
      posts = JSON.parse(content);
    } catch {
      // Fallback if not valid JSON
      posts = content.split('\n').filter(line => line.trim().length > 0);
    }

    // Ensure we have the right number of posts
    if (posts.length < count) {
      posts = [...posts, ...Array(count - posts.length).fill(posts[0] || 'Post content')];
    }
    posts = posts.slice(0, count);

    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    console.error('Social media generation error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
