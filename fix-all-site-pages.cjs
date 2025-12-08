#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Page-specific database mappings
const pageMappings = {
  // Programs
  '/programs/': {
    table: 'programs',
    queries: `
  const { data: program } = await supabase
    .from('programs')
    .select(\`
      *,
      courses:courses(id, title, slug),
      enrollments:enrollments(count)
    \`)
    .eq('slug', params.slug)
    .single();

  if (!program) {
    notFound();
  }

  const { count: totalEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('program_id', program.id);
`,
    dataVar: 'program'
  },
  
  // Student pages
  '/student/': {
    table: 'profiles',
    queries: `
  const { data: student } = await supabase
    .from('profiles')
    .select(\`
      *,
      enrollments:enrollments(
        *,
        program:programs(name, slug)
      )
    \`)
    .eq('id', user.id)
    .single();

  const { data: courses } = await supabase
    .from('enrollments')
    .select(\`
      *,
      program:programs(*),
      progress:progress_tracking(*)
    \`)
    .eq('user_id', user.id)
    .eq('status', 'active');
`,
    dataVar: 'student'
  },
  
  // Employer pages
  '/employer/': {
    table: 'profiles',
    queries: `
  const { data: employer } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .eq('role', 'employer')
    .single();

  const { data: jobPostings } = await supabase
    .from('job_postings')
    .select('*')
    .eq('employer_id', user.id)
    .order('created_at', { ascending: false });
`,
    dataVar: 'employer'
  },
  
  // Portal pages
  '/portal/': {
    table: 'profiles',
    queries: `
  const { data: profile } = await supabase
    .from('profiles')
    .select(\`
      *,
      enrollments:enrollments(
        *,
        program:programs(*)
      )
    \`)
    .eq('id', user.id)
    .single();
`,
    dataVar: 'profile'
  },
  
  // LMS pages
  '/lms/': {
    table: 'courses',
    queries: `
  const { data: courses } = await supabase
    .from('enrollments')
    .select(\`
      *,
      course:courses(
        *,
        modules:modules(
          *,
          lessons:lessons(*)
        )
      )
    \`)
    .eq('user_id', user.id)
    .eq('status', 'active');
`,
    dataVar: 'courses'
  }
};

function getMapping(relativePath) {
  for (const [pattern, mapping] of Object.entries(pageMappings)) {
    if (relativePath.includes(pattern)) {
      return mapping;
    }
  }
  
  // Default mapping
  return {
    table: 'profiles',
    queries: `
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single();
`,
    dataVar: 'profile'
  };
}

function fixDuplicateSupabase(content) {
  // Pattern 1: Duplicate initialization with items query
  const pattern1 = /const supabase = await createClient\(\);\s+const { data: { user } } = await supabase\.auth\.getUser\(\);\s+if \(!user\) redirect\('\/login'\);\s+const { data: profile } = await supabase[\s\S]*?\.single\(\);\s+const { data: items } = await supabase[\s\S]*?const supabase = await createClient\(\);/;
  
  if (pattern1.test(content)) {
    content = content.replace(pattern1, 'const supabase = await createClient();');
  }
  
  // Pattern 2: Simple duplicate
  const pattern2 = /(const supabase = await createClient\(\);)\s+[\s\S]{1,500}?\1/;
  if (pattern2.test(content)) {
    content = content.replace(pattern2, (match) => {
      const parts = match.split('const supabase = await createClient();');
      return 'const supabase = await createClient();' + parts[1];
    });
  }
  
  return content;
}

function fixPlaceholderItems(content, mapping) {
  // Replace from('items') with proper table
  content = content.replace(/\.from\('items'\)/g, `.from('${mapping.table}')`);
  
  // Replace items variable references
  content = content.replace(/\{items\s*&&\s*items\.length/g, `{${mapping.dataVar} && ${mapping.dataVar}.length`);
  content = content.replace(/\{items\.map\(/g, `{${mapping.dataVar}.map(`);
  content = content.replace(/items\?\.filter/g, `${mapping.dataVar}?.filter`);
  content = content.replace(/items\?\.length/g, `${mapping.dataVar}?.length`);
  
  return content;
}

function addProperAuth(content) {
  // Check if auth is missing
  if (!content.includes('auth.getUser') && content.includes('async function')) {
    // Add auth after function declaration
    content = content.replace(
      /(export default async function \w+\([^)]*\) {)/,
      `$1
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }
`
    );
    
    // Add imports if missing
    if (!content.includes("from '@/lib/supabase/server'")) {
      content = content.replace(
        /(import.*from 'next';)/,
        `$1\nimport { createClient } from '@/lib/supabase/server';\nimport { redirect } from 'next/navigation';`
      );
    }
  }
  
  return content;
}

function fixPage(filePath, relativePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Skip if it's a client component with no database issues
  if (content.includes("'use client'") && !content.includes("from('items')")) {
    return false;
  }
  
  const mapping = getMapping(relativePath);
  
  // Fix duplicate supabase initialization
  content = fixDuplicateSupabase(content);
  
  // Fix placeholder items
  if (content.includes("from('items')")) {
    content = fixPlaceholderItems(content, mapping);
  }
  
  // Add proper auth if missing (for server components)
  if (!content.includes("'use client'")) {
    content = addProperAuth(content);
  }
  
  // Only write if content changed
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

// Main execution
const analysis = JSON.parse(fs.readFileSync(path.join(__dirname, 'SITE_ANALYSIS.json'), 'utf8'));

console.log('🔧 Fixing site pages...\n');

let fixedCount = 0;
let skippedCount = 0;
let errorCount = 0;

// Fix high priority first
console.log('📌 Fixing HIGH PRIORITY pages (programs/student/employer)...\n');

for (const relativePath of analysis.highPriority) {
  const fullPath = path.join(__dirname, 'app', relativePath);
  
  try {
    if (fs.existsSync(fullPath)) {
      const wasFixed = fixPage(fullPath, relativePath);
      if (wasFixed) {
        console.log(`  ✓ Fixed: ${relativePath}`);
        fixedCount++;
      } else {
        skippedCount++;
      }
    }
  } catch (error) {
    console.log(`  ✗ Error: ${relativePath} - ${error.message}`);
    errorCount++;
  }
}

// Fix medium priority
console.log('\n📌 Fixing MEDIUM PRIORITY pages (portal/lms)...\n');

const mediumPriority = [
  ...analysis.categories.portal,
  ...analysis.categories.lms
].filter(p => analysis.issues.placeholderItems.includes(p));

for (const relativePath of mediumPriority) {
  const fullPath = path.join(__dirname, 'app', relativePath);
  
  try {
    if (fs.existsSync(fullPath)) {
      const wasFixed = fixPage(fullPath, relativePath);
      if (wasFixed) {
        console.log(`  ✓ Fixed: ${relativePath}`);
        fixedCount++;
      } else {
        skippedCount++;
      }
    }
  } catch (error) {
    console.log(`  ✗ Error: ${relativePath} - ${error.message}`);
    errorCount++;
  }
}

// Fix remaining pages with placeholder items
console.log('\n📌 Fixing REMAINING pages with placeholder code...\n');

const remaining = analysis.issues.placeholderItems.filter(
  p => !analysis.highPriority.includes(p) && !mediumPriority.includes(p)
);

let remainingFixed = 0;
for (const relativePath of remaining) {
  const fullPath = path.join(__dirname, 'app', relativePath);
  
  try {
    if (fs.existsSync(fullPath)) {
      const wasFixed = fixPage(fullPath, relativePath);
      if (wasFixed) {
        remainingFixed++;
        fixedCount++;
      } else {
        skippedCount++;
      }
    }
  } catch (error) {
    errorCount++;
  }
}

console.log(`  ✓ Fixed ${remainingFixed} remaining pages`);

console.log('\n' + '='.repeat(60));
console.log('\n✅ COMPLETE!\n');
console.log(`  Fixed:   ${fixedCount} pages`);
console.log(`  Skipped: ${skippedCount} pages`);
console.log(`  Errors:  ${errorCount} pages`);
console.log(`  Total:   ${fixedCount + skippedCount + errorCount} pages processed\n`);

// Update analysis
const updatedAnalysis = {
  ...analysis,
  fixResults: {
    fixed: fixedCount,
    skipped: skippedCount,
    errors: errorCount,
    timestamp: new Date().toISOString()
  }
};

fs.writeFileSync(
  path.join(__dirname, 'SITE_ANALYSIS.json'),
  JSON.stringify(updatedAnalysis, null, 2),
  'utf8'
);

console.log('📊 Updated analysis saved to SITE_ANALYSIS.json\n');
