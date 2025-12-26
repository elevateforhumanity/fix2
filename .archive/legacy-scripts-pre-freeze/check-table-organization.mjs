import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://cuxzzpsyufcewtmicszk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE'
);

console.log('🔍 CHECKING TABLE ORGANIZATION & DUPLICATES\n');
console.log('=' .repeat(80));

// Check for duplicate/similar tables
console.log('\n📊 CHECKING FOR DUPLICATE TABLES...\n');

const allTables = [
  'profiles', 'users', 'auth_users',
  'applications', 'enrollments', 'enrollment_documents',
  'programs', 'courses', 'lessons', 'lesson_progress', 'lesson_completions',
  'certificates', 'achievements', 'badges',
  'forum_categories', 'forum_threads', 'forum_posts', 'forum_replies',
  'discussion_posts', 'discussion_threads', 'discussion_categories',
  'ai_conversations', 'ai_messages', 'chat_messages',
  'contact_messages', 'support_tickets', 'help_requests',
  'sam_opportunities', 'grant_applications',
  'partners', 'organizations', 'program_holders', 'delegates',
  'workforce_boards', 'employers', 'job_postings',
  'payments', 'transactions', 'invoices',
  'documents', 'uploads', 'attachments',
  'notifications', 'messages', 'emails',
  'analytics_events', 'page_views', 'user_sessions',
  'settings', 'configurations', 'feature_flags',
  'audit_logs', 'activity_logs', 'error_logs'
];

const existingTables = [];
const duplicateGroups = {};

for (const table of allTables) {
  try {
    const { error } = await supabase.from(table).select('*', { count: 'exact', head: true });
    if (!error) {
      existingTables.push(table);
    }
  } catch (err) {}
}

console.log(`Total tables found: ${existingTables.length}\n`);

// Check for potential duplicates
const potentialDuplicates = [
  ['profiles', 'users', 'auth_users'],
  ['forum_posts', 'discussion_posts'],
  ['forum_threads', 'discussion_threads'],
  ['forum_categories', 'discussion_categories'],
  ['ai_messages', 'chat_messages', 'messages'],
  ['contact_messages', 'support_tickets', 'help_requests'],
  ['documents', 'uploads', 'attachments'],
  ['notifications', 'messages', 'emails'],
  ['settings', 'configurations'],
  ['audit_logs', 'activity_logs', 'error_logs'],
  ['partners', 'organizations'],
  ['payments', 'transactions', 'invoices']
];

let duplicatesFound = 0;

for (const group of potentialDuplicates) {
  const existing = group.filter(t => existingTables.includes(t));
  if (existing.length > 1) {
    duplicatesFound++;
    console.log(`⚠️  POTENTIAL DUPLICATES: ${existing.join(', ')}`);
    
    // Check row counts
    for (const table of existing) {
      const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
      console.log(`   - ${table}: ${count || 0} rows`);
    }
    console.log();
  }
}

if (duplicatesFound === 0) {
  console.log('✅ No duplicate tables found\n');
}

// Check migrations for proper order
console.log('=' .repeat(80));
console.log('\n📊 CHECKING MIGRATION ORDER...\n');

const migrationsDir = 'supabase/migrations';
const migrations = fs.readdirSync(migrationsDir)
  .filter(f => f.endsWith('.sql'))
  .sort();

console.log(`Total migrations: ${migrations.length}\n`);

// Check for out-of-order migrations
const timestampedMigrations = migrations.filter(m => /^\d{8}/.test(m));
const nonTimestamped = migrations.filter(m => !/^\d{8}/.test(m));

if (nonTimestamped.length > 0) {
  console.log(`⚠️  ${nonTimestamped.length} migrations without timestamps:\n`);
  nonTimestamped.slice(0, 10).forEach(m => console.log(`   - ${m}`));
  if (nonTimestamped.length > 10) {
    console.log(`   ... and ${nonTimestamped.length - 10} more`);
  }
  console.log();
}

// Check for duplicate table creations in migrations
console.log('=' .repeat(80));
console.log('\n📊 CHECKING FOR DUPLICATE TABLE CREATIONS...\n');

const tableCreations = {};

for (const migration of migrations) {
  const content = fs.readFileSync(`${migrationsDir}/${migration}`, 'utf8');
  const creates = content.match(/CREATE TABLE (?:IF NOT EXISTS )?["']?(\w+)["']?/gi);
  
  if (creates) {
    creates.forEach(create => {
      const tableName = create.replace(/CREATE TABLE (?:IF NOT EXISTS )?["']?/i, '').replace(/["']?.*/, '').trim();
      if (!tableCreations[tableName]) {
        tableCreations[tableName] = [];
      }
      tableCreations[tableName].push(migration);
    });
  }
}

const duplicateCreations = Object.entries(tableCreations).filter(([_, files]) => files.length > 1);

if (duplicateCreations.length > 0) {
  console.log(`⚠️  ${duplicateCreations.length} tables created in multiple migrations:\n`);
  duplicateCreations.slice(0, 10).forEach(([table, files]) => {
    console.log(`   ${table}:`);
    files.forEach(f => console.log(`      - ${f}`));
  });
  if (duplicateCreations.length > 10) {
    console.log(`   ... and ${duplicateCreations.length - 10} more`);
  }
} else {
  console.log('✅ No duplicate table creations found');
}

// Check table relationships
console.log('\n' + '=' .repeat(80));
console.log('\n📊 CHECKING TABLE RELATIONSHIPS...\n');

const relationships = [
  { parent: 'profiles', child: 'applications', fk: 'user_id' },
  { parent: 'profiles', child: 'enrollments', fk: 'user_id' },
  { parent: 'programs', child: 'enrollments', fk: 'program_id' },
  { parent: 'programs', child: 'courses', fk: 'program_id' },
  { parent: 'courses', child: 'lessons', fk: 'course_id' },
  { parent: 'enrollments', child: 'lesson_progress', fk: 'enrollment_id' },
  { parent: 'enrollments', child: 'certificates', fk: 'enrollment_id' },
  { parent: 'forum_categories', child: 'forum_threads', fk: 'category_id' },
  { parent: 'forum_threads', child: 'forum_posts', fk: 'thread_id' }
];

let brokenRelationships = 0;

for (const rel of relationships) {
  try {
    // Check if parent table exists
    const { error: parentError } = await supabase.from(rel.parent).select('id', { head: true });
    
    // Check if child table exists
    const { error: childError } = await supabase.from(rel.child).select(rel.fk, { head: true });
    
    if (parentError || childError) {
      console.log(`❌ ${rel.parent} → ${rel.child}: Missing table`);
      brokenRelationships++;
    } else {
      // Check for orphaned records
      const { data: childRecords } = await supabase
        .from(rel.child)
        .select(rel.fk)
        .limit(100);
      
      if (childRecords && childRecords.length > 0) {
        const fkValues = [...new Set(childRecords.map(r => r[rel.fk]).filter(Boolean))];
        
        if (fkValues.length > 0) {
          const { data: parentRecords } = await supabase
            .from(rel.parent)
            .select('id')
            .in('id', fkValues);
          
          const orphaned = fkValues.length - (parentRecords?.length || 0);
          
          if (orphaned > 0) {
            console.log(`⚠️  ${rel.parent} → ${rel.child}: ${orphaned} orphaned records`);
            brokenRelationships++;
          } else {
            console.log(`✅ ${rel.parent} → ${rel.child}: Valid`);
          }
        } else {
          console.log(`✅ ${rel.parent} → ${rel.child}: Valid (no FKs yet)`);
        }
      } else {
        console.log(`✅ ${rel.parent} → ${rel.child}: Valid (empty)`);
      }
    }
  } catch (err) {
    console.log(`❌ ${rel.parent} → ${rel.child}: Error checking`);
    brokenRelationships++;
  }
}

// Summary
console.log('\n' + '=' .repeat(80));
console.log('\n📋 SUMMARY\n');

console.log(`Total tables: ${existingTables.length}`);
console.log(`Potential duplicates: ${duplicatesFound}`);
console.log(`Duplicate table creations: ${duplicateCreations.length}`);
console.log(`Broken relationships: ${brokenRelationships}`);
console.log(`Migrations without timestamps: ${nonTimestamped.length}`);

console.log('\n' + '=' .repeat(80));

if (duplicatesFound === 0 && duplicateCreations.length === 0 && brokenRelationships === 0) {
  console.log('\n✅ DATABASE IS WELL ORGANIZED!\n');
} else {
  console.log('\n⚠️  ISSUES FOUND - Review above for details\n');
}

console.log('=' .repeat(80));

