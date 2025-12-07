// scripts/db/runSeeds.js
// Run ALL SQL files in supabase/seeds in alphabetical order

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function runSeeds() {
  const connectionString = process.env.SUPABASE_DB_URL;

  if (!connectionString) {
    console.error('❌ SUPABASE_DB_URL is not set in .env.local');
    process.exit(1);
  }

  const client = new Client({ connectionString });

  try {
    console.log('🚀 Connecting to Supabase database...');
    await client.connect();

    const seedsDir = path.join(process.cwd(), 'supabase', 'seeds');

    if (!fs.existsSync(seedsDir)) {
      console.error(`❌ Seeds folder not found: ${seedsDir}`);
      process.exit(1);
    }

    const files = fs
      .readdirSync(seedsDir)
      .filter((f) => f.endsWith('.sql'))
      .sort();

    if (files.length === 0) {
      console.log('ℹ️ No seed files found.');
      return;
    }

    console.log(`📂 Found ${files.length} seed files:`);
    files.forEach((f) => console.log(`  • ${f}`));

    for (const file of files) {
      const filePath = path.join(seedsDir, file);
      console.log(`🌱 Running seed: ${file}`);

      const sql = fs.readFileSync(filePath, 'utf8');

      try {
        await client.query('BEGIN');
        await client.query(sql);
        await client.query('COMMIT');
        console.log(`✅ Seed applied: ${file}`);
      } catch (err) {
        await client.query('ROLLBACK');
        console.error(`❌ Seed failed: ${file}`);
        console.error(err.message);
        process.exit(1);
      }
    }

    console.log('🎉 All seeds processed.');
  } catch (err) {
    console.error('❌ Seed runner error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

if (require.main === module) {
  runSeeds();
}

module.exports = { runSeeds };
