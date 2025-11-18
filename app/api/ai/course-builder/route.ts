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

  const { topic, level, tenantId } = await req.json();

  const prompt = `
Create a full LMS course structure on "${topic}" for workforce development at ${level || 'intermediate'} level.
Include:
- 6 modules with clear learning objectives
- 4–8 lessons per module with detailed content outlines
- Quiz questions for each module (5-10 questions)
- Final exam blueprint with 20-30 questions
- Hands-on lab tasks and practical exercises
- WIOA-aligned skills mapping
- SCORM-friendly structure with sequencing
- Estimated completion time for each module
- Prerequisites and recommended background

Format as JSON with this structure:
{
  "title": "Course Title",
  "description": "Course description",
  "modules": [
    {
      "title": "Module Title",
      "objectives": ["objective 1", "objective 2"],
      "lessons": [
        {
          "title": "Lesson Title",
          "content": "Lesson content outline",
          "duration_minutes": 30
        }
      ],
      "quiz": [
        {
          "question": "Question text",
          "options": ["A", "B", "C", "D"],
          "correct": "A"
        }
      ]
    }
  ]
}
`;

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;

    const { data: course } = await supabase
      .from('ai_generated_courses')
      .insert({
        tenant_id: tenantId,
        topic,
        level,
        output: content!,
      })
      .select()
      .single();

    return NextResponse.json({ course, content });
  } catch (error: any) {
    console.error('AI course builder error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate course' },
      { status: 500 }
    );
  }
}
