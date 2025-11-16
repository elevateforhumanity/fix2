/**
 * Audit Logging Utility
 * Helper functions for tracking all system actions
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { supabase } from './supabase';

interface AuditLogParams {
  orgId: string;
  actorId: string;
  action: string;
  target: string;
  targetType?: string;
  targetId?: string;
  diff?: any;
  metadata?: Record<string, any>;
}

/**
 * Log an audit event
 */
export async function logAudit({
  orgId,
  actorId,
  action,
  target,
  targetType,
  targetId,
  diff,
  metadata = {},
}: AuditLogParams): Promise<void> {
  try {
    // Get client info
    const ipAddress = null; // Would need server-side to get real IP
    const userAgent = navigator.userAgent;

    await supabase.from('audit_logs').insert({
      org_id: orgId,
      actor_id: actorId,
      action,
      target,
      target_type: targetType,
      target_id: targetId,
      diff,
      metadata,
      ip_address: ipAddress,
      user_agent: userAgent,
    });
  } catch (error) {
    // Don't throw - audit logging should never break the app
  }
}

/**
 * Convenience functions for common audit actions
 */

export async function logCreate(
  orgId: string,
  actorId: string,
  resourceType: string,
  resourceId: string,
  data: any
) {
  await logAudit({
    orgId,
    actorId,
    action: `${resourceType}.create`,
    target: `${resourceType}:${resourceId}`,
    targetType: resourceType,
    targetId: resourceId,
    diff: { after: data },
  });
}

export async function logUpdate(
  orgId: string,
  actorId: string,
  resourceType: string,
  resourceId: string,
  before: any,
  after: any
) {
  await logAudit({
    orgId,
    actorId,
    action: `${resourceType}.update`,
    target: `${resourceType}:${resourceId}`,
    targetType: resourceType,
    targetId: resourceId,
    diff: { before, after },
  });
}

export async function logDelete(
  orgId: string,
  actorId: string,
  resourceType: string,
  resourceId: string,
  data: any
) {
  await logAudit({
    orgId,
    actorId,
    action: `${resourceType}.delete`,
    target: `${resourceType}:${resourceId}`,
    targetType: resourceType,
    targetId: resourceId,
    diff: { before: data },
  });
}

export async function logStatusChange(
  orgId: string,
  actorId: string,
  resourceType: string,
  resourceId: string,
  oldStatus: string,
  newStatus: string
) {
  await logAudit({
    orgId,
    actorId,
    action: `${resourceType}.status.update`,
    target: `${resourceType}:${resourceId}`,
    targetType: resourceType,
    targetId: resourceId,
    diff: { before: oldStatus, after: newStatus },
  });
}

export async function logRoleChange(
  orgId: string,
  actorId: string,
  userId: string,
  oldRole: string,
  newRole: string
) {
  await logAudit({
    orgId,
    actorId,
    action: 'member.role.update',
    target: `user:${userId}`,
    targetType: 'user',
    targetId: userId,
    diff: { before: oldRole, after: newRole },
  });
}

export async function logLogin(orgId: string, userId: string) {
  await logAudit({
    orgId,
    actorId: userId,
    action: 'auth.login',
    target: `user:${userId}`,
    targetType: 'user',
    targetId: userId,
  });
}

export async function logLogout(orgId: string, userId: string) {
  await logAudit({
    orgId,
    actorId: userId,
    action: 'auth.logout',
    target: `user:${userId}`,
    targetType: 'user',
    targetId: userId,
  });
}

/**
 * Batch audit logging for multiple actions
 */
export async function logBatch(logs: AuditLogParams[]): Promise<void> {
  try {
    const records = logs.map((log) => ({
      org_id: log.orgId,
      actor_id: log.actorId,
      action: log.action,
      target: log.target,
      target_type: log.targetType,
      target_id: log.targetId,
      diff: log.diff,
      metadata: log.metadata || {},
      user_agent: navigator.userAgent,
    }));

    await supabase.from('audit_logs').insert(records);
  } catch (error) {}
}

/**
 * Query audit logs with filters
 */
export async function queryAuditLogs(
  orgId: string,
  filters?: {
    action?: string;
    actorId?: string;
    targetType?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }
) {
  let query = supabase
    .from('audit_logs')
    .select(
      `
      *,
      actor:auth.users!audit_logs_actor_id_fkey(email)
    `
    )
    .eq('org_id', orgId)
    .order('created_at', { ascending: false });

  if (filters?.action) {
    query = query.eq('action', filters.action);
  }

  if (filters?.actorId) {
    query = query.eq('actor_id', filters.actorId);
  }

  if (filters?.targetType) {
    query = query.eq('target_type', filters.targetType);
  }

  if (filters?.startDate) {
    query = query.gte('created_at', filters.startDate.toISOString());
  }

  if (filters?.endDate) {
    query = query.lte('created_at', filters.endDate.toISOString());
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
}
