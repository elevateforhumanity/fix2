import { NextRequest, NextResponse } from 'next/server';
import { createBackup, exportBackupToJSON, listBackups } from '@/lib/backup';
import { requireAdmin } from '@/lib/authGuards';

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const { tables } = await request.json();
    const result = await createBackup(tables);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    // Export to JSON
    const jsonBackup = await exportBackupToJSON(result.backup);

    return NextResponse.json({
      success: true,
      timestamp: result.timestamp,
      recordCount: result.recordCount,
      download: `/api/admin/backup/download?timestamp=${result.timestamp}`,
    });
  } catch (error) {
    console.error('Backup error:', error);
    return NextResponse.json(
      { error: 'Failed to create backup' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const backups = await listBackups();

    return NextResponse.json({ backups });
  } catch (error) {
    console.error('Error listing backups:', error);
    return NextResponse.json(
      { error: 'Failed to list backups' },
      { status: 500 }
    );
  }
}
