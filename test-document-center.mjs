#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function testDocumentCenter() {
  console.log('🔍 Testing Document Center Connection...\n');

  // Test 1: Check if documents table exists
  console.log('1️⃣ Checking documents table...');
  const { data: docs, error: docsError } = await supabase
    .from('documents')
    .select('id, document_type, status')
    .limit(5);

  if (docsError) {
    console.log('❌ documents table:', docsError.message);
  } else {
    console.log(`✅ documents table: EXISTS (${docs?.length || 0} records)`);
    if (docs && docs.length > 0) {
      docs.forEach(d => console.log(`   - ${d.document_type} (${d.status})`));
    }
  }

  // Test 2: Check document_requirements table
  console.log('\n2️⃣ Checking document_requirements table...');
  const { data: reqs, error: reqsError } = await supabase
    .from('document_requirements')
    .select('role, document_type, is_required')
    .limit(5);

  if (reqsError) {
    console.log('❌ document_requirements table:', reqsError.message);
  } else {
    console.log(`✅ document_requirements table: EXISTS (${reqs?.length || 0} records)`);
    if (reqs && reqs.length > 0) {
      reqs.forEach(r => console.log(`   - ${r.role}: ${r.document_type} (${r.is_required ? 'required' : 'optional'})`));
    }
  }

  // Test 3: Check document_signatures table
  console.log('\n3️⃣ Checking document_signatures table...');
  const { data: sigs, error: sigsError } = await supabase
    .from('document_signatures')
    .select('id, document_type, signed_at')
    .limit(5);

  if (sigsError) {
    console.log('❌ document_signatures table:', sigsError.message);
  } else {
    console.log(`✅ document_signatures table: EXISTS (${sigs?.length || 0} records)`);
  }

  // Test 4: Check program_holder_documents table
  console.log('\n4️⃣ Checking program_holder_documents table...');
  const { data: phDocs, error: phDocsError } = await supabase
    .from('program_holder_documents')
    .select('id, document_type, status')
    .limit(5);

  if (phDocsError) {
    console.log('❌ program_holder_documents table:', phDocsError.message);
  } else {
    console.log(`✅ program_holder_documents table: EXISTS (${phDocs?.length || 0} records)`);
  }

  // Test 5: Check tax_documents table
  console.log('\n5️⃣ Checking tax_documents table...');
  const { data: taxDocs, error: taxDocsError } = await supabase
    .from('tax_documents')
    .select('id, document_type, status')
    .limit(5);

  if (taxDocsError) {
    console.log('❌ tax_documents table:', taxDocsError.message);
  } else {
    console.log(`✅ tax_documents table: EXISTS (${taxDocs?.length || 0} records)`);
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 DOCUMENT CENTER STATUS SUMMARY\n');
  
  const tables = [
    { name: 'documents', error: docsError },
    { name: 'document_requirements', error: reqsError },
    { name: 'document_signatures', error: sigsError },
    { name: 'program_holder_documents', error: phDocsError },
    { name: 'tax_documents', error: taxDocsError }
  ];

  const working = tables.filter(t => !t.error).length;
  const broken = tables.filter(t => t.error).length;

  console.log(`✅ Working tables: ${working}/5`);
  console.log(`❌ Broken tables: ${broken}/5`);

  if (broken === 0) {
    console.log('\n🎉 Document Center is FULLY CONNECTED!\n');
  } else {
    console.log('\n⚠️  Document Center has MISSING TABLES:\n');
    tables.filter(t => t.error).forEach(t => {
      console.log(`   ❌ ${t.name}`);
    });
    console.log('');
  }
}

testDocumentCenter();
