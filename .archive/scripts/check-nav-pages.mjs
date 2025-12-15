import { readFileSync } from 'fs';
import { execSync } from 'child_process';

// Read navigation config
const navContent = readFileSync('config/navigation.ts', 'utf8');

// Extract all hrefs from navigation
const hrefMatches = navContent.match(/href: '([^']+)'/g) || [];
const navLinks = hrefMatches.map(m => m.match(/href: '([^']+)'/)[1]);

console.log('\n📊 NAVIGATION AUDIT\n');
console.log(`Total links in navigation: ${navLinks.length}\n`);

let existing = 0;
let missing = 0;
const missingPages = [];

navLinks.forEach(link => {
  // Convert link to file path
  const pagePath = `app${link}/page.tsx`;
  
  try {
    execSync(`test -f ${pagePath}`, { stdio: 'ignore' });
    existing++;
    console.log(`✅ ${link}`);
  } catch {
    missing++;
    missingPages.push(link);
    console.log(`❌ ${link} - MISSING`);
  }
});

console.log(`\n📈 SUMMARY:`);
console.log(`✅ Existing pages: ${existing}`);
console.log(`❌ Missing pages: ${missing}`);
console.log(`📊 Completion: ${Math.round((existing / navLinks.length) * 100)}%\n`);

if (missingPages.length > 0) {
  console.log('🔴 MISSING PAGES:');
  missingPages.forEach(page => console.log(`   - ${page}`));
}
