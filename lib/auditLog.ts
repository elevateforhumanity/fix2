// Admin audit logging system

import { createClient } from '@/lib/supabase/server';

export type AuditAction = 
  | 'user.create'
  | 'user.update'
  | 'user.delete'
  | 'course.create'
  | 'course.update'
  | 'course.delete'
  | 'certificate.issue'
  | 'certificate.revoke'
  | 'grade.update'
  | 'enrollment.create'
  | 'enrollment.delete'
  | 'settings.update'
  | 'backup.create'
  | 'backup.restore'
  | 'gdpr.export'
  | 'gdpr.delete'
  | 'admin.login'
  | 'admin.logout'
  | 'content_reported'
  | 'content_moderated';

interface AuditLogEntry {
  action: AuditAction;
  actor_id: string;
  actor_email?: string;
  target_type?: string;
  target_id?: string;
  changes?: Record<string, any>;
  metadata?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
}

export async function logAuditEvent(entry: AuditLogEntry) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from('audit_logs').insert({
      action: entry.action,
      actor_id: entry.actor_id,
      actor_email: entry.actor_email,
      target_type: entry.target_type,
      target_id: entry.target_id,
      changes: entry.changes,
      metadata: entry.metadata,
      ip_address: entry.ip_address,
      user_agent: entry.user_agent,
      timestamp: new Date().toISOString(),
    });

    if (error) {
      console.error('Failed to log audit event:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error logging audit event:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getAuditLogs(filters?: {
  action?: AuditAction;
  actor_id?: string;
  target_type?: string;
  target_id?: string;
  start_date?: string;
  end_date?: string;
  limit?: number;
}) {
  const supabase = await createClient();

  try {
    let query = supabase
      .from('audit_logs')
      .select('*')
      .order('timestamp', { ascending: false });

    if (filters?.action) {
      query = query.eq('action', filters.action);
    }
    if (filters?.actor_id) {
      query = query.eq('actor_id', filters.actor_id);
    }
    if (filters?.target_type) {
      query = query.eq('target_type', filters.target_type);
    }
    if (filters?.target_id) {
      query = query.eq('target_id', filters.target_id);
    }
    if (filters?.start_date) {
      query = query.gte('timestamp', filters.start_date);
    }
    if (filters?.end_date) {
      query = query.lte('timestamp', filters.end_date);
    }
    if (filters?.limit) {
      query = query.limit(filters.limit);
    } else {
      query = query.limit(100);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching audit logs:', error);
      return { success: false, error: error.message, logs: [] };
    }

    return { success: true, logs: data || [] };
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      logs: [],
    };
  }
}

export async function getAuditLogStats(days: number = 30) {
  const supabase = await createClient();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  try {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('action, actor_id')
      .gte('timestamp', startDate.toISOString());

    if (error) {
      console.error('Error fetching audit log stats:', error);
      return null;
    }

    const stats = {
      totalEvents: data?.length || 0,
      uniqueActors: new Set(data?.map(log => log.actor_id)).size,
      actionCounts: data?.reduce((acc, log) => {
        acc[log.action] = (acc[log.action] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {},
    };

    return stats;
  } catch (error) {
    console.error('Error calculating audit log stats:', error);
    return null;
  }
}

export async function exportAuditLogs(filters?: {
  start_date?: string;
  end_date?: string;
}) {
  const result = await getAuditLogs({
    ...filters,
    limit: 10000, // Export more records
  });

  if (!result.success) {
    return result;
  }

  const csv = [
    'Timestamp,Action,Actor ID,Actor Email,Target Type,Target ID,IP Address',
    ...result.logs.map(log => 
      [
        log.timestamp,
        log.action,
        log.actor_id,
        log.actor_email || '',
        log.target_type || '',
        log.target_id || '',
        log.ip_address || '',
      ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
    ),
  ].join('\n');

  return {
    success: true,
    data: csv,
    filename: `audit_logs_${Date.now()}.csv`,
  };
}

// Helper functions for common audit events
export async function logUserAction(
  action: AuditAction,
  actorId: string,
  targetId?: string,
  changes?: Record<string, any>
) {
  return logAuditEvent({
    action,
    actor_id: actorId,
    target_type: 'user',
    target_id: targetId,
    changes,
  });
}

export async function logCourseAction(
  action: AuditAction,
  actorId: string,
  courseId: string,
  changes?: Record<string, any>
) {
  return logAuditEvent({
    action,
    actor_id: actorId,
    target_type: 'course',
    target_id: courseId,
    changes,
  });
}

export async function logCertificateAction(
  action: AuditAction,
  actorId: string,
  certificateId: string,
  metadata?: Record<string, any>
) {
  return logAuditEvent({
    action,
    actor_id: actorId,
    target_type: 'certificate',
    target_id: certificateId,
    metadata,
  });
}
