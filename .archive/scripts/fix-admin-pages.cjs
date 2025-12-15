#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Mapping of admin page directories to their appropriate database tables and queries
const adminPageMappings = {
  'applicants': {
    table: 'applications',
    description: 'Manage student applications and review submissions',
    queries: `
  const { data: applications, count: totalApplications } = await supabase
    .from('applications')
    .select(\`
      *,
      applicant:profiles(full_name, email, phone)
    \`, { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50);

  const { count: pendingApplications } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  const { count: approvedApplications } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved');

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const { count: recentApplications } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', weekAgo.toISOString());
`,
    dataVar: 'applications',
    countVar: 'totalApplications'
  },
  'programs': {
    table: 'programs',
    description: 'Manage training programs, courses, and curriculum',
    queries: `
  const { data: programs, count: totalPrograms } = await supabase
    .from('programs')
    .select(\`
      *,
      enrollments:enrollments(count)
    \`, { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50);

  const { count: activePrograms } = await supabase
    .from('programs')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  const { count: featuredPrograms } = await supabase
    .from('programs')
    .select('*', { count: 'exact', head: true })
    .eq('featured', true);
`,
    dataVar: 'programs',
    countVar: 'totalPrograms'
  },
  'courses': {
    table: 'courses',
    description: 'Manage courses, modules, and learning content',
    queries: `
  const { data: courses, count: totalCourses } = await supabase
    .from('courses')
    .select(\`
      *,
      program:programs(name, slug),
      modules:modules(count)
    \`, { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50);

  const { count: activeCourses } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);
`,
    dataVar: 'courses',
    countVar: 'totalCourses'
  },
  'enrollments': {
    table: 'enrollments',
    description: 'Manage student enrollments and track progress',
    queries: `
  const { data: enrollments, count: totalEnrollments } = await supabase
    .from('enrollments')
    .select(\`
      *,
      student:profiles!enrollments_user_id_fkey(full_name, email),
      program:programs(name, slug)
    \`, { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50);

  const { count: activeEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const { count: completedEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed');
`,
    dataVar: 'enrollments',
    countVar: 'totalEnrollments'
  },
  'certificates': {
    table: 'certificates',
    description: 'Manage certificates, credentials, and certifications',
    queries: `
  const { data: certificates, count: totalCertificates } = await supabase
    .from('certificates')
    .select(\`
      *,
      student:profiles(full_name, email),
      program:programs(name)
    \`, { count: 'exact' })
    .order('issued_at', { ascending: false })
    .limit(50);

  const { count: issuedCertificates } = await supabase
    .from('certificates')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'issued');
`,
    dataVar: 'certificates',
    countVar: 'totalCertificates'
  },
  'employers': {
    table: 'profiles',
    description: 'Manage employer partnerships and job placements',
    queries: `
  const { data: employers, count: totalEmployers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .eq('role', 'employer')
    .order('created_at', { ascending: false })
    .limit(50);

  const { count: activeEmployers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'employer')
    .eq('is_active', true);
`,
    dataVar: 'employers',
    countVar: 'totalEmployers'
  },
  'partners': {
    table: 'training_providers',
    description: 'Manage training provider partnerships',
    queries: `
  const { data: partners, count: totalPartners } = await supabase
    .from('training_providers')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50);

  const { count: activePartners } = await supabase
    .from('training_providers')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);
`,
    dataVar: 'partners',
    countVar: 'totalPartners'
  },
  'users': {
    table: 'profiles',
    description: 'Manage user accounts and permissions',
    queries: `
  const { data: users, count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50);

  const { count: activeUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);
`,
    dataVar: 'users',
    countVar: 'totalUsers'
  },
  'reports': {
    table: 'reports',
    description: 'Generate and view system reports',
    queries: `
  const { data: reports, count: totalReports } = await supabase
    .from('reports')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50);
`,
    dataVar: 'reports',
    countVar: 'totalReports'
  },
  'analytics': {
    table: 'analytics_events',
    description: 'View analytics and usage statistics',
    queries: `
  const { data: events, count: totalEvents } = await supabase
    .from('analytics_events')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(100);

  const { count: todayEvents } = await supabase
    .from('analytics_events')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', new Date().toISOString().split('T')[0]);
`,
    dataVar: 'events',
    countVar: 'totalEvents'
  }
};

// Default mapping for pages not in the specific list
const defaultMapping = {
  table: 'items',
  description: 'Manage system data and configurations',
  queries: `
  const { data: items, count: totalItems } = await supabase
    .from('items')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50);

  const { count: activeItems } = await supabase
    .from('items')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');
`,
  dataVar: 'items',
  countVar: 'totalItems'
};

function fixAdminPage(filePath, pageName) {
  console.log(`Processing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if already fixed (has proper queries)
  if (!content.includes("from('items')") && !content.includes('const supabase = await createClient();\n  const { data: { user } } = await supabase.auth.getUser();\n  \n  if (!user) redirect')) {
    console.log(`  ✓ Already fixed, skipping`);
    return false;
  }
  
  // Get mapping for this page
  const mapping = adminPageMappings[pageName] || defaultMapping;
  
  // Fix duplicate supabase initialization
  const duplicatePattern = /const supabase = await createClient\(\);\s+const { data: { user } } = await supabase\.auth\.getUser\(\);\s+if \(!user\) redirect\('\/login'\);\s+const { data: profile } = await supabase[\s\S]*?\.single\(\);\s+const { data: items } = await supabase[\s\S]*?const supabase = await createClient\(\);/;
  
  if (duplicatePattern.test(content)) {
    // Remove the duplicate initialization and replace with proper queries
    content = content.replace(
      duplicatePattern,
      `const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }
  ${mapping.queries}`
    );
  }
  
  // Replace items references with proper data variable
  content = content.replace(/\{items\s*&&\s*items\.length/g, `{${mapping.dataVar} && ${mapping.dataVar}.length`);
  content = content.replace(/\{items\.map\(/g, `{${mapping.dataVar}.map(`);
  content = content.replace(/\{count\s*\|\|\s*0\}/g, `{${mapping.countVar} || 0}`);
  
  // Update description
  content = content.replace(
    /description: 'Explore \w+ and discover opportunities for career growth and development\.'/,
    `description: '${mapping.description}'`
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✓ Fixed`);
  return true;
}

// Main execution
const adminDir = path.join(__dirname, 'app', 'admin');
const dirs = fs.readdirSync(adminDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let fixedCount = 0;
let skippedCount = 0;

console.log(`Found ${dirs.length} admin directories\n`);

for (const dir of dirs) {
  const pagePath = path.join(adminDir, dir, 'page.tsx');
  
  if (fs.existsSync(pagePath)) {
    const wasFixed = fixAdminPage(pagePath, dir);
    if (wasFixed) {
      fixedCount++;
    } else {
      skippedCount++;
    }
  }
}

console.log(`\n✅ Complete!`);
console.log(`   Fixed: ${fixedCount} pages`);
console.log(`   Skipped: ${skippedCount} pages (already fixed)`);
console.log(`   Total: ${fixedCount + skippedCount} pages processed`);
