import type { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

export const handler: Handler = async (event) => {
  try {
    const { userId, courseId } = JSON.parse(event.body || '{}');
    if (!userId || !courseId) {
      return { statusCode: 400, body: 'Missing userId/courseId' };
    }

    // Pull last attempts + mastery
    const { data: attempts } = await supabase
      .from('qbank_attempts')
      .select('answers, score_percent, created_at')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .order('created_at', { ascending: false })
      .limit(5);

    // Summarize weak topics
    const topicTotals: Record<string, { correct: number; total: number }> = {};
    attempts?.forEach((a) => {
      (a.answers as any[]).forEach((ans) => {
        const topic = ans.topic || 'General';
        topicTotals[topic] = topicTotals[topic] || { correct: 0, total: 0 };
        topicTotals[topic].total += 1;
        if (ans.correct) topicTotals[topic].correct += 1;
      });
    });

    const topicSummary = Object.entries(topicTotals)
      .map(([k, v]) => ({
        topic: k,
        pct: v.total ? v.correct / v.total : 0,
      }))
      .sort((a, b) => a.pct - b.pct);

    // Generate plan using AI (OpenAI or compatible)
    const AI_API_KEY = process.env.AI_API_KEY;
    const AI_API_BASE = process.env.AI_API_BASE || 'https://api.openai.com/v1';
    const AI_MODEL = process.env.AI_MODEL || 'gpt-4o-mini';

    if (!AI_API_KEY) {
      // Fallback: generate simple plan without AI
      const plan = {
        tasks: topicSummary.slice(0, 4).map((t) => ({
          title: `Review ${t.topic}`,
          detail: `Current mastery: ${Math.round(t.pct * 100)}%. Focus on practice questions and key concepts.`,
        })),
      };

      await supabase
        .from('coach_plans')
        .insert({ user_id: userId, course_id: courseId, plan });

      return { statusCode: 200, body: JSON.stringify({ plan }) };
    }

    const prompt = `You are a study coach. Given weak topics and exam proximity, produce a JSON plan with 4-6 tasks. Weak topics: ${JSON.stringify(topicSummary)}.`;

    const response = await fetch(`${AI_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          {
            role: 'system',
            content:
              'Return only valid JSON with keys: tasks:[{title,detail}]',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
      }),
    });

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '{"tasks":[]}';
    const plan = JSON.parse(content);

    await supabase
      .from('coach_plans')
      .insert({ user_id: userId, course_id: courseId, plan });

    return { statusCode: 200, body: JSON.stringify({ plan }) };
  } catch (e: any) {
    console.error('AI Coach error:', e);
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
