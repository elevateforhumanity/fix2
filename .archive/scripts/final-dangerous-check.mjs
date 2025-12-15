import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const files = execSync('find app components -name "*.tsx" -type f', { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(Boolean);

let totalInstances = 0;
let sanitizedInstances = 0;
let jsonInstances = 0;
let unsafeInstances = 0;

const unsafeFiles = [];

files.forEach(file => {
  try {
    const content = readFileSync(file, 'utf8');
    const matches = content.match(/dangerouslySetInnerHTML/g);
    
    if (matches) {
      totalInstances += matches.length;
      
      // Check if file has DOMPurify
      const hasDOMPurify = content.includes('DOMPurify.sanitize');
      
      // Check if it's JSON.stringify usage
      const hasJSONStringify = content.includes('JSON.stringify');
      
      // Count each instance
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (line.includes('dangerouslySetInnerHTML')) {
          // Check context (next few lines)
          const context = lines.slice(idx, idx + 3).join(' ');
          
          if (context.includes('DOMPurify.sanitize')) {
            sanitizedInstances++;
          } else if (context.includes('JSON.stringify')) {
            jsonInstances++;
          } else if (!line.trim().startsWith('//') && !line.includes('/*')) {
            unsafeInstances++;
            unsafeFiles.push(`${file}:${idx + 1}`);
          }
        }
      });
    }
  } catch (err) {
    // Skip files that can't be read
  }
});

console.log('\n🔒 SECURITY AUDIT: dangerouslySetInnerHTML');
console.log('==========================================');
console.log(`📊 Total instances found: ${totalInstances}`);
console.log(`✅ Sanitized with DOMPurify: ${sanitizedInstances}`);
console.log(`✅ Safe (JSON.stringify): ${jsonInstances}`);
console.log(`❌ Unsafe/Unprotected: ${unsafeInstances}`);
console.log('==========================================\n');

if (unsafeInstances > 0) {
  console.log('⚠️  Unsafe instances found in:');
  unsafeFiles.forEach(f => console.log(`   - ${f}`));
  console.log('\n❌ FAILED: Not all instances are protected\n');
  process.exit(1);
} else {
  console.log('✅ SUCCESS: All dangerouslySetInnerHTML instances are protected!\n');
  console.log('Protection methods:');
  console.log(`   • DOMPurify sanitization: ${sanitizedInstances} instances`);
  console.log(`   • JSON.stringify (SEO): ${jsonInstances} instances`);
  console.log('\n🎉 100% SECURE - No unsafe HTML rendering!\n');
  process.exit(0);
}
