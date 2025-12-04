#!/usr/bin/env node
/**
 * Google Classroom Autopilot - Main Entry Point
 *
 * Commands:
 * - auth --email <email>
 * - auth:redeem --email <email> --code <code>
 * - courses:list --email <email>
 * - autopilot:run --email <email>
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

console.log('🚀 Google Classroom Autopilot');
console.log('================================\n');

const command = process.argv[2];
const args = process.argv.slice(3);

// Parse command line arguments
function parseArgs(args: string[]): Record<string, string> {
  const parsed: Record<string, string> = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    const value = args[i + 1];
    parsed[key] = value;
  }
  return parsed;
}

const parsedArgs = parseArgs(args);

// Command implementations
async function startOAuthFlow(email: string) {
  console.log(`🔐 Starting OAuth flow for ${email}`);
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&` +
    `response_type=code&` +
    `scope=https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.students.readonly&` +
    `access_type=offline&` +
    `state=${email}`;
  
  console.log('\n📋 Authorization URL:');
  console.log(authUrl);
  console.log('\n✅ Visit this URL to authorize access');
}

async function redeemOAuthCode(email: string, code: string) {
  console.log(`🔄 Redeeming OAuth code for ${email}`);
  
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OAuth error: ${error.error_description || error.error}`);
  }

  const tokens = await response.json();
  
  // Store tokens in database
  await supabase.from('google_oauth_tokens').upsert({
    email,
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
  });

  console.log('✅ OAuth tokens saved successfully');
}

async function listCourses(email: string) {
  console.log(`📚 Listing courses for ${email}`);
  
  const { data: tokenData } = await supabase
    .from('google_oauth_tokens')
    .select('*')
    .eq('email', email)
    .single();

  if (!tokenData) {
    throw new Error('No OAuth tokens found. Run: auth --email ' + email);
  }

  const response = await fetch(
    'https://classroom.googleapis.com/v1/courses',
    {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Google Classroom API error: ${response.statusText}`);
  }

  const data = await response.json();
  
  console.log(`\n✅ Found ${data.courses?.length || 0} courses:\n`);
  data.courses?.forEach((course: any) => {
    console.log(`  - ${course.name} (${course.id})`);
  });
}

async function runAutopilot(email: string) {
  console.log(`🤖 Running autopilot for ${email}`);
  
  // Import and run the autopilot tasks
  const { sendMissingAssignmentsEmails } = await import('./missing-assignments-email.js');
  
  const result = await sendMissingAssignmentsEmails();
  
  console.log('\n📊 Autopilot Results:');
  console.log(`  - Missing assignments: ${result.totalMissing}`);
  console.log(`  - Students affected: ${result.studentsAffected}`);
  console.log(`  - Student emails sent: ${result.studentEmailsSent}`);
  console.log(`  - Guardian emails sent: ${result.guardianEmailsSent}`);
  console.log(`  - Instructor emails sent: ${result.instructorEmailsSent || 0}`);
}

// Execute command
(async () => {
  try {
    switch (command) {
      case 'auth':
        if (!parsedArgs.email) {
          throw new Error('Missing --email parameter');
        }
        await startOAuthFlow(parsedArgs.email);
        break;
        
      case 'auth:redeem':
        if (!parsedArgs.email || !parsedArgs.code) {
          throw new Error('Missing --email or --code parameter');
        }
        await redeemOAuthCode(parsedArgs.email, parsedArgs.code);
        break;
        
      case 'courses:list':
        if (!parsedArgs.email) {
          throw new Error('Missing --email parameter');
        }
        await listCourses(parsedArgs.email);
        break;
        
      case 'autopilot:run':
        if (!parsedArgs.email) {
          throw new Error('Missing --email parameter');
        }
        await runAutopilot(parsedArgs.email);
        break;
        
      default:
        console.log('Unknown command:', command);
        console.log('\nAvailable commands:');
        console.log('  auth --email <email>');
        console.log('  auth:redeem --email <email> --code <code>');
        console.log('  courses:list --email <email>');
        console.log('  autopilot:run --email <email>');
        process.exit(1);
    }
  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
})();
