import { execSync } from 'child_process';

const output = execSync('grep -r "dangerouslySetInnerHTML" app components --include="*.tsx"', { encoding: 'utf8' });
const lines = output.trim().split('\n');

let unsafe = 0;
let sanitized = 0;
let jsonSafe = 0;
let comments = 0;

lines.forEach(line => {
  if (line.includes('//') && !line.includes('dangerouslySetInnerHTML={{')) {
    comments++;
  } else if (line.includes('JSON.stringify')) {
    jsonSafe++;
  } else if (line.includes('DOMPurify.sanitize')) {
    sanitized++;
  } else {
    unsafe++;
    console.log('⚠️  UNSAFE:', line);
  }
});

console.log('\n📊 dangerouslySetInnerHTML Analysis:');
console.log('=====================================');
console.log(`✅ Sanitized with DOMPurify: ${sanitized}`);
console.log(`✅ Safe (JSON.stringify for SEO): ${jsonSafe}`);
console.log(`✅ Comments only: ${comments}`);
console.log(`❌ UNSAFE (needs fixing): ${unsafe}`);
console.log('=====================================');
console.log(`\n🎯 Total instances: ${lines.length}`);
console.log(`🎯 Unsafe instances: ${unsafe}`);

if (unsafe === 0) {
  console.log('\n✅ SUCCESS: All dangerouslySetInnerHTML instances are safe!');
  process.exit(0);
} else {
  console.log('\n❌ FAILURE: Found unsafe dangerouslySetInnerHTML instances!');
  process.exit(1);
}
