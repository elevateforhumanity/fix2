// scripts/db-setup.ts
// Auto-run SQL migrations + seed into Supabase using SUPABASE_DB_URL

import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

async function runSqlFile(client: Client, filePath: string) {
  const sql = fs.readFileSync(filePath, 'utf8');
  if (!sql.trim()) return;

  console.log(`📝 Running SQL: ${path.basename(filePath)}`);
  await client.query(sql);
}

async function main() {
  const dbUrl = process.env.SUPABASE_DB_URL;
  if (!dbUrl) {
    console.error('❌ SUPABASE_DB_URL is not set in .env.local');
    process.exit(1);
  }

  const client = new Client({ connectionString: dbUrl });

  try {
    console.log('🔌 Connecting to Supabase Postgres…');
    await client.connect();

    // Optional: simple migrations tracking table (so we don't double-run)
    await client.query(`
      CREATE TABLE IF NOT EXISTS efh_migrations (
        id serial PRIMARY KEY,
        filename text UNIQUE NOT NULL,
        applied_at timestamptz NOT NULL DEFAULT now()
      );
    `);

    const migrationsDir = path.join(process.cwd(), 'supabase/migrations');
    if (!fs.existsSync(migrationsDir)) {
      console.log('⚠️ No migrations directory found at /supabase/migrations, skipping migrations.');
    } else {
      const files = fs
        .readdirSync(migrationsDir)
        .filter((f) => f.endsWith('.sql'))
        .sort(); // run in filename order

      console.log(`📂 Found ${files.length} migration(s).`);

      for (const file of files) {
        const filePath = path.join(migrationsDir, file);

        // Check if already applied
        const { rows } = await client.query(
          'SELECT 1 FROM efh_migrations WHERE filename = $1',
          [file],
        );
        if (rows.length > 0) {
          console.log(`✅ Already applied: ${file}`);
          continue;
        }

        // Run and record
        await client.query('BEGIN');
        try {
          await runSqlFile(client, filePath);
          await client.query(
            'INSERT INTO efh_migrations (filename) VALUES ($1)',
            [file],
          );
          await client.query('COMMIT');
          console.log(`✅ Applied: ${file}`);
        } catch (err) {
          await client.query('ROLLBACK');
          console.error(`❌ Failed on: ${file}`);
          console.error(err);
          process.exit(1);
        }
      }
    }

    // Seed data
    const seedFile = path.join(process.cwd(), 'supabase/seed.sql');

    if (fs.existsSync(seedFile)) {
      console.log('🌱 Running seed file supabase/seed.sql…');
      await runSqlFile(client, seedFile);
      console.log('✅ Seed completed.');
    } else {
      console.log('⚠️ No seed file at /supabase/seed.sql, skipping seeding.');
    }

    console.log('🎉 Database migrations + seed complete.');
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('❌ db-setup failed', err);
  process.exit(1);
});
