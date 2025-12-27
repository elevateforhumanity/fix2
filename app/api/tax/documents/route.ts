import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's documents
    const { data: documents, error } = await supabase
      .from('tax_documents')
      .select('*')
      .eq('user_id', user.id)
      .order('upload_date', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Generate signed URLs for documents
    const documentsWithUrls = await Promise.all(
      (documents || []).map(async (doc) => {
        const { data: urlData } = await supabase.storage
          .from('tax-documents')
          .createSignedUrl(doc.file_path, 3600); // 1 hour expiry

        return {
          ...doc,
          download_url: urlData?.signedUrl || null,
        };
      })
    );

    return NextResponse.json({
      documents: documentsWithUrls,
      total: documents?.length || 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
