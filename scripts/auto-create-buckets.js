#!/usr/bin/env node

/**
 * Autonomous Bucket Creation Script
 * Creates Supabase storage buckets automatically
 */

// Load from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing required environment variables:');
  console.error('   VITE_SUPABASE_URL or SUPABASE_URL');
  console.error('   SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const buckets = [
  {
    id: 'course-materials',
    name: 'course-materials',
    public: true,
    file_size_limit: 52428800, // 50 MB
    allowed_mime_types: null,
  },
  {
    id: 'certificates',
    name: 'certificates',
    public: true,
    file_size_limit: 10485760, // 10 MB
    allowed_mime_types: ['application/pdf', 'image/png', 'image/jpeg'],
  },
  {
    id: 'profile-avatars',
    name: 'profile-avatars',
    public: true,
    file_size_limit: 5242880, // 5 MB
    allowed_mime_types: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
  },
  {
    id: 'program-covers',
    name: 'program-covers',
    public: true,
    file_size_limit: 10485760, // 10 MB
    allowed_mime_types: ['image/png', 'image/jpeg', 'image/webp'],
  },
];

async function createBucket(bucket) {
  try {
    const response = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        apikey: SUPABASE_SERVICE_KEY,
      },
      body: JSON.stringify(bucket),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`✅ Created bucket: ${bucket.name}`);
      return true;
    } else if (response.status === 409) {
      console.log(`⚠️  Bucket already exists: ${bucket.name}`);
      return true;
    } else {
      console.log(`❌ Failed to create bucket ${bucket.name}:`, data);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error creating bucket ${bucket.name}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🪣 Creating Supabase Storage Buckets...\n');

  let successCount = 0;

  for (const bucket of buckets) {
    const success = await createBucket(bucket);
    if (success) successCount++;
    await new Promise((resolve) => setTimeout(resolve, 500)); // Rate limiting
  }

  console.log(
    `\n✅ Bucket creation complete: ${successCount}/${buckets.length} successful`
  );

  if (successCount === buckets.length) {
    console.log('🎉 All buckets ready!');
    process.exit(0);
  } else {
    console.log('⚠️  Some buckets may need manual creation');
    process.exit(0); // Don't fail - buckets might already exist
  }
}

main();
