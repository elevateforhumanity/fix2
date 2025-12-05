#!/usr/bin/env node

/**
 * Test script to demonstrate Next.js App Router route priority
 * 
 * This script tests the routing behavior when both static and dynamic routes exist:
 * - /app/programs/[slug]/page.tsx (dynamic route)
 * - /app/programs/hvac-technician/page.tsx (static route)
 */

import { readdir, access } from 'fs/promises';
import { join } from 'path';

const programsDir = './app/programs';

async function checkRouteExists(routePath) {
  try {
    await access(join(programsDir, routePath, 'page.tsx'));
    return true;
  } catch {
    try {
      await access(join(programsDir, routePath, 'page.ts'));
      return true;
    } catch {
      try {
        await access(join(programsDir, routePath, 'page.jsx'));
        return true;
      } catch {
        try {
          await access(join(programsDir, routePath, 'page.js'));
          return true;
        } catch {
          return false;
        }
      }
    }
  }
}

async function analyzeRoutes() {
  console.log('🔍 Analyzing Next.js App Router Route Priority\n');
  console.log('=' .repeat(70));
  
  // Check for dynamic route
  const hasDynamicRoute = await checkRouteExists('[slug]');
  console.log(`\n📁 Dynamic Route: /app/programs/[slug]/page.tsx`);
  console.log(`   Status: ${hasDynamicRoute ? '✅ EXISTS' : '❌ NOT FOUND'}`);
  
  // Check for static routes
  const entries = await readdir(programsDir, { withFileTypes: true });
  const staticRoutes = [];
  
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('[') && entry.name !== 'admin') {
      const hasPage = await checkRouteExists(entry.name);
      if (hasPage) {
        staticRoutes.push(entry.name);
      }
    }
  }
  
  console.log(`\n📁 Static Routes Found: ${staticRoutes.length}`);
  staticRoutes.forEach(route => {
    console.log(`   - /app/programs/${route}/page.tsx`);
  });
  
  console.log('\n' + '=' .repeat(70));
  console.log('\n📚 Next.js App Router Route Priority Rules:\n');
  console.log('1. ✅ STATIC ROUTES have HIGHER priority than dynamic routes');
  console.log('2. ✅ /programs/hvac-technician will match the STATIC route first');
  console.log('3. ✅ /programs/[slug] will only match if NO static route exists');
  console.log('4. ⚠️  This is BY DESIGN in Next.js App Router\n');
  
  console.log('=' .repeat(70));
  console.log('\n🎯 Current Routing Behavior:\n');
  
  const testCases = [
    { path: '/programs/hvac-technician', matches: 'STATIC route (/programs/hvac-technician/page.tsx)' },
    { path: '/programs/barber', matches: 'STATIC route (/programs/barber/page.tsx)' },
    { path: '/programs/cna', matches: 'STATIC route (/programs/cna/page.tsx)' },
    { path: '/programs/some-other-program', matches: 'DYNAMIC route (/programs/[slug]/page.tsx)' },
  ];
  
  for (const testCase of testCases) {
    const routeName = testCase.path.split('/').pop();
    const hasStatic = staticRoutes.includes(routeName);
    const actualMatch = hasStatic ? `STATIC route (/programs/${routeName}/page.tsx)` : 'DYNAMIC route (/programs/[slug]/page.tsx)';
    const isCorrect = actualMatch === testCase.matches;
    
    console.log(`${isCorrect ? '✅' : '❌'} ${testCase.path}`);
    console.log(`   Expected: ${testCase.matches}`);
    console.log(`   Actual:   ${actualMatch}\n`);
  }
  
  console.log('=' .repeat(70));
  console.log('\n💡 SOLUTION:\n');
  console.log('To fix this issue, you have two options:\n');
  console.log('Option 1: DELETE the static route folders');
  console.log('   - Remove /app/programs/hvac-technician/');
  console.log('   - Remove /app/programs/barber/');
  console.log('   - Remove /app/programs/cna/');
  console.log('   - Remove all other static program folders');
  console.log('   - Keep ONLY /app/programs/[slug]/page.tsx\n');
  
  console.log('Option 2: REDIRECT from static routes to dynamic route');
  console.log('   - Keep static folders but add redirects');
  console.log('   - Example: In /app/programs/hvac-technician/page.tsx:');
  console.log('     import { redirect } from "next/navigation";');
  console.log('     export default function Page() {');
  console.log('       redirect("/programs/hvac-technician");');
  console.log('     }');
  console.log('   - This ensures the dynamic route handles the request\n');
  
  console.log('Option 3: Use middleware to rewrite');
  console.log('   - Create middleware.ts to rewrite static paths to dynamic');
  console.log('   - This is more complex but gives you fine-grained control\n');
  
  console.log('=' .repeat(70));
  console.log('\n📖 Reference:\n');
  console.log('Next.js Documentation:');
  console.log('https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes\n');
  console.log('Route Priority Order:');
  console.log('1. Predefined routes (static)');
  console.log('2. Dynamic routes');
  console.log('3. Catch-all routes\n');
  console.log('=' .repeat(70));
}

analyzeRoutes().catch(console.error);
