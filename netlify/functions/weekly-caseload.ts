import { Client } from 'pg';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function handler() {
  try {
    const client = new Client({ connectionString: process.env.SUPABASE_DB_URL });
    await client.connect();

    // Get all program holders with owner email
    const phRes = await client.query(`
      select ph.id, ph.name, u.email as owner_email
      from program_holders ph
      left join auth.users u on u.id = ph.owner_user_id
      where u.email is not null
    `);
    const holders = phRes.rows;

    const today = new Date();
    const in7 = new Date();
    in7.setDate(today.getDate() + 7);

    for (const ph of holders) {
      if (!ph.owner_email) continue;

      // Get latest note per user/course for this program holder
      const notesRes = await client.query(`
        with latest_notes as (
          select distinct on (user_id, course_id)
            user_id, course_id, status, note, follow_up_date, follow_up_done, created_at
          from program_holder_notes
          where program_holder_id = $1
          order by user_id, course_id, created_at desc
        )
        select
          ln.user_id,
          ln.course_id,
          ln.status as case_status,
          ln.note,
          ln.follow_up_date,
          ln.follow_up_done,
          u.email as learner_email,
          c.title as course_title,
          fp.code as program_code
        from latest_notes ln
        join auth.users u on u.id = ln.user_id
        join courses c on c.id = ln.course_id
        left join enrollments e on e.user_id = ln.user_id and e.course_id = ln.course_id
        left join funding_programs fp on fp.id = e.funding_program_id
        where e.status = 'active'
      `, [ph.id]);

      const rows = notesRes.rows;

      // Filter to Behind or Dropped
      const concern = rows.filter(r => {
        const s = (r.case_status || '').toLowerCase();
        return s === 'behind' || s === 'dropped';
      });

      if (!concern.length) {
        // Skip if no concerns
        continue;
      }

      // Build email content with workforce terminology
      const lines: string[] = [];
      lines.push(`Hello ${ph.name},`);
      lines.push('');
      lines.push('This is your weekly caseload summary from Elevate for Humanity for participants assigned to your organization. The information below is based on the most recent case notes, follow-up dates, and training activity recorded in the portal.');
      lines.push('');
      lines.push('SUMMARY AT A GLANCE:');
      lines.push('');

      // Group by status
      const atRisk = concern.filter(r => (r.case_status || '').toLowerCase() === 'behind');
      const notEngaged = concern.filter(r => (r.case_status || '').toLowerCase() === 'dropped');

      lines.push(`Total participants flagged At Risk (Behind): ${atRisk.length}`);
      lines.push(`Total participants flagged Not Engaged (Dropped): ${notEngaged.length}`);
      lines.push('');
      lines.push('');
      lines.push('PARTICIPANTS NEEDING ATTENTION:');
      lines.push('');

      if (atRisk.length) {
        lines.push('--- AT RISK (BEHIND) ---');
        lines.push('');
        for (const r of atRisk) {
          let followUpText = 'Not scheduled';
          if (r.follow_up_date) {
            const d = new Date(r.follow_up_date);
            if (r.follow_up_done) {
              followUpText = `Completed – ${d.toISOString().slice(0, 10)}`;
            } else if (d < today) {
              followUpText = `Overdue – follow-up date ${d.toISOString().slice(0, 10)}`;
            } else if (d <= in7) {
              followUpText = `Due this week – ${d.toISOString().slice(0, 10)}`;
            } else {
              followUpText = `Future – ${d.toISOString().slice(0, 10)}`;
            }
          }

          lines.push(`Participant: ${r.learner_email}`);
          lines.push(`Program: ${r.program_code || 'Not specified'}`);
          lines.push(`Training Track: ${r.course_title}`);
          lines.push(`Current Case Status: At Risk (Behind)`);
          lines.push(`Last Case Note: ${r.note || 'No case note on file'}`);
          lines.push(`Follow-Up: ${followUpText}`);
          lines.push('');
        }
      }

      if (notEngaged.length) {
        lines.push('--- NOT ENGAGED (DROPPED) ---');
        lines.push('');
        for (const r of notEngaged) {
          lines.push(`Participant: ${r.learner_email}`);
          lines.push(`Program: ${r.program_code || 'Not specified'}`);
          lines.push(`Training Track: ${r.course_title}`);
          lines.push(`Current Case Status: Not Engaged (Dropped)`);
          lines.push(`Last Case Note: ${r.note || 'No case note on file'}`);
          lines.push('');
        }
      }

      lines.push('---');
      lines.push('');
      lines.push('You can review and update case notes, status, and follow-up dates here:');
      lines.push(`${process.env.NEXT_PUBLIC_BASE_URL}/delegate/reports`);
      lines.push('');
      lines.push('These records support compliance with state and federal workforce reporting and help document your ongoing engagement with each participant.');
      lines.push('');
      lines.push('If you have questions about your caseload data or need help accessing reports, please reach out to the Elevate for Humanity admin team.');
      lines.push('');
      lines.push('Thank you for partnering with us to support participants.');
      lines.push('');
      lines.push('Sincerely,');
      lines.push('Elevate for Humanity – Workforce Training & Case Management');

      // Send email
      await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: ph.owner_email,
        subject: `Weekly Caseload Summary – ${ph.name}`,
        text: lines.join('\n')
      });
    }

    await client.end();
    return { statusCode: 200, body: JSON.stringify({ sent: holders.length }) };
  } catch (e: any) {
    console.error('Weekly caseload error:', e);
    return { statusCode: 500, body: e.message };
  }
}
