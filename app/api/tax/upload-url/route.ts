import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filename, contentType, contactInfo } = body;

    // Validate required fields
    if (!filename || !contentType) {
      return NextResponse.json(
        { error: 'filename and contentType required' },
        { status: 400 }
      );
    }

    // Validate contact info
    if (!contactInfo?.name || !contactInfo?.email || !contactInfo?.phone) {
      return NextResponse.json(
        { error: 'Contact information required (name, email, phone)' },
        { status: 400 }
      );
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create unique path with timestamp and sanitized filename
    const timestamp = Date.now();
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const path = `supersonicfastcash/${contactInfo.email}/${timestamp}-${sanitizedFilename}`;

    // Generate signed upload URL (valid for 1 hour)
    const { data, error } = await supabase.storage
      .from('tax-documents')
      .createSignedUploadUrl(path);

    if (error) {
      console.error('Supabase storage error:', error);

      // If bucket doesn't exist, return helpful error
      if (error.message.includes('not found')) {
        return NextResponse.json(
          {
            error: 'Storage bucket not configured. Please contact support.',
            details:
              'The tax-documents bucket needs to be created in Supabase.',
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to generate upload URL', details: error.message },
        { status: 500 }
      );
    }

    // Log upload for tracking (optional - store in database)
    try {
      await supabase.from('tax_document_uploads').insert([
        {
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone,
          filename: sanitizedFilename,
          file_path: path,
          uploaded_at: new Date().toISOString(),
        },
      ]);
    } catch (logError) {
      // Don't fail upload if logging fails
      console.error('Failed to log upload:', logError);
    }

    return NextResponse.json({
      path,
      token: data.token,
      signedUrl: data.signedUrl,
      expiresIn: 3600, // 1 hour
    });
  } catch (error) {
    console.error('Upload URL generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
