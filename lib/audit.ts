// lib/audit.ts
// Audit logging helper for enterprise compliance
import { createClient } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type AuditEvent = {
  tenantId?: string | null;
  userId?: string | null;
  action: string;
  resourceType?: string | null;
  resourceId?: string | null;
  metadata?: Record<string, unknown>;
  ipAddress?: string | null;
  userAgent?: string | null;
};

/**
 * Log an audit event to the database
 * This function is designed to never throw errors to prevent disrupting normal operations
 */
export async function logAuditEvent(event: AuditEvent): Promise<void> {
  try {
    const { error } = await supabase.from('audit_logs').insert({
      tenant_id: event.tenantId,
      user_id: event.userId,
      action: event.action,
      resource_type: event.resourceType,
      resource_id: event.resourceId,
      metadata: event.metadata || {},
      ip_address: event.ipAddress,
      user_agent: event.userAgent
    });

    if (error) {
      logger.error('Failed to write audit log', error as Error, { event });
    }
  } catch (e) {
    // Do not crash app for logging failures
    logger.error('Audit logging exception', e as Error, { event });
  }
}

/**
 * Common audit actions for consistency
 */
export const AuditActions = {
  // User actions
  USER_CREATED: 'user_created',
  USER_UPDATED: 'user_updated',
  USER_DELETED: 'user_deleted',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  USER_PASSWORD_CHANGED: 'user_password_changed',
  USER_2FA_ENABLED: 'user_2fa_enabled',
  USER_2FA_DISABLED: 'user_2fa_disabled',

  // Course actions
  COURSE_CREATED: 'course_created',
  COURSE_UPDATED: 'course_updated',
  COURSE_DELETED: 'course_deleted',
  COURSE_PUBLISHED: 'course_published',
  COURSE_UNPUBLISHED: 'course_unpublished',

  // Enrollment actions
  ENROLLMENT_CREATED: 'enrollment_created',
  ENROLLMENT_COMPLETED: 'enrollment_completed',
  ENROLLMENT_CANCELLED: 'enrollment_cancelled',

  // HR actions
  EMPLOYEE_CREATED: 'employee_created',
  EMPLOYEE_UPDATED: 'employee_updated',
  EMPLOYEE_TERMINATED: 'employee_terminated',
  PAYROLL_PROCESSED: 'payroll_processed',
  LEAVE_APPROVED: 'leave_approved',
  LEAVE_DENIED: 'leave_denied',

  // Marketing actions
  CAMPAIGN_CREATED: 'campaign_created',
  CAMPAIGN_SENT: 'campaign_sent',
  CONTACT_IMPORTED: 'contact_imported',

  // Event actions
  EVENT_CREATED: 'event_created',
  EVENT_UPDATED: 'event_updated',
  EVENT_CANCELLED: 'event_cancelled',
  EVENT_REGISTRATION: 'event_registration',

  // SSO actions
  SSO_CONNECTION_CREATED: 'sso_connection_created',
  SSO_CONNECTION_UPDATED: 'sso_connection_updated',
  SSO_LOGIN: 'sso_login',

  // Security actions
  SECURITY_BREACH_ATTEMPT: 'security_breach_attempt',
  PERMISSION_DENIED: 'permission_denied',
  API_KEY_CREATED: 'api_key_created',
  API_KEY_REVOKED: 'api_key_revoked',

  // Data actions
  DATA_EXPORTED: 'data_exported',
  DATA_IMPORTED: 'data_imported',
  DATA_DELETED: 'data_deleted',

  // System actions
  SETTINGS_UPDATED: 'settings_updated',
  INTEGRATION_CONFIGURED: 'integration_configured',
  MIGRATION_RUN: 'migration_run'
} as const;

/**
 * Helper to extract IP and User Agent from Next.js request
 */
export function getRequestMetadata(req: Request | { headers: Headers; ip?: string }) {
  const headers = req.headers;
  
  return {
    ipAddress: 
      headers.get?.('x-forwarded-for')?.split(',')[0]?.trim() ||
      headers.get?.('x-real-ip') ||
      req.ip ||
      null,
    userAgent: headers.get?.('user-agent') || null
  };
}

/**
 * Audit decorator for API routes
 * Usage: await auditedAction(req, 'user_created', async () => { ... })
 */
export async function auditedAction<T>(
  req: Request | { headers: Headers; ip?: string },
  action: string,
  resourceType: string | null,
  fn: () => Promise<T>,
  options?: {
    tenantId?: string;
    userId?: string;
    metadata?: Record<string, unknown>;
  }
): Promise<T> {
  const { ipAddress, userAgent } = getRequestMetadata(req);
  
  try {
    const result = await fn();
    
    // Log successful action
    await logAuditEvent({
      tenantId: options?.tenantId,
      userId: options?.userId,
      action,
      resourceType,
      resourceId: typeof result === 'object' && result && 'id' in result ? String(result.id) : null,
      metadata: options?.metadata,
      ipAddress,
      userAgent
    });
    
    return result;
  } catch (error) {
    // Log failed action
    await logAuditEvent({
      tenantId: options?.tenantId,
      userId: options?.userId,
      action: `${action}_failed`,
      resourceType,
      metadata: {
        ...options?.metadata,
        error: error instanceof Error ? error.message : String(error)
      },
      ipAddress,
      userAgent
    });
    
    throw error;
  }
}
