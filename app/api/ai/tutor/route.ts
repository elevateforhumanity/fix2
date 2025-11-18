import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@/utils/supabase/server';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { courseId, question } = await req.json();

  // Fetch course content for context
  const { data: course } = await supabase
    .from('courses')
    .select(
      `
      *,
      modules:course_modules(
        *,
        lessons:lessons(*)
      )
    `
    )
    .eq('id', courseId)
    .single();

  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }

  const context = JSON.stringify({
    title: course.title,
    description: course.description,
    modules: course.modules,
  });

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are an LMS tutor helping students understand course material. Answer questions clearly and concisely, providing examples when helpful. If the question is outside the course scope, politely redirect to the course content.',
        },
        {
          role: 'user',
          content: `Course content: ${context}\n\nStudent Question: ${question}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      answer: completion.choices[0].message.content,
    });
  } catch (error: any) {
    console.error('AI tutor error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get answer' },
      { status: 500 }
    );
  }
}
