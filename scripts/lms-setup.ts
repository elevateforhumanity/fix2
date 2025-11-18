// scripts/lms-setup.ts
/**
 * LMS SETUP / AUTOFIX SCRIPT (LMS-FIRST)
 *
 * - Verifies required env vars for Supabase.
 * - Ensures core LMS roles exist (student, admin, program_holder, delegate).
 * - Ensures base programs (HVAC, Barber, Medical Assistant) exist.
 * - Marks any obviously fake demo courses by title, so UI can hide them.
 *
 * This DOES NOT wipe your real data. It only:
 * - Upserts a small set of canonical records.
 * - Flags demo-looking courses so the UI can ignore them.
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    '❌ Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

async function ensureRoles() {
  console.log('👥 Ensuring core LMS roles exist…');
  const roles = ['student', 'admin', 'program_holder', 'delegate'];

  for (const role of roles) {
    const { error } = await supabase
      .from('lms_roles')
      .upsert(
        { code: role, name: role.replace('_', ' ').toUpperCase() },
        { onConflict: 'code' }
      );

    if (error && error.code !== '42P01') {
      // 42P01 = table does not exist – silently skip if your schema names are different
      console.warn(`   ⚠️ Could not upsert role "${role}":`, error.message);
    }
  }
}

async function ensurePrograms() {
  console.log('📚 Ensuring flagship programs are present…');

  const programs = [
    {
      code: 'hvac',
      name: 'HVAC Technician – Workforce & Apprenticeship Pathway',
      description:
        'Hands-on HVAC Technician training aligned with Indiana workforce boards, WIOA, and employer partners.',
      category: 'Skilled Trades',
      delivery_mode: 'hybrid',
    },
    {
      code: 'barber',
      name: 'Barber Apprenticeship – Licensed in the Shop',
      description:
        'State-recognized Barber Apprenticeship program with on-the-job training directly inside partner barbershops.',
      category: 'Barber & Beauty',
      delivery_mode: 'hybrid',
    },
    {
      code: 'med-assistant',
      name: 'Medical Assistant – Clinical & Administrative Pathway',
      description:
        'Medical Assistant training in partnership with approved credentialing institutions, wrapped in WIOA-compliant supports.',
      category: 'Healthcare',
      delivery_mode: 'hybrid',
    },
  ];

  for (const program of programs) {
    const { error } = await supabase.from('programs').upsert(
      {
        code: program.code,
        name: program.name,
        description: program.description,
        category: program.category,
        delivery_mode: program.delivery_mode,
        is_active: true,
      },
      { onConflict: 'code' }
    );

    if (error && error.code !== '42P01') {
      console.warn(
        `   ⚠️ Could not upsert program "${program.code}":`,
        error.message
      );
    }
  }
}

async function flagDemoCourses() {
  console.log('🧹 Flagging obvious demo courses so UI can hide them…');

  const demoKeywords = ['Demo', 'Sample', 'Test Course', 'Playground', 'Fake'];

  for (const keyword of demoKeywords) {
    const { data, error } = await supabase
      .from('courses')
      .update({ is_demo: true })
      .like('title', `%${keyword}%`);

    if (error && error.code !== '42703') {
      // 42703 = column does not exist
      console.warn(
        `   ⚠️ Could not update demo flag for keyword "${keyword}":`,
        error.message
      );
    } else if (!error && data && data.length > 0) {
      console.log(
        `   ✅ Marked ${data.length} course(s) as demo for keyword "${keyword}".`
      );
    }
  }
}

async function main() {
  console.log('🚀 Running Elevate LMS setup (LMS-FIRST)…');

  await ensureRoles();
  await ensurePrograms();
  await flagDemoCourses();

  console.log(
    '✅ LMS setup complete. You can now run pnpm dev or pnpm lms:build.'
  );
}

main().catch((err) => {
  console.error('❌ LMS setup failed:', err);
  process.exit(1);
});
