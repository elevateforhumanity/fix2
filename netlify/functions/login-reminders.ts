import { Client } from 'pg';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function handler() {
  try {
    const client = new Client({ connectionString: process.env.SUPABASE_DB_URL });
    await client.connect();

    // Get last login per user
    const res = await client.query(`
      with last_login as (
        select user_id, max(at) as last_at
        from login_events
        group by user_id
      )
      select u.id as user_id, u.email, ll.last_at
      from auth.users u
      left join last_login ll on ll.user_id = u.id
      join enrollments e on e.user_id = u.id
      where e.status = 'active'
    `);

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7); // 7 days ago

    const stale = res.rows.filter(r => !r.last_at || new Date(r.last_at) < cutoff);

    for (const s of stale) {
      if (!s.email) continue;

      // Send participant reminder
      await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: s.email,
        subject: 'Reminder: Log in to your Elevate training this week',
        text: `Hi,\n\nOur records show you haven't logged into your Elevate for Humanity training portal recently. To stay on track with your training plan, please log in and complete your next lesson as soon as you're able.\n\nYour training is an important step toward your employment and wage goals, and regular participation is required to keep your funding and case file in good standing.\n\nYou can sign in here:\n${process.env.NEXT_PUBLIC_BASE_URL}/lms/dashboard\n\nIf something is preventing you from participating (work, transportation, childcare, health, or anything else), please reply to this email or contact your Career Coach/Case Manager so we can support you.\n\nThank you,\nElevate for Humanity Support Team`
      });
    }

    await client.end();
    return { statusCode: 200, body: JSON.stringify({ sent: stale.length }) };
  } catch (e: any) {
    console.error('Login reminders error:', e);
    return { statusCode: 500, body: e.message };
  }
}
