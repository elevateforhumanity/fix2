#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const supabaseUrl = 'https://cuxzzpsyufcewtmicszk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA';

const supabase = createClient(supabaseUrl, supabaseKey);

const jriDir = './lms-content/jri';
const bucketName = 'scorm-packages';

async function uploadJRIScorms() {
  console.log('🚀 Uploading JRI SCORM packages to Supabase Storage...\n');

  // Get all .zip files from JRI directory
  const files = readdirSync(jriDir).filter(f => f.endsWith('.zip') && !f.includes('jri-scorm-content'));

  console.log(`📦 Found ${files.length} SCORM packages:\n`);
  files.forEach(f => console.log(`   - ${f}`));
  console.log('');

  // Check if bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(b => b.name === bucketName);

  if (!bucketExists) {
    console.log(`📁 Creating bucket: ${bucketName}...`);
    const { error } = await supabase.storage.createBucket(bucketName, {
      public: true,
      fileSizeLimit: 52428800 // 50MB
    });
    if (error) {
      console.error('❌ Error creating bucket:', error.message);
      return;
    }
    console.log('✅ Bucket created!\n');
  } else {
    console.log(`✅ Bucket ${bucketName} already exists\n`);
  }

  // Upload each file
  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const filePath = join(jriDir, file);
    const storagePath = `jri/${file}`;

    try {
      console.log(`⬆️  Uploading: ${file}...`);
      
      const fileBuffer = readFileSync(filePath);
      
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(storagePath, fileBuffer, {
          contentType: 'application/zip',
          upsert: true
        });

      if (error) {
        console.error(`   ❌ Error: ${error.message}`);
        errorCount++;
      } else {
        const publicUrl = supabase.storage.from(bucketName).getPublicUrl(storagePath).data.publicUrl;
        console.log(`   ✅ Uploaded!`);
        console.log(`   🔗 ${publicUrl}\n`);
        successCount++;
      }
    } catch (err) {
      console.error(`   ❌ Error: ${err.message}`);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Upload Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📦 Total: ${files.length}`);

  if (successCount === files.length) {
    console.log('\n🎉 All JRI SCORM packages uploaded successfully!');
    console.log('\n📋 Next step: Run SQL to update database with URLs');
    console.log('   File: /workspaces/fix2/UPDATE_JRI_URLS.sql\n');
  }
}

uploadJRIScorms().catch(console.error);
