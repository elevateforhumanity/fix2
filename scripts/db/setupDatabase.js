// scripts/db/setupDatabase.js
// Convenience script: run migrations, then seeds

const { runMigrations } = require('./runMigrations');
const { runSeeds } = require('./runSeeds');

async function setupDatabase() {
  console.log('🏗  Starting database setup (migrations + seeds)...');
  await runMigrations();
  await runSeeds();
  console.log('✅ Database setup complete.');
}

if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase };
