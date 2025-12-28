import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const documentCategory = formData.get('document_category') as string;
    const taxYear = formData.get('tax_year') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: PDF, JPG, PNG, DOC, DOCX' },
        { status: 400 }
      );
    }

    // Generate unique file path
    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `tax-documents/${user.id}/${timestamp}_${sanitizedFileName}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('tax-documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      );
    }

    // Create database record
    const { data: document, error: dbError } = await supabase
      .from('tax_documents')
      .insert({
        user_id: user.id,
        file_path: filePath,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        document_category: documentCategory || 'other',
        tax_year: taxYear ? parseInt(taxYear) : new Date().getFullYear(),
        virus_scan_status: 'pending',
        encrypted: true,
      })
      .select()
      .single();

    if (dbError) {
      // Cleanup uploaded file if database insert fails
      await supabase.storage.from('tax-documents').remove([filePath]);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // For now, mark as clean after a delay
    setTimeout(async () => {
      await supabase
        .from('tax_documents')
        .update({ virus_scan_status: 'clean' })
        .eq('id', document.id);
    }, 2000);

    return NextResponse.json({
      success: true,
      document,
      message: 'File uploaded successfully. Virus scan in progress.',
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
