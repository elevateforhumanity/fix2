#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '.env.local') });

console.log('🏥 COMPLETE SYSTEM HEALTH CHECK\n');
console.log('═'.repeat(70));

const results = {
  passed: [],
  failed: [],
  warnings: []
};

function pass(test) {
  results.passed.push(test);
  console.log(`✅ ${test}`);
}

function fail(test, reason) {
  results.failed.push({ test, reason });
  console.log(`❌ ${test}`);
  if (reason) console.log(`   → ${reason}`);
}

function warn(test, reason) {
  results.warnings.push({ test, reason });
  console.log(`⚠️  ${test}`);
  if (reason) console.log(`   → ${reason}`);
}

// ============================================
// 1. ENVIRONMENT VARIABLES
// ============================================
console.log('\n📋 1. ENVIRONMENT VARIABLES');
console.log('─'.repeat(70));

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_SITE_URL'
];

requiredEnvVars.forEach(varName => {
  if (process.env[varName]) {
    pass(`${varName} is set`);
  } else {
    fail(`${varName} is missing`);
  }
});

// ============================================
// 2. DATABASE CONNECTION
// ============================================
console.log('\n🔌 2. DATABASE CONNECTION');
console.log('─'.repeat(70));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  fail('Cannot test database - missing credentials');
} else {
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Test connection
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    if (error) {
      fail('Database connection failed', error.message);
    } else {
      pass('Database connection successful');
    }
    
    // Test auth
    const { data: authData, error: authError } = await supabase.auth.getSession();
    if (authError && !authError.message.includes('session')) {
      warn('Auth check returned error', authError.message);
    } else {
      pass('Auth system accessible');
    }
  } catch (err) {
    fail('Database connection error', err.message);
  }
}

// ============================================
// 3. CRITICAL TABLES
// ============================================
console.log('\n📊 3. CRITICAL TABLES');
console.log('─'.repeat(70));

const criticalTables = [
  'profiles', 'users', 'programs', 'courses', 'lessons', 'enrollments',
  'program_holders', 'delegates', 'achievements', 'roles', 'permissions'
];

if (supabaseUrl && supabaseKey) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  for (const table of criticalTables) {
    try {
      const { error } = await supabase.from(table).select('*').limit(1);
      if (error) {
        fail(`Table '${table}' not accessible`, error.message);
      } else {
        pass(`Table '${table}' exists and accessible`);
      }
    } catch (err) {
      fail(`Table '${table}' check failed`, err.message);
    }
  }
}

// ============================================
// 4. DASHBOARD FILES
// ============================================
console.log('\n📁 4. DASHBOARD FILES');
console.log('─'.repeat(70));

const dashboardFiles = [
  'app/student/dashboard/page.tsx',
  'app/program-holder/dashboard/page.tsx',
  'app/delegate/dashboard/page.tsx',
  'app/admin/compliance-dashboard/page.tsx',
  'app/admin/operations/page.tsx',
  'app/admin/analytics/page.tsx'
];

dashboardFiles.forEach(file => {
  const fullPath = join(__dirname, file);
  if (existsSync(fullPath)) {
    const size = readFileSync(fullPath, 'utf8').length;
    if (size > 100) {
      pass(`${file} exists (${size} bytes)`);
    } else {
      warn(`${file} exists but is very small (${size} bytes)`, 'May be a stub');
    }
  } else {
    fail(`${file} not found`);
  }
});

// ============================================
// 5. COMPONENT FILES
// ============================================
console.log('\n🧩 5. COMPONENT FILES');
console.log('─'.repeat(70));

const componentFiles = [
  'components/dashboard/DashboardStatsGrid.tsx',
  'components/dashboard/CourseCardGrid.tsx',
  'components/dashboard/program-holder/ProgramHolderStatsGrid.tsx',
  'components/dashboard/delegate/DelegateStatsGrid.tsx',
  'components/dashboard/admin/ComplianceStatsGrid.tsx'
];

componentFiles.forEach(file => {
  const fullPath = join(__dirname, file);
  if (existsSync(fullPath)) {
    pass(`${file} exists`);
  } else {
    warn(`${file} not found`, 'May need to be created');
  }
});

// ============================================
// 6. HELPER FUNCTIONS
// ============================================
console.log('\n🔧 6. HELPER FUNCTIONS');
console.log('─'.repeat(70));

const helperFiles = [
  'lib/supabase.ts',
  'lib/supabase-server.ts',
  'lib/supabaseServer.ts',
  'lib/getSupabaseServerClient.ts',
  'lib/auth.ts'
];

helperFiles.forEach(file => {
  const fullPath = join(__dirname, file);
  if (existsSync(fullPath)) {
    pass(`${file} exists`);
  } else {
    warn(`${file} not found`, 'May use different helper');
  }
});

// ============================================
// 7. PACKAGE DEPENDENCIES
// ============================================
console.log('\n📦 7. PACKAGE DEPENDENCIES');
console.log('─'.repeat(70));

try {
  const packageJson = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const requiredPackages = [
    '@supabase/supabase-js',
    'next',
    'react',
    'typescript'
  ];
  
  requiredPackages.forEach(pkg => {
    if (deps[pkg]) {
      pass(`${pkg} installed (${deps[pkg]})`);
    } else {
      fail(`${pkg} not found in package.json`);
    }
  });
} catch (err) {
  fail('Could not read package.json', err.message);
}

// ============================================
// 8. API ROUTES
// ============================================
console.log('\n🌐 8. API ROUTES');
console.log('─'.repeat(70));

const apiRoutes = [
  'app/api/courses',
  'app/api/enrollments',
  'app/api/assignments',
  'app/api/quizzes',
  'app/api/certificates'
];

apiRoutes.forEach(route => {
  const fullPath = join(__dirname, route);
  if (existsSync(fullPath)) {
    pass(`${route} exists`);
  } else {
    warn(`${route} not found`, 'May not be implemented yet');
  }
});

// ============================================
// 9. DATA SEEDING
// ============================================
console.log('\n🌱 9. DATA SEEDING');
console.log('─'.repeat(70));

if (supabaseUrl && supabaseKey) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Check if we have any data
  const dataChecks = [
    { table: 'programs', name: 'Programs' },
    { table: 'courses', name: 'Courses' },
    { table: 'achievements', name: 'Achievements' },
    { table: 'roles', name: 'Roles' },
    { table: 'permissions', name: 'Permissions' }
  ];
  
  for (const check of dataChecks) {
    try {
      const { data, error } = await supabase
        .from(check.table)
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        warn(`Could not check ${check.name}`, error.message);
      } else if (data === null || data === 0) {
        warn(`${check.name} table is empty`, 'Consider seeding data');
      } else {
        pass(`${check.name} has data`);
      }
    } catch (err) {
      warn(`Error checking ${check.name}`, err.message);
    }
  }
}

// ============================================
// 10. SMOKE TESTS
// ============================================
console.log('\n🔥 10. SMOKE TESTS');
console.log('─'.repeat(70));

// Test if dev server is running
try {
  const response = await fetch('http://localhost:3000', { 
    method: 'HEAD',
    signal: AbortSignal.timeout(2000)
  });
  if (response.ok) {
    pass('Dev server is running on port 3000');
  } else {
    warn('Dev server responded but with error', `Status: ${response.status}`);
  }
} catch (err) {
  warn('Dev server not running on port 3000', 'Run: pnpm dev');
}

// ============================================
// SUMMARY
// ============================================
console.log('\n' + '═'.repeat(70));
console.log('\n📊 HEALTH CHECK SUMMARY\n');
console.log('═'.repeat(70));

console.log(`\n✅ PASSED: ${results.passed.length} checks`);
console.log(`❌ FAILED: ${results.failed.length} checks`);
console.log(`⚠️  WARNINGS: ${results.warnings.length} checks`);

if (results.failed.length > 0) {
  console.log('\n❌ CRITICAL ISSUES:');
  results.failed.forEach(({ test, reason }) => {
    console.log(`   • ${test}`);
    if (reason) console.log(`     → ${reason}`);
  });
}

if (results.warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:');
  results.warnings.forEach(({ test, reason }) => {
    console.log(`   • ${test}`);
    if (reason) console.log(`     → ${reason}`);
  });
}

console.log('\n' + '═'.repeat(70));

const healthScore = Math.round(
  (results.passed.length / (results.passed.length + results.failed.length + results.warnings.length)) * 100
);

console.log(`\n🏥 OVERALL HEALTH SCORE: ${healthScore}%`);

if (healthScore >= 90) {
  console.log('🎉 EXCELLENT - System is production ready!');
} else if (healthScore >= 75) {
  console.log('✅ GOOD - System is functional with minor issues');
} else if (healthScore >= 50) {
  console.log('⚠️  FAIR - System needs attention');
} else {
  console.log('❌ POOR - Critical issues need to be resolved');
}

console.log('\n' + '═'.repeat(70) + '\n');

process.exit(results.failed.length > 0 ? 1 : 0);
