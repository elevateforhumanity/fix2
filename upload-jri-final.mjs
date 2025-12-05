#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const supabaseUrl = 'https://cuxzzpsyufcewtmicszk.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE';

const supabase = createClient(supabaseUrl, serviceRoleKey);

const jriDir = './lms-content/jri';
const bucketName = 'scorm-packages';

async function uploadJRIScorms() {
  console.log('🚀 Uploading JRI SCORM packages to Supabase Storage...\n');

  // Get all .zip files from JRI directory (exclude the combined zip)
  const files = readdirSync(jriDir)
    .filter(f => f.endsWith('.zip') && !f.includes('jri-scorm-content'))
    .sort();

  console.log(`📦 Found ${files.length} SCORM packages:\n`);
  files.forEach(f => console.log(`   - ${f}`));
  console.log('');

  // Check if bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(b => b.name === bucketName);

  if (!bucketExists) {
    console.log(`📁 Creating bucket: ${bucketName}...`);
    const { data, error } = await supabase.storage.createBucket(bucketName, {
      public: true,
      fileSizeLimit: 52428800, // 50MB
      allowedMimeTypes: ['application/zip', 'application/x-zip-compressed']
    });
    if (error) {
      console.error('❌ Error creating bucket:', error.message);
      return;
    }
    console.log('✅ Bucket created!\n');
  } else {
    console.log(`✅ Bucket "${bucketName}" already exists\n`);
  }

  // Upload each file
  let successCount = 0;
  let errorCount = 0;
  const uploadedUrls = [];

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
        const { data: urlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(storagePath);
        
        console.log(`   ✅ Uploaded!`);
        console.log(`   🔗 ${urlData.publicUrl}\n`);
        successCount++;
        uploadedUrls.push({ file, url: urlData.publicUrl });
      }
    } catch (err) {
      console.error(`   ❌ Error: ${err.message}`);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`\n📊 Upload Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📦 Total: ${files.length}`);

  if (successCount === files.length) {
    console.log('\n🎉 All JRI SCORM packages uploaded successfully!');
    console.log('\n📋 Uploaded URLs:');
    uploadedUrls.forEach(({ file, url }) => {
      console.log(`   ${file}`);
      console.log(`   → ${url}\n`);
    });
    console.log('\n✅ Next: Run SQL to update database with URLs');
    console.log('   Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new');
    console.log('   Run: UPDATE_JRI_URLS.sql\n');
  } else {
    console.log('\n⚠️  Some files failed to upload. Check errors above.');
  }
}

uploadJRIScorms().catch(console.error);
