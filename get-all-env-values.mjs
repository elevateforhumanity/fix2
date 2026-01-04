import { readFileSync } from 'fs';

console.log('🔍 Extracting all environment variables...\n');

// Read from .env.production (pulled from Vercel)
const envProd = readFileSync('.env.production', 'utf8');

// Parse and display
const lines = envProd.split('\n');
const vars = {};

for (const line of lines) {
  if (line.startsWith('#') || !line.includes('=')) continue;
  const [key, ...valueParts] = line.split('=');
  const value = valueParts.join('=').replace(/^"|"$/g, '').trim();
  if (key && value) {
    vars[key] = value;
  }
}

console.log('📋 FOUND VARIABLES:\n');
Object.keys(vars).sort().forEach(key => {
  const value = vars[key];
  const masked = value.length > 20 ? value.substring(0, 20) + '...' : value;
  console.log(`${key}=${masked}`);
});

console.log(`\n✅ Total: ${Object.keys(vars).length} variables\n`);
