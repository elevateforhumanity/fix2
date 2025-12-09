#!/usr/bin/env node
/**
 * Seed Barber Apprenticeship (Indiana) Program to Supabase
 * 
 * Usage:
 *   pnpm tsx scripts/seed-barber-program.ts
 * 
 * Requirements:
 *   - SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   - data/programs/barber-apprenticeship-indiana.json exists
 */

import { supabaseAdmin as supabase } from '../lib/supabaseAdmin.js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Verify environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || SUPABASE_URL.includes('placeholder')) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  console.error('   Set these in .env.local or environment variables');
  process.exit(1);
}

// Fixed UUIDs for consistency
const AI_INSTRUCTOR_ELIZABETH_ID = '11111111-1111-1111-1111-111111111111';
const AI_INSTRUCTOR_BARBER_MENTOR_ID = '22222222-2222-2222-2222-222222222222';
const BARBER_PROGRAM_ID = '33333333-3333-3333-3333-333333333333';

// Module IDs (fixed for idempotency)
const MODULE_IDS = {
  'BARB-ORIENT': '44444444-4444-4444-4444-444444444444',
  'BARB-MILADY-RISE': '55555555-5555-5555-5555-555555555555',
  'BARB-MILADY-THEORY-1': '66666666-6666-6666-6666-666666666666',
  'BARB-MILADY-THEORY-2': '77777777-7777-7777-7777-777777777777',
  'BARB-MILADY-THEORY-3': '88888888-8888-8888-8888-888888888888',
  'BARB-EFH-THEORY-CHECKPOINT': '99999999-9999-9999-9999-999999999999',
  'BARB-SHOP-FOUNDATIONS': 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'BARB-SHOP-INTERMEDIATE': 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'BARB-SHOP-ADVANCED': 'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'BARB-CAPSTONE': 'dddddddd-dddd-dddd-dddd-dddddddddddd'
};

interface ProgramModule {
  short_code: string;
  title: string;
  type: 'internal' | 'external_partner';
  order_index: number;
  required_hours: number;
  ai_instructor: string;
  requires_proof: boolean;
  partner_name?: string;
  external_url?: string;
  is_capstone?: boolean;
  implementation_notes: string;
}

interface ProgramData {
  slug: string;
  name: string;
  category: string;
  delivery_mode: string;
  location_state: string;
  total_hours: number;
  description: string;
  modules: ProgramModule[];
}

async function seedAIInstructors() {
  console.log('\n📚 Seeding AI Instructors...');

  const instructors = [
    {
      id: AI_INSTRUCTOR_ELIZABETH_ID,
      name: 'Elizabeth L. Greene (AI)',
      title: 'Founder & Lead Barber Apprenticeship Instructor',
      avatar_image_url: '/images/instructors/elizabeth-barber.jpg',
      cloned_from_user: 'Elizabeth L. Greene',
      bio: 'AI-guided version of Elizabeth to coach barber students, explain Indiana requirements, and walk them through Milady and shop-based modules.'
    },
    {
      id: AI_INSTRUCTOR_BARBER_MENTOR_ID,
      name: 'Barber Mentor (AI)',
      title: 'Shop-Based Instructor & Practical Skills Coach',
      avatar_image_url: '/images/instructors/barber-mentor.jpg',
      cloned_from_user: 'EFH Barber Mentor',
      bio: 'AI instructor that represents the experienced barber or shop owner guiding students through in-shop practical cuts, safety, and daily expectations.'
    }
  ];

  for (const instructor of instructors) {
    const { error } = await supabase
      .from('ai_instructors')
      .upsert(instructor, { onConflict: 'id' });

    if (error) {
      console.error(`   ❌ Failed to seed ${instructor.name}:`, error.message);
    } else {
      console.log(`   ✅ ${instructor.name}`);
    }
  }
}

async function seedProgram(programData: ProgramData) {
  console.log('\n🎓 Seeding Barber Program...');

  const program = {
    id: BARBER_PROGRAM_ID,
    slug: programData.slug,
    name: programData.name,
    category: programData.category,
    description: programData.description,
    delivery_mode: programData.delivery_mode,
    location_state: programData.location_state,
    is_active: true
  };

  const { error } = await supabase
    .from('programs')
    .upsert(program, { onConflict: 'id' });

  if (error) {
    console.error('   ❌ Failed to seed program:', error.message);
    throw error;
  }

  console.log(`   ✅ ${program.name}`);
}

async function seedModules(programData: ProgramData) {
  console.log('\n📦 Seeding Course Modules...');

  // Delete existing modules for this program (clean slate)
  const { error: deleteError } = await supabase
    .from('course_modules')
    .delete()
    .eq('program_id', BARBER_PROGRAM_ID);

  if (deleteError) {
    console.warn('   ⚠️  Could not delete existing modules:', deleteError.message);
  }

  for (const module of programData.modules) {
    const moduleId = MODULE_IDS[module.short_code as keyof typeof MODULE_IDS];
    
    if (!moduleId) {
      console.error(`   ❌ No UUID mapping for ${module.short_code}`);
      continue;
    }

    const aiInstructorId = module.ai_instructor === 'Elizabeth' 
      ? AI_INSTRUCTOR_ELIZABETH_ID 
      : AI_INSTRUCTOR_BARBER_MENTOR_ID;

    const moduleRecord = {
      id: moduleId,
      program_id: BARBER_PROGRAM_ID,
      title: module.title,
      short_code: module.short_code,
      description: module.implementation_notes,
      order_index: module.order_index,
      type: module.type,
      partner_name: module.partner_name || null,
      external_url: module.external_url || null,
      required_hours: module.required_hours,
      requires_proof: module.requires_proof,
      ai_instructor_id: aiInstructorId,
      is_capstone: module.is_capstone || false,
      implementation_notes: module.implementation_notes
    };

    const { error } = await supabase
      .from('course_modules')
      .insert(moduleRecord);

    if (error) {
      console.error(`   ❌ Failed to seed ${module.short_code}:`, error.message);
    } else {
      console.log(`   ✅ ${module.short_code}: ${module.title}`);
    }
  }
}

async function verifySeeding() {
  console.log('\n🔍 Verifying Seeded Data...');

  // Check program
  const { data: program, error: programError } = await supabase
    .from('programs')
    .select('*')
    .eq('id', BARBER_PROGRAM_ID)
    .single();

  if (programError || !program) {
    console.error('   ❌ Program not found');
    return false;
  }
  console.log(`   ✅ Program: ${program.name}`);

  // Check modules
  const { data: modules, error: modulesError } = await supabase
    .from('course_modules')
    .select('*')
    .eq('program_id', BARBER_PROGRAM_ID)
    .order('order_index');

  if (modulesError || !modules) {
    console.error('   ❌ Modules not found');
    return false;
  }
  console.log(`   ✅ Modules: ${modules.length} found`);

  // Check AI instructors
  const { data: instructors, error: instructorsError } = await supabase
    .from('ai_instructors')
    .select('*')
    .in('id', [AI_INSTRUCTOR_ELIZABETH_ID, AI_INSTRUCTOR_BARBER_MENTOR_ID]);

  if (instructorsError || !instructors || instructors.length !== 2) {
    console.error('   ❌ AI Instructors not found');
    return false;
  }
  console.log(`   ✅ AI Instructors: ${instructors.length} found`);

  return true;
}

async function main() {
  console.log('🚀 Starting Barber Apprenticeship (Indiana) Seed Script\n');
  console.log('📍 Supabase URL:', SUPABASE_URL);

  try {
    // Load program data
    const jsonPath = join(process.cwd(), 'data/programs/barber-apprenticeship-indiana.json');
    const programData: ProgramData = JSON.parse(readFileSync(jsonPath, 'utf-8'));

    console.log(`📄 Loaded program data: ${programData.name}`);
    console.log(`   Total Hours: ${programData.total_hours}`);
    console.log(`   Modules: ${programData.modules.length}`);

    // Seed in order
    await seedAIInstructors();
    await seedProgram(programData);
    await seedModules(programData);

    // Verify
    const success = await verifySeeding();

    if (success) {
      console.log('\n✅ Barber Apprenticeship (Indiana) seeded successfully!');
      console.log('\n📋 Next Steps:');
      console.log('   1. Visit your Supabase dashboard to verify tables');
      console.log('   2. Test the program page: /programs/barber-apprenticeship-in');
      console.log('   3. Clone this pattern for other programs (Healthcare, CDL, etc.)');
      console.log('\n🔗 Program ID:', BARBER_PROGRAM_ID);
      process.exit(0);
    } else {
      console.error('\n❌ Verification failed. Check Supabase logs.');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Seed script failed:', error);
    process.exit(1);
  }
}

main();
